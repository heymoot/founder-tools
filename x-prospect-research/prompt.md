# X Prospect Research prompt

Paste this into [Grok](https://grok.com). It needs Grok because Grok is the assistant that can search X live. Replace `[your website]` first.

Grok fetches the page design from [`template.html`](https://raw.githubusercontent.com/trunghq3101/heymoot-free-tools/main/x-prospect-research/template.html) in this repo and fills in only the data, so the report looks the same every time. If Grok says it can't open the link, download `template.html`, attach it to the chat, and change the first line of the Output section to "Use the attached template.html as the exact template."


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

Fetch the template at https://raw.githubusercontent.com/trunghq3101/heymoot-free-tools/main/x-prospect-research/template.html and use it as the exact template. Return the whole file with ONLY the `DATA` object changed; keep every style, element and script as it is.
- Replace all example data. Don't keep any example.com links: post links are real X post URLs.
- `sources`: the 4 competitors plus "Builders" (set `plus: true` when the count is a lower bound). `sample` = engagements for that source.
- `uniquePeople`, `roles`, `activity`, `followerRange` from Step 2 and 3. Shares are whole numbers that add up to 100.
- `steps`: 5 items in this order: the sample, people after repeats, the biggest role, the other roles, activity. Each `h` is a short headline that states the finding ("Two in three are founders"); each `p` is 1–2 short sentences.
- `topics`: each with 1–3 lowercase `match` words that appear in matching prospects' bios or topics.
- `lede`: `before` + `key` + `after` make 2–3 sentences saying who answers my competitors and what they struggle with; `key` is the phrase that matters most.
- `method`: 2 short paragraphs: date and window, engaged audience not full follower list, engagements vs unique people, what is inferred, and any shortfall.
- Copy rules: plain, direct sentences. No filler, no marketing tone, no em-dash asides.

Return only the HTML in one code block.
````
