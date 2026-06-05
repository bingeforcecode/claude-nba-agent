"""Basketball Kings daily news briefing agent.

Gathers the latest videos from a set of NBA YouTubers, then uses Claude with
web search to find today's top NBA stories that fit the show's format: star
trade rumors, firings/front-office drama, signings & big-market moves, and
beefs/off-court drama. For each story it produces an episode-ready angle (a
catchy, Basketball Kings-style headline) plus a factual summary and a source,
and writes a ranked top-10 briefing to reports/<date>.md.

Usage:
    uv run agent.py            # full run (needs ANTHROPIC_API_KEY)
    uv run agent.py --dry-run  # only gather YouTube material and print it
"""

import argparse
import json
import subprocess
import sys
from datetime import date
from pathlib import Path

from dotenv import load_dotenv

import sources

ROOT = Path(__file__).parent
REPORTS_DIR = ROOT / "reports"
MODEL = "claude-opus-4-6"


def gather_youtube():
    """Return a list of recent videos per channel using yt-dlp.

    Each item: {"channel": url, "title": ..., "url": ...}. Failures on a single
    channel are reported but don't abort the run.
    """
    videos = []
    for channel in sources.YOUTUBE_CHANNELS:
        try:
            proc = subprocess.run(
                [
                    "yt-dlp",
                    "--flat-playlist",
                    "--dump-json",
                    "--playlist-end",
                    str(sources.VIDEOS_PER_CHANNEL),
                    channel,
                ],
                capture_output=True,
                text=True,
                timeout=120,
            )
        except FileNotFoundError:
            print("yt-dlp not found on PATH. Install it: brew install yt-dlp", file=sys.stderr)
            return videos
        except subprocess.TimeoutExpired:
            print(f"Timed out fetching {channel}", file=sys.stderr)
            continue

        if proc.returncode != 0:
            print(f"Could not fetch {channel}: {proc.stderr.strip().splitlines()[-1:]}", file=sys.stderr)
            continue

        for line in proc.stdout.splitlines():
            if not line.strip():
                continue
            data = json.loads(line)
            videos.append(
                {
                    "channel": channel,
                    "title": data.get("title", ""),
                    "url": data.get("url") or data.get("webpage_url", ""),
                }
            )
    return videos


def build_prompt(videos):
    today = date.today().isoformat()
    categories = "\n".join(f"  {i+1}. {c}" for i, c in enumerate(sources.CATEGORIES))

    if videos:
        yt_lines = "\n".join(f"  - [{v['title']}]({v['url']})" for v in videos)
        yt_block = (
            "Here are the latest videos from NBA YouTubers (Flightmike, AM Hoops). "
            "Use their titles as story leads to investigate and corroborate with web search:\n"
            f"{yt_lines}\n"
        )
    else:
        yt_block = "(No YouTube material available this run; rely on web search.)\n"

    return f"""You are the news producer for "Basketball Kings", a fast-paced NBA
show on Snapchat. Today is {today}.

The show turns real NBA news into punchy, must-click episodes. Past hits:
  - "KD Goes to Los Angeles? 🤯"
  - "AD Finally Comes Clean On Lakers Trade"
  - "This kid is the reason Nico got FIRED 😨"
  - "Pelicans Star Moves to Los Angeles? 😱"
  - "Seattle Signs Ex Pelicans Star? 🤯"
The formula: short, sensational, emoji-driven, often a question — but always
anchored to a REAL story. Big markets (LA, NY), star players, and drama pop.

Find the best NBA stories from the last 24-48 hours that fit ONLY these story
types:
{categories}

{yt_block}
Use web search to find current, REAL stories. Every angle you pitch must be
backed by an actual report from a reputable source — clickbait is fine, making
things up is not. Discard anything outside the story types above. Discard stale
stories (older than ~3 days) unless they had a major new development today.

Then produce a ranked briefing of the TOP {sources.TOP_N} episode ideas, ranked
by how strong an episode each would make (juice + recency). Output ONLY clean
GitHub-flavored markdown in EXACTLY this format, with no preamble:

# Basketball Kings — Daily Briefing ({today})

## N. <catchy episode headline, with an emoji, often phrased as a question>
- **Category:** <Trade rumor | Firing/Drama | Signing/Move | Beef/Fight>
- **The real story:** <1-2 factual sentences on what actually happened/was reported>
- **Why it pops:** <one short line on the hook for the show>
- **Source:** <publication or YouTuber name> — <url>

If you genuinely cannot find {sources.TOP_N} qualifying stories, include as many
as you found and note how many at the end.
"""


def run_agent(prompt):
    import anthropic

    client = anthropic.Anthropic()
    # max_uses caps web searches per run to keep cost bounded (each search is
    # billed). ~15 is plenty to corroborate 10 stories.
    tools = [{"type": "web_search_20260209", "name": "web_search", "max_uses": 15}]
    messages = [{"role": "user", "content": prompt}]

    max_continuations = 8
    for _ in range(max_continuations):
        response = client.messages.create(
            model=MODEL,
            max_tokens=16000,
            thinking={"type": "adaptive"},
            output_config={"effort": "high"},
            tools=tools,
            messages=messages,
        )
        if response.stop_reason == "pause_turn":
            # Server-side tool loop paused; append and resend to continue.
            messages.append({"role": "assistant", "content": response.content})
            continue
        # end_turn (or anything else terminal): extract the report text.
        return _clean(response)

    # Hit the continuation cap; return whatever text we have.
    return _clean(response)


def _clean(response):
    """Join text blocks and trim any preamble before the report title."""
    text = "".join(b.text for b in response.content if b.type == "text").strip()
    marker = "# Basketball Kings"
    idx = text.find(marker)
    return text[idx:] if idx != -1 else text


def main():
    parser = argparse.ArgumentParser(description="Daily NBA news agent")
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Only gather YouTube material and print it (no API key needed).",
    )
    args = parser.parse_args()

    # override=True because the shell/uv may pre-set an empty ANTHROPIC_API_KEY,
    # which would otherwise shadow the value in .env.
    load_dotenv(ROOT / ".env", override=True)

    print("Gathering YouTube material...", file=sys.stderr)
    videos = gather_youtube()
    print(f"Found {len(videos)} videos.", file=sys.stderr)

    if args.dry_run:
        for v in videos:
            print(f"- {v['title']}  ({v['url']})")
        return

    prompt = build_prompt(videos)
    print("Researching and writing report (this can take a minute)...", file=sys.stderr)
    report = run_agent(prompt)

    REPORTS_DIR.mkdir(exist_ok=True)
    out = REPORTS_DIR / f"{date.today().isoformat()}.md"
    out.write_text(report + "\n")
    print(f"Report written to {out}")


if __name__ == "__main__":
    main()
