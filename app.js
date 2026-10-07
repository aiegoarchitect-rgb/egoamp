(() => {
  'use strict';

  const UNITS = window.COURSE.units;
  const $app = document.getElementById('app');
  const DAILY_GOAL = 30;
  const LESSON_NAMES = ['Слова 1', 'Слова 2', 'Фразы', 'Итог'];

  // ---------- Иконки ----------
  const I = {
    flame: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2s5 4.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.8 2-5 .2 1.6 1 2.6 2 3 0-3 1-6 1-8z"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
    speaker: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/></svg>',
    turtle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 15c0-4 3.5-7 8-7s8 3 8 7H4zm16.5-2.5c1 0 2-.7 2-1.8S21.6 9 20.5 9.5zM6 16h3v3H6zm9 0h3v3h-3z"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3 6.5 7 .8-5.2 4.8 1.4 7L12 17.6 5.8 21l1.4-7L2 9.3l7-.8z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V8a5 5 0 0 1 10 0v2h1a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9a1 1 0 0 1 1-1zm2 0h6V8a3 3 0 0 0-6 0z"/></svg>',
    trophy: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 3h10v2h3v3a4 4 0 0 1-4 4h-.3A5 5 0 0 1 13 14.9V18h3v3H8v-3h3v-3.1A5 5 0 0 1 8.3 12H8a4 4 0 0 1-4-4V5h3zm0 4H6v1a2 2 0 0 0 1 1.7zm10 0v2.7A2 2 0 0 0 18 8V7z"/></svg>',
    path: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M5 3h6v6H5zm8 6h6v6h-6zM5 15h6v6H5z"/></svg>',
    repeat: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12a8 8 0 0 1 14-5.3L20 9M20 4v5h-5M20 12a8 8 0 0 1-14 5.3L4 15M4 20v-5h5"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v16H6.5a.5.5 0 0 0 0 1H20v3H6.5A2.5 2.5 0 0 1 4 19.5z"/></svg>',
  };

  // ---------- Данные курса ----------
  const ITEMS = [];
  const BY_ID = {};
  const UNIT_ITEMS = UNITS.map((u, ui) => {
    const mk = (kind) => ([es, ru], i) => {
      const it = { id: `${kind}${ui}-${i}`, kind, unit: ui, es, ru };
      ITEMS.push(it); BY_ID[it.id] = it; return it;
    };
    return { w: u.words.map(mk('w')), p: u.phrases.map(mk('p')) };
  });
  const ORDER = [];
  UNITS.forEach((_, ui) => LESSON_NAMES.forEach((_, li) => ORDER.push(`${ui}-${li}`)));

  // ---------- Сохранение ----------
  const KEY = 'holaA1.v1';
  const fresh = () => ({ v: 1, done: {}, xp: 0, streak: 0, last: null, dayXp: 0, mem: {}, sound: true });
  let S = load();
  function load() {
    try {
      const r = JSON.parse(localStorage.getItem(KEY));
      if (r && r.v === 1) return Object.assign(fresh(), r);
    } catch (e) { /* хранилище недоступно */ }
    return fresh();
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } }

  const dayStr = (d) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  const today = () => dayStr(new Date());
  const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return dayStr(d); };
  const liveStreak = () => (S.last === today() || S.last === yesterday() ? S.streak : 0);
  const todayXp = () => (S.last === today() ? S.dayXp : 0);
  function addXp(x) {
    const t = today();
    if (S.last !== t) { S.streak = S.last === yesterday() ? S.streak + 1 : 1; S.last = t; S.dayXp = 0; }
    S.dayXp += x; S.xp += x; save();
  }

  // Интервальное повторение: уровень 0–5, следующее повторение через 1–32 дня.
  const DAY = 864e5;
  const GAPS = [0, 1, 2, 4, 8, 16, 32];
  function remember(id, ok) {
    const m = S.mem[id] || { s: 0, due: 0 };
    m.s = ok ? Math.min(6, m.s + 1) : Math.max(0, m.s - 2);
    m.due = Date.now() + (ok ? GAPS[m.s] * DAY : 0);
    S.mem[id] = m;
  }

  const unlocked = (key) => { const i = ORDER.indexOf(key); return i === 0 || !!S.done[ORDER[i - 1]]; };
  const maxOpenUnit = () => { let m = 0; ORDER.forEach((k) => { if (unlocked(k)) m = Math.max(m, +k.split('-')[0]); }); return m; };

  // ---------- Помощники ----------
  const h = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const sample = (a, n) => shuffle(a).slice(0, n);
  const clean = (s) => s.toLowerCase().replace(/[¿¡?!.,;:"«»]/g, '').replace(/\s+/g, ' ').trim();
  const plain = (s) => clean(s).normalize('NFD').replace(/[̀-ͯ]/g, '');
  const noArticle = (s) => s.replace(/^(el|la|los|las) /, '');
  const tokens = (s) => s.replace(/[¿¡?!.,]/g, '').split(/\s+/).filter(Boolean);

  // ---------- Звук ----------
  const ttsOK = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  let voice = null;
  function pickVoice() {
    if (!ttsOK) return;
    const vs = speechSynthesis.getVoices();
    voice = vs.find((v) => /^es[-_]ES/i.test(v.lang)) || vs.find((v) => /^es/i.test(v.lang)) || null;
  }
  if (ttsOK) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function say(text, slow) {
    if (!ttsOK) return;
    try {
      speechSynthesis.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = voice ? voice.lang : 'es-ES';
      if (voice) u.voice = voice;
      u.rate = slow ? 0.55 : 0.9;
      speechSynthesis.speak(u);
    } catch (e) { /* ignore */ }
  }
  let ac = null;
  function tone(ok) {
    if (!S.sound) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      const t0 = ac.currentTime;
      (ok ? [660, 990] : [260, 190]).forEach((f, i) => {
        const o = ac.createOscillator(); const g = ac.createGain();
        const t = t0 + i * 0.11;
        o.type = ok ? 'sine' : 'triangle'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.exponentialRampToValueAtTime(0.18, t + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
        o.connect(g).connect(ac.destination); o.start(t); o.stop(t + 0.22);
      });
    } catch (e) { /* ignore */ }
  }
  const sayBtn = (text, cls = '') => ttsOK ? `<button class="say ${cls}" data-say="${h(text)}" aria-label="Прослушать">${I.speaker}</button>` : '';

  // ---------- Упражнения ----------
  function distract(it, field, n) {
    const same = UNIT_ITEMS[it.unit][it.kind];
    const top = maxOpenUnit();
    const other = ITEMS.filter((x) => x.kind === it.kind && x.unit !== it.unit && x.unit <= Math.max(top, it.unit));
    const seen = new Set([it[field]]);
    const out = [];
    for (const x of shuffle(same).concat(shuffle(other))) {
      if (out.length >= n) break;
      if (seen.has(x[field])) continue;
      seen.add(x[field]); out.push(x);
    }
    return out;
  }
  function extraTiles(it) {
    const mine = new Set(tokens(it.es).map((w) => w.toLowerCase()));
    const pool = [];
    UNIT_ITEMS[it.unit].p.forEach((p) => { if (p.id !== it.id) tokens(p.es).slice(1).forEach((w) => { if (!mine.has(w.toLowerCase())) pool.push(w); }); });
    return sample([...new Set(pool)], Math.min(3, Math.max(2, tokens(it.es).length - 2)));
  }
  const EX = {
    pickEs: (it) => ({ t: 'pick', dir: 'es', item: it, opts: shuffle([it, ...distract(it, 'ru', 3)]) }),
    pickRu: (it) => ({ t: 'pick', dir: 'ru', item: it, opts: shuffle([it, ...distract(it, 'es', 3)]) }),
    listen: (it) => (ttsOK ? { t: 'listen', item: it, opts: shuffle([it, ...distract(it, 'es', 3)]) } : EX.pickRu(it)),
    match: (its) => ({ t: 'match', items: its }),
    build: (it) => ({
      t: 'build', item: it,
      tiles: shuffle(tokens(it.es).map((w, i) => ({ w, k: 'a' + i })).concat(extraTiles(it).map((w, i) => ({ w, k: 'x' + i })))),
    }),
    type: (it) => ({ t: 'type', item: it }),
  };

  function buildLesson(ui, li) {
    const U = UNIT_ITEMS[ui];
    const half = Math.ceil(U.w.length / 2);
    if (li < 2) {
      const ws = li === 0 ? U.w.slice(0, half) : U.w.slice(half);
      const q = [{ t: 'intro', items: ws }];
      shuffle(ws).forEach((w) => q.push(EX.pickEs(w)));
      q.push(EX.match(sample(ws, 5)));
      shuffle(ws).forEach((w, i) => q.push([EX.pickRu, EX.listen, EX.type][i % 3](w)));
      return q;
    }
    if (li === 2) {
      const q = [{ t: 'intro', items: U.p }];
      shuffle(U.p).forEach((p) => q.push(EX.pickEs(p)));
      shuffle(U.p).forEach((p) => q.push(EX.build(p)));
      sample(U.p, 2).forEach((p) => q.push(EX.listen(p)));
      return q;
    }
    const q = [EX.match(sample(U.w, 5))];
    sample(U.w, 4).forEach((w) => q.push(EX.type(w)));
    sample(U.p, 3).forEach((p) => q.push(EX.build(p)));
    sample(U.w, 2).forEach((w) => q.push(EX.listen(w)));
    sample(U.p, 2).forEach((p) => q.push(EX.pickRu(p)));
    return shuffle(q);
  }

  const seenItems = () => ITEMS.filter((it) => S.mem[it.id]);
  const dueItems = () => seenItems().filter((it) => S.mem[it.id].due <= Date.now());
  function buildPractice() {
    const pool = seenItems().sort((a, b) => (S.mem[a.id].due - S.mem[b.id].due) || (S.mem[a.id].s - S.mem[b.id].s));
    const pick = pool.slice(0, 10);
    const q = pick.map((it) => (it.kind === 'w' ? [EX.pickRu, EX.listen, EX.type] : [EX.build, EX.pickEs, EX.listen])[(Math.random() * 3) | 0](it));
    const words = pick.filter((it) => it.kind === 'w');
    if (words.length >= 4) q.push(EX.match(words.slice(0, 5)));
    return shuffle(q);
  }

  // ---------- Главный экран ----------
  let tab = 'course';
  let firstPaint = true;
  let dictQuery = '';
  let resetArmed = false;

  function header() {
    const st = liveStreak();
    const xp = todayXp();
    return `<div class="top">
      <div class="brand">Hola <span>A1</span></div>
      <span class="chip ${st ? 'on' : 'off'}" title="Дней подряд">${I.flame}${st}</span>
      <span class="chip ${xp ? 'on' : 'off'}" title="Опыт за сегодня">${I.bolt}${xp}</span>
    </div>`;
  }

  function goalCard() {
    const xp = todayXp();
    const pct = Math.min(100, (xp / DAILY_GOAL) * 100);
    const txt = xp >= DAILY_GOAL ? 'Цель на сегодня выполнена' : `Ещё ${DAILY_GOAL - xp} XP до цели дня`;
    return `<div class="goal"><div class="goal-row"><span>${txt}</span><b>${Math.min(xp, DAILY_GOAL)} / ${DAILY_GOAL}</b></div><div class="meter"><i style="width:${pct}%"></i></div></div>`;
  }

  function coursePane() {
    const offs = [0, 46, 0, -46];
    const currentKey = ORDER.find((k) => !S.done[k] && unlocked(k));
    return goalCard() + UNITS.map((u, ui) => {
      const open = unlocked(`${ui}-0`);
      const nodes = LESSON_NAMES.map((name, li) => {
        const key = `${ui}-${li}`;
        const done = !!S.done[key];
        const can = unlocked(key);
        const cur = key === currentKey;
        const cls = done ? 'done' : can ? (cur ? 'current' : '') : 'locked';
        const icon = done ? I.check : !can ? I.lock : li === 3 ? I.trophy : I.star;
        return `<div class="node-wrap" style="transform:translateX(${offs[li]}px)">
          ${cur ? '<span class="start-tag">Начать</span>' : ''}
          <button class="node ${cls}" data-act="lesson" data-key="${key}" ${can ? '' : 'aria-disabled="true"'} aria-label="${h(u.ru)}: ${name}" ${cur ? 'id="current"' : ''}>${icon}</button>
          <span class="node-label">${name}</span></div>`;
      }).join('');
      return `<section class="unit ${open ? '' : 'locked'}">
        <div class="unit-head"><div><div class="eyebrow">Тема ${ui + 1}</div><h2>${h(u.es)}</h2><p>${h(u.ru)}</p></div>
        <button class="gbtn" data-act="tip" data-unit="${ui}">Грамматика</button></div>
        <div class="path">${nodes}</div></section>`;
    }).join('') + `<p class="lead" style="text-align:center;margin-top:28px">Пройдите все 12 тем, и у вас будет база уровня A1.</p>`;
  }

  function levelBars(id) {
    const s = S.mem[id] ? S.mem[id].s : 0;
    return `<span class="lvl" title="Уровень знания ${s} из 6">${[1, 2, 3, 4, 5, 6].map((n) => `<i class="${n <= s ? 'on' : ''}"></i>`).join('')}</span>`;
  }

  function reviewPane() {
    const seen = seenItems();
    const due = dueItems();
    const strong = seen.filter((it) => S.mem[it.id].s >= 4).length;
    const doneCount = Object.keys(S.done).length;
    let body;
    if (!seen.length) {
      body = `<div class="card empty">Здесь появятся слова, которые вы уже встретили. Пройдите первый урок, и можно будет повторять.</div>`;
    } else {
      const weak = seen.slice().sort((a, b) => S.mem[a.id].s - S.mem[b.id].s).slice(0, 8);
      body = `<button class="btn" data-act="practice">Повторить ${due.length ? `${Math.min(due.length, 10)} слов` : 'слабые слова'}</button>
        <div class="dict-unit">Требуют внимания</div>
        <div class="wordlist">${weak.map(wordRow).join('')}</div>`;
    }
    return `<h1 class="section-title">Повторение</h1>
      <p class="lead">Слова возвращаются к вам через 1, 2, 4, 8 и больше дней. Так они переходят в долгую память.</p>
      <div class="stack">
        <div class="stats">
          <div class="stat"><b>${seen.length}</b><span>изучено</span></div>
          <div class="stat"><b>${strong}</b><span>знаю твёрдо</span></div>
          <div class="stat"><b>${due.length}</b><span>пора повторить</span></div>
        </div>
        <div class="stats">
          <div class="stat"><b>${S.xp}</b><span>всего XP</span></div>
          <div class="stat"><b>${liveStreak()}</b><span>дней подряд</span></div>
          <div class="stat"><b>${doneCount}/${ORDER.length}</b><span>уроков</span></div>
        </div>
        ${body}
        <div class="dict-unit">Настройки</div>
        <div class="card stack">
          <div class="row"><span>Звуки ответов</span><button class="toggle" role="switch" aria-checked="${S.sound}" data-act="sound" aria-label="Звуки ответов"></button></div>
          ${ttsOK ? '' : '<p class="fb-note" style="margin:0">Этот браузер не умеет озвучивать текст, поэтому упражнения на слух отключены.</p>'}
          <div class="row"><span>Начать курс заново</span>${resetArmed
            ? '<span><button class="linkbtn" data-act="reset-yes">Да, стереть</button> · <button class="linkbtn" style="color:var(--muted)" data-act="reset-no">Отмена</button></span>'
            : '<button class="linkbtn" data-act="reset">Сбросить прогресс</button>'}</div>
        </div>
      </div>`;
  }

  function wordRow(it) {
    return `<div class="word">${sayBtn(it.es)}<div><div class="es">${h(it.es)}</div><div class="ru">${h(it.ru)}</div></div>${S.mem[it.id] ? levelBars(it.id) : ''}</div>`;
  }

  function dictPane() {
    const q = plain(dictQuery);
    const top = maxOpenUnit();
    let html = '';
    for (let ui = 0; ui <= top; ui++) {
      const list = UNIT_ITEMS[ui].w.concat(UNIT_ITEMS[ui].p).filter((it) => !q || plain(it.es).includes(q) || it.ru.toLowerCase().includes(dictQuery.toLowerCase().trim()));
      if (list.length) html += `<div class="dict-unit">${ui + 1}. ${h(UNITS[ui].es)} · ${h(UNITS[ui].ru)}</div><div class="wordlist">${list.map(wordRow).join('')}</div>`;
    }
    return `<h1 class="section-title">Словарь</h1>
      <p class="lead">Все слова и фразы открытых тем. Нажмите на динамик, чтобы услышать произношение.</p>
      <input id="dict-search" class="search" type="search" placeholder="Поиск по-испански или по-русски" value="${h(dictQuery)}" autocomplete="off">
      <div id="dict-list">${html || '<div class="empty">Ничего не нашлось</div>'}</div>`;
  }

  function renderHome() {
    const pane = tab === 'course' ? coursePane() : tab === 'review' ? reviewPane() : dictPane();
    const tb = (id, label, icon) => `<button data-act="tab" data-tab="${id}" ${tab === id ? 'aria-current="page"' : ''}>${icon}${label}</button>`;
    $app.innerHTML = `<div class="scroll" id="scroll">${header()}${pane}</div>
      <nav class="tabs">${tb('course', 'Курс', I.path)}${tb('review', 'Повторение', I.repeat)}${tb('dict', 'Словарь', I.book)}</nav>`;
    if (tab === 'course' && firstPaint) {
      const cur = document.getElementById('current');
      if (cur && cur.closest('.unit') !== document.querySelector('.unit')) cur.scrollIntoView({ block: 'center' });
    }
    firstPaint = false;
    const search = document.getElementById('dict-search');
    if (search) {
      search.addEventListener('input', () => {
        dictQuery = search.value;
        const box = document.getElementById('dict-list');
        const tmp = document.createElement('div');
        tmp.innerHTML = dictPane();
        box.innerHTML = tmp.querySelector('#dict-list').innerHTML;
      });
    }
  }

  function showTip(ui) {
    const u = UNITS[ui];
    const bg = document.createElement('div');
    bg.className = 'sheet-bg';
    bg.innerHTML = `<div class="sheet" role="dialog" aria-modal="true" aria-label="Грамматика"><div class="eyebrow" style="color:var(--muted)">Тема ${ui + 1} · ${h(u.ru)}</div><h3>${h(u.es)}</h3>${u.tip}<button class="btn" data-close>Понятно</button></div>`;
    bg.addEventListener('click', (e) => { if (e.target === bg || e.target.closest('[data-close]')) bg.remove(); });
    document.body.appendChild(bg);
    bg.querySelector('[data-close]').focus();
  }

  // ---------- Урок ----------
  let L = null;

  function startLesson(key) {
    const [ui, li] = key.split('-').map(Number);
    L = { key, q: buildLesson(ui, li), i: 0, right: 0, total: 0, combo: 0, sel: null, placed: [], state: 'ask', quitArmed: false, title: `${UNITS[ui].es} · ${LESSON_NAMES[li]}` };
    renderLesson();
  }
  function startPractice() {
    L = { key: null, q: buildPractice(), i: 0, right: 0, total: 0, combo: 0, sel: null, placed: [], state: 'ask', quitArmed: false, title: 'Повторение' };
    renderLesson();
  }

  function taskBody(e) {
    switch (e.t) {
      case 'intro':
        return `<div class="task">${e.items[0].kind === 'p' ? 'Новые фразы' : 'Новые слова'}</div>
          <p class="lead" style="margin:-8px 0 0">Прочитайте и прослушайте. Потом будут упражнения.</p>
          <div class="wordlist intro-list">${e.items.map((it) => `<div class="word">${sayBtn(it.es)}<div><div class="es">${h(it.es)}</div><div class="ru">${h(it.ru)}</div></div></div>`).join('')}</div>`;
      case 'pick': {
        const es = e.dir === 'es';
        const field = es ? 'ru' : 'es';
        return `<div class="task">${es ? 'Как это переводится?' : 'Выберите перевод на испанский'}</div>
          <div class="prompt">${es ? sayBtn(e.item.es) : ''}<div class="bubble">${h(es ? e.item.es : e.item.ru)}</div></div>
          <div class="opts">${e.opts.map((o, n) => `<button class="opt" data-act="opt" data-id="${o.id}"><kbd>${n + 1}</kbd><span>${h(o[field])}</span></button>`).join('')}</div>`;
      }
      case 'listen':
        return `<div class="task">Что вы слышите?</div>
          <div class="big-say">${sayBtn(e.item.es)}${sayBtn(e.item.es, 'slow').replace('data-say', 'data-slow="1" data-say').replace(I.speaker, I.turtle)}</div>
          <div class="opts">${e.opts.map((o, n) => `<button class="opt" data-act="opt" data-id="${o.id}"><kbd>${n + 1}</kbd><span>${h(o.es)}</span></button>`).join('')}</div>`;
      case 'match': {
        const left = shuffle(e.items); const right = shuffle(e.items);
        return `<div class="task">Найдите пары</div>
          <div class="match"><div class="col">${left.map((it) => `<button class="opt" data-act="m" data-side="es" data-id="${it.id}">${h(it.es)}</button>`).join('')}</div>
          <div class="col">${right.map((it) => `<button class="opt" data-act="m" data-side="ru" data-id="${it.id}">${h(it.ru)}</button>`).join('')}</div></div>`;
      }
      case 'build':
        return `<div class="task">Переведите на испанский</div>
          <div class="prompt"><div class="bubble">${h(e.item.ru)}</div></div>
          <div class="answer-line" id="line"></div>
          <div class="bank" id="bank">${e.tiles.map((t) => `<button class="tile" data-act="tile" data-k="${t.k}">${h(t.w)}</button>`).join('')}</div>`;
      case 'type':
        return `<div class="task">Напишите по-испански</div>
          <div class="prompt"><div class="bubble">${h(e.item.ru)}</div></div>
          <textarea id="ans" class="typebox" lang="es" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false" placeholder="Ваш ответ"></textarea>
          <div class="accents">${['á', 'é', 'í', 'ó', 'ú', 'ñ', 'ü', '¿', '¡'].map((c) => `<button data-act="acc" data-c="${c}" tabindex="-1">${c}</button>`).join('')}</div>`;
    }
    return '';
  }

  function footAsk(e) {
    if (e.t === 'intro') return `<button class="btn" data-act="next">Начать</button>`;
    if (e.t === 'match') return `<button class="btn ghost" data-act="skip-match" disabled>Соедините все пары</button>`;
    return `<button class="btn" data-act="check" id="checkbtn" disabled>Проверить</button>`;
  }

  function renderLesson() {
    const e = L.q[L.i];
    const pct = (L.i / L.q.length) * 100;
    L.sel = null; L.placed = []; L.state = 'ask'; L.mSel = null; L.mDone = 0; L.mErr = new Set();
    $app.innerHTML = `<div class="lesson">
      <div class="ltop"><button class="iconbtn" data-act="quit" aria-label="Выйти из урока">×</button>
        <div class="bar" role="progressbar" aria-label="${h(L.title)}" aria-valuenow="${Math.round(pct)}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
        ${L.combo >= 3 ? `<span class="combo">${L.combo} подряд</span>` : ''}</div>
      <div class="lbody" id="lbody">${taskBody(e)}</div>
      <div class="lfoot" id="foot">${footAsk(e)}</div></div>`;
    if (e.t === 'pick' && e.dir === 'es') say(e.item.es);
    if (e.t === 'listen') say(e.item.es);
    if (e.t === 'type') {
      const ta = document.getElementById('ans');
      ta.addEventListener('input', () => { document.getElementById('checkbtn').disabled = !ta.value.trim(); });
      ta.addEventListener('keydown', (ev) => { if (ev.key === 'Enter') { ev.preventDefault(); if (ta.value.trim()) check(); } });
      setTimeout(() => ta.focus(), 50);
    }
  }

  function renderBuild() {
    const e = L.q[L.i];
    const byK = Object.fromEntries(e.tiles.map((t) => [t.k, t]));
    document.getElementById('line').innerHTML = L.placed.map((k) => `<button class="tile" data-act="untile" data-k="${k}">${h(byK[k].w)}</button>`).join('');
    document.querySelectorAll('#bank .tile').forEach((b) => b.classList.toggle('used', L.placed.includes(b.dataset.k)));
    document.getElementById('checkbtn').disabled = !L.placed.length;
  }

  function evaluate(e) {
    const it = e.item;
    if (e.t === 'pick' || e.t === 'listen') {
      const ok = L.sel === it.id;
      const shown = e.t === 'pick' && e.dir === 'es' ? it.ru : it.es;
      return { ok, answer: shown, note: e.t === 'listen' || e.dir === 'ru' ? it.ru : it.es };
    }
    if (e.t === 'build') {
      const byK = Object.fromEntries(e.tiles.map((t) => [t.k, t.w]));
      const got = L.placed.map((k) => byK[k]).join(' ');
      return { ok: clean(got) === clean(tokens(it.es).join(' ')), answer: it.es };
    }
    if (e.t === 'type') {
      const got = document.getElementById('ans').value;
      if (clean(got) === clean(it.es)) return { ok: true, answer: it.es };
      if (plain(got) === plain(it.es)) return { ok: true, answer: it.es, note: `Почти идеально. Обратите внимание на знаки над буквами: ${it.es}` };
      if (clean(got) === clean(noArticle(it.es))) return { ok: true, answer: it.es, note: `Верно. С артиклем: ${it.es}` };
      if (plain(got) === plain(noArticle(it.es))) return { ok: true, answer: it.es, note: `Верно. Правильное написание с артиклем: ${it.es}` };
      return { ok: false, answer: it.es };
    }
    return { ok: true };
  }

  function check() {
    if (L.state !== 'ask') return;
    const e = L.q[L.i];
    const r = evaluate(e);
    L.state = 'shown';
    L.total++;
    if (r.ok) { L.right++; L.combo++; } else { L.combo = 0; if (!e.retry) L.q.push(Object.assign({}, e, { retry: true })); }
    remember(e.item.id, r.ok);
    save();
    tone(r.ok);
    if (r.ok && e.item.kind === 'p') say(e.item.es);
    showFeedback(r);
  }

  const PRAISE = ['Отлично!', '¡Muy bien!', 'Верно!', '¡Perfecto!', 'Так держать!', '¡Excelente!'];
  function showFeedback(r) {
    const foot = document.getElementById('foot');
    document.getElementById('lbody').classList.add('locked');
    foot.className = 'lfoot ' + (r.ok ? 'ok' : 'bad');
    const extra = r.ok
      ? (r.note && r.note !== r.answer ? `<div class="fb-note">${h(r.note)}</div>` : '')
      : `<div class="fb-text">Правильный ответ:<b>${h(r.answer)}</b></div>${r.note && r.note !== r.answer ? `<div class="fb-note">${h(r.note)}</div>` : ''}`;
    foot.innerHTML = `<div class="row"><div class="fb-title">${r.ok ? PRAISE[(Math.random() * PRAISE.length) | 0] : 'Не совсем'}</div>${r.answer ? sayBtn(r.answer.match(/[а-яё]/i) ? L.q[L.i].item.es : r.answer) : ''}</div>
      ${extra}<button class="btn ${r.ok ? 'ok' : 'bad'}" data-act="next" id="nextbtn">Дальше</button>`;
    document.getElementById('nextbtn').focus({ preventScroll: true });
  }

  function next() {
    L.i++;
    if (L.i >= L.q.length) return finish();
    renderLesson();
  }

  function finish() {
    const acc = L.total ? Math.round((L.right / L.total) * 100) : 100;
    const perfect = L.right === L.total;
    const xp = L.key ? (perfect ? 15 : 10) : 10;
    if (L.key) S.done[L.key] = Math.max(S.done[L.key] || 0, acc);
    // Слова из вводного экрана считаем увиденными, даже если упражнения на них не выпало.
    L.q.forEach((e) => (e.items || []).forEach((it) => { if (!S.mem[it.id]) S.mem[it.id] = { s: 1, due: Date.now() + DAY }; }));
    addXp(xp);
    const goalHit = todayXp() >= DAILY_GOAL && todayXp() - xp < DAILY_GOAL;
    const titles = perfect ? '¡Perfecto!' : acc >= 80 ? '¡Muy bien!' : '¡Bien hecho!';
    $app.innerHTML = `<div class="result">
      <div><h1>${titles}</h1><p style="margin-top:8px">${h(L.title)}${goalHit ? ' · цель дня выполнена' : ''}</p></div>
      <div class="stats">
        <div class="stat"><b style="color:var(--sun)">+${xp}</b><span>XP</span></div>
        <div class="stat"><b style="color:var(--ok)">${acc}%</b><span>точность</span></div>
        <div class="stat"><b>${liveStreak()}</b><span>дней подряд</span></div>
      </div>
      <button class="btn" data-act="home" id="homebtn">Продолжить</button></div>`;
    tone(true);
    L = null;
    document.getElementById('homebtn').focus();
  }

  // ---------- Сопоставление пар ----------
  function onMatch(btn) {
    const e = L.q[L.i];
    if (btn.classList.contains('gone')) return;
    if (btn.dataset.side === 'es') say(BY_ID[btn.dataset.id].es);
    if (!L.mSel || L.mSel.dataset.side === btn.dataset.side) {
      if (L.mSel) L.mSel.classList.remove('sel');
      L.mSel = btn; btn.classList.add('sel'); return;
    }
    const a = L.mSel; L.mSel = null; a.classList.remove('sel');
    if (a.dataset.id === btn.dataset.id) {
      a.classList.add('gone'); btn.classList.add('gone');
      L.mDone++;
      if (L.mDone === e.items.length) {
        e.items.forEach((it) => remember(it.id, !L.mErr.has(it.id)));
        L.total++; L.right++; L.combo++; L.state = 'shown'; save(); tone(true);
        showFeedback({ ok: true, note: L.mErr.size ? 'Все пары найдены. Ошибки учтены в повторении.' : '' });
      }
    } else {
      L.mErr.add(a.dataset.id); L.mErr.add(btn.dataset.id);
      [a, btn].forEach((b) => { b.classList.add('wrong'); setTimeout(() => b.classList.remove('wrong'), 400); });
      tone(false);
    }
  }

  // ---------- События ----------
  document.addEventListener('click', (ev) => {
    const sb = ev.target.closest('[data-say]');
    if (sb) { say(sb.dataset.say, !!sb.dataset.slow); return; }
    const b = ev.target.closest('[data-act]');
    if (!b) return;
    const act = b.dataset.act;
    switch (act) {
      case 'tab': tab = b.dataset.tab; resetArmed = false; renderHome(); document.getElementById('scroll').scrollTop = 0; break;
      case 'tip': showTip(+b.dataset.unit); break;
      case 'lesson': if (unlocked(b.dataset.key)) startLesson(b.dataset.key); break;
      case 'practice': startPractice(); break;
      case 'sound': S.sound = !S.sound; save(); b.setAttribute('aria-checked', S.sound); break;
      case 'reset': resetArmed = true; renderHome(); break;
      case 'reset-no': resetArmed = false; renderHome(); break;
      case 'reset-yes': S = fresh(); save(); resetArmed = false; tab = 'course'; renderHome(); break;
      case 'home': renderHome(); break;
      case 'quit':
        if (L.quitArmed) { L = null; renderHome(); break; }
        L.quitArmed = true; b.classList.add('armed'); b.textContent = 'Выйти?';
        setTimeout(() => { if (L && b.isConnected) { L.quitArmed = false; b.classList.remove('armed'); b.textContent = '×'; } }, 3000);
        break;
      case 'opt': {
        if (L.state !== 'ask') break;
        document.querySelectorAll('.opts .opt').forEach((o) => o.classList.toggle('sel', o === b));
        L.sel = b.dataset.id;
        const e = L.q[L.i];
        if (e.t === 'pick' && e.dir === 'ru') say(BY_ID[b.dataset.id].es);
        document.getElementById('checkbtn').disabled = false;
        break;
      }
      case 'm': onMatch(b); break;
      case 'tile': if (L.state === 'ask') { L.placed.push(b.dataset.k); say(b.textContent); renderBuild(); } break;
      case 'untile': if (L.state === 'ask') { L.placed = L.placed.filter((k) => k !== b.dataset.k); renderBuild(); } break;
      case 'acc': {
        const ta = document.getElementById('ans');
        const s = ta.selectionStart, en = ta.selectionEnd;
        ta.value = ta.value.slice(0, s) + b.dataset.c + ta.value.slice(en);
        ta.focus(); ta.selectionStart = ta.selectionEnd = s + 1;
        document.getElementById('checkbtn').disabled = !ta.value.trim();
        break;
      }
      case 'check': check(); break;
      case 'next': next(); break;
    }
  });

  document.addEventListener('keydown', (ev) => {
    if (!L || ev.target.id === 'ans' || ev.target.id === 'dict-search') return;
    if (ev.key === 'Enter') {
      const btn = document.querySelector('#foot .btn:not(:disabled)');
      if (btn && document.activeElement !== btn) { ev.preventDefault(); btn.click(); }
    } else if (/^[1-4]$/.test(ev.key) && L.state === 'ask') {
      const o = document.querySelectorAll('.opts .opt')[+ev.key - 1];
      if (o) o.click();
    }
  });

  renderHome();

  if ('serviceWorker' in navigator && location.protocol === 'https:' && document.querySelector('link[rel="manifest"]')) {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  }
})();
