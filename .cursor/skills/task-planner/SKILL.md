---
name: task-planner
version: 1.0.0
description: Decompose any task description into agent-ready sub-tasks and save the plan as a markdown file. Triggers: "plan this task", "break this down", "decompose this", any feature/task description.
---

# Task Planner

Turn any task description into a structured execution plan for AI agents. Saves the result as a markdown file in `docs/plans/`. No external tools required.

## Workflow

```
Clarify → Research → Decompose → Approve → Save
```

---

### Phase 0: Clarify (MANDATORY — cannot be skipped)

After receiving a task description, evaluate it:

1. **Is the task too small?** If single-file / < 30 min — offer to proceed directly without decomposing.

2. **Is there enough info?** Check: end goal, scope boundaries, technical constraints, dependencies, expected UX. If anything is unclear — formulate 3-5 clarifying questions (most important first). Don't ask what you can find in the codebase yourself.

3. **If already clear** — summarize key points and ask: "Is this correct? Can I proceed?" Move forward only after confirmation.

**If the user rejects twice** — list remaining assumptions explicitly, ask whether to proceed with them or abandon.

---

### Phase 1: Research (read-only)

Explore the codebase to understand context:
- Architecture, dependencies, blast radius of planned changes
- Files that will need changes and existing project patterns
- Check `docs/plans/` for existing plans — plan only missing work

**Determine:** branch naming convention, affected modules, existing patterns to follow.

---

### Phase 2: Decompose (draft only — do NOT write files yet)

**Rules:**
- Each sub-task completable in one agent session
- **3-7 sub-tasks per epic** (if more — group or split)
- Order by execution sequence (data layer → logic → UI)
- Minimize cross-task dependencies; blocked tasks reference their blockers
- Separate UI, logic, and tests

**Estimation:** 1pt (1 file, <50 lines) · 2pt (2-3 files, <150 lines) · 3pt (3-5 files, new patterns) · >3pt → split

**Sub-task description template:**

```markdown
## Context
Part of: [Epic title]

## What to Build
[Clear description of the deliverable]

## References
- [Figma/Spec/Related docs if available]

## Files
**Create:** `path/to/new/file.ts`
**Update:** `path/to/file.ts` — what to change
**Do not touch:** `path/to/protected/` — reason

## Implementation Notes
- [Approach, patterns, edge cases]

## Acceptance Criteria
- [ ] [Specific, testable criterion]
- [ ] Project compiles without errors
- [ ] Lint passes
```

Every task must answer: What (deliverable), Why (context), Where (files), How (approach), Done when (AC).

---

### Phase 3: Approval Gate (MANDATORY)

Present the full plan in chat:

```
EPIC: [Title] [priority]
  1. TASK: [Title] [priority] [estimate]
     - AC: ...
  2. TASK: [Title] [priority] [estimate]
     Blocked by: #1
     - AC: ...
```

Ask: **"Approve this plan, or tell me what to change."**

Wait for response. Max 3 revision rounds → then ask "Save as-is, start over, or abandon?"

---

### Phase 4: Save Plan (only after approval)

1. Ensure `docs/plans/` directory exists (create if missing).
2. Generate a filename: `docs/plans/YYYY-MM-DD-<kebab-case-epic-title>.md`
3. Write the full plan as a markdown file using this structure:

```markdown
# [Epic Title]

> Created: YYYY-MM-DD
> Estimate: X points total
> Priority: [high/medium/low]

## Overview
[2-3 sentence description of the epic goal]

## Tasks

### 1. [Task Title] — Xpt
**Priority:** high/medium/low
**Blocked by:** — (or: #N)

#### Context
Part of: [Epic title]

#### What to Build
...

#### Files
**Create:** ...
**Update:** ...

#### Implementation Notes
...

#### Acceptance Criteria
- [ ] ...
- [ ] Project compiles without errors
- [ ] Lint passes

---

### 2. [Task Title] — Xpt
...
```

4. Confirm to the user: `Plan saved → docs/plans/<filename>.md`

---

## Agent Execution Loop

Include in every task description:

```
1. Read the full plan file for context
2. Update the task status in the plan file: - [ ] → - [x]
3. Create branch: feat/<kebab-case-task-title> (skip for non-code tasks)
4. Implement changes
5. Verify build + lint pass
6. Commit with gitmoji-commit skill
7. Create PR or commit directly for small scope
```

---

## Error Handling

| Situation | Action |
|-----------|--------|
| Task too small for epic | Proceed directly without decomposing. |
| User rejects plan 3+ times | Ask: "Save as-is, start over, or abandon?" |
| `docs/plans/` doesn't exist | Create the directory before saving. |
| Cannot determine file paths | Mark as `TBD` in Files section. |

---

## Quality Standard

```
Title: Implement PricingCard component
Estimate: 2 points
AC: Component accepts props { planName, price, features[] } and renders a card
AC: Project builds without errors
AC: Lint passes
```
