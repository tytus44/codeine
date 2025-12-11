// --- INIZIALIZZAZIONE LUCIDE ICONS ---
lucide.createIcons();

// --- VARIABILI GLOBALI ---
let editor;
let tabs = [];
let activeTabId = null;
let untitledCounter = 1;
const STORAGE_KEY = 'codeine_session_v3';

// --- MONACO EDITOR SETUP ---
require.config({ paths: { 'vs': 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.45.0/min/vs' }});
require.config({ 'vs/nls': { availableLanguages: { '*': 'it' } } });

require(['vs/editor/editor.main'], function() {
    // Temi Custom
    monaco.editor.defineTheme('ayu-light-custom', {
        base: 'vs', inherit: true,
        rules: [],
        colors: {
            'editor.background': '#FFFFFF',
            'editor.foreground': '#374151',
            'editorLineNumber.foreground': '#9CA3AF',
            'editor.lineHighlightBackground': '#F3F4F6',
            'editorCursor.foreground': '#374151'
        }
    });
    monaco.editor.defineTheme('ayu-dark-custom', {
        base: 'vs-dark', inherit: true,
        rules: [],
        colors: {
            'editor.background': '#0D1117',
            'editor.foreground': '#C9D1D9',
            'editorLineNumber.foreground': '#484F58',
            'editor.lineHighlightBackground': '#161B22',
            'editorCursor.foreground': '#C9D1D9'
        }
    });

    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.setAttribute('data-theme', currentTheme);

    editor = monaco.editor.create(document.getElementById('editor'), {
        theme: currentTheme === 'dark' ? 'ayu-dark-custom' : 'ayu-light-custom',
        fontFamily: "'Fira Code', monospace",
        fontSize: 14,
        automaticLayout: true,
        minimap: { enabled: true },
        padding: { top: 16 }
    });

    editor.onDidChangeCursorPosition(e => updateStatus(e.position));
    editor.onDidChangeModelContent(() => {
        const tab = getActiveTab();
        if(tab && !tab.isModified) {
            tab.isModified = true;
            renderTabs();
        }
    });

    // Ripristino
    if(!restoreSession()) {
        newFile('html'); // Default first file
    }
});

// --- TAB SYSTEM ---
function createTab(name, lang, content, id = null) {
    const tabId = id || `tab-${Date.now()}`;
    const model = monaco.editor.createModel(content, lang);
    
    const tab = { id: tabId, name, language: lang, model, viewState: null, isModified: false };
    tabs.push(tab);
    renderTabs();
    switchTab(tabId);
    return tab;
}

function switchTab(id) {
    const current = getActiveTab();
    if(current) current.viewState = editor.saveViewState();

    activeTabId = id;
    const tab = getActiveTab();
    if(!tab) return;

    editor.setModel(tab.model);
    if(tab.viewState) editor.restoreViewState(tab.viewState);
    editor.focus();
    
    renderTabs();
    updateUI();
    saveSession();
}

function closeTab(id, event) {
    if(event) event.stopPropagation();
    const tab = tabs.find(t => t.id === id);
    
    if(tab.isModified && !confirm(`Salvare le modifiche a ${tab.name}?`)) return;

    tab.model.dispose();
    tabs = tabs.filter(t => t.id !== id);

    if(activeTabId === id) {
        activeTabId = tabs.length ? tabs[tabs.length-1].id : null;
        if(!activeTabId) newFile('html');
        else switchTab(activeTabId);
    } else {
        renderTabs();
    }
    saveSession();
}

function renderTabs() {
    const container = document.getElementById('tab-bar');
    container.innerHTML = '';
    
    tabs.forEach(tab => {
        const div = document.createElement('div');
        div.className = `tab-item ${tab.id === activeTabId ? 'active' : ''} ${tab.isModified ? 'modified' : ''}`;
        div.onclick = () => switchTab(tab.id);
        div.innerHTML = `
            <span class="tab-dot"></span>
            <span class="tab-name">${tab.name}</span>
            <button class="tab-close" onclick="closeTab('${tab.id}', event)">
                <i data-lucide="x"></i>
            </button>
        `;
        container.appendChild(div);
    });
    lucide.createIcons();
}

function getActiveTab() { return tabs.find(t => t.id === activeTabId); }

// --- FILE ACTIONS ---
function promptNewFile() {
    const content = `
        <div class="input-group">
            <select id="newFileType">
                <option value="html">HTML</option>
                <option value="css">CSS</option>
                <option value="javascript">JavaScript</option>
                <option value="markdown">Markdown</option>
                <option value="plaintext">Testo</option>
            </select>
        </div>`;
    
    showModal('Nuovo File', content, () => {
        const type = document.getElementById('newFileType').value;
        newFile(type);
    });
}

function newFile(type) {
    const extMap = { html: '.html', css: '.css', javascript: '.js', markdown: '.md', plaintext: '.txt' };
    const ext = extMap[type];
    const name = `Untitled-${untitledCounter++}${ext}`;
    let content = '';
    if(type === 'html') content = '<!DOCTYPE html>\n<html>\n<body>\n\t<h1>Hello</h1>\n</body>\n</html>';
    createTab(name, type, content);
}

async function saveFile() {
    const tab = getActiveTab();
    if(!tab) return;

    if('showSaveFilePicker' in window) {
        try {
            const handle = await window.showSaveFilePicker({
                suggestedName: tab.name,
                types: [{ description: 'Code File', accept: {'text/plain': ['.txt', '.html', '.css', '.js', '.md']} }]
            });
            const writable = await handle.createWritable();
            await writable.write(tab.model.getValue());
            await writable.close();
            
            tab.name = handle.name;
            tab.isModified = false;
            renderTabs();
            saveSession();
        } catch(e) { /* Cancelled */ }
    } else {
        // Fallback Modal
        const content = `
            <div class="input-group">
                <input type="text" id="dlName" value="${tab.name}">
            </div>`;
        showModal('Salva File', content, () => {
            const name = document.getElementById('dlName').value;
            tab.name = name;
            downloadContent(name, tab.model.getValue());
            tab.isModified = false;
            renderTabs();
        });
    }
}

function openFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = ev => {
            const lang = detectLang(file.name);
            createTab(file.name, lang, ev.target.result);
        };
        reader.readAsText(file);
    };
    input.click();
}

// --- UTILS & UI ---
function toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    body.setAttribute('data-theme', newTheme);
    monaco.editor.setTheme(newTheme === 'dark' ? 'ayu-dark-custom' : 'ayu-light-custom');
    localStorage.setItem('theme', newTheme);
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => console.error(err));
    } else {
        if (document.exitFullscreen) document.exitFullscreen();
    }
}

function updateStatus(pos) {
    document.getElementById('cursorStatus').textContent = `Ln ${pos.lineNumber}, Col ${pos.column}`;
}

function updateUI() {
    const tab = getActiveTab();
    if(tab) {
        document.getElementById('langStatus').textContent = tab.language.toUpperCase();
    }
}

function detectLang(name) {
    const ext = name.split('.').pop();
    if(ext === 'js') return 'javascript';
    if(ext === 'html') return 'html';
    if(ext === 'css') return 'css';
    if(ext === 'md') return 'markdown';
    return 'plaintext';
}

// --- STORAGE & SESSION ---
function saveSession() {
    const data = {
        active: activeTabId,
        counter: untitledCounter,
        tabs: tabs.map(t => ({
            id: t.id, name: t.name, lang: t.language, content: t.model.getValue(), mod: t.isModified
        }))
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function restoreSession() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if(!raw) return false;
    try {
        const data = JSON.parse(raw);
        untitledCounter = data.counter;
        data.tabs.forEach(t => {
            const tab = createTab(t.name, t.lang, t.content, t.id);
            tab.isModified = t.mod;
        });
        if(data.active) switchTab(data.active);
        return true;
    } catch(e) { return false; }
}

// --- MODAL HELPERS ---
let modalCallback = null;
function showModal(title, contentHtml, callback) {
    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalContent').innerHTML = contentHtml;
    document.getElementById('modalOverlay').classList.add('active');
    modalCallback = callback;
}
function closeModal() {
    document.getElementById('modalOverlay').classList.remove('active');
    modalCallback = null;
}
document.getElementById('modalConfirm').onclick = () => {
    if(modalCallback) modalCallback();
    closeModal();
}

// --- DRAG DROP ---
const dragOverlay = document.getElementById('dragOverlay');
window.addEventListener('dragover', e => { e.preventDefault(); dragOverlay.classList.add('active'); });
window.addEventListener('dragleave', e => { if(e.target === dragOverlay) dragOverlay.classList.remove('active'); });
window.addEventListener('drop', e => {
    e.preventDefault(); dragOverlay.classList.remove('active');
    if(e.dataTransfer.files.length) {
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();
        reader.onload = ev => createTab(file.name, detectLang(file.name), ev.target.result);
        reader.readAsText(file);
    }
});

// --- DOWNLOAD HELPER ---
function downloadContent(name, content) {
    const blob = new Blob([content], {type: 'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name; a.click();
    URL.revokeObjectURL(url);
}

// --- EVENT LISTENERS ---
window.addEventListener('keydown', e => {
    if((e.ctrlKey || e.metaKey) && e.key === 's') { e.preventDefault(); saveFile(); }
    if((e.ctrlKey || e.metaKey) && e.key === 'o') { e.preventDefault(); openFile(); }
    if((e.ctrlKey || e.metaKey) && e.key === 'n') { e.preventDefault(); promptNewFile(); }
    if(e.key === 'F11') { e.preventDefault(); toggleFullscreen(); }
});

window.addEventListener('resize', () => editor && editor.layout());