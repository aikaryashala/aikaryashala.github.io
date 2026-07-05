# Project Guidelines — Build in Public, Ship for Real

Eight rules to follow for **every** project you build. Most of them are not
about writing code — they are about making your work *visible, alive, and
defensible*. The rule for the whole sheet: **a project that only you can see,
run, and explain… barely exists.**

## How the eight fit together (keep this in front of you)

```
 write code ──► 1. commit DAILY to GitHub ──► 3. auto-DEPLOY on every push
      ▲                                               │
      │                      2. your .xyz DOMAIN points at the deployment
 8. opencode                                          │
 (AI pair-programmer         5. demo video + 6. implementation video (on
  speeds up the writing)        YouTube, embedded in the README) show it working
                                                      │
                        7. your PROFILE page collects everything
                                                      │
              4. the GenAI mock-interview makes sure you can DEFEND it
                 (especially the code the AI helped write!)
```

Each guideline feeds the next. Skip one and the chain breaks.

---

# Guideline 1 — Commit early, commit daily (even unfinished work)

> *Commit your code early to GitHub, even if it is not finished. Keep
> committing daily.*

### Why this is important

- **A commit is a save point.** Laptop dies, file deleted, bad edit at 2 AM —
  with daily commits you lose *one day* at most, never the project.
- **History is a debugging tool.** When something breaks, `git log` and
  `git diff` answer "what changed since it last worked?" — the same question
  you learned to ask in the debugging task, answered across days instead of
  lines.
- **Your GitHub contribution graph is public proof of work.** Recruiters and
  teachers *do* look at it. Thirty small green squares say more than one
  giant "final project" dump on the last day.
- **It kills perfectionism.** Waiting for "finished" means never committing.
  Unfinished code in a repo is normal — that is what version control is *for*.

### The best way to do it

1. **Day one, before writing real code:** create the GitHub repo, clone it,
   make the first commit (`README.md` with two lines about the project).
2. **End of every working session** (not "when it's done"):
   ```
   git status
   git add .
   git commit -m "Add input validation for the signup form"
   git push
   ```
3. Write commit messages that say **what the commit does** — "Add login page",
   "Fix crash when list is empty" — not "changes", "update", "final",
   "final2".
4. Add a `.gitignore` early so junk never enters history: build outputs,
   executables (your `sum`!), `node_modules/`, `.DS_Store`, secret keys.
   **Never commit passwords or API keys** — a pushed secret is public forever,
   even if you delete it later (remember: history keeps everything).
5. Team of 5? Everyone commits *their own* work with their own account —
   the contribution graph and `git log` should show five names, not one.

**Takeaway to say out loud:** commit = save point + proof of work. Daily,
small, honestly-described commits — finished or not.

---

# Guideline 2 — Buy a numeric `.xyz` domain (6–9 digits)

> *Buy a domain with 6–9 digits and `.xyz`.*

### Why this is important

- **A real domain makes your project a real product.** `651042.xyz` on a
  resume looks and behaves like a live product; a long
  `something.vercel.app` link looks like homework.
- **Why specifically 6–9 digits + `.xyz`?** The `.xyz` registry prices every
  domain that is *purely 6 to 9 digits* (the "1.111B class") at roughly
  **$0.99–$2 per year** — the cheapest real domain on the internet. You get
  the full experience of owning a domain for the price of a snack.
- **You learn DNS by owning one.** Records, nameservers, propagation — the
  address book of the internet stops being theory the day *your* name is in
  it.
- One domain can serve everything: the project on the root, your portfolio on
  a subdomain (or the reverse) — guideline 7 will want a home.

### The best way to do it

1. Pick a registrar: **Namecheap, Porkbun, GoDaddy, or Cloudflare**. Search
   any 6–9 digit number, e.g. `740216.xyz` — check the price says ~$1/yr, not
   a "premium" price.
2. Choose digits you can *say out loud* and remember — avoid look-alike runs
   like `000` vs `00`. (A memorable pattern beats your birthday, which you
   shouldn't publish anyway.)
3. **Turn OFF auto-added extras** at checkout (email hosting trials, "site
   builders"). You need only the domain. Keep WHOIS privacy ON (usually free).
4. After buying, do nothing else there — the domain connects to your project
   in Guideline 3 by adding the DNS records your deployment platform shows
   you (typically an `A` record or a `CNAME`).
5. Set a **renewal reminder**: the second year usually costs the same for
   this class of domain, but an expired domain takes your links down — and
   your README, resume, and profile all point at it.

**Takeaway to say out loud:** one dollar a year buys you a permanent, serious
address on the internet — and a working knowledge of DNS.

---

# Guideline 3 — Deploy it: Vercel, Railway, Render, Supabase

> *Deploy your project using Vercel, Railway, Render, Supabase.*

### Why this is important

- **"Works on my laptop" is invisible.** A teacher, teammate, or recruiter
  will not clone, install, and compile your project. They *will* click a
  link. Deployment turns "trust me, it works" into "see for yourself."
- **Deployment finds a whole class of bugs** that never appear on your
  machine: hard-coded file paths, missing environment variables, secret keys
  in code, "it needs the exact stuff I installed last month." Fixing these is
  real engineering.
- **Auto-deploy rewards Guideline 1**: connect the platform to your GitHub
  repo, and every push becomes a live update. Commit daily → your live site
  improves daily.

### The best way to do it

1. Match the tool to the job — all four have free tiers:

   | Platform | Best for |
   |----------|----------|
   | **Vercel** | Frontends & static sites (HTML/CSS/JS, React, Next.js) |
   | **Render** | Backend servers / APIs (and static sites too) |
   | **Railway** | Backends + databases, quick full-stack experiments |
   | **Supabase** | Ready-made database + login/auth (Postgres as a service) |

   A common combo: **frontend on Vercel + database/auth on Supabase.**
2. Deploy **in week one, not the last day.** An ugly, half-working live page
   beats a perfect plan. You'll deploy 50 times; the first must not be the
   night before the demo.
3. Always deploy **from the GitHub repo** (all four platforms offer "Import
   from GitHub"), never by uploading files by hand — that's what makes
   push = release.
4. Put secrets (API keys, database URLs) in the platform's **environment
   variables** screen — never in committed code (Guideline 1, rule 4).
5. Connect your `.xyz` domain: platform dashboard → *Add custom domain* → it
   shows you exactly which DNS record to add at your registrar → wait a few
   minutes → **https on your own name.**

**Takeaway to say out loud:** deploy in week one, from GitHub, secrets in
environment variables, your domain on top. From then on, `git push` *is*
shipping.

---

# Guideline 4 — Let GenAI interview your team about your own code

> *Give your codebase to a GenAI (like ChatGPT) and ask it to act as an
> interviewer: questions only, no answers — hints for the first 3 tries, then
> the explanation. After 5 questions, ask it to summarize what was learnt. Do
> it with all 5 members of the project together.*

### Why this is important

- **Writing code and being able to *defend* code are different skills** — and
  interviews, vivas, and demos test the second one. If you built it but can't
  explain it, evaluators assume you didn't build it.
- **Being questioned beats re-reading.** Trying to answer from memory (and
  failing, and then hearing the explanation) is *retrieval practice* — it
  cements understanding far better than passively reviewing your own code.
- **It finds the team's blind spots.** In every team, each member deeply knows
  only their part. Five people answering together discover which parts
  *nobody* actually understands — before an interviewer does.
- The "3 hints first" rule matters: instant answers teach nothing; struggling
  a little, with hints, is where the learning happens.

### The best way to do it

1. Share the code with the AI (paste key files, or share the GitHub repo
   link), then give it this prompt — adjust freely, keep the rules:
   ```
   Here is our project's codebase. Act as a strict technical interviewer.
   Ask us ONE question at a time about our own project - design choices,
   how the code works, what breaks under edge cases.
   Do NOT give the answer. If our answer is wrong or incomplete, give a
   hint and let us retry - up to 3 hints. Only after the 3rd failed try,
   explain the answer fully.
   After 5 questions, stop and summarize: what we knew well, what we
   didn't, and what we should study.
   ```
2. **All 5 members, one screen, one hour.** Rotate: a different member must
   answer first on each question; the others may add on after. (Otherwise the
   strongest member answers everything and the exercise is wasted.)
3. Answer **out loud before typing** — saying it forces clarity that nodding
   along never does.
4. Write the final summary into the repo (`docs/interview-notes.md` — commit
   it, Guideline 1!) and fix the weak spots it lists.
5. Repeat once a week. The questions get harder as the project grows.

**Takeaway to say out loud:** the AI interview is a mirror — it shows the gap
between the code you *wrote* and the code you can *explain*. Close that gap
before a human interviewer finds it.

---

# Guideline 5 — Record a demo video, put it on YouTube, embed it in the README

> *Create a demo video, upload to YouTube, and embed it in your GitHub
> project's README.md.*

### Why this is important

- **Nobody runs your code — everybody watches a 2-minute video.** The demo
  video is the single highest-leverage artifact in the whole repo: it is how
  90% of visitors will experience your project.
- **A video survives everything.** Free hosting sleeps, domains expire, demos
  crash live on stage — the recording of it *working* is permanent proof.
- **Making the demo makes the product better.** The moment you record, you
  see your app through a stranger's eyes — confusing screens and ugly flows
  become obvious. Teams always fix things right after the first take.

### The best way to do it

1. Keep it **2–3 minutes**, and script it before recording — three beats:
   - *the problem* (15 seconds: who needs this and why),
   - *the walkthrough* (the 2–3 features that matter, used like a real user),
   - *the result* (what changed for the user).
   Show the app **at your real domain** — the URL bar is part of the demo.
2. Record with **OBS Studio** (free, all platforms) or any screen recorder.
   Speak while you click — silence feels broken. Multiple takes are normal;
   keep the best one.
3. Upload to YouTube as **Public or Unlisted** (unlisted = only people with
   the link — fine for class projects). Title it clearly:
   *"ProjectName — Demo"*.
4. "Embed" in the README the GitHub way: GitHub strips real video iframes, so
   the standard is a **clickable thumbnail** — YouTube auto-generates the
   image for every video:
   ```markdown
   ## Demo
   [![Watch the demo](https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
   ```
   Replace both `VIDEO_ID`s with the part after `v=` in your YouTube URL.
   Put this section **near the top** of the README — above installation
   instructions, below the one-line description.
5. Commit the README change (Guideline 1 — everything ends in a commit).

**Takeaway to say out loud:** the demo video is your project's front door.
Two scripted minutes, at your real URL, one click from the top of the README.

---

# Guideline 6 — Record an implementation video too

> *Create an implementation video and do the same as above.*

### Why this is important

- **The demo proves it works; the implementation video proves *you built
  it*.** In the age of copy-paste and AI-generated code, walking through your
  own architecture on camera is the strongest authorship evidence there is.
- **Explaining code aloud is a debugger for your understanding.** Gaps you
  didn't know you had appear the moment you try to narrate a file you
  "finished" last week. (This is Guideline 4's lesson again, self-serve.)
- Two videos serve **two audiences**: everyone watches the demo; the
  interviewer, teacher, or senior engineer watches the implementation video.

### The best way to do it

1. **5–10 minutes**, structured top-down — never file-by-file:
   - the architecture in one diagram (draw it, screenshot it, show it first),
   - how the pieces talk (frontend → API → database, or your equivalent),
   - a tour of the 2–3 files that carry the core logic,
   - **one hard problem and how you solved it** — this is the part experts
     remember,
   - honest limits: what you'd improve next.
2. Every team member explains **their own part** — five voices is authorship
   proof for five people; one narrator proves one.
3. Upload to YouTube exactly like the demo, titled *"ProjectName — How it's
   built"*, and add a second thumbnail-link section to the README:
   ```markdown
   ## How it's built
   [![Implementation walkthrough](https://img.youtube.com/vi/VIDEO_ID/hqdefault.jpg)](https://www.youtube.com/watch?v=VIDEO_ID)
   ```
4. Order in the README: description → **Demo** → **How it's built** → setup
   instructions → tech stack.

**Takeaway to say out loud:** demo = *what* it does; implementation video =
*how* and *by whom*. Together they answer the two questions every evaluator
has, before they ask.

---

# Guideline 7 — Put both videos on your profile page

> *Add both videos to your profile page.*

### Why this is important

- **Evaluators start at your profile, not your repo.** A recruiter has your
  name, not your project URL. Whatever your GitHub profile (and personal
  site) shows in the first ten seconds *is* your first impression.
- **Projects scattered across repos are invisible.** The profile page is the
  index — the one place that collects your best work and points everywhere
  else.
- Six months from now, *you* are the audience: one page holding every
  project, live link, and video is your living portfolio and resume
  attachment.

### The best way to do it

1. Create your **GitHub profile README** — a special repo named exactly like
   your username (repo `yourname/yourname`); its `README.md` displays on
   your profile page automatically.
2. Structure it simply: one line about you → **Projects**, each with:
   ```markdown
   ### ProjectName
   Live: https://651042.xyz
   [Demo video](https://www.youtube.com/watch?v=DEMO_ID) ·
   [How it's built](https://www.youtube.com/watch?v=IMPL_ID) ·
   [Code](https://github.com/team/repo)
   ```
   (The same thumbnail trick from Guideline 5 works here too, if you want
   images instead of links.)
3. **Pin the repo** on your profile (Customize pins → select it) so the
   project is visible even before scrolling.
4. If you built a personal site (your `.xyz` domain from Guideline 2 has
   room!), put the same project cards there — YouTube gives real embed code
   (Share → Embed) for proper inline players on your own site.
5. Update the profile the same day a project ships — it's one commit
   (Guideline 1, one last time).

**Takeaway to say out loud:** repos hold projects; the profile page holds
*you*. Both videos, the live URL, and the code — one page, ten seconds,
first impression handled.

---

# Guideline 8 — Develop with `opencode`, an AI coding agent in your terminal

> *Use opencode for development using AI models.*

### Why this is important

- **AI-assisted development is now how software is written.** Professional
  teams use AI coding agents daily; using one *well* — directing it,
  reviewing it, catching its mistakes — is a skill employers now expect,
  separate from coding itself.
- **opencode lives where you already work: the shell.** It is an open-source
  coding agent that runs in the terminal — the same environment as `clang`,
  `git`, and your scripts — and it can read your project, edit files, and run
  commands *with your approval*.
- **It is not locked to one AI vendor.** opencode connects to many model
  providers (Anthropic's Claude, OpenAI, Google Gemini, GitHub Copilot,
  OpenRouter, and more) — you learn the *workflow*, and can switch models as
  prices and quality change.
- **Used right, it is a teacher too**: it can explain unfamiliar code, walk
  through errors, and show you approaches you haven't met yet — an always-on
  senior to ask.
- The danger is real and has a rule already: code you accept but cannot
  explain fails **Guideline 4**. The AI writes *with* you, never *instead of*
  you.

### The best way to do it

1. **Install it** (it's a command-line tool like any other — afterwards, try
   `which opencode`, Task-5 style):
   ```
   curl -fsSL https://opencode.ai/install | bash
   ```
   (or `npm install -g opencode-ai`). Verify: `opencode --version`.
2. **Connect an AI model** — run:
   ```
   opencode auth login
   ```
   and pick a provider you have access to (Claude, OpenAI, Gemini, GitHub
   Copilot, OpenRouter…). The API key you paste is a **secret** — Guideline 1's
   rule applies: it lives in opencode's config, never in the repo.
3. **Start it inside your project**, and let it learn the project first:
   ```
   cd your-project
   opencode
   ```
   In the opencode screen, run `/init` — it scans the repo and writes an
   `AGENTS.md` file describing the project (build commands, structure,
   conventions) so every future session starts informed. **Commit that file.**
4. **Plan first, edit second.** opencode has two modes — switch with **Tab**:
   - **Plan mode**: discuss the approach; it reads code but *changes nothing*.
   - **Build mode**: it edits files and runs commands.
   Ask in plan mode ("how should we add login to this app?"), agree on the
   plan, *then* let build mode do it.
5. **Small asks, always reviewed.** One feature or one fix per request — not
   "build my whole project." Read **every diff** it proposes before
   accepting: you are the author; the AI is the fast typist.
6. **Commit before and after** (Guideline 1 pays off again): commit *before*
   letting the agent attempt anything big — git is your undo button if it
   goes wrong — and commit *after* each accepted change with an honest
   message.
7. **Test after every change**: run your test script (Task-7's
   `./test_sum.sh` habit) or the app itself. AI code that was never run is
   just a guess.
8. **Use it to learn, not only to produce**: "explain this file to me line by
   line", "why did you choose a loop here instead of recursion?", "what
   breaks if the input is empty?" Then bring that understanding to the
   Guideline 4 interview — where "the AI wrote it" is never an accepted
   answer.

### Samples — things to actually type into opencode

Try these on code you already have (your `sum.c` and test files from the
earlier tasks are perfect practice material). Each sample shows the *shape*
of a good ask — copy the shape, change the details.

**Sample 1 — understand before you touch (plan mode):**
```
Read sum.c and explain it to me line by line, in simple words.
What exactly happens when the user types a letter instead of a number?
```
Then check the answer yourself — run `./sum`, type `abc`, watch.

**Sample 2 — a small, well-bounded change (plan first, then build):**
```
Plan: I want sum.c to reject non-number input and ask again instead of
misbehaving. Don't change any code yet - tell me the approach and which
lines will change.
```
Read the plan. If you agree, press Tab into build mode:
```
Do it. Keep the change as small as possible, and keep the exact output
format for valid input unchanged, because my test files depend on it.
```
Notice the last clause — *you* knew the tests matter (Task 7); the AI didn't
until you said so. That context is your job.

**Sample 3 — grow the test suite:**
```
Look at test_sum.sh, input1.txt and expected_output1.txt to see how my
tests work. Add two more test cases in the same style: one with negative
numbers, one with large numbers. Update test_sum.sh to run all 4.
```
Then run `./test_sum.sh` yourself — never take "the tests should pass now"
on faith.

**Sample 4 — when you're stuck on an error:**
```
When I run ./test_sum.sh I get the output below. Explain what is wrong
and where to look - give me hints, not the fix, I want to try first.

[paste the actual error output here]
```
(The "hints, not the fix" clause is Guideline 4's trick, reused — you learn
more, and you can drop it when you're truly stuck.)

**Sample 5 — housekeeping chores it does well:**
```
Write a README.md for this project: what it does, how to compile it,
how to run the tests. Short and honest - no marketing language.
```
```
Create a .gitignore for a C project like this one - the compiled
executables and editor junk should never be committed.
```
Chores like these are where the agent saves the most time at zero risk —
review the diff, commit, done.

**Sample 6 — the whole-project question (before the Guideline 4 interview):**
```
Act as a reviewer: what are the 3 weakest points of this project's code?
For each one, explain why it is a problem. Don't fix anything.
```
Bring the answers to your team — fixing them *yourselves* is the best
interview preparation there is.

**Takeaway to say out loud:** opencode puts an AI pair-programmer inside your
terminal — plan first, ask small, review every diff, commit around it, test
after it. The AI multiplies your speed; Guidelines 1–7 make sure it never
replaces your understanding.

---

## One-page checklist (pin this above your desk)

| # | Guideline | The habit |
|---|-----------|-----------|
| 1 | Commit early & daily | `git add . && git commit && git push` — end of *every* session |
| 2 | 6–9 digit `.xyz` domain | ~$1/yr at Namecheap/Porkbun/Cloudflare; renewal reminder set |
| 3 | Deploy from week one | Vercel (frontend) / Render/Railway (backend) / Supabase (DB+auth); import from GitHub; secrets in env vars; domain connected |
| 4 | GenAI mock interview | Weekly, all 5 members; 1 question at a time, 3 hints, then answer; 5 questions → summary → committed to the repo |
| 5 | Demo video | 2–3 min, scripted, real domain in URL bar; YouTube; thumbnail-link at top of README |
| 6 | Implementation video | 5–10 min, architecture-first, each member narrates their part; second README section |
| 7 | Profile page | `yourname/yourname` README: live link + both videos + code, repo pinned |
| 8 | Develop with opencode | `opencode` in the project folder; `/init` once; plan → build; small asks; review every diff; commit before & after; test after |

**The chain to remember:** commit → deploy → domain → videos → profile — with
opencode speeding up the building, and the AI interview making sure you can
defend every link of it.

---

## New Words (కొత్త పదాలు — తెలుగు అర్థాలు)

| English word | తెలుగు అర్థం |
|--------------|--------------|
| **commit** | కమిట్ — ప్రాజెక్ట్ చరిత్రలో ఒక సేవ్-పాయింట్; సందేశంతో పాటు మార్పులను శాశ్వతంగా నమోదు చేయడం. |
| **repository (repo)** | రిపోజిటరీ — ప్రాజెక్ట్ ఫైళ్ళు + వాటి పూర్తి చరిత్ర ఉండే చోటు (GitHub లో ఒక ప్రాజెక్ట్ పెట్టె). |
| **version control** | వెర్షన్ నియంత్రణ — కోడ్ మార్పుల చరిత్రను దాచి, ఏ క్షణానికైనా వెనక్కి వెళ్ళగలిగే వ్యవస్థ (git). |
| **contribution graph** | కృషి పటం — GitHub ప్రొఫైల్‌లో రోజువారీ కమిట్లను చూపే ఆకుపచ్చ చతురస్రాల పట్టిక; బహిరంగ శ్రమ రుజువు. |
| **`.gitignore`** | గిట్-ఇగ్నోర్ — చరిత్రలోకి రాకూడని ఫైళ్ళ జాబితా (build ఫలితాలు, రహస్య కీలు, `node_modules/`). |
| **domain** | డొమైన్ — ఇంటర్నెట్‌లో మీ సొంత చిరునామా పేరు (ఉదా: `651042.xyz`). |
| **registrar** | రిజిస్ట్రార్ — డొమైన్లను అమ్మే, నమోదు చేసే సంస్థ (Namecheap, Porkbun, GoDaddy, Cloudflare). |
| **DNS** | డీఎన్ఎస్ — పేర్లను (డొమైన్) చిరునామాలకు (సర్వర్లు) కలిపే ఇంటర్నెట్ చిరునామా పుస్తకం. |
| **DNS record (A / CNAME)** | డీఎన్ఎస్ నమోదు — "ఈ పేరు ఆ సర్వర్‌కు వెళ్ళాలి" అని చెప్పే ఒక్క పంక్తి సూచన. |
| **renewal** | పునరుద్ధరణ — డొమైన్‌ను ఏటా కొనసాగించడం; మరిచిపోతే లింకులన్నీ చచ్చిపోతాయి. |
| **deploy / deployment** | డిప్లాయ్ — ప్రాజెక్ట్‌ను మీ లాప్‌టాప్ నుండి తీసి, ప్రపంచం చూడగల సర్వర్‌పై నడిపించడం. |
| **hosting platform** | హోస్టింగ్ వేదిక — ప్రాజెక్ట్‌ను నడిపి, లింక్ ఇచ్చే సేవ (Vercel, Render, Railway, Supabase). |
| **free tier** | ఉచిత శ్రేణి — చిన్న ప్రాజెక్టులకు సరిపడా, డబ్బు అడగని సేవా స్థాయి. |
| **frontend / backend** | ముందు భాగం / వెనుక భాగం — వాడేవారు చూసే స్క్రీన్ / తెర వెనుక పనిచేసే సర్వర్-లాజిక్. |
| **environment variable** | పరిసర చరరాశి — రహస్యాలను (API కీలు, DB చిరునామాలు) కోడ్‌లో కాకుండా వేదిక సెట్టింగుల్లో దాచే చోటు. |
| **auto-deploy** | స్వయం-డిప్లాయ్ — GitHub కు push చేసిన ప్రతిసారి వేదిక తనంతట తానే కొత్త వెర్షన్ నడపడం. |
| **mock interview** | నమూనా ఇంటర్వ్యూ — నిజమైన ఇంటర్వ్యూలా ప్రశ్నలడిగే సాధన సమావేశం (ఇక్కడ GenAI ఇంటర్వ్యూయర్). |
| **hint** | సూచన — జవాబు చెప్పకుండా, జవాబు వైపు నడిపించే చిన్న సాయం. |
| **retrieval practice** | గుర్తుతెచ్చుకునే సాధన — చదవడం కాక, జ్ఞాపకం నుండి జవాబు లాగే ప్రయత్నం; నేర్చుకోవడాన్ని గట్టిపరుస్తుంది. |
| **blind spot** | గుడ్డి మచ్చ — జట్టులో ఎవరికీ సరిగా అర్థం కాని ప్రాజెక్ట్ భాగం; ప్రశ్నలే దాన్ని బయటపెడతాయి. |
| **demo video** | ప్రదర్శన వీడియో — ప్రాజెక్ట్ *ఏమి చేస్తుందో* వాడుతూ చూపే 2–3 నిమిషాల రికార్డింగ్. |
| **implementation video** | నిర్మాణ వీడియో — ప్రాజెక్ట్ *ఎలా కట్టామో* — ఆర్కిటెక్చర్, కీలక ఫైళ్ళు — వివరించే వీడియో. |
| **screen recording** | తెర రికార్డింగ్ — కంప్యూటర్ తెరపై జరిగేదాన్ని వీడియోగా పట్టడం (OBS Studio ఉచిత సాధనం). |
| **unlisted (YouTube)** | జాబితాలో-లేని — లింక్ ఉన్నవారికి మాత్రమే కనిపించే YouTube వీడియో సెట్టింగ్. |
| **embed** | పొదగడం — ఒక పేజీలో వేరే చోటి వీడియో/విషయాన్ని అక్కడే కనిపించేలా అమర్చడం. |
| **thumbnail** | థంబ్‌నెయిల్ — వీడియోకు ముఖచిత్రంగా ఉండే చిన్న బొమ్మ; README లో దీన్నే క్లిక్-లింక్‌గా వాడతాం. |
| **README** | రీడ్-మీ — రిపో తెరవగానే కనిపించే ముఖద్వార పత్రం; వివరణ, డెమో, సెటప్ అన్నీ ఇందులోనే. |
| **profile page** | ప్రొఫైల్ పేజీ — మీ పేరుతో ఉండే ముఖ్య పేజీ (GitHub లో `yourname/yourname` రిపో README). |
| **pin (a repo)** | పిన్ చేయడం — ప్రొఫైల్ పైభాగంలో ఎంచుకున్న రిపోలను శాశ్వతంగా కనిపించేలా అమర్చడం. |
| **portfolio** | పోర్ట్‌ఫోలియో — మీ ఉత్తమ పనుల సేకరణ; లైవ్ లింకులు, వీడియోలు, కోడ్ — అన్నీ ఒకచోట. |
| **AI coding agent** | ఏఐ కోడింగ్ ఏజెంట్ — ప్రాజెక్ట్ చదివి, ఫైళ్ళు మార్చి, కమాండ్లు నడపగల (మీ అనుమతితో) AI సహాయకుడు; opencode ఇలాంటిదే. |
| **opencode** | ఓపెన్‌కోడ్ — టెర్మినల్‌లో నడిచే open-source AI కోడింగ్ ఏజెంట్; అనేక AI మోడల్స్‌తో పనిచేస్తుంది. |
| **model / provider** | మోడల్ / ప్రొవైడర్ — జవాబులిచ్చే AI మెదడు (Claude, GPT, Gemini) / దాన్ని అందించే సంస్థ. |
| **API key** | ఏపీఐ కీ — AI సేవను వాడటానికి ఇచ్చే రహస్య తాళంచెవి; కోడ్‌లో/రిపోలో ఎప్పుడూ పెట్టకూడదు. |
| **plan mode / build mode** | ప్రణాళిక / నిర్మాణ రీతులు — ముందు చర్చించడం (ఏ ఫైలూ మారదు), తర్వాత మార్పులు చేయించడం; Tab తో మారతాం. |
| **diff review** | తేడాల సమీక్ష — AI ప్రతిపాదించిన ప్రతి మార్పును అంగీకరించే ముందు వరుస-వరుసగా చదవడం; రచయిత మీరే. |
| **pair programming** | జోడి ప్రోగ్రామింగ్ — ఇద్దరు కలిసి ఒకే కోడ్‌పై పనిచేయడం; ఇక్కడ రెండో వ్యక్తి AI. |
