# Autonomous Queue State Machine

This file defines the executable control-plane contract for `AUTONOMY/QUEUE.json`. Natural-language prompts describe role behavior; this state machine determines how work is selected, resumed, retried, escalated and closed across scheduled runs.

## Statuses

- `backlog`: valid work that is not yet executable or not currently prioritized.
- `ready`: all dependencies and evidence gates required to begin the next action are satisfied.
- `active`: one role currently owns the item and has recorded an active lease or run checkpoint.
- `waiting_ci`: a candidate commit exists and exactly one CI query found the required workflow queued or in progress.
- `waiting_evidence`: CI completed, but an exact-SHA deployment receipt, browser receipt or required artifact is not yet available.
- `blocked_recoverable`: execution failed, but a concrete alternative strategy can be attempted autonomously.
- `blocked_external`: progress requires a proven new permission, irreversible user decision, paid/licensed purchase, or credible legal/security decision.
- `completed`: acceptance conditions are satisfied by direct evidence.
- `abandoned`: the value no longer justifies the work or the abandon condition was met. The reason and evidence remain in history.

Only `ready`, `active`, `waiting_ci`, `waiting_evidence` and `blocked_recoverable` are open executable states. `completed` and `abandoned` are terminal unless a new verified condition creates a new queue item.

## Required fields for every open item

Each open queue item must contain:

- `id`, `title`, `owner`, `status`, `priority`;
- `expectedGain`, `risk`, `dependencies`;
- `evidence` with direct repository, commit, workflow, receipt, artifact or authoritative-research references;
- `nextAction` containing one concrete action, not a general goal;
- `acceptance` and `abandonCondition`;
- `attemptCount`, `lastAttemptAt`, `lastErrorFingerprint`, `attemptHistory`, `strategyVersion`;
- `doNotRetryUnless` when a path has been directly disproven.

Allowed owners are `main`, `radar`, `critic`, `guard` and `curator`.

## Selection

1. Resume `STATE.json.controlPlane.activeItemId`, candidate SHA or `lastCheckpoint` before selecting unrelated work.
2. Do not select an item whose dependencies are not `completed`.
3. Prefer the highest-priority `ready` item owned by the running role.
4. Only the primary controller may set a product item to `active` or edit product source.
5. One primary run owns one coherent product item. Supporting roles may update their assigned evidence or recovery items without changing product source.
6. `NEXT_PROMPT.md` must describe the current highest-priority executable primary item and must agree with `STATE.json.nextObjectiveId` and `QUEUE.json.activeItemId`.

## Transitions

- `backlog -> ready`: dependencies and evidence prerequisites are satisfied and `nextAction` is executable.
- `ready -> active`: the responsible role starts the item; the primary controller must acquire the repository lease before product-source mutation.
- `active -> waiting_ci`: a validated candidate SHA was pushed and the single allowed CI check returned queued/in-progress.
- `waiting_ci -> waiting_evidence`: workflow completed but exact-SHA receipts or artifacts are not yet readable.
- `waiting_ci|waiting_evidence -> active`: the next run resumes the same SHA and the missing evidence is now available or a CI failure has a concrete repair action.
- `active -> completed`: every acceptance condition is supported by direct evidence and all required state, ledger and memory updates are complete.
- `active -> blocked_recoverable`: a real tool, build, CI, deployment, browser or integration failure occurred and an autonomous alternative exists.
- `blocked_recoverable -> ready`: a revised strategy and concrete next action have been recorded.
- `any open state -> blocked_external`: direct evidence proves that only a new permission, irreversible user decision, paid/licensed purchase or legal/security decision can unblock progress.
- `any non-terminal state -> abandoned`: the abandon condition is met and the reason is recorded.

## Attempts and anti-loop rules

An attempt is counted only after a real tool call, command, build, workflow query, browser audit or source integration action produces evidence. Prompt restatement and generic refusal are not attempts; they are automation faults assigned to `guard`.

For every failed attempt:

1. increment `attemptCount`;
2. set `lastAttemptAt`;
3. normalize the failure into `lastErrorFingerprint`;
4. append a compact `attemptHistory` entry with strategy version, action, evidence, result and next change.

After three consecutive attempts with the same or materially equivalent fingerprint:

- mark the current strategy `failed_attempt` in history;
- increment `strategyVersion`;
- do not execute the same path a fourth time;
- change at least one of toolchain, implementation approach, validation route, branch, input artifact or owner;
- record why the new strategy differs and what evidence will accept or abandon it.

A disproven path receives `doNotRetryUnless` with the exact condition that must change before reuse.

## CI and evidence checkpoints

- Query a queued/in-progress workflow only once per scheduled run.
- Persist the exact candidate SHA, workflow/run identifier, last observed status and next evidence path.
- Release the product lease when safe; the next primary run resumes the same item and SHA before starting new work.
- `latest.json` pointers never replace exact-SHA receipts.

## Queue governance

Before ending a primary or guard run:

- merge duplicate items;
- close evidence-complete items;
- abandon obsolete items with a reason;
- add missing owner, evidence, next action, acceptance, abandon and attempt fields;
- split oversized or repeatedly failing items;
- reassign stalled items;
- reorder by current value, dependency and evidence;
- synchronize `activeItemId`, `STATE.json.nextObjectiveId` and `NEXT_PROMPT.md`.

The user is notified only for `blocked_external` or a deployed result requiring direction feedback.