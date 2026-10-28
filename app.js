'use strict';

// ---------------------------------------------------------------------------
// Einstellungen
// ---------------------------------------------------------------------------
const STORE_KEY = 'pruefungstrainer.v1';
const PASS_RATE = 0.5;            // bestanden nur bei MEHR als 50 % richtigen Antworten
const SIZES = [15, 30, 50];
const MODES = {
  pruefung:     { label: 'Prüfungssimulation',         instant: false },
  falsch:       { label: 'Zuletzt falsch beantwortet', instant: true },
  schwach:      { label: 'Schwächste Fragen',          instant: true },
  wiederholung: { label: 'Fehler wiederholen',         instant: true },
};

// ---------------------------------------------------------------------------
// Zustand (alles liegt im localStorage dieses Browsers)
// ---------------------------------------------------------------------------
const $app = document.getElementById('app');
let state = loadState();
let view = 'dashboard';
let viewArg = null;
let quiz = null;           // laufende Runde
let editor = null;         // Fragen-Editor { isNew, draft }
let size = 15;
let reviewAll = false;
let questionFilter = '';
let Q = new Map();         // aktueller Fragenbestand, neu aufgebaut bei jedem render()

function loadState() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s && s.profiles) return Object.assign({ current: null, custom: {}, deleted: [] }, s);
  } catch (e) { /* kein Zugriff auf den Speicher */ }
  return { profiles: {}, current: null, custom: {}, deleted: [] };
}

function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch (e) { toast('Speichern im Browser nicht möglich (privates Fenster?).'); }
}

const user = () => state.profiles[state.current] || null;

// ---------------------------------------------------------------------------
// Hilfsfunktionen
// ---------------------------------------------------------------------------
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);
const sameSet = (a, b) => a.length === b.length && a.every(x => b.includes(x));
const isMulti = q => q.mehrfach ?? q.richtig.length > 1;
const listText = q => (q.kontext ? q.kontext.split('\n')[0] + ' – ' : '') + q.frage;
const optLabel = (q, i) => (isMulti(q) ? `${i + 1}.` : `${String.fromCharCode(97 + i)})`);
const newId = prefix => prefix + Date.now().toString(36) + Math.random().toString(36).slice(2, 5);
const fmtDate = ts => new Date(ts).toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' });

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let toastTimer;
function toast(msg) {
  const el = document.getElementById('toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('show'), 2800);
}

function download(name, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const a = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ---------------------------------------------------------------------------
// Fragenbestand = fragen.js + lokale Änderungen aus dem Bereich "Fragen"
// ---------------------------------------------------------------------------
function allQuestions() {
  const deleted = new Set(state.deleted);
  const baseIds = new Set(FRAGEN.map(q => q.id));
  const list = FRAGEN.filter(q => !deleted.has(q.id)).map(q => state.custom[q.id] || q);
  for (const q of Object.values(state.custom)) if (!baseIds.has(q.id)) list.push(q);
  return list;
}

const stat = (u, id) => u.stats[id] || { n: 0, w: 0 };
const errorRate = (u, id) => { const s = stat(u, id); return s.n ? s.w / s.n : 0; };

function poolFor(mode, u) {
  const qs = [...Q.values()];
  if (mode === 'pruefung') return shuffle(qs);
  if (mode === 'falsch') return shuffle(qs.filter(q => stat(u, q.id).last === false));
  // schwach: höchste Fehlerquote (falsch / gesamt) zuerst
  return qs.filter(q => stat(u, q.id).w > 0)
    .sort((a, b) => errorRate(u, b.id) - errorRate(u, a.id) || stat(u, b.id).w - stat(u, a.id).w);
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------
function render() {
  Q = new Map(allQuestions().map(q => [q.id, q]));
  const u = user();
  const nav = document.getElementById('nav');
  const chip = document.getElementById('user-chip');
  nav.hidden = chip.hidden = !u;
  if (u) {
    chip.textContent = '👤 ' + u.name;
    nav.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.arg === view));
  }
  if (!u) { $app.innerHTML = renderLogin(); return; }

  const views = {
    dashboard: renderDashboard,
    training: renderTraining,
    quiz: renderQuiz,
    review: renderReview,
    verlauf: renderHistory,
    fragen: () => (editor ? renderEditor() : renderQuestions()),
    profil: renderProfile,
  };
  $app.innerHTML = (views[view] || renderDashboard)();
  window.scrollTo(0, 0);
}

// --- Anmeldung -------------------------------------------------------------
function renderLogin() {
  const profiles = Object.entries(state.profiles).sort((a, b) => a[1].name.localeCompare(b[1].name, 'de'));
  return `
    <div class="login">
      <div class="card">
        <h1>Wer lernt gerade?</h1>
        <p class="muted small">Jede Person hat ein eigenes Profil mit eigenem Lernstand. Profile werden in diesem Browser gespeichert.</p>
        ${profiles.map(([id, p]) => `
          <button class="profile-btn" data-action="login" data-arg="${id}">
            <span>${esc(p.name)}</span>
            <span class="muted small">${p.sessions.length} Runden</span>
          </button>`).join('')}
        <label class="field" style="margin-top:1rem">
          <span>${profiles.length ? 'Oder neues Profil anlegen' : 'Dein Name'}</span>
          <input type="text" id="new-name" maxlength="40" placeholder="z. B. Laura" autocomplete="off">
        </label>
        <button class="btn btn-primary btn-block" data-action="createProfile">Profil anlegen</button>
      </div>
    </div>`;
}

// --- Dashboard -------------------------------------------------------------
function renderDashboard() {
  const u = user();
  const qs = [...Q.values()];
  const answered = qs.filter(q => stat(u, q.id).n > 0);
  const mastered = qs.filter(q => stat(u, q.id).last === true);
  const lastWrong = qs.filter(q => stat(u, q.id).last === false);
  const exams = u.sessions.filter(s => s.mode === 'pruefung');
  const passed = exams.filter(s => s.passed).length;
  const lastExam = exams[exams.length - 1];
  const totals = qs.reduce((t, q) => { const s = stat(u, q.id); t.n += s.n; t.w += s.w; return t; }, { n: 0, w: 0 });
  const weak = poolFor('schwach', u).slice(0, 5);

  const kpis = `
    <div class="grid grid-4 section">
      <div class="card kpi">
        <div class="kpi-label">Lernstand</div>
        <div class="kpi-value">${pct(mastered.length, qs.length)} %</div>
        <div class="kpi-sub">${mastered.length} von ${qs.length} Fragen zuletzt richtig</div>
      </div>
      <div class="card kpi">
        <div class="kpi-label">Bearbeitet</div>
        <div class="kpi-value">${answered.length}/${qs.length}</div>
        <div class="kpi-sub">Trefferquote gesamt ${pct(totals.n - totals.w, totals.n)} %</div>
      </div>
      <div class="card kpi">
        <div class="kpi-label">Prüfungen bestanden</div>
        <div class="kpi-value">${passed}/${exams.length}</div>
        <div class="kpi-sub">Bestanden ab über ${PASS_RATE * 100} %</div>
      </div>
      <div class="card kpi">
        <div class="kpi-label">Letzte Prüfung</div>
        <div class="kpi-value" style="color:${lastExam ? (lastExam.passed ? 'var(--ok)' : 'var(--bad)') : 'inherit'}">${lastExam ? pct(lastExam.correct, lastExam.total) + ' %' : '–'}</div>
        <div class="kpi-sub">${lastExam ? fmtDate(lastExam.ts) : 'noch keine'}</div>
      </div>
    </div>`;

  const lastTen = exams.slice(-10);
  const chart = lastTen.length ? `
    <div class="chart">
      <div class="pass-line" style="bottom:${PASS_RATE * 100}%"><span>${PASS_RATE * 100} %</span></div>
      ${lastTen.map(s => {
        const p = pct(s.correct, s.total);
        return `<div class="col" title="${fmtDate(s.ts)}: ${s.correct}/${s.total}">
          <div class="val">${p}</div>
          <div class="b ${s.passed ? 'ok' : 'bad'}" style="height:${Math.max(p, 1)}%"></div>
        </div>`;
      }).join('')}
    </div>
    <p class="muted small" style="margin-top:.5rem">Die letzten ${lastTen.length} Prüfungssimulationen in Prozent.</p>`
    : `<div class="empty">Noch keine Prüfungssimulation gemacht.</div>`;

  const themes = {};
  for (const q of qs) {
    const t = themes[q.thema || 'Ohne Thema'] ||= { total: 0, ok: 0, bad: 0 };
    const s = stat(u, q.id);
    t.total++;
    if (s.last === true) t.ok++;
    else if (s.last === false) t.bad++;
  }
  const themeRows = Object.entries(themes).map(([name, t]) => `
    <div class="theme-row">
      <div class="small"><strong>${esc(name)}</strong></div>
      <div class="small muted">${t.ok}/${t.total}</div>
      <div class="bar">
        <div class="ok" style="width:${(t.ok / t.total) * 100}%"></div>
        <div class="bad" style="width:${(t.bad / t.total) * 100}%"></div>
      </div>
    </div>`).join('');

  const weakList = weak.length ? `<ul class="list">${weak.map(q => {
    const s = stat(u, q.id);
    return `<li>
      <div class="grow"><div class="clip small">${esc(listText(q))}</div><div class="muted small">${esc(q.thema)} · Seite ${esc(q.seite ?? '–')}</div></div>
      <span class="badge badge-bad">${s.w}/${s.n} falsch</span>
    </li>`;
  }).join('')}</ul>` : `<div class="empty">Noch keine Fehler – sehr gut.</div>`;

  return `
    <div class="row spread section">
      <div>
        <h1>Hallo ${esc(u.name)}</h1>
        <p class="muted" style="margin:0">Dein aktueller Trainingsstand.</p>
      </div>
      <button class="btn btn-primary" data-action="nav" data-arg="training">Training starten</button>
    </div>
    ${kpis}
    <div class="grid grid-2 section">
      <div class="card">
        <h2>Prüfungsergebnisse</h2>
        ${chart}
      </div>
      <div class="card">
        <h2>Schwächste Fragen</h2>
        ${weakList}
        ${lastWrong.length ? `<button class="btn btn-sm" style="margin-top:.75rem" data-action="nav" data-arg="training">${lastWrong.length} zuletzt falsche Fragen üben</button>` : ''}
      </div>
    </div>
    <div class="card">
      <h2>Lernstand nach Thema</h2>
      <div class="legend">
        <span><i style="background:var(--ok)"></i>zuletzt richtig</span>
        <span><i style="background:var(--bad);opacity:.75"></i>zuletzt falsch</span>
        <span><i style="background:var(--surface-2);border:1px solid var(--border)"></i>noch nicht bearbeitet</span>
      </div>
      ${themeRows || '<div class="empty">Keine Fragen vorhanden.</div>'}
    </div>`;
}

// --- Training (Auswahl) ----------------------------------------------------
function renderTraining() {
  const u = user();
  const total = Q.size;
  const wrongCount = poolFor('falsch', u).length;
  const weakCount = poolFor('schwach', u).length;
  const card = (mode, title, text, available) => `
    <div class="card mode-card">
      <h2>${title}</h2>
      <p class="muted small">${text}</p>
      <div class="count">${available ? `${Math.min(size, available)} von ${available} verfügbaren Fragen` : 'Aktuell keine Fragen in dieser Rubrik'}</div>
      <button class="btn ${mode === 'pruefung' ? 'btn-primary' : ''}" data-action="start" data-arg="${mode}" ${available ? '' : 'disabled'}>Starten</button>
    </div>`;
  return `
    <h1>Training</h1>
    <div class="card row spread">
      <div>
        <strong>Wie viele Fragen?</strong>
        <div class="muted small">Gilt für alle Rubriken. Gibt es weniger Fragen, werden alle vorhandenen genommen.</div>
      </div>
      <div class="segmented">
        ${SIZES.map(n => `<button class="${n === size ? 'active' : ''}" data-action="size" data-arg="${n}">${n}</button>`).join('')}
      </div>
    </div>
    <div class="grid grid-3">
      ${card('pruefung', 'Prüfungssimulation', `Zufällige Fragen aus dem gesamten Katalog. Auswertung erst am Ende, bestanden ab über ${PASS_RATE * 100} %.`, total)}
      ${card('falsch', 'Zuletzt falsch', 'Alle Fragen, die du beim letzten Mal falsch beantwortet hast. Mit direkter Rückmeldung.', wrongCount)}
      ${card('schwach', 'Schwächste Fragen', 'Fragen mit der höchsten Fehlerquote (falsch / gesamt). Mit direkter Rückmeldung.', weakCount)}
    </div>`;
}

// --- Quiz ------------------------------------------------------------------
function startQuiz(mode, ids) {
  const u = user();
  if (!ids) {
    const pool = poolFor(mode, u);
    ids = (mode === 'schwach' ? shuffle(pool.slice(0, size)) : pool.slice(0, size)).map(q => q.id);
  }
  if (!ids.length) { toast('In dieser Rubrik gibt es gerade keine Fragen.'); return; }
  quiz = { mode, ids, idx: 0, answers: ids.map(() => null), checked: false };
  view = 'quiz';
  render();
}

function optionsHtml(q, chosen, locked) {
  return q.optionen.map((text, i) => {
    const sel = chosen.includes(i);
    const right = q.richtig.includes(i);
    let cls = 'opt';
    let mark = '';
    if (locked) {
      cls += ' locked';
      if (right) { cls += ' is-correct'; mark = sel ? '✓ richtig gewählt' : '✓ richtig'; }
      else if (sel) { cls += ' is-wrong'; mark = '✗ falsch gewählt'; }
    } else if (sel) cls += ' selected';
    return `
      <label class="${cls}">
        <input type="${isMulti(q) ? 'checkbox' : 'radio'}" name="opt" value="${i}" ${sel ? 'checked' : ''} ${locked ? 'disabled' : ''}>
        <span class="opt-label">${optLabel(q, i)}</span>
        <span class="opt-text">${esc(text)}</span>
        ${mark ? `<span class="mark">${mark}</span>` : ''}
      </label>`;
  }).join('');
}

function questionHead(q) {
  return `
    <div class="q-meta">
      <span class="badge badge-info">${esc(q.thema || 'Ohne Thema')}</span>
      ${q.seite ? `<span class="badge">Seite ${esc(q.seite)}</span>` : ''}
    </div>
    ${q.kontext ? `<div class="q-context">${esc(q.kontext)}</div>` : ''}
    <div class="q-text">${esc(q.frage)}</div>`;
}

function renderQuiz() {
  const q = Q.get(quiz.ids[quiz.idx]);
  const mode = MODES[quiz.mode];
  const chosen = quiz.answers[quiz.idx] || [];
  const locked = mode.instant && quiz.checked;
  const last = quiz.idx === quiz.ids.length - 1;
  const ok = locked && sameSet(chosen, q.richtig);

  let buttons;
  if (mode.instant) {
    buttons = locked
      ? `<button class="btn btn-primary" data-action="${last ? 'finish' : 'next'}">${last ? 'Auswertung' : 'Weiter'}</button>`
      : `<button class="btn btn-primary" data-action="check" ${chosen.length ? '' : 'disabled'}>Antwort prüfen</button>`;
  } else {
    buttons = `
      <button class="btn" data-action="prev" ${quiz.idx ? '' : 'disabled'}>Zurück</button>
      ${last ? `<button class="btn btn-primary" data-action="finish">Abgeben</button>`
             : `<button class="btn btn-primary" data-action="next">Weiter</button>`}`;
  }

  return `
    <div class="row spread">
      <strong>${mode.label}</strong>
      <button class="btn btn-sm btn-danger" data-action="abort">Abbrechen</button>
    </div>
    <div class="row spread small muted" style="margin-top:.5rem">
      <span>Frage ${quiz.idx + 1} von ${quiz.ids.length}</span>
      <span id="answered-count">${answeredCount()} beantwortet</span>
    </div>
    <div class="progress"><div style="width:${((quiz.idx + (locked ? 1 : 0)) / quiz.ids.length) * 100}%"></div></div>
    <div class="card">
      ${questionHead(q)}
      <div class="q-hint">${isMulti(q) ? 'Mehrere Antworten können richtig sein.' : 'Eine Antwort ist richtig.'}</div>
      <div class="options">${optionsHtml(q, chosen, locked)}</div>
      ${locked ? `<div class="feedback ${ok ? 'ok' : 'bad'}">${ok ? 'Richtig!' : 'Leider falsch.'}</div>` : ''}
      ${locked && q.erklaerung ? `<div class="explain">${esc(q.erklaerung)}</div>` : ''}
      <div class="row">${buttons}</div>
      ${mode.instant ? '' : `<div class="qnav">${quiz.ids.map((_, i) => `
        <button class="${quiz.answers[i] && quiz.answers[i].length ? 'answered' : ''} ${i === quiz.idx ? 'current' : ''}" data-action="goto" data-arg="${i}">${i + 1}</button>`).join('')}</div>`}
    </div>`;
}

const answeredCount = () => quiz.answers.filter(a => a && a.length).length;

function onAnswerChange() {
  if (!quiz || (MODES[quiz.mode].instant && quiz.checked)) return;
  const chosen = [...$app.querySelectorAll('input[name=opt]:checked')].map(i => Number(i.value));
  quiz.answers[quiz.idx] = chosen;
  // nur Markierung und Buttons aktualisieren, ohne nach oben zu springen
  $app.querySelectorAll('.opt').forEach(l => l.classList.toggle('selected', l.querySelector('input').checked));
  const check = $app.querySelector('[data-action=check]');
  if (check) check.disabled = !chosen.length;
  const nav = $app.querySelectorAll('.qnav button')[quiz.idx];
  if (nav) nav.classList.toggle('answered', chosen.length > 0);
  document.getElementById('answered-count').textContent = `${answeredCount()} beantwortet`;
}

function finishQuiz() {
  const u = user();
  const open = quiz.answers.filter(a => !a || !a.length).length;
  if (open && !MODES[quiz.mode].instant &&
      !confirm(`${open} Frage(n) sind noch unbeantwortet und zählen als falsch. Trotzdem abgeben?`)) return;

  const now = Date.now();
  const answers = quiz.ids.map((id, i) => {
    const q = Q.get(id);
    const chosen = quiz.answers[i] || [];
    const ok = sameSet(chosen, q.richtig);
    const s = u.stats[id] || (u.stats[id] = { n: 0, w: 0 });
    s.n++;
    if (!ok) s.w++;
    s.last = ok;
    s.ts = now;
    return { id, chosen, ok };
  });
  const correct = answers.filter(a => a.ok).length;
  const session = {
    id: newId('r'), ts: now, mode: quiz.mode, total: answers.length, correct,
    passed: correct / answers.length > PASS_RATE, answers,
  };
  u.sessions.push(session);
  saveState();
  quiz = null;
  reviewAll = false;
  view = 'review';
  viewArg = session.id;
  render();
}

// --- Auswertung einer Runde ------------------------------------------------
function renderReview() {
  const u = user();
  const s = u.sessions.find(x => x.id === viewArg);
  if (!s) return `<div class="empty">Runde nicht gefunden.</div>`;
  const wrong = s.answers.filter(a => !a.ok);
  const shown = reviewAll ? s.answers : wrong;
  const isExam = s.mode === 'pruefung';
  const p = pct(s.correct, s.total);

  const items = shown.map(a => {
    const q = Q.get(a.id);
    if (!q) return `<div class="card muted small">Diese Frage wurde inzwischen gelöscht.</div>`;
    return `
      <div class="card review-item ${a.ok ? 'ok' : 'bad'}">
        <div class="row spread" style="margin-bottom:.5rem">
          <span class="badge ${a.ok ? 'badge-ok' : 'badge-bad'}">${a.ok ? 'Richtig' : (a.chosen.length ? 'Falsch' : 'Nicht beantwortet')}</span>
        </div>
        ${questionHead(q)}
        <div class="options" style="margin-top:.75rem;margin-bottom:0">${optionsHtml(q, a.chosen, true)}</div>
        ${q.erklaerung ? `<div class="explain" style="margin:1rem 0 0">${esc(q.erklaerung)}</div>` : ''}
      </div>`;
  }).join('');

  return `
    <div class="card result-head">
      <div class="muted small">${MODES[s.mode]?.label || ''} · ${fmtDate(s.ts)}</div>
      <div class="result-score" style="margin-top:.5rem;color:${isExam ? (s.passed ? 'var(--ok)' : 'var(--bad)') : 'inherit'}">${p} %</div>
      <div class="muted" style="margin-top:.4rem">${s.correct} von ${s.total} Fragen richtig</div>
      ${isExam ? `<span class="badge ${s.passed ? 'badge-ok' : 'badge-bad'}">${s.passed ? 'Bestanden' : 'Nicht bestanden'}</span>` : ''}
      <div class="row" style="justify-content:center;margin-top:1.1rem">
        ${wrong.length ? `<button class="btn btn-primary" data-action="retry" data-arg="${s.id}">${wrong.length} Fehler wiederholen</button>` : ''}
        <button class="btn" data-action="nav" data-arg="training">Neue Runde</button>
        <button class="btn" data-action="nav" data-arg="dashboard">Zum Dashboard</button>
      </div>
    </div>
    <div class="row spread section">
      <h2 style="margin:0">${reviewAll ? 'Alle Fragen' : 'Deine Fehler'}</h2>
      <button class="btn btn-sm" data-action="reviewToggle">${reviewAll ? 'Nur Fehler zeigen' : 'Alle Fragen zeigen'}</button>
    </div>
    ${items || `<div class="card empty">Keine Fehler in dieser Runde.</div>`}`;
}

// --- Verlauf ---------------------------------------------------------------
function renderHistory() {
  const u = user();
  const list = u.sessions.slice().reverse();
  if (!list.length) return `<h1>Verlauf</h1><div class="card empty">Noch keine Runden gespielt.</div>`;
  return `
    <h1>Verlauf</h1>
    <p class="muted small">Tippe auf eine Runde, um deine Antworten und Fehler einzusehen.</p>
    <div class="card"><ul class="list">
      ${list.map(s => {
        const isExam = s.mode === 'pruefung';
        const badge = isExam
          ? `<span class="badge ${s.passed ? 'badge-ok' : 'badge-bad'}">${s.passed ? 'Bestanden' : 'Nicht bestanden'}</span>`
          : `<span class="badge">Übung</span>`;
        return `<li>
          <button class="linkish row spread" data-action="review" data-arg="${s.id}">
            <span class="grow">
              <strong>${MODES[s.mode]?.label || s.mode}</strong>
              <span class="muted small" style="display:block">${fmtDate(s.ts)} · ${s.correct}/${s.total} richtig (${pct(s.correct, s.total)} %)</span>
            </span>
            ${badge}
          </button>
        </li>`;
      }).join('')}
    </ul></div>`;
}

// --- Profil ----------------------------------------------------------------
function renderProfile() {
  const u = user();
  return `
    <h1>Profil: ${esc(u.name)}</h1>
    <div class="card">
      <h2>Profil wechseln</h2>
      <p class="muted small">Mehrere Personen können denselben Browser nutzen – jede mit eigenem Profil.</p>
      <button class="btn" data-action="logout">Anderes Profil wählen</button>
    </div>
    <div class="card">
      <h2>Fortschritt sichern oder übertragen</h2>
      <p class="muted small">Der Lernstand liegt nur in diesem Browser. Für ein anderes Gerät: hier sichern und dort über „Fortschritt laden“ einlesen.</p>
      <div class="row">
        <button class="btn" data-action="exportProfile">Fortschritt sichern</button>
        <label class="btn">Fortschritt laden<input type="file" id="import-file" accept=".json,application/json" hidden></label>
      </div>
    </div>
    <div class="card">
      <h2>Zurücksetzen</h2>
      <div class="row">
        <button class="btn btn-danger" data-action="resetProgress">Lernstand zurücksetzen</button>
        <button class="btn btn-danger" data-action="deleteProfile">Profil löschen</button>
      </div>
    </div>`;
}

function importProfile(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const data = JSON.parse(reader.result);
      if (!data || typeof data.name !== 'string' || !data.stats || !Array.isArray(data.sessions)) throw new Error('Format');
      const existing = Object.keys(state.profiles).find(id => state.profiles[id].name.toLowerCase() === data.name.toLowerCase());
      if (existing && !confirm(`Profil „${data.name}“ gibt es hier schon. Mit dem geladenen Stand überschreiben?`)) return;
      const id = existing || newId('p');
      state.profiles[id] = { name: data.name, created: data.created || Date.now(), stats: data.stats, sessions: data.sessions };
      state.current = id;
      saveState();
      view = 'dashboard';
      render();
      toast(`Fortschritt von ${data.name} geladen.`);
    } catch (e) {
      toast('Die Datei ist keine gültige Sicherung.');
    }
  };
  reader.readAsText(file);
}

// --- Fragenverwaltung ------------------------------------------------------
function renderQuestions() {
  const baseIds = new Set(FRAGEN.map(q => q.id));
  const changes = Object.keys(state.custom).length + state.deleted.length;
  const f = questionFilter.toLowerCase();
  const list = [...Q.values()]
    .filter(q => !f || [q.frage, q.kontext, q.thema, String(q.seite ?? '')].join(' ').toLowerCase().includes(f))
    .sort((a, b) => (b.seite ?? 0) - (a.seite ?? 0));

  return `
    <div class="row spread section">
      <h1 style="margin:0">Fragen <span class="muted" style="font-weight:400">(${Q.size})</span></h1>
      <button class="btn btn-primary" data-action="newQ">Neue Frage</button>
    </div>
    <div class="notice">
      Neue oder geänderte Fragen gelten zunächst nur in diesem Browser.
      Damit alle sie bekommen: <strong>„fragen.js exportieren“</strong> und die Datei im GitHub-Repository ersetzen (Anleitung in der README).
      ${changes ? `<div class="row" style="margin-top:.6rem">
        <span class="badge badge-info">${changes} lokale Änderung(en)</span>
        <button class="btn btn-sm btn-primary" data-action="exportFragen">fragen.js exportieren</button>
        <button class="btn btn-sm btn-danger" data-action="discardLocal">Lokale Änderungen verwerfen</button>
      </div>` : `<div class="row" style="margin-top:.6rem"><button class="btn btn-sm" data-action="exportFragen">fragen.js exportieren</button></div>`}
    </div>
    <input type="text" id="q-filter" placeholder="Suchen nach Text, Thema oder Seite …" value="${esc(questionFilter)}" style="margin-bottom:1rem">
    <div class="card"><ul class="list">
      ${list.map(q => {
        const tag = !baseIds.has(q.id) ? '<span class="badge badge-info">neu</span>'
          : state.custom[q.id] ? '<span class="badge badge-info">geändert</span>' : '';
        return `<li>
          <div class="grow">
            <div class="clip">${esc(listText(q))}</div>
            <div class="muted small">${esc(q.thema || 'Ohne Thema')} · Seite ${esc(q.seite ?? '–')} · ${q.optionen.length} Antworten · ${isMulti(q) ? 'Mehrfachauswahl' : 'Einfachauswahl'} ${tag}</div>
          </div>
          <button class="btn btn-sm" data-action="editQ" data-arg="${q.id}">Bearbeiten</button>
        </li>`;
      }).join('') || '<li class="empty">Keine Treffer.</li>'}
    </ul></div>`;
}

function renderEditor() {
  const d = editor.draft;
  const themes = [...new Set([...Q.values()].map(q => q.thema).filter(Boolean))];
  return `
    <h1>${editor.isNew ? 'Neue Frage' : 'Frage bearbeiten'}</h1>
    <div class="card">
      <div class="grid grid-2" style="gap:0 1rem">
        <label class="field"><span>Thema</span>
          <input type="text" id="f-thema" list="themen" value="${esc(d.thema)}">
          <datalist id="themen">${themes.map(t => `<option value="${esc(t)}">`).join('')}</datalist>
        </label>
        <label class="field"><span>Seite im Skript</span>
          <input type="number" id="f-seite" min="0" value="${esc(d.seite ?? '')}">
        </label>
      </div>
      <label class="field"><span>Ausgangslage (optional)</span>
        <textarea id="f-kontext" placeholder="z. B. Ihre Kundin möchte …">${esc(d.kontext)}</textarea>
      </label>
      <label class="field"><span>Frage</span>
        <textarea id="f-frage">${esc(d.frage)}</textarea>
      </label>
      <label class="field"><span>Art der Frage</span>
        <select id="f-typ">
          <option value="einfach" ${d.mehrfach ? '' : 'selected'}>Einfachauswahl – genau eine Antwort richtig (a, b, c …)</option>
          <option value="mehrfach" ${d.mehrfach ? 'selected' : ''}>Mehrfachauswahl – eine oder mehrere richtig (1, 2, 3 …)</option>
        </select>
      </label>
      <div class="field"><span style="display:block;font-size:.85rem;font-weight:600;margin-bottom:.4rem">Antworten (richtige ankreuzen)</span>
        ${d.optionen.map((o, i) => `
          <div class="opt-row">
            <label><input type="checkbox" class="opt-ok" ${d.richtig.includes(i) ? 'checked' : ''}> richtig</label>
            <input type="text" class="opt-text" value="${esc(o)}" placeholder="Antwort ${i + 1}">
            <button class="btn btn-sm" data-action="removeOpt" data-arg="${i}" title="Antwort entfernen">✕</button>
          </div>`).join('')}
        <button class="btn btn-sm" data-action="addOpt">+ Antwort hinzufügen</button>
      </div>
      <label class="field"><span>Erklärung (optional, wird nach der Antwort angezeigt)</span>
        <textarea id="f-erkl">${esc(d.erklaerung)}</textarea>
      </label>
      <div class="row spread">
        <div class="row">
          <button class="btn btn-primary" data-action="saveQ">Speichern</button>
          <button class="btn" data-action="cancelQ">Abbrechen</button>
        </div>
        ${editor.isNew ? '' : `<button class="btn btn-danger" data-action="deleteQ">Frage löschen</button>`}
      </div>
    </div>`;
}

function syncDraft() {
  const d = editor.draft;
  const v = id => document.getElementById(id).value;
  d.thema = v('f-thema').trim();
  d.seite = v('f-seite') === '' ? null : Number(v('f-seite'));
  d.kontext = v('f-kontext').trim();
  d.frage = v('f-frage').trim();
  d.mehrfach = v('f-typ') === 'mehrfach';
  d.erklaerung = v('f-erkl').trim();
  const rows = [...$app.querySelectorAll('.opt-row')];
  d.optionen = rows.map(r => r.querySelector('.opt-text').value);
  d.richtig = rows.map((r, i) => (r.querySelector('.opt-ok').checked ? i : -1)).filter(i => i >= 0);
}

function saveQuestion() {
  syncDraft();
  const d = editor.draft;
  // leere Antwortzeilen entfernen, richtige Positionen mitziehen
  const keep = d.optionen.map((o, i) => ({ text: o.trim(), ok: d.richtig.includes(i) })).filter(o => o.text);
  const errors = [];
  if (!d.frage) errors.push('Bitte eine Frage eingeben.');
  if (keep.length < 2) errors.push('Mindestens zwei Antworten angeben.');
  const okCount = keep.filter(o => o.ok).length;
  if (!okCount) errors.push('Mindestens eine Antwort als richtig ankreuzen.');
  if (!d.mehrfach && okCount > 1) errors.push('Bei Einfachauswahl darf nur eine Antwort richtig sein.');
  if (errors.length) { toast(errors[0]); return; }

  const q = { id: d.id, thema: d.thema || 'Ohne Thema', seite: d.seite };
  if (d.kontext) q.kontext = d.kontext;
  q.frage = d.frage;
  q.mehrfach = d.mehrfach;
  q.optionen = keep.map(o => o.text);
  q.richtig = keep.map((o, i) => (o.ok ? i : -1)).filter(i => i >= 0);
  if (d.erklaerung) q.erklaerung = d.erklaerung;
  if (q.seite == null) delete q.seite;

  state.custom[q.id] = q;
  saveState();
  editor = null;
  render();
  toast('Frage gespeichert. Zum Teilen „fragen.js exportieren“.');
}

function exportFragen() {
  const header = [
    '// Fragenkatalog des Prüfungstrainers.',
    '// Neue Fragen am einfachsten im Bereich "Fragen" der App anlegen und danach "fragen.js exportieren".',
    '// Felder: id (eindeutig), thema, seite, kontext (optional), frage, mehrfach (true = mehrere Antworten möglich),',
    '//         optionen (Antworttexte), richtig (Positionen der richtigen Antworten, ab 0 gezählt), erklaerung (optional)',
  ].join('\n');
  download('fragen.js', `${header}\nwindow.FRAGEN = ${JSON.stringify([...Q.values()], null, 2)};\n`, 'text/javascript');
  toast('fragen.js heruntergeladen – jetzt im GitHub-Repository ersetzen.');
}

// ---------------------------------------------------------------------------
// Aktionen
// ---------------------------------------------------------------------------
const actions = {
  nav(target) {
    if (quiz && !confirm('Die laufende Runde wird abgebrochen und nicht gewertet. Fortfahren?')) return;
    quiz = null;
    editor = null;
    view = target;
    render();
  },
  login(id) { state.current = id; saveState(); view = 'dashboard'; render(); },
  createProfile() {
    const input = document.getElementById('new-name');
    const name = input.value.trim();
    if (!name) { toast('Bitte einen Namen eingeben.'); input.focus(); return; }
    if (Object.values(state.profiles).some(p => p.name.toLowerCase() === name.toLowerCase())) {
      toast('Diesen Namen gibt es schon – bitte oben auswählen.');
      return;
    }
    const id = newId('p');
    state.profiles[id] = { name, created: Date.now(), stats: {}, sessions: [] };
    state.current = id;
    saveState();
    view = 'dashboard';
    render();
  },
  logout() { state.current = null; saveState(); render(); },
  exportProfile() {
    const u = user();
    download(`lernstand-${u.name.replace(/[^\wäöüÄÖÜß-]+/g, '_')}.json`, JSON.stringify(u, null, 2), 'application/json');
  },
  resetProgress() {
    if (!confirm('Lernstand und Verlauf dieses Profils wirklich löschen?')) return;
    const u = user();
    u.stats = {};
    u.sessions = [];
    saveState();
    toast('Lernstand zurückgesetzt.');
    view = 'dashboard';
    render();
  },
  deleteProfile() {
    if (!confirm(`Profil „${user().name}“ mit allem Fortschritt löschen?`)) return;
    delete state.profiles[state.current];
    state.current = null;
    saveState();
    render();
  },

  size(n) { size = Number(n); render(); },
  start(mode) { startQuiz(mode); },
  retry(sessionId) {
    const s = user().sessions.find(x => x.id === sessionId);
    startQuiz('wiederholung', shuffle(s.answers.filter(a => !a.ok && Q.has(a.id)).map(a => a.id)));
  },
  check() { quiz.checked = true; render(); },
  next() {
    if (MODES[quiz.mode].instant) quiz.checked = false;
    quiz.idx++;
    render();
  },
  prev() { quiz.idx--; render(); },
  goto(i) { quiz.idx = Number(i); render(); },
  finish() { finishQuiz(); },
  abort() {
    if (!confirm('Runde abbrechen? Sie wird nicht gewertet.')) return;
    quiz = null;
    view = 'training';
    render();
  },

  review(id) { viewArg = id; reviewAll = false; view = 'review'; render(); },
  reviewToggle() { reviewAll = !reviewAll; render(); },

  newQ() {
    editor = { isNew: true, draft: { id: newId('q'), thema: '', seite: null, kontext: '', frage: '', mehrfach: false, optionen: ['', '', '', ''], richtig: [], erklaerung: '' } };
    render();
  },
  editQ(id) {
    const q = Q.get(id);
    editor = { isNew: false, draft: { kontext: '', erklaerung: '', seite: null, ...JSON.parse(JSON.stringify(q)), mehrfach: isMulti(q) } };
    render();
  },
  addOpt() { syncDraft(); editor.draft.optionen.push(''); render(); },
  removeOpt(i) {
    syncDraft();
    const d = editor.draft;
    i = Number(i);
    d.optionen.splice(i, 1);
    d.richtig = d.richtig.filter(r => r !== i).map(r => (r > i ? r - 1 : r));
    render();
  },
  saveQ() { saveQuestion(); },
  cancelQ() { editor = null; render(); },
  deleteQ() {
    if (!confirm('Diese Frage löschen?')) return;
    const id = editor.draft.id;
    delete state.custom[id];
    if (FRAGEN.some(q => q.id === id)) state.deleted.push(id);
    saveState();
    editor = null;
    render();
    toast('Frage gelöscht. Zum Teilen „fragen.js exportieren“.');
  },
  exportFragen() { exportFragen(); },
  discardLocal() {
    if (!confirm('Alle lokal angelegten, geänderten und gelöschten Fragen auf den Stand der fragen.js zurücksetzen?')) return;
    state.custom = {};
    state.deleted = [];
    saveState();
    render();
  },
};

document.addEventListener('click', e => {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  actions[el.dataset.action]?.(el.dataset.arg);
});

document.addEventListener('change', e => {
  if (e.target.name === 'opt') onAnswerChange();
  if (e.target.id === 'import-file') importProfile(e.target.files[0]);
});

document.addEventListener('input', e => {
  if (e.target.id !== 'q-filter') return;
  questionFilter = e.target.value;
  const pos = e.target.selectionStart;
  render();
  const input = document.getElementById('q-filter');
  input.focus();
  input.setSelectionRange(pos, pos);
});

document.addEventListener('keydown', e => {
  if (e.key === 'Enter' && e.target.id === 'new-name') actions.createProfile();
});

render();
