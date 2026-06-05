# Basketball Kings — Dashboard

A card dashboard that displays the daily briefings the agent writes to
`../reports/<date>.md`. Built with Next.js + Tailwind, statically generated,
and free to host on Vercel.

## Local preview

```bash
cd web
npm install
npm run dev      # http://localhost:3000
```

The home page shows the latest briefing. Older days are linked at the top and
live at `/briefing/<date>`.

## How it reads briefings

At build time it reads every `../reports/*.md` file, parses the stories
(headline, category, "the real story", "why it pops", source), and bakes them
into static HTML. No server or API key is needed for the site.

## Deploy to Vercel (free)

The daily flow once set up:

1. Generate a briefing: `uv run agent.py`
2. Commit + push: `git add reports && git commit -m "briefing" && git push`
3. Vercel auto-rebuilds and publishes within a minute.

### One-time setup

1. Create a GitHub repo and push this whole project folder (the `reports/`
   folder must be committed — it is intentionally not gitignored).
2. Go to vercel.com, "Add New… → Project", and import the repo.
3. **Set the Root Directory to `web`** in the import settings. Vercel detects
   Next.js automatically; no env vars are needed.
4. Deploy. Every later `git push` redeploys automatically.
