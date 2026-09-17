# Features and specification

## Context
Researchers publishing novel methodologies face pushback proving the validity of data to reviewers (JOB-01, JOB-02). Currently, authors must either spend hours manually assembling raw files, execution logs, and READMEs before initial submission (INT-01), or risk long and costly delays conducting external validation reruns when reviewers challenge custom parameters (INT-02). 

To eliminate this obstacle, the proposed system is an automated data provenance and audit trail generator. The system captures digital file signatures of raw inputs, script parameters, and execution logs, enabling researchers to instantly export standardized, unalterable manifests that prove data integrity and pipeline execution.

## Users
* **PROFILE-01 (Early-Career Academic Researcher):** Needs background logging of parameters and simple manifest exports (JOB-01) to eliminate manual packaging before manuscript submission (INT-01).
* **PROFILE-02 (Senior R&D Lead & Industry Executive):** Needs verifiable audit trails and file signatures (JOB-02) to handle reviewer skepticism and avoid validation reruns (INT-02) without sharing raw code or data.

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
* **Ubiquitous:** The system shall record parameter entries and digital file signatures, saving them to browser local storage.
* **Event-driven:** When a user clicks the export button on a saved record, the system shall generate and download a structured JSON manifest file.
* **Unwanted:** If browser local storage fails or an invalid signature is entered, the system shall display an error message while keeping all user typed input intact in the form fields.

## Constraints
* **Pure Client-Side Execution:** Must run in any modern web browser using standard HTML5, CSS, and Vanilla JavaScript without build tools or external libraries.
* **Privacy-First Architecture:** No raw data or code may leave the user's browser or be uploaded to external servers.
* **Storage Limits:** State management is constrained to browser local storage capacity limits.

## Acceptance
* **Verification Criteria:** The user can fill in valid execution parameters and a 64-character file signature, save the entry to browser storage without errors, and download the resulting JSON manifest file containing all logged metadata and a timestamp.

---

## Feature Hypotheses (Kano Model)

| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning |
| :--- | :--- | :--- | :--- | :--- |
| **F-01** | Digital Data Seal & Verification | Must-have | PROFILE-01 / PROFILE-02<br>September 10, 2026 | Essential for proving data security and integrity. |
| **F-02** | Simple Export to JSON Manifest | Performance | PROFILE-01<br>September 10, 2026 | Saves hours of manual file gathering (INT-01). Core focus of the HW3 single-feature implementation. |
| **F-03** | Automatic Script Tracker | Performance | PROFILE-01<br>September 10, 2026 | Simplifies setup for users not accustomed to software tools. |
| **F-04** | Live Result Testing Tool | Attractive | PROFILE-02<br>September 10, 2026 | Lets reviewers inspect settings avoiding full reruns (INT-02). |
| **F-05** | Custom UI | Indifferent | PROFILE-01 / PROFILE-02<br>September 10, 2026 | Visual styling does not impact peer review verification. |
| **F-06** | Mandatory Code Sharing | Reverse | PROFILE-02<br>September 10, 2026 | Forcing code disclosure drives away proprietary industry users. |

---

## Handoff Reflection
An external evaluation of this project identified two key edge cases: handling invalid file signature formats and avoiding user data loss during browser storage failures. In response, input verification rules were added to block invalid entries before saving, and the form submission logic was updated to keep text in input boxes if local storage fails.

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
