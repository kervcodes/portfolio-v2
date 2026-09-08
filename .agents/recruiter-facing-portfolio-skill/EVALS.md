# Skill Trigger Evals

Use these prompts to sanity-check skill routing.

## Should trigger

1. "Audit my developer portfolio for recruiter credibility and fix the homepage."
2. "Reorder my projects so completed work is stronger than my unfinished AI project."
3. "Review every metric on my portfolio and remove anything I cannot defend."
4. "Turn this unfinished project page from a fake case study into an honest build brief."
5. "Make my AI Solutions Engineer portfolio consistent without redesigning the site."
6. "Check whether my About page and SEO contradict my target role."
7. "Implement the recruiter-facing portfolio changes in this repo and run validation."

Expected primary owner:
`recruiter-facing-portfolio`

## Should not trigger

1. "Fix this React hydration error."
2. "Make this dashboard prettier."
3. "Debug my failing GitHub Actions workflow."
4. "Write unit tests for this utility."
5. "Optimize this SQL query."
6. "Rewrite my resume for this job."
7. "Find open AI Solutions Engineer jobs."

Expected:
another more specific skill or normal Codex workflow.

## Mixed task

Prompt:
"Update my portfolio hero for recruiter positioning, then fix the mobile spacing."

Expected:
- `recruiter-facing-portfolio` owns positioning and public claims.
- a frontend/design skill may support mobile spacing if useful.
- visual support must not rewrite unsupported claims or change project status.
