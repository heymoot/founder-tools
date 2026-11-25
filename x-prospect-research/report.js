/* X Prospect Research report renderer, from heymoot founder-tools (https://github.com/heymoot/founder-tools).
   By heymoot (https://heymoot.com). MIT licensed.
   Usage: a page sets window.DATA = {...} and then loads this script at the end of <body>.
   It adds the fonts, styles and page structure, then renders everything from window.DATA. */
(function () {
const STYLES = "\n/* A field-research story: title + scroll-lit lede, a sticky Fig. 1 whose dots regroup as you scroll\n   (sources \u2192 people \u2192 roles \u2192 activity), topics, findings, Fig. 2, then the shortlist, then the appendix.\n   Light only: white paper, black ink, one cobalt signal, a highlighter for \"checked\". */\n:root {\n  --paper: #ffffff; --wash: #f2f3f6; --ink: #0b0d12; --ink-2: #353a46; --muted: #626877; --dim: #8a909c;\n  --rule: #d8dbe2; --signal: #2438ff; --hl: #fff27a;\n  --g1: #2438ff; --g2: #0f9b86; --g3: #e39a0b; --g4: #c4c9d3; --g5: #7a3cff;\n  --display: \"Schibsted Grotesk\", \"Helvetica Neue\", Arial, sans-serif;\n  --serif: \"Source Serif 4\", Georgia, \"Times New Roman\", serif;\n  --mono: \"JetBrains Mono\", ui-monospace, \"SF Mono\", Menlo, monospace;\n  color-scheme: light;\n}\n* { box-sizing: border-box; }\n[hidden] { display: none !important; }\nhtml { background: var(--paper); }\nbody {\n  margin: 0; background: var(--paper); color: var(--ink);\n  font: 400 17px/1.6 var(--serif);\n  padding-left: max(16px, env(safe-area-inset-left, 0px));\n  padding-right: max(16px, env(safe-area-inset-right, 0px));\n  padding-block: 0 72px;\n  -webkit-font-smoothing: antialiased;\n}\n::selection { background: var(--hl); color: var(--ink); }\na { color: var(--signal); text-underline-offset: 3px; text-decoration-thickness: 1px; }\na:hover { text-decoration-thickness: 2px; }\n:focus-visible { outline: 2px solid var(--signal); outline-offset: 2px; }\nbutton { font: inherit; color: inherit; }\n.page { max-width: 1120px; margin: 0 auto; }\n.num { font-variant-numeric: tabular-nums; }\n.mono { font-family: var(--mono); font-size: 0.78rem; letter-spacing: 0.01em; }\nh1, h2, h3 { font-family: var(--display); margin: 0; text-wrap: balance; color: var(--ink); }\nh2 { font-size: clamp(1.7rem, 3.4vw, 2.5rem); font-weight: 800; letter-spacing: -0.03em; line-height: 1.05; }\nh3 { font-size: 1.05rem; font-weight: 600; letter-spacing: -0.01em; }\np { margin: 0; }\n.chapter { padding-block: 96px 0; }\n.chapter-head { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 16px 48px; align-items: end; border-top: 2px solid var(--ink); padding-top: 18px; margin-bottom: 40px; }\n.chapter-head p { color: var(--ink-2); max-width: 46ch; }\n\n.mast { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 6px 24px; padding-block: 18px; border-bottom: 1px solid var(--rule); color: var(--muted); }\n.title { padding-top: clamp(48px, 9vw, 112px); display: grid; gap: 28px; }\nh1 { font-size: clamp(2.8rem, 8.4vw, 6rem); font-weight: 800; letter-spacing: -0.04em; line-height: 0.95; max-width: 12ch; }\n.lede { font-size: clamp(1.45rem, 3.1vw, 2.35rem); line-height: 1.28; letter-spacing: -0.012em; max-width: 30ch; }\n.lede .w { transition: color 260ms ease; }\n.lede.js .w { color: var(--dim); }\n.lede.js .w.lit { color: var(--ink); }\n.lede .key { background-image: linear-gradient(var(--hl), var(--hl)); background-repeat: no-repeat; background-position: 0 88%; background-size: 100% 42%; transition: background-size 700ms cubic-bezier(0.16, 1, 0.3, 1); }\n.lede.js .key { background-size: 0% 42%; }\n.lede.js .key.on { background-size: 100% 42%; }\n.byline { display: flex; flex-wrap: wrap; gap: 6px 28px; color: var(--muted); border-top: 1px solid var(--rule); padding-top: 14px; }\n.byline b { color: var(--ink); font-weight: 500; }\n\n.story { display: grid; grid-template-columns: minmax(0, 6fr) minmax(0, 5fr); gap: 0 56px; }\n.fig { position: sticky; top: env(safe-area-inset-top, 0px); align-self: start; height: 100vh; margin: 0; display: flex; flex-direction: column; justify-content: center; gap: 14px; z-index: 2; background: var(--paper); }\n.fig-head { display: flex; align-items: baseline; gap: 16px; min-height: 5.2rem; border-bottom: 1px solid var(--rule); padding-bottom: 12px; }\n.readout { font-family: var(--display); font-weight: 800; font-size: clamp(3rem, 6vw, 4.6rem); letter-spacing: -0.04em; line-height: 0.9; color: var(--signal); font-variant-numeric: tabular-nums; min-width: 2ch; }\n.readout-label { font-family: var(--display); font-weight: 500; font-size: 1.05rem; line-height: 1.3; max-width: 22ch; }\n.stage { position: relative; width: 100%; aspect-ratio: 5 / 4; max-width: 100%; }\n.stage .grid-lines { position: absolute; inset: 0; background-image: linear-gradient(var(--wash) 1px, transparent 1px), linear-gradient(90deg, var(--wash) 1px, transparent 1px); background-size: 10% 12.5%; border: 1px solid var(--wash); }\n.dot {\n  position: absolute; aspect-ratio: 1; border-radius: 50%; background: var(--signal);\n  transform: translate(-50%, -50%) scale(var(--s, 1)); opacity: var(--o, 1);\n  transition: left 900ms cubic-bezier(0.16, 1, 0.3, 1), top 900ms cubic-bezier(0.16, 1, 0.3, 1), width 900ms cubic-bezier(0.16, 1, 0.3, 1),\n              background-color 500ms ease, opacity 500ms ease, transform 500ms cubic-bezier(0.16, 1, 0.3, 1);\n}\n.clabel { position: absolute; top: 77%; transform: translateX(-50%); text-align: center; transition: opacity 400ms ease; }\n.clabel b { display: block; font-family: var(--display); font-weight: 600; font-size: 0.88rem; }\n.clabel span { color: var(--muted); }\n.stage:not(.sources) .clabel { opacity: 0; }\n.fig-foot { display: grid; gap: 8px; min-height: 4.6rem; }\n.legend { display: flex; flex-wrap: wrap; gap: 4px 18px; font-family: var(--display); font-size: 0.88rem; }\n.legend span { display: inline-flex; align-items: center; gap: 7px; transition: opacity 300ms ease; }\n.legend i { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }\n.legend .off { opacity: 0.35; }\n.caption { color: var(--muted); }\n.steps { padding-block: 30vh 40vh; }\n.step { min-height: 78vh; display: flex; align-items: center; }\n.step-card { max-width: 36ch; display: grid; gap: 12px; opacity: 0.35; transition: opacity 400ms ease; }\n.step.active .step-card { opacity: 1; }\n.step-card h3 { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.025em; line-height: 1.15; }\n.step-card p { color: var(--ink-2); }\n\n.topics-wrap { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 40px 56px; }\n.topic-list { list-style: none; margin: 0; padding: 0; }\n.topic-list li { border-top: 1px solid var(--rule); }\n.topic-list li:last-child { border-bottom: 1px solid var(--rule); }\n.topic { width: 100%; display: grid; grid-template-columns: 2.2rem minmax(0, 1fr) auto; align-items: baseline; gap: 12px; background: none; border: 0; padding: 12px 0; text-align: left; cursor: pointer; }\n.topic .rank { color: var(--dim); }\n.topic .t { font-family: var(--display); font-weight: 600; font-size: clamp(1.2rem, 2.4vw, 1.75rem); letter-spacing: -0.02em; line-height: 1.15; transition: color 200ms ease; }\n.topic .c { color: var(--muted); white-space: nowrap; }\n.topic:hover:not(:disabled) .t, .topic[aria-pressed=\"true\"] .t { color: var(--signal); }\n.topic[aria-pressed=\"true\"] .t { background: linear-gradient(transparent 60%, var(--hl) 60%); }\n.topic:disabled { cursor: default; }\n.topic:disabled .t { color: var(--dim); }\n.side-note { display: grid; gap: 22px; align-content: start; }\ndl.feed { margin: 0; display: grid; grid-template-columns: 6rem minmax(0, 1fr); border-top: 1px solid var(--rule); }\ndl.feed dt, dl.feed dd { padding: 10px 0; border-bottom: 1px solid var(--rule); margin: 0; }\ndl.feed dt { color: var(--muted); }\ndl.feed dd { font-size: 0.98rem; }\n\n.findings { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 40px; }\n.finding { display: grid; gap: 12px; align-content: start; border-top: 1px solid var(--ink); padding-top: 14px; }\n.finding h3 { font-size: 1.4rem; font-weight: 800; letter-spacing: -0.025em; line-height: 1.1; }\n.finding p { color: var(--ink-2); font-size: 1rem; }\n\n.fig2 { display: grid; gap: 14px; }\n.strip { position: relative; height: 76px; margin: 10px 8px 0; }\n.strip .axis { position: absolute; left: 0; right: 0; top: 24px; height: 1px; background: var(--ink); }\n.strip .band { position: absolute; top: 10px; height: 29px; background: var(--wash); }\n.strip .tickm { position: absolute; top: 24px; width: 1px; height: 7px; background: var(--ink); }\n.strip .tick { position: absolute; top: 36px; transform: translateX(-50%); color: var(--muted); }\n.strip .pt { position: absolute; top: 16px; width: 16px; height: 16px; margin-left: -8px; border-radius: 50%; background: var(--signal); border: 2px solid var(--paper); padding: 0; cursor: pointer; transition: transform 160ms ease; }\n.strip .pt.done { background: var(--g3); }\n.strip .pt:hover, .strip .pt:focus-visible { transform: scale(1.35); z-index: 2; }\n.strip-cap { color: var(--muted); font-size: 0.95rem; min-height: 1.6em; }\n.strip-cap b { color: var(--ink); font-weight: 600; }\n\n.sl-head { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: end; gap: 12px 24px; margin: 36px 0 14px; }\n.progress { display: grid; gap: 6px; min-width: 220px; font-family: var(--display); font-size: 0.9rem; color: var(--muted); }\n.progress b { color: var(--ink); }\n.track { height: 4px; background: var(--wash); }\n.track span { display: block; height: 100%; width: 0; background: var(--ink); transition: width 300ms cubic-bezier(0.16, 1, 0.3, 1); }\n.controls { display: flex; flex-wrap: wrap; gap: 10px 16px; align-items: center; justify-content: space-between; margin-bottom: 10px; font-family: var(--display); }\n.pills { display: flex; flex-wrap: wrap; gap: 6px; }\n.pills button { font-family: var(--display); font-size: 0.85rem; font-weight: 500; background: var(--paper); border: 1px solid var(--rule); border-radius: 999px; padding: 5px 12px; cursor: pointer; }\n.pills button:hover { border-color: var(--ink); }\n.pills button[aria-pressed=\"true\"] { background: var(--ink); color: var(--paper); border-color: var(--ink); }\n.pills .count { opacity: 0.6; margin-left: 5px; }\n.sort { font-size: 0.85rem; color: var(--muted); display: flex; gap: 8px; align-items: center; margin-left: auto; }\n.sort select { font: 500 0.85rem var(--display); color: var(--ink); background: var(--paper); border: 1px solid var(--rule); border-radius: 6px; padding: 4px 8px; }\n.topic-note { display: flex; flex-wrap: wrap; gap: 6px 12px; align-items: center; font-size: 0.9rem; color: var(--ink-2); margin: 0; }\n.topic-note button { background: none; border: 0; padding: 0; color: var(--signal); cursor: pointer; text-decoration: underline; text-underline-offset: 3px; }\n\n.list { list-style: none; margin: 0; padding: 0; border-top: 2px solid var(--ink); font-family: var(--display); }\n.row { border-bottom: 1px solid var(--rule); }\n.line { display: grid; grid-template-columns: 22px minmax(0, 1fr) 30px; align-items: center; gap: 12px; min-height: 48px; padding-left: 2px; }\n.line input { width: 17px; height: 17px; margin: 0; accent-color: var(--ink); cursor: pointer; }\n.toggle { display: grid; grid-template-columns: 1.6rem minmax(0, 13.5rem) 3.6rem 6.8rem minmax(0, 1fr) 16px; align-items: center; gap: 14px; padding: 11px 0; background: none; border: 0; text-align: left; cursor: pointer; min-width: 0; }\n.rk { color: var(--dim); }\n.who { min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }\n.handle { font-weight: 600; }\n.row.done .handle { background: linear-gradient(transparent 45%, var(--hl) 45%); }\n.who .name { color: var(--muted); font-size: 0.86rem; margin-left: 6px; font-weight: 500; }\n.fol { text-align: right; font-size: 0.9rem; font-weight: 600; }\n.tag { justify-self: start; white-space: nowrap; color: var(--ink-2); font-size: 0.72rem; border: 1px solid var(--rule); padding: 1px 7px; border-radius: 4px; overflow: hidden; text-overflow: ellipsis; max-width: 100%; }\n.why { min-width: 0; color: var(--muted); font-size: 0.9rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: var(--serif); }\n.chev { width: 16px; height: 16px; color: var(--muted); transition: transform 220ms cubic-bezier(0.16, 1, 0.3, 1); }\n.row.open .chev { transform: rotate(180deg); }\n.ext { display: grid; place-items: center; width: 30px; height: 30px; color: var(--muted); border-radius: 6px; }\n.ext:hover { background: var(--wash); color: var(--signal); }\n.ext svg { width: 15px; height: 15px; }\n.detail { padding: 0 46px 18px 72px; display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 6px 28px; font-family: var(--serif); font-size: 0.98rem; }\n.detail .lbl { font-family: var(--mono); font-size: 0.72rem; color: var(--muted); margin-right: 8px; }\n.detail .side { display: grid; gap: 4px; justify-items: end; text-align: right; font-family: var(--display); font-size: 0.85rem; color: var(--muted); }\n.empty { padding: 24px 0; color: var(--muted); }\n\n.appendix { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: 40px 56px; }\n.table-wrap { overflow-x: auto; }\ntable { width: 100%; border-collapse: collapse; font-family: var(--display); font-size: 0.92rem; min-width: 520px; }\nth, td { text-align: left; padding: 10px 12px 10px 0; border-bottom: 1px solid var(--rule); }\nthead th { font-family: var(--mono); font-size: 0.72rem; font-weight: 400; color: var(--muted); border-bottom: 2px solid var(--ink); }\ntd.r, th.r { text-align: right; }\n.mini { display: flex; align-items: center; gap: 10px; }\n.mini .bar { flex: 1; height: 6px; background: var(--wash); max-width: 140px; }\n.mini .bar span { display: block; height: 100%; background: var(--signal); }\n.method { display: grid; gap: 12px; font-size: 0.95rem; color: var(--ink-2); }\n.credit { margin-top: 72px; padding-top: 14px; border-top: 1px solid var(--rule); color: var(--muted); }\n\n@media (max-width: 860px) {\n  .chapter { padding-block: 72px 0; }\n  .chapter-head, .topics-wrap, .appendix { grid-template-columns: 1fr; }\n  .findings { grid-template-columns: 1fr; gap: 28px; }\n  .story { grid-template-columns: 1fr; }\n  .fig { height: auto; padding-block: 12px 10px; border-bottom: 1px solid var(--rule); gap: 8px; }\n  .fig-head { min-height: 3.6rem; padding-bottom: 8px; }\n  .readout { font-size: 2.6rem; }\n  .readout-label { font-size: 0.95rem; }\n  .stage { width: min(100%, 40vh * 1.25); margin: 0 auto; }\n  .clabel b { font-size: 0.72rem; } .clabel span { font-size: 0.66rem; } .clabel .csub { display: none; }\n  .fig-foot { min-height: 0; }\n  .fig-foot .caption { display: none; }\n  .steps { padding-block: 8vh 30vh; }\n  .step { min-height: 62vh; }\n  .toggle { grid-template-columns: minmax(0, 1fr) auto 16px; grid-template-areas: \"who fol chev\" \"why why why\"; gap: 2px 10px; padding: 10px 0; }\n  .toggle .who { grid-area: who; } .toggle .fol { grid-area: fol; } .toggle .chev { grid-area: chev; } .toggle .why { grid-area: why; }\n  .toggle .tag, .toggle .rk { display: none; }\n  .detail { padding: 0 8px 16px 34px; grid-template-columns: 1fr; }\n  .detail .side { justify-items: start; text-align: left; }\n}\n@media (prefers-reduced-motion: reduce) { * { transition: none !important; } }\n";
const MARKUP = "<div class=\"page\">\n  <div class=\"mast mono\"><span id=\"mast-left\"></span><span class=\"num\" id=\"mast-date\"></span></div>\n\n  <section class=\"title\">\n    <h1 id=\"title\"></h1>\n    <p class=\"lede\" id=\"lede\"></p>\n    <div class=\"byline mono\" id=\"byline\"></div>\n  </section>\n\n  <section class=\"chapter\" aria-labelledby=\"h-sample\">\n    <div class=\"chapter-head\"><h2 id=\"h-sample\"></h2></div>\n    <div class=\"story\">\n      <figure class=\"fig\" aria-labelledby=\"fig1-cap\">\n        <div class=\"fig-head\" aria-live=\"polite\"><span class=\"readout\" id=\"readout\"></span><span class=\"readout-label\" id=\"readout-label\"></span></div>\n        <div class=\"stage sources\" id=\"stage\"><div class=\"grid-lines\" aria-hidden=\"true\"></div></div>\n        <div class=\"fig-foot\"><div class=\"legend\" id=\"legend\"></div><figcaption class=\"caption mono\" id=\"fig1-cap\"></figcaption></div>\n      </figure>\n      <div class=\"steps\" id=\"steps\"></div>\n    </div>\n  </section>\n\n  <section class=\"chapter\" aria-labelledby=\"h-topics\">\n    <div class=\"chapter-head\"><h2 id=\"h-topics\">What fills their timeline</h2><p>Most common first. Pick one to see who on the shortlist posts about it.</p></div>\n    <div class=\"topics-wrap\">\n      <ol class=\"topic-list\" id=\"topics\"></ol>\n      <div class=\"side-note\"><h3>What they read and use</h3><dl class=\"feed\" id=\"reads\"></dl></div>\n    </div>\n  </section>\n\n  <section class=\"chapter\" aria-labelledby=\"h-find\">\n    <div class=\"chapter-head\"><h2 id=\"h-find\"></h2></div>\n    <div class=\"findings\" id=\"findings\"></div>\n  </section>\n\n  <section class=\"chapter\" aria-labelledby=\"h-list\" id=\"shortlist\">\n    <div class=\"chapter-head\"><h2 id=\"h-list\"></h2><p>Ranked by fit. All posted in the last 14 days.</p></div>\n    <div class=\"fig2\">\n      <div class=\"strip\" id=\"strip\" role=\"group\" aria-label=\"Followers of each shortlisted person, log scale\"><div class=\"band\" id=\"band\"></div><div class=\"axis\"></div></div>\n      <p class=\"strip-cap\" id=\"strip-cap\"></p>\n    </div>\n    <div class=\"sl-head\">\n      <div class=\"pills\" role=\"group\" aria-label=\"Filter by source\" id=\"filters\"></div>\n      <div class=\"progress\" aria-live=\"polite\"><span><b id=\"done-count\" class=\"num\">0</b> of <span class=\"num\" id=\"done-total\"></span> checked</span><div class=\"track\"><span id=\"done-bar\"></span></div></div>\n    </div>\n    <div class=\"controls\">\n      <p class=\"topic-note\" id=\"topic-note\" hidden><span id=\"topic-text\"></span><button type=\"button\" id=\"topic-clear\">Show everyone</button></p>\n      <label class=\"sort\" for=\"sort\">Sort <select id=\"sort\"><option value=\"fit\">By fit</option><option value=\"followers\">Most followers</option><option value=\"fewest\">Fewest followers</option></select></label>\n    </div>\n    <ol class=\"list\" id=\"list\"></ol>\n  </section>\n\n  <section class=\"chapter\" aria-labelledby=\"h-app\">\n    <div class=\"chapter-head\"><h2 id=\"h-app\">Sources and method</h2></div>\n    <div class=\"appendix\">\n      <div class=\"table-wrap\"><table>\n        <thead><tr><th>Source</th><th>Account</th><th class=\"r\">Followers</th><th>Engagements sampled</th></tr></thead>\n        <tbody id=\"sources\"></tbody>\n      </table></div>\n      <div class=\"method\" id=\"method\"></div>\n    </div>\n  </section>\n\n  <p class=\"credit mono\">Template by <a href=\"https://heymoot.com\">heymoot</a> \u00b7 <a href=\"https://github.com/heymoot/founder-tools\">founder-tools</a></p>\n</div>";
const FONTS = "<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\"><link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin><link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@500;600;800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=JetBrains+Mono:wght@400;500&display=swap\">";
document.head.insertAdjacentHTML("beforeend", FONTS + "<style>" + STYLES + "</style>");
if (!window.DATA) {
  document.body.insertAdjacentHTML("afterbegin", '<p style="font:16px system-ui;padding:24px">No report data found. The page must set window.DATA before loading report.js.</p>');
  return;
}
document.body.insertAdjacentHTML("afterbegin", MARKUP);
const DATA = window.DATA;
/* ===================== rendering (no need to edit below) ===================== */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const fmtF = n => n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
const fmtD = d => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });
const fmtLong = d => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
const GC = ["--g1", "--g2", "--g3", "--g4", "--g5"];
const P = DATA.prospects.map((p, i) => ({ ...p, rank: i }));
const totalSample = DATA.sources.reduce((a, s) => a + s.sample, 0);

/* Header */
document.title = `${DATA.product} · Prospect research`;
$("mast-left").textContent = `${DATA.product} · prospect research`;
$("mast-date").textContent = fmtLong(DATA.date);
$("title").textContent = DATA.title;
$("lede").innerHTML = `${esc(DATA.lede.before)} <span class="key">${esc(DATA.lede.key)}</span> ${esc(DATA.lede.after)}`;
$("byline").innerHTML = `<span>Sources <b>${DATA.sources.filter(s => !s.plus).map(s => esc(s.name)).join(", ")}</b></span><span>Window <b>last ${DATA.windowDays} days</b></span><span>Sample <b class="num">${DATA.uniquePeople} people</b></span>`;
$("h-sample").textContent = DATA.storyTitle;
$("fig1-cap").textContent = `Fig. 1 · Engaged audience, last ${DATA.windowDays} days. Shares approximate.`;
$("h-find").textContent = DATA.findingsTitle;
$("findings").innerHTML = DATA.findings.map(f => `<div class="finding"><h3>${esc(f.h)}</h3><p>${esc(f.p)}</p></div>`).join("");
$("reads").innerHTML = DATA.reads.map(r => `<dt class="mono">${esc(r.k)}</dt><dd>${esc(r.v)}</dd>`).join("");
$("h-list").textContent = `${P.length} people to check by hand`;
$("done-total").textContent = P.length;
const maxS = Math.max(...DATA.sources.map(s => s.sample));
$("sources").innerHTML = DATA.sources.map(s => `<tr><td><b>${esc(s.name)}</b></td><td>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.account)}</a>` : `<span style="color:var(--muted)">${esc(s.account)}</span>`}</td><td class="r num">${esc(s.followers)}</td><td><div class="mini"><span class="num">${s.sample}${s.plus ? "+" : ""}</span><div class="bar"><span style="width:${(s.sample / maxS * 100).toFixed(1)}%"></span></div></div></td></tr>`).join("");
$("method").innerHTML = DATA.method.map(m => `<p>${esc(m)}</p>`).join("") + `<p class="mono" style="color:var(--muted)">Checkmarks are saved in this browser only.</p>`;

/* Lede: words light up as you scroll */
const lede = $("lede");
(function wrap(node) {
  [...node.childNodes].forEach(n => {
    if (n.nodeType === 3) {
      const frag = document.createDocumentFragment();
      n.textContent.split(/(\s+)/).forEach(part => {
        if (!part) return;
        if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
        else { const s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.appendChild(s); }
      });
      n.replaceWith(frag);
    } else if (n.nodeType === 1) wrap(n);
  });
})(lede);
const words = [...lede.querySelectorAll(".w")], keyEl = lede.querySelector(".key"), keyWords = [...keyEl.querySelectorAll(".w")];
if (!reduce) lede.classList.add("js");
function lightLede() {
  const f = Math.min(1, 0.34 + scrollY / (innerHeight * 0.55)), n = Math.round(words.length * f);
  words.forEach((w, i) => w.classList.toggle("lit", i < n));
  keyEl.classList.toggle("on", keyWords.every(w => w.classList.contains("lit")));
}

/* Fig. 1: dots regroup per step. Stage is 100 x 80 units; x in % of width, y in % of height. */
const stage = $("stage");
const toCounts = (groups, n) => {          // largest remainder, so counts sum to n
  const raw = groups.map(g => g.pct / 100 * n), base = raw.map(Math.floor);
  let left = n - base.reduce((a, b) => a + b, 0);
  raw.map((r, i) => [r - base[i], i]).sort((a, b) => b[0] - a[0]).forEach(([, i]) => { if (left > 0) { base[i]++; left--; } });
  return groups.map((g, i) => ({ ...g, n: base[i], c: GC[i % GC.length], pctLabel: `~${g.pct}%` }));
};
const ROLE = toCounts(DATA.roles, DATA.uniquePeople), ACT = toCounts(DATA.activity, DATA.uniquePeople);
if (ACT.length >= 3) ACT[ACT.length - 1].c = "--g4";
const N = Math.max(totalSample, DATA.uniquePeople);
const dots = Array.from({ length: N }, () => { const d = document.createElement("span"); d.className = "dot"; stage.appendChild(d); return d; });
const K = DATA.sources.length, colW = 100 / K;
DATA.sources.forEach((s, i) => stage.insertAdjacentHTML("beforeend",
  `<div class="clabel" style="left:${colW * (i + 0.5)}%;width:${colW - 1}%"><b>${esc(s.name)}</b><span class="mono num"><span class="csub">${esc(s.account)}<br></span>${s.sample}${s.plus ? "+" : ""}</span></div>`));

function sourcesLayout() {
  // pick a per-column dot count that gives the biggest dots while the tallest stack fits 56 units
  let best = { d: 0, c: 1 };
  for (let c = 1; c <= 10; c++) {
    const rows = Math.ceil(maxS / c), d = Math.min((colW - 3) / c, 56 / rows);
    if (d > best.d) best = { d, c };
  }
  const { d, c } = best, out = [];
  DATA.sources.forEach((s, i) => {
    const cx = colW * (i + 0.5);
    for (let j = 0; j < s.sample; j++) {
      const col = j % c, row = Math.floor(j / c);
      out.push({ x: cx + (col - (c - 1) / 2) * d, y: (58 - row * d) / 0.8, size: d * 0.8, c: "--signal", o: 1 });
    }
  });
  return out;
}
function peopleLayout(groups, focus) {
  const n = DATA.uniquePeople;
  let best = { d: 0, cols: 1 };
  for (let cols = 2; cols <= 20; cols++) {
    const rows = Math.ceil(n / cols), d = Math.min(76 / cols, 60 / rows);
    if (d > best.d) best = { d, cols };
  }
  const { d, cols } = best, rows = Math.ceil(n / cols), colors = [];
  if (groups) groups.forEach((g, gi) => { for (let j = 0; j < g.n; j++) colors.push({ c: g.c, gi }); });
  const out = [];
  for (let i = 0; i < n; i++) {
    const col = i % cols, row = Math.floor(i / cols), g = colors[i] || { c: "--signal", gi: -1 };
    out.push({ x: 50 + (col - (cols - 1) / 2) * d, y: (40 + (row - (rows - 1) / 2) * d) / 0.8, size: d * 0.8, c: g.c, o: focus != null && g.gi !== focus ? 0.18 : 1 });
  }
  return out;
}
const restPct = 100 - DATA.roles[0].pct;
const STATES = [
  { val: String(totalSample), label: `engagements sampled across ${K} sources`, lay: sourcesLayout, legend: null },
  { val: String(DATA.uniquePeople), label: "people, once repeats are removed", lay: () => peopleLayout(null), legend: null },
  { val: `~${DATA.roles[0].pct}%`, label: DATA.roles[0].name.toLowerCase(), lay: () => peopleLayout(ROLE, 0), legend: ROLE, focus: 0 },
  { val: `~${restPct}%`, label: DATA.roles.slice(1).map(r => r.name.toLowerCase()).join(", "), lay: () => peopleLayout(ROLE, null), legend: ROLE },
  { val: `~${DATA.activity[0].pct}%`, label: DATA.activity[0].name.toLowerCase(), lay: () => peopleLayout(ACT, 0), legend: ACT, focus: 0 }
];
$("steps").innerHTML = DATA.steps.slice(0, 5).map((s, i) => `<div class="step" data-state="${i}"><div class="step-card"><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></div></div>`).join("");
const readout = $("readout"), rlabel = $("readout-label"), legend = $("legend");
let cur = -1, raf = 0;
function countTo(text) {
  cancelAnimationFrame(raf);
  const m = text.match(/^([^\d]*)(\d+)(.*)$/), from = parseInt((readout.textContent.match(/\d+/) || ["0"])[0], 10);
  if (!m || reduce) { readout.textContent = text; return; }
  const to = +m[2], t0 = performance.now();
  const tick = now => { const p = Math.min(1, (now - t0) / 650), e = 1 - Math.pow(1 - p, 4);
    readout.textContent = m[1] + Math.round(from + (to - from) * e) + m[3]; if (p < 1) raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);
}
function setState(i) {
  if (i === cur) return; cur = i;
  const st = STATES[i], lay = st.lay(), stagger = Math.min(9, 400 / N);
  dots.forEach((d, k) => {
    const p = lay[k] || { x: 50, y: 50, size: lay[0].size, c: "--g4", o: 0, s: 0.2 };
    d.style.left = p.x + "%"; d.style.top = p.y + "%"; d.style.width = p.size + "%";
    d.style.background = `var(${p.c})`; d.style.setProperty("--o", p.o); d.style.setProperty("--s", p.s || 1);
    d.style.transitionDelay = reduce ? "0ms" : (k * stagger) + "ms";
  });
  stage.classList.toggle("sources", i === 0);
  countTo(st.val); rlabel.textContent = st.label;
  legend.innerHTML = st.legend ? st.legend.map((g, gi) => `<span class="${st.focus != null && gi !== st.focus ? "off" : ""}"><i style="background:var(${g.c})"></i>${esc(g.name)} <span class="mono num" style="color:var(--muted)">${g.pctLabel}</span></span>`).join("") : "";
  document.querySelectorAll(".step").forEach(s => s.classList.toggle("active", +s.dataset.state === i));
}
setState(0);
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) setState(+e.target.dataset.state); }), { rootMargin: "-45% 0px -45% 0px" });
document.querySelectorAll(".step").forEach(s => io.observe(s));

/* Shortlist state */
const KEY = `prospects-${DATA.product}-${DATA.date}`;
let done = new Set();
try { done = new Set(JSON.parse(localStorage.getItem(KEY) || "[]")); } catch (e) {}
const save = () => { try { localStorage.setItem(KEY, JSON.stringify([...done])); } catch (e) {} };
let filter = "all", sort = "fit", topic = null;
const open = new Set();
const CHEV = '<svg class="chev" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 6l4 4 4-4"/></svg>';
const EXT = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 3h4v4M13 3L7 9M11 9.5V13H3V5h3.5"/></svg>';
const isDemo = P.every(p => (p.proofUrl || "").includes("example.com"));
const xUrl = p => isDemo ? `https://example.com/x/${p.handle}` : `https://x.com/${p.handle}`;

/* Source filters */
const srcNames = [...new Set(P.map(p => p.source))];
$("filters").innerHTML = `<button type="button" data-f="all" aria-pressed="true">All<span class="count num">${P.length}</span></button>` +
  srcNames.map(s => `<button type="button" data-f="${esc(s)}" aria-pressed="false">${esc(s)}<span class="count num">${P.filter(p => p.source === s).length}</span></button>`).join("") +
  `<button type="button" data-f="todo" aria-pressed="false">Not checked</button>`;

/* Topics */
const TOPICS = DATA.topics.map(t => {
  const res = t.match.map(w => new RegExp(`\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "i"));
  return { label: t.label, people: P.filter(p => res.some(re => re.test(p.bio + " " + p.topics))).map(p => p.handle) };
});
const topicsEl = $("topics");
function renderTopics() {
  topicsEl.innerHTML = TOPICS.map((t, i) => `<li><button type="button" class="topic" data-i="${i}" aria-pressed="${topic === t}" ${t.people.length ? "" : "disabled"}>
    <span class="rank mono num">${String(i + 1).padStart(2, "0")}</span><span class="t">${esc(t.label)}</span><span class="c mono num">${t.people.length || "–"}</span></button></li>`).join("");
}
topicsEl.addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b || b.disabled) return;
  const t = TOPICS[+b.dataset.i]; topic = topic === t ? null : t;
  renderTopics(); render();
  if (topic) $("shortlist").scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
});
$("topic-clear").addEventListener("click", () => { topic = null; renderTopics(); render(); });

/* List */
const list = $("list");
function visible() {
  let rows = P.filter(p => filter === "all" ? true : filter === "todo" ? !done.has(p.handle) : p.source === filter);
  if (topic) rows = rows.filter(p => topic.people.includes(p.handle));
  return rows.sort((a, b) => sort === "followers" ? b.followers - a.followers : sort === "fewest" ? a.followers - b.followers : a.rank - b.rank);
}
function rowHTML(p) {
  const o = open.has(p.handle), d = done.has(p.handle);
  return `<li class="row${d ? " done" : ""}${o ? " open" : ""}" data-h="${esc(p.handle)}">
    <div class="line">
      <input type="checkbox" id="c-${esc(p.handle)}" ${d ? "checked" : ""} aria-label="Checked @${esc(p.handle)}">
      <button type="button" class="toggle" aria-expanded="${o}" aria-controls="d-${esc(p.handle)}">
        <span class="rk mono num">${String(p.rank + 1).padStart(2, "0")}</span>
        <span class="who"><span class="handle">@${esc(p.handle)}</span><span class="name">${esc(p.name)}</span></span>
        <span class="fol num">${fmtF(p.followers)}</span><span class="tag mono">${esc(p.source)}</span>
        <span class="why">${esc(p.why)}</span>${CHEV}
      </button>
      <a class="ext" href="${esc(xUrl(p))}" target="_blank" rel="noopener" aria-label="Open @${esc(p.handle)} on X">${EXT}</a>
    </div>
    <div class="detail" id="d-${esc(p.handle)}" ${o ? "" : "hidden"}>
      <div><p><span class="lbl">BIO</span>${esc(p.bio)}</p><p><span class="lbl">POSTS</span>${esc(p.topics)}</p></div>
      <div class="side"><a href="${esc(p.proofUrl)}" target="_blank" rel="noopener">${esc(p.proof)}</a>
        <span class="num">${p.followers.toLocaleString("en-US")} followers · last post ${fmtD(p.last)}</span><span>Found via ${esc(p.source)}</span></div>
    </div></li>`;
}
function progress() { $("done-count").textContent = done.size; $("done-bar").style.width = (done.size / P.length * 100) + "%"; }
function render() {
  const rows = visible();
  list.innerHTML = rows.length ? rows.map(rowHTML).join("") : `<li class="empty">Nobody left in this view.</li>`;
  $("topic-note").hidden = !topic;
  if (topic) $("topic-text").textContent = `Showing people who post about ${topic.label.toLowerCase()} (${rows.length}).`;
  progress(); renderStrip();
}
list.addEventListener("change", e => {
  const li = e.target.closest(".row"); if (!li) return;
  e.target.checked ? done.add(li.dataset.h) : done.delete(li.dataset.h); save();
  if (filter === "todo") render(); else { li.classList.toggle("done", e.target.checked); progress(); renderStrip(); }
});
list.addEventListener("click", e => {
  const t = e.target.closest(".toggle"); if (!t) return;
  const li = t.closest(".row"), h = li.dataset.h, now = !open.has(h);
  now ? open.add(h) : open.delete(h);
  li.classList.toggle("open", now); t.setAttribute("aria-expanded", String(now)); li.querySelector(".detail").hidden = !now;
});
$("filters").addEventListener("click", e => {
  const b = e.target.closest("button"); if (!b) return;
  filter = b.dataset.f;
  $("filters").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  render();
});
$("sort").addEventListener("change", e => { sort = e.target.value; render(); });

/* Fig. 2: followers, log scale */
const strip = $("strip"), cap = $("strip-cap");
const capDefault = "Fig. 2 · Followers, log scale. Shaded: typical range across the sample. Click a dot to open that person.";
cap.textContent = capDefault;
const fmax = Math.max(...P.map(p => p.followers), DATA.followerRange[1]), fmin = Math.min(...P.map(p => p.followers), DATA.followerRange[0]);
const L0 = Math.log10(fmin * 0.75), L1 = Math.log10(fmax * 1.4), x = v => ((Math.log10(v) - L0) / (L1 - L0)) * 100;
$("band").style.left = x(DATA.followerRange[0]) + "%"; $("band").style.width = (x(DATA.followerRange[1]) - x(DATA.followerRange[0])) + "%";
[100, 200, 500, 1000, 2000, 5000, 10000, 20000, 50000].filter(t => x(t) >= 0 && x(t) <= 100).forEach(t =>
  strip.insertAdjacentHTML("beforeend", `<span class="tickm" style="left:${x(t)}%"></span><span class="tick mono num" style="left:${x(t)}%">${fmtF(t)}</span>`));
function renderStrip() {
  strip.querySelectorAll(".pt").forEach(n => n.remove());
  P.forEach(p => strip.insertAdjacentHTML("beforeend", `<button type="button" class="pt${done.has(p.handle) ? " done" : ""}" style="left:${x(p.followers)}%" data-h="${esc(p.handle)}" aria-label="@${esc(p.handle)}, ${p.followers.toLocaleString("en-US")} followers"></button>`));
}
const showPt = b => { const p = P.find(q => q.handle === b.dataset.h); cap.innerHTML = `<b>@${esc(p.handle)}</b> · ${p.followers.toLocaleString("en-US")} followers · found via ${esc(p.source)}${done.has(p.handle) ? " · checked" : ""}`; };
strip.addEventListener("mouseover", e => { const b = e.target.closest(".pt"); if (b) showPt(b); });
strip.addEventListener("focusin", e => { const b = e.target.closest(".pt"); if (b) showPt(b); });
strip.addEventListener("mouseleave", () => { cap.textContent = capDefault; });
strip.addEventListener("click", e => {
  const b = e.target.closest(".pt"); if (!b) return;
  const h = b.dataset.h; filter = "all"; topic = null; open.add(h);
  $("filters").querySelectorAll("button").forEach(z => z.setAttribute("aria-pressed", String(z.dataset.f === "all")));
  renderTopics(); render();
  const li = list.querySelector(`[data-h="${CSS.escape(h)}"]`);
  li.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" }); li.querySelector(".toggle").focus({ preventScroll: true });
});

renderTopics(); render(); lightLede();
let ticking = false;
addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { lightLede(); ticking = false; }); } }, { passive: true });

})();
