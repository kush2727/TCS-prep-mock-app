// ====================================================
// MISSION TCS DAILY MOCK — DAY 10 |  app.js
// Real compiler: Judge0 CE | Admin: localStorage
// ====================================================

// ===== JUDGE0 CONFIG =====
const JUDGE0_URL = 'https://ce.judge0.com/submissions';
const JUDGE0_HEADERS = { 'Content-Type': 'application/json' };
const LANG_IDS = { python: 71, java: 62, cpp: 54, c: 50 };
const ADMIN_PWD = 'Kush@178';
const STORAGE_KEY = 'tcs_mock_day10';      // score records (all students)
const SESSION_KEY = 'tcs_mock_session_day10';   // this student's live session

// ===== SESSION STATE =====
let studentName = '';
let currentSection = 'home';
let currentQuestion = 0;
let answeredQuestions = new Set();
let selectedOptions = {};      // { qIndex: 'A'|'B'|'C'|'D' }
let correctAnswers = new Set(); // tracks which questions answered correctly
let currentProblem = 0;
let currentSolLang = 'python';
let isRunning = false;
let isTestCompleted = false;
// codingVerdicts[problemId] = { verdict, time }
let codingVerdicts = {};

// ===== SESSION PERSISTENCE =====
function saveSession() {
    const session = {
        studentName,
        selectedOptions,
        answeredQuestions: [...answeredQuestions],
        correctAnswers: [...correctAnswers],
        codingVerdicts,
        currentQuestion,
        currentProblem,
        isTestCompleted
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

function loadSession() {
    try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (!raw) return false;
        const s = JSON.parse(raw);
        if (!s.studentName) return false;

        studentName = s.studentName;
        selectedOptions = s.selectedOptions || {};
        answeredQuestions = new Set(s.answeredQuestions || []);
        correctAnswers = new Set(s.correctAnswers || []);
        codingVerdicts = s.codingVerdicts || {};
        currentQuestion = s.currentQuestion || 0;
        currentProblem = s.currentProblem || 0;
        isTestCompleted = !!s.isTestCompleted;
        return true;
    } catch { return false; }
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
}

// ===== SECRET ADMIN ACCESS =====
let adminClickCount = 0, adminClickTimer = null;
function adminSecretClick() {
    adminClickCount++;
    clearTimeout(adminClickTimer);
    adminClickTimer = setTimeout(() => { adminClickCount = 0; }, 800);
    if (adminClickCount >= 5) { adminClickCount = 0; openAdminModal(); }
}

// ===== NAME MODAL =====
function applyStudentNameUI() {
    document.getElementById('heroStudentName').textContent = `👤 ${studentName}`;
    document.getElementById('topbarStudentName').textContent = `${studentName} — DAY 10`;
    const tag = document.getElementById('sidebarStudentName');
    tag.textContent = `👤 ${studentName}`;
    tag.style.display = 'block';
}

function startSession() {
    const input = document.getElementById('nameInput');
    const name = input.value.trim();
    if (!name) {
        document.getElementById('nameError').classList.remove('hidden');
        input.focus();
        return;
    }
    studentName = name;
    document.getElementById('nameOverlay').style.display = 'none';

    // Show name around the UI
    applyStudentNameUI();
    saveSession(); // persist student name
    init();
}

// Allow Enter key in name input
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nameInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') startSession();
    });
    document.getElementById('adminPwdInput')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkAdminPassword();
    });

    // Restore session if it exists
    if (loadSession()) {
        document.getElementById('nameOverlay').style.display = 'none';
        applyStudentNameUI();
        init(); // will restore question & problem indices and check for completion
    }
});

// ===== ADMIN PASSWORD =====
function openAdminModal() {
    closeSidebar();
    const overlay = document.getElementById('adminOverlay');
    overlay.style.display = 'flex';
    document.getElementById('adminPwdInput').value = '';
    document.getElementById('adminPwdError').classList.add('hidden');
    setTimeout(() => document.getElementById('adminPwdInput').focus(), 100);
}
function closeAdminModal() {
    document.getElementById('adminOverlay').style.display = 'none';
}
function checkAdminPassword() {
    const pwd = document.getElementById('adminPwdInput').value;
    if (pwd === ADMIN_PWD) {
        closeAdminModal();
        navigateTo('admin');
    } else {
        document.getElementById('adminPwdError').classList.remove('hidden');
        document.getElementById('adminPwdInput').select();
    }
}

// ===== SCORE TRACKING =====
function getAptitudeScore() {
    return correctAnswers.size;
}

function getCodingScore() {
    return codingProblems.filter(p => codingVerdicts[p.id]?.verdict === 'Accepted').length;
}

function getTotalScore() {
    return getAptitudeScore() + getCodingScore();
}

function updateLiveScoreDisplay() {
    const aptScore = getAptitudeScore();
    const codScore = getCodingScore();
    const totalScore = getTotalScore();
    const TOTAL = aptitudeQuestions.length + codingProblems.length; // 27

    // Aptitude card
    document.getElementById('aptScoreLive').textContent = aptScore;
    // Aptitude section header
    document.getElementById('aptLiveScore').textContent = aptScore;

    // Coding card — show per-problem verdict + coding score
    const verdictEl = document.getElementById('codingVerdictLive');
    const ids = Object.keys(codingVerdicts);
    if (ids.length === 0) {
        verdictEl.textContent = 'Not attempted';
    } else {
        verdictEl.textContent = ids.map(id => {
            return `P${id}: ${codingVerdicts[id].verdict}`;
        }).join('  ·  ') + `  (${codScore}/2 Accepted)`;
    }

    // Update home card score rows
    document.getElementById('aptScoreLive').textContent = aptScore;
    const totalEl = document.getElementById('totalScoreLive');
    if (totalEl) totalEl.textContent = `${totalScore} / ${TOTAL}`;
}

function saveScore() {
    if (isTestCompleted) {
        showToast('⚠️ You have already submitted your exam! You can only review now.');
        return;
    }
    if (!studentName) {
        showToast('⚠️ Please enter your name first!');
        return;
    }

    const aptScore = getAptitudeScore();
    const codScore = getCodingScore();
    const total = getTotalScore(); // out of 27

    const record = {
        name: studentName,
        submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        aptitudeScore: aptScore,
        aptitudeTotal: aptitudeQuestions.length,
        codingScore: codScore,
        totalScore: total,
        grandTotal: aptitudeQuestions.length + codingProblems.length,
        coding: codingProblems.map(p => ({
            id: p.id,
            title: p.title,
            verdict: codingVerdicts[p.id]?.verdict || 'Not Attempted',
            time: codingVerdicts[p.id]?.time || '—'
        }))
    };

    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const idx = existing.findIndex(r => r.name === studentName);
    if (idx >= 0) existing[idx] = record;
    else existing.push(record);

    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    showToast(`✅ Score saved! ${studentName}: ${total}/27 — Downloading your result...`);

    // Instant feedback: Show celebration card
    openDayComplete();

    // Trigger download without delay
    downloadResult();

    // Show the standalone download button in topbar
    const dlBtn = document.getElementById('btnDownloadResult');
    if (dlBtn) dlBtn.style.display = 'inline-flex';
}

function openDayComplete() {
    const apt = getAptitudeScore();
    const cod = getCodingScore();
    const total = getTotalScore();

    document.getElementById('dayCompleteName').textContent = `Excellent Work, ${studentName}!`;
    document.getElementById('dayCompleteScore').innerHTML = `
    <div class="dc-score-pill">Aptitude: <span>${apt}/25</span></div>
    <div class="dc-score-pill">Coding: <span>${cod}/2</span></div>
    <div class="dc-score-pill">Total: <span>${total}/27</span></div>
  `;

    document.getElementById('dayCompleteOverlay').classList.add('open');
    document.getElementById('dayCompleteModal').classList.add('open');
}

// ===== RESULT DOWNLOAD & COMPLETION =====
function downloadResult() {
    if (!studentName) { showToast('⚠️ Please enter your name first!'); return; }

    // Set completion flag
    isTestCompleted = true;
    saveSession();

    // Show completion celebration IMMEDIATELY on the main tab
    openDayComplete();

    // Switch to completed view (behind the modal)
    navigateTo('completed');

    // Force home UI to update (Round 20)
    renderHomeGrids();

    const apt = getAptitudeScore();
    const cod = getCodingScore();
    const total = getTotalScore();
    const now = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    const labels = ['A', 'B', 'C', 'D'];

    // Build question rows
    const qRows = aptitudeQuestions.map((q, i) => {
        const selected = selectedOptions[i];
        const isCorrect = selected === q.answer;
        const isAnswered = selected !== undefined;
        const optionsHtml = q.options.map((opt, j) => {
            const l = labels[j];
            let style = 'background:#f8fafc;border:1.5px solid #e2e8f0;';
            if (l === q.answer && isAnswered) style = 'background:#ecfdf5;border:1.5px solid #10b981;font-weight:700;';
            if (l === selected && !isCorrect) style = 'background:#fef2f2;border:1.5px solid #ef4444;font-weight:700;';
            return `<div style="${style}border-radius:8px;padding:0.5rem 0.9rem;font-size:0.85rem;margin-bottom:0.4rem;">
              <span style="display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:5px;background:${l === q.answer && isAnswered ? '#10b981' : l === selected && !isCorrect ? '#ef4444' : '#6366f1'};color:#fff;font-weight:700;font-size:0.75rem;margin-right:8px;">${l}</span>
              ${opt}
              ${l === selected ? (isCorrect ? ' <span style="color:#10b981;margin-left:6px;">✅ Your Answer</span>' : ' <span style="color:#ef4444;margin-left:6px;">❌ Your Answer</span>') : ''}
              ${l === q.answer && l !== selected ? ' <span style="color:#10b981;margin-left:6px;">✓ Correct</span>' : ''}
            </div>`;
        }).join('');

        const statusBg = !isAnswered ? '#f1f5f9' : isCorrect ? '#ecfdf5' : '#fef2f2';
        const statusColor = !isAnswered ? '#64748b' : isCorrect ? '#065f46' : '#991b1b';
        const statusText = !isAnswered ? 'Not Attempted' : isCorrect ? '✅ Correct' : '❌ Wrong';

        return `
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:1rem;page-break-inside:avoid;">
          <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.75rem;flex-wrap:wrap;gap:0.5rem;">
            <div style="display:flex;gap:0.5rem;align-items:center;">
              <span style="background:#6366f1;color:#fff;border-radius:6px;padding:0.2rem 0.6rem;font-size:0.75rem;font-weight:700;">Q${q.id}</span>
              <span style="background:#f1f5f9;color:#64748b;border-radius:6px;padding:0.2rem 0.6rem;font-size:0.75rem;font-weight:600;">${q.category}</span>
            </div>
            <span style="background:${statusBg};color:${statusColor};border-radius:6px;padding:0.25rem 0.75rem;font-size:0.78rem;font-weight:700;">${statusText}</span>
          </div>
          <div style="font-size:0.92rem;font-weight:600;color:#0f172a;margin-bottom:1rem;white-space:pre-wrap;">${q.question}</div>
          <div style="margin-bottom:0.75rem;">${optionsHtml}</div>
          <div style="background:#faf5ff;border:1px solid #ddd6fe;border-radius:8px;padding:0.75rem 1rem;font-size:0.83rem;color:#3b0764;">
            <strong>💡 Explanation:</strong> ${q.explanation}
          </div>
        </div>`;
    }).join('');

    // Coding section — always include solution even if not attempted
    const codingHtml = codingProblems.map((p) => {
        const v = codingVerdicts[p.id];
        const verdict = v?.verdict || 'Not Attempted';
        const vColor = verdict === 'Accepted' ? '#065f46' : verdict === 'Not Attempted' ? '#64748b' : '#991b1b';
        const vBg = verdict === 'Accepted' ? '#ecfdf5' : verdict === 'Not Attempted' ? '#f1f5f9' : '#fef2f2';

        // Solution block (always shown)
        const sol = p.solution;
        const solHtml = sol ? `
          <div style="margin-top:1rem;background:#f8fafc;border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
            <div style="padding:0.75rem 1rem;background:#1e1e2e;color:#cdd6f4;font-size:0.78rem;font-weight:700;letter-spacing:0.04em;display:flex;justify-content:space-between;align-items:center;">
              <span>💡 SOLUTION (Python)</span>
              <div style="display:flex;gap:0.5rem;">
                <span style="background:#2a2e3a;border-radius:4px;padding:0.15rem 0.5rem;font-size:0.72rem;">⏱ ${sol.timeComplexity}</span>
                <span style="background:#2a2e3a;border-radius:4px;padding:0.15rem 0.5rem;font-size:0.72rem;">📦 ${sol.spaceComplexity}</span>
              </div>
            </div>
            <div style="padding:0.65rem 1rem;background:#1e1e2e;font-family:'JetBrains Mono',monospace;font-size:0.8rem;color:#cdd6f4;line-height:1.6;white-space:pre-wrap;word-break:break-word;">${escapeForHtml(sol.code?.python || sol.code?.cpp || '')}</div>
          </div>
          <div style="margin-top:0.65rem;background:#faf5ff;border:1px solid #ddd6fe;border-radius:8px;padding:0.65rem 1rem;font-size:0.83rem;color:#3b0764;">
            <strong>🧠 Approach:</strong> ${sol.approach}
          </div>` : '';

        return `
        <div style="background:#fff;border:1px solid #e2e8f0;border-radius:12px;padding:1.25rem 1.5rem;margin-bottom:1rem;page-break-inside:avoid;">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:0.6rem;">
            <div style="display:flex;gap:0.5rem;align-items:center;">
              <span style="background:#f59e0b;color:#fff;border-radius:6px;padding:0.2rem 0.6rem;font-size:0.75rem;font-weight:700;">P${p.id}</span>
              <span style="font-weight:700;font-size:0.95rem;color:#0f172a;">${p.title}</span>
            </div>
            <span style="background:${vBg};color:${vColor};border-radius:6px;padding:0.3rem 0.9rem;font-size:0.82rem;font-weight:700;">${verdict}${v?.time && v.time !== '—' ? '  ·  ' + v.time : ''}</span>
          </div>
          <div style="font-size:0.83rem;color:#64748b;">${p.description.substring(0, 150)}…</div>
          ${solHtml}
        </div>`;
    }).join('');

    // Build completion HTML String (The "Blueprint")
    const reportHtmlString = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        * { box-sizing: border-box; -webkit-print-color-adjust: exact; }
        body { margin: 0; padding: 0; background: #fff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .page { width: 595pt; min-height: 842pt; padding: 30pt; margin: 0 auto; background: #fff; color: #0f172a; }
        .header { background: #4f46e5; border-radius: 12pt; padding: 25pt; color: #ffffff; margin-bottom: 20pt; text-align: center; }
        .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 5pt 15pt; border-radius: 20pt; font-size: 14pt; font-weight: 600; margin: 10pt 0; }
        .card { background: #fff; border: 1pt solid #e2e8f0; border-radius: 12pt; padding: 15pt; margin-bottom: 10pt; display: flex; align-items: center; justify-content: space-between; }
        .card-total { background: linear-gradient(135deg, #4f46e5, #6366f1); color: #fff; border: none; padding: 20pt; }
        .section-title { font-size: 14pt; font-weight: 800; margin: 25pt 0 12pt; color: #4f46e5; text-transform: uppercase; border-bottom: 2pt solid #e2e8f0; padding-bottom: 5pt; }
        .q-card { background: #fff; border: 1pt solid #e2e8f0; border-radius: 12pt; padding: 15pt; margin-bottom: 10pt; page-break-inside: avoid; }
      </style>
    </head>
    <body>
      <div class="page">
        <div class="header">
          <div style="font-size: 10pt; font-weight: 700; opacity: 0.9; text-transform: uppercase; letter-spacing: 1pt;">TCS DAILY MOCK</div>
          <div style="font-size: 22pt; font-weight: 800; margin: 5pt 0;">Day 10 — Result</div>
          <div class="badge">👤 ${studentName}</div>
          <div style="font-size: 10pt; opacity: 0.8; margin-top: 5pt;">${now}</div>
        </div>

        <div class="card">
          <span style="font-size: 11pt; color: #64748b; font-weight: 700;">APTITUDE SCORE</span>
          <span style="font-size: 22pt; font-weight: 800; color: #4f46e5;">${apt}<span style="font-size: 14pt; color: #94a3b8; font-weight: 400;">/25</span></span>
        </div>
        <div class="card">
          <span style="font-size: 11pt; color: #64748b; font-weight: 700;">CODING SOLVED</span>
          <span style="font-size: 22pt; font-weight: 800; color: #f59e0b;">${cod}<span style="font-size: 14pt; color: #94a3b8; font-weight: 400;">/2</span></span>
        </div>
        <div class="card card-total">
          <span style="font-size: 11pt; font-weight: 700;">TOTAL PERFORMANCE</span>
          <span style="font-size: 24pt; font-weight: 800;">${total}<span style="font-size: 14pt; opacity: 0.8; font-weight: 400;">/27</span></span>
        </div>

        <div class="section-title">Aptitude Review (${apt}/25)</div>
        ${qRows}

        <div class="section-title" style="color: #f59e0b; border-color: #fef3c7;">Coding Submission (${cod}/2)</div>
        ${codingHtml}

        <div style="text-align: center; margin-top: 30pt; font-size: 10pt; color: #94a3b8; border-top: 1pt solid #e2e8f0; padding-top: 20pt;">
          Mock App Experience · Day 10 · Generated on ${now}
        </div>
      </div>
    </body>
    </html>`;

    // Detect if mobile device
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Engine Configs
    const opt = {
        margin: 0,
        filename: `TCS_Mock_Day10_Result_${studentName.replace(/\s+/g, '_')}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: {
            scale: isMobile ? 1.2 : 1.5, // Mobile use lower scale for memory safety
            useCORS: true,
            letterRendering: true,
            logging: false,
            backgroundColor: '#ffffff'
        },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
        pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
    };

    showToast(`🚀 ${isMobile ? 'Safe-Inject Mobile (v10.4)' : 'Laptop'} Engine starting...`);

    if (isMobile) {
        // MOBILE ENGINE: Safe-Injection (Round 15)
        // Only inject the CORE content to avoid confusing mobile browsers with nested <html>/<body> tags
        const printContainer = document.getElementById('printSection');
        if (!printContainer) {
            console.error('Print container missing');
            isMobile = false;
        } else {
            // Stripping full doc structure for safe mobile injection
            const cleanContent = `
            <style>
                .page { width: 100%; min-height: 100vh; padding: 25px; background: #fff; color: #0f172a; font-family: sans-serif; }
                .header { background: #4f46e5; border-radius: 12px; padding: 20px; color: #ffffff; margin-bottom: 20px; text-align: center; }
                .badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 5px 15px; border-radius: 20px; font-size: 14px; font-weight: 600; margin-top: 5px; }
                .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px; margin-bottom: 10px; display: flex; align-items: center; justify-content: space-between; }
                .card-total { background: linear-gradient(135deg, #4f46e5, #6366f1); color: #fff; border: none; padding: 20px; }
                .section-title { font-size: 14px; font-weight: 800; margin: 25px 0 12px; color: #4f46e5; text-transform: uppercase; border-bottom: 2px solid #e2e8f0; padding-bottom: 5px; }
            </style>
            <div class="page">
                <div class="header">
                  <div style="font-size: 10px; font-weight: 700; opacity: 0.9; text-transform: uppercase; letter-spacing: 1px;">TCS DAILY MOCK (v10.4)</div>
                  <div style="font-size: 20px; font-weight: 800; margin: 4px 0;">Day 10 — Result</div>
                  <div class="badge">👤 ${studentName}</div>
                </div>
                
                <div class="card">
                  <span style="font-size: 11px; color: #64748b; font-weight: 700;">APTITUDE SCORE</span>
                  <span style="font-size: 22px; font-weight: 800; color: #4f46e5;">${apt}<span style="font-size: 14px; color: #94a3b8; font-weight: 400;">/25</span></span>
                </div>
                <div class="card">
                  <span style="font-size: 11px; color: #64748b; font-weight: 700;">CODING SOLVED</span>
                  <span style="font-size: 22px; font-weight: 800; color: #f59e0b;">${cod}<span style="font-size: 14px; color: #94a3b8; font-weight: 400;">/2</span></span>
                </div>
                <div class="card card-total">
                  <span style="font-size: 11px; font-weight: 700;">TOTAL PERFORMANCE</span>
                  <span style="font-size: 24px; font-weight: 800;">${total}<span style="font-size: 14px; opacity: 0.8; font-weight: 400;">/27</span></span>
                </div>

                <div class="section-title">Aptitude Review (${apt}/25)</div>
                ${qRows}

                <div class="section-title" style="color: #f59e0b; border-color: #fef3c7;">Coding Submission (${cod}/2)</div>
                ${codingHtml}
            </div>`;

            printContainer.innerHTML = cleanContent;
            printContainer.style.display = 'block';

            showToast('📱 Preparing Print View... Wait 3.5s (v10.4)');

            setTimeout(() => {
                window.print();
                printContainer.style.display = 'none';
                printContainer.innerHTML = '';
            }, 3500); // 3.5-second buffer for mobile engines
            return;
        }
    }

    // LAPTOP ENGINE (or Fallback): Use Isolated String (Reported as perfect)
    setTimeout(() => {
        html2pdf().set(opt).from(reportHtmlString).save().then(() => {
            showToast('✅ Laptop PDF Downloaded!');
        }).catch(err => {
            console.error('PDF Error:', err);
            showToast('❌ Generation failed.');
        });
    }, 2000);
}



function closeDayComplete() {
    document.getElementById('dayCompleteOverlay').classList.remove('open');
    document.getElementById('dayCompleteModal').classList.remove('open');
}

// ===== NAVIGATION =====

function navigateTo(section) {
    // Allow access to Aptitude/Coding even if test is completed (for review)

    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));

    document.getElementById(`section-${section}`).classList.add('active');
    const navBtn = document.querySelector(`[data-section="${section}"]`);
    if (navBtn) navBtn.classList.add('active');
    currentSection = section;
    closeSidebar();

    if (section === 'aptitude') { renderQuestion(currentQuestion); renderAptQuestionGrid(); }
    else if (section === 'coding') { renderProblem(currentProblem); }
    else if (section === 'home') { renderHomeGrids(); updateLiveScoreDisplay(); }
    else if (section === 'admin') { loadAdminPanel(); }
}

// ===== SIDEBAR =====
function openSidebar() {
    document.getElementById('sidebar').classList.add('open');
    document.getElementById('overlay').classList.add('active');
}
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('active');
}
document.getElementById('sidebarClose')?.addEventListener('click', closeSidebar);

// ===== HOME GRIDS =====
function renderHomeGrids() {
    const g = document.getElementById('homeQGrid');
    if (!g) return;
    g.innerHTML = '';
    aptitudeQuestions.forEach((q, i) => {
        const btn = document.createElement('button');
        btn.className = 'q-num';
        btn.textContent = i + 1;
        if (answeredQuestions.has(i)) btn.classList.add('answered');
        btn.addEventListener('click', () => { currentQuestion = i; navigateTo('aptitude'); });
        g.appendChild(btn);
    });

    const pg = document.getElementById('codingPreviewGrid');
    if (!pg) return;
    pg.innerHTML = '';
    codingProblems.forEach((p, i) => {
        const card = document.createElement('div');
        card.className = 'coding-preview-card';
        const v = codingVerdicts[p.id];
        const badge = v ? `<span class="vbadge ${verdictClass(v.verdict)}">${v.verdict}</span>` : '';
        card.innerHTML = `
      <div class="preview-prob-num">PROBLEM ${i + 1} ${badge}</div>
      <div class="preview-prob-title">${p.title}</div>
      <div class="preview-prob-desc">${p.description.substring(0, 90)}…</div>
    `;
        card.addEventListener('click', () => { currentProblem = i; navigateTo('coding'); });
        pg.appendChild(card);
    });

    codingProblems.forEach((p, i) => {
        const el = document.getElementById(`probName${i}`);
        if (el) el.textContent = p.title;
    });

    // Dashboard Result Buttons (Round 19 & 20)
    const aptRes = document.getElementById('homeViewAptResult');
    const codRes = document.getElementById('homeViewCodResult');
    const aptStart = document.getElementById('homeStartAptBtn');
    const codStart = document.getElementById('homeStartCodBtn');

    if (aptRes) aptRes.classList.toggle('hidden', !isTestCompleted);
    if (codRes) codRes.classList.toggle('hidden', !isTestCompleted);

    if (isTestCompleted) {
        if (aptStart) aptStart.textContent = 'Review Aptitude →';
        if (codStart) codStart.textContent = 'Review Coding →';
    } else {
        if (aptStart) aptStart.textContent = 'Start Aptitude →';
        if (codStart) codStart.textContent = 'Start Coding →';
    }
}

function verdictClass(v) {
    if (!v) return 'vbadge-none';
    const lower = v.toLowerCase();
    if (lower.includes('accepted')) return 'vbadge-accepted';
    if (lower.includes('wrong')) return 'vbadge-wrong';
    if (lower.includes('compile')) return 'vbadge-compile';
    if (lower.includes('time')) return 'vbadge-tle';
    if (lower.includes('runtime')) return 'vbadge-runtime';
    return 'vbadge-none';
}

// ===== APTITUDE =====
function renderQuestion(index) {
    const q = aptitudeQuestions[index];
    if (!q) return;

    document.getElementById('currentQNum').textContent = index + 1;
    document.getElementById('qNumBadge').textContent = `Q${q.id}`;
    document.getElementById('qCatBadge').textContent = q.category;
    document.getElementById('qText').innerHTML = q.question;
    document.getElementById('answerBox').classList.add('hidden');
    document.getElementById('explanationBox').classList.add('hidden');

    const og = document.getElementById('optionsGrid');
    og.innerHTML = '';
    const labels = ['A', 'B', 'C', 'D'];

    const isAnswered = selectedOptions[index] !== undefined;
    const isWrong = isAnswered && selectedOptions[index] !== q.answer;

    q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        if (isTestCompleted) btn.classList.add('reviewer-mode');
        const label = labels[i];
        if (isAnswered) {
            if (selectedOptions[index] === label) btn.classList.add(label === q.answer ? 'correct' : 'wrong');
            if (label === q.answer && selectedOptions[index] !== label) btn.classList.add('correct');
        }
        btn.innerHTML = `<span class="opt-label">${label}</span> ${opt}`;

        // Disable click if completed
        if (!isTestCompleted) {
            btn.addEventListener('click', () => selectOption(index, label, q.answer));
        } else {
            btn.style.cursor = 'default';
            btn.title = 'Test submitted (Read-only)';
        }
        og.appendChild(btn);
    });

    // Auto-show answer if wrong OR if in review mode (Round 23)
    if (isWrong || isTestCompleted) {
        const correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.answer);
        document.getElementById('answerVal').textContent = `Option ${q.answer}: ${q.options[correctIdx]}`;
        document.getElementById('expText').innerHTML = q.explanation;
        document.getElementById('answerBox').classList.remove('hidden');
        document.getElementById('explanationBox').classList.remove('hidden');
    }

    // Disable peek buttons if not answered (unless completed, then allow review)
    const showAnsBtn = document.getElementById('showAnsBtn');
    const showExpBtn = document.getElementById('showExpBtn');
    if (showAnsBtn) {
        const canReview = isAnswered || isTestCompleted;
        showAnsBtn.disabled = !canReview;
        showAnsBtn.classList.toggle('btn-disabled', !canReview);
    }
    if (showExpBtn) {
        const canReview = isAnswered || isTestCompleted;
        showExpBtn.disabled = !canReview;
        showExpBtn.classList.toggle('btn-disabled', !canReview);
    }

    renderAptQuestionGrid();
    renderHomeGrids();
    updateLiveScoreDisplay();

    document.getElementById('prevBtn').disabled = index === 0;
    document.getElementById('nextBtn').disabled = index === aptitudeQuestions.length - 1;
    document.getElementById('prevBtn').style.opacity = index === 0 ? '0.4' : '1';
    document.getElementById('nextBtn').style.opacity = index === aptitudeQuestions.length - 1 ? '0.4' : '1';
}

function selectOption(qIndex, selected, correct) {
    selectedOptions[qIndex] = selected;
    answeredQuestions.add(qIndex);
    if (selected === correct) correctAnswers.add(qIndex);
    else correctAnswers.delete(qIndex);
    saveSession(); // persist progress
    renderQuestion(qIndex);
    updateLiveScoreDisplay();
}

function nextQuestion() {
    if (currentQuestion < aptitudeQuestions.length - 1) { currentQuestion++; renderQuestion(currentQuestion); }
}
function prevQuestion() {
    if (currentQuestion > 0) { currentQuestion--; renderQuestion(currentQuestion); }
}
function toggleAnswer() {
    if (!isTestCompleted && selectedOptions[currentQuestion] === undefined) {
        showToast('⚠️ Please select an option first!');
        return;
    }
    const box = document.getElementById('answerBox');
    const q = aptitudeQuestions[currentQuestion];
    const correctIdx = ['A', 'B', 'C', 'D'].indexOf(q.answer);
    document.getElementById('answerVal').textContent = `Option ${q.answer}: ${q.options[correctIdx]}`;
    box.classList.toggle('hidden');
}
function toggleExplanation() {
    if (!isTestCompleted && selectedOptions[currentQuestion] === undefined) {
        showToast('⚠️ Please select an option first!');
        return;
    }
    const box = document.getElementById('explanationBox');
    document.getElementById('expText').textContent = aptitudeQuestions[currentQuestion].explanation;
    box.classList.toggle('hidden');
}
function renderAptQuestionGrid() {
    const grid = document.getElementById('aptQGrid');
    if (!grid) return;
    grid.innerHTML = '';
    aptitudeQuestions.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'q-num';
        btn.textContent = i + 1;
        if (i === currentQuestion) btn.classList.add('current');
        else if (answeredQuestions.has(i)) btn.classList.add('answered');
        btn.addEventListener('click', () => { currentQuestion = i; renderQuestion(i); });
        grid.appendChild(btn);
    });
}

// ===== CODING SECTION =====
function renderProblem(index) {
    const p = codingProblems[index];
    if (!p) return;
    currentProblem = index;

    codingProblems.forEach((prob, i) => {
        document.getElementById(`problemBtn${i}`)?.classList.toggle('active', i === index);
        const el = document.getElementById(`probName${i}`);
        if (el) el.textContent = prob.title;
    });

    document.getElementById('probBadge').textContent = `P${p.id}`;
    document.getElementById('probTitle').textContent = p.title;
    document.getElementById('probDesc').textContent = p.description;
    document.getElementById('probInput').textContent = p.inputFormat;
    document.getElementById('probOutput').textContent = p.outputFormat;

    const ul = document.getElementById('probConstraints');
    ul.innerHTML = '';
    p.constraints.forEach(c => { const li = document.createElement('li'); li.textContent = c; ul.appendChild(li); });

    document.getElementById('probExInput').textContent = p.exampleInput;
    document.getElementById('probExOutput').textContent = p.exampleOutput;
    document.getElementById('probExplanation').textContent = p.explanation;
    document.getElementById('tcInput').textContent = p.exampleInput;
    document.getElementById('tcExpected').textContent = p.exampleOutput;
    document.getElementById('tcUserOutput').textContent = '—';
    document.getElementById('customInput').value = p.exampleInput;

    clearVerdicts();

    const lang = document.getElementById('langSelect').value;
    document.getElementById('codeEditor').value = codes[index] || p.template || '';
    document.getElementById('codeEditor').readOnly = isTestCompleted;
    if (isTestCompleted) {
        document.getElementById('codeEditor').style.opacity = '0.85';
        document.getElementById('codeEditor').style.background = '#f8fafc';
    } else {
        document.getElementById('codeEditor').style.opacity = '1';
        document.getElementById('codeEditor').style.background = '#0f172a'; // Restore dark theme
    }

    // Disable run buttons if completed
    const runBtn = document.getElementById('btnRunCode');
    const testBtn = document.getElementById('btnRunTest');
    const resetBtn = document.querySelector('.btn-reset');

    if (runBtn) {
        runBtn.disabled = isTestCompleted;
        runBtn.classList.toggle('btn-disabled', isTestCompleted);
    }
    if (testBtn) {
        testBtn.disabled = isTestCompleted;
        testBtn.classList.toggle('btn-disabled', isTestCompleted);
    }
    if (resetBtn) {
        resetBtn.disabled = isTestCompleted;
        resetBtn.classList.toggle('btn-disabled', isTestCompleted);
    }

    renderCodingProblemsSidebar();
}

function selectProblem(index) { renderProblem(index); }

function changeLang() {
    const lang = document.getElementById('langSelect').value;
    document.getElementById('codeEditor').value = codingProblems[currentProblem].starterCode[lang] || '';
    clearVerdicts();
}

function resetCode() {
    changeLang();
    clearVerdicts();
    document.getElementById('customInput').value = codingProblems[currentProblem].exampleInput;
}

function clearVerdicts() {
    document.getElementById('outputArea').textContent = 'Run your code to see output here.';
    document.getElementById('outputStatusBar').textContent = '';
    document.getElementById('outputStatusBar').className = 'output-status-bar';
    document.getElementById('tcVerdictBar').textContent = '';
    document.getElementById('tcVerdictBar').className = 'tc-verdict-bar';
    document.getElementById('tcUserOutput').textContent = '—';
}

// ===== I/O TABS =====
function switchIOTab(tab) {
    document.querySelectorAll('.io-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.io-pane').forEach(p => p.classList.remove('active'));
    const map = { input: ['tabCustomInput', 'paneInput'], output: ['tabOutput', 'paneOutput'], testcase: ['tabTestcase', 'paneTestcase'] };
    const [tabId, paneId] = map[tab];
    document.getElementById(tabId).classList.add('active');
    document.getElementById(paneId).classList.add('active');
}

// ===== JUDGE0 API =====
async function callJudge0(code, lang, stdin = '') {
    const body = { source_code: code, language_id: LANG_IDS[lang], stdin, cpu_time_limit: 5, memory_limit: 256000 };

    const submitResp = await fetch(`${JUDGE0_URL}?base64_encoded=false`, {
        method: 'POST', headers: JUDGE0_HEADERS, body: JSON.stringify(body)
    });
    if (!submitResp.ok) {
        const text = await submitResp.text();
        throw new Error(`Submission failed (${submitResp.status}): ${text.substring(0, 200)}`);
    }
    const { token } = await submitResp.json();
    if (!token) throw new Error('No token returned from Judge0.');

    for (let i = 0; i < 15; i++) {
        await new Promise(r => setTimeout(r, 1000));
        const pollResp = await fetch(`${JUDGE0_URL}/${token}?base64_encoded=false&fields=stdout,stderr,compile_output,status,time,memory`, {
            headers: JUDGE0_HEADERS
        });
        if (!pollResp.ok) continue;
        const result = await pollResp.json();
        const sid = result.status?.id;
        if (sid !== 1 && sid !== 2) return result;
    }
    throw new Error('Execution timed out after 15 seconds. Please try again.');
}

function setButtonsLoading(loading) {
    const runBtn = document.getElementById('btnRunCode');
    const testBtn = document.getElementById('btnRunTest');
    isRunning = loading;
    runBtn.disabled = loading; testBtn.disabled = loading;
    if (loading) {
        runBtn.classList.add('spinning'); testBtn.classList.add('spinning');
        runBtn.textContent = ' Compiling...'; testBtn.textContent = ' Running...';
    } else {
        runBtn.classList.remove('spinning'); testBtn.classList.remove('spinning');
        runBtn.textContent = '▶ Run Code'; testBtn.textContent = '⚡ Run Test Case';
    }
}

function validateCode() {
    const code = document.getElementById('codeEditor').value.trim();
    const lang = document.getElementById('langSelect').value;
    const starter = (codingProblems[currentProblem].starterCode[lang] || '').trim();
    if (!code) { showToast('⚠️ Write some code first!'); return false; }
    if (code === starter) { showToast('⚠️ Modify the starter code before running!'); return false; }
    return true;
}

// ===== RUN CODE =====
async function runCode() {
    if (isRunning || !validateCode()) return;
    const code = document.getElementById('codeEditor').value;
    const lang = document.getElementById('langSelect').value;
    const stdin = document.getElementById('customInput').value;

    switchIOTab('output');
    setButtonsLoading(true);

    const bar = document.getElementById('outputStatusBar');
    const area = document.getElementById('outputArea');
    bar.className = 'output-status-bar warn'; bar.textContent = '⏳ Compiling and running...'; area.textContent = '';

    try {
        const result = await callJudge0(code, lang, stdin);
        displayRunResult(result);
    } catch (err) {
        bar.className = 'output-status-bar error'; bar.textContent = '🔴 Request Failed';
        area.textContent = err.message || 'Network error.';
    } finally { setButtonsLoading(false); }
}

function displayRunResult(result) {
    const bar = document.getElementById('outputStatusBar');
    const area = document.getElementById('outputArea');
    const status = result.status?.description || 'Unknown';
    const stdout = result.stdout || '';
    const stderr = result.stderr || '';
    const compile_output = result.compile_output || '';
    const time = result.time ? `${result.time}s` : '';
    const memory = result.memory ? `${(result.memory / 1024).toFixed(1)} MB` : '';

    if (compile_output) {
        bar.className = 'output-status-bar error'; bar.textContent = '🔴 Compilation Error';
        area.textContent = compile_output;
    } else if (stderr || status.includes('Runtime')) {
        bar.className = 'output-status-bar error'; bar.textContent = `🔴 Runtime Error — ${status}`;
        area.textContent = stderr || status;
    } else if (status.includes('Time Limit')) {
        bar.className = 'output-status-bar warn'; bar.textContent = '⏱ Time Limit Exceeded';
        area.textContent = 'Your code exceeded the time limit.';
    } else {
        bar.className = 'output-status-bar ok'; bar.textContent = `✅ Executed — Time: ${time}  Memory: ${memory}`;
        area.textContent = stdout || '(No output)';
    }
}

// ===== RUN TEST CASE =====
async function runTestCase() {
    if (isRunning || !validateCode()) return;
    const code = document.getElementById('codeEditor').value;
    const lang = document.getElementById('langSelect').value;
    const p = codingProblems[currentProblem];
    const stdin = p.exampleInput;
    const expected = p.exampleOutput.trim();

    switchIOTab('testcase');
    setButtonsLoading(true);

    const verdictBar = document.getElementById('tcVerdictBar');
    const userOut = document.getElementById('tcUserOutput');
    verdictBar.className = 'tc-verdict-bar verdict-running'; verdictBar.textContent = '⏳ Running test case...';
    userOut.textContent = '...';

    try {
        const result = await callJudge0(code, lang, stdin);
        displayTestCaseResult(result, expected);
    } catch (err) {
        verdictBar.className = 'tc-verdict-bar verdict-compile';
        verdictBar.textContent = '🔴 Request Failed — Check internet connection';
        userOut.textContent = err.message;
    } finally { setButtonsLoading(false); }
}

function displayTestCaseResult(result, expected) {
    const verdictBar = document.getElementById('tcVerdictBar');
    const userOut = document.getElementById('tcUserOutput');
    const status = result.status?.description || '';
    const stdout = (result.stdout || '').trim();
    const stderr = result.stderr || '';
    const compile_output = result.compile_output || '';
    const time = result.time ? `${result.time}s` : '';

    let verdict = 'Not Attempted';

    if (compile_output) {
        verdict = 'Compilation Error';
        verdictBar.className = 'tc-verdict-bar verdict-compile'; verdictBar.textContent = '🔴 Compilation Error';
        userOut.textContent = compile_output;
    } else if (stderr || status.includes('Runtime')) {
        verdict = 'Runtime Error';
        verdictBar.className = 'tc-verdict-bar verdict-compile'; verdictBar.textContent = `🔴 Runtime Error — ${status}`;
        userOut.textContent = stderr || status;
    } else if (status.includes('Time Limit')) {
        verdict = 'Time Limit Exceeded';
        verdictBar.className = 'tc-verdict-bar verdict-tle'; verdictBar.textContent = '⏱ Time Limit Exceeded';
        userOut.textContent = 'TLE';
    } else {
        userOut.textContent = stdout || '(No output)';
        if (stdout === expected) {
            verdict = 'Accepted';
            verdictBar.className = 'tc-verdict-bar verdict-accepted'; verdictBar.textContent = `✅ Accepted  ·  Time: ${time}`;
        } else {
            verdict = 'Wrong Answer';
            verdictBar.className = 'tc-verdict-bar verdict-wrong'; verdictBar.textContent = `❌ Wrong Answer  ·  Time: ${time}`;
        }
    }

    // Save verdict to session state
    codingVerdicts[codingProblems[currentProblem].id] = { verdict, time };
    saveSession(); // persist coding verdict
    updateLiveScoreDisplay();
}

// ===== ADMIN PANEL =====
function loadAdminPanel() {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const tbody = document.getElementById('adminTableBody');
    const empty = document.getElementById('adminEmpty');
    const statsRow = document.getElementById('adminStatsRow');
    tbody.innerHTML = '';

    // Stats
    const totalStudents = records.length;
    const avgApt = records.length
        ? (records.reduce((s, r) => s + r.aptitudeScore, 0) / records.length).toFixed(1)
        : '—';
    const acceptedAny = records.filter(r => r.coding.some(c => c.verdict === 'Accepted')).length;

    statsRow.innerHTML = `
    <div class="admin-stat-card"><div class="admin-stat-num">${totalStudents}</div><div class="admin-stat-label">Students</div></div>
    <div class="admin-stat-card"><div class="admin-stat-num">${avgApt}</div><div class="admin-stat-label">Avg Aptitude</div></div>
    <div class="admin-stat-card"><div class="admin-stat-num">${acceptedAny}</div><div class="admin-stat-label">Solved ≥1 Problem</div></div>
  `;

    if (records.length === 0) {
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';

    records.forEach((r, i) => {
        const codingAccepted = r.coding.filter(c => c.verdict === 'Accepted').length;
        // Use saved totalScore, or recalculate for old records
        const total = r.totalScore ?? (r.aptitudeScore + codingAccepted);
        const grandTotal = r.grandTotal ?? 27;

        const scoreColor = total >= 22 ? '#10b981' : total >= 14 ? '#f59e0b' : '#ef4444';

        const tr = document.createElement('tr');
        tr.innerHTML = `
      <td>${i + 1}</td>
      <td class="admin-td-name">${escapeHtml(r.name)}</td>
      <td class="admin-td-time">${r.submittedAt}</td>
      <td class="admin-td-score" style="color:var(--primary)">${r.aptitudeScore} / ${r.aptitudeTotal}</td>
      <td>${verdictBadge(r.coding[0]?.verdict)}</td>
      <td>${verdictBadge(r.coding[1]?.verdict)}</td>
      <td class="admin-td-pct" style="color:${scoreColor};font-size:1rem">${total} / ${grandTotal}</td>
    `;
        tbody.appendChild(tr);
    });
}

function verdictBadge(v) {
    if (!v) return `<span class="vbadge vbadge-none">—</span>`;
    return `<span class="vbadge ${verdictClass(v)}">${v}</span>`;
}

function escapeHtml(str) {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
// Same but for code blocks inside the PDF (preserves indentation)
function escapeForHtml(str) {
    return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}


function exportCSV() {
    const records = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (!records.length) { showToast('No records to export.'); return; }

    const headers = ['#', 'Name', 'Submitted At', 'Aptitude Score', 'Aptitude Total', 'P1 Verdict', 'P1 Time', 'P2 Verdict', 'P2 Time'];
    const rows = records.map((r, i) => [
        i + 1, r.name, r.submittedAt, r.aptitudeScore, r.aptitudeTotal,
        r.coding[0]?.verdict || '—', r.coding[0]?.time || '—',
        r.coding[1]?.verdict || '—', r.coding[1]?.time || '—'
    ]);

    const csv = [headers, ...rows].map(row => row.map(v => `"${v}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'TCS_Mock_Day9_Scores.csv'; a.click();
    URL.revokeObjectURL(url);
}

function clearAllScores() {
    if (!confirm('⚠️ Clear ALL student score records? This cannot be undone.')) return;
    localStorage.removeItem(STORAGE_KEY);
    loadAdminPanel();
    showToast('🗑 All scores cleared.');
}

// ===== TOAST =====
function showToast(msg) {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = msg;
    toast.style.cssText = `
    position:fixed;bottom:2rem;right:2rem;
    background:#1e293b;color:#fff;
    padding:0.75rem 1.5rem;border-radius:10px;font-size:0.85rem;
    font-weight:500;z-index:9999;box-shadow:0 8px 24px rgba(0,0,0,0.2);
    animation:slideInToast 0.3s ease;
  `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
}
const toastStyle = document.createElement('style');
toastStyle.textContent = `@keyframes slideInToast{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}`;
document.head.appendChild(toastStyle);

// ===== SOLUTION MODAL =====
function openSolution() {
    const p = codingProblems[currentProblem];
    if (!p?.solution) return;
    document.getElementById('solBadge').textContent = `P${p.id}`;
    document.getElementById('solTitle').textContent = `${p.title} — Solution`;
    document.getElementById('solApproach').textContent = p.solution.approach;
    const cr = document.getElementById('solComplexityRow');
    cr.innerHTML = `
    <div class="sol-badge sol-badge-time">⏱ Time: ${p.solution.timeComplexity}</div>
    <div class="sol-badge sol-badge-space">📦 Space: ${p.solution.spaceComplexity}</div>
  `;
    currentSolLang = document.getElementById('langSelect').value;
    updateSolCode(); updateSolTabs();
    document.getElementById('solOverlay').classList.add('open');
    document.getElementById('solModal').classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeSolution() {
    document.getElementById('solOverlay').classList.remove('open');
    document.getElementById('solModal').classList.remove('open');
    document.body.style.overflow = '';
}

function switchSolTab(lang) { currentSolLang = lang; updateSolTabs(); updateSolCode(); }

function updateSolTabs() {
    document.querySelectorAll('.sol-tab').forEach(tab => tab.classList.toggle('active', tab.dataset.lang === currentSolLang));
}

function updateSolCode() {
    const p = codingProblems[currentProblem];
    document.getElementById('solCode').textContent = p.solution.code[currentSolLang] || '// Not available.';
    const btn = document.getElementById('solCopyBtn');
    if (btn) btn.textContent = '📋 Copy Code';
}

function copySolution() {
    navigator.clipboard.writeText(document.getElementById('solCode').textContent)
        .then(() => { const b = document.getElementById('solCopyBtn'); b.textContent = '✅ Copied!'; setTimeout(() => b.textContent = '📋 Copy Code', 2000); })
        .catch(() => showToast('⚠️ Copy failed'));
}

// ===== CODE EDITOR SMART INDENTATION =====
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('codeEditor');
    if (!editor) return;
    editor.addEventListener('keydown', (e) => {
        const start = editor.selectionStart, end = editor.selectionEnd, val = editor.value;
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            editor.value = val.substring(0, start) + '    ' + val.substring(end);
            editor.selectionStart = editor.selectionEnd = start + 4;
        } else if (e.key === 'Tab' && e.shiftKey) {
            e.preventDefault();
            const lineStart = val.lastIndexOf('\n', start - 1) + 1;
            const spaces = val.substring(lineStart, start).match(/^ {1,4}/);
            if (spaces) { editor.value = val.substring(0, lineStart) + val.substring(lineStart + spaces[0].length); editor.selectionStart = editor.selectionEnd = start - spaces[0].length; }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const lineStart = val.lastIndexOf('\n', start - 1) + 1;
            const currentLine = val.substring(lineStart, start);
            const indent = currentLine.match(/^(\s*)/)[1];
            const extraIndent = /[:{(\[]\s*$/.test(currentLine.trimEnd()) ? '    ' : '';
            const insertion = '\n' + indent + extraIndent;
            editor.value = val.substring(0, start) + insertion + val.substring(end);
            editor.selectionStart = editor.selectionEnd = start + insertion.length;
        }
    });
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeSolution();

    // Secret admin shortcut: Ctrl+Shift+A (or Cmd+Shift+A on Mac)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdminModal();
        return;
    }

    if (currentSection !== 'aptitude') return;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); nextQuestion(); }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') { e.preventDefault(); prevQuestion(); }
    if (e.key === 'a' || e.key === 'A') toggleAnswer();
    if (e.key === 'e' || e.key === 'E') toggleExplanation();
});

// ===== INIT =====
function init() {
    renderHomeGrids();
    renderQuestion(currentQuestion);
    renderAptQuestionGrid();
    renderProblem(currentProblem);
    updateLiveScoreDisplay();

    // redirected to completed section if already finished
    if (isTestCompleted) {
        navigateTo('completed');
    }
}

// Show name modal on load — init() is called after name is entered
