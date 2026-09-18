# [Project Name]



## What

This application implements **Feature F-02: Simple Export to JSON Manifest** to capture execution settings, script details, and raw data SHA-256 signatures for scientific peer review ([`PROJECT.md`](context/PROJECT.md), [`FEATURES.md`](context/FEATURES.md)).

## See It Work

![Application interface displaying a newly logged provenance record in the activity table](docs/readme.md)

### Acceptance Criterion Demonstrated
* **Criterion:** "WHEN the user submits a valid 64-character hexadecimal signature, THE SYSTEM SHALL persist the record to local storage and display it immediately in the activity log table."
* **Explanation:** The screenshot above demonstrates entering valid sample metadata and a 64-character hash, submitting the form, and seeing the table dynamically render the new record without a page refresh.

## How to Run

This project runs inside a **GitHub Codespace** using native web standards—no external dependencies or build steps required.

### Running the Application

1. Click **Code → Codespaces → Create codespace on main**.
2. Once the environment loads, launch the application using one of the following methods:
   * **Live Server (Recommended):** Right-click `index.html` in the file explorer and select **Open with Live Server** (or click **Go Live** in the bottom status bar).
   * **Node Fallback:** Run `node scripts/serve.mjs` (or `python3 -m http.server 5500`) in the terminal.
3. Open port **5500** from the **Ports** tab to view the running application in your browser.
4. Any changes saved to `index.html`, `styles.css`, or `app.js` will automatically reload in the browser.
## How It Works

flowchart TD
    A[Page opens] --> B[loadManifests: read & parse localStorage]
    B -->|Read Error| B1[Show read warning & set empty state]
    B -->|Read Success| C[renderManifests: draw table with textContent]
    B1 --> C

    D[User submits form] --> E{Valid Sample ID, Operator ID & 64-char Hex Hash?}
    E -->|No| F[Show validation error & preserve typed inputs]
    E -->|Yes| G[Create proposed manifest record]

    G --> H{saveManifests: storage write succeeds?}
    H -->|No| I[Show storage error & preserve typed inputs]
    H -->|Yes| J[Update in-memory state]
    J --> K[renderManifests: redraw log table]
    K --> L[Clear form inputs & announce success]

    M[User clicks Delete] --> N[Create proposed array without entry]
    N --> O{saveManifests: storage write succeeds?}
    O -->|No| P[Show delete error & maintain active list]
    O -->|Yes| Q[Update in-memory state & re-render table]

## Status

| Area | State | Why |
|------|-------|-----|
| Save and display | Works | Form validates input, persists new record to `localStorage`, and updates the table without a page reload. [Evidence](docs/readma) |
| Invalid input | Works | Reject button triggers clear error messaging for non-hex or incorrect length hashes without corrupting state. [See Verification Log](#verification-results-click-to-expand) |
| Data survives reload / storage failure | Works | State reloads successfully from `localStorage` upon page refresh; simulated quota errors safely display user warnings. [See Verification Log](#verification-results-click-to-expand) |
| Multi-user sync (starter limitation) | Deferred | Browser-local storage does not provide sync. Scope and architectural decision documented in [ADR-001](context/ARCHITECTURE.md). |


<details>
<summary>Verification results (click to expand)</summary>

Detailed test records are mirrored in [FEATURES.md](context/FEATURES.md).

| Criterion / EARS statement | Steps and input | Expected result | Observed result | Status | Evidence / commit |
|---|---|---|---|---|---|
| AC-1: Valid Hash Persistence | Enter valid Sample ID, Operator ID, and a 64-character hex hash. Click "Log Manifest". | State before: Empty table or existing records. | Record appended to table instantly and saved to `localStorage`. Inputs cleared. | PASS | [Screenshot](docs/readma) |
| AC-2: Invalid Hash Rejection | Enter a 10-character hash (invalid length/character set). Click "Log Manifest". | State before: Inputs entered, table unchanged. | Validation error displayed above form. No record added to table or storage. | PASS | [Commit Logs](context/FEATURES.md) |
| AC-3: Data Reload Persistence | Populate log table, refresh browser page (F5 or Live Server reload). | State before: Active manifest table populated. | All logged records re-parsed from `localStorage` and re-rendered in table accurately. | PASS | [Commit Logs](context/FEATURES.md) |
| AC-4: Quota Storage Failure | Block `localStorage` or simulate write error while submitting valid form. | State before: Form populated with valid data. | UI displays save error notification; typed input preserved in form without app crash. | PASS | [Commit Logs](context/FEATURES.md) |

</details>
## Links

Read in this order:

0. [`SCAFFOLD_MANIFEST.md`](SCAFFOLD_MANIFEST.md): explains what carries over from HW2 into HW3, along with a submission checklist
1. [`context/PROJECT.md`](context/PROJECT.md): the problem and its framing
2. [`context/USERS.md`](context/USERS.md): who this is for
3. [`context/FEATURES.md`](context/FEATURES.md): what it must do, and verification results
4. [`context/ARCHITECTURE.md`](context/ARCHITECTURE.md): the gate and ADR-001
5. [`context/STANDARDS.md`](context/STANDARDS.md): the rules this code follows
6. [`context/CLAUDE.md`](context/CLAUDE.md): the same rules, for agents

The scaffold has **eleven canonical files in `/context`: six active files above and five previews**: [STYLE.md](context/STYLE.md), [TOOLS.md](context/TOOLS.md), [SKILLS.md](context/SKILLS.md), [EVALS.md](context/EVALS.md), and [AGENTS.md](context/AGENTS.md). Keep the previews; verification stays in FEATURES.md until EVALS.md activates in Module 5.

Root README.md and the two instruction adapters—[CLAUDE.md](CLAUDE.md) and [.github/copilot-instructions.md](.github/copilot-instructions.md)—are additional files. Copy your HW2 USERS.md and FEATURES.md into `/context` and revise them using instructor feedback if available; otherwise record a peer criterion check and mark instructor feedback pending. Run `node scripts/check-scaffold.mjs` to check required file presence; this does not assess content quality.

## AI Use

<!-- A Delegation Decision Record without the name. From HW5 this becomes a formal DDR. -->

**Tool and task delegated:** [Which parts a tool drafted: e.g. "Copilot drafted render() and the CSS."]

**Why:** [The reason it made sense to delegate that part rather than write it.]

**How it was checked:** [What you inspected, what you changed, what you caught. "Replaced innerHTML with textContent" is the kind of sentence that belongs here.]

**Observed result / evidence:** [What the checks actually showed; link the relevant verification row, code change, or other evidence. Do not invent a run.]

If no AI assistance was used, say so and describe your independent check. Full Delegation Decision Records begin at HW5; this lightweight record is sufficient here.

**Instruction discovery and compliance:** [Record the tool and mode, which instruction adapter it discovered, and the reference or diagnostic evidence. Separately report whether one generated change followed the applicable standards. If no live AI tool is available, write “not run” and record a manual standards review.]

**Actual hours on this assignment (optional):** [A number, if you choose to report it. The amount or omission does not affect points; the AI-use record does.]

## Explain, Change, Verify

[Identify one function and explain its input, state changes, and output in your own words. Link a meaningful before/after code change, state its expected effect, and record the observed behavior and evidence. Explain why the change matters to your selected requirement. This paragraph is part of the existing README submission.]

<!-- Things this README could also do, if they earn their place:
     - GitHub alerts:  > [!NOTE]  > [!WARNING]  > [!TIP]
     - Task lists:     - [x] done   - [ ] not yet
     - Emoji:          :rocket: :white_check_mark:
     - Footnotes:      text[^1]  ...  [^1]: the note
     - Embedded HTML tables, <kbd>Ctrl</kbd>+<kbd>S</kbd>, <sup>, <sub>
     None are required. A README that reads well with none of them beats one that uses all of them. -->
