# X Prospect Research prompt

Paste this into [Grok](https://grok.com). It needs Grok because Grok is the assistant that can search X live. Replace `[your website]` first.

Grok returns a short HTML file that holds only your research data. The page design loads from [`report.js`](report.js) in this repo, so every report looks the same. Save Grok's answer as `report.html` and open it in your browser; it needs an internet connection to load the design.

````
My product: [your website]

Goal: find prospects among the audiences of my competitors on X, so I can study them by hand (who they are, what they talk about, what they read).

## Research

Step 1: Competitors
Read my site. Search X live and find the 4 closest competitors that are active on X. For each, use the founder's personal account if it is more active than the product account. Also note builders whose audience overlaps with mine as a fifth source called "Builders".

Step 2: Their engaged audience
X follower lists are not searchable, so use the people who replied to, quoted or reposted each competitor's posts in the last 60 days. These are the "engaged audience". Sample as many as you can (aim for 30+ per competitor). Record the real number of engagements per source AND the number of unique people after removing people who appear under more than one source.

Step 3: Audience overview (from the sampled people's bios and recent posts)
- Roles with rough % shares (2 to 5 groups, biggest first), industries, company stage, rough locations.
- Top 8 recurring topics, most common first.
- What they read: accounts they mention or quote, newsletters, podcasts, sites, tools.
- Activity: % who posted in the last 7 days / 30 days / older. Typical follower range.
- 3 findings a founder could act on: a short headline plus 1–2 sentences each.

Step 4: Prospects to check by hand
Pick up to 20 people from the engaged audience who look most like my ideal customer and posted in the last 14 days. Spread them across competitors. Skip big accounts (50k+ followers), bots and other tool founders. For each: handle, name, exact follower count, last post date, one-line bio, 2–3 topics, which source they engaged with, the URL of the post that shows it plus a short label ("Reply to Daniel"), and why they fit in one line under 70 characters. Rank by fit.

Rules
- Only include handles you found and checked just now. Never guess or invent. If you have fewer than 20, list fewer and say so once in the method text.
- Mark anything inferred (location, stage) with "≈".
- Give dates as dates (YYYY-MM-DD), not "recently".
- Every number must come from the research. Don't add claims the research doesn't support.

## Output

Return ONE short HTML file and nothing else. Do NOT write any CSS, layout or rendering code: the design is already built and loads from report.js. Your only job is to fill in the data.

Copy this file exactly. Change only the values inside window.DATA, keep every key and the script tag as they are, and keep it valid JavaScript (double quotes inside text must be escaped).

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>X Prospect Research</title>
</head>
<body>
<script>
window.DATA = {
  product: "My product name",
  date: "YYYY-MM-DD",
  windowDays: 60,
  title: "Who to talk to first on X",
  lede: { before: "First words of 2-3 sentences on who answers my competitors and what they struggle with. The people answering are mostly", key: "the phrase that matters most.", after: "The rest of the sentences." },
  storyTitle: "Who answers our competitors",
  sources: [
    { name: "Competitor 1", account: "@handle", url: "https://x.com/handle", followers: "~15k", sample: 34 },
    { name: "Builders", account: "Audience overlap", url: "", followers: "–", sample: 10, plus: true }
  ],
  uniquePeople: 88,
  roles: [ { name: "Founders and solo devs", pct: 58 }, { name: "Engineers with side projects", pct: 42 } ],
  activity: [ { name: "Posted in last 7 days", pct: 71 }, { name: "Last 30 days", pct: 21 }, { name: "Older", pct: 8 } ],
  followerRange: [200, 8000],
  steps: [
    { h: "112 engagements under five sources", p: "One or two short sentences." },
    { h: "Repeats removed: 88 people", p: "..." },
    { h: "Most are founders", p: "..." },
    { h: "Engineers next, then growth people", p: "..." },
    { h: "Seven in ten posted this week", p: "..." }
  ],
  topics: [ { label: "Building in public", match: ["in public"] } ],
  reads: [ { k: "Founders", v: "..." }, { k: "Sites", v: "..." }, { k: "Tools", v: "..." }, { k: "Shows", v: "..." } ],
  findingsTitle: "What this means for My product name",
  findings: [ { h: "Short headline", p: "One or two sentences." } ],
  prospects: [
    { handle: "handle_without_at", name: "Name", followers: 1240, last: "YYYY-MM-DD", bio: "One-line bio", topics: "Topic, topic", source: "Competitor 1", proof: "Reply to Daniel", proofUrl: "https://x.com/handle/status/123", why: "Why they fit, under 70 characters" }
  ],
  method: [ "Paragraph 1.", "Paragraph 2." ]
};
</script>
<script src="https://cdn.jsdelivr.net/gh/heymoot/founder-tools@main/x-prospect-research/report.js"></script>
</body>
</html>
```

How to fill it:
- The values above are placeholders. Replace every one with real research data and remove nothing but placeholder rows.
- `sources`: the 4 competitors, then "Builders" last (`plus: true` when the count is a lower bound). `sample` = engagements found for that source. `followers` is a short text like "~15k".
- `uniquePeople`: people after removing repeats across sources.
- `roles` (2 to 5 groups, biggest first) and `activity` (3 groups): `pct` are whole numbers that add up to 100.
- `followerRange`: the typical follower range across the sample, as two numbers.
- `steps`: exactly 5, in this order: the sample, people after repeats, the biggest role, the other roles, activity. Each `h` is a short headline that states the finding ("Two in three are founders"); each `p` is 1–2 short sentences.
- `topics`: exactly 8, most common first, each with 1–3 lowercase `match` words that appear in the bios or topics of prospects who post about it.
- `findings`: exactly 3.
- `prospects`: ranked by fit, up to 20. `followers` is a plain number. `proofUrl` is the real X post URL.
- `method`: 2 short paragraphs: date and window, engaged audience not full follower list, engagements vs unique people, what is inferred (≈), and any shortfall from 20.
- Copy rules: plain, direct sentences. No filler, no marketing tone, no em-dash asides.

Return only the HTML in one code block.
````
