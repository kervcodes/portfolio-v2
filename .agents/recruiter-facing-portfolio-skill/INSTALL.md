# Install

## Best default for a personal portfolio repository

Copy this entire folder to:

```text
<portfolio-repo>/.agents/skills/recruiter-facing-portfolio/
```

Then add the routing block from `references/skill-routing.md` to the repository root `AGENTS.md`.

Codex detects skill changes automatically. If the skill does not appear, restart Codex.

## Global installation

If you want it available in every repository, copy the folder to:

```text
~/.agents/skills/recruiter-facing-portfolio/
```

## Invoke explicitly

In Codex CLI or the IDE extension:

```text
$recruiter-facing-portfolio
```

or select it from `/skills`.

## Conflict handling

Do not create another skill with the same name expecting replacement behavior.

If an actually conflicting skill must be disabled, use its real `SKILL.md` path in `~/.codex/config.toml` as documented in `references/skill-routing.md`.
