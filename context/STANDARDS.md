# Standards

## Normative Coding Rules

1. **Strict Input Validation:** All user inputs must be validated prior to updating state. Digital file signature inputs must match a 64-character hexadecimal pattern before persistence.
2. **Safe Storage Handling:** Reads and writes to browser `localStorage` must be wrapped in `try/catch` blocks. Storage failures must keep form inputs intact to prevent data loss.
3. **DOM Injection Prevention:** Dynamic UI rendering must use safe methods (`document.createElement()` and `textContent`). Direct `innerHTML` assignment with user inputs is strictly prohibited.
4. **Accessible Status Communication:** Status changes and error prompts must update dedicated ARIA live regions (`role="status"`, `role="alert"`) for screen reader compatibility.
5. **Deterministic State Loop:** UI actions must update the data array first, write to `localStorage` second, and trigger DOM updates third.

---

## Split Test Assessment

* **Data Corruption Guard:** Stored payloads are verified as valid arrays before rendering. Malformed entries trigger a friendly warning without corrupting existing records.
* **Clarity Guard:** Error prompts explicitly state validation criteria (e.g., "Enter a valid 64-character hexadecimal file signature").
* **Domain Collision Guard:** All local storage keys use isolated prefixes (`mgt3745.provenance_manifests.v1`) to eliminate conflicts with third-party sites.

---

## Colleague Test
A peer or reviewer can open `index.html` in any web browser without build processes or local servers, populate execution parameters with a valid 64-character file signature, save the entry, and download a JSON manifest file within 30 seconds.
