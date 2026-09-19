---
name: aikaryashala-theme
description: The AI Karyashala visual system for standalone HTML teaching pages — colour tokens, typography, component patterns, and a ready-to-paste CSS base. Read this before building any student-facing page, visualizer, or reference sheet.
---

# AI Karyashala theme

Warm paper, one rust accent, mono for anything that is literally code or data. Every deliverable is a single self-contained HTML file with all CSS and JS inline, no runtime dependency beyond Google Fonts.

The system exists so a student who has seen one page can navigate the next one without relearning anything: rust always means "this is the thing happening right now", mono always means "this is a program or a value", a hairline border always means "these are two different things".

---

## 1. Colour tokens

Paste as-is. Do not add tokens without a reason that survives the next page.

```css
:root{
  --cream:#faf6ef;   /* page background */
  --paper:#fffdf9;   /* panels sitting on the cream */
  --ink:#2b2622;     /* body text; also the terminal/console background */
  --muted:#6f675e;   /* labels, captions, secondary text */

  --rust:#b8430a;    /* the accent — active/current/now */
  --teal:#14746f;    /* secondary — valid, live, correct, success */
  --gold:#a97b12;    /* secondary — finished, warning, neutral-terminal */

  --line:rgba(43,38,34,.14);   /* structural dividers, panel borders */
  --line2:rgba(43,38,34,.07);  /* dividers inside a panel, table rows */
}
```

Borders are the ink colour at low alpha, never a cool grey (`#ddd`, `#e5e7eb`). A grey border is the fastest way to make a page look like it came from somewhere else.

### Accent discipline

Rust is the only accent. It marks exactly one idea per page: the thing currently happening. The active code line, the current row, the live step, the progress bar. If two things are rust at once and they are not the same thing, one of them is wrong.

Teal and gold are a semantic pair, not decoration. Reach for them only when the lesson genuinely turns on distinguishing states — `SQLITE_OK` vs `SQLITE_ROW` vs `SQLITE_DONE`, valid vs dangling pointer, correct vs incorrect answer. On a page with no state distinction, teal and gold do not appear at all.

| Meaning | Colour |
|---|---|
| Happening now, current, selected | rust |
| Valid, live, correct, allocated | teal |
| Finished, exhausted, caution | gold |
| Inert, not yet, dead, freed | muted |

---

## 2. Typography

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600&family=Inter+Tight:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
```

| Face | Role | Notes |
|---|---|---|
| Fraunces | Display headings — `h1`, section headings | weight 600, `letter-spacing:-.01em`, `line-height:1.12` |
| Inter Tight | Body, prose, buttons, quiz text | 16px base, `line-height:1.6` |
| JetBrains Mono | Code, identifiers, values, panel captions, keys, numbers | 12–13.5px |

The mono face carries the teaching load. Anything a student would type into a file or see in output is mono; anything explaining it is Inter Tight. That contrast is how they tell prose from program without reading a word.

Scale: `h1` `clamp(28px,4.4vw,42px)`, section headings 24px, body 16px, note/narration 16.5px, code 12.6px, panel captions 11px, micro-labels 10.5px.

Sentence case everywhere. No all-caps labels. No accenting a single word inside a heading in a different colour.

Prose wraps at `max-width:70ch`; the page wraps at `max-width:1040px`.

---

## 3. Texture and surfaces

A dot-grain overlay on the body keeps the cream from flattening to white on a projector:

```css
background-image:radial-gradient(rgba(43,38,34,.055) 1px, transparent 1px);
background-size:4px 4px;
```

Surfaces are flat. No shadows, no gradients, no elevation. Separation comes from the hairline border plus the paper-against-cream contrast. `border-radius` is `2px` — near-square, deliberately not the rounded-card look.

The one dark surface permitted is a terminal or console block: `--ink` background, `#f3ece1` text, `#8c8478` for the prompt symbol. Nothing else inverts.

---

## 4. Component patterns

### Panel

The workhorse container. Hairline border, mono caption bar, flat body.

```html
<div class="panel">
  <h2>query.c</h2>
  <div class="body">…</div>
</div>
```

```css
.panel{background:var(--paper);border:1px solid var(--line);border-radius:2px}
.panel h2{font-family:"JetBrains Mono",monospace;font-size:11px;font-weight:500;
  color:var(--muted);margin:0;padding:9px 14px;border-bottom:1px solid var(--line2);
  letter-spacing:.04em}
.panel .body{padding:12px 14px}
```

The caption is a lowercase mono label naming the thing (`query.c`, `terminal`, `students`), not a sentence and not a heading.

### Code block with an active line

Every line is a `<span class="ln">` so any line can be highlighted. Rust left border plus a rust wash at 9%.

```css
pre.code{margin:0;padding:12px 8px;font-family:"JetBrains Mono",monospace;
  font-size:12.6px;line-height:1.75;overflow-x:auto}
.ln{display:block;padding:1px 10px;border-left:2px solid transparent;white-space:pre}
.ln.on{background:rgba(184,67,10,.09);border-left-color:var(--rust)}
```

Render blank source lines as `' '` so they hold their height.

### State slot

For live values and handles — registers, variables, handle status.

```css
.slot{border:1px solid var(--line2);border-radius:2px;padding:9px 11px;
  background:rgba(43,38,34,.02)}
.slot .k{font-family:"JetBrains Mono",monospace;font-size:10.5px;color:var(--muted)}
.slot .v{font-family:"JetBrains Mono",monospace;font-size:13px;margin-top:3px}
.v.live{color:var(--teal);font-weight:500}
.v.warn{color:var(--rust)}
.v.dead{color:var(--muted)}
```

### Status badge

Mono, bold, bordered, tinted at ~8%. One class per semantic state.

```css
.rc{display:inline-block;font-family:"JetBrains Mono",monospace;font-size:12px;
  font-weight:700;padding:4px 10px;border-radius:2px;border:1px solid}
.rc.ok{color:var(--teal);border-color:rgba(20,116,111,.4);background:rgba(20,116,111,.07)}
.rc.now{color:var(--rust);border-color:rgba(184,67,10,.4);background:rgba(184,67,10,.08)}
.rc.done{color:var(--gold);border-color:rgba(169,123,18,.4);background:rgba(169,123,18,.08)}
.rc.none{color:var(--muted);border-color:var(--line);background:transparent}
```

### Data table

Mono throughout. Rows separated by `--line2` only — no vertical rules, no zebra striping. The current row gets a rust wash plus an inset rust bar on the first cell; excluded rows drop to `opacity:.34`.

```css
tr.cur td{background:rgba(184,67,10,.1)}
tr.cur td:first-child{box-shadow:inset 2px 0 0 var(--rust)}
tr.skip{opacity:.34}
```

### Stepper controls

Back / Play / Forward, a mono step counter pushed right with `margin-left:auto`, and a 2px progress track under them. Arrow keys must do the same thing as the buttons.

```css
button{font-family:"Inter Tight",sans-serif;font-size:14px;color:var(--ink);
  background:var(--paper);border:1px solid var(--line);border-radius:2px;
  padding:8px 14px;cursor:pointer;transition:background .15s}
button:hover{background:#f3ece1}
button:focus-visible{outline:2px solid var(--rust);outline-offset:2px}
.track{height:2px;background:var(--line2)}
.track span{display:block;height:2px;background:var(--rust);transition:width .3s}
```

Narration sits below the controls in a fixed-min-height block so the page does not jump between steps. Auto-advance interval: 3.4s.

### Definition list

For API summaries, glossaries, opcode tables. Mono term in a fixed left column, prose right, hairline between rows. Collapses to one column under 640px.

```css
.rule{display:grid;grid-template-columns:170px 1fr;gap:18px;padding:14px 0;
  border-bottom:1px solid var(--line2)}
.rule .c{font-family:"JetBrains Mono",monospace;font-size:12.5px;color:var(--rust)}
@media(max-width:640px){.rule{grid-template-columns:1fr;gap:4px}}
```

### Quiz

Every page ends with an assessment block. Buttons as options, click to answer, correct answer turns teal and reveals the explanation; a wrong pick turns rust and the correct one also lights teal. Four questions is the usual count.

```css
.opt{display:block;width:100%;text-align:left;margin-bottom:7px;font-size:14.5px}
.opt.right{border-color:var(--teal);background:rgba(20,116,111,.09);color:var(--teal)}
.opt.wrong{border-color:var(--rust);background:rgba(184,67,10,.08);color:var(--rust)}
.exp{display:none;font-size:14.5px;color:var(--muted);
  border-left:2px solid var(--line);padding-left:12px;margin-top:10px}
.exp.show{display:block}
```

---

## 5. Page skeleton

```
header      h1 + one-paragraph sub (max 62ch) + the artifact in mono
            (the SQL, the command, the signature)
stage       two-column grid, minmax(0,1.08fr) / minmax(0,1fr),
            collapsing to one column at 860px
controls    back / play / forward / counter
track       progress
note        narration, min-height set
sections    definition list, then quiz
footer      one line: how to navigate, who it is for
```

The header's third element is always the concrete thing the page is about, set in mono and rust. Not a tagline.

---

## 6. Quality floor

Non-negotiable on every page:

- Single self-contained HTML file. All CSS and JS inline.
- Arrow-key navigation wherever there are steps.
- `button:focus-visible` outline in rust, 2px, offset 2px.
- `@media(prefers-reduced-motion:reduce){*{transition:none!important}}`
- `@media print{ }` — hide controls and progress, drop the background to white.
- Responsive to mobile: every multi-column grid has a single-column fallback.
- Copy buttons on any code a student is expected to type, stripping prompt symbols and output lines.
- Works offline once the fonts are cached; nothing else is fetched at runtime.

---

## 7. Copy voice

Plain verbs, sentence case, no filler. Name things as the student will meet them, in their own vocabulary — `sqlite3_step`, not "the stepping mechanism".

Narration explains what just changed and why it matters, in two or three sentences. It can point at a common mistake, because the visual is usually the best place to catch one. It does not congratulate, apologise, or announce what it is about to do.

Panel captions are mono lowercase nouns. Buttons say what happens. Empty and error states give direction, not mood.

---

## 8. Do not

- Do not introduce a cool grey. Borders and dividers are ink at low alpha.
- Do not use shadows, gradients, or elevated cards.
- Do not round corners past 2px.
- Do not let anything but a terminal block go dark.
- Do not use all-caps labels, or eyebrow labels above headings.
- Do not accent one word in a heading in rust.
- Do not add a fourth typeface, or use mono for prose.
- Do not use emoji anywhere.
- Do not add a colour to a page that does not encode a state the lesson depends on.
- Do not animate on load or on scroll. Motion answers a click or a keypress, nothing else.
