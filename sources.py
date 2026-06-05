"""Configuration for the Basketball Kings news briefing agent.

Tunes what stories the agent hunts for and where it pulls leads from, to match
the show's format: sensational, trade- and drama-driven NBA stories.
"""

# The story types that make good Basketball Kings episodes, based on past hits
# like "KD Goes to Los Angeles?", "This kid is the reason Nico got FIRED",
# and "Seattle Signs Ex Pelicans Star?". Fed to Claude as the story filter.
CATEGORIES = [
    "Star trade rumors & player movement (proposed/reported trades, players "
    "requesting trades, teams shopping stars, trade-deadline buzz)",
    "Firings & front-office drama (coaches, GMs, or execs fired or under "
    "pressure; locker-room or organizational turmoil)",
    "Signings & big-market moves (free-agency signings, stars heading to "
    "marquee markets like LA/NY, hypothetical landing spots, relocation buzz)",
    "Beefs, fights & off-court drama (feuds, altercations, callouts, or "
    "tension with teammates, coaches, journalists, or other players)",
]

# NBA YouTubers to pull story leads from.
# NOTE: verify these handles point to the right channels before relying on them.
# yt-dlp resolves the @handle form to the channel automatically.
YOUTUBE_CHANNELS = [
    "https://www.youtube.com/@theflightmike/videos",
    "https://www.youtube.com/@AMHoops/videos",
]

# How many recent videos to inspect per channel.
VIDEOS_PER_CHANNEL = 5

# Download auto-generated transcripts (slower) or just use titles (fast).
# Titles are usually enough to surface a lead; web search fills in details.
FETCH_TRANSCRIPTS = False

# Number of story ideas in the daily briefing.
TOP_N = 10
