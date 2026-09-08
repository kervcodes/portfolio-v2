# Skill Routing and Override Strategy

Codex does not guarantee that one overlapping skill automatically replaces another.

Use this skill as the primary owner for recruiter-facing portfolio tasks.

## Recommended installation

### Repository-scoped

Install the folder at:

`.agents/skills/recruiter-facing-portfolio/`

Use this when the workflow is specifically for one portfolio repository.

### User-scoped

Install the folder at:

`~/.agents/skills/recruiter-facing-portfolio/`

Use this when you want the workflow available across repositories.

## Recommended AGENTS.md routing rule

Add a rule like this to the portfolio repository's root `AGENTS.md`:

```md
## Recruiter-facing portfolio skill routing

For tasks that audit, edit, or implement the public career portfolio, use
`$recruiter-facing-portfolio` as the primary workflow.

It owns decisions about public career positioning, claim truthfulness,
project evidence/order, project status language, metric verification,
case-study/build-brief integrity, and recruiter-facing information architecture.

Other skills may support separate implementation concerns such as framework
syntax, accessibility, testing, or browser QA, but they must not override
those recruiter-facing rules.
```

## When explicit invocation is worth using

Invoke:

`$recruiter-facing-portfolio`

when:
- another broad frontend/design skill keeps taking over
- the task mixes visual and career-positioning changes
- project credibility or metrics are the main risk
- you want deterministic routing for an important portfolio pass

## Disabling a truly conflicting skill

If a local skill consistently conflicts with this workflow, disable that exact skill by its real path in `~/.codex/config.toml`:

```toml
[[skills.config]]
path = "/actual/path/to/conflicting-skill/SKILL.md"
enabled = false
```

Do not guess paths.

Do not disable generic supporting skills merely because they are related. Disable only a skill whose ownership directly conflicts with this one.
