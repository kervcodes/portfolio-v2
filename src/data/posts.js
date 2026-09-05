// ─────────────────────────────────────────────────────────────────────────────
// posts.js — Single source of truth for all blog posts
//
// HOW TO ADD A NEW POST:
//   1. Add an entry to the POSTS array (newest first).
//   2. Set comingSoon: false and add a content[] array when the post is ready.
//   3. Update hashnodeUrl when cross-posted to Hashnode.
//   4. That's it — the Posts section and the post page both read from here.
//
// HOLDING A BODY BACK:
//   Add `visibleBlocks: N` to a post and the page renders only its first N
//   content blocks. The rest stays in this file, unrendered. Remove the line
//   to publish the whole body again.
//
// CONTENT BLOCK TYPES:
//   { type: "paragraph", text: "..." }
//   { type: "heading", text: "..." }
//   { type: "subheading", text: "..." }
//   { type: "image", src: "...", caption: "..." }
//   { type: "list", items: ["...", "..."] }
//   { type: "divider" }
//   { type: "callout", text: "..." }   ← bold pull-quote style
// ─────────────────────────────────────────────────────────────────────────────

export const POSTS = [
    {
        slug: "build-log-1-a-window-that-says-ok",
        title: "Build Log #1: A Window That Says OK",
        excerpt:
            "The first thing I built for my bank statement analyzer displays two words. Why the least impressive possible screen was the right place to start.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "Python"],
        readTime: "5 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null, // ← set when published to Hashnode
        coverImage: "/posts/post-2/first-window.png",
        content: [
            {
                type: "paragraph",
                text: "I'm building a local-first desktop app that takes years of bank and credit card statement PDFs and turns them into a financial picture you can actually trust. Here is everything it does today:",
            },
            {
                type: "paragraph",
                text: "It looks like nothing. It's also the piece I most wanted to get right before anything else, and that choice is the whole point of this post.",
            },
            {
                type: "heading",
                text: "Why this, and why local",
            },
            {
                type: "paragraph",
                text: "I have statements from several banks and cards going back years. Every time I want an honest answer to where the money actually went, I'm staring at a folder of PDFs with different layouts and no way to see across them. Every existing option I looked at wanted the same thing in return: connect your bank, or upload your statements to our servers.",
            },
            {
                type: "paragraph",
                text: "So the app runs entirely on your machine. The database is a SQLite file on your disk. Nothing leaves unless you turn on the optional AI summary, and even then only sanitized, stripped-down facts.",
            },
            {
                type: "heading",
                text: "Two rules I set before writing any code",
            },
            {
                type: "paragraph",
                text: "First: every statement gets checked against its own math. A parser that reads 90% of the transactions correctly isn't 90% good — it's broken, the total is wrong, and nothing tells you. So extracted transactions have to reconcile against the opening and closing balances the statement itself reports. If they don't, it gets flagged for review instead of quietly folded into the totals.",
            },
            {
                type: "paragraph",
                text: "Second: the LLM never touches the numbers. Every figure — cash flow, category totals, recurring charges, trends — is computed by deterministic code. The AI layer only explains results in plain English, and every call goes through a sanitizer that strips account numbers and names first. An LLM doing arithmetic is a machine that produces confident, plausible, occasionally wrong numbers, which is the one thing a financial tool cannot do.",
            },
            {
                type: "heading",
                text: "So why is the first screen a health check?",
            },
            {
                type: "paragraph",
                text: "The app is two processes. An Electron front end for the window and the UI, and a Python FastAPI backend that does the real work — PDF extraction, parsing, validation, analytics — because that's where the tooling lives. Electron spawns the backend on startup, talks to it over localhost, and kills it on quit.",
            },
            {
                type: "callout",
                text: "That seam is the riskiest part of the system. The parsers are just work.",
            },
            {
                type: "paragraph",
                text: "The seam is where it gets genuinely hard: one runtime spawning another, on Windows, with process lifecycle, ports, and eventually shipping a bundled Python executable inside an installer to a machine that has no Python on it. So the first task was to make exactly one thing cross that seam end to end. Electron starts, spawns the backend, the renderer asks it for a health check, and the answer goes on screen. No database, no schema, no parsers.",
            },
            {
                type: "paragraph",
                text: "The screenshot above is that seam working. Which is why a card that says status ok is, to me, the most load-bearing screen in the project.",
            },
            {
                type: "heading",
                text: "Under a hundred lines, three bugs",
            },
            {
                type: "paragraph",
                text: "The skeleton is under a hundred lines of meaningful code and it still took three bugs to get there, all of them in the seam. The Electron config was missing its entry point, which produced a launch error containing no other information. Then the backend was spawned with its output set to inherit the parent's console — it threw synchronously in an environment with no console attached and took Electron down with it, which also surfaced that an unhandled error event on a Node child process kills the parent. Both worth hitting now, with one endpoint, rather than later when that child is a bundled binary failing on someone else's machine.",
            },
            {
                type: "paragraph",
                text: "The third one is the interesting one. curl against the health endpoint returned 200 and the expected JSON. The renderer, calling the identical URL, got nothing at all. The backend was fine — the request was cross-origin, there was no CORS middleware, and the browser silently blocked the read. My design docs never mentioned CORS, because on paper \"the app calls its own local backend\" doesn't sound cross-origin. It is.",
            },
            {
                type: "callout",
                text: "The spec was thorough and it was still incomplete, because a document describes a system and a running process is one.",
            },
            {
                type: "heading",
                text: "Where the AI fits",
            },
            {
                type: "paragraph",
                text: "I built this with Claude Code, so I want to be precise about the division of labor. What's mine: the problem, the decision to stay local, the two-process split, the rule that the LLM never computes a number, the sequencing that put the riskiest seam first, and the review and approval of each plan before it was implemented. What isn't mine, line by line, is the code — Claude wrote those ninety-odd lines and I read and approved them rather than typing them.",
            },
            {
                type: "paragraph",
                text: "At this stage that's a defensible trade, because process-spawning boilerplate is not where the engineering in this project lives. It stops being defensible the moment the code carries real judgment: the validator, the dedup rules, the sanitizer. So from the data model onward I write down why the design is what it is before it gets built, in my own words, and I don't move past a step whose logic I couldn't reconstruct on a whiteboard without the repo open.",
            },
            {
                type: "callout",
                text: "If a future post in this series doesn't show that reasoning, assume I skipped it and hold it against me.",
            },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "The canonical data model, where every transaction carries its provenance — which statement it came from, which page, which parser version, how confident the extraction was — so that when a number looks wrong six months from now, it traces back to the exact page of the exact PDF. No parsers yet. Just the shape everything else has to fit into.",
            },
        ],
    },
    {
        slug: "one-year-after-layoff-going-all-in-on-ai",
        title: "One Year After Getting Laid Off, I'm Finally Going All In on AI",
        excerpt:
            "June 23rd was exactly one year since Liberty Mutual let me go. I spent 12 months doing contract work and Uber to keep the lights on. Now I'm going all in. Here's the plan.",
        date: "Jun 2026",
        tags: ["AI Engineering", "Career", "Building in Public"],
        readTime: "6 min read",
        comingSoon: false,
        featured: false,
        unlisted: true, // ← kept in the repo and reachable by direct link, just not
                        //   shown in the Notes list — not the first thing recruiters
                        //   should see during an active search.
        hashnodeUrl: null, // ← set when published to Hashnode
        coverImage: "/posts/post-1/cover.png",
        visibleBlocks: 1,
        content: [
            {
                type: "callout",
                text: "June 23rd marked exactly one year since I was let go.",
            },
            {
                type: "paragraph",
                text: "I remember that Monday morning clearly. I woke up in a good mood. I had a one-on-one scheduled with my manager and I was genuinely excited, not just for the meeting, but because I was going to meet the new IT director for the first time. My head was in a good place. I was mentally ready for the week ahead. That Monday meeting went differently than I expected.",
            },
            {
                type: "paragraph",
                text: "Most of my time at the company was stressful. The months leading up to getting let go were worse. My whole team had been pulled into a major modernization project, the kind companies call in their best people for. Legacy mainframe servers were moving to the cloud. Everyone around me was excited. I was worried. I worried about the pace, about what it meant for someone still relatively new to the team, about starting over in a new environment in such a short period of time. I said as much to a few people I trusted. Everyone told me it would be okay. My gut said otherwise.",
            },
            {
                type: "paragraph",
                text: "Something just was not clicking for me.",
            },
            {
                type: "paragraph",
                text: "In two years at the company, I had switched teams or projects three times. It was a perpetual starting over. Each time I started to get comfortable, I either got moved or a re-org happened. I was still finding my footing when everything started accelerating. I cared about the work. I wanted to prove myself. I fought hard. I pulled all-nighters on assignments and showed up the next day without letting anyone know. I burst into tears at a one-on-one once. It was my work after all. I did not get the chance to make it work.",
            },
            {
                type: "heading",
                text: "The year since has been hard to describe in a way that sounds clean, because it wasn't.",
            },
            {
                type: "image",
                src: "/posts/post-1/desk.png",
                caption: "Late nights on the road, keeping the income coming in.",
            },
            {
                type: "paragraph",
                text: "I was qualified for unemployment, but I never received a single check. I called the office several times and could never get a clear answer as to why. Everything has just been on hold. At some point I got discouraged and stopped applying for the weekly benefits. I needed income and could not keep waiting. So I drove for Uber to keep money coming in for my family. I tried to build projects in the pockets of time I had. A wardrobe app, a music analytics platform for the Haitian community, and an advertising platform, mostly assembled after late Uber shifts when I still had something left in the tank, and on weekends.",
            },
            {
                type: "paragraph",
                text: "Something in me was bruised by the whole thing, and it took longer than I want to admit to shake it. Being let go the way I was destroyed something in my confidence. That place was a world to me, and one day it just stopped being my world.",
            },
            {
                type: "image",
                src: "/posts/post-1/soldier.jpg",
                caption: "Like an injured soldier left behind by his comrades. In his heart, nothing but silence and unanswered questions.",
            },
            {
                type: "paragraph",
                text: "But one question kept coming back no matter what I was doing on the road or at my desk: what can I do to overcome this?",
            },
            {
                type: "paragraph",
                text: "The answer I kept landing on: AI engineering. Not because it is trending, but because I genuinely believe it is where the most interesting systems problems live right now, and because it maps directly onto what I already know how to do.",
            },
            {
                type: "heading",
                text: "The Plan",
            },
            {
                type: "image",
                src: "/posts/post-1/driving.png",
                caption: "Discipline. Focus. Consistency.",
            },
            {
                type: "paragraph",
                text: "I stopped waiting and built a plan. I will cut back on Uber hours to finally do what I should have done on June 23rd, 2025: jump back in. Eight weeks. Six AI engineering courses entrusted by Ed Donner and Brad Traversy. Three production projects built on real data, not tutorials, not toy demos. The courses cover LLMs, RAG, embeddings, agentic systems, MCP, and deploying at scale on AWS. The difference this time is that I will not just be following along. I will be building my own projects, or building on top of existing ones, with real stakes.",
            },
            {
                type: "paragraph",
                text: "I chose these courses because my learning works better when I am building, and I can apply most of what I have learned over the past few years directly into these projects.",
            },
            {
                type: "subheading",
                text: "The six courses:",
            },
            {
                type: "list",
                items: [
                    "AI Builder: n8n Agents and Voice Agents",
                    "Coding With AI: Planning to Production",
                    "AI Engineer Core Track (LLMs, RAG, QLoRA)",
                    "AI Engineer Production Track: Deploy at Scale",
                    "AI Coder: Claude Code and Coding Agents",
                    "AI Engineer Agentic Track: Agents and MCP",
                ],
            },
            {
                type: "heading",
                text: "Week 1 is already in progress.",
            },
            {
                type: "paragraph",
                text: "The Core Track is well underway. And honestly, what surprised me most was realizing how much my SRE background is an asset here. The part most AI tutorials skip, production deployment, observability, failure modes, latency, is exactly where I am already comfortable. I am not starting from zero. I am translating.",
            },
            {
                type: "paragraph",
                text: "That realization hit different after a year of feeling behind.",
            },
            { type: "divider" },
            {
                type: "paragraph",
                text: "I am documenting everything publicly at kervintznoel.com. Writing here as I go.",
            },
            {
                type: "paragraph",
                text: "If you are on a similar path, or you are building AI systems and looking for someone who ships and takes reliability seriously, I would love to connect. And I mean that genuinely. Whether you want to follow along, share feedback on the plan, offer mentorship, or just hold me accountable to the weeks ahead, my inbox is open. This is the kind of journey that is better with people in my corner.",
            },
            {
                type: "callout",
                text: "Here's to year two being different. I believe in myself and I will prevail.",
            },
        ],
    },
    {
        slug: "longevity-in-ai-software-development",
        title: "How I Think About Longevity for Software Development With AI",
        excerpt:
            "Notes on what \"built to last\" means when part of the system is a model, not just code.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Software Longevity"],
        readTime: "6 min read",
        comingSoon: true,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        content: [],
    },
    // {
    //     slug: "sre-runbook-ai-building-the-tool-i-wish-i-had",
    //     title: "SRE Runbook AI: Building the Tool I Wish I Had at Liberty Mutual",
    //     excerpt:
    //         "Paste an incident alert, get a structured runbook and postmortem back in seconds. How I turned 5 years of on-call experience into a Claude-powered SaaS app.",
    //     date: "Jul 2026",
    //     tags: ["AI Engineering", "SRE", "Claude API"],
    //     readTime: "7 min read",
    //     comingSoon: false,
    //     featured: true,
    //     hashnodeUrl: null,
    //     coverImage: null,
    //     content: [],
    // },
    // {
    //     slug: "shipping-my-first-ai-mobile-app",
    //     title: "What I Learned Shipping My First AI-Powered Mobile App",
    //     excerpt:
    //         "From idea to App Store submission: RevenueCat, Supabase, and AI clothing analysis in a React Native app. What worked, what didn't, and what I'd do differently.",
    //     date: "Jul 2026",
    //     tags: ["React Native", "AI Engineering", "Full-Stack"],
    //     readTime: "6 min read",
    //     comingSoon: true,
    //     featured: true,
    //     hashnodeUrl: null,
    //     coverImage: null,
    //     content: [],
    // },
    // {
    //     slug: "voice-assistant-n8n-rag",
    //     title: "Building a Voice Assistant for Legal Intake with n8n and RAG",
    //     excerpt:
    //         "A RAG-powered voice intake system for a small law practice -- documents ingested, consultations scheduled, questions answered, all without a developer in the loop.",
    //     date: "Aug 2026",
    //     tags: ["Agents", "RAG", "n8n"],
    //     readTime: "8 min read",
    //     comingSoon: true,
    //     featured: false,
    //     hashnodeUrl: null,
    //     coverImage: null,
    //     content: [],
    // },
    // {
    //     slug: "natural-language-querying-music-analytics",
    //     title: "Adding Natural Language Querying to a Music Analytics Platform",
    //     excerpt:
    //         "How I layered a RAG query interface over a PostgreSQL music database so anyone can ask which Haitian artists are trending and get a real answer.",
    //     date: "Aug 2026",
    //     tags: ["RAG", "AI Engineering", "Full-Stack"],
    //     readTime: "8 min read",
    //     comingSoon: true,
    //     featured: false,
    //     hashnodeUrl: null,
    //     coverImage: null,
    //     content: [],
    // },
    // {
    //     slug: "agentic-sre-upgrade-langraph-mcp",
    //     title: "From Single-Shot to Agentic: Upgrading SRE Runbook AI with Multi-Agent Workflows",
    //     excerpt:
    //         "Taking my runbook generator from one prompt to a full autonomous agent that triages alerts, files Jira tickets, and posts Slack summaries -- a look at building with LangGraph and MCP.",
    //     date: "Aug 2026",
    //     tags: ["Agents", "MCP", "AI Engineering"],
    //     readTime: "7 min read",
    //     comingSoon: true,
    //     featured: false,
    //     hashnodeUrl: null,
    //     coverImage: null,
    //     content: [],
    // },
];

export const getPostBySlug = (slug) => POSTS.find((p) => p.slug === slug);
