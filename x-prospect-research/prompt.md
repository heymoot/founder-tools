# X Prospect Research prompt

Copy one of the two prompts below into an AI assistant that can search X live (for example Grok, or ChatGPT or Claude with web search). Replace `[your website]` first.

- **Prompt A (recommended)** fills the DATA block of [`template.html`](template.html). You get the same page every time, because the design is already built.
- **Prompt B** builds the page from scratch using a written design spec. Use it when your assistant can't take file attachments. Results vary more.

---

## Prompt A: research + fill the template

Attach `template.html` to the chat, then send:

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

Use the attached template.html as the exact template. Return the whole file with ONLY the `DATA` object changed; keep every style, element and script as it is.
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

---

## Prompt B: research + build the page from a design spec

````
[Paste the Research section of Prompt A here, unchanged.]

## Output

Return ONE HTML file, ready to save and open in a browser. Inline all CSS and JS. The only external resource allowed is one Google Fonts stylesheet link, with fallback stacks. Put all research data in one JS object at the top of the script and render the data-driven parts from it.

### Look: a light research report, accurate and sharp
- Light theme only (color-scheme: light). No dark mode.
- Colors (CSS variables): paper #ffffff, wash #f2f3f6, ink #0b0d12, ink-2 #353a46, muted #626877, dim #8a909c, rule #d8dbe2, signal (cobalt) #2438ff, highlighter #fff27a. Chart groups: #2438ff, #0f9b86, #e39a0b, #c4c9d3. No gradients, no shadows, no rounded cards, no colored side bars on boxes.
- Fonts: "Schibsted Grotesk" (500/600/800) for headings and UI; "Source Serif 4" (400, 600, italic) for body text at 17px/1.6; "JetBrains Mono" (400/500) only for data labels, figure captions and table headers.
- Headings: grotesk 800, tight tracking (-0.03 to -0.04em). The h1 is very large (clamp 2.8rem to 6rem) on two lines.
- Structure comes from rules, not boxes: each chapter starts with a 2px ink rule and a two-column head (h2 left, one short sentence right, or nothing). Lists and tables use 1px hairlines.
- Tabular numbers wherever digits line up. ::selection in the highlighter yellow. Visible cobalt focus rings.
- Max width 1120px. Side padding max(16px, safe-area). Works at 390px wide with no sideways scroll.

### Page order: a story that ends in the work list
1. Masthead: one mono line, "[product] · prospect research" left, the date right.
2. Title: h1 "Who to talk to first on X". A large serif lede (about 2.3rem, max 30ch) of 2–3 sentences with the key phrase in a span. Its words start grey and turn ink as the page scrolls (34% lit at load, all lit after half a screen); when the key phrase is lit, a yellow highlighter stroke sweeps under it. Then a mono byline: Sources / Window / Sample.
3. Fig. 1, a scroll-driven story: a sticky figure on the left (sticky top 0, 100vh, centered) and 5 text steps on the right (about 78vh each; active step full opacity, others 0.35). On a phone the figure sticks to the top and the steps scroll under it. The figure has a big cobalt number (count-up animation) with a short label, a stage of dots on a faint grid, a legend and a mono caption "Fig. 1 · …". The dots move with eased transitions (900ms, small stagger):
   - State 1: one dot per engagement, stacked in one column per source, labelled with name, handle and count. Number = total engagements.
   - State 2: the dots merge into a grid of unique people; extra dots fade out. Number = unique people.
   - State 3: colored by role; the biggest group bright, the others at 18%. Number = its %.
   - State 4: all role colors, legend with name and %. Number = the others' combined %.
   - State 5: colored by activity (7d / 30d / older), 7-day group highlighted. Number = its %.
   Switch states with an IntersectionObserver (rootMargin -45% top and bottom). Size the dots so the tallest stack fits; dot counts must match the data.
4. "What fills their timeline": the 8 topics as a large ranked list (mono rank "01", grotesk topic about 1.75rem, a count on the right of matching prospects; "–" and disabled if none). Clicking a topic filters the prospect list and scrolls to it. Beside it, "What they read and use" as a definition list with mono terms.
5. "What this means for [product]": 3 findings in 3 columns, each a 1px ink rule, a bold grotesk headline and 1–2 serif sentences.
6. "N people to check by hand", last on purpose:
   - Fig. 2: a log-scale strip chart of the prospects' follower counts with a shaded typical range. Hover shows the handle in the caption; click opens that person in the list.
   - Source filter pills with counts, a "Not checked" filter, a sort menu (fit / most followers / fewest), and an "N of M checked" progress bar.
   - A compact list, ONE line per person: checkbox, mono rank, @handle with name muted, followers, a small source tag, the why-fit line cut off with an ellipsis, a chevron, and an external-link icon to https://x.com/handle. Clicking a line expands bio, topics, the evidence post link, exact followers and last post date. Checked people get a yellow highlighter swipe behind their handle and turn amber in Fig. 2. Save checks in localStorage inside try/catch. On a phone the line wraps to two rows.
7. "Sources and method": a table (source, account link, followers, engagements with a small to-scale bar) and a short method paragraph.

### Copy rules: no noise
- No small labels or kickers above headings ("01 · The sample", "Finding 1", "Overview").
- No filler intros, no "scroll down" hints, no restating what a figure already shows.
- Each story step: a grotesk headline that states the finding plus 1–2 short sentences.
- Plain, direct sentences. No em-dash asides, no "not X, but Y", no marketing tone.
- Icons are inline SVG with one stroke width. No emoji as icons.
- Respect prefers-reduced-motion: no transitions, numbers set at once, lede fully lit.

No text outside the HTML code block.
````
