# 🐟 Bigset Workflow

> **Find funded leads (and your next job) in one sentence**

An interactive web app demonstrating the [Bigset by TinyFish](https://github.com/tinyfish-io/bigset) workflow — an open-source multi-agent system that turns one plain-English sentence into a structured, self-refreshing live dataset.

![Bigset Workflow Preview](./hero-bg.jpg)

## 🚀 Live Demo

Open `index.html` directly in your browser — no build step, no server needed.

```bash
git clone https://github.com/21cabbagee/bigset-workflow
cd bigset-workflow
open index.html   # macOS
# or
start index.html  # Windows
```

---

## ✨ What's Inside

This is a fully interactive single-page app that walks through the Bigset workflow step by step:

| Section | What's interactive |
|---|---|
| **Hero** | Animated particle network canvas, scroll-triggered animations |
| **Why This Works** | Cards with hover glow + gradient border animation |
| **What You Need** | Numbered requirement cards with links |
| **Step 1 — Type a Sentence** | Live terminal with typewriter animation → schema inference output |
| **Step 2 — Agent Swarm** | Animated orchestrator node + parallel sub-agents resolving in real-time |
| **Step 3 — Export & Refresh** | CSV/XLSX format toggle, cadence selector, animated data table, export button |
| **Prompt Library** | 4 click-to-copy prompts with clipboard toast notification |
| **Custom Prompt Generator** | Type any sentence → auto-infers a schema with typed columns |
| **CTA + Footer** | Direct links to repo and API key |

---

## 🧠 What is Bigset?

[Bigset](https://github.com/tinyfish-io/bigset) is an open-source multi-agent system by [TinyFish](https://tinyfish.io) that turns a plain-English description into a live, self-refreshing dataset — powered by a swarm of AI agents crawling the real web in parallel.

### Why funded startups?

Companies that just raised have two things at once: **budget** and **problems they're actively solving**. That makes them:

- 🎯 **Best leads** if you sell
- 💼 **Best targets** if you're job hunting (they hire before postings go live)
- 📡 **Market signal** for what to build or learn next

The hard part was always finding them fast enough. Bigset finds them the day the news drops.

---

## 📋 The Workflow

### Step 1 — Type one sentence
```
Startups that raised funding in the last 30 days, with what they do, 
funding stage, location, and careers page.
```
That's the entire input. No scrapers, no selectors, no config files.

### Step 2 — Agents build it from the live web
- An **orchestrator agent** does broad discovery
- **Sub-agents fan out in parallel**, each scoped to a single company
- Every cell is **traceable back to its source** — no hallucinations
- Rows are **deduplicated** on a primary key

### Step 3 — Export and set it to refresh
Export to CSV or XLSX, then set a refresh cadence (30 min / 6h / daily / weekly). The agents re-run automatically and your leads are always fresh.

---

## 💡 Prompt Library

| Goal | Prompt |
|---|---|
| Find leads / clients | `Startups that raised funding in the last 30 days, with what they do, funding stage, location, and careers page` |
| Apply before jobs are posted | `YC companies currently hiring engineers, with funding stage, location, and number of open roles` |
| Spot market gaps | `Popular B2B SaaS tools that offer a free tier, with category, free-tier summary, and pricing page URL` |
| Decide what to learn next | `AI startups hiring engineers right now, with the specific skills and stack listed in each role` |

---

## 🛠 What You Need to Run Bigset

| Requirement | Details |
|---|---|
| [Bigset repo](https://github.com/tinyfish-io/bigset) | Self-hosted, AGPL-3.0 open source |
| OpenRouter key | For the LLM (schema inference + orchestration) |
| [TinyFish key](https://bit.ly/4dEkP04) | For live web access |

You bring your own keys and run it yourself — you own the whole pipeline.

---

## 🎨 Tech Stack (This App)

- **HTML5** — semantic structure, SEO-ready
- **Vanilla CSS** — custom design system with CSS variables, glassmorphism, micro-animations
- **Vanilla JS** — Canvas particle system, Intersection Observer animations, typewriter, clipboard API
- **Google Fonts** — Inter + JetBrains Mono
- Zero dependencies, zero build step

---

## 📁 File Structure

```
bigset-workflow/
├── index.html      # Main app shell
├── style.css       # Design system + all section styles
├── app.js          # Particle canvas, animations, interactions
├── hero-bg.jpg     # AI-generated hero background
└── README.md       # You are here
```

---

## 🔗 Links

- ⭐ [Star Bigset on GitHub](https://github.com/tinyfish-io/bigset)
- 🔑 [Get your TinyFish API key](https://bit.ly/4dEkP04)
- 🐟 [TinyFish](https://tinyfish.io)

---

## 📄 License

This demo app is MIT licensed. Bigset itself is [AGPL-3.0](https://github.com/tinyfish-io/bigset/blob/main/LICENSE).
