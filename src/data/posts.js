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
        slug: "build-log-11-the-key-the-app-never-writes-to-disk-in-plain-text",
        title: "Build Log #11: The Key the App Never Writes to Disk in Plain Text",
        excerpt:
            "Closing out build-plan #9 meant building the two screens everything else had been quietly assuming existed — and finding a real data-retention gap that had been open since post #8.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "TypeScript"],
        readTime: "4 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 11,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "Before writing a line of the Accounts or Settings screen, I went looking for what already existed around API keys and raw PDFs. Neither answer was good.",
            },
            {
                type: "paragraph",
                text: "LLM provider keys had been environment-variable-only since the Privacy Gateway post — there was no settings screen, so nothing had ever persisted one. Worse: raw PDF cleanup didn't exist at all. Every file accepted since the very first Import screen had been written to a temp folder and never deleted. That's not cosmetic — the requirements treat retention as a security requirement, not a nice-to-have, and I'd been quietly failing it for three posts.",
            },
            {
                type: "heading",
                text: "A key that only ever exists encrypted",
            },
            {
                type: "paragraph",
                text: "The backend can't decrypt anything itself — it's Python, and the encryption is Electron's safeStorage, which is Node-only. So the design hands the backend something it already knows how to use: an environment variable at spawn. Electron encrypts the key into its own settings file, decrypts it in memory when it starts the backend, and injects it as the same env var the code already read. The Python process never sees a settings file and never persists a secret of its own.",
            },
            {
                type: "callout",
                text: "Saving a new key restarts the backend. A few seconds of local downtime beats building a live settings endpoint for a screen most people touch once.",
            },
            {
                type: "heading",
                text: "Accounts, on purpose, does nothing extra",
            },
            {
                type: "paragraph",
                text: "The design notes describe an Accounts screen where you can merge two mis-grouped accounts. I built the screen and left that button out, because the schema makes the problem it's meant to solve impossible: an account's identity — bank, account type, masked digits — is a unique constraint at the database level. Two rows that are actually the same account can't exist. Building a merge feature for a bug the architecture already prevents would have been solving a problem I didn't have.",
            },
            {
                type: "list",
                items: [
                    "Settings: provider choice, a masked key field with a real Test Connection call to the provider — an actual API request, not a fake ping",
                    "Retention toggle, now actually enforced: a statement's raw PDF is deleted once its job reaches a terminal status, unless retention is on",
                    "The category-rule table from the Privacy Gateway post, now editable directly instead of only reactively through Review",
                ],
            },
            {
                type: "paragraph",
                text: "I tested the key flow with an intentionally wrong Anthropic key. Test Connection made a real call, came back with the real HTTP error, and the key stayed masked in the UI the entire time — never echoed, never logged. What I couldn't verify from here: the actual safeStorage encrypt/decrypt round-trip, and that a saved key survives restarting the real Electron app. Browser automation can't drive that; it's written up as a manual check for me to run in the real app before this merges.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Where build-plan #9 ends",
            },
            {
                type: "paragraph",
                text: "This closes it. Import, History, Dashboard, Review, Accounts, Settings — all six screens are real, not placeholders. The known gap I'm carrying forward: the built-in merchant rules are thin, so a first import still leaves a large review queue. Worth fixing before anyone but me ever sees this app.",
            },
            {
                type: "callout",
                text: "Every screen in the plan exists now. What's missing isn't a screen — it's a Windows installer someone else could double-click.",
            },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "Build-plan #10: packaging. Turning two dev processes I run by hand into one installer that works on a machine with no Python and no Node on it. Not started yet.",
            },
        ],
    },
    {
        slug: "build-log-10-a-number-you-cant-click-through-isnt-trustworthy",
        title: "Build Log #10: A Number You Can't Click Through Isn't Trustworthy",
        excerpt:
            "The Dashboard and Review screens went in, plus the rule that ties them together: no reported figure exists without a path down to the transactions behind it.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "TypeScript"],
        readTime: "4 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 10,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "Up to this point the pipeline had a real parser, real deduplication, a real analytics engine, and a real Privacy Gateway — and no way to see any of it except a JSON response. This entry is the two screens that make the numbers visible: the Dashboard and Review.",
            },
            {
                type: "heading",
                text: "Coverage comes before the totals, not after",
            },
            {
                type: "paragraph",
                text: "The Dashboard's first element isn't a chart, it's a coverage bar: how many statements are actually included in the numbers below versus excluded, and why. A spending figure computed over an unknown slice of the data isn't a spending figure — it's a guess wearing a dollar sign — so it doesn't get to appear before the reader knows what it's built on.",
            },
            {
                type: "paragraph",
                text: "Below that: net cash flow, spending, and top category as stat cards; a cash-flow chart and a spending breakdown, each with a \"show as table\" toggle so the numbers are never locked inside a chart only sighted users can read; recurring charges and top merchants; and an AI-generated summary, kept in its own visually separate card so it never gets mistaken for a computed figure.",
            },
            {
                type: "callout",
                text: "A chart is a claim. If you can't click through the number to the rows behind it, the chart is decoration wearing the shape of evidence.",
            },
            {
                type: "paragraph",
                text: "That click-through is the transaction drawer — opened by a URL parameter, not local component state, so it's linkable and survives a refresh no matter which screen opened it. Every clickable number on the Dashboard and every row in Review opens the same drawer.",
            },
            {
                type: "heading",
                text: "Two corrections that weren't my first instinct",
            },
            {
                type: "list",
                items: [
                    "The Dashboard's spending comparison uses the latest full calendar month against the one before it, not whatever the most recent period happens to be — comparing against a partial current month makes the percentage change meaningless.",
                    "The \"always categorize this merchant\" action in Review never fires silently. The button spells out both the merchant and the category it's about to apply, every time, so nothing changes because someone clicked fast.",
                ],
            },
            {
                type: "paragraph",
                text: "Review itself is one inbox for three things that need a human: possible duplicates, transactions needing a category, and statements that failed or came back unsupported. The sidebar's badge count is the same number the screen shows — no separate query that could quietly drift out of sync.",
            },
            {
                type: "paragraph",
                text: "One bug, caught by actually using the app instead of trusting the tests: every new endpoint returned 404 during manual verification. The code was fine — a stale backend process from an earlier session was still bound to the port, answering with old routes. Killing it and starting fresh fixed it in seconds, but it's a good reminder that a green test suite and a working manual session are two different claims.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "Accounts and Settings — the last two screens in build-plan #9, and the one holding real API keys.",
            },
        ],
    },
    {
        slug: "build-log-9-the-batch-that-got-stuck-at-zero-of-six",
        title: "Build Log #9: The Batch That Got Stuck at Zero of Six",
        excerpt:
            "A real import got stuck at \"Processing, 0 of 6\" and stayed there. The bug wasn't in the parser or the queue logic — it was in what the queue never expected to have to do: recover from itself.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "Python"],
        readTime: "3 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 9,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "This one wasn't found by a test. I imported a handful of real statements, closed the app, came back later, and the History screen still showed one batch stuck at \"Processing, 0 of 6\" — with nothing in the UI that could act on it.",
            },
            {
                type: "heading",
                text: "Root cause",
            },
            {
                type: "paragraph",
                text: "A job can only be claimed by a worker while its status is QUEUED or RETRYING. If the backend process dies or restarts while a job is already claimed — status PROCESSING — nothing in the system was ever written to reclaim it. That job is orphaned permanently, the batch can never see every job reach a terminal state, and it sits at \"Processing\" forever.",
            },
            {
                type: "paragraph",
                text: "The dev database confirmed it exactly: all six jobs on the stuck batch were PROCESSING, every attempt count still at 0, and the update timestamps staggered about 1.7 seconds apart — consistent with the backend restarting repeatedly during that session, each restart claiming the next queued job right before dying again.",
            },
            {
                type: "callout",
                text: "Nothing in the design was wrong. I'd just never written down what happens when the process running the queue dies mid-job — until it actually did, on my own machine, with my own statements.",
            },
            {
                type: "heading",
                text: "The fix",
            },
            {
                type: "paragraph",
                text: "A reclaim function requeues anything stuck in PROCESSING, counting the reclaim itself as an attempt — so a job that keeps getting orphaned still eventually hits its retry limit instead of looping forever. It runs from two places: automatically on startup, before the worker starts (every PROCESSING row is guaranteed orphaned at that point, since nothing is running yet), and behind a manual retry endpoint that's more conservative — it only touches jobs stuck for at least 60 seconds, since a worker might legitimately still be working on one.",
            },
            {
                type: "paragraph",
                text: "Eight new tests, and restarting the real backend reclaimed and fully reprocessed the actual batch that had been stuck — and a couple of others that had quietly orphaned the same way without anyone noticing.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "Back to the plan: Dashboard, Review, and the transaction drawer.",
            },
        ],
    },
    {
        slug: "build-log-8-the-backend-had-been-invisible-for-a-month",
        title: "Build Log #8: The Backend Had Been Invisible for a Month",
        excerpt:
            "Extraction, a real bank parser, deduplication, analytics, categorization, a Privacy Gateway — all of it reachable only through curl and pytest. This is the first screen a person could actually use.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "TypeScript"],
        readTime: "3 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 8,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "By this point the backend could take a real bank statement in, validate it, extract it, parse it, deduplicate it, categorize it, and analyze it — 221 tests proved all of it worked. None of it had ever been on a screen. Every check had gone through curl or pytest.",
            },
            {
                type: "paragraph",
                text: "This entry is the first slice of frontend, and it's deliberately narrow: open the app, import statements, watch the backend process them, see the ones you've already imported. No Dashboard, no Review yet — those routes exist as honest \"lands in the next update\" placeholders instead of 404s, because a missing link in the sidebar is worse than an admitted gap.",
            },
            {
                type: "heading",
                text: "Import shows the backend's real answer, not a summary of it",
            },
            {
                type: "paragraph",
                text: "A client-side check catches the obvious problems — wrong extension, too large — before anything uploads. Past that, the screen renders whatever the backend actually decided about each file individually: accepted, or rejected with the specific reason. Not one error for the whole batch.",
            },
            {
                type: "callout",
                text: "I dropped the browser's own PDF file-type filter on the upload input. It made the file picker quietly hide non-PDFs before they ever reached my rejection screen — which meant the one state that screen exists to demonstrate could never actually appear.",
            },
            {
                type: "heading",
                text: "A rule locked before writing more frontend",
            },
            {
                type: "paragraph",
                text: "Server data lives in TanStack Query. UI-only state — is a panel open, which tab is active — lives in local React state. Anything about navigation or filtering lives in the URL's search params. No Redux, no Zustand. Small as this slice is, it's the rule every later screen has to fit into, and it's easier to hold a line like that from the first component than to retrofit it after five screens already disagree.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "An off-plan detour first — a real bug found by using the app, not by testing it — then back to build-plan #9 for the Dashboard and Review.",
            },
        ],
    },
    {
        slug: "build-log-7-the-gateway-that-only-lets-four-fields-through",
        title: "Build Log #7: The Gateway That Only Lets Four Fields Through",
        excerpt:
            "Rule-based categorization first, an LLM only for what the rules can't place, and a Privacy Gateway built so a fifth field literally cannot ride along to a model.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "Python"],
        readTime: "5 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 7,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "This is the post I was most careful about, because it's the one where a mistake doesn't show up as a wrong dollar figure — it shows up as somebody's account number or a Zelle counterparty's name leaving the machine.",
            },
            {
                type: "heading",
                text: "Deterministic first, always",
            },
            {
                type: "paragraph",
                text: "A transaction's category resolves through a fixed order: a user's own override, then a saved merchant rule (\"always categorize Uber as Transportation\"), then a deterministic prediction, and only if none of those apply does the transaction fall to Uncategorized and land in Review. The automated guess is stored separately from any override or rule, which sounds like a small detail until you delete a rule and everything that rule used to touch snaps back to its prediction instead of needing a bulk rewrite.",
            },
            {
                type: "paragraph",
                text: "The deterministic engine — a fixed merchant-alias map and a keyword scan — lives in code, not database rows. Every time that list changes it's a code edit and a test, not a data migration silently drifting out of sync with what's actually deployed.",
            },
            {
                type: "paragraph",
                text: "Only a transaction the deterministic pass can't place gets an LLM call, one per unique merchant rather than one per transaction. A confident deterministic hit and a confident LLM hit are treated the same way: below a 0.75 confidence gate, both go to Review instead of showing a guess as if it were certain.",
            },
            {
                type: "heading",
                text: "The allowlist, not a scrubber",
            },
            {
                type: "paragraph",
                text: "The thing I didn't want to build was a function that tries to strip sensitive fields from a real transaction before sending it out — because \"tries to strip\" means it can also fail to. Instead, the payload that leaves the machine is its own type: exactly four fields — merchant, description, amount, direction — built from primitives, not assembled by trimming a real transaction object down. There is no fifth field for a bug to accidentally forget to remove, because the type itself doesn't have room for one.",
            },
            {
                type: "list",
                items: [
                    "Free text is separately sanitized: SSNs, emails, spaced-out card numbers, phone numbers, and long digit runs are stripped",
                    "A Zelle, Venmo, Cash App, or PayPal transfer line has the entire counterparty tail dropped, not just obscured",
                    "A \"WIRE TO <name>\" or \"TRANSFER FROM <name>\" line loses the name the same way",
                ],
            },
            {
                type: "paragraph",
                text: "And if sanitization can't guarantee the result is clean, the gateway fails closed — no LLM call happens, and the transaction goes to Review exactly like a low-confidence prediction would. Silence is the safe failure mode here, not a best-effort guess.",
            },
            {
                type: "callout",
                text: "The privacy boundary isn't \"we try to remove the sensitive fields.\" It's a payload type that cannot physically hold a fifth field.",
            },
            {
                type: "heading",
                text: "Provider choice, made honestly",
            },
            {
                type: "paragraph",
                text: "OpenAI is the primary provider, Anthropic is the fallback — but the fallback only fires when the primary actually fails: a timeout, a rate limit, a broken response. It never fires just because the primary's answer was weak. A weak answer goes to Review like any other, on its own merits, without a second provider getting a chance to overrule it.",
            },
            {
                type: "paragraph",
                text: "The test I trust most here isn't a coverage percentage. It's one that takes a transaction description containing a real account number, a name, a phone number, and an email, sends it through the whole pipeline, and asserts that the payload actually recorded on the wire has none of them — and exactly the four allowed fields, nothing else.",
            },
            {
                type: "paragraph",
                text: "With no provider key configured at all, categorization behaves byte-for-byte the same as if the LLM layer didn't exist. The app was never allowed to depend on it.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "The frontend. Everything above this line had been verified with curl and pytest — nothing on a screen yet.",
            },
        ],
    },
    {
        slug: "build-log-6-nothing-gets-deleted-on-a-guess",
        title: "Build Log #6: Nothing Gets Deleted on a Guess",
        excerpt:
            "Deduplication and the analytics engine, built on the rule that a missed duplicate is fine and a wrongly deleted transaction is not.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "Python"],
        readTime: "4 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 6,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "With one real parser working, the next problem showed up immediately: I re-upload a statement, or two statements overlap by a few weeks, and now the same transaction exists twice. This entry is deduplication and the analytics engine that depends on it — the first thing in the project that actually reads the parsed data instead of producing it.",
            },
            {
                type: "heading",
                text: "Two passes, in order",
            },
            {
                type: "paragraph",
                text: "Statement-level dedup runs first: if an account, period, and both balances match an existing statement exactly, it's the same PDF re-uploaded, and the whole statement plus every transaction in it gets marked a duplicate. Only statements that survive that check go to transaction-level dedup, which looks for overlapping periods on the same account — the case where a \"last 90 days\" statement shares three weeks with an already-imported monthly one.",
            },
            {
                type: "paragraph",
                text: "A clean one-to-one match inside that overlap collapses automatically. Anything with ambiguous cardinality — say, three identical $12 charges to the same merchant on the same day, split across two overlapping statements — doesn't get resolved by a guess. Every row stays, the newer ones get flagged as a possible duplicate, and a person decides.",
            },
            {
                type: "callout",
                text: "A missed duplicate costs a slightly inflated total until someone notices. A wrongly deleted transaction costs the one thing this app is supposed to provide: a number you can trust.",
            },
            {
                type: "paragraph",
                text: "Nothing is ever deleted by this system. A duplicate row just stops counting toward the ledger every later calculation reads from — which means undoing a mistake is always possible, because the evidence is still sitting right there in the database.",
            },
            {
                type: "heading",
                text: "The analytics engine reads a rule, not a table",
            },
            {
                type: "paragraph",
                text: "There's no dedicated \"ledger\" table. It's a rule — a transaction counts if its own dedup status isn't DUPLICATE and its statement's isn't either — applied fresh every time analytics runs. Cash flow, spending by category, recurring charges, merchant totals, and month-over-month trends are all deterministic Python over that rule. No LLM sits anywhere near a number.",
            },
            {
                type: "paragraph",
                text: "Recurring-charge detection has to tolerate a subscription raising its price without losing the pattern: a merchant qualifies once it has at least three charges whose dates land close to a known cadence — weekly, biweekly, monthly, or annual — and whose amounts stay within about 15% of the group's typical value. A charge that goes from $15.99 to $16.49 is still the same subscription, still monthly, still recurring.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "Categorization, and the Privacy Gateway that has to exist before any of this data is allowed near a model.",
            },
        ],
    },
    {
        slug: "build-log-5-teaching-the-app-to-read-one-real-bank-statement",
        title: "Build Log #5: Teaching the App to Read One Real Bank Statement",
        excerpt:
            "Twelve months of my own real checking statements, one parser, and a rule that a bank statement's layout is decided by what's actually on the page — never by the filename.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "Python"],
        readTime: "4 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 5,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "Everything before this point — extraction, the job queue — moved bytes around without understanding a word of them. This is the post where the app reads an actual bank statement for the first time, using twelve consecutive months of my own real Santander checking statements as the test data.",
            },
            {
                type: "heading",
                text: "Detection before parsing, never the filename",
            },
            {
                type: "paragraph",
                text: "A statement's bank, account type, and layout version are detected from what's actually printed on the page, with a confidence score. Below that threshold, the statement is marked unsupported rather than run through a best-guess parser — a wrong parse that looks plausible is worse than an honest refusal.",
            },
            {
                type: "paragraph",
                text: "The real statements turned up a layout wrinkle no synthetic fixture would have caught on its own: the combined PDF has a checking section followed by a savings section on the same pages. The parser reads checking only and explicitly stops before the savings section — a documented v1 scope decision, not an oversight.",
            },
            {
                type: "list",
                items: [
                    "Transaction columns are read by the x-position of each amount on the page, not by text order — the columns sit far enough apart that position is a more reliable signal than sequence.",
                    "A negative, overdrafted balance prints with its sign intact and is preserved exactly.",
                    "Every parsed row is cross-checked against the running balance, and the parser's own credit/debit totals are cross-checked against the statement's own printed summary line — a mismatch there is treated as a misread, not a statement that merely fails to reconcile.",
                ],
            },
            {
                type: "callout",
                text: "A parser that's confident and wrong is more dangerous than one that admits it doesn't know. Detection has to be willing to say \"unsupported.\"",
            },
            {
                type: "heading",
                text: "What the real data proved",
            },
            {
                type: "paragraph",
                text: "All twelve months processed into 245 real transactions, correctly resolved to a single account — masked to its last four digits. I grepped the database directly for my real, full account number afterward. It came back nowhere. Every month's closing balance reconciled exactly against the next month's opening balance, across the entire year.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "Deduplication and the analytics engine — the first things that actually read what this parser produces.",
            },
        ],
    },
    {
        slug: "build-log-4-one-statement-cant-take-down-the-batch",
        title: "Build Log #4: One Bad Statement Can't Take Down the Batch",
        excerpt:
            "A background job queue with no external broker, built around a single rule: a hundred statements processing together should survive one of them failing.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "Python"],
        readTime: "3 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 4,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "Someone importing years of statements across five banks is easily over a hundred files at once. None of them should be able to take the others down, and the app shouldn't freeze while they process. This entry is the background job queue that makes both true.",
            },
            {
                type: "heading",
                text: "Simpler than the original plan, on purpose",
            },
            {
                type: "paragraph",
                text: "The design called for a process pool. I shipped a single background thread with a sequential poll loop instead. A process pool on Windows means picklable work functions and a separate database connection per worker process — real complexity, in exchange for throughput headroom the app doesn't need yet. The queue and retry logic underneath are identical either way, so upgrading later is contained to one file.",
            },
            {
                type: "paragraph",
                text: "Claiming a job is one conditional database update — set status to PROCESSING only where it's currently QUEUED or RETRYING — checked by how many rows it actually changed. Two workers racing for the same job can't both win it; the database itself is the lock.",
            },
            {
                type: "list",
                items: [
                    "Retryable failures — a worker crash, a transient read error, an OCR timeout — get up to two retries, three attempts total.",
                    "Deterministic failures — a corrupted file, a password-protected one — never retry. Trying again won't change the outcome.",
                    "A batch stays \"Processing\" until every one of its jobs reaches a state that can't change anymore, then becomes Completed, or Completed With Warnings if anything was excluded along the way.",
                ],
            },
            {
                type: "paragraph",
                text: "One test caught a real inconsistency: a job that failed permanently on its first attempt was recorded as attempt count 0, because only the retry path had ever incremented it. Fixed so the count always reflects how many times a job actually ran, no matter which path ended it.",
            },
            {
                type: "callout",
                text: "A batch isn't done because most of it finished. It's done when every single job in it has reached a state that can't change anymore.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "Bank detection and the first real parser — the point where this pipeline finally reads an actual bank statement.",
            },
        ],
    },
    {
        slug: "build-log-3-the-encrypted-pdf-that-wasnt-password-protected",
        title: "Build Log #3: The Encrypted PDF That Wasn't Password-Protected",
        excerpt:
            "Intake validation and the extraction pipeline, and a real-world case a naive password check would have gotten wrong on the very first bank statement.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "Python"],
        readTime: "4 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null,
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 3,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "The schema exists now. This is the first stage where an actual uploaded file touches it: intake validation, and the extraction pipeline that turns an accepted PDF into raw text.",
            },
            {
                type: "heading",
                text: "Reject cheap things first",
            },
            {
                type: "paragraph",
                text: "Every uploaded file gets its own row and its own status the moment it's submitted, before anything expensive happens to it. Validation runs cheapest-check-first: wrong extension, then size limit, then a corrupted-file check, then password protection — so a five-hundred-page file never gets fully parsed just to fail on page count, and a corrupted file never reaches the password check at all.",
            },
            {
                type: "heading",
                text: "A real bug the requirements doc didn't anticipate",
            },
            {
                type: "paragraph",
                text: "Some banks encrypt a statement PDF to block printing or copying, but leave the actual user password empty. Those files open in any PDF reader with no password prompt at all — which means they're not what \"password-protected\" is supposed to mean, even though a naive check for \"is this PDF encrypted\" would say yes and reject it.",
            },
            {
                type: "callout",
                text: "A PDF can refuse to let you copy its text and still hand that same text to anyone who opens it. That isn't password protection, and treating it like one would have rejected a normal, harmless statement.",
            },
            {
                type: "paragraph",
                text: "The fix only rejects a file when actually attempting to decrypt it with an empty password fails — the real, correct definition of \"this file needs a password I don't have.\"",
            },
            {
                type: "heading",
                text: "Extraction: native text first, OCR only when it has to be",
            },
            {
                type: "paragraph",
                text: "Most statements have real embedded text, which is fast and exact to extract. A page only falls back to OCR if it has fewer than about forty usable characters of embedded text — and if any single page in a document needs OCR, the whole document falls back together, not just that page. A statement split between two extraction methods risks silently losing the transactions on whichever page the split happened on, which is exactly the kind of quiet inaccuracy this project exists to avoid.",
            },
            {
                type: "paragraph",
                text: "Both paths — native and OCR — converge on the exact same output shape, so nothing downstream ever needs to know or care which one ran.",
            },
            { type: "divider" },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "The background job queue — so a hundred statements can process without freezing the app or letting one bad file take the rest down.",
            },
        ],
    },
    {
        slug: "build-log-2-the-tests-passed-and-the-schema-was-wrong",
        title: "Build Log #2: The Tests Passed and the Schema Was Wrong",
        excerpt:
            "Two tests, green in 0.32 seconds. The schema underneath them was broken in three separate ways — and the one check built to catch bad numbers would have laundered them instead.",
        date: "Sep 2026",
        tags: ["AI Engineering", "Claude Code", "Building in Public", "Python"],
        readTime: "4 min read",
        comingSoon: false,
        featured: true,
        hashnodeUrl: null, // ← set when published to Hashnode
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 2,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "Two tests, green in 0.32 seconds. Four clean tables in the database browser.",
            },
            {
                type: "paragraph",
                text: "Both true. The schema underneath was broken in three separate ways.",
            },
            {
                type: "paragraph",
                text: "This is post two on a local-first desktop app that turns years of bank statement PDFs into a financial picture you can trust. Post one was the skeleton. This one is the data model every later stage has to fit into — the least visible work in the project, and the most expensive to get wrong.",
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                text: "Three bugs a green test run can't see",
            },
            {
                type: "paragraph",
                text: "I found all three in about twenty minutes, by feeding the schema things that should have been impossible.",
            },
            {
                type: "list",
                items: [
                    "Money lost precision. Amounts were stored as SQLite NUMERIC, which is a type affinity, not a type. The value is kept as a binary float.",
                    "Foreign keys weren't enforced. SQLite defaults PRAGMA foreign_keys to OFF. I inserted a transaction pointing at a statement ID that didn't exist. It committed without complaint.",
                    "State columns were free text. direction = \"NOT_A_REAL_DIRECTION\" was accepted. Amounts were documented as always positive, with nothing enforcing it.",
                ],
            },
            {
                type: "paragraph",
                text: "The declared foreign keys were documentation, not constraints.",
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                text: "The money bug, measured",
            },
            {
                type: "list",
                items: [
                    "12345678.91 → came back as 12345678.9100000001",
                    "0.10 → came back as 0.10",
                    "typeof(amount) in SQLite → real",
                ],
            },
            {
                type: "paragraph",
                text: "Small amounts survive. Large ones don't.",
            },
            {
                type: "paragraph",
                text: "That's what makes it dangerous. The corruption is magnitude-dependent, so a test using 15.99 passes while the storage is already broken. It starts lying only on real statements with five-figure balances.",
            },
            {
                type: "paragraph",
                text: "Two things in this app depend on amounts comparing exactly:",
            },
            {
                type: "list",
                items: [
                    "Duplicate detection matches on account, date, amount, direction and description. A freshly parsed 12345678.91 no longer equals the stored value, so overlapping statements would quietly produce duplicates.",
                    "Reconciliation checks that opening balance plus credits minus debits equals closing balance.",
                ],
            },
            {
                type: "paragraph",
                text: "And here is the part that bothers me. Reconciliation allows a small rounding tolerance, because real statements have real quirks. That tolerance would have absorbed the drift and reported VALID.",
            },
            {
                type: "callout",
                text: "The one check built to catch bad numbers would have laundered them instead.",
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                text: "Why integer cents",
            },
            {
                type: "paragraph",
                text: "Money is now stored as a whole number of cents, converted in exactly one module.",
            },
            {
                type: "paragraph",
                text: "The alternative was storing the decimal as text and converting it back on read. That's also exact, keeps the Python side in Decimal, and keeps amounts readable as 15.99 in a database browser.",
            },
            {
                type: "paragraph",
                text: "I chose integer cents because of how each option fails when someone is careless six months from now.",
            },
            {
                type: "paragraph",
                text: "Text fails silently:",
            },
            {
                type: "list",
                items: [
                    "SUM(amount) adds strings and returns a plausible wrong number, with no error",
                    "ORDER BY sorts \"9.00\" after \"1000.00\"",
                    "15.9 and 15.90 are equal as numbers but different as strings, quietly breaking the exact match that duplicate detection needs",
                ],
            },
            {
                type: "paragraph",
                text: "Integer cents fails loudly. Its typical bug is an off-by-100, and a subscription showing as $1,599.00 instead of $15.99 gets caught by anyone glancing at a screen.",
            },
            {
                type: "callout",
                text: "When the whole product rests on its numbers being right, prefer the bug you can see over the bug you can't.",
            },
            {
                type: "paragraph",
                text: "Sub-cent values are now rejected rather than rounded. A parser producing fractional cents has misread the page, and rounding throws that evidence away.",
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                text: "The fix that mattered most",
            },
            {
                type: "paragraph",
                text: "Not the constraints. The test setup.",
            },
            {
                type: "paragraph",
                text: "The old tests built their own database connection. So if I had turned on foreign key enforcement in the application and stopped there, the tests would have kept passing against a database where the constraint didn't exist. Green tests, fixed app, nothing actually checking the fix.",
            },
            {
                type: "paragraph",
                text: "The tests now share the application's configuration. Then I checked they could fail: I turned the foreign key setting back off, watched both tests break, and turned it on again.",
            },
            {
                type: "callout",
                text: "A test that can't fail isn't a test.",
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                text: "Where it stands",
            },
            {
                type: "list",
                items: [
                    "29 tests, up from 2 — exact round-trips at large values, reconciliation asserted with zero tolerance, orphan rejection, every constraint",
                    "92% coverage, against a 90% floor that blocks a push locally and a merge on GitHub",
                    "The missing 8% is the API file itself, including the /health route from post one. No test at all. Those few lines get replaced when the real endpoints land, and I'd rather name the gap than let a percentage imply more than it covers",
                ],
            },
            {
                type: "paragraph",
                text: "Post one ended with a promise: from the data model on, write the reasoning down before building, and if a post doesn't show it, hold it against me. Both decisions here are written up with the alternatives I rejected, and the spec was corrected where it had been silent and I'd been guessing.",
            },
            {
                type: "divider",
            },
            {
                type: "heading",
                text: "Next",
            },
            {
                type: "paragraph",
                text: "Intake and validation. Accepting PDFs, rejecting the corrupted and password-protected ones with a reason a person can act on, and grouping the rest into a batch. The first stage where real files hit the system.",
            },
        ],
    },
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
        // No cover: the header image renders decorative (alt="", aria-hidden), and
        // this post's screenshot is the subject, not decoration — so it runs inline
        // below with a caption instead.
        coverImage: null,
        series: "bank-statement-analyzer-build-log",
        seriesIndex: 1,
        seriesLabel: "Bank Statement Analyzer build log",
        projectSlug: "local-bank-statement-analyzer",
        content: [
            {
                type: "paragraph",
                text: "I'm building a local-first desktop app that takes years of bank and credit card statement PDFs and turns them into a financial picture you can actually trust. Here is everything it does today:",
            },
            {
                type: "image",
                src: "/posts/post-2/first-window.png",
                caption: "The first Electron window. A card, and two words of JSON.",
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
