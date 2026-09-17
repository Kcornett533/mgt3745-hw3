# Features and specification

## Context
Researchers publishing novel methodologies face pushback proving the validity of data to reviewers ([JOB-01](USERS.md), [JOB-02](USERS.md)). Currently, authors must either spend 10+ hours manually assembling raw files, execution logs, and READMEs before initial submission ([INT-01](USERS.md)), or risk publication delays of several weeks conducting external validation reruns when reviewers challenge custom parameters ([INT-02](USERS.md)). 

To eliminate this obstacle, the proposed system is an automated data provenance generator. The system captures digital file signatures of raw inputs, script parameters, and execution logs, enabling researchers to export standardized, unalterable manifests that prove data integrity.

## Users
Refer to complete profile definitions in [`USERS.md`](USERS.md).
* **[PROFILE-01](USERS.md) (Early-Career Academic Researcher):** Seeks to eliminate manual packaging before manuscript submission ([INT-01](USERS.md), [JOB-01](USERS.md)).
* **[PROFILE-02](USERS.md) (Senior R&D Lead & Industry Executive):** Seeks to overcome reviewer skepticism without sharing raw code ([INT-02](USERS.md), [JOB-02](USERS.md)).

## Scope and non-goals

### In-Scope (HW3 Implementation Scope)
* **Single Feature Target (F-02):** A web form to input script names, execution parameters, and digital file signatures.
* **Local State Storage:** Saving entries into browser local storage so user data persists across page refreshes.
* **Manifest Export:** Exporting saved log records into a downloadable JSON manifest file.
* **Input Form Validation:** Checking that file signatures match standard hexadecimal formatting (64 characters) before saving.

### Non-Goals (Out of HW3 Scope)
* **Binary Raw Data Storage:** Hosting or uploading large scientific datasets.
* **Automated Script Execution:** Running or debugging scientific code directly in the browser.
* **Cloud Sync & User Logins:** Transmitting user data over network servers or requiring account creation.

## Behavior
* **Ubiquitous:** The system shall record parameter entries and digital file signatures, saving them to browser local storage with less than 5 percent runtime overhead compared to unlogged script execution.
* **Event-driven:** When a user clicks the export button on a saved record, the system shall generate and download a structured JSON manifest file.
* **Unwanted:** If browser local storage fails or an invalid signature is entered, the system shall display a red warning badge in the manifest header while keeping all user typed input intact in the form fields.

## Constraints
* **Pure Client-Side Execution:** Must run in any modern web browser using standard HTML5, CSS, and Vanilla JavaScript without build tools or external libraries.
* **Privacy-First Architecture:** No raw data or code may leave the user's browser or be uploaded to external servers.
* **Storage Limits:** State management is constrained to browser local storage capacity limits.

## Acceptance
* **Performance Benchmark:** The client-side logging script executes with under 5 percent runtime overhead during entry creation.
* **Visual Warning Alert:** Invalid file signatures or storage write failures trigger a prominent red warning badge (`#D32F2F` background with text "MANIFEST VERIFICATION FAILED") in the header section.
* **Verification Criteria:** The user can fill in valid execution parameters and a 64-character file signature, save the entry to browser storage without errors, and download the resulting JSON manifest file within 30 seconds.

---

## Feature Hypotheses (Kano Model)

| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning |
| :--- | :--- | :--- | :--- | :--- |
| **F-01** | Digital Data Seal & Verification | Must-be | PROFILE-01 / PROFILE-02<br>September 10, 2026 | Essential for proving data security and integrity. |
| **F-02** | Simple Export to JSON Manifest | Performance | PROFILE-01<br>September 10, 2026 | Saves 10+ hours of manual file gathering ([INT-01](USERS.md)). Core focus of HW3. |
| **F-03** | Automatic Script Tracker | Performance | PROFILE-01<br>September 10, 2026 | Simplifies setup for users not accustomed to software tools. |
| **F-04** | Live Result Testing Tool | Attractive | PROFILE-02<br>September 10, 2026 | Lets reviewers inspect settings avoiding full reruns ([INT-02](USERS.md)). |
| **F-05** | Custom UI | Indifferent | PROFILE-01 / PROFILE-02<br>September 10, 2026 | Visual styling does not impact peer review verification. |
| **F-06** | Mandatory Code Sharing | Reverse | PROFILE-02<br>September 10, 2026 | Forcing code disclosure drives away proprietary industry users. |

---

## Handoff Reflection
Evaluation by the reviewer (in this case it was Professor Swain) identified two primary edge cases: ambiguous display of verification failures and lack of performance bounds. In response, explicit thresholds were integrated into the specifications: execution overhead was bounded to under 5 percent runtime increase, and verification failures were assigned an explicit red warning badge on the manifest header. Additionally, input validation was updated to enforce 64-character hexadecimal formatting while preserving typed user form data during local storage exceptions.

---

## HW3 Single-Feature Verification Table

| Feature ID | Feature Name | HW3 Scope Status | Test Outcome | Verification Detail |
| :--- | :--- | :--- | :--- | :--- |
| **F-01** | Digital Data Seal & Verification | Deferred | `DEFERRED` | Out of scope for HW3 single-feature build. |
| **F-02** | Simple Export to JSON Manifest | In-Scope | `PASS` | Captures script name, parameters, and 64-character file signature into local storage and exports a downloadable JSON file. |
| **F-03** | Automatic Script Tracker | Deferred | `CANNOT TEST YET` | Requires background process integration hook. |
| **F-04** | Live Result Testing Tool | Deferred | `DEFERRED` | Out of scope for client-side single feature build. |
| **F-05** | Custom UI | Deferred | `DEFERRED` | Minimal functional styling implemented. |
| **F-06** | Mandatory Code Sharing | Excluded | `DEFERRED` | Non-goal based on Kano hypothesis (Reverse category). |
