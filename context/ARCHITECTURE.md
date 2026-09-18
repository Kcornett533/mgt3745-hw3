# Architecture

## Gate

### Hard Constraints
* **Client-Side Execution:** The application must run locally in a modern web browser without requiring external server deployments or complex runtime installations.
* **Data Privacy:** Raw data hashes, script names, and parameter logs must not be transmitted to unauthorized third-party tracking services.
* **Zero Dependencies:** The single-feature prototype must rely solely on native web standards (HTML5, CSS3, ES6+ JavaScript) without external build tools or npm package dependencies.

### Scoring Anchors (1–5)
* **1 (Least Favorable):** High monetary cost (> $100/mo), high maintenance effort, > 40 hours build time, opaque black-box code, complete lock-in, poor match to functional specifications.
* **3 (Neutral):** Moderate cost ($10–$50/mo), monthly maintenance required, 10–20 hours build time, partially inspectable code, moderate migration effort, meets basic specs with minor gaps.
* **5 (Most Favorable):** Zero cost ($0), minimal/zero ongoing maintenance, < 5 hours build time, 100% open/inspectable code, zero lock-in (standard formats), perfect fit to functional requirements.

### Decision Matrix

| Criterion | Weight | Hand-built option | Existing-service option | AI-assisted build |
|---|---:|---:|---:|---:|
| Cost to start | 4 | 5 (Score: 5 \| W: 20) | 2 (Score: 2 \| W: 8) | 5 (Score: 5 \| W: 20) |
| Cost to maintain | 3 | 5 (Score: 5 \| W: 15) | 2 (Score: 2 \| W: 6) | 5 (Score: 5 \| W: 15) |
| Time to working | 5 | 3 (Score: 3 \| W: 15) | 4 (Score: 4 \| W: 20) | 5 (Score: 5 \| W: 25) |
| Inspectability | 4 | 5 (Score: 5 \| W: 20) | 1 (Score: 1 \| W: 4) | 5 (Score: 5 \| W: 20) |
| Switching cost | 2 | 5 (Score: 5 \| W: 10) | 2 (Score: 2 \| W: 4) | 5 (Score: 5 \| W: 10) |
| Fit to spec | 5 | 4 (Score: 4 \| W: 20) | 2 (Score: 2 \| W: 10) | 5 (Score: 5 \| W: 25) |
| **Total Score** | **23** | **100** | **52** | **115** |

### Sensitivity Check
* **Baseline Winner:** AI-assisted build (Score: 115 vs. Hand-built: 100 vs. Existing-service: 52).
* **Test Scenario:** Increase the weight of **Inspectability** from 4 to 5 and decrease **Time to working** from 5 to 2.
* **Recalculated Totals:**
  * **Hand-built option:** $(5 \times 4) + (5 \times 3) + (3 \times 2) + (5 \times 5) + (5 \times 2) + (4 \times 5) = 96$
  * **Existing-service option:** $(2 \times 4) + (2 \times 3) + (4 \times 2) + (1 \times 5) + (2 \times 2) + (2 \times 5) = 41$
  * **AI-assisted build:** $(5 \times 4) + (5 \times 3) + (5 \times 2) + (5 \times 5) + (5 \times 2) + (5 \times 5) = 100$
* **Outcome:** The AI-assisted build remains the winning architecture even under adjusted priorities, proving high stability for the architectural choice.

---

## ADR-001

* **Title and date:** ADR-001: Pure Client-Side Browser Architecture with LocalStorage Persistence (September 17, 2026)
* **Status:** ACCEPTED
* **Door / concrete acquisition and execution choice:** Two-way door. The choice to build a pure client-side web application using native ES6 JavaScript and `localStorage` can be reversed or migrated to a backend server architecture later if scale demands it.
* **Context:** Researchers publishing experimental findings require a frictionless method to generate audit trails without exposing raw data files or uploading sensitive algorithm source code to remote servers. The solution must run instantly in any browser with zero setup overhead or server maintenance costs.
* **Decision:** Implement a pure client-side web application using HTML5, CSS3, and Vanilla JavaScript. State management and manifest persistence rely strictly on browser `localStorage` under key `mgt3745.provenance_manifests.v1`. JSON export is handled via client-side Blob generation.
* **Consequences and revisit trigger:**
  * **Consequences:** Zero hosting costs, complete user privacy, instantaneous execution (< 5% runtime overhead), offline capability. Storage capacity is constrained to browser quota limits (~5 MB), and multi-device synchronization is not natively supported.
  * **Revisit Trigger:** Re-evaluate this architectural choice if user requirements shift to multi-user real-time collaboration, centralized institutional audit registries, or cross-device state synchronization.

---

## Architectural Coexistence & Distinction
* **Pedagogical Browser Build:** The standalone, zero-dependency browser application implemented in this repository serves as a lightweight, zero-cost reference prototype designed to demonstrate client-side state handling, input validation, and instant JSON manifest generation.
* **Production Recommendation:** For enterprise institutional research environments, the recommended production architecture would expand this frontend interface into a hybrid desktop app (e.g., via Electron or a Python CLI wrapper) that hooks directly into local filesystem watchers and cryptographically signs manifests via hardware security keys before optional cloud sync.
