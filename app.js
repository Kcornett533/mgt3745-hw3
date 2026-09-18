const STORAGE_KEY = 'mgt3745.provenance_manifests.v1';

// DOM Elements
const form = document.getElementById('provenance-form');
const pipelineInput = document.getElementById('pipeline-name');
const paramsInput = document.getElementById('execution-params');
const signatureInput = document.getElementById('file-signature');
const notesInput = document.getElementById('researcher-notes');
const clearBtn = document.getElementById('clear-btn');
const clearAllBtn = document.getElementById('clear-all-btn');
const recordsList = document.getElementById('records-list');
const statusBadge = document.getElementById('status-badge');

// Application State
let manifestEntries = [];

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    loadEntries();
    renderEntries();

    form.addEventListener('submit', handleFormSubmit);
    clearBtn.addEventListener('click', clearForm);
    clearAllBtn.addEventListener('click', handleClearAll);
});

// Load State from LocalStorage
function loadEntries() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            const parsed = JSON.parse(raw);
            manifestEntries = Array.isArray(parsed) ? parsed : [];
        }
    } catch (e) {
        manifestEntries = [];
        updateStatus('MANIFEST VERIFICATION FAILED', true);
    }
}

// Save State to LocalStorage
function saveEntries() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(manifestEntries));
        updateStatus('SYSTEM READY', false);
        return true;
    } catch (e) {
        updateStatus('MANIFEST VERIFICATION FAILED', true);
        return false;
    }
}

// Handle Form Submission
function handleFormSubmit(event) {
    event.preventDefault();

    const pipelineName = pipelineInput.value.trim();
    const executionParams = paramsInput.value.trim();
    const fileSignature = signatureInput.value.trim();
    const notes = notesInput.value.trim();

    // Input Validation (Strict 64-character Hexadecimal)
    const hex64Regex = /^[a-fA-F0-9]{64}$/;
    if (!pipelineName || !executionParams || !hex64Regex.test(fileSignature)) {
        updateStatus('MANIFEST VERIFICATION FAILED', true);
        alert('Validation Error: Ensure all required fields are populated and the file signature is exactly 64 hexadecimal characters.');
        return;
    }

    const newEntry = {
        id: 'MAN-' + Date.now(),
        timestamp: new Date().toISOString(),
        pipelineName,
        executionParams,
        fileSignature,
        notes: notes || 'N/A'
    };

    manifestEntries.unshift(newEntry);

    if (saveEntries()) {
        clearForm();
        renderEntries();
    }
}

// Render Provenance Records
function renderEntries() {
    recordsList.textContent = '';

    if (manifestEntries.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-state';
        empty.textContent = 'No provenance entries recorded yet. Submit the form above to capture an execution log.';
        recordsList.appendChild(empty);
        return;
    }

    manifestEntries.forEach((entry) => {
        const card = document.createElement('div');
        card.className = 'record-item';

        const header = document.createElement('div');
        header.className = 'record-header';

        const title = document.createElement('span');
        title.textContent = entry.pipelineName;

        const time = document.createElement('span');
        time.style.fontSize = '0.8rem';
        time.style.color = '#64748b';
        time.textContent = new Date(entry.timestamp).toLocaleString();

        header.appendChild(title);
        header.appendChild(time);

        const meta = document.createElement('div');
        meta.className = 'record-meta';
        meta.innerHTML = `
            <strong>SHA-256 Hash:</strong> <code>${escapeText(entry.fileSignature)}</code><br>
            <strong>Parameters:</strong> ${escapeText(entry.executionParams)}<br>
            <strong>Notes:</strong> ${escapeText(entry.notes)}
        `;

        const actions = document.createElement('div');
        actions.className = 'record-actions';

        const exportBtn = document.createElement('button');
        exportBtn.className = 'btn btn-secondary';
        exportBtn.textContent = 'Export JSON Manifest';
        exportBtn.onclick = () => exportManifestJSON(entry);

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger-outline';
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteEntry(entry.id);

        actions.appendChild(exportBtn);
        actions.appendChild(deleteBtn);

        card.appendChild(header);
        card.appendChild(meta);
        card.appendChild(actions);

        recordsList.appendChild(card);
    });
}

// Export Manifest JSON Blob
function exportManifestJSON(entry) {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entry, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${entry.pipelineName.replace(/[^a-z0-9]/gi, '_')}_manifest.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
}

// Delete Single Entry
function deleteEntry(id) {
    manifestEntries = manifestEntries.filter(e => e.id !== id);
    saveEntries();
    renderEntries();
}

// Clear All Entries
function handleClearAll() {
    if (confirm('Are you sure you want to delete all saved provenance records?')) {
        manifestEntries = [];
        saveEntries();
        renderEntries();
    }
}

// Clear Form Inputs
function clearForm() {
    pipelineInput.value = '';
    paramsInput.value = '';
    signatureInput.value = '';
    notesInput.value = '';
}

// Update Header Status Badge
function updateStatus(message, isError) {
    statusBadge.textContent = message;
    if (isError) {
        statusBadge.className = 'badge badge-danger';
    } else {
        statusBadge.className = 'badge badge-success';
    }
}

// Helper Text Escaper
function escapeText(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
}
