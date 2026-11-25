# X Prospect Research: find customers in your competitors' audience on X

A free AI prompt and HTML template that turns your competitors' X (Twitter) audience into a short list of people worth talking to. Made by [heymoot](https://heymoot.com).

![The report's opening: who to talk to first on X](preview-top.png)

## What you get

One page you open in your browser, built from a live search of X:

- **Who answers your competitors.** A scroll-driven figure: every reply, quote and repost on your competitors' recent posts, then the unique people behind them, by role and by how recently they posted.
- **What fills their timeline.** Their top 8 topics and what they read and use.
- **Three findings** you can act on before you reach out.
- **Up to 20 people to check by hand**, ranked by fit, each with the post that shows they care. Tick people off as you go.

![Fig. 1, the scroll-driven audience story](preview-story.png)

![The shortlist with follower chart, filters and checkboxes](preview-list.png)

The template in this folder holds **fake example data**. None of the people or accounts are real, and its links go to example.com.

## How to use it

1. Open [Grok](https://grok.com). It's the assistant that can search X live, which this tool needs.
2. Copy the prompt from [`prompt.md`](prompt.md), replace `[your website]`, and send it. The prompt links to [`template.html`](template.html), so there's nothing to attach.
3. Save the HTML Grok returns as a file and open it in your browser.

## Why the engaged audience

X follower lists can't be searched, and most followers are inactive. People who replied to, quoted or reposted a competitor in the last 60 days are active, and they care about the problem. That makes them the best place to start talking.

## Check before you trust it

Grok can still get things wrong. Open each profile before you reach out: the prompt asks for checked handles and real post links, but a quick look takes a minute and saves an awkward reply.

## Customize

Everything on the page renders from one `DATA` object at the bottom of `template.html`. Change the data and leave the rest alone. The fonts load from Google Fonts. Without a connection the page falls back to system fonts and still works.

---

Built by [heymoot](https://heymoot.com), which helps founders grow on X by talking to the right people every day, in their own words. More free tools: [heymoot-free-tools](../README.md).
