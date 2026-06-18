'use strict';

// ============================================================
// 英検3級 Speaking Simulator v2
// 公式の二次試験フローに準拠:
//   挨拶→黙読(20秒)→音読→Q1(パッセージ)→Q2-Q3(イラスト)
//   →カード裏返し→Q4-Q5(自分のこと)→採点
// ============================================================

// ── 問題データ ──────────────────────────────────────────
const QUESTION_SETS = [
  {"id":"01","title":"Cycling in Denmark","emoji":"🚲","image":"assets/01_illustration.jpg",
   "passage":"In Denmark, many people ride bicycles. Cycling is part of their daily life. There are special roads for bicycles in cities. About nine out of ten people in Copenhagen have a bicycle. They ride to work, to school, and to shops. Riding a bicycle is good for their health and the environment.",
   "passage_q":{"q":"How many people in Copenhagen have a bicycle?","a":"About nine out of ten people have a bicycle.","keywords":["nine","ten","copenhagen"]},
   "illustration_qs":[
     {"q":"Now, please look at the picture. What is the woman doing?","a":"She is riding a bicycle.","keywords":["riding","bicycle","bike"]},
     {"q":"How many bicycles are there in the picture?","a":"There are three bicycles.","keywords":["three","3"]}
   ],
   "personal_qs":[
     {"q":"Do you have a bicycle?","a":"Yes, I do. / No, I don't.","keywords":["yes","no","have"]},
     {"q":"What do you usually do on weekends?","a":"I usually play sports / watch TV / study.","keywords":["usually","play","watch","study","weekend"]}
   ]},
  {"id":"02","title":"Street Dance","emoji":"💃","image":"assets/02_illustration.jpg",
   "passage":"Dancing is popular in Japan. Many young people enjoy street dance. They dance in parks and on the streets. Some people join dance groups and practice together. There are dance contests for high school students. Dancing is good exercise and it is a fun way to make friends.",
   "passage_q":{"q":"Where do young people dance?","a":"They dance in parks and on the streets.","keywords":["parks","streets","dance"]},
   "illustration_qs":[
     {"q":"Now, please look at the picture. What are the people doing?","a":"They are dancing.","keywords":["dancing","dance"]},
     {"q":"How many people are in the picture?","a":"There are four people.","keywords":["four","4"]}
   ],
   "personal_qs":[
     {"q":"Do you like dancing?","a":"Yes, I do. / No, I don't.","keywords":["yes","no","like"]},
     {"q":"What is your favorite subject at school?","a":"My favorite subject is math / English / science.","keywords":["favorite","subject","math","english","science"]}
   ]},
  {"id":"03","title":"Soccer in England","emoji":"⚽","image":"assets/03_illustration.jpg",
   "passage":"England has the most popular soccer league in the world. Many people go to stadiums to watch soccer games on weekends. Some fans travel a long way to see their favorite teams. People also watch games on TV at home or at sports bars. Soccer brings people together and they enjoy talking about the games.",
   "passage_q":{"q":"What do many people do on weekends in England?","a":"They go to stadiums to watch soccer games.","keywords":["stadiums","watch","soccer","games","weekends"]},
   "illustration_qs":[
     {"q":"Now, please look at the picture. What is the boy doing?","a":"He is kicking a soccer ball.","keywords":["kicking","soccer","ball","playing"]},
     {"q":"What is the boy wearing?","a":"He is wearing a soccer uniform.","keywords":["wearing","uniform","shirt","shoes"]}
   ],
   "personal_qs":[
     {"q":"Do you play any sports?","a":"Yes, I play soccer / baseball / tennis.","keywords":["yes","play","soccer","baseball","tennis","sports"]},
     {"q":"What do you do after school?","a":"I do my homework / play with friends.","keywords":["homework","play","practice","friends","after","school"]}
   ]},
  {"id":"04","title":"YouTube on Smartphones","emoji":"📱","image":"assets/04_illustration.jpg",
   "passage":"Today, many people watch videos on their smartphones. YouTube is one of the most popular websites. People watch music videos, cooking programs, and funny animal videos. Some people make their own videos and share them online. Many young people watch YouTube every day for fun and to learn new things.",
   "passage_q":{"q":"What do people watch on YouTube?","a":"They watch music videos, cooking programs, and funny animal videos.","keywords":["music","videos","cooking","animal","watch"]},
   "illustration_qs":[
     {"q":"Now, please look at the picture. What is the girl doing?","a":"She is watching a video on her smartphone.","keywords":["watching","video","smartphone","phone"]},
     {"q":"Where is the girl sitting?","a":"She is sitting on a sofa.","keywords":["sofa","couch","sitting"]}
   ],
   "personal_qs":[
     {"q":"Do you use a smartphone?","a":"Yes, I do. / No, I don't.","keywords":["yes","no","smartphone","use"]},
     {"q":"What do you do in your free time?","a":"I play games / read books / watch videos.","keywords":["games","read","books","watch","videos","free"]}
   ]},
  {"id":"05","title":"Exercising in the Park","emoji":"🏃","image":"assets/05_illustration.jpg",
   "passage":"Many people exercise in the park. In the morning, you can see people jogging, walking, and doing yoga. Some parks have special equipment for exercise. Exercising outside is good because people can enjoy fresh air and sunshine. It is also a good place to meet friends and talk.",
   "passage_q":{"q":"What can you see people doing in the park in the morning?","a":"You can see people jogging, walking, and doing yoga.","keywords":["jogging","walking","yoga","morning"]},
   "illustration_qs":[
     {"q":"Now, please look at the picture. What are the people doing?","a":"They are exercising / running.","keywords":["exercising","running","jogging"]},
     {"q":"How many people are running?","a":"There are two people running.","keywords":["two","2","running"]}
   ],
   "personal_qs":[
     {"q":"Do you exercise every day?","a":"Yes, I do. / No, I don't.","keywords":["yes","no","exercise","every","day"]},
     {"q":"What sport do you like?","a":"I like soccer / basketball / swimming.","keywords":["like","soccer","basketball","swimming","sport"]}
   ]},
  {"id":"06","title":"Listening to Music","emoji":"🎵","image":"assets/06_illustration.jpg",
   "passage":"Some people listen to music on their smartphones. They listen to music on the train, at home, or while walking. There are many kinds of music, like pop, rock, and classical. Some students listen to music when they study. Music can help people relax and feel happy. It is a big part of daily life.",
   "passage_q":{"q":"Where do people listen to music?","a":"They listen to music on the train, at home, or while walking.","keywords":["train","home","walking","listen","music"]},
   "illustration_qs":[
     {"q":"Now, please look at the picture. What is the boy doing?","a":"He is listening to music.","keywords":["listening","music","earphones","headphones"]},
     {"q":"What is the boy wearing on his ears?","a":"He is wearing headphones / earphones.","keywords":["headphones","earphones","wearing"]}
   ],
   "personal_qs":[
     {"q":"Do you like listening to music?","a":"Yes, I do. / No, I don't.","keywords":["yes","no","like","music"]},
     {"q":"What kind of music do you like?","a":"I like pop / rock / classical music.","keywords":["pop","rock","classical","like","kind","music"]}
   ]},
  {"id":"07","title":"Camping in the Mountains","emoji":"⛺","image":"assets/07_illustration.jpg",
   "passage":"Many Japanese people like camping. In summer, families go to the mountains and stay in tents. They cook food outside and have barbecues. Children can play in the river and catch fish. At night, they look at the stars. Camping is a fun way to enjoy nature and spend time with family.",
   "passage_q":{"q":"What do families do when they go camping?","a":"They cook food outside and have barbecues.","keywords":["cook","food","barbecue","river","play","tent","camping"]},
   "illustration_qs":[
     {"q":"Now, please look at the picture. What can you see in the picture?","a":"I can see a tent / a campfire / mountains.","keywords":["tent","campfire","fire","mountains","trees"]},
     {"q":"How many tents are there?","a":"There is one tent / two tents.","keywords":["one","two","1","2","tent"]}
   ],
   "personal_qs":[
     {"q":"Have you ever been camping?","a":"Yes, I have. / No, I haven't.","keywords":["yes","no","camping","been","have"]},
     {"q":"What do you do in summer vacation?","a":"I go to the beach / visit my grandparents / study.","keywords":["beach","visit","grandparents","study","summer","vacation"]}
   ]},
  {"id":"08","title":"International Food","emoji":"🍴","image":"assets/08_illustration.jpg",
   "passage":"Tokyo has many kinds of restaurants. You can eat Italian, Indian, Chinese, and many other foods. Some people enjoy trying food from different countries. International food is popular because it is fun to taste new flavors. Food festivals are held in Tokyo every year. Many people visit them to enjoy delicious food from around the world.",
   "passage_q":{"q":"Why is international food popular?","a":"Because it is fun to taste new flavors.","keywords":["fun","taste","new","flavors","popular"]},
   "illustration_qs":[
     {"q":"Now, please look at the picture. What are the people doing?","a":"They are eating / having a meal.","keywords":["eating","meal","food","having"]},
     {"q":"What is on the table?","a":"There are plates, food, and drinks on the table.","keywords":["plates","food","drinks","table"]}
   ],
   "personal_qs":[
     {"q":"What is your favorite food?","a":"My favorite food is sushi / pizza / curry.","keywords":["favorite","food","sushi","pizza","curry"]},
     {"q":"Can you cook?","a":"Yes, I can. / No, I can't.","keywords":["yes","no","cook","can"]}
   ]}
];

// ── STATE ──────────────────────────────────────────────
const S = {
  setId: null, answers: [], transcript: '',
  recognition: null, isListening: false,
  timer: null, timeLeft: 0, timerActive: false,
  voices: [], voice: null, rate: 0.85,
  showQuestionText: true  // 質問文の画面表示 ON/OFF
};

// ── UTILITIES ──────────────────────────────────────────
function $(id) { return document.getElementById(id); }
function getSet() { return QUESTION_SETS.find(s => s.id === S.setId); }
function render(html) { $('app').innerHTML = html; }
function esc(s) { return String(s).replace(/'/g, "\\'"); }

// ── INIT ───────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadVoices();
  if (speechSynthesis) speechSynthesis.onvoiceschanged = loadVoices;
  showMenu();
});

// ── VOICES ─────────────────────────────────────────────
function loadVoices() {
  S.voices = speechSynthesis.getVoices().filter(v => v.lang.startsWith('en'));
  const sel = $('voice-select');
  if (!sel) return;
  sel.innerHTML = '';
  S.voices.forEach((v, i) => {
    const o = document.createElement('option');
    o.value = i; o.textContent = v.name + ' (' + v.lang + ')';
    sel.appendChild(o);
  });
  const gi = S.voices.findIndex(v => v.name.includes('Google') && v.lang === 'en-US');
  if (gi >= 0) { sel.value = gi; S.voice = S.voices[gi]; }
  else if (S.voices.length > 0) { sel.value = 0; S.voice = S.voices[0]; }
}
function onVoiceChange() {
  const sel = $('voice-select');
  if (sel && S.voices[sel.value]) { S.voice = S.voices[sel.value]; speak('Hello.'); }
}
function onRateChange(v) {
  S.rate = parseFloat(v);
  const el = $('rate-value'); if (el) el.textContent = v;
}
function onQTextToggle(checked) {
  S.showQuestionText = checked;
  const st = $('qtext-status');
  if (st) st.textContent = checked ? 'ON（練習モード）' : 'OFF（本番モード）';
}

// ── TTS ────────────────────────────────────────────────
function speak(text, onEnd) {
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'en-US'; u.rate = S.rate;
  if (S.voice) u.voice = S.voice;
  const fb = setTimeout(() => { if (onEnd) { onEnd(); onEnd = null; } }, 15000);
  u.onend = () => { clearTimeout(fb); if (onEnd) { onEnd(); onEnd = null; } };
  u.onerror = () => { clearTimeout(fb); if (onEnd) { onEnd(); onEnd = null; } };
  speechSynthesis.speak(u);
}

// ── MICROPHONE PERMISSION (1回だけ許可 → 以降ダイアログなし) ──
S.micStream = null;

async function ensureMicPermission() {
  if (S.micStream) return true;
  try {
    S.micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return true;
  } catch(e) {
    console.warn('Mic permission denied:', e);
    return false;
  }
}

// ── SPEECH RECOGNITION ─────────────────────────────────
// continuous=true で音読などの長時間録音に対応（停止→自動再開）
S._continuous = false;
S._finalT = '';
S._userStopped = false;

function startListening(onResult, continuous) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { showTextInput(onResult); return; }
  if (S.recognition) { try { S.recognition.stop(); } catch(e){} }

  S._continuous = !!continuous;
  S._finalT = '';
  S._userStopped = false;

  function createRec() {
    const r = new SR();
    r.lang = 'en-US'; r.continuous = S._continuous; r.interimResults = true; r.maxAlternatives = 1;

    r.onresult = (e) => {
      let interim = '';
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) S._finalT += t + ' '; else interim += t;
      }
      const el = $('interim-text');
      if (el) el.textContent = S._finalT + interim;
    };
    r.onerror = (e) => {
      if (e.error === 'no-speech') {
        // 連続モードでは無音は正常（無視して再開）
      } else if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
        S._userStopped = true; S.isListening = false; micBtn(false);
        toast('マイクを許可してください'); showTextInput(onResult);
      }
    };
    r.onend = () => {
      // ユーザーが明示的に停止ボタンを押した → 確定
      if (S._userStopped) {
        S.isListening = false; micBtn(false);
        if (S._finalT.trim()) { S.transcript = S._finalT.trim(); onResult(S._finalT.trim()); }
        return;
      }
      // 連続モードでまだ録音中 → 自動再開（Chromeの~60秒タイムアウト対策）
      if (S._continuous && S.isListening) {
        try { r.start(); } catch(e) {
          // 再開失敗時は確定
          S.isListening = false; micBtn(false);
          if (S._finalT.trim()) { S.transcript = S._finalT.trim(); onResult(S._finalT.trim()); }
        }
      } else {
        // 通常モード: そのまま確定
        S.isListening = false; micBtn(false);
        if (S._finalT.trim()) { S.transcript = S._finalT.trim(); onResult(S._finalT.trim()); }
      }
    };
    return r;
  }

  S.recognition = createRec(); S.isListening = true; S._userStopped = false; micBtn(true);
  try { S.recognition.start(); } catch(e) { S.isListening = false; micBtn(false); }
}
function stopListening() {
  S._userStopped = true;
  if (S.recognition) { try { S.recognition.stop(); } catch(e){} }
  S.isListening = false; micBtn(false);
}
function micBtn(rec) {
  const b = $('mic-btn');
  if (!b) return;
  b.textContent = rec ? '⏹ 録音を止める' : '🎤 答える';
  b.className = rec ? 'btn-mic-rec' : 'btn-mic';
}
function showTextInput(onSubmit) {
  if ($('text-fallback')) return;
  const area = $('answer-area'); if (!area) return;
  const d = document.createElement('div');
  d.id = 'text-fallback'; d.style.marginTop = '10px';
  d.innerHTML = '<input type="text" id="text-answer" placeholder="Type in English" style="width:60%;padding:10px;font-size:18px;border-radius:8px;border:2px solid #6C7EE6;background:#1a1a2e;color:#fff">' +
    '<button onclick="submitText()" style="padding:10px 20px;margin-left:8px;background:#6C7EE6;color:#fff;border:none;border-radius:8px;cursor:pointer">送信</button>';
  area.appendChild(d);
  $('text-answer').focus();
  window._textCb = onSubmit;
}
function submitText() {
  const inp = $('text-answer');
  if (!inp || !inp.value.trim()) return;
  S.transcript = inp.value.trim();
  window._textCb(inp.value.trim());
}

// ── TIMER (guide only, no auto-advance) ────────────────
function startTimerGuide(sec) {
  stopTimer(); S.timeLeft = sec; S.timerActive = true; updateTimer();
  S.timer = setInterval(() => {
    S.timeLeft--; updateTimer();
    if (S.timeLeft <= 0) {
      stopTimer();
      // ガイドタイマー：0になったら表示を変えるだけ。強制遷移しない。
      const el = $('timer');
      if (el) { el.textContent = '⏱ 時間の目安です'; el.style.color = '#ff9800'; }
    }
  }, 1000);
}
// 黙読だけは強制遷移あり（公式通り20秒）
function startTimerStrict(sec, onEnd) {
  stopTimer(); S.timeLeft = sec; S.timerActive = true; updateTimer();
  S.timer = setInterval(() => {
    S.timeLeft--; updateTimer();
    if (S.timeLeft <= 0) { stopTimer(); if (onEnd) onEnd(); }
  }, 1000);
}
function stopTimer() { if (S.timer) { clearInterval(S.timer); S.timer = null; } S.timerActive = false; }
function updateTimer() {
  const el = $('timer');
  if (!el) return;
  el.textContent = '⏱ ' + S.timeLeft + 's';
  el.style.color = S.timeLeft <= 5 ? '#ff4444' : S.timeLeft <= 15 ? '#ff9800' : '#4CAF50';
}

// ── UI HELPERS ─────────────────────────────────────────
function toast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}
function bar(pct) { return '<div class="bar"><div class="fill" style="width:' + pct + '%"></div></div>'; }
function illustHtml(set) {
  return '<div class="illust-box">' +
    '<img src="' + set.image + '" alt="Illustration" class="illust-img" ' +
    'onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'">' +
    '<div class="illust-placeholder" style="display:none">' +
    '<span style="font-size:48px">🖼️</span>' +
    '<p>画像を配置してください</p>' +
    '<p class="path">' + set.image + '</p></div></div>';
}

// 質問文を表示するか（本番モードでは非表示、音声のみ）
function qtextHtml(q) {
  return S.showQuestionText ? '<p class="qtext">' + q.q + '</p>' : '<p class="qtext-hidden">🔊 耳をすませて問題を聞いてください</p>';
}

// ============================================================
//  SCREEN: MENU
// ============================================================
function showMenu() {
  stopTimer(); stopListening(); S.answers = [];
  let cards = '';
  QUESTION_SETS.forEach(s => {
    cards += '<div class="set-card" onclick="startTest(\'' + s.id + '\')">' +
      '<div class="set-emoji">' + s.emoji + '</div>' +
      '<div class="set-title">' + s.title + '</div>' +
      '<div class="set-info">音読 + 5 Questions</div></div>';
  });
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  render(
    '<div class="screen">' +
    '<h1>🎓 英検3級<br>Speaking Simulator</h1>' +
    '<div class="settings">' +
    '<label>🔊 Voice: <select id="voice-select" onchange="onVoiceChange()"></select></label>' +
    '<label>🐢 Speed: <input type="range" id="rate-slider" min="0.5" max="1.2" step="0.05" value="0.85" onchange="onRateChange(this.value)"> <span id="rate-value">0.85</span></label>' +
    '</div>' +
    '<div class="toggle-row">' +
    '<span class="toggle-label">📝 質問文を画面に表示</span>' +
    '<label class="switch"><input type="checkbox" id="qtext-toggle" onchange="onQTextToggle(this.checked)" checked><span class="slider"></span></label>' +
    '<span id="qtext-status" class="toggle-status">ON（練習モード）</span>' +
    '</div>' +
    (SR ? '' : '<div class="warn">⚠️ Chrome推奨。他ブラウザはテキスト入力になります。</div>') +
    '<p class="hint">問題セットをえらんでね👇</p>' +
    '<div class="grid">' + cards + '</div>' +
    '</div>'
  );
  loadVoices();
}

// ============================================================
//  STAGE 1: WARMUP (採点なし)
// ============================================================
async function startTest(id) {
  S.setId = id; S.answers = [];
  // セッション開始時に1回だけマイク許可を取る（以降ダイアログなし）
  render('<div class="screen"><div class="label">🔊 マイクを準備中...</div><p style="text-align:center;color:#8899aa;padding:20px">マイクの使用を許可してください。<br>この許可は1回だけです。</p></div>');
  const ok = await ensureMicPermission();
  if (!ok) {
    toast('⚠️ マイクが使えません。テキスト入力モードになります');
  }
  showWarmup();
}

function showWarmup() {
  render(
    bar(5) +
    '<div class="screen">' +
    '<div class="label">😊 ウォーミングアップ</div>' +
    '<div class="bubble" id="warmup-text"></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micWarmup()">🎤 答える</button></div>' +
    '<button class="btn-go" id="next-btn" style="display:none" onclick="showGreeting()">次へ →</button></div>'
  );
  const greet = "Hello. How are you today?";
  let i = 0;
  const el = $('warmup-text');
  const typer = setInterval(() => {
    if (i < greet.length) { el.textContent += greet[i]; i++; } else clearInterval(typer);
  }, 40);
  speak(greet);
  S.warmupDone = false;
}

function micWarmup() {
  if (S.isListening) {
    stopListening();
    if (S.transcript) {
      S.answers.push({type:'warmup', q:'How are you today?', a:S.transcript});
      toast('✅ OK! リラックスしてね😊');
      $('next-btn').style.display = 'block';
    }
  } else {
    S.transcript = '';
    startListening((t) => {
      S.answers.push({type:'warmup', q:'How are you today?', a:t});
      toast('✅ OK! リラックスしてね😊');
      $('next-btn').style.display = 'block';
    });
  }
}

// ============================================================
//  STAGE 2: GREETING + SILENT READING (20秒・強制遷移)
// ============================================================
function showGreeting() {
  stopListening();
  const s = getSet();
  render(
    bar(10) +
    '<div class="screen">' +
    '<div class="big-emoji">' + s.emoji + '</div>' +
    '<h2>' + s.title + '</h2>' +
    '<div class="bubble" id="greeting-text"></div>' +
    '<button class="btn-go" id="go-btn" style="display:none" onclick="showSilentReading()">問題文を見る →</button></div>'
  );
  const msg = "Now, here is your passage. Please read it silently for twenty seconds.";
  let i = 0;
  const el = $('greeting-text');
  const typer = setInterval(() => {
    if (i < msg.length) { el.textContent += msg[i]; i++; } else clearInterval(typer);
  }, 35);
  speak(msg, () => { const b = $('go-btn'); if (b) b.style.display = 'block'; });
  setTimeout(() => { const b = $('go-btn'); if (b) b.style.display = 'block'; }, 8000);
}

function showSilentReading() {
  const s = getSet();
  render(
    bar(15) +
    '<div class="screen">' +
    '<div class="label">📖 黙読 (20秒)</div>' +
    '<div id="timer">⏱ 20s</div>' +
    '<div class="passage">' + s.passage + '</div>' +
    illustHtml(s) +
    '<p class="hint">📝 声に出さずに読んでください</p></div>'
  );
  startTimerStrict(20, () => showReadingAloud());
}

// ============================================================
//  STAGE 3: READING ALOUD (タイマーなし・ボタンで次へ)
// ============================================================
function showReadingAloud() {
  const s = getSet();
  render(
    bar(25) +
    '<div class="screen">' +
    '<div class="label">🎤 音読 — 声に出して読んで</div>' +
    '<div class="passage">' + s.passage + '</div>' +
    illustHtml(s) +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micReading()">🎤 音読する</button></div>' +
    '<button class="btn-go" onclick="goQ1()">読み終わった！次へ →</button></div>'
  );
  speak('Now, please read the passage aloud.');
}

function micReading() {
  if (S.isListening) {
    stopListening();
    if (S.transcript) {
      S.answers.push({type:'reading', q:'(Reading)', a:S.transcript});
      toast('✅ 音読を記録');
    }
  } else {
    S.transcript = '';
    startListening((t) => {
      S.answers.push({type:'reading', q:'(Reading)', a:t});
      toast('✅ 音読を記録');
    }, true); // ← 連続モード: 長時間録音ON
  }
}

// ============================================================
//  STAGE 4: Q1 — Passage Question
// ============================================================
function goQ1() {
  stopListening();
  const s = getSet();
  const q = s.passage_q;
  render(
    bar(35) +
    '<div class="screen">' +
    '<div class="label">📝 質問 1 / 5 — パッセージ</div>' +
    '<div id="timer">⏱ 40s</div>' +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().passage_q.q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'passage\',0)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'passage\',0)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

// ============================================================
//  STAGE 5: Q2-Q3 — Illustration Questions
// ============================================================
function goQ2() {
  stopListening();
  const s = getSet();
  const q = s.illustration_qs[0];
  render(
    bar(45) +
    '<div class="screen">' +
    '<div class="label">🖼️ 質問 2 / 5 — イラスト</div>' +
    '<div id="timer">⏱ 40s</div>' +
    illustHtml(s) +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().illustration_qs[0].q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'illust\',0)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'illust\',0)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

function goQ3() {
  stopListening();
  const s = getSet();
  const q = s.illustration_qs[1];
  render(
    bar(55) +
    '<div class="screen">' +
    '<div class="label">🖼️ 質問 3 / 5 — イラスト</div>' +
    '<div id="timer">⏱ 40s</div>' +
    illustHtml(s) +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().illustration_qs[1].q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'illust\',1)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'illust\',1)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

// ============================================================
//  CARD FLIP (Q3 → Q4)
// ============================================================
function showCardFlip(afterFn) {
  stopListening(); stopTimer();
  render(
    bar(65) +
    '<div class="screen card-flip">' +
    '<div class="big-emoji">🔄</div>' +
    '<h2>問題カードを裏返してください</h2>' +
    '<div class="bubble">ここから先は問題カードを見ずに答えてください。</div>' +
    '<button class="btn-go" onclick="' + (afterFn.name || 'goQ4') + '()">次へ →</button></div>'
  );
  speak('Please turn over the card.');
}

// ============================================================
//  STAGE 6: Q4-Q5 — Personal Questions
// ============================================================
function goQ4() {
  stopListening();
  const s = getSet();
  const q = s.personal_qs[0];
  render(
    bar(75) +
    '<div class="screen">' +
    '<div class="label">🙋 質問 4 / 5 — あなたのこと</div>' +
    '<div id="timer">⏱ 40s</div>' +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().personal_qs[0].q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'personal\',0)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'personal\',0)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

function goQ5() {
  stopListening();
  const s = getSet();
  const q = s.personal_qs[1];
  render(
    bar(90) +
    '<div class="screen">' +
    '<div class="label">🙋 質問 5 / 5 — あなたのこと</div>' +
    '<div id="timer">⏱ 40s</div>' +
    '<div class="qbox">' + qtextHtml(q) +
    '<button class="btn-replay" onclick="speak(getSet().personal_qs[1].q)">🔊 もう一度聞く</button></div>' +
    '<div id="answer-area"><div id="interim-text" class="interim"></div>' +
    '<button class="btn-mic" id="mic-btn" onclick="micQ(\'personal\',1)">🎤 答える</button></div>' +
    '<button class="btn-skip" onclick="skipQ(\'personal\',1)">スキップ →</button></div>'
  );
  speak(q.q);
  startTimerGuide(40);
}

// ============================================================
//  MIC/SKIP — Universal Q handler
// ============================================================
function micQ(cat, idx) {
  if (S.isListening) {
    stopListening();
    if (S.transcript) submitQ(cat, idx, S.transcript);
  } else {
    S.transcript = '';
    startListening((t) => submitQ(cat, idx, t));
  }
}

function submitQ(cat, idx, text) {
  S.answers.push({type:'q', cat:cat, idx:idx, a:text});
  toast('✅ 回答記録');
  advanceQ(cat, idx);
}

function skipQ(cat, idx) {
  stopListening(); stopTimer();
  S.answers.push({type:'q', cat:cat, idx:idx, a:'(スキップ)'});
  advanceQ(cat, idx);
}

function advanceQ(cat, idx) {
  stopTimer();
  // 少し待ってから次へ
  setTimeout(() => {
    if (cat === 'passage')      goQ2();
    else if (cat === 'illust' && idx === 0) goQ3();
    else if (cat === 'illust' && idx === 1) showCardFlip(goQ4);
    else if (cat === 'personal' && idx === 0) goQ5();
    else if (cat === 'personal' && idx === 1) showResults();
  }, 700);
}

// ============================================================
//  RESULTS
// ============================================================
function score(userAns, keywords) {
  if (!userAns || userAns === '(スキップ)') return {stars:0, hit:[], miss:keywords};
  const ul = userAns.toLowerCase();
  const hit = [], miss = [];
  keywords.forEach(k => { ul.includes(k.toLowerCase()) ? hit.push(k) : miss.push(k); });
  const ks = keywords.length > 0 ? hit.length / keywords.length : 0;
  const wc = Math.min(userAns.split(/\s+/).filter(w=>w).length / 4, 1);
  const total = ks * 0.65 + wc * 0.35;
  const stars = total >= 0.6 ? 3 : total >= 0.35 ? 2 : total > 0 ? 1 : 0;
  return {stars, hit, miss};
}

function showResults() {
  const s = getSet(); stopTimer(); stopListening();
  let total = 0, max = 0, html = '';

  html += bar(100) + '<div class="screen"><h2>🏆 結果</h2>';

  // Reading (informational, not scored in stars)
  const rd = S.answers.find(a => a.type==='reading');
  const rua = rd ? rd.a : '(未記録)';
  const rwc = rua === '(未記録)' ? 0 : Math.min(rua.split(/\s+/).filter(w=>w).length, s.passage.split(/\s+/).length);
  const rPct = s.passage.split(/\s+/).length > 0 ? Math.round(rwc / s.passage.split(/\s+/).length * 100) : 0;
  html += '<div class="rsection"><h3>📖 音読</h3>' +
    '<div class="rcard ' + (rPct >= 70 ? 'good' : rPct >= 40 ? 'ok' : 'bad') + '">' +
    '<div class="rua">あなた: ' + (rua.length > 80 ? rua.substring(0,80) + '...' : rua) + '</div>' +
    '<div class="rhit">読めた単語数: ' + rwc + ' / ' + s.passage.split(/\s+/).length + ' (' + rPct + '%)</div></div></div>';

  // All 5 questions
  const allQ = [
    {label:'Q1 (パッセージ)', q:s.passage_q, cat:'passage', idx:0},
    {label:'Q2 (イラスト)', q:s.illustration_qs[0], cat:'illust', idx:0},
    {label:'Q3 (イラスト)', q:s.illustration_qs[1], cat:'illust', idx:1},
    {label:'Q4 (あなたのこと)', q:s.personal_qs[0], cat:'personal', idx:0},
    {label:'Q5 (あなたのこと)', q:s.personal_qs[1], cat:'personal', idx:1}
  ];

  html += '<div class="rsection"><h3>📝 質問への回答</h3>';
  allQ.forEach(item => {
    const ans = S.answers.find(a => a.type==='q' && a.cat===item.cat && a.idx===item.idx);
    const ua = ans ? ans.a : '(未回答)';
    const sc = score(ua, item.q.keywords);
    total += sc.stars; max += 3;
    const cls = sc.stars >= 2 ? 'good' : sc.stars >= 1 ? 'ok' : 'bad';
    html += '<div class="rcard ' + cls + '">' +
      '<div class="rq">' + item.label + '</div>' +
      '<div class="rqtext">' + item.q.q + '</div>' +
      '<div class="rstars">' + '⭐'.repeat(sc.stars) + '☆'.repeat(3-sc.stars) + '</div>' +
      '<div class="rua">あなた: ' + ua + '</div>' +
      '<div class="rma">模範: ' + item.q.a + '</div>' +
      (sc.hit.length ? '<div class="rhit">✅ ' + sc.hit.join(', ') + '</div>' : '') +
      (sc.miss.length ? '<div class="rmiss">💡 ' + sc.miss.join(', ') + '</div>' : '') +
      '</div>';
  });
  html += '</div>';

  // Total
  const pct = max > 0 ? Math.round(total / max * 100) : 0;
  const grade = pct >= 80 ? '素晴らしい！🎉' : pct >= 60 ? 'よくできました！👍' : pct >= 40 ? 'もう少し練習 💪' : 'がんばろう！📚';
  html += '<div class="total"><div class="tnum">' + total + ' / ' + max + '</div>' +
    '<div class="tpct">' + pct + '%</div><div class="tgrade">' + grade + '</div></div>' +
    '<button class="btn-go" onclick="showMenu()">メニューに戻る</button></div>';

  render(html);
}
