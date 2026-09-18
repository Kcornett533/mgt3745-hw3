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



<img width="860" height="622" alt="Screenshot 2026-09-17 233523" src="https://github.com/user-attachments/assets/c9da12e1-8b16-4acf-89d7-27b55575453c" />
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
## Documentation & Project Structure

This repository follows the structured documentation scaffold located in the [`context/`](context/) directory:

* **[`SCAFFOLD_MANIFEST.md`](SCAFFOLD_MANIFEST.md):** Overview of HW2-to-HW3 carryover components and submission checklist.
* **[`context/PROJECT.md`](context/PROJECT.md):** Problem framing and domain context.
* **[`context/USERS.md`](context/USERS.md):** Target user profiles and use cases.
* **[`context/FEATURES.md`](context/FEATURES.md):** Specifications, functional requirements, and complete verification test logs.
* **[`context/ARCHITECTURE.md`](context/ARCHITECTURE.md):** Architectural decision matrix (The Gate) and ADR-001.
* **[`context/STANDARDS.md`](context/STANDARDS.md):** Code style guidelines, validation standards, and agent testing rules.
* **[`context/CLAUDE.md`](context/CLAUDE.md):** AI agent instructions for maintaining quality standards.

### Verification Check
To verify that all required scaffold files are present in the repository, run:
```bash
node scripts/check-scaffold.mjs
### Action Steps

1. Open **`README.md`** in VS Code.
2. Select the `## Links` section through the `Run node scripts/check-scaffold.mjs...` instructions.
3. Paste the Markdown block above in its place.
4. Save and push your changes:

```bash
git add README.md
git commit -m "docs: replace template links with finalized documentation section"
git push
## AI Use

## Delegation & Verification Record

**Tool and task delegated:**
Copilot / Claude 3.5 Sonnet drafted the basic JavaScript structure (`app.js`) and CSS layout (`styles.css`).

**Why:**
Delegating basic code setup saved time, allowing focus on building strong data validation and error handling.

**How it was checked:**
Reviewed the generated JavaScript for security issues. Replaced all unsafe `innerHTML` usage with secure `textContent` and a custom `escapeText()` helper to prevent cross-site scripting (XSS) when rendering user inputs.

**Observed result / evidence:**
Form inputs correctly filter non-hex values and enforce a 64-character length limit without breaking. Test evidence is recorded in [context/FEATURES.md](context/FEATURES.md).

**Instruction discovery and compliance:**
Copilot detected `.github/copilot-instructions.md` and `context/CLAUDE.md`. Verified that generated code complies with `context/STANDARDS.md` (no raw `innerHTML` mutation with unsanitized strings).

**Actual hours on this assignment (optional):** 4.5 hours

---

## Explain, Change, Verify

The `handleFormSubmit(event)` function processes form submissions in `app.js`. It reads and trims input fields, checks that the file signature matches a 64-character hex format (`/^[a-fA-F0-9]{64}$/`), creates a new manifest object, and saves it to `localStorage`. If the save succeeds, it clears the inputs and refreshes the table; if saving fails, it alerts the user while keeping their typed text intact.

**Before/After Change:**
* **Before:** Used `innerHTML` string interpolation to insert user text directly into table rows.
* **After:** Switched to DOM node creation via `document.createElement()`, `textContent`, and an `escapeText()` sanitizer helper before rendering user data.

**Why it matters:**
This change stops script injection through user inputs, protecting data integrity and keeping the application secure.
