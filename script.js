(function () {

  function HS() { try { return (typeof State !== 'undefined' && State && State.variables) ? State : null; } catch (e) { return null; } }
  function hsVars() { var s = HS(); return s ? s.variables : null; }

  (function purgeGarbage() {
    try {
      var bad = [];
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf('ddx_') === 0) {
          var cat = k.split('_').slice(2).join('_');
          if (cat !== 'main' && cat !== 'shin') bad.push(k);
        }
      }
      bad.forEach(function (k) { localStorage.removeItem(k); });
    } catch (e) {}
  })();

  var TRACKS = {
    'darkness-time': { url: 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/Darkness%20Time.mp3', loop: true },
    'beautiful-lie': { url: 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/New%20Danganronpa%20V3%20O.S.T.%20White%20-%2012.%20Beautiful%20Lie%20(Full).mp3', loop: true },
    'cool-morning':  { url: 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/Cool%20Morning.mp3', loop: true },
    'xebeth':        { url: 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/%E3%83%A2%E3%83%8E%E3%82%AF%E3%83%9E%E5%85%88%E7%94%9F%E3%81%AE%E6%8E%88%E6%A5%ADV3.mp3', loop: true },
    'shin-morning':   { url: 'https://github.com/hwhyssjej/game-audio/raw/c902ef9f296391bef325a58d4d32aa28d60fc490/Beautiful%20Tranquility.mp3', loop: true },
    'shin-discovery': { url: 'https://github.com/hwhyssjej/game-audio/raw/c902ef9f296391bef325a58d4d32aa28d60fc490/Body%20Discovery%201.mp3', loop: false },
    'shin-warmbody':  { url: 'https://github.com/hwhyssjej/game-audio/raw/c902ef9f296391bef325a58d4d32aa28d60fc490/Warm%20Body%20-%20Project%20Edens%20Garden%20%E3%80%8C%E6%A8%A1%E5%80%A3%E3%80%8D%20(Official%20Audio).mp3', loop: true },
    'shin-isolation': { url: 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/Isolation.mp3', loop: true },
    'ultimates':      { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/symryrnp/1-03.%20Rise%20of%20the%20Ultimates.mp3', loop: true },
    'investigation':  { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/wcwaldie/1-17.%20Despair%20Searching.mp3', loop: true },
    'locker':         { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/ztwyfgph/1-11.%20Nightmare%20in%20the%20Locker.mp3', loop: true },
    'lazy-world':     { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/rggjfxxw/2-11.%20Living%20in%20a%20Lazy%20Parallel%20World%20%28Short%20Ver.%29.mp3', loop: true },
    'new-world':          { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/yrpwrsmg/1-22.%20New%20World%20Order%20V3.mp3', loop: true },
    'trial-preparation':  { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/xkfxwoei/1-07.%20Our%20Class%20Trial.mp3', loop: true },
    'hell':  { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/yecatrew/1-23.%20Heaven%20of%20Almost%20Hell.mp3', loop: true },
    'trial-dawn': { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/adokiler/1-08.%20Class%20Trial%20-%20Dawn%20Edition%20Vol.3.mp3', loop: true },
    'nsd-argument': { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/ljmhblby/1-11.%20V3%20Argument%20-Break-.mp3', loop: true },
    'nsd-perjury':  { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/zdulvxyy/1-20.%20V3%20Argument%20-Perjury-.mp3', loop: true },
    'nsd-bladelock': { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/xbqacnjd/1-18.%20V3%20Argument%20-Blade%20Lock-.mp3', loop: true },
    'nsd-space':     { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/tshkchbo/1-09.%20Class%20Trial%20-%20Space%20Edition.mp3', loop: true },
    'resurrection':  { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/oeeknhxq/1-10.%20Class%20Trial%20-%20Resurrection%20Edition.mp3', loop: true },
    'resurrection-nointro': { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/tymojckt/2-09.%20Class%20Trial%20-%20Resurrection%20Edition%20%28No%20Intro%29.mp3', loop: true },
    'sun-edition':   { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/ljqzywoc/1-13.%20Class%20Trial%20-%20Sun%20Edition%20V3.mp3', loop: true },
    'nsd-panic':     { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/dxamgwqo/1-15.%20V3%20Argument%20-Panic-.mp3', loop: true },
    'nsd-heat':      { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/xfjcnfny/1-14.%20V3%20Argument%20-Turn%20Up%20the%20Heat-.mp3', loop: true },
    'sun-edition-b': { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/qtxfkilg/1-19.%20Class%20Trial%20-%20Sun%20Edition%20V3%20%28Ver.B%29.mp3', loop: true },
    // Вступление тянется до 32-й секунды и звучит ровно один раз — под него
    // идёт вся заставка схватки. Дальше тема крутится с loopStart.
    'nsd-scrum':     { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/owuhainp/1-12.%20Debate%20Scrum.mp3', loop: true, loopStart: 32 },
    // ---- третья глава, вторая половина суда ----
    'new-classmates': { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/xoeekkuv/2-08.%20New%20Classmates%20of%20the%20Dead.mp3', loop: true },
    'lazy-parallel':  { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/umejjrfc/1-16.%20Living%20in%20a%20Lazy%20Parallel%20World.mp3', loop: true },
    'nsd-final-aa':   { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/afbsgfiz/1-21.%20Final%20a.A..mp3', loop: true },
    'reenactment':    { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/cgagfibf/2-23.%20Climatic%20Re-Enactment%20V3.mp3', loop: true },
    'closing-argument': { url: 'https://lambda.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-white/cxivgubb/2-22.%20Closing%20Argument%20V3.mp3', loop: true },
    'heartless':      { url: 'https://jetta.vgmtreasurechest.com/soundtracks/new-danganronpa-v3-o.s.t.-black/oeccbbci/2-13.%20Heartless%20Journey.mp3', loop: true },
    // Наказание играет один раз и не заводится по кругу
    'punishment-rocket': { url: 'https://vgmtreasurechest.com/soundtracks/danganronpa-trigger-happy-havoc-original-soundtrack/vbtpubzu/1-03%20Punishment%20Rocket.mp3', loop: false }
  };

  if (!window.bgAudio) {
    window.bgAudio = document.createElement('audio');
    window.bgAudio.loop = true;
    window.bgAudio.volume = 0;
    window.bgAudio.id = 'bg-music';
    document.body.appendChild(window.bgAudio);
    window.currentTrack = '';
    window.currentTagsKey = null;
    window.isMuted = false;
  }
  var FADE_STEP = 0.015, FADE_INTERVAL = 50, MAX_VOLUME = 0.6;

  function fadeAudio(direction, onComplete) {
    // Сцена намеренно увела музыку в тишину — не поднимаем её обратно,
    // пока сцена сама не сменит тему. Иначе startTrack через секунду
    // выводил громкость назад на полную.
    if (direction !== 'out' && window.nsdHush) return;
    clearInterval(window.fadeTimer);
    window.fadeTimer = setInterval(function () {
      var vol = window.bgAudio.volume;
      if (direction === 'out') {
        vol = Math.max(0, vol - FADE_STEP);
        window.bgAudio.volume = vol;
        if (vol <= 0) { clearInterval(window.fadeTimer); window.bgAudio.pause(); if (onComplete) onComplete(); }
      } else {
        var target = window.isMuted ? 0 : MAX_VOLUME;
        vol = Math.min(target, vol + FADE_STEP);
        window.bgAudio.volume = vol;
        if (vol >= target) clearInterval(window.fadeTimer);
      }
    }, FADE_INTERVAL);
  }
  function startTrack(trackObj) {
    window.currentTrack = trackObj.url;
    var ready = window.nsdAudioFor && window.nsdAudioFor(trackObj.url);
    if (ready && ready !== window.bgAudio) {
      window.bgAudio.pause();
      window.bgAudio = ready;
      try { window.bgAudio.currentTime = 0; } catch (e) {}
    } else if (!ready) {
      window.bgAudio.src = trackObj.url;
    }
    window.bgAudio.loop = trackObj.loop;
    window.bgAudio.volume = 0;
    var p = window.bgAudio.play();
    if (p !== undefined) {
      p.then(function () { fadeAudio('in'); }).catch(function () {
        var retry = function () { window.bgAudio.play().then(function () { fadeAudio('in'); }).catch(function () {}); document.removeEventListener('click', retry); };
        document.addEventListener('click', retry);
      });
    }
  }
  // src не снимаем: элемент может быть припасённой темой, и сброс src
  // выбросил бы весь её буфер.
  function stopTrack() { fadeAudio('out', function () { window.currentTrack = ''; try { window.bgAudio.currentTime = 0; } catch (e) {} }); }
  function playTrack(trackObj) {
    var u = trackObj ? trackObj.url : null;
    if (u === window.currentTrack) return;
    if (trackObj === null) { if (window.currentTrack !== '') stopTrack(); return; }
    if (window.currentTrack === '') startTrack(trackObj);
    else fadeAudio('out', function () { startTrack(trackObj); });
  }

  if (!window.shockFlash) { window.shockFlash = document.createElement('div'); window.shockFlash.id = 'shock-flash'; document.body.appendChild(window.shockFlash); }
  if (!window.shockVignette) { window.shockVignette = document.createElement('div'); window.shockVignette.id = 'shock-vignette'; document.body.appendChild(window.shockVignette); }
  function updateShockEffects(tagsAttr) {
    var has = tagsAttr.indexOf('shock') !== -1;
    if (has) {
      window.shockVignette.style.transition = 'none'; window.shockVignette.style.opacity = '1';
      window.shockFlash.classList.remove('flash-active'); void window.shockFlash.offsetWidth; window.shockFlash.classList.add('flash-active');
      document.documentElement.classList.remove('shock-desaturate'); void document.documentElement.offsetWidth; document.documentElement.classList.add('shock-desaturate');
      setTimeout(function () { document.documentElement.classList.remove('shock-desaturate'); }, 450);
    } else { window.shockVignette.style.transition = 'opacity 1.8s ease'; window.shockVignette.style.opacity = '0'; }
  }
  function checkAndPlay() {
    var tp = document.querySelector('tw-passage');
    if (!tp || tp === window.lastPassageNode) return;
    window.lastPassageNode = tp;
    var tagsAttr = tp.getAttribute('tags') || '';
    window.currentTagsKey = tagsAttr;
    updateShockEffects(tagsAttr);
    var track = null;
    for (var k in TRACKS) { if (k.indexOf('nsd-') === 0) continue; if (tagsAttr.indexOf(k) !== -1) { track = TRACKS[k]; break; } }
    playTrack(track);
  }

  function applyLetterShake() {
    document.querySelectorAll('.letter-shake:not([data-shaken])').forEach(function (el) {
      el.setAttribute('data-shaken', 'true');
      var text = el.textContent; el.textContent = '';
      for (var i = 0; i < text.length; i++) { var s = document.createElement('span'); s.textContent = text[i]; s.style.animationDelay = (-Math.random() * 0.4) + 's'; s.style.animationDuration = (0.22 + Math.random() * 0.25) + 's'; el.appendChild(s); }
    });
  }
  var GLITCH_CHARS = '█▓▒░@#%&*01', MS_PER_CHAR = 28;
  function animateGlitchNode(span, finalText, onDone) {
    var dur = Math.max(300, finalText.length * MS_PER_CHAR), st = null;
    function frame(ts) {
      if (!st) st = ts;
      var p = Math.min(1, (ts - st) / dur), rc = Math.floor(p * finalText.length), out = '';
      for (var i = 0; i < finalText.length; i++) out += (i < rc || finalText[i] === ' ') ? finalText[i] : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
      span.textContent = out;
      if (p < 1) requestAnimationFrame(frame); else { span.textContent = finalText; if (onDone) onDone(); }
    }
    requestAnimationFrame(frame);
  }
  function animateGlitchSequence(spans, texts, i) { if (i >= spans.length) return; animateGlitchNode(spans[i], texts[i], function () { animateGlitchSequence(spans, texts, i + 1); }); }
  function applyGlitchDecode() {
    document.querySelectorAll('.glitch-decode:not([data-glitched])').forEach(function (c) {
      c.setAttribute('data-glitched', 'true');
      var w = document.createTreeWalker(c, NodeFilter.SHOW_TEXT, null, false), tn = [], n;
      while ((n = w.nextNode())) if (n.textContent.trim().length) tn.push(n);
      var sp = [], tx = [];
      tn.forEach(function (t) { var s = document.createElement('span'); t.parentNode.replaceChild(s, t); sp.push(s); tx.push(t.textContent); });
      animateGlitchSequence(sp, tx, 0);
    });
  }

  var CLUE_DATA_JS = {
    "vent": { title: "Крышка вентиляции", desc: "Крышка вентиляции в комнате видеонаблюдения снята. На раме присутствуют порезы от ножа." },
    "audio": { title: "Диктофон", desc: "Диктофон был найден во внутренней стороне бедра Фусту, приклеенный медицинским скотчем.<br><br>На записи:<br>0:00–0:02 — Шаги Фусту<br>0:02–0:03 — «Лязг»<br>0:03–0:05 — Крик Фусту и глухой удар<br>0:06 — «Щелчок»<br><br>Полина удтверждает, что диктофон отключился сам из-за ошибки низкого заряда." },
    "socket": { title: "След в розетке", desc: "Вокруг отверстий розетки видны следы сажи. Это может свидетельствовать о дуговом разряде." },
    "gloves": { title: "Резиновые перчатки", desc: "В мусорном ведре комнаты с камерами были найдены резиновые перчатки. Одна из них была порвана в районе запястья." },
    "blood": { title: "Капли крови", desc: "Рядом с дверью комнаты с камерами были найдены две мелкие капли засохшей крови." },
    "bags": { title: "Рваные пакеты", desc: "В мусорном ведре ТВ-комнаты были найдены два рваных мусорных пакета и остатки скотча. На пакетах было обильное количество пыли." },
    "null-location": { title: "Местонахождение Нулл", desc: "Нулл рассказывает, что около 2:30 часов ночи услышала щелчок щитка, а свет в баре погас. Она поднялась и вернула свет обратно.<br><br>Ей понадобилось примерно 10 минут." },
    "note": {
      title: "Записка Треску",
      desc: "<div style='color:#fff;font-size:14px;line-height:1.6;margin-bottom:10px;'>Записка, адресованная Треску. Текст записки:</div>" +
        "<div style='position:relative;background:linear-gradient(135deg,rgba(15,10,25,0.95),rgba(8,4,15,0.95));border:2px solid var(--clue-primary,#ff007f);border-radius:12px;padding:18px 20px;box-shadow:0 0 18px rgba(255,0,127,0.3),inset 0 0 0 1px rgba(255,255,255,0.04);font-family:var(--clue-font-body,sans-serif);color:#fff;line-height:1.6;'>" +
          "<div style='font-style:italic;color:#fff;font-size:14px;line-height:1.7;'>" +
            "Привет. Я хотела сказать тебе лично, но не смогла тебя найти. Пишу тебе записку, потому что боюсь что Ксебет заметит на камерах что мы общаемся друг с другом. Прийди на кухню ровно в 2 ночи." +
          "</div>" +
          "<div style='border-top:1px dashed rgba(255,255,255,0.25);padding-top:14px;margin-top:16px;'>" +
            "<div style='color:#fff;font-size:14px;line-height:1.7;'>Похоже, мы нашли выход и сможем выбраться все вместе.</div>" +
            "<div style='text-align:right;margin-top:16px;font-weight:bold;color:var(--clue-primary,#ff007f);font-size:15px;font-family:var(--clue-font-title,sans-serif);text-shadow:0 0 10px rgba(255,0,127,0.5);'>Нулл</div>" +
          "</div>" +
        "</div>"
    },
    "blueprints": {
      title: "Чертежи Кая",
      desc: "План вентиляции. На них видно, что по ним можно пройти в офис, ТВ-комнату, библиотеку и на крышу.<br><br>Также план первого и второго этажа.<br><br>" +
        "<div class='blueprint-gallery' style='display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0;'>" +
          "<div class='blueprint-thumb' data-img='https://raw.githubusercontent.com/hwhyssjej/game-audio/main/%D0%B2%D0%B5%D0%BD%D1%82%D0%B8%D0%BB%D1%8F%D1%86%D0%B8%D1%8F%D1%8F.png' style='position:relative;background:linear-gradient(135deg,rgba(15,10,25,0.95),rgba(8,4,15,0.95));border:2px solid var(--clue-primary,#ff007f);border-radius:6px;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 0 8px rgba(255,0,127,0.2),inset 0 0 0 1px rgba(255,255,255,0.03);' onmouseover='this.style.transform=\"scale(1.02)\";this.style.boxShadow=\"0 0 14px rgba(255,0,127,0.35),inset 0 0 0 1px rgba(255,255,255,0.05)\"' onmouseout='this.style.transform=\"scale(1)\";this.style.boxShadow=\"0 0 8px rgba(255,0,127,0.2),inset 0 0 0 1px rgba(255,255,255,0.03)\"' onclick='openBlueprintLightbox(this)'>" +
            "<img src='https://raw.githubusercontent.com/hwhyssjej/game-audio/main/%D0%B2%D0%B5%D0%BD%D1%82%D0%B8%D0%BB%D1%8F%D1%86%D0%B8%D1%8F%D1%8F.png' style='width:100%;display:block;aspect-ratio:4/3;object-fit:cover;'>" +
            "<div style='padding:5px 6px;background:rgba(0,0,0,0.5);color:var(--clue-secondary,#00ffff);font-size:10px;text-align:center;font-family:var(--clue-font-title,sans-serif);letter-spacing:1.2px;text-transform:uppercase;text-shadow:0 0 5px rgba(0,255,255,0.3);'>Вентиляция</div>" +
          "</div>" +
          "<div class='blueprint-thumb' data-img='https://raw.githubusercontent.com/hwhyssjej/game-audio/main/1%20%D1%8D%D1%82%D0%B0%D0%B6.png' style='position:relative;background:linear-gradient(135deg,rgba(15,10,25,0.95),rgba(8,4,15,0.95));border:2px solid var(--clue-primary,#ff007f);border-radius:6px;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 0 8px rgba(255,0,127,0.2),inset 0 0 0 1px rgba(255,255,255,0.03);' onmouseover='this.style.transform=\"scale(1.02)\";this.style.boxShadow=\"0 0 14px rgba(255,0,127,0.35),inset 0 0 0 1px rgba(255,255,255,0.05)\"' onmouseout='this.style.transform=\"scale(1)\";this.style.boxShadow=\"0 0 8px rgba(255,0,127,0.2),inset 0 0 0 1px rgba(255,255,255,0.03)\"' onclick='openBlueprintLightbox(this)'>" +
            "<img src='https://raw.githubusercontent.com/hwhyssjej/game-audio/main/1%20%D1%8D%D1%82%D0%B0%D0%B6.png' style='width:100%;display:block;aspect-ratio:4/3;object-fit:cover;'>" +
            "<div style='padding:5px 6px;background:rgba(0,0,0,0.5);color:var(--clue-secondary,#00ffff);font-size:10px;text-align:center;font-family:var(--clue-font-title,sans-serif);letter-spacing:1.2px;text-transform:uppercase;text-shadow:0 0 5px rgba(0,255,255,0.3);'>1 этаж</div>" +
          "</div>" +
          "<div class='blueprint-thumb' data-img='https://raw.githubusercontent.com/hwhyssjej/game-audio/main/2%20%D1%8D%D1%82%D0%B0%D0%B6.png' style='position:relative;background:linear-gradient(135deg,rgba(15,10,25,0.95),rgba(8,4,15,0.95));border:2px solid var(--clue-primary,#ff007f);border-radius:6px;overflow:hidden;cursor:pointer;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 0 8px rgba(255,0,127,0.2),inset 0 0 0 1px rgba(255,255,255,0.03);grid-column:span 2;justify-self:center;max-width:50%;' onmouseover='this.style.transform=\"scale(1.02)\";this.style.boxShadow=\"0 0 14px rgba(255,0,127,0.35),inset 0 0 0 1px rgba(255,255,255,0.05)\"' onmouseout='this.style.transform=\"scale(1)\";this.style.boxShadow=\"0 0 8px rgba(255,0,127,0.2),inset 0 0 0 1px rgba(255,255,255,0.03)\"' onclick='openBlueprintLightbox(this)'>" +
            "<img src='https://raw.githubusercontent.com/hwhyssjej/game-audio/main/2%20%D1%8D%D1%82%D0%B0%D0%B6.png' style='width:100%;display:block;aspect-ratio:4/3;object-fit:cover;'>" +
            "<div style='padding:5px 6px;background:rgba(0,0,0,0.5);color:var(--clue-secondary,#00ffff);font-size:10px;text-align:center;font-family:var(--clue-font-title,sans-serif);letter-spacing:1.2px;text-transform:uppercase;text-shadow:0 0 5px rgba(0,255,255,0.3);'>2 этаж</div>" +
          "</div>" +
        "</div>" +
        "<div style='color:var(--clue-secondary,#00ffff);font-size:9px;margin-top:6px;text-align:center;font-style:italic;opacity:0.6;text-shadow:0 0 4px rgba(0,255,255,0.2);'>✦ кликните на чертёж, чтобы увеличить ✦</div>"
    },
    "sign": { title: "Табличка «Дезинфекция»", desc: "На ворота, ведущие в столовую, была надета табличка с надписью «Дезинфекция», а рядом коряво нарисованное лицо улыбающегося Ксебета.<br><br>Ворота также были обмотаны несколько раз лентой." },
    "file": { title: "Файл Ксебета", desc: "<span class='clue-label'>ЖЕРТВА:</span> Фусту<br><span class='clue-label'>ТИТУЛ:</span> Абсолютная Модель<br><br><span class='clue-label'>ВРЕМЯ СМЕРТИ:</span> Приблизительно 2:30 ночи<br><span class='clue-label'>МЕСТО НАХОЖДЕНИЯ ТЕЛА:</span> ТВ-комната (1-й этаж)<br><br><span class='clue-label'>ПРИЧИНА СМЕРТИ:</span> Острая сердечная недостаточность.<br><span class='clue-label'>ДОПОЛНИТЕЛЬНЫЕ ПОВРЕЖДЕНИЯ:</span><br>— Ожоги кистей рук I-II степени<br><br><span class='clue-label'>СОСТОЯНИЕ ТЕЛА:</span><br>Тело обнаружено в ТВ-комнате, лежащее лицом вниз на старом деревянном полу. Руки задраны вдоль тела, ладони разжаты." },
    "alibi-yuta": { title: "Показания Полины и Юты", desc: "Полина слышала шум в коридоре около 2 часов ночи. Затем Юта встретилась с Полиной в библиотеке.<br><br>Они пробыли там примерно до 4 часов ночи.<br><br>Во время разговора они видели, как Фусту поднимался по лестнице на второй этаж с какими-то бумагами в руках. Больше они никого не видели." },
    "screwdriver": { title: "Отвертка", desc: "Типичная отвертка, ручка не изолированная. Лежала рядом с телом Фусту." },
    "neck-bruise": { title: "Синяк на затылке", desc: "На затылке виднеется маленький ушиб, вследствие удара обо что-то тяжелое." },
    "night-vision-glasses": { title: "Очки ночного виденья", desc: "Обычные очки ночного виденья. Были найдены под диваном в ТВ-комнате." },
    "bleach-smell": { title: "Запах хлорки", desc: "На втором этаже чувствуется резкий запах хлорки, будто кто-то недавно убирался." }
  };


  window._clueEver = window._clueEver || {};
  window._dialogueEver = window._dialogueEver || {};
  window._seeded = window._seeded || {};
  function clueEver(cat) { return window._clueEver[cat] || (window._clueEver[cat] = new Set()); }
  function dialogueEver(cat) { return window._dialogueEver[cat] || (window._dialogueEver[cat] = new Set()); }
  function getCurrentCategory() {
    var s = document.querySelector('tw-story') || document.querySelector('tw-passage');
    var t = s ? (s.getAttribute('tags') || '') : '';
    return (t.indexOf('shin-deadlylife') !== -1 || t.indexOf('shin-dailylife') !== -1) ? 'shin' : 'main';
  }

  window.clueUIState = window.clueUIState || { modalOpen: false, activeClue: null, category: 'main' };
  function closeClueModal() {
    var o = document.getElementById('clue-modal-overlay');
    if (!o) { window.clueUIState.modalOpen = false; return; }
    o.classList.add('clue-modal-closing');
    setTimeout(function () { window.clueUIState.modalOpen = false; o.remove(); }, 200);
  }
  function buildListChildren(listEl) {
    var cat = getCurrentCategory();
    var ids = Array.from(clueEver(cat));
    // В режиме предъявления показываем ровно тот набор, который задан
    // сценой, а не то, что игрок успел собрать.
    var pick = window.clueUIState.pick;
    if (pick && pick.clues && pick.clues.length) {
      // порядок закрепляем один раз на сцену, иначе список прыгал бы
      // при каждой перерисовке (а она идёт на каждый выбор в списке)
      if (!pick.order) pick.order = nsdShuffle(pick.clues.slice());
      ids = pick.order;
    }
    while (listEl.firstChild) listEl.removeChild(listEl.firstChild);
    var lt = document.createElement('div'); lt.className = 'clue-modal-list-title'; lt.textContent = 'УЛИКИ'; listEl.appendChild(lt);
    if (ids.length === 0) { var e = document.createElement('div'); e.className = 'clue-modal-empty'; e.textContent = 'Пока улик нет...'; listEl.appendChild(e); return; }
    ids.forEach(function (id) {
      var d = CLUE_DATA_JS[id]; if (!d) return;
      var it = document.createElement('div'); it.className = 'clue-modal-item';
      if (window.clueUIState.activeClue === id) it.classList.add('is-active');
      var ib = document.createElement('button'); ib.type = 'button'; ib.className = 'clue-modal-item-btn'; ib.textContent = d.title;
      ib.addEventListener('click', function () { window.clueUIState.activeClue = id; refreshClueModal(); });
      it.appendChild(ib); listEl.appendChild(it);
    });
  }
  function buildDetailChildren(detEl) {
    while (detEl.firstChild) detEl.removeChild(detEl.firstChild);
    if (window.clueUIState.activeClue && CLUE_DATA_JS[window.clueUIState.activeClue]) {
      var ad = CLUE_DATA_JS[window.clueUIState.activeClue];
      var h4 = document.createElement('h4'); h4.textContent = ad.title;
      var p = document.createElement('p'); p.innerHTML = ad.desc;
      detEl.appendChild(h4); detEl.appendChild(p);
    } else { var ph = document.createElement('p'); ph.className = 'clue-modal-placeholder'; ph.textContent = 'Выберите улику слева, чтобы увидеть подробности.'; detEl.appendChild(ph); }

    // Режим предъявления: под описанием появляется кнопка выбора
    var pick = window.clueUIState.pick;
    if (pick && window.clueUIState.activeClue) {
      var pb = document.createElement('button');
      pb.type = 'button';
      pb.className = 'clue-modal-pick-btn';
      pb.textContent = 'ПРЕДЪЯВИТЬ';
      pb.addEventListener('click', function () {
        var chosen = window.clueUIState.activeClue;
        window.clueUIState.pick = null;
        var ovx = document.getElementById('clue-modal-overlay');
        if (ovx) ovx.classList.remove('is-pick');
        // Окно закрывается само, любым выбором. Раньше здесь просто ставился
        // флаг, а renderClueModal при закрытии выходит, ничего не убирая, —
        // и окно оставалось висеть с крестиком.
        closeClueModal();
        pick.onChoose(chosen);
      });
      detEl.appendChild(pb);
    }
  }
  function createModalShell() {
    var overlay = document.createElement('div'); overlay.id = 'clue-modal-overlay';
    var modal = document.createElement('div'); modal.id = 'clue-modal';
    var list = document.createElement('div'); list.className = 'clue-modal-list';
    var det = document.createElement('div'); det.className = 'clue-modal-detail';
    var cb = document.createElement('div'); cb.className = 'clue-modal-close';
    var ci = document.createElement('button'); ci.type = 'button'; ci.className = 'clue-modal-close-btn'; ci.textContent = '✕';
    ci.addEventListener('click', closeClueModal); cb.appendChild(ci);
    modal.appendChild(list); modal.appendChild(det); modal.appendChild(cb); overlay.appendChild(modal);
    return overlay;
  }
  function renderClueModal() {
    if (!window.clueUIState.modalOpen) return;
    var overlay = document.getElementById('clue-modal-overlay');
    if (!overlay) { overlay = createModalShell(); document.body.appendChild(overlay); }
    refreshClueModal();
  }
  function refreshClueModal() {
    var overlay = document.getElementById('clue-modal-overlay');
    if (!overlay) return;
    buildListChildren(overlay.querySelector('.clue-modal-list'));
    buildDetailChildren(overlay.querySelector('.clue-modal-detail'));
  }

  function ensureToastStyle() {
    if (window._ddxToastStyleInjected) return;
    window._ddxToastStyleInjected = true;
    var st = document.createElement('style');
    st.textContent =
      '@keyframes ddxToastIn{0%{opacity:0;transform:translate(-50%,16px);}100%{opacity:1;transform:translate(-50%,0);}}' +
      '@keyframes ddxToastOut{0%{opacity:1;transform:translate(-50%,0);}100%{opacity:0;transform:translate(-50%,-12px);}}' +
      '@keyframes ddxProgress{0%{transform:scaleX(1);opacity:.95;}78%{opacity:.95;}100%{transform:scaleX(0);opacity:0;}}' +
      '.ddx-fail-toast{position:fixed;top:clamp(70px,12vh,120px);left:50%;z-index:6000;transform:translate(-50%,0);display:flex;align-items:center;gap:14px;max-width:90vw;padding:16px 26px 18px 20px;background:linear-gradient(135deg,rgba(15,10,25,.97),rgba(8,4,15,.97));border:2px solid var(--tp,#ff007f);border-radius:14px;overflow:hidden;box-shadow:0 12px 40px rgba(0,0,0,.6);font-family:var(--clue-font-title,sans-serif);color:#fff;pointer-events:none;animation:ddxToastIn .5s cubic-bezier(.2,.8,.2,1) both;}' +
      '.ddx-fail-toast.ddx-out{animation:ddxToastOut .34s ease forwards;}' +
      '.ddx-fail-toast::before{content:"";position:absolute;left:0;bottom:0;height:3px;width:100%;background:linear-gradient(90deg,var(--tp,#ff007f),#fff);transform-origin:left center;animation:ddxProgress 2.6s ease-out forwards;}' +
      '.ddx-fail-icon{position:relative;z-index:1;flex-shrink:0;width:34px;height:34px;display:flex;align-items:center;justify-content:center;border-radius:50%;border:2px solid var(--tp,#ff007f);color:var(--tp,#ff007f);font-size:18px;font-weight:bold;}' +
      '.ddx-fail-text{position:relative;z-index:1;display:flex;flex-direction:column;gap:2px;}' +
      '.ddx-fail-title{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--tp,#ff007f);opacity:.85;}' +
      '.ddx-fail-msg{font-family:var(--clue-font-body,sans-serif);font-size:15px;color:#fff;}';
    document.head.appendChild(st);
  }
  function cssVar(name, fallback) {
    try { var v = getComputedStyle(document.documentElement).getPropertyValue(name); return (v && v.trim()) ? v.trim() : fallback; }
    catch (e) { return fallback; }
  }
  function showFailToast(msg) {
    ensureToastStyle();
    var old = document.querySelector('.ddx-fail-toast'); if (old) old.remove();
    var primary = cssVar('--clue-primary', '#ff007f');
    var t = document.createElement('div'); t.className = 'ddx-fail-toast';
    t.style.setProperty('--tp', primary);
    t.innerHTML = '<span class="ddx-fail-icon">!</span><span class="ddx-fail-text"><span class="ddx-fail-title">ДОСТУП ЗАПРЕЩЁН</span><span class="ddx-fail-msg"></span></span>';
    t.querySelector('.ddx-fail-msg').textContent = msg;
    document.body.appendChild(t);
    setTimeout(function () { t.classList.add('ddx-out'); setTimeout(function () { if (t.parentNode) t.remove(); }, 320); }, 2600);
  }
  function attachExitCheckInterceptor() {
    if (window.exitCheckBound) return; window.exitCheckBound = true;
    document.addEventListener('click', function (e) {
      var wrap = e.target.closest && e.target.closest('.exit-check'); if (!wrap) return;
      var link = wrap.querySelector('tw-link, .tw-link'); if (!link) return;
      var cat = getCurrentCategory();
      var haveC = clueEver(cat), haveD = dialogueEver(cat);
      var rC = (wrap.dataset.requiredClues || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      var rD = (wrap.dataset.requiredDialogues || '').split(',').map(function (s) { return s.trim(); }).filter(Boolean);
      var okC = rC.every(function (id) { return haveC.has(id); });
      var okD = rD.every(function (id) { return haveD.has(id); });
      if (okC && okD) return;
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      showFailToast(cat === 'shin' ? (wrap.dataset.failShin || 'Не все условия выполнены.') : (wrap.dataset.failMain || 'Не все условия выполнены.'));
    }, true);
  }

  document.addEventListener('click', function (e) {
    if (!window.clueCooldownActive) return;
    var spot = e.target.closest && e.target.closest('.investigate-spot:not(.investigated)'); if (!spot) return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
  }, true);

  if (!window.clueSfxPool) {
    window.clueSfxPool = [];
    var url = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/dr2_truth_bullet.mp3';
    for (var ci = 0; ci < 2; ci++) { var a = new Audio(url); a.preload = 'auto'; a.volume = 0.3; window.clueSfxPool.push(a); }
    window.clueSfxPoolIndex = 0;
  }
  window.clueCooldownActive = false;
  window._pendingClueFire = null;
  var CLUE_COOLDOWN_MS = 2600;
  function playClueChime() {
    if (!window.clueSfxPool.length) return;
    var a = window.clueSfxPool[window.clueSfxPoolIndex]; window.clueSfxPoolIndex = (window.clueSfxPoolIndex + 1) % window.clueSfxPool.length;
    try { a.currentTime = 0; a.play().catch(function () {}); } catch (e) {}
  }
  function duckAndPlayClueChime() {
    var target = window.isMuted ? 0 : MAX_VOLUME, hold = 900; clearInterval(window.fadeTimer);
    var from = window.bgAudio.volume, to = 0.04, dur = 100, st = null;
    function down(ts) { if (!st) st = ts; var p = Math.min(1, (ts - st) / dur); window.bgAudio.volume = from + (to - from) * p; if (p < 1) requestAnimationFrame(down); else { playClueChime(); setTimeout(up, hold); } }
    function up() { var uf = window.bgAudio.volume, ud = 260, us = null; function step(ts) { if (!us) us = ts; var p = Math.min(1, (ts - us) / ud); window.bgAudio.volume = uf + (target - uf) * p; if (p < 1) requestAnimationFrame(step); } requestAnimationFrame(step); }
    requestAnimationFrame(down);
  }
  function showClueAnnouncement(title) {
    var w = document.createElement('div'); w.className = 'clue-announce';
    w.innerHTML = '<div class="clue-announce-bullet"><span class="bullet-case"><span class="bullet-primer"></span></span><span class="bullet-body"><span class="clue-announce-icon">✦</span><div class="clue-announce-text"><div class="clue-announce-title">ДОБАВЛЕНА НОВАЯ УЛИКА</div><div class="clue-announce-name">' + title + '</div></div></span></div>';
    document.body.appendChild(w);
    var b = w.querySelector('.clue-announce-bullet'); b.addEventListener('animationend', function () { w.remove(); });
    setTimeout(function () { if (w.parentNode) w.remove(); }, 3000);
  }
  // Возвращает true, только если объявление действительно показано:
  // «Файл Ксебета» выдан с самого начала и ничего не объявляет, а раньше
  // всё равно запускал кулдаун — точки осмотра мертвели на 2,6 секунды
  // в самом начале игры.
  function fireClueNow(id) {
    if (id === 'file') return false;
    if (!CLUE_DATA_JS[id]) return false;
    duckAndPlayClueChime();
    showClueAnnouncement(CLUE_DATA_JS[id].title);
    return true;
  }
  function startClueCooldown() {
    window.clueCooldownActive = true;
    var tp = document.querySelector('tw-passage'); if (tp) tp.classList.add('clue-cooldown');
    setTimeout(function () {
      window.clueCooldownActive = false;
      var t2 = document.querySelector('tw-passage'); if (t2) t2.classList.remove('clue-cooldown');
      if (window._pendingClueFire) {
        var pid = window._pendingClueFire; window._pendingClueFire = null;
        if (fireClueNow(pid)) startClueCooldown();
      }
    }, CLUE_COOLDOWN_MS);
  }
  function fireClue(id) {
    if (!CLUE_DATA_JS[id]) return;
    if (window.clueCooldownActive) { window._pendingClueFire = id; return; }
    if (fireClueNow(id)) startClueCooldown();
  }

  function openBlueprintLightbox(thumb) {
    var img = thumb.querySelector('img');
    if (!img) return;
    var old = document.getElementById('blueprint-lightbox');
    if (old) old.remove();
    var overlay = document.createElement('div');
    overlay.id = 'blueprint-lightbox';
    overlay.style.cssText = 'position:fixed;inset:0;z-index:7000;background:rgba(0,0,0,0.95);display:flex;align-items:center;justify-content:center;cursor:zoom-out;padding:20px;box-sizing:border-box;';
    var wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,rgba(15,10,25,0.98),rgba(8,4,15,0.98));border:3px solid var(--clue-primary,#ff007f);border-radius:10px;overflow:hidden;box-sizing:border-box;';
    var bigImg = document.createElement('img');
    bigImg.src = img.src;
    bigImg.style.cssText = 'display:block;width:auto;height:auto;max-width:100%;max-height:100%;object-fit:contain;border-radius:7px;';
    wrap.appendChild(bigImg);
    overlay.appendChild(wrap);
    overlay.addEventListener('click', function () { overlay.remove(); });
    document.body.appendChild(overlay);
  }
  window.openBlueprintLightbox = openBlueprintLightbox;

  // Кнопка «Сохранить Прогресс» на пассаже подготовки к суду.
  // Само окно сохранения живёт в Harlowe (пассаж Sidebar, #save-button):
  // на этом пассаже кнопка спрятана стилями, поэтому дёргаем её ссылку кодом.
  window.openTrialSave = function () {
    var trigger = document.getElementById('save-button');
    var link = trigger ? trigger.querySelector('tw-link, .tw-link') : null;
    if (link) { link.click(); return; }
    showFailToast('Окно сохранения недоступно на этом экране.');
  };

  // Пассаж подготовки к суду: боковых вертикальных линий больше нет,
  // оверлей только подчищаем на случай остатков от прошлых версий.
  function layoutTrialGrid() {
    document.querySelectorAll('.trial-grid-overlay').forEach(function (ov) {
      while (ov.firstChild) ov.removeChild(ov.firstChild);
    });
  }

  document.addEventListener('click', function (e) {
    var spot = e.target.closest && e.target.closest('.investigate-spot:not(.investigated)');
    if (!spot || window.clueCooldownActive) return;
    var id = spot.getAttribute('data-clue-id');
    if (!id) return;
    e.preventDefault();
    var cat = getCurrentCategory();
    var ever = clueEver(cat);
    spot.classList.add('investigated');
    if (ever.has(id)) return;
    ever.add(id);
    var v = hsVars();
    if (v) { var arr = v.collectedClues || []; if (arr.indexOf(id) === -1) v.collectedClues = arr.concat([id]); }
    fireClue(id);
    if (window.clueUIState.modalOpen) refreshClueModal();
  }, true);

  function syncFromState() {
    var v = hsVars();
    if (!v) return;
    // Harlowe ещё не выполнил startup-пассаж: переменных нет. Если «засеяться»
    // сейчас, то улики из startup позже сойдут за только что найденные.
    if (v.collectedClues === undefined) return;
    var cat = getCurrentCategory();
    window.clueUIState.category = cat;
    var cEver = clueEver(cat), dEver = dialogueEver(cat);
    var stClues = v.collectedClues || [];
    var stDlg = v.visitedDialogues || [];
    if (window._seeded[cat] === undefined) window._seeded[cat] = false;
    if (!window._seeded[cat]) {
      stClues.forEach(function (id) { cEver.add(id); });
      stDlg.forEach(function (id) { dEver.add(id); });
      window._seeded[cat] = true; window._lastSyncCat = cat; return;
    }
    var catChanged = (window._lastSyncCat !== cat);
    if (catChanged) {
      stClues.forEach(function (id) { cEver.add(id); });
      stDlg.forEach(function (id) { dEver.add(id); });
      window._lastSyncCat = cat; return;
    }
    stDlg.forEach(function (id) { dEver.add(id); });
    var fired = false;
    for (var i = 0; i < stClues.length; i++) {
      var id = stClues[i];
      if (!cEver.has(id)) { cEver.add(id); if (!fired && CLUE_DATA_JS[id]) { fireClue(id); fired = true; } }
    }
    if (window.clueUIState.modalOpen) refreshClueModal();
  }

  function reconcileSpots() {
    var ever = clueEver(getCurrentCategory());
    document.querySelectorAll('tw-passage .investigate-spot[data-clue-id]').forEach(function (sp) {
      var id = sp.getAttribute('data-clue-id');
      if (id && ever.has(id)) sp.classList.add('investigated');
    });
  }

  function playTypeTick() {
    try {
      var ctx = window.typeCtx || (window.typeCtx = new (window.AudioContext || window.webkitAudioContext)());
      var t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
      o.type = 'square'; o.frequency.setValueAtTime(1400 + Math.random() * 200, t);
      g.gain.setValueAtTime(0.05, t); g.gain.exponentialRampToValueAtTime(0.0001, t + 0.03);
      o.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + 0.04);
    } catch (e) {}
  }
  function applyTypewriter() {
    document.querySelectorAll('.dialogue-text:not([data-typed])').forEach(function (el) {
      el.setAttribute('data-typed', 'true');
      var text = el.textContent; el.textContent = ''; var i = 0, sp = 28;
      function tick() { if (i < text.length) { el.textContent += text[i]; if (text[i] !== ' ') playTypeTick(); i++; window.activeTypewriterTimeout = setTimeout(tick, sp); } }
      tick();
    });
  }
  function checkDialogueClosed() {
    var o = document.getElementById('dialogue-modal-overlay'), open = !!o;
    if (!open && window.dialogueWasOpen) {
      clearTimeout(window.activeTypewriterTimeout); window.activeTypewriterTimeout = null;
      syncFromState();
      if (window.clueUIState.modalOpen) refreshClueModal();
    }
    window.dialogueWasOpen = open;
  }

  var SPEAKER_ON_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><path d="M4 9V15H8L13 20V4L8 9H4Z" fill="#ff007f"/><path d="M16.5 8.5C17.5 9.5 18 10.7 18 12C18 13.3 17.5 14.5 16.5 15.5" stroke="#ff007f" stroke-width="1.8" stroke-linecap="round"/><path d="M19 6C20.8 7.8 21.7 9.9 21.7 12C21.7 14.1 20.8 16.2 19 18" stroke="#ff007f" stroke-width="1.8" stroke-linecap="round"/></svg>';
  var SPEAKER_OFF_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="vertical-align:middle;"><path d="M4 9V15H8L13 20V4L8 9H4Z" fill="#00ffff"/><path d="M16 9L21 14M21 9L16 14" stroke="#00ffff" stroke-width="1.8" stroke-linecap="round"/></svg>';
  function updateMuteButtonLabel(b) { b.innerHTML = (window.isMuted ? SPEAKER_OFF_SVG : SPEAKER_ON_SVG) + '<span style="margin-left:8px;">' + (window.isMuted ? 'ЗВУК ВЫКЛ' : 'ЗВУК ВКЛ') + '</span>'; }
  function ensureMuteButton() {
    if (document.getElementById('mute-toggle-btn')) return;
    var b = document.createElement('button'); b.id = 'mute-toggle-btn'; b.type = 'button'; updateMuteButtonLabel(b);
    b.addEventListener('click', function (e) { e.stopPropagation(); window.isMuted = !window.isMuted; updateMuteButtonLabel(b); clearInterval(window.fadeTimer); if (window.isMuted) window.bgAudio.volume = 0; else if (window.bgAudio.src) fadeAudio('in'); });
    document.body.appendChild(b);
  }

  function attachDialogueCloseInterceptor() {
    if (window.dialogueCloseBound) return; window.dialogueCloseBound = true;
    document.addEventListener('click', function (e) {
      if (window.suppressDialogueIntercept) { window.suppressDialogueIntercept = false; return; }
      var z = e.target.closest && e.target.closest('.dialogue-clickzone'); if (!z) return;
      var tr = document.getElementById('dialogue-tracker'); if (!(tr && tr.textContent.trim() === 'true')) return;
      var link = z.querySelector('tw-link, .tw-link'); if (!link) return;
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      var o = document.getElementById('dialogue-modal-overlay'); if (o) o.classList.add('dialogue-closing');
      setTimeout(function () {
        window.suppressDialogueIntercept = true;
        link.click();
        setTimeout(function () { syncFromState(); if (window.clueUIState.modalOpen) refreshClueModal(); }, 60);
      }, 200);
    }, true);
  }

  window.openTrialClues = function () {
    window.clueUIState.category = getCurrentCategory();
    window.clueUIState.modalOpen = true;
    renderClueModal();
  };

  function ensureGameMenu() {
    if (document.getElementById('game-menu-wrap')) return;
    var wrap = document.createElement('div'); wrap.id = 'game-menu-wrap';
    var btn = document.createElement('button'); btn.id = 'game-menu-btn'; btn.type = 'button'; btn.textContent = 'МЕНЮ';
    var panel = document.createElement('div'); panel.id = 'game-menu-panel';
    var cluesBtn = document.createElement('button'); cluesBtn.type = 'button'; cluesBtn.textContent = 'Улики';
    cluesBtn.addEventListener('click', function () { panel.classList.remove('is-open'); window.clueUIState.category = getCurrentCategory(); window.clueUIState.modalOpen = true; renderClueModal(); });
    var saveBtn = document.createElement('button'); saveBtn.type = 'button'; saveBtn.textContent = 'Сохранить прогресс';
    saveBtn.addEventListener('click', function () { panel.classList.remove('is-open'); var trigger = document.getElementById('save-button'); var link = trigger ? trigger.querySelector('tw-link, .tw-link') : null; if (link) link.click(); });
    panel.appendChild(cluesBtn); panel.appendChild(saveBtn);
    btn.addEventListener('click', function (e) { e.stopPropagation(); panel.classList.toggle('is-open'); });
    document.addEventListener('click', function (e) { if (!wrap.contains(e.target)) panel.classList.remove('is-open'); });
    wrap.appendChild(btn); wrap.appendChild(panel); document.body.appendChild(wrap);
  }

  // ============================================================
  // ЗВУКИ: продвижение / выбор пули / выстрел / попадание
  // ============================================================
  // Линии, вылетающие из случайных точек кадра за его пределы.
  // Одна и та же логика у заставки суда и у нон-стоп дебатов.
  function ctFlyLines(count, extraClass, durMin, durSpan, delaySpan) {
    durMin = durMin || 0.85; durSpan = durSpan || 0.75;
    delaySpan = delaySpan == null ? 0.85 : delaySpan;
    var out = '';
    for (var i = 0; i < count; i++) {
      var pink = Math.random() < 0.5;
      out += '<i class="' + (extraClass || '') + ' ' + (pink ? 'pink' : 'cyan') + '"' +
             ' style="--x:' + (Math.random() * 100).toFixed(1) + 'vw' +
             ';--y:' + (Math.random() * 100).toFixed(1) + 'vh' +
             ';--a:' + (Math.random() * 360).toFixed(1) + 'deg' +
             ';--w:' + (26 + Math.random() * 34).toFixed(0) + 'vmax' +
             ';--h:' + (1 + Math.random() * 2.4).toFixed(1) + 'px' +
             ';--t:' + (durMin + Math.random() * durSpan).toFixed(2) + 's' +
             ';--d:' + (Math.random() * delaySpan).toFixed(2) + 's"></i>';
    }
    return out;
  }

  function makeSfxPool(url, vol, count) {
    var pool = []; for (var i = 0; i < count; i++) { var a = new Audio(url); a.preload = i ? 'none' : 'auto'; a.volume = vol; pool.push(a); }
    return { pool: pool, idx: 0, play: function () { var a = this.pool[this.idx]; this.idx = (this.idx + 1) % this.pool.length; try { a.currentTime = 0; a.play().catch(function () {}); } catch (e) {} } };
  }
  // Каждый пул — это по два <audio> с сетевой загрузкой, поэтому объявляем
  // их ровно по одному разу (раньше три пула дублировались и тянули файлы дважды).
  var sfxAdvance = makeSfxPool('https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/%D0%94%D0%B8%D0%B7%D0%B0%D0%B9%D0%BD%20%D0%B1%D0%B5%D0%B7%20%D0%BD%D0%B0%D0%B7%D0%B2%D0%B0%D0%BD%D0%B8%D1%8F(2).mp4', 0.5, 2);
  var sfxShoot = makeSfxPool('https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/%D0%B2%D1%8B%D1%81%D1%82%D1%80%D0%B5%D0%BB.mp3', 0.55, 2);
  var sfxCorrect = makeSfxPool('https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/%D0%BE%D0%BF%D1%80%D0%BE%D0%B2%D0%B5%D1%80%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5.mp3', 0.6, 2);

  document.addEventListener('click', function (e) {
    if (e.target.closest && e.target.closest('.dialogue-clickzone')) sfxAdvance.play();
  }, true);

  // ============================================================
  // ЗАПУСК АНИМАЦИИ СТАРТА СУДА — ЕДИНСТВЕННОЕ определение,
  // с защитой от повторного вызова (устраняет дублирующийся звук).
  // ============================================================
  window._trialSeqRunning = false;
  window.startTrialSequence = function () {
    if (window._trialSeqRunning) return;
    if (document.getElementById('trial-start-overlay')) return;
    window._trialSeqRunning = true;

    try {
      var sfx = new Audio('https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/danganronpas_trial.mp3');
      sfx.volume = 0.7;
      sfx.play().catch(function () {});
    } catch (e) {}

    var fx = ctFlyLines(14, 'tso-line', 0.6, 0.25, 0.2);

    var TITLE = 'КЛАССНЫЙ СУД';
    var chars = '', ci = 0;
    for (var t = 0; t < TITLE.length; t++) {
      if (TITLE[t] === ' ') { chars += '<span class="tso-sp"></span>'; continue; }
      chars += '<span class="tso-ch" style="--i:' + (ci++) + '">' + TITLE[t] + '</span>';
    }

    var SUB = 'НАЧИНАЕТСЯ!';
    var subChars = '', si = 0;
    for (var u = 0; u < SUB.length; u++) {
      if (SUB[u] === ' ') { subChars += '<span class="tso-sp"></span>'; continue; }
      subChars += '<span style="--i:' + (si++) + '">' + SUB[u] + '</span>';
    }

    var scene =
      '<div class="tso-inner">' +
        '<div class="tso-fx">' + fx + '</div>' +
        '<div class="trial-start-text">' +
          '<div class="trial-start-main">' + chars + '</div>' +
          '<div class="trial-start-sub">' + subChars + '</div>' +
        '</div>' +
      '</div>';

    var ov = document.createElement('div');
    ov.id = 'trial-start-overlay';
    ov.innerHTML =
      '<div class="tso-half tso-left">' + scene + '</div>' +
      '<div class="tso-half tso-right">' + scene + '</div>';
    document.body.appendChild(ov);

    // пассаж суда подменяется за закрытым занавесом
    setTimeout(function () {
      var trigger = document.getElementById('trial-real-link');
      if (trigger) { var link = trigger.querySelector('tw-link, .tw-link'); if (link) link.click(); }
    }, 1450);

    // занавес разъезжается в стороны
    setTimeout(function () {
      var ovNow = document.getElementById('trial-start-overlay');
      if (ovNow) ovNow.classList.add('tso-open');
    }, 1640);

    setTimeout(function () {
      var ovNow = document.getElementById('trial-start-overlay');
      if (ovNow && ovNow.parentNode) ovNow.parentNode.removeChild(ovNow);
      window._trialSeqRunning = false;
    }, 2650);
  };

  // Единственный обработчик клика по кнопке старта — больше нигде такой листенер не вешаем!
  document.addEventListener('click', function (e) {
    var btn = e.target.closest && e.target.closest('.trial-proceed');
    if (!btn) return;
    if (btn.dataset.firing === '1') return;
    btn.dataset.firing = '1';
    btn.classList.add('is-filling');
    window.startTrialSequence();
    setTimeout(function () { btn.dataset.firing = '0'; }, 3000);
  }, true);

  // ============================================================
  // ИМЯ ГОВОРЯЩЕГО — первая буква голубая, остальные белые с
  // фиолетовой дымкой и лёгким разбросом углов и высоты.
  // ============================================================
  function ctBuildNameSpans(target, name) {
    while (target.firstChild) target.removeChild(target.firstChild);
    var chars = String(name).split('');
    for (var i = 0; i < chars.length; i++) {
      var ch = chars[i];
      if (ch === ' ') {
        var sp = document.createElement('span');
        sp.className = 'ct-name-space';
        target.appendChild(sp);
        continue;
      }
      var s = document.createElement('span');
      s.textContent = ch;
      if (i === 0) {
        s.className = 'ct-first-letter';
      } else {
        s.className = 'ct-name-char';
        // знак чередуем, величину берём случайно — так «хаос» виден всегда,
        // а не только когда случайные числа удачно выпали
        var sign = (i % 2 === 0) ? 1 : -1;
        var rot = (sign * (3 + Math.random() * 5)).toFixed(1);
        var ty = (-sign * (1 + Math.random() * 3)).toFixed(1);
        s.style.transform = 'rotate(' + rot + 'deg) translateY(' + ty + 'px)';
      }
      target.appendChild(s);
    }
  }

  // Наклон имени = наклон нижней линии плашки. Нижняя линия идёт из (0;100%)
  // в (86%;78%), поэтому угол зависит от реальных пропорций плашки.
  function ctFitNameTilt(plate, textEl) {
    if (!plate || !textEl) return;
    var w = plate.offsetWidth, h = plate.offsetHeight;
    if (!w || !h) return;
    var deg = -Math.atan2(0.22 * h, 0.86 * w) * 180 / Math.PI;
    textEl.style.setProperty('--ct-name-tilt', deg.toFixed(2) + 'deg');
  }

  function ctRenderName(name) {
    var firstEl = document.getElementById('ct-name-first');
    var restEl = document.getElementById('ct-name-rest');
    if (!firstEl) return;
    ctBuildNameSpans(firstEl, name || '');
    if (restEl) restEl.textContent = '';
    var plate = firstEl.closest ? firstEl.closest('.ct-name-plate') : null;
    ctFitNameTilt(plate, firstEl);
    // после подгрузки шрифта ширина плашки меняется — пересчитываем
    requestAnimationFrame(function () { ctFitNameTilt(plate, firstEl); });
  }

  // ============================================================
  // КНОПКА АВТО — следующая реплика только после того, как текущая
  // допечаталась и прошло ещё 2 секунды.
  // ============================================================
  var CT_CHAR_MS       = 24;   // скорость печати реплики
  var CT_AUTO_PAUSE_MS = 2000;
  window.ctAutoEnabled = false;
  window.ctAutoTimer = null;

  function ctCancelAuto() { clearTimeout(window.ctAutoTimer); window.ctAutoTimer = null; }

  // Вызывается, когда реплика полностью напечатана, и при включении АВТО.
  window.ctAutoSchedule = function () {
    ctCancelAuto();
    if (!window.ctAutoEnabled) return;
    if (window.ctIntroPlaying) return;
    if (window.ctEventRunning) return;
    if (window.nsdState && (window.nsdState.active || window.nsdState.finishing)) return;
    if (window.ctState.typing) return;
    window.ctAutoTimer = setTimeout(function () {
      window.ctAutoTimer = null;
      if (!window.ctAutoEnabled) return;
      if (window.ctState.typing) return;
      if (window.ctEventRunning) return;
      if (window.nsdState && (window.nsdState.active || window.nsdState.finishing)) return;
      window.ctAdvance();
    }, CT_AUTO_PAUSE_MS);
  };

  function ensureCtAutoButton() {
    if (!document.getElementById('ct-root')) { removeCtAutoButton(); return; }
    if (document.getElementById('ct-auto-btn')) return;
    var b = document.createElement('button');
    b.id = 'ct-auto-btn'; b.type = 'button'; b.textContent = 'АВТО';
    b.addEventListener('click', function (e) {
      e.stopPropagation();
      window.ctAutoEnabled = !window.ctAutoEnabled;
      b.classList.toggle('is-active', window.ctAutoEnabled);
      ctCancelAuto();
      if (window.ctAutoEnabled) window.ctAutoSchedule();
    });
    document.body.appendChild(b);
  }
  function removeCtAutoButton() {
    var b = document.getElementById('ct-auto-btn');
    if (b) b.remove();
    ctCancelAuto();
    window.ctAutoEnabled = false;
  }



  window.ctState = window.ctState || { index: 0, typing: false };
  window.ctIntroPlaying = false;

window.ctRenderLine = function (idx) {
    var lines = window.CT_LINES || [];
    if (idx >= lines.length) return;
    var line = lines[idx];
    var namecard = document.getElementById('ct-namecard');
    var box = document.querySelector('.ct-dialogue-box');

    if (line.nsd) {
      if (namecard) namecard.style.display = 'none';
      if (box) box.style.display = 'none';
      window.ctState.typing = false;
      startNonStopDebate(line.nsd, function () {
        if (namecard) namecard.style.display = '';
        if (box) box.style.display = '';
        window.ctState.index = idx + 1;
        window.ctRenderLine(window.ctState.index);
      });
      return;
    }

    // Сцена на три окна
    if (line.trio) {
      if (namecard) namecard.style.display = 'none';
      if (box) box.style.display = 'none';
      window.ctState.typing = false;
      window.ctEventRunning = true;
      ctTrioRun(line.trio, function () {
        window.ctEventRunning = false;
        if (namecard) namecard.style.display = '';
        if (box) box.style.display = '';
        window.ctState.index = idx + 1;
        window.ctRenderLine(window.ctState.index);
      });
      return;
    }

    // Служебная запись «уйти в другой пассаж»: в разметке лежит спрятанная
    // ссылка Harlowe с этим id, и мы просто нажимаем её. Тем же способом
    // суд подменяет пассаж за закрытым занавесом на входе.
    if (line.goto) {
      window.ctState.typing = false;
      var jump = document.getElementById(line.goto);
      var jlink = jump && (jump.querySelector('tw-link') || jump.querySelector('.tw-link'));
      if (jlink) jlink.click();
      return;
    }

    // Служебная запись «сменить музыку»: своего текста нет, поэтому сразу
    // заводим трек и переходим к следующей реплике.
    if (line.music) {
      nsdCrossfade((TRACKS[line.music] || {}).url || null);
      window.ctState.index = idx + 1;
      window.ctRenderLine(window.ctState.index);
      return;
    }

    // Сцена выбора улики: открываем ту же вкладку, что и на расследовании,
    // но в режиме предъявления. Неверный выбор подставляет реплики-подсказки
    // прямо в список и возвращает игрока к тому же выбору.
    if (line.pick) {
      if (namecard) namecard.style.display = 'none';
      if (box) box.style.display = 'none';
      window.ctState.typing = false;
      var conf = line.pick;
      window.clueUIState.activeClue = null;
      // «Состояние» висит и здесь: выбор улики — такая же мини-игра
      hpReset();
      window.clueUIState.pick = {
        clues: conf.clues,
        onChoose: function (id) {
          if (namecard) namecard.style.display = '';
          if (box) box.style.display = '';
          if (id === conf.correct) {
            hpRemove();
            window.ctState.index = idx + 1;
            window.ctRenderLine(window.ctState.index);
            return;
          }
          // Неверная улика стоит половину звезды; опустело — наливаем заново
          if (hpLose()) hpReset();
          // подсказки, а следом снова эта же сцена выбора
          var again = (conf.wrong || []).concat([line]);
          lines.splice.apply(lines, [idx + 1, 0].concat(again));
          window.ctState.index = idx + 1;
          window.ctRenderLine(window.ctState.index);
        }
      };
      window.clueUIState.modalOpen = true;
      renderClueModal();
      // Закрыть окно в этой сцене нельзя: без выбора улики сцена не двинется
      var ov = document.getElementById('clue-modal-overlay');
      if (ov) ov.classList.add('is-pick');
      return;
    }

    // Выбор предположения: список вариантов справа и пятнадцать секунд.
    // Неверный вариант подставляет реплики-подсказки и возвращает игрока
    // к тому же выбору — ровно как сцена предъявления улики.
    if (line.guess) {
      if (namecard) namecard.style.display = 'none';
      if (box) box.style.display = 'none';
      window.ctState.typing = false;
      window.ctEventRunning = true;
      var gconf = line.guess;
      ctRunGuess(gconf, function (ok) {
        if (namecard) namecard.style.display = '';
        if (box) box.style.display = '';
        window.ctEventRunning = false;
        hpRemove();
        if (!ok) {
          var again = (gconf.wrong || []).concat([line]);
          lines.splice.apply(lines, [idx + 1, 0].concat(again));
        }
        window.ctState.index = idx + 1;
        window.ctRenderLine(window.ctState.index);
      });
      return;
    }

    // Дебаты-Схватка: вопрос, два лагеря и арена — всё внутри
    if (line.scrum) {
      if (namecard) namecard.style.display = 'none';
      if (box) box.style.display = 'none';
      window.ctState.typing = false;
      window.startDebateScrum(line.scrum, function () {
        if (namecard) namecard.style.display = '';
        if (box) box.style.display = '';
        window.ctState.index = idx + 1;
        window.ctRenderLine(window.ctState.index);
      });
      return;
    }

    // Битва на мечах: плашка, трещина и арена — всё внутри
    if (line.sword) {
      if (namecard) namecard.style.display = 'none';
      if (box) box.style.display = 'none';
      window.ctState.typing = false;
      window.startSwordBattle(line.sword, function () {
        if (namecard) namecard.style.display = '';
        if (box) box.style.display = '';
        window.ctState.index = idx + 1;
        window.ctRenderLine(window.ctState.index);
      });
      return;
    }

    // Сценарное событие между репликами (плашка «Битва на мечах» и т.п.)
    if (line.event) {
      if (namecard) namecard.style.display = 'none';
      if (box) box.style.display = 'none';
      window.ctState.typing = false;
      ctRunEvent(line.event, function () {
        if (namecard) namecard.style.display = '';
        if (box) box.style.display = '';
        window.ctState.index = idx + 1;
        window.ctRenderLine(window.ctState.index);
      });
      return;
    }

    if (namecard) namecard.style.display = '';
    if (box) box.style.display = '';
    var textEl = document.getElementById('ct-dialogue-text');
    if (!textEl) return;
    ctRenderName(line.name);
    textEl.classList.toggle('is-thought', !!line.thought);
    textEl.classList.toggle('is-tremble', line.tremble === true);
    // narration: голубой текст без плашки имени
    textEl.classList.toggle('is-narration', line.narration === true);
    if (namecard) namecard.style.visibility = line.narration ? 'hidden' : '';
    // musicFade: тема уходит в тишину под реплику
    if (line.musicFade) { window.nsdHush = true; nsdCrossfade(null, 900); }
    clearTimeout(window.ctTypeTimeout);
    clearTimeout(window.ctForceTimer);
    cancelAnimationFrame(window.ctTypeRaf);
    textEl.textContent = '';

    // Печать по кадрам, а не по таймеру на каждую букву, и правим готовые
    // текстовые узлы вместо пересоздания: наблюдатель мутаций даже не будит.
    var segs = ctBuildDialogueSegments(textEl, line.text);
    window.ctSegs = segs;
    var total = ctSegsLength(segs), shown = 0, started = 0;
    window.ctSegsTotal = total;
    // Свой звук реплики бьёт ровно в тот символ, с которого начинается
    // золотая вставка. Золота нет — звук играет сразу с первой буквы.
    var sfxAt = ctGoldStart(segs), sfxDone = false;
    function fireSfx() {
      if (sfxDone) return;
      sfxDone = true;
      if (line.sfx && window.nsdPlaySfx) window.nsdPlaySfx(line.sfx, 0.7);
      // musicNow: тема меняется ровно на этой реплике, а не строкой раньше
      if (line.musicNow) nsdCrossfade((TRACKS[line.musicNow] || {}).url || null);
      // quake: реплика бьёт вместе с тряской кадра
      if (line.quake) {
        var cr = document.getElementById('ct-root');
        if (cr) {
          cr.classList.remove('ct-quake');
          void cr.offsetWidth;
          cr.classList.add('ct-quake');
          setTimeout(function () { cr.classList.remove('ct-quake'); }, 520);
        }
      }
    }
    window.ctFireSfx = fireSfx;
    if (sfxAt <= 0) fireSfx();
    window.ctState.typing = true;
    function frame(now) {
      if (!started) started = now;
      var want = Math.min(total, Math.floor((now - started) / CT_CHAR_MS) + 1);
      if (want > shown) {
        ctFillSegments(segs, want);
        shown = want;
        if (shown >= sfxAt) fireSfx();
      }
      if (shown < total) {
        window.ctTypeRaf = requestAnimationFrame(frame);
      } else {
        window.ctState.typing = false;
        window.ctAutoSchedule();
        ctScheduleForced(line);
      }
    }
    window.ctTypeRaf = requestAnimationFrame(frame);
  };

  // autoNext: реплику не ждут по клику — через N мс сцена идёт дальше сама.
  // Так последняя фраза Треска обрывается плашкой «ПРОТИВ!».
  function ctScheduleForced(line) {
    clearTimeout(window.ctForceTimer);
    if (!line || !line.autoNext) return;
    window.ctForceTimer = setTimeout(function () {
      window.ctForceTimer = null;
      if (window.ctState.typing) return;
      window.ctAdvance();
    }, line.autoNext);
  }

  // Позиция первой золотой буквы в общей строке (-1, если золота нет)
  function ctGoldStart(segs) {
    var at = 0;
    for (var i = 0; i < segs.length; i++) {
      if (segs[i].gold) return at + 1;
      at += segs[i].text.length;
    }
    return 0;
  }

  // ------------------------------------------------------------
  // ЗОЛОТОЙ ТЕКСТ В РЕПЛИКАХ СУДА
  // Всё, что обёрнуто в **двойные звёздочки**, печатается золотом.
  // ------------------------------------------------------------
  // Слова, которые набираются курсивом всюду, где встретятся
  var CT_ITALIC_RE = /(Дезинфекция)/;
  function ctBuildDialogueSegments(host, text) {
    // **золото**, ##сильная дрожь## и ~~лёгкая дрожь~~ — куски одной строки
    // со своим стилем. Одиночные звёздочки не разбираются: они нужны как
    // обычный символ.
    var parts = String(text).split('**'), segs = [];
    for (var i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      var gold = i % 2 === 1;
      var chunks = [];
      (gold ? [parts[i]] : parts[i].split('##')).forEach(function (c, ci) {
        var isHard = !gold && ci % 2 === 1;
        if (isHard) { chunks.push({ t: c, hard: true }); return; }
        c.split('~~').forEach(function (d, di) { chunks.push({ t: d, soft: di % 2 === 1 }); });
      });
      for (var k = 0; k < chunks.length; k++) {
        if (!chunks[k].t) continue;
        var hard = !!chunks[k].hard;
        var soft = !!chunks[k].soft;
        // Кусок ещё раз режем по «Дезинфекция»: это слово всегда курсивом.
        // Режем именно здесь, а не постобработкой, потому что печать по
        // буквам дописывает текст в готовые узлы — обёртки после неё
        // порвали бы анимацию.
        var target = host;
        if (gold || hard || soft) {
          target = document.createElement('span');
          target.className = gold ? 'ct-gold' : (hard ? 'ct-tremble-hard' : 'ct-tremble-soft');
          host.appendChild(target);
        }
        var sub = chunks[k].t.split(CT_ITALIC_RE);
        for (var q = 0; q < sub.length; q++) {
          if (!sub[q]) continue;
          var node = document.createTextNode('');
          if (q % 2 === 1) {
            var em = document.createElement('i');
            em.className = 'ct-em';
            em.appendChild(node);
            target.appendChild(em);
          } else target.appendChild(node);
          segs.push({ node: node, text: sub[q], gold: gold });
        }
      }
    }
    if (!segs.length) {
      var empty = document.createTextNode('');
      host.appendChild(empty);
      segs.push({ node: empty, text: '' });
    }
    return segs;
  }
  function ctSegsLength(segs) {
    var n = 0;
    for (var i = 0; i < segs.length; i++) n += segs[i].text.length;
    return n;
  }
  function ctFillSegments(segs, count) {
    var left = count;
    for (var i = 0; i < segs.length; i++) {
      var len = segs[i].text.length;
      var take = left <= 0 ? 0 : Math.min(len, left);
      if (segs[i].node.data.length !== take) segs[i].node.data = segs[i].text.slice(0, take);
      left -= take;
    }
  }

  window.ctAdvance = function () {
    if (window.ctIntroPlaying) return;
    if (window.ctEventRunning) return;
    // Сцена выбора улики ждёт улику, а не клик по экрану. Без этой заслонки
    // клик проматывал сцену насквозь, а счётчик реплик уезжал вперёд — и
    // дальше приходилось жать лишние разы, чтобы догнать текст.
    if (window.clueUIState && window.clueUIState.pick) return;
    var cur = (window.CT_LINES || [])[window.ctState.index];
    if (cur && cur.pick) return;
    if (window.swState && window.swState.active) return;
    if (window.scrumState && window.scrumState.active) return;
    if (window.nsdState && (window.nsdState.active || window.nsdState.finishing)) return;
    if (window.ctState.typing) {
      clearTimeout(window.ctTypeTimeout);
      cancelAnimationFrame(window.ctTypeRaf);
      var lines = window.CT_LINES || [];
      var line = lines[window.ctState.index];
      if (line && !line.nsd && !line.event && !line.sword && !line.scrum && !line.pick && !line.guess && !line.music && !line.trio && !line.goto) {
        if (window.ctFireSfx) window.ctFireSfx();   // текст домотали — звук всё равно должен прозвучать
        if (window.ctSegs) ctFillSegments(window.ctSegs, window.ctSegsTotal || 0);
        else { var textEl = document.getElementById('ct-dialogue-text'); if (textEl) textEl.textContent = String(line.text).split('**').join(''); }
      }
      window.ctState.typing = false;
      window.ctAutoSchedule();
      ctScheduleForced(line);
      return;
    }
    sfxAdvance.play();
    var lines = window.CT_LINES || [];
    if (window.ctState.index < lines.length - 1) {
      window.ctState.index++;
      window.ctRenderLine(window.ctState.index);
    }
  };

  window.initClassTrialDialogue = function () {
    // прогреваем темы, которые понадобятся по ходу суда
    ['nsd-argument', 'nsd-perjury', 'nsd-space', 'nsd-bladelock', 'nsd-panic', 'nsd-heat',
     'resurrection', 'resurrection-nointro', 'sun-edition', 'sun-edition-b', 'nsd-scrum'].forEach(nsdPreloadTrack);
    // сносим обвязку прошлых сцен, иначе при перезапуске суда на экране
    // остаются окна «трёх героев» и полосы паники
    ['ct-trio', 'nsd-panic', 'scrum-root', 'scr-open'].forEach(function (id) {
      var n = document.getElementById(id); if (n) n.remove();
    });
    ctClockStop();
    hpRemove();
    document.documentElement.classList.remove('ct-trio-on', 'nsd-panic-on', 'scr-active', 'nsd-intro-on');
    window.ctState.index = 0;
    window.ctState.typing = false;
    var zone = document.getElementById('ct-clickzone');
    if (zone && !zone._ctBound) { zone._ctBound = true; zone.addEventListener('click', function () { window.ctAdvance(); }); }
    // Заставка «КЛАССНЫЙ СУД» играет только на пассаже подготовки,
    // здесь сразу начинается диалог.
    if (window.nsdState && window.nsdState.active) return;
    window.ctRenderLine(0);
  };

  // ============================================================
  // НОН-СТОП ДЕБАТЫ v6
  // Слабое место — только текст, выделенный *звёздочками*.
  // ============================================================
  var NSD_DEBATES = {
    "debate1": {
      bullets: ["file"],
      hint: { name: "Треск", thought: true, text: "Смертельная рана Фусту. Разве об этом не было что-то сказано в Файле Ксебета?" },
      lines: [
        { speaker: "Стерва", text: "Смертельная рана Фусту..." },
        { speaker: "Нулл", text: "Тело нашли в ТВ-комнате." },
        { speaker: "Оса", text: "А умер он примерно в *полтретьего ночи*.", weakPoint: "__decoy__" },
        { speaker: "Бог", text: "Я заметила на затылке Фусту странный синяк." },
        { speaker: "Бог", text: "Может, он как-то связан с его смертью?" },
        { speaker: "Кай", text: "Я понял!" },
        { speaker: "Кай", text: "Убийца заманил Фусту в ТВ-комнату.." },
        { speaker: "Кай", text: "Потом подошел сзади и *ударил его по затылку*!", weakPoint: "file" },
        { speaker: "Оса", text: "Вполне может быть." },
        { speaker: "Оса", text: "По крайней мере, пока это звучит логично." }
      ]
    },
    "debate2": {
      bullets: ["screwdriver", "file", "audio"],
      hint: { name: "Треск", thought: true, text: "Можно ли как-то подтвердить, что Фусту на самом деле умер из-за.." },
      lines: [
        { speaker: "Полина", text: "Рядом с телом лежала отвертка." },
        { speaker: "Полина", text: "Фусту пытался починить телевизор." },
        { speaker: "Полина", text: "И во время этого его *ударило током*!", weakPoint: "__decoy__" },
        { speaker: "Нулл", text: "Звучит правдоподобно." },
        { speaker: "Нулл", text: "Он ведь хотел понять, что происходит снаружи." },
        { speaker: "Нулл", text: "Возможно, поэтому и полез к телевизору." },
        { speaker: "Бог", text: "Пока это всего лишь предположение." },
        { speaker: "Бог", text: "У нас нет *улик, подтверждающих это*.", weakPoint: "audio" },
        { speaker: "Оса", text: "А что еще нам нужно?" },
        { speaker: "Оса", text: "Отвертка рядом, телевизор сломан, Фусту мертв." },
        { speaker: "Юта", text: "Если собрать всё вместе, версия вполне очевидная." },
        { speaker: "Юта", text: "Хотя я бы на его месте вообще не стала чинить телевизор." },
        { speaker: "Шин", text: "Потому что ты вообще ничего не стала бы чинить." }
      ]
    },
    // Массовая паника: экран делится на три полосы, у каждого героя своя
    // очередь реплик, и все три идут ОДНОВРЕМЕННО. Слабых мест несколько —
    // в каждой полосе своё. Тексты пока рыба.
    // Массовая паника: три полосы, у каждого героя своя очередь реплик,
    // и все три идут ОДНОВРЕМЕННО. Заканчивается согласием с показаниями
    // Нулл — голубой сегмент в её полосе.
    "panic1": {
      panic: true,
      music: "nsd-panic",
      outro: "resurrection",
      bullets: ["null-location", "socket", "blueprints", "vent"],
      hint: { name: "Треск", thought: true, text: "Мне нужно сконцентрироваться на словах одного человека. Кого нужно оправдать сейчас в первую очередь?" },
      // who — кто произносит именно эту реплику. В полосе идёт перепалка,
      // поэтому плашка над ней меняется вместе с текстом.
      lanes: [
        { speaker: "Кай", lines: [
          { who: "Оса",    text: "Ну и что ты делал ночью?" },
          { who: "Кай",    text: "Спал, конечно!" },
          { who: "Кай",    text: "Я нашел такое хорошее место." },
          { who: "Оса",    text: "И ты ни разу не был во второй локации?" },
          { who: "Кай",    text: "Был, но только днем! Правда!" },
          { who: "Кай",    text: "Убийца использовал *медную проволоку*, верно?", weakPoint: "__decoy__" },
          { who: "Кай",    text: "Я даже не знаю, где такое найти!" },
          { who: "Оса",    text: "То, что ты не «знаешь, где ее найти», нихуя не значит." },
          { who: "Кай",    text: "Эмм.." }
        ] },
        { speaker: "Полина", lines: [
          { who: "Полина", text: "Я не была одна, со мной все время была Юта!" },
          { who: "Полина", text: "Юта, правда ведь?" },
          { who: "Юта",    text: "Ну типа." },
          { who: "Юта",    text: "Я всю ночь буквально показывала ей трюки." },
          { who: "Шин",    text: "Но что, если Полина действовала *до того, как ты пришла*?", weakPoint: "__decoy__" },
          { who: "Юта",    text: "Чего блин?" },
          { who: "Шин",    text: "Она подготовила ловушку до твоего прихода." },
          { who: "Полина", text: "Это невозможно, мне бы тогда нужно было *спрятать тело*!", weakPoint: "__decoy__" },
          { who: "Шин",    text: "Вы что, были до самого утра вместе?" },
          { who: "Полина", text: "Ну нет, но.. Короче, это не я была!" }
        ] },
        { speaker: "Нулл", lines: [
          { who: "Нулл",   text: "Я была одна, признаю." },
          { who: "Бог",    text: "Значит, у тебя нет алиби на этот период." },
          { who: "Нулл",   text: "Но я не *автор этой записки*.", weakPoint: "__decoy__" },
          { who: "Нулл",   text: "Я сидела все время в баре." },
          { who: "Бог",    text: "И ты оттуда не выходила?" },
          { who: "Нулл",   text: "Выходила, но не в сторону ТВ-комнаты." },
          { who: "Нулл",   text: "Ночью выключили свет." },
          { who: "Нулл",   text: "Мне пришлось -ненадолго отойти в щиток-, чтобы вернуть свет.", agree: "null-location" },
          { who: "Бог",    text: "Свет выключался?" },
          { who: "Нулл",   text: "Ага. Это ночью произошло." }
        ] }
      ]
    },
    "debate3": {
      music: "nsd-perjury",
      bullets: ["screwdriver", "bleach-smell", "alibi-yuta"],
      hint: { name: "Треск", thought: true, text: "Шин уверяет, что Фусту поднялся наверх незамеченным. Но кто-то ведь был в библиотеке той ночью…" },
      lines: [
        { speaker: "Оса", text: "Я надеюсь, это не просто трата времени." },
        { speaker: "Шин", text: "Я согласен с тем, что через Фусту *прошел ток*.", weakPoint: "__decoy__" },
        { speaker: "Шин", text: "Однако..." },
        { speaker: "Шин", text: "Местом преступления была -комната видеонаблюдения-." },
        { speaker: "Шин", text: "Он поднялся на второй этаж сам, *пока его никто не видел*.", weakPoint: "alibi-yuta" },
        { speaker: "Шин", text: "А там его поджидал убийца." },
        { speaker: "Нулл", text: "И почему ты так думаешь?" },
        { speaker: "Шин", text: "Розетка в этой комнате была вся покрыта сажей." },
        { speaker: "Шин", text: "Фусту ударило током там, а затем его перетащили вниз." },
        { speaker: "Юта", text: "Чего?!", shake: true },
        { speaker: "Юта", text: "Мы же уже решили, что это был несчастный случай!" }
      ]
    },
    // Оса вешает убийство на Треска. Согласие — «другим путём» в офис:
    // такой путь существует, и доказывают его чертежи Кая.
    "debate4": {
      music: "nsd-heat",
      outro: "sun-edition-b",
      bullets: ["blueprints", "vent", "sign"],
      hint: { name: "Треск", thought: true, text: "Оса уверен, что в офис можно попасть в обход шкафа. И ведь он прав — есть чем это доказать." },
      lines: [
        { speaker: "Оса", text: "Треск сделал все в точности как мы и обсуждали." },
        { speaker: "Оса", text: "*Повесил табличку*, *натянул проволоку* и дождался Фусту.", weakPoint: "__decoy__" },
        { speaker: "Оса", text: "А когда его ебнуло, -перетащил тело вниз-.", agree: "__decoy__" },
        { speaker: "Юта", text: "Это понятно." },
        { speaker: "Полина", text: "Но как он передвинул шкаф?" },
        { speaker: "Бог", text: "Только не говори, что в этом деле есть сообщник." },
        { speaker: "Оса", text: "Сообщника нет." },
        { speaker: "Оса", text: "Ему было достаточно воспользоваться -другим путем- в офис.", agree: "blueprints" },
        { speaker: "Нулл", text: "Эхх." }
      ]
    },
    "debate5": {
      music: "nsd-final-aa",
      outro: "resurrection",
      bullets: ["gloves", "audio", "blood"],
      hint: { name: "Треск", thought: true, text: "Оса утверждает, что наши обвинения слишком слабы. Вот бы у нас была еще хотя бы одна конкретная улика.." },
      lines: [
        { speaker: "Оса", text: "Я вижу вам так нравится обвинять людей." },
        { speaker: "Оса", text: "Особенно когда они полностью невиновны!", shake: true },
        { speaker: "Оса", text: "Но есть еще одна проблема." },
        { speaker: "Оса", text: "Струны мог найти любой *на складе*.", weakPoint: "__decoy__" },
        { speaker: "Оса", text: "От этого и такой -звук на диктофоне-.", agree: "audio" },
        { speaker: "Оса", text: "А кровь могла быть оставлена.." },
        { speaker: "Оса", text: "Еще *задолго до убийства!*", weakPoint: "gloves", shake: true },
        { speaker: "Оса", text: "С такими доводами вы не сможете ничего доказать!" },
        { speaker: "Юта", text: "Как же ты отчаянно пытаешься." }
      ]
    }
  };

  // Барабан: та же картинка, но вычищенная от 24 битых пикселей по краям
  // и вшитая в файл, чтобы не зависеть от загрузки с GitHub.
  var NSD_BULLET_URL = 'data:image/png;base64,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';
  var NSD_INTRO_SFX = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/danganronpa-v3-sound-effect-non-stop-debate_G8J1pfkC.mp3';
  var NSD_SFX_BULLET_HIT = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/vidssavecom-danganronpa-v3-sound-effect-correct-truth-bullet-256kbps_ZEaJUbqF.mp3';
  var NSD_SFX_BREAK      = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/vidssavecom-danganronpa-v3-sound-effect-counter-256kbps_zjsciP09.mp3';
  var SFX_LOUD_TEXT      = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/Danganronpa%20V3%20Sound%20Effect%20-%20Loud%20Text%20Noise.mp3';
  var SFX_LOUD_TEXT2     = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/Danganronpa%20V3%20Sound%20Effect%20-%20Loud%20Text%20Noise%202.mp3';
  var SFX_DETERMINED     = 'https://github.com/hwhyssjej/game-audio/raw/main/Danganronpa%20V3%20Sound%20Effect%20-%20Determined%20Text%20Noise.mp3';
  window.CT_SFX = { loud: SFX_LOUD_TEXT, loud2: SFX_LOUD_TEXT2, determined: SFX_DETERMINED };
  var NSD_SFX_PICK       = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/%D0%B2%D1%8B%D0%B1%D0%BE%D1%80%D0%BF%D1%83%D0%BB%D0%B8.mp3';

  var NSD_TIME_MS        = 90000; // сколько времени даётся на круг дебатов
  var NSD_INTRO_DELAY_MS = 2000;  // пауза после исчезновения диалогового окна
  var NSD_START_AT_MS    = 1500;  // на 1.5 секунде звука «Нон-Стоп Дебаты» -> «Старт!»
  var NSD_START_HOLD_MS  = 800;   // сколько «Старт!» растёт и исчезает
  var NSD_CYL_BIG_MS     = 1500;  // сколько барабан остаётся большим
  var NSD_LINE_HOLD_MS   = 3400;
  var NSD_PANIC_HOLD_MS  = 5200;  // сколько реплика едет по своей полосе  // сколько реплика висит вместе с появлением
  var NSD_LINE_OUT_MS    = 440;   // длительность ухода реплики
  // Следующая реплика входит только когда предыдущая полностью ушла:
  // нахлёста больше нет, иначе два текста читались один поверх другого.
  var NSD_LINE_LINK_MS   = NSD_LINE_OUT_MS + 120;
  var NSD_BREAK_HOLD_MS  = 2400;
  var NSD_WORD_FADE_MS   = 700;  // «ПРОРЫВ!» плавно гаснет в черноту
  var NSD_MISS_HOLD_MS   = 1250; // тряска и красная слабая точка после промаха  // «ПРОРЫВ!» плавно гаснет в черноту  // сколько держим ПРОРЫВ! до затемнения
  var NSD_SHOT_DELAY_MS  = 120;   // пауза между звуком выстрела и вылетом слова
  var NSD_WORD_FLY_MS    = 280;   // сколько летит трассер пули
  var NSD_WORD_BURST_MS  = 1050;  // сколько слово разлетается до конца
  var NSD_REFUTE_MS      = 900;   // плавное затемнение перед разбитием экрана
  var NSD_GLASS_MS       = 1600;  // сколько осыпается стекло
  var NSD_FADE_TO_BLACK_MS = 620; // плавный уход в чёрное в конце разбития
  var NSD_DARK_MS        = 260;   // пауза на чёрном перед словом ПРОРЫВ!   // сколько осыпается стекло до чёрного экрана
  var NSD_FADE_MS        = 750;   // длительность затемнения/проявления
  var NSD_FADE_HOLD_MS   = 900;   // пауза на чёрном экране  // сколько держим 'ПРОРЫВ!' перед возвратом в диалог

  window.nsdState = { active: false, finishing: false, debateId: null, i: 0, onComplete: null, prevTrack: null };
  window.nsdTimers = [];
  function nsdWait(fn, ms) { var t = setTimeout(fn, ms); window.nsdTimers.push(t); return t; }
  function nsdClearTimers() { window.nsdTimers.forEach(clearTimeout); window.nsdTimers = []; }

  // ============================================================
  // ОБЩИЙ HUD МИНИ-ИГР: «СОСТОЯНИЕ» СПРАВА СВЕРХУ И ЧАСЫ ПО ЦЕНТРУ
  //
  // «Состояние» — ряд звёзд, и это здоровье, а не счётчик успехов: каждая
  // ошибка снимает половину звезды. Ряд один на всю игру, поэтому и живёт
  // он отдельно от самих сцен — нон-стоп дебаты, схватка, битва на мечах
  // и предъявление улики берут его как есть. Виджеты лежат прямо в body с
  // position: fixed: окно улик — модалка на z-index 2000, и внутри #ct-root
  // ряд ушёл бы под неё.
  // ============================================================
  var HP_STARS    = 5;   // сколько звёзд в ряду
  var HP_PER_STAR = 2;   // половинок в звезде: ошибка снимает одну
  var HP_FULL     = HP_STARS * HP_PER_STAR;
  window.hpState = window.hpState || { left: HP_FULL };

  function ctFmtTime(ms) {
    if (!(ms > 0)) ms = 0;
    var m = Math.floor(ms / 60000);
    var s = Math.floor(ms / 1000) % 60;
    var c = Math.floor(ms) % 1000;
    function p(n) { return (n < 10 ? '0' : '') + n; }
    function p3(n) { return (n < 100 ? (n < 10 ? '00' : '0') : '') + n; }
    return p(m) + ':' + p(s) + ':' + p3(c);
  }

  // ---------- «Состояние» ----------
  function hpEnsure() {
    var el = document.getElementById('ct-hp');
    if (el) return el;
    el = document.createElement('div');
    el.id = 'ct-hp';
    var stars = '';
    for (var i = 0; i < HP_STARS; i++) {
      // Звезда собрана из двух: тусклая лежит подложкой, яркая обрезается
      // по ширине. Половина — это ровно половина ширины яркой звезды.
      stars += '<i class="ct-hp-star" style="--i:' + i + '">' +
                 '<span class="ct-hp-bg">★</span>' +
                 '<span class="ct-hp-fill"><span>★</span></span>' +
               '</i>';
    }
    el.innerHTML = '<div class="ct-hp-cap"><span>Состояние</span></div>' +
                   '<div class="ct-hp-row">' + stars + '</div>';
    document.body.appendChild(el);
    hpRender();
    void el.offsetWidth;
    el.classList.add('is-in');
    return el;
  }

  function hpRender() {
    var el = document.getElementById('ct-hp');
    if (!el) return;
    var left = window.hpState.left;
    Array.prototype.forEach.call(el.querySelectorAll('.ct-hp-star'), function (s, i) {
      var got = Math.max(0, Math.min(HP_PER_STAR, left - i * HP_PER_STAR));
      var f = s.querySelector('.ct-hp-fill');
      if (f) f.style.width = (got / HP_PER_STAR * 100) + '%';
      s.classList.toggle('is-empty', got === 0);
    });
    el.classList.toggle('is-low', left <= HP_PER_STAR);
  }

  function hpReset() {
    window.hpState.left = HP_FULL;
    hpEnsure();
    hpRender();
  }

  // Снимает половину звезды. Возвращает true, когда состояние опустело —
  // сцена сама решает, что с этим делать (обычно начинается заново).
  function hpLose(halves) {
    hpEnsure();
    window.hpState.left = Math.max(0, window.hpState.left - (halves || 1));
    hpRender();
    var el = document.getElementById('ct-hp');
    if (el) { el.classList.remove('is-hit'); void el.offsetWidth; el.classList.add('is-hit'); }
    return window.hpState.left <= 0;
  }

  function hpRemove() {
    var el = document.getElementById('ct-hp');
    if (el) el.remove();
  }

  // ---------- часы ----------
  // Одни на все сцены: цифры по центру сверху, без плашки и иконок.
  window.ctClock = window.ctClock || { active: false, left: 0, paused: false, raf: 0, prev: 0, onEnd: null };

  // host — куда положить виджет. По умолчанию часы висят по центру сверху
  // прямо в body; сцене выбора предположения они нужны внутри её панели,
  // под списком, как на референсе.
  function ctClockEnsure(host, variant) {
    host = host || document.body;
    var el = document.getElementById('ct-clock');
    if (!el) {
      el = document.createElement('div');
      el.id = 'ct-clock';
      el.innerHTML = '<div class="ct-clock-time" id="ct-clock-time">00:00:000</div>';
    }
    el.className = variant || '';
    if (el.parentNode !== host) host.appendChild(el);
    void el.offsetWidth;
    el.classList.add('is-in');
    return el;
  }

  function ctClockPaint() {
    var t = document.getElementById('ct-clock-time');
    if (!t) return;
    t.textContent = ctFmtTime(window.ctClock.left);
    t.classList.toggle('is-low', window.ctClock.left <= 10000);
  }

  function ctClockTick(now) {
    var c = window.ctClock;
    if (!c.active) return;
    if (!c.prev) c.prev = now;
    var dt = now - c.prev;
    c.prev = now;
    if (!c.paused) c.left -= dt;
    ctClockPaint();
    if (c.left <= 0) {
      c.left = 0;
      c.active = false;
      ctClockPaint();
      var end = c.onEnd; c.onEnd = null;
      if (end) end();
      return;
    }
    c.raf = requestAnimationFrame(ctClockTick);
  }

  function ctClockStart(ms, onEnd, opts) {
    opts = opts || {};
    var c = window.ctClock;
    cancelAnimationFrame(c.raf);
    c.active = true; c.left = ms; c.paused = false; c.prev = 0; c.onEnd = onEnd || null;
    ctClockEnsure(opts.host, opts.variant);
    ctClockPaint();
    c.raf = requestAnimationFrame(ctClockTick);
  }

  function ctClockPause(on) {
    var c = window.ctClock;
    if (c) c.paused = !!on;
  }

  function ctClockStop() {
    var c = window.ctClock;
    c.active = false;
    c.onEnd = null;
    cancelAnimationFrame(c.raf);
    var el = document.getElementById('ct-clock');
    if (el) el.remove();
  }

  // Буквы со своим углом и высотой — для заголовков «Нон-Стоп Дебаты» и «Старт!»
  function nsdJitterSpans(container, text) {
    container.innerHTML = '';
    var idx = 0;
    for (var k = 0; k < text.length; k++) {
      var ch = text[k];
      var s = document.createElement('span');
      s.textContent = ch === ' ' ? ' ' : ch;
      s.style.setProperty('--i', idx++);
      if (ch !== ' ') {
        s.style.setProperty('--r', (Math.random() * 18 - 9).toFixed(1) + 'deg');
        s.style.setProperty('--ty', (Math.random() * 18 - 9).toFixed(1) + 'px');
      } else {
        s.style.setProperty('--r', '0deg');
        s.style.setProperty('--ty', '0px');
      }
      container.appendChild(s);
    }
    return idx;
  }

  // Смена темы без обрыва: сначала гасим текущую, потом подменяем источник
  // и плавно поднимаем громкость. Раньше здесь был мгновенный pause/play,
  // и на каждом переходе музыка щёлкала.
  var NSD_XFADE_OUT_MS = 340, NSD_XFADE_IN_MS = 560;
  // Треки сцен держим прогретыми: аудиоэлемент один, и после смены src
  // браузер лезет за файлом в сеть. Из-за этого на входе в дебаты была
  // секундная дыра, а старая тема успевала «вернуться» и захрипеть.
  var nsdTrackCache = {};
  // ПРЕДЗАГРУЗКА ТЕМ.
  // Скачать файл через fetch и играть из blob нельзя: ни github.com, ни
  // vgmtreasurechest не отдают CORS-заголовки, запрос падает. Поэтому на
  // каждую тему заводим свой <audio> с preload="auto" и потом играем
  // ИМЕННО ЕГО, а не подставляем src в общий элемент. Подстановка src
  // всегда начинала загрузку заново — отсюда и пауза, и рывки.
  var nsdAudioByUrl = {};
  var nsdPreloadQueue = [], nsdPreloadBusy = false;

  function nsdAudioFor(url) { return (url && nsdAudioByUrl[url]) || null; }

  // Тема с длинным вступлением зацикливается не в ноль, а в loopStart:
  // штатный a.loop умеет только с начала, поэтому его выключаем и
  // перематываем сами по 'ended'.
  var nsdLoopStartByUrl = null;
  function nsdApplyLoop(a, url) {
    if (!nsdLoopStartByUrl) {
      nsdLoopStartByUrl = {};
      for (var k in TRACKS) if (TRACKS[k].loopStart) nsdLoopStartByUrl[TRACKS[k].url] = TRACKS[k].loopStart;
    }
    var ls = nsdLoopStartByUrl[url];
    if (!ls) { a.loop = true; return; }
    a.loop = false;
    a._loopStart = ls;
    if (a._loopBound) return;
    a._loopBound = true;
    a.addEventListener('ended', function () {
      try { a.currentTime = a._loopStart || 0; } catch (e) {}
      var pr = a.play(); if (pr && pr.catch) pr.catch(function () {});
    });
  }
  window.nsdAudioFor = nsdAudioFor;

  function nsdPreloadNext() {
    if (nsdPreloadBusy) return;
    var key = nsdPreloadQueue.shift();
    if (!key) return;
    var t = TRACKS[key];
    if (!t || nsdAudioByUrl[t.url]) { nsdPreloadNext(); return; }
    nsdPreloadBusy = true;
    var a = document.createElement('audio');
    a.preload = 'auto';
    a.loop = !!t.loop;
    a.volume = 0;
    a.src = t.url;
    a.style.display = 'none';
    document.body.appendChild(a);
    nsdAudioByUrl[t.url] = a;
    nsdTrackCache[key] = a;
    // Следующий файл берём, когда этот уже проигрывается целиком без
    // подкачки, либо по таймауту — очередь не должна вставать намертво.
    var moved = false;
    var go = function () {
      if (moved) return;
      moved = true;
      nsdPreloadBusy = false;
      nsdPreloadNext();
    };
    a.addEventListener('canplaythrough', go);
    a.addEventListener('error', go);
    setTimeout(go, 12000);
    try { a.load(); } catch (e) { go(); }
  }

  function nsdPreloadTrack(key) {
    var t = TRACKS[key];
    if (!t || nsdAudioByUrl[t.url]) return;
    if (nsdPreloadQueue.indexOf(key) === -1) nsdPreloadQueue.push(key);
    nsdPreloadNext();
  }
  window.nsdPreloadTrack = nsdPreloadTrack;

  // Порядок важен: сначала темы суда, которые понадобятся раньше всего.
  var NSD_PRELOAD_ORDER = ['trial-dawn', 'nsd-argument', 'nsd-perjury', 'nsd-space',
    'nsd-bladelock', 'nsd-panic', 'resurrection', 'resurrection-nointro', 'sun-edition'];
  window.nsdPreloadAll = function () {
    NSD_PRELOAD_ORDER.forEach(nsdPreloadTrack);
    Object.keys(TRACKS).forEach(nsdPreloadTrack);
  };

  // Браузер не даёт играть без жеста пользователя. На первом же клике
  // прогоняем все припасённые элементы через play/pause на нулевой
  // громкости: дальше они включаются мгновенно и молча.
  var nsdUnlocked = false;
  function nsdUnlockAudio() {
    if (nsdUnlocked) return;
    nsdUnlocked = true;
    Object.keys(nsdAudioByUrl).forEach(function (u) {
      var a = nsdAudioByUrl[u];
      if (a === window.bgAudio) return;
      try {
        a.volume = 0;
        var pr = a.play();
        if (pr && pr.then) pr.then(function () { a.pause(); a.currentTime = 0; }).catch(function () {});
      } catch (e) {}
    });
  }
  document.addEventListener('pointerdown', nsdUnlockAudio, true);
  document.addEventListener('click', nsdUnlockAudio, true);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { window.nsdPreloadAll(); });
  } else setTimeout(function () { window.nsdPreloadAll(); }, 0);

  // fastMs — укоротить затухание старой темы (вход в сцену должен быть резким)
  function nsdCrossfade(url, fastMs) {
    // Любая осмысленная смена темы снимает «тишину сцены»
    if (url) window.nsdHush = false;
    // Тот же трек уже играет — второй раз заводить нечего, иначе он
    // обрывается и начинается заново.
    var cur = window.bgAudio;
    if (url && window.currentTrack === url && cur && !cur.paused) {
      clearInterval(window.fadeTimer);
      var tgt = window.isMuted ? 0 : MAX_VOLUME, ts = Date.now(), v0 = cur.volume;
      window.fadeTimer = setInterval(function () {
        var q = Math.min(1, (Date.now() - ts) / 200);
        cur.volume = v0 + (tgt - v0) * q;
        if (q >= 1) clearInterval(window.fadeTimer);
      }, 25);
      return;
    }
    clearInterval(window.fadeTimer);
    var a = window.bgAudio;
    var outMs = fastMs || NSD_XFADE_OUT_MS;
    var from = a.volume, t0 = Date.now();
    window.fadeTimer = setInterval(function () {
      var p = Math.min(1, (Date.now() - t0) / outMs);
      a.volume = from * (1 - p);
      if (p < 1) return;
      clearInterval(window.fadeTimer);
      a.pause();
      if (!url) { a.removeAttribute('src'); window.currentTrack = ''; return; }
      // Если тема уже припасена — играем сам припасённый элемент. Ставить
      // src в общий <audio> нельзя: это сбрасывает буфер и тема заводится
      // с задержкой на загрузку.
      var ready = nsdAudioFor(url);
      if (ready) {
        a = window.bgAudio = ready;
        try { a.currentTime = 0; } catch (e) {}
      } else {
        a.src = url;
      }
      nsdApplyLoop(a, url);
      window.currentTrack = url;
      a.volume = 0;
      var rise = function () {
        clearInterval(window.fadeTimer);
        var target = window.isMuted ? 0 : MAX_VOLUME, t1 = Date.now();
        window.fadeTimer = setInterval(function () {
          var q = Math.min(1, (Date.now() - t1) / NSD_XFADE_IN_MS);
          a.volume = target * q;
          if (q >= 1) clearInterval(window.fadeTimer);
        }, 25);
      };
      a.play().then(rise).catch(rise);
    }, 25);
  }

  // У каждого дебата может быть своя тема: ключ берём из NSD_DEBATES.music.
  // keepPrev — смена темы внутри уже начавшейся сцены: трек до неё не трогаем,
  // иначе в конце вернётся не музыка суда, а предыдущая тема самой сцены.
  function nsdEnterMusic(trackKey, keepPrev) {
    var t = TRACKS[trackKey] || TRACKS['nsd-argument'];
    if (!keepPrev) window.nsdState.prevTrack = window.currentTrack;
    // вход в сцену — почти без затухания, чтобы тема менялась сразу
    nsdCrossfade(t.url, 110);
  }
  function nsdExitMusic() {
    // До сцены музыки не было — просто плавно снимаем её тему
    nsdCrossfade(window.nsdState.prevTrack || null);
  }

  // Звуки кешируем: каждый new Audio(url) тянет файл заново, и GitHub
  // начинает отбивать запросы, если стрелять несколько раз подряд.
  var nsdSfxCache = {};
  window.nsdPlaySfx = nsdPlaySfx;
  function nsdPlaySfx(url, vol) {
    try {
      var a = nsdSfxCache[url];
      if (!a) { a = nsdSfxCache[url] = new Audio(url); a.preload = 'auto'; }
      a.volume = window.isMuted ? 0 : (vol || 0.8);
      a.currentTime = 0;
      a.play().catch(function () {});
      return a;
    } catch (e) { return null; }
  }

  // ------------------------------------------------------------
  // Прицел: рисуем в DOM, чтобы кольцо внутри могло крутиться
  // ------------------------------------------------------------
  function nsdAimEl() { return document.getElementById('nsd-aim'); }
  // Координаты пишем раз в кадр, а не на каждое событие мыши
  var nsdAimX = 0, nsdAimY = 0, nsdAimRaf = 0, nsdAimSeen = false;
  function nsdAimApply() {
    nsdAimRaf = 0;
    var a = nsdAimEl(); if (!a) return;
    a.style.setProperty('--nx', nsdAimX + 'px');
    a.style.setProperty('--ny', nsdAimY + 'px');
    if (!a.classList.contains('is-shown')) a.classList.add('is-shown');
  }
  function nsdAimMove(e) {
    nsdAimX = e.clientX; nsdAimY = e.clientY; nsdAimSeen = true;
    if (!nsdAimRaf) nsdAimRaf = requestAnimationFrame(nsdAimApply);
  }
  function nsdAimOn() {
    if (nsdAimEl()) return;
    var a = document.createElement('div');
    a.id = 'nsd-aim';
    a.innerHTML =
      '<div class="nsd-aim-outer"></div>' +
      '<div class="nsd-aim-tick t"></div><div class="nsd-aim-tick b"></div>' +
      '<div class="nsd-aim-tick l"></div><div class="nsd-aim-tick r"></div>' +
      '<div class="nsd-aim-ring"></div>' +
      '<div class="nsd-aim-dot"></div>';
    document.body.appendChild(a);
    document.addEventListener('mousemove', nsdAimMove, true);
    document.documentElement.classList.add('nsd-aim-active');
    // системный курсор уже спрятан, поэтому мишень должна быть видна сразу,
    // а не только после первого движения мышью
    if (!nsdAimSeen) { nsdAimX = window.innerWidth / 2; nsdAimY = window.innerHeight / 2; }
    nsdAimApply();
  }
  function nsdAimOff() {
    document.removeEventListener('mousemove', nsdAimMove, true);
    document.documentElement.classList.remove('nsd-aim-active');
    var a = nsdAimEl(); if (a) a.remove();
  }
  function nsdAimLock(on) {
    var a = nsdAimEl(); if (a) a.classList.toggle('is-locked', !!on);
  }

  // ------------------------------------------------------------
  // Разметка
  // ------------------------------------------------------------
  function nsdEnsureRoot() {
    var root = document.getElementById('ct-root');
    if (!root) return null;
    var flow = document.getElementById('nsd-root');
    if (!flow) {
      flow = document.createElement('div');
      flow.id = 'nsd-root';
      flow.innerHTML =
        '<div class="nsd-speaker-tag" id="nsd-speaker-tag">' +
          '<div class="nsd-name-card" id="nsd-name-card">' +
            '<span class="nsd-name-mark">//</span>' +
            '<span class="nsd-name-text" id="nsd-speaker-name"></span>' +
            '<span class="nsd-name-scan"></span>' +
          '</div>' +
        '</div>' +
        '<div class="nsd-line-wrap" id="nsd-line-wrap"></div>';
      root.appendChild(flow);
    }
    return flow;
  }

  // «Нон-Стоп Дебаты» -> «Старт!»
  function nsdPlayIntroAnim(callback, opts) {
    opts = opts || {};
    var root = document.getElementById('ct-root');
    if (!root) { callback(); return; }
    var intro = document.createElement('div');
    intro.id = 'nsd-intro';
    if (opts.variant) intro.classList.add(opts.variant);
    // лёгкие линии, разлетающиеся за кадр
    var rays = ctFlyLines(12, 'nsd-ray');
    intro.innerHTML =
      '<div class="nsd-intro-dim"></div>' +
      '<div class="nsd-intro-bars">' + rays + '</div>' +
      '<div class="nsd-intro-title" id="nsd-intro-title"></div>' +
      '<div class="nsd-intro-start" id="nsd-intro-start"></div>';
    root.appendChild(intro);

    // Пока висит заголовок, обвязка суда с кадра уходит совсем: дуга
    // «3 ГЛАВА» и бегущая строка иначе просвечивают сквозь затемнение и
    // читаются на чёрном как забытый кусок прошлой сцены.
    document.documentElement.classList.add('nsd-intro-on');

    var titleEl = intro.querySelector('#nsd-intro-title');
    var startEl = intro.querySelector('#nsd-intro-start');

    // Буквы обоих слов готовим заранее и даём браузеру кадр на растеризацию —
    // иначе первый кадр анимации совпадает с версткой и заставка дёргается.
    nsdJitterSpans(titleEl, opts.title || 'НОН-СТОП ДЕБАТЫ');
    nsdJitterSpans(startEl, 'СТАРТ!');
    void intro.offsetWidth;

    requestAnimationFrame(function () {
      nsdPlaySfx(NSD_INTRO_SFX, 0.85);
      titleEl.classList.add('is-shown');
    });

    nsdWait(function () {
      titleEl.classList.add('is-out');
      startEl.classList.add('is-shown');
      startEl.classList.add('is-popping');
      var fx = document.createElement('div');
      fx.className = 'nsd-intro-fx';
      fx.innerHTML = '<div class="nsd-intro-flash"></div><div class="nsd-intro-shock"></div>' +
        '<div class="nsd-start-ring" style="--rd:0.2s"></div>';
      intro.appendChild(fx);
      intro.classList.add('is-firing');
      // Перекраску сцены вешаем сюда: вспышка «СТАРТ!» на кадр забивает
      // экран, и под ней всё успевает стать красным. Раньше класс ставился
      // после снятия заставки, и красный «наезжал» уже на видимую сцену.
      if (opts.onFire) opts.onFire();
    }, NSD_START_AT_MS);

    nsdWait(function () {
      if (intro.parentNode) intro.remove();
      document.documentElement.classList.remove('nsd-intro-on');
      callback();
    }, NSD_START_AT_MS + NSD_START_HOLD_MS);
  }

  // Пули берём из самого дебата: набор задан в NSD_DEBATES.bullets.
  // Нужная лежит первой и выбрана по умолчанию, остальные — обманки:
  // выстрелить ими можно, но дебаты не закончатся.
  // Перемешивание Фишера-Йетса. Нужная улика всегда стояла первой в списке,
  // и её можно было выбрать не думая — теперь порядок случайный.
  function nsdShuffle(list) {
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = list[i]; list[i] = list[j]; list[j] = t;
    }
    return list;
  }

  function nsdBulletIds(debate, requiredId) {
    var list = [];
    if (requiredId && CLUE_DATA_JS[requiredId]) list.push(requiredId);
    (debate && debate.bullets ? debate.bullets : []).forEach(function (id) {
      if (CLUE_DATA_JS[id] && list.indexOf(id) === -1) list.push(id);
    });
    return nsdShuffle(list);
  }

  // Барабан выезжает слева большим, потом плавно уменьшается в левый угол
  function nsdShowCylinder(bulletIds, callback) {
    var root = document.getElementById('ct-root');
    if (!root) { callback(); return; }

    // Первая пуля — выбранная, остальные лежат ближе к барабану и тусклее
    var bullets = bulletIds.map(function (id, i) {
      return '<div class="nsd-truth-bullet' + (i === 0 ? ' is-active' : '') + '" data-bullet="' + id + '" style="--i:' + i + '">' +
               '<span class="nsd-bullet-case"><span class="nsd-bullet-primer"></span></span>' +
               '<span class="nsd-bullet-body"><span class="nsd-bullet-icon">✦</span>' +
               '<span class="nsd-bullet-label"></span></span>' +
             '</div>';
    }).join('');

    var wrap = document.createElement('div');
    wrap.id = 'nsd-cylinder';
    wrap.className = 'nsd-cylinder-wrap';
    wrap.innerHTML =
      '<div class="nsd-cylinder-stack">' +
        '<div class="nsd-ring nsd-ring-thick"></div>' +
        '<div class="nsd-cylinder-core"><img src="' + NSD_BULLET_URL + '" alt=""></div>' +
        '<div class="nsd-ring nsd-ring-thin"></div>' +
      '</div>' +
      '<div class="nsd-bullet-list">' + bullets + '</div>';
    root.appendChild(wrap);

    var labels = wrap.querySelectorAll('.nsd-bullet-label');
    bulletIds.forEach(function (id, i) {
      if (!labels[i]) return;
      labels[i].textContent = (CLUE_DATA_JS[id] && CLUE_DATA_JS[id].title) ? CLUE_DATA_JS[id].title : 'УЛИКА';
    });
    nsdFitBulletLabels(wrap);

    // Названия улик разной длины, а пуля одна на всех: подгоняем кегль и
  // разрядку под фактическую ширину, чтобы текст всегда влезал целиком.
  // На узком экране без этого «Показания Полины и Юты» обрезались.
  function nsdFitBulletLabels(wrap) {
    if (!wrap) return;
    function fit() {
      var labels = wrap.querySelectorAll('.nsd-bullet-label');
      Array.prototype.forEach.call(labels, function (el) {
        el.style.removeProperty('--bl-fs');
        el.style.removeProperty('--bl-ls');
        var cs = getComputedStyle(el);
        var size = parseFloat(cs.fontSize) || 14;
        var gap = parseFloat(cs.letterSpacing) || 0;
        // ужимаем шагами, пока строка не поместится в свою ячейку
        for (var i = 0; i < 40 && el.scrollWidth > el.clientWidth + 1; i++) {
          if (gap > 0) { gap = Math.max(0, gap - 0.25); el.style.setProperty('--bl-ls', gap + 'px'); }
          else if (size > 8) { size -= 0.5; el.style.setProperty('--bl-fs', size + 'px'); }
          else break;
        }
      });
    }
    fit();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit).catch(function () {});
    requestAnimationFrame(fit);
    function onResize() {
      if (!wrap.isConnected) { window.removeEventListener('resize', onResize); if (ro) ro.disconnect(); return; }
      fit();
    }
    window.addEventListener('resize', onResize);
    var ro = null;
    if (window.ResizeObserver) { ro = new ResizeObserver(onResize); ro.observe(document.documentElement); }
  }

  // Выбор пули: щелчок делает её активной и выдвигает вперёд
    wrap.querySelectorAll('.nsd-truth-bullet').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        if (b.classList.contains('is-active')) return;
        wrap.querySelectorAll('.nsd-truth-bullet').forEach(function (o) { o.classList.remove('is-active'); });
        b.classList.add('is-active');
        nsdPlaySfx(NSD_SFX_PICK, 0.6);
      });
    });

    requestAnimationFrame(function () {
      requestAnimationFrame(function () { wrap.classList.add('nsd-cylinder-ready'); });
    });
    // большой барабан держится, потом уезжает в угол и уменьшается вдвое
    nsdWait(function () { wrap.classList.add('nsd-cylinder-work'); }, NSD_CYL_BIG_MS);
    nsdWait(callback, NSD_CYL_BIG_MS + 550);
  }

  function nsdSpeakerShow(name) {
    var tag = document.getElementById('nsd-speaker-tag');
    var nameEl = document.getElementById('nsd-speaker-name');
    var card = document.getElementById('nsd-name-card');
    if (!tag || !nameEl) return;
    nameEl.textContent = name || '';
    tag.classList.add('is-shown');
    if (card) {
      card.classList.remove('is-in');
      void card.offsetWidth;   // перезапуск анимации появления планки
      card.classList.add('is-in');
    }
  }

  // Текст реплики: *звёздочки* — золотое слабое место, -тире- — голубое.
  // Знаки препинания сразу после выделения приклеиваем к нему, иначе
  // одинокая точка переносится на следующую строку.
  function nsdAppendSegment(el, text, tone, tail) {
    var holder = document.createElement('span');
    holder.className = 'nsd-weak-hold';
    var w = document.createElement('span');
    w.className = 'nsd-weak-segment is-' + tone;
    w.textContent = text;
    holder.appendChild(w);
    if (tail) holder.appendChild(document.createTextNode(tail));
    el.appendChild(holder);
  }

  // Голубые вставки ищем регуляркой, а не split('-'): иначе «ТВ-комнате»
  // и прочие дефисы внутри слов рвали бы реплику на куски.
  var NSD_CYAN_RE = /(^|[\s(«"„])-([^\s-][^-]*?)-(?=$|[\s.,!?;:…»)"“])/g;
  function nsdAppendPlain(el, text) {
    if (!text) return;
    NSD_CYAN_RE.lastIndex = 0;
    var last = 0, m;
    while ((m = NSD_CYAN_RE.exec(text)) !== null) {
      var lead = m[1] || '';
      var head = text.slice(last, m.index) + lead;
      if (head) el.appendChild(document.createTextNode(head));
      var rest = text.slice(m.index + m[0].length);
      var pm = rest.match(/^[.,!?;:…»)]+/);
      var tail = pm ? pm[0] : '';
      nsdAppendSegment(el, m[2], 'cyan', tail);
      last = m.index + m[0].length + tail.length;
      NSD_CYAN_RE.lastIndex = last;
    }
    if (last < text.length) el.appendChild(document.createTextNode(text.slice(last)));
  }

  // То же слово курсивом в дебатах и схватках. Здесь реплика появляется
  // целиком, поэтому достаточно пройти по готовым текстовым узлам.
  function nsdItalicize(root) {
    var walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var hits = [], n;
    while ((n = walk.nextNode())) if (n.data.indexOf('Дезинфекция') !== -1) hits.push(n);
    hits.forEach(function (t) {
      var frag = document.createDocumentFragment();
      t.data.split(/(Дезинфекция)/).forEach(function (p, i) {
        if (!p) return;
        if (i % 2 === 1) {
          var em = document.createElement('i');
          em.className = 'ct-em';
          em.textContent = p;
          frag.appendChild(em);
        } else frag.appendChild(document.createTextNode(p));
      });
      if (t.parentNode) t.parentNode.replaceChild(frag, t);
    });
  }

  function nsdBuildLineText(el, text) {
    var parts = String(text).split('*');
    for (var i = 0; i < parts.length; i++) {
      if (!parts[i]) continue;
      if (i % 2 === 1) {
        var tail = '';
        var next = parts[i + 1];
        if (next) {
          var m = next.match(/^[.,!?;:…»)]+/);
          if (m) { tail = m[0]; parts[i + 1] = next.slice(tail.length); }
        }
        nsdAppendSegment(el, parts[i], 'gold', tail);
      } else {
        nsdAppendPlain(el, parts[i]);
      }
    }
    nsdItalicize(el);
  }

  function nsdShowLine(i) {
    if (!window.nsdState.active) return;
    var debate = NSD_DEBATES[window.nsdState.debateId];
    if (!debate) { nsdFinish(); return; }
    var total = debate.lines.length;
    // дебаты идут по кругу, пока игрок не выстрелит по слабому месту
    var idx = ((i % total) + total) % total;
    window.nsdState.i = idx;

    var line = debate.lines[idx];
    nsdSpeakerShow(line.speaker);

    var wrap = document.getElementById('nsd-line-wrap');
    if (!wrap) return;
    // уходящую реплику не сносим: она доигрывает уход, пока новая уже входит.
    // Сносим только те, что зависли без анимации ухода (перезапуск круга).
    Array.prototype.slice.call(wrap.children).forEach(function (c) {
      if (!c.classList.contains('nsd-line-out')) c.remove();
    });

    var el = document.createElement('div');
    el.className = 'nsd-line nsd-line-in' + (line.shake ? ' is-shaky' : '');
    // «Дыхание» живёт на внутреннем слое: иначе при снятии его класса
    // текст скачком возвращался вниз прямо перед уходом.
    var inner = document.createElement('div');
    inner.className = 'nsd-line-inner';
    nsdBuildLineText(inner, line.text);
    el.appendChild(inner);
    wrap.appendChild(el);
    el.addEventListener('animationend', function onIn(ev) {
      if (ev.animationName !== 'nsdLineIn') return;
      el.removeEventListener('animationend', onIn);
      el.classList.remove('nsd-line-in');
      el.classList.add('is-shown');
      // «дыхание» и тряска — взаимоисключающие анимации одного слоя
      if (!line.shake) inner.classList.add('nsd-line-idle');
    });

    // Стрелять можно и по золотому (опровержение), и по голубому (согласие).
    // Золотое ждёт weakPoint, голубое — agree; пуля должна быть той самой.
    var segs = el.querySelectorAll('.nsd-weak-segment');
    if (segs.length) el.classList.add('weak');
    var goldEl = el.querySelector('.nsd-weak-segment.is-gold');
    if (line.weakPoint && goldEl) nsdWait(function () { el.classList.add('pulse'); }, 600);
    Array.prototype.forEach.call(segs, function (seg) {
      var gold = seg.classList.contains('is-gold');
      var need = gold ? line.weakPoint : line.agree;
      seg.addEventListener('mouseenter', function () { nsdAimLock(true); });
      seg.addEventListener('mouseleave', function () { nsdAimLock(false); });
      seg.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (el.classList.contains('resolved')) return;
        var active = document.querySelector('.nsd-truth-bullet.is-active');
        var picked = active ? active.getAttribute('data-bullet') : null;
        if (!need || picked !== need) { nsdMiss(seg, el); return; }
        el.classList.add('resolved');
        nsdHit(el, seg);
      });
    });

    // реплика висит и уходит — дебаты не останавливаются даже на слабом месте
    nsdWait(function () {
      if (!window.nsdState.active) return;
      if (el.classList.contains('resolved')) return;
      el.classList.remove('nsd-line-in');
      el.classList.remove('is-shown');
      el.classList.add('nsd-line-out');
      nsdWait(function () { if (el.parentNode) el.remove(); }, NSD_LINE_OUT_MS);
      // следующая реплика ждёт, пока предыдущая уйдёт с экрана целиком
      nsdWait(function () {
        if (!window.nsdState.active) return;
        // круг закончился, игрок не выстрелил — даём подсказку и начинаем заново
        if (idx + 1 >= total) nsdShowHint(function () { nsdShowLine(0); });
        else nsdShowLine(idx + 1);
      }, NSD_LINE_LINK_MS);
    }, NSD_LINE_HOLD_MS);
  }

  // ============================================================
  // МАССОВАЯ ПАНИКА
  // Три полосы, в каждой своя очередь реплик. Полосы идут независимо
  // друг от друга, поэтому на экране всегда несколько реплик разом и
  // несколько слабых мест. Достаточно попасть в любое верное.
  // ============================================================
  function nsdStartPanic(debate) {
    var root = nsdEnsureRoot();
    if (!root) return;
    // Тема после паники: подменяем «трек до сцены», и nsdExitMusic уходит
    // сразу в неё. Отдельной реплики {music} быть не должно — иначе секунду
    // играет старая тема, а потом поверх заводится новая.
    if (debate.outro && TRACKS[debate.outro]) window.nsdState.prevTrack = TRACKS[debate.outro].url;
    var old = document.getElementById('nsd-panic'); if (old) old.remove();
    var wrap = document.createElement('div');
    wrap.id = 'nsd-panic';
    var html = '<div class="ct3-split is-all">' + ct3Zones() + '</div>';
    (debate.lanes || []).forEach(function (ln, i) {
      html += '<div class="nsdp-lane" data-lane="' + i + '" data-zone="' + i + '" style="--i:' + i + '">' +
                '<div class="nsdp-who"><span>' + ln.speaker + '</span></div>' +
                '<div class="nsdp-track"></div>' +
              '</div>';
    });
    wrap.innerHTML = html;
    root.appendChild(wrap);
    window.nsdState.panicLoops = [];
    (debate.lanes || []).forEach(function (ln, i) {
      // старт вразнобой, иначе три полосы шли бы синхронно
      nsdWait(function () { nsdPanicLane(debate, i, 0); }, 260 + i * 620);
    });
  }

  function nsdPanicLane(debate, laneIdx, i) {
    if (!window.nsdState.active) return;
    var lane = (debate.lanes || [])[laneIdx];
    if (!lane || !lane.lines || !lane.lines.length) return;
    var track = document.querySelector('#nsd-panic .nsdp-lane[data-lane="' + laneIdx + '"] .nsdp-track');
    if (!track) return;
    var total = lane.lines.length;
    var idx = ((i % total) + total) % total;
    var line = lane.lines[idx];

    var el = document.createElement('div');
    el.className = 'nsdp-line';
    var inner = document.createElement('div');
    inner.className = 'nsdp-line-inner';
    nsdBuildLineText(inner, line.text);
    el.appendChild(inner);
    track.appendChild(el);

    // Плашка над полосой показывает того, кто говорит ИМЕННО эту реплику:
    // в полосе идёт перепалка, а не монолог одного героя.
    var who = document.querySelector('#nsd-panic .nsdp-lane[data-lane="' + laneIdx + '"] .nsdp-who span');
    if (who) {
      var name = line.who || lane.speaker;
      if (who.textContent !== name) {
        who.textContent = name;
        var plate = who.parentNode;
        plate.classList.remove('is-swap'); void plate.offsetWidth; plate.classList.add('is-swap');
      }
    }

    var segs = el.querySelectorAll('.nsd-weak-segment');
    if (segs.length) el.classList.add('weak');
    Array.prototype.forEach.call(segs, function (seg) {
      var gold = seg.classList.contains('is-gold');
      var need = gold ? line.weakPoint : line.agree;
      seg.addEventListener('mouseenter', function () { nsdAimLock(true); });
      seg.addEventListener('mouseleave', function () { nsdAimLock(false); });
      seg.addEventListener('click', function (ev) {
        ev.stopPropagation();
        if (el.classList.contains('resolved')) return;
        var active = document.querySelector('.nsd-truth-bullet.is-active');
        var picked = active ? active.getAttribute('data-bullet') : null;
        if (!need || picked !== need) { nsdMiss(seg, el); return; }
        el.classList.add('resolved');
        nsdPanicStop();
        nsdHit(el, seg);
      });
    });

    // реплика проезжает полосу и уходит; следом идёт очередная
    nsdWait(function () {
      if (!window.nsdState.active) return;
      if (el.classList.contains('resolved')) return;
      el.classList.add('is-out');
      nsdWait(function () { if (el.parentNode) el.remove(); }, 420);
      nsdPanicLane(debate, laneIdx, idx + 1);
    }, NSD_PANIC_HOLD_MS);
  }

  function nsdPanicStop() {
    // Класс паники НЕ снимаем: после верного выстрела сцена должна остаться
    // красной до самого «ПРОРЫВ!» и затемнения. Раньше он снимался прямо
    // здесь, и картинка на полкадра прыгала обратно в голубой.
    var w = document.getElementById('nsd-panic');
    if (w) w.classList.add('is-done');
  }

  // Между кругами дебатов: обычное диалоговое окно с мыслью Треска
  // customHint — для сцен вне дебатов (например, битвы на мечах)
  function nsdShowHint(next, customHint) {
    var debate = NSD_DEBATES[window.nsdState.debateId];
    var hint = customHint || (debate && debate.hint);
    if (!hint) { next(); return; }

    // прячем классом: у обвязки дебатов display задан через !important
    var ctRoot = document.getElementById('ct-root');
    if (ctRoot) ctRoot.classList.add('nsd-hint-on');
    nsdAimOff();

    var namecard = document.getElementById('ct-namecard');
    var box = document.querySelector('.ct-dialogue-box');
    var textEl = document.getElementById('ct-dialogue-text');
    if (!box || !textEl) { next(); return; }

    if (namecard) namecard.style.display = '';
    box.style.display = '';
    ctRenderName(hint.name || 'Треск');
    textEl.classList.toggle('is-thought', hint.thought !== false);
    textEl.textContent = '';
    var tnode = document.createTextNode('');
    textEl.appendChild(tnode);

    var text = hint.text, shown = 0, started = 0, done = false;
    function frame(now) {
      if (!started) started = now;
      var want = Math.min(text.length, Math.floor((now - started) / CT_CHAR_MS) + 1);
      if (want > shown) { tnode.data = text.slice(0, want); shown = want; }
      if (shown < text.length) window.ctTypeRaf = requestAnimationFrame(frame);
      else done = true;
    }
    window.ctTypeRaf = requestAnimationFrame(frame);

    function close() {
      document.removeEventListener('click', onClick, true);
      cancelAnimationFrame(window.ctTypeRaf);
      box.style.display = 'none';
      if (ctRoot) ctRoot.classList.remove('nsd-hint-on');
      // прицел принадлежит дебатам — в битве на мечах его возвращать нельзя
      if (window.nsdState && window.nsdState.active) nsdAimOn();
      next();
    }
    function onClick(e) {
      e.stopPropagation();
      if (!done) { cancelAnimationFrame(window.ctTypeRaf); tnode.data = text; done = true; return; }
      close();
    }
    setTimeout(function () { document.addEventListener('click', onClick, true); }, 120);
  }

  // ------------------------------------------------------------
  // ВЫСТРЕЛ ПУЛЕЙ ПРАВДЫ
  // Порядок: звук выстрела -> слово летит из пули -> слово разлетается
  // -> опровержение -> экран трескается и уходит в чёрное -> «ПРОРЫВ!»
  // ------------------------------------------------------------
  // Промах: выбрана не та улика. Дебаты продолжаются, но игрок это видит и слышит.
  // Сколько времени отведено текущему дебату
  function nsdSceneTime() {
    var d = NSD_DEBATES[window.nsdState.debateId];
    return (d && d.timeMs) || NSD_TIME_MS;
  }

  // Время вышло — это такая же ошибка, как промах: половина звезды и часы
  // заводятся заново. Круг идёт с начала, а состояние наливается только
  // когда опустело.
  function nsdOutOfTime() {
    if (!window.nsdState.active || nsdMissLock) return;
    if (hpLose()) hpReset();
    ctClockStart(nsdSceneTime(), nsdOutOfTime);
    nsdTimeOut = true;
    nsdMiss(null, null);
  }

  var nsdTimeOut = false;

  var nsdMissLock = false;
  function nsdMiss(weakEl, lineEl) {
    if (nsdMissLock) return;
    nsdMissLock = true;
    sfxShoot.play();
    // Промах снимает половину звезды; опустело — дебаты начинаются заново
    // с полным состоянием и часами.
    // здоровье за истёкшее время уже снято в nsdOutOfTime — дважды не берём
    if (nsdTimeOut) nsdTimeOut = false;
    else if (hpLose()) {
      hpReset();
      ctClockStart(nsdSceneTime(), nsdOutOfTime);
    }

    var aim = nsdAimEl();
    if (aim) { aim.classList.add('is-miss'); setTimeout(function () { aim.classList.remove('is-miss'); }, 460); }
    if (weakEl) weakEl.classList.add('is-wrong');
    if (lineEl) {
      // помечаем реплику решённой, иначе её отложенный уход прокрутит круг дальше
      lineEl.classList.add('resolved');
      lineEl.classList.remove('pulse');
      lineEl.classList.add('is-wrong');
    }

    nsdWait(function () {
      nsdAimOff();
      if (lineEl && lineEl.parentNode) {
        lineEl.classList.add('nsd-line-out');
        nsdWait(function () { if (lineEl.parentNode) lineEl.remove(); }, NSD_LINE_OUT_MS);
      }
      nsdWait(function () {
        nsdMissLock = false;
        // круг закончился впустую: реплики Треска, потом дебаты с начала
        nsdShowHint(function () { nsdAimOn(); nsdShowLine(0); });
      }, NSD_LINE_OUT_MS + 260);
    }, NSD_MISS_HOLD_MS);
  }

  function nsdHit(el, weakEl) {
    nsdClearTimers();
    nsdAimLock(false);
    nsdAimOff();
    var tag = document.getElementById('nsd-speaker-tag');
    if (tag) tag.classList.remove('is-shown');

    var root = document.getElementById('ct-root');
    var bulletEl = document.querySelector('.nsd-truth-bullet.is-active') || document.querySelector('.nsd-truth-bullet');

    // 1. выстрел
    sfxShoot.play();

    // 2. улика летит в слово и разбивает его на буквы
    nsdWait(function () {
      nsdShootTracer(bulletEl, weakEl, function () {
        nsdPlaySfx(NSD_SFX_BULLET_HIT, 0.85);
        nsdShatterWord(el, weakEl);

        // 3. слово догорело — гасим экран и сразу бьём стекло
        nsdWait(function () {
          if (root && !document.getElementById('nsd-dim')) {
            var dim = document.createElement('div');
            dim.id = 'nsd-dim';
            root.appendChild(dim);
            void dim.offsetWidth;   // иначе переход не стартует и затемнение включается рывком
            requestAnimationFrame(function () { dim.classList.add('is-on'); });
          }

          // 4. экран трескается (разметка уже готова, просто снимаем паузу)
          nsdWait(function () {
            nsdPlaySfx(NSD_SFX_BREAK, 0.9);
            nsdRunBreak();
            // 5. экран уходит в полную черноту, и только на ней — «ПРОРЫВ!»
            nsdWait(function () {
              var d = document.getElementById('nsd-dim');
              if (d) d.classList.add('is-full');
              nsdWait(function () {
                nsdShowBreakWord();
                nsdWait(function () {
                  var bw = document.querySelector('.nsd-break-word');
                  if (bw) bw.classList.add('is-fading');
                  nsdWait(function () { nsdFinish(); }, NSD_WORD_FADE_MS);
                }, NSD_BREAK_HOLD_MS);
              }, NSD_DARK_MS);
            }, NSD_GLASS_MS);
          }, NSD_REFUTE_MS);
        }, NSD_WORD_BURST_MS);
      });
    }, NSD_SHOT_DELAY_MS);
  }

  // Слово рассыпается на буквы: каждая улетает своей дорогой, без раздувания
  function nsdShatterWord(lineEl, weakEl) {
    if (!weakEl) { lineEl.classList.add('hit'); return; }
    var text = weakEl.textContent;
    weakEl.textContent = '';
    weakEl.classList.add('is-shattering');
    for (var i = 0; i < text.length; i++) {
      var s = document.createElement('span');
      s.className = 'nsd-shard-letter';
      s.textContent = text[i] === ' ' ? ' ' : text[i];
      var a = Math.random() * Math.PI * 2;
      var d = 90 + Math.random() * 220;
      s.style.setProperty('--lx', (Math.cos(a) * d).toFixed(0) + 'px');
      s.style.setProperty('--ly', (Math.sin(a) * d - 40).toFixed(0) + 'px');
      s.style.setProperty('--lr', (Math.random() * 540 - 270).toFixed(0) + 'deg');
      s.style.setProperty('--ld', (i * 0.012 + Math.random() * 0.04).toFixed(3) + 's');
      weakEl.appendChild(s);
    }
    lineEl.classList.add('is-broken');   // остальной текст просто гаснет
  }
  // Выстрел: пуля бьёт в слабое место. Слово улики на экран не выводим —
  // видно только вспышку в точке попадания.
  function nsdShootTracer(fromEl, toEl, onImpact) {
    var to = toEl ? toEl.getBoundingClientRect() : { left: innerWidth / 2, top: innerHeight / 2, width: 120, height: 40 };
    var tx = to.left + to.width / 2, ty = to.top + to.height / 2;
    nsdWait(function () {
      nsdImpactBurst(tx, ty);
      onImpact();
    }, NSD_WORD_FLY_MS);
  }
  // Вспышка-звезда в точке попадания
  function nsdImpactBurst(x, y) {
    var root = document.getElementById('ct-root');
    if (!root) return;
    window.nsdImpactPoint = { x: x, y: y };
    var burst = document.createElement('div');
    burst.className = 'nsd-burst';
    burst.style.left = x + 'px';
    burst.style.top = y + 'px';
    var spikes = '';
    for (var i = 0; i < 16; i++) {
      spikes += '<i style="--a:' + (i * 22.5 + Math.random() * 10 - 5).toFixed(1) + 'deg;--len:' + (70 + Math.random() * 150).toFixed(0) + 'px;--w:' + (3 + Math.random() * 7).toFixed(0) + 'px;--d:' + (Math.random() * 0.05).toFixed(2) + 's"></i>';
    }
    burst.innerHTML = '<span class="nsd-burst-core"></span>' + spikes;
    root.appendChild(burst);
    setTimeout(function () { if (burst.parentNode) burst.remove(); }, 700);
  }

  // ------------------------------------------------------------
  // РАЗБИТИЕ ЭКРАНА
  // Паутина трещин расходится из точки попадания, сцена сначала видна
  // сквозь них, потом осколки уезжают и кадр уходит в черноту.
  // Рисуем на canvas: десятки DOM-осколков с clip-path браузер не
  // композитит и роняет кадры до 9 fps, холст идёт ровно.
  // ------------------------------------------------------------
  var nsdBreakState = null;

  // Класс прячет всё под чёрным холстом трещины. Снимать его надо ВЕЗДЕ, где
  // холст убирается: трещина играет и в начале схватки (после плашки
  // «ПРОТИВ»), и если класс там оставался — вся арена и окно схватки
  // оставались невидимыми до самого конца боя.
  function nsdClearBlacked() {
    var cr = document.getElementById('ct-root');
    if (cr) cr.classList.remove('nsd-blacked');
  }

  function nsdPrepareBreak() {
    var root = document.getElementById('ct-root');
    if (!root || document.getElementById('nsd-break')) return;

    var wrap = document.createElement('div');
    wrap.id = 'nsd-break';
    var cv = document.createElement('canvas');
    cv.className = 'nsd-break-canvas';
    wrap.appendChild(cv);
    wrap.insertAdjacentHTML('beforeend', '<div class="nsd-break-flash"></div>');
    root.appendChild(wrap);

    var W = root.clientWidth, H = root.clientHeight;
    var Q = 0.5;                       // холст меньше кадра, CSS растянет обратно
    cv.width = Math.round(W * Q);
    cv.height = Math.round(H * Q);
    var ctx = cv.getContext('2d');
    ctx.scale(Q, Q);
    nsdBreakState = { cv: cv, ctx: ctx, W: W, H: H, cells: null, rays: null, raf: 0 };
  }

  // Радиальная паутина вокруг точки удара
  function nsdBuildWeb(x, y, W, H) {
    var RAYS = 16, RINGS = 5;
    var far = Math.hypot(Math.max(x, W - x), Math.max(y, H - y)) * 1.25;
    var angs = [];
    for (var i = 0; i < RAYS; i++) {
      angs.push((Math.PI * 2 / RAYS) * i + (Math.random() * 0.22 - 0.11));
    }
    angs.push(angs[0] + Math.PI * 2);

    var radii = [0];
    for (var r = 1; r <= RINGS; r++) {
      var base = Math.pow(r / RINGS, 1.15) * far;
      radii.push(base * (0.82 + Math.random() * 0.36));
    }

    var pt = function (ri, ai) {
      var rr = radii[ri] * (0.72 + Math.random() * 0.56);
      var aa = angs[ai] + (Math.random() * 0.3 - 0.15) * (ri / RINGS);
      return [x + Math.cos(aa) * rr, y + Math.sin(aa) * rr];
    };

    var grid = [];
    for (var ri = 0; ri < radii.length; ri++) {
      grid[ri] = [];
      for (var ai = 0; ai <= RAYS; ai++) grid[ri][ai] = ri === 0 ? [x, y] : pt(ri, ai % RAYS);
    }

    var cells = [];
    for (var r2 = 0; r2 < radii.length - 1; r2++) {
      for (var a2 = 0; a2 < RAYS; a2++) {
        var p = [grid[r2][a2], grid[r2][a2 + 1], grid[r2 + 1][a2 + 1], grid[r2 + 1][a2]];
        var cx = 0, cy = 0;
        p.forEach(function (q) { cx += q[0]; cy += q[1]; });
        cx /= 4; cy /= 4;
        var d = Math.hypot(cx - x, cy - y) || 1;
        cells.push({
          p: p, cx: cx, cy: cy,
          dx: (cx - x) / d, dy: (cy - y) / d,
          dist: d / far,
          rot: (Math.random() * 1.1 - 0.55),
          push: 190 + Math.random() * 520
        });
      }
    }
    return { cells: cells, ox: x, oy: y };
  }

  // Отрисовка одним проходом: раньше на каждый осколок шло по три вызова
  // canvas (заливка и два штриха) — при 150 осколках это 450 операций за кадр.
  // Теперь все куски собираются в общие пути: одна заливка и четыре штриха.
  function nsdDrawBreak(t) {
    var s = nsdBreakState;
    if (!s || !s.web) return;
    var ctx = s.ctx, cells = s.web.cells;
    ctx.clearRect(0, 0, s.W, s.H);

    var ms = t * NSD_GLASS_MS;
    var fly = Math.max(0, Math.min(1, (ms - 240) / (NSD_GLASS_MS - 240)));
    var flyE = fly * fly;
    var fillA = Math.min(1, Math.max(0, (ms - 170) / 600));
    var sc = 1 + flyE * 0.42;

    var fillPath = new Path2D();
    var BUCKETS = 4;
    var strokePaths = [];
    for (var q = 0; q < BUCKETS; q++) strokePaths.push(new Path2D());
    var used = false;

    for (var i = 0; i < cells.length; i++) {
      var c = cells[i];
      // трещина добегает до осколка тем позже, чем он дальше от удара
      var k = Math.min(1, Math.max(0, (ms - c.dist * 95) / 170));
      if (k <= 0) continue;
      used = true;
      var ang = c.rot * flyE;
      var cos = Math.cos(ang) * sc, sin = Math.sin(ang) * sc;
      var ox = c.cx + c.dx * c.push * flyE, oy = c.cy + c.dy * c.push * flyE;

      // точки считаем один раз и кладём сразу в оба пути: Path2D на каждый
      // осколок — это 80 аллокаций за кадр и лишняя работа сборщику мусора
      var bi = Math.min(BUCKETS - 1, Math.floor(k * k * (3 - 2 * k) * BUCKETS));
      var sp = strokePaths[bi];
      for (var v = 0; v < 4; v++) {
        var lx = (c.p[v][0] - c.cx) * 0.985, ly = (c.p[v][1] - c.cy) * 0.985;
        var px = ox + lx * cos - ly * sin, py = oy + lx * sin + ly * cos;
        if (v === 0) { fillPath.moveTo(px, py); sp.moveTo(px, py); }
        else { fillPath.lineTo(px, py); sp.lineTo(px, py); }
      }
      fillPath.closePath();
      sp.closePath();
    }
    if (!used) return;

    if (fillA > 0.02) {
      ctx.fillStyle = 'rgba(3,1,9,' + fillA.toFixed(3) + ')';
      ctx.fill(fillPath);
    }

    // плавный уход в чёрное поверх осколков
    var darkA = Math.min(1, Math.max(0, (ms - (NSD_GLASS_MS - NSD_FADE_TO_BLACK_MS)) / NSD_FADE_TO_BLACK_MS));

    for (var bq = 0; bq < BUCKETS; bq++) {
      var a = ((bq + 0.5) / BUCKETS) * (1 - fly * 0.5);
      if (a <= 0.02) continue;
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(200,242,255,' + (0.85 * a * (1 - darkA)).toFixed(3) + ')';
      ctx.stroke(strokePaths[bq]);
    }

    if (darkA > 0) {
      ctx.fillStyle = 'rgba(3,1,9,' + darkA.toFixed(3) + ')';
      ctx.fillRect(0, 0, s.W, s.H);
    }
  }

  function nsdRunBreak() {
    // Экран сейчас треснет и уйдёт в «ПРОРЫВ!» — часам и «Состоянию» там
    // делать нечего, а лежат они в body поверх всей сцены.
    ctClockStop();
    hpRemove();
    nsdClearBlacked();
    if (!nsdBreakState) nsdPrepareBreak();
    var s = nsdBreakState;
    if (!s) return;
    var wrap = document.getElementById('nsd-break');
    if (wrap) wrap.classList.add('is-firing');

    // Трещина всегда расходится из центра кадра — так разбитие читается
    // одинаково, куда бы ни пришёлся выстрел.
    s.web = nsdBuildWeb(s.W / 2, s.H / 2, s.W, s.H);

    var t0 = 0;
    function frame(now) {
      if (!t0) t0 = now;
      var t = (now - t0) / NSD_GLASS_MS;
      if (t >= 1) {
        // Холст уже залит чёрным плавно — не очищаем, иначе на миг
        // проступит сцена, которую только что «разбили».
        s.ctx.fillStyle = '#030109';
        s.ctx.fillRect(0, 0, s.W, s.H);
        if (wrap) wrap.classList.add('is-blacked');
        // Холст залит чёрным — всё, что под ним, больше не видно, но
        // продолжало рисоваться каждый кадр: фон суда, лучи, бегущая
        // строка, затемнение. Гасим их, пока идёт «ПРОРЫВ!».
        var cr = document.getElementById('ct-root');
        if (cr) cr.classList.add('nsd-blacked');
        var dm = document.getElementById('nsd-dim');
        if (dm) dm.style.display = 'none';
        // Арену и окно схватки держать больше незачем — их всё равно не
        // видно, а узлов там много. Убираем сразу, а не в конце: иначе вся
        // уборка приходилась на кадры со словом «ПРОРЫВ!».
        ['sw-root', 'sw-split', 'sw-blades', 'sw-intro'].forEach(function (id) {
          var n = document.getElementById(id); if (n) n.remove();
        });
        return;
      }
      nsdDrawBreak(t);
      s.raf = requestAnimationFrame(frame);
    }
    s.raf = requestAnimationFrame(frame);
  }

  // «ПРОРЫВ!» — уже поверх чёрного экрана
  function nsdShowBreakWord() {
    var host = document.getElementById('nsd-break') || document.getElementById('ct-root');
    if (!host) return;
    var word = 'ПРОРЫВ!', chars = '';
    for (var i = 0; i < word.length; i++) {
      chars += '<span style="--i:' + i +
        ';--r:' + (Math.random() * 14 - 7).toFixed(1) + 'deg' +
        ';--ty:' + (Math.random() * 16 - 8).toFixed(1) + 'px">' + word[i] + '</span>';
    }
    var w = document.createElement('div');
    w.className = 'nsd-break-word';
    w.innerHTML = chars;
    host.appendChild(w);
  }

  // Возврат в обычный режим реплик: экран уходит в чёрное, за ним
  // убирается вся обвязка дебатов, и картинка проявляется обратно.
  function nsdFadeBack(done) {
    var ov = document.getElementById('nsd-fade');
    if (!ov) { ov = document.createElement('div'); ov.id = 'nsd-fade'; document.body.appendChild(ov); }
    requestAnimationFrame(function () { ov.classList.add('is-black'); });
    setTimeout(function () {
      done(cleanup, reveal);
    }, NSD_FADE_MS + 80);

    function cleanup() { /* вызывается на чёрном экране */ }
    function reveal(after) {
      setTimeout(function () {
        ov.classList.remove('is-black');
        setTimeout(function () {
          if (ov.parentNode) ov.remove();
          if (after) after();          // реплика печатается уже на видимом экране
        }, NSD_FADE_MS + 60);
      }, NSD_FADE_HOLD_MS);
    }
  }

  function nsdFinish() {
    if (window.nsdState.finishing) return;
    var cb = window.nsdState.onComplete;
    window.nsdState.active = false;
    // Экран уже чёрный, но диалог суда ещё не вернулся: без этого флага клик
    // по сцене успевал промотать реплику и она печаталась дважды.
    window.nsdState.finishing = true;
    window.nsdState.onComplete = null;
    nsdClearTimers();
    nsdAimOff();
    ctClockStop();
    hpRemove();
    nsdFadeBack(function (cleanup, reveal) {
      document.documentElement.classList.remove('nsd-active', 'nsd-intro-on');
      var flow = document.getElementById('nsd-root'); if (flow) flow.remove();
      var cyl = document.getElementById('nsd-cylinder'); if (cyl) cyl.remove();
      var intro = document.getElementById('nsd-intro'); if (intro) intro.remove();
      var brk = document.getElementById('nsd-break'); if (brk) brk.remove(); nsdClearBlacked();
      if (nsdBreakState) { cancelAnimationFrame(nsdBreakState.raf); nsdBreakState = null; }
      var dim = document.getElementById('nsd-dim'); if (dim) dim.remove();
      // Красное живёт ровно до чёрного экрана. Мы уже под ним, поэтому
      // возврат к обычным цветам никто не увидит. Раньше класс висел до
      // конца игры, и красными становились и «ПРОРЫВ!» после схваток, и
      // весь дальнейший суд.
      document.documentElement.classList.remove('nsd-panic-on');
      var pw = document.getElementById('nsd-panic'); if (pw) pw.remove();
      var ctRoot = document.getElementById('ct-root'); if (ctRoot) ctRoot.classList.remove('nsd-hint-on');
      // окно возвращаем пустым, пока экран ещё чёрный: иначе на проявлении
      // мелькает прошлая реплика, а новая печатается вслепую
      var tx = document.getElementById('ct-dialogue-text'); if (tx) tx.textContent = '';
      var nf = document.getElementById('ct-name-first'); if (nf) nf.textContent = '';
      var bx = document.querySelector('.ct-dialogue-box'); if (bx) bx.style.display = '';
      var nc = document.getElementById('ct-namecard'); if (nc) nc.style.display = '';
      nsdExitMusic();
      reveal(function () {
        window.nsdState.finishing = false;
        if (cb) cb();
      });
    });
  }

  // ============================================================
  // СЦЕНАРНЫЕ СОБЫТИЯ СУДА
  // rebuttal-intro: снизу вылетает жёлтая плашка «Битва на мечах»,
  // после чего экран трескается — как в конце дебатов, но без «ПРОРЫВ!».
  // ============================================================
  var CTRB_SLAB_IN_MS = 620;   // плашка влетает снизу
  var CTRB_HOLD_MS    = 1150;  // держится на экране
  var CTRB_CRACK_LEAD = 180;   // пауза между уходом плашки и трещиной
  var CTRB_DARK_MS    = 420;   // сколько стоим на чёрном после осыпания

  function ctRebuttalBanner(word1, word2) {
    var root = document.getElementById('ct-root');
    if (!root) return null;
    var old = document.getElementById('ct-rebuttal-banner');
    if (old) old.remove();

    function letters(text, base) {
      var out = '';
      for (var i = 0; i < text.length; i++) {
        if (text[i] === ' ') { out += '<span class="ctrb-sp"></span>'; continue; }
        out += '<span style="--i:' + (base + i) +
               ';--r:' + (Math.random() * 9 - 4.5).toFixed(1) + 'deg' +
               ';--ty:' + (Math.random() * 7 - 3.5).toFixed(1) + 'px">' + text[i] + '</span>';
      }
      return out;
    }

    var b = document.createElement('div');
    b.id = 'ct-rebuttal-banner';
    b.innerHTML =
      '<div class="ctrb-slab">' +
        '<div class="ctrb-streaks"></div>' +
        '<div class="ctrb-text">' +
          '<div class="ctrb-line ctrb-line1">' + letters(word1, 0) + '</div>' +
          '<div class="ctrb-line ctrb-line2">' + letters(word2, word1.length) + '</div>' +
        '</div>' +
      '</div>';
    root.appendChild(b);
    // класс вешаем следующим кадром, но со страховкой таймером: в фоновой
    // вкладке requestAnimationFrame не вызывается, и плашка застревала внизу
    void b.offsetWidth;
    var armed = false;
    function arm() { if (armed) return; armed = true; b.classList.add('is-in'); }
    requestAnimationFrame(arm);
    setTimeout(arm, 60);
    return b;
  }

  // Трещина без «ПРОРЫВ!»: затемнение → стекло осыпается → чернота
  function ctCrackScreen(done) {
    var root = document.getElementById('ct-root');
    if (!root) { done(); return; }

    if (!document.getElementById('nsd-dim')) {
      var dim = document.createElement('div');
      dim.id = 'nsd-dim';
      root.appendChild(dim);
      void dim.offsetWidth;   // иначе переход не стартует и затемнение включается рывком
      var dimArmed = false;
      var armDim = function () { if (dimArmed) return; dimArmed = true; dim.classList.add('is-on'); };
      requestAnimationFrame(armDim);
      setTimeout(armDim, 60);
    }

    if (nsdBreakState) { cancelAnimationFrame(nsdBreakState.raf); nsdBreakState = null; }
    var oldBrk = document.getElementById('nsd-break'); if (oldBrk) oldBrk.remove(); nsdClearBlacked();
    nsdPrepareBreak();
    window.nsdImpactPoint = { x: root.clientWidth / 2, y: root.clientHeight * 0.52 };

    nsdPlaySfx(NSD_SFX_BREAK, 0.9);
    nsdRunBreak();

    nsdWait(function () {
      var d = document.getElementById('nsd-dim');
      if (d) d.classList.add('is-full');
      nsdWait(done, CTRB_DARK_MS);
    }, NSD_GLASS_MS);
  }

  // stayBlack: не проявлять картинку в конце — вызывающий сам решает,
  // что показать за чёрным экраном (например, арену битвы на мечах).
  // ------------------------------------------------------------
  // ЗАНАВЕС СУДА
  // Тот же занавес, что и на входе в суд, но словом и направлением
  // управляет вызывающий: «ПЕРЕРЫВ» съезжается, «ВОЗОБНОВЛЯЕТСЯ» —
  // разъезжается. Разметка и анимации у обоих общие с заставкой начала.
  // ------------------------------------------------------------
  var CT_CURTAIN_SFX = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/danganronpas_trial.mp3';

  function ctCurtainChars(text, cls) {
    var out = '', i = 0;
    for (var k = 0; k < text.length; k++) {
      if (text[k] === ' ') { out += '<span class="tso-sp"></span>'; continue; }
      out += '<span' + (cls ? ' class="' + cls + '"' : '') + ' style="--i:' + (i++) + '">' + text[k] + '</span>';
    }
    return out;
  }

  // mode: 'close' — половины съезжаются и кадр остаётся закрытым;
  //       'open'  — кадр открыт занавесом, потом половины разъезжаются.
  function ctCurtain(title, sub, mode, done) {
    var old = document.getElementById('trial-start-overlay');
    if (old) old.remove();
    try { var a = new Audio(CT_CURTAIN_SFX); a.volume = 0.7; a.play().catch(function () {}); } catch (e) {}

    var scene =
      '<div class="tso-inner">' +
        '<div class="tso-fx">' + ctFlyLines(14, 'tso-line', 0.6, 0.25, 0.2) + '</div>' +
        '<div class="trial-start-text">' +
          '<div class="trial-start-main">' + ctCurtainChars(title, 'tso-ch') + '</div>' +
          '<div class="trial-start-sub">' + ctCurtainChars(sub, '') + '</div>' +
        '</div>' +
      '</div>';

    var ov = document.createElement('div');
    ov.id = 'trial-start-overlay';
    ov.innerHTML = '<div class="tso-half tso-left">' + scene + '</div>' +
                   '<div class="tso-half tso-right">' + scene + '</div>';
    // «Перерыв» начинается с открытого кадра: половины стоят разведёнными
    // и съезжаются к центру.
    if (mode === 'close') ov.classList.add('tso-shut');
    document.body.appendChild(ov);
    void ov.offsetWidth;

    if (mode === 'close') {
      ov.classList.remove('tso-shut');
      nsdWait(function () { if (done) done(ov); }, 1900);
      return ov;
    }
    nsdWait(function () { ov.classList.add('tso-open'); }, 1640);
    nsdWait(function () {
      if (ov.parentNode) ov.remove();
      if (done) done(null);
    }, 2650);
    return ov;
  }

  function ctRunEvent(id, next, stayBlack) {
    // Экран трескается и вспыхивает «ПРОРЫВ!» — тот же финал, что и у дебатов
    if (id === 'breakthrough') {
      window.ctEventRunning = true;
      ctCancelAuto();
      nsdClearTimers();
      document.documentElement.classList.add('nsd-active');
      var host = document.getElementById('ct-root');
      if (host && !document.getElementById('nsd-dim')) {
        var dim = document.createElement('div');
        dim.id = 'nsd-dim';
        host.appendChild(dim);
        void dim.offsetWidth;
        dim.classList.add('is-on');
      }
      nsdWait(function () {
        nsdPlaySfx(NSD_SFX_BREAK, 0.9);
        nsdRunBreak();
        nsdWait(function () {
          var d = document.getElementById('nsd-dim');
          if (d) d.classList.add('is-full');
          nsdWait(function () {
            nsdShowBreakWord();
            nsdWait(function () {
              var bw = document.querySelector('.nsd-break-word');
              if (bw) bw.classList.add('is-fading');
              nsdWait(function () {
                nsdFadeBack(function (cleanup, reveal) {
                  document.documentElement.classList.remove('nsd-active');
                  ['nsd-break', 'nsd-dim'].forEach(function (n) {
                    var e = document.getElementById(n); if (e) e.remove();
                  });
                  if (nsdBreakState) { cancelAnimationFrame(nsdBreakState.raf); nsdBreakState = null; }
                  nsdClearBlacked();
                  reveal(function () { window.ctEventRunning = false; next(); });
                });
              }, NSD_WORD_FADE_MS);
            }, SW_BREAK_HOLD_MS);
          }, SW_DARK_MS);
        }, NSD_GLASS_MS);
      }, NSD_REFUTE_MS);
      return;
    }

    // Занавес суда: перерыв и конец закрывают кадр, возобновление — открывает
    if (id === 'trial-break' || id === 'trial-resume' || id === 'trial-end') {
      window.ctEventRunning = true;
      ctCancelAuto();
      nsdClearTimers();
      var isBreak = id !== 'trial-resume';
      ctCurtain('КЛАССНЫЙ СУД', id === 'trial-end' ? 'КОНЕЦ' : (isBreak ? 'ПЕРЕРЫВ' : 'ВОЗОБНОВЛЯЕТСЯ'),
                isBreak ? 'close' : 'open', function (ov) {
        if (!isBreak) { window.ctEventRunning = false; next(); return; }
        // за закрытым занавесом кадр гаснет и сцена уходит в пассаж-интерлюдию
        ov.classList.add('tso-fade');
        nsdWait(function () {
          if (ov.parentNode) ov.remove();
          window.ctEventRunning = false;
          next();
        }, 1100);
      });
      return;
    }

    if (id !== 'rebuttal-intro') { next(); return; }
    window.ctEventRunning = true;
    ctCancelAuto();
    nsdClearTimers();
    // прячем кнопки АВТО/звука тем же классом, что и дебаты
    document.documentElement.classList.add('nsd-active');

    var banner = ctRebuttalBanner('БИТВА', 'НА МЕЧАХ');
    nsdPlaySfx(NSD_SFX_BULLET_HIT, 0.8);

    nsdWait(function () {
      // плашка остаётся на экране: стекло трескается прямо по ней
      if (banner) banner.classList.add('is-braced');
      nsdWait(function () {
        ctCrackScreen(function () {
          // возвращаемся к репликам через то же затемнение, что и дебаты
          nsdFadeBack(function (cleanup, reveal) {
            if (banner && banner.parentNode) banner.remove();
            var brk = document.getElementById('nsd-break'); if (brk) brk.remove(); nsdClearBlacked();
            if (nsdBreakState) { cancelAnimationFrame(nsdBreakState.raf); nsdBreakState = null; }
            var dm = document.getElementById('nsd-dim'); if (dm) dm.remove();
            var tx = document.getElementById('ct-dialogue-text'); if (tx) tx.textContent = '';
            var nf = document.getElementById('ct-name-first'); if (nf) nf.textContent = '';
            if (stayBlack) { next(); }
            if (!stayBlack) document.documentElement.classList.remove('nsd-active');
            reveal(function () {
              if (stayBlack) return;   // сцену за чёрным собрал вызывающий
              window.ctEventRunning = false;
              next();
            });
          });
        });
      }, CTRB_CRACK_LEAD);
    }, CTRB_SLAB_IN_MS + CTRB_HOLD_MS);
  }

  window.startNonStopDebate = function (debateId, onComplete) {
    var debate = NSD_DEBATES[debateId];
    if (!debate) { if (onComplete) onComplete(); return; }
    // В панике реплики разложены по полосам, поэтому нужную пулю ищем
    // сразу во всех трёх.
    var pool = debate.panic
      ? (debate.lanes || []).reduce(function (acc, ln) { return acc.concat(ln.lines || []); }, [])
      : debate.lines;
    var key = pool.filter(function (l) { return l.weakPoint && CLUE_DATA_JS[l.weakPoint]; })[0];
    var bulletId = key ? key.weakPoint : null;

    nsdClearTimers();
    window.nsdState = { active: true, finishing: false, debateId: debateId, i: 0, onComplete: onComplete || null, prevTrack: null };
    // прячем кнопки звука и авто на время дебатов
    document.documentElement.classList.add('nsd-active');
    nsdEnterMusic(debate.music);
    // Тема после сцены: подменяем «трек до неё», и выход уходит сразу в неё.
    // Иначе на секунду возвращается музыка суда, а следом поверх заводится
    // нужная — слышен рывок.
    if (debate.outro && TRACKS[debate.outro]) window.nsdState.prevTrack = TRACKS[debate.outro].url;

    // диалоговое окно уже скрыто вызывающим кодом — держим паузу,
    // и только потом заголовок вместе со звуком
    nsdWait(function () {
      nsdPlayIntroAnim(function () {
        nsdEnsureRoot();
        nsdAimOn();
        // Часы и «Состояние» те же, что и у схватки: цифры по центру
        // сверху, ряд звёзд справа. Заводим их вместе с барабаном, чтобы
        // время не текло, пока игрок ещё смотрит заставку.
        hpReset();
        ctClockStart(debate.timeMs || NSD_TIME_MS, nsdOutOfTime);
        ctClockPause(true);
        nsdShowCylinder(nsdBulletIds(debate, bulletId), function () {
          nsdPrepareBreak();   // заранее верстаем осколки
          ctClockPause(false);
          if (debate.panic) nsdStartPanic(debate);
          else nsdShowLine(0);
        });
      }, debate.panic ? { title: 'МАССОВАЯ ПАНИКА', variant: 'is-panic',
        onFire: function () { document.documentElement.classList.add('nsd-panic-on'); } } : null);
    }, NSD_INTRO_DELAY_MS);
  };

  // ============================================================
  // СХВАТКА АРГУМЕНТАМИ
  // Плашка «ПРОТИВ» -> раскол экрана с прологом -> заставка со «СТАРТ!»
  // -> две фазы: реплики Юты идут по одной, их рубят клинком, граница
  // её половины отступает к центру. В конце второй фазы появляется
  // слабое место — его бьют нужным мечом, экран трескается, «ПРОРЫВ!».
  // Тексты пока рыба — заменить на настоящие реплики сцены.
  // ============================================================
  var SWORD_BATTLES = {
    "sword1": {
      prelude: 'nsd-space',      // играет с плашки «ПРОТИВ» и весь пролог
      music: 'nsd-bladelock',    // включается на заставке, уже в самой схватке
      outro: 'resurrection-nointro',  // остаётся играть после конца схватки
      opponent: 'Юта',
      hero: 'Треск',
      blades: ['alibi-yuta', 'bleach-smell', 'vent'],
      prologue: [
        { side: 'left',  name: 'Юта',   text: 'Ты серьезно решил, что, если Фусту ходил на второй этаж, то теперь он умер именно там?' },
        { side: 'left',  name: 'Юта',   text: 'Скажи мне: ты правда хочешь, чтобы мы снова проходили через этот суд?' },
        { side: 'left',  name: 'Юта',   text: 'Тебе мало смерти Кэт?' },
        { side: 'right', name: 'Треск', text: 'Что? Что ты такое.. говоришь..?' },
        { side: 'right', name: 'Треск', text: 'Я..' },
        { side: 'right', name: 'Треск', text: 'Понимаю, что тебе страшно.' },
        { side: 'right', name: 'Треск', text: 'Но если мы сейчас остановимся, мы можем ошибиться.' },
        { side: 'left',  name: 'Юта',   text: 'Я говорю лишь то, что нам не нужно искать убийцу, если все и так уже очевидно!' },
        { side: 'left',  name: 'Юта',   text: 'Это всего лишь пустая трата времени, и я не хочу снова тыкать в других пальцем.' },
        { side: 'right', name: 'Треск', text: 'Юта, это не трата времени. Мы обязаны рассмотреть все возможности, если хотим выжить.' },
        { side: 'right', name: 'Треск', text: 'Ты ведь не забыла про новый мотив Ксебета? Если мы ошибемся, умрут все, включая тебя тоже.' },
        { side: 'left',  name: 'Юта',   text: 'Я знаю, но я также знаю, что твои предположения просто невозможны, и я тебе покажу это!' },
        { side: 'right', name: 'Треск', thought: true, text: 'Черт, я понимаю чувства Юты, но я не могу отступить сейчас.' },
        { side: 'right', name: 'Треск', thought: true, text: 'Я больше не хочу умирать здесь, и я не позволю сейчас умереть другим!', sfx: SFX_DETERMINED, quake: true }
      ],
      phases: [
        {
          travel: 7200,
          lines: [
            'Я встретилась с Полиной около двух часов ночи.',
            'Ей было тяжело, поэтому я решила развеселить ее.',
            'Мы были там несколько часов.',
            'Полина видела Фусту, это правда.',
            'Но это никак не доказывает, что он ходил в комнату видеонаблюдения!'
          ],
          reply: [
            { name: 'Треск', text: 'Фусту поднимался на второй этаж ночью.' },
            { name: 'Треск', text: 'Разве это не странно? Что он там делал в такое время?' }
          ]
        },
        {
          travel: 6600,
          lines: [
            'Он вполне мог просто зайти на кухню попить или покушать!',
            'Либо он действительно там был, но никак не связан с этой розеткой.',
            'По вашим словам, убийца перетащил тело со второго этажа на первый.'
          ],
          weak: { text: 'Но это *невозможно*, потому что я и Полина сидели в библиотеке все это время!', weakPoint: 'vent' }
        }
      ],
      hint: { name: 'Треск', thought: true, text: 'Юта уверена, что мимо них никто не проходил. Но лестница — не единственный путь наверх…' }
    }
  };

  SWORD_BATTLES["sword2"] = {
    prelude: 'nsd-space',
    music: 'nsd-bladelock',
    outro: 'sun-edition',
    opponent: 'Шин',
    hero: 'Треск',
    blades: ['night-vision-glasses', 'null-location', 'bags'],
    prologue: [
      { side: 'left',  name: 'Шин',   text: 'Вы заказывали – я принёс! Я могу объяснить, как именно Нулл была способна побывать в двух местах «одновременно».' },
      { side: 'right', name: 'Треск', text: 'Шин? Почему ты так озабочен Нулл?' },
      { side: 'left',  name: 'Шин',   text: 'Я, конечно, понимаю, что ты очень хочешь оправдать ее и вижу вашу *особую связь*, но не будь ослеплен этим!' },
      { side: 'left',  name: 'Шин',   text: 'Это все может быть лишь планом Нулл, чтобы всех вас одурачить, ребята.' },
      { side: 'left',  name: 'Шин',   text: 'Что ж, готовься слушать!' },
      { side: 'right', name: 'Треск', thought: true, text: 'Я без понятия, что творится в его голове.' },
      { side: 'right', name: 'Треск', thought: true, text: 'Но моя вера в Нулл не строится слепо на моей дружбе с ней!' }
    ],
    phases: [
      {
        travel: 7200,
        lines: [
          'Табличка «Дезинфекция» служила убийце определенную роль.',
          'Повесили ее для того, чтобы никто не попал в столовую.',
          'А если говорить конкретнее — в щиток.',
          'Свет выключился *ночью, ровно в 2:30*.',
          'А Нулл оказалась одна прямо рядом с щитком, в баре.'
        ],
        reply: [
          { name: 'Треск', text: 'Я не понимаю тебя.' },
          { name: 'Треск', text: 'Нулл не могла включить свет и одновременно с этим убить Фусту.' }
        ]
      },
      {
        travel: 6800,
        lines: [
          'Убийце не обязательно оставаться в комнате видеонаблюдения.',
          'Установив ловушку, *Нулл покинула комнату через вентиляцию*.',
          'Далее ей нужно было лишь вернуться в бар и ждать.',
          'Зна́ком действия для Нулл было отключение света во всем здании.',
          'Включив свет обратно, она вернулась на второй этаж.'
        ],
        reply: [
          { name: 'Треск', text: 'Разве это не рискованно для Нулл возвращаться на место преступления?' },
          { name: 'Треск', text: 'Ее бы мог заметить любой.' }
        ]
      },
      {
        travel: 6600,
        lines: [
          'Да, могли. И поэтому план Нулл был построен исключительно ночью.',
          'В это время все бы спали и никто не заметил ее перемещения.',
          'Она установила эту ловушку *перед приходом Фусту*, вечером.',
          'А ты был использован как запасной вариант, если ее план провалится.',
          'Она бы отодвинула шкаф и свалила бы всю вину на тебя.',
          'И не признав, что ты был *заперт там всю ночь*!'
        ],
        weak: { text: 'Убийца знал про *то, что свет вернется обратно* и воспользовался этим!', weakPoint: 'night-vision-glasses' }
      }
    ],
    hint: { name: 'Треск', thought: true, text: 'Шин строит всё на том, что убийца рассчитывал на возвращение света. Но что, если ему было выгодно ровно обратное?' }
  };

  var SW_BANNER_IN_MS   = 900;   // плашка «ПРОТИВ» выезжает снизу
  var SW_BANNER_HOLD_MS = 1750;  // и держится перед трещиной
  // Заставка идёт по звуку «Rebuttal Showdown»: на 1-й секунде заголовок
  // уходит, дальше «СТАРТ!», а катаны выезжают на 2.1 / 2.8 / 3.3 секунде.
  var SW_TITLE_MS       = 1000;  // «СХВАТКА АРГУМЕНТАМИ» висит
  var SW_START_MS       = 900;   // «СТАРТ!» растёт и гаснет
  // Стойка выезжает СТРОГО после того, как «СТАРТ!» отыграл и убрался:
  // заставка держится NSD_START_AT_MS + NSD_START_HOLD_MS = 2300 мс.
  var SW_RACK_AT_MS     = 2400;  // первая катана
  var SW_RACK_STEP      = [0, 700, 1200];   // сдвиг второй и третьей
  var SW_RACK_PARK_MS   = 700;   // через сколько после последней стойка уезжает в угол
  var SW_HERO_HOLD_MS   = 3400;  // сколько висит ответ Треска между фазами
  var SW_LINE_GAP_MS    = 880;   // пауза между репликами Юты
  var SW_PHASE_LEAD_MS  = 1000;
  var SW_WEAK_FREEZE_MS = 700;
  var SW_HOLD_MS        = 2600;  // сколько слабая точка стоит в центре под удар
  var SW_RESTART_MS     = 1100;  // пауза после провала, перед первой фазой
  var SW_BREAK_HOLD_MS  = 2400;
  var SW_DARK_MS        = 260;

  var SW_SEAM_START = 74;        // где стоит граница в начале фазы, % ширины
  var SW_SEAM_END   = 50;        // и куда она приходит к концу

  var SW_SFX_BANNER = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/SPOILERS%20Danganronpa%202%20Sound%20Effect%20-%20Argument%20Begins.mp3';
  var SW_SFX_TITLE  = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/Danganronpa%202%20Sound%20Effect%20-%20Rebuttal%20Showdown.mp3';
  var SW_SFX_SLICE  = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/RVIKXy-D.wav';
  // Выбор катаны звучит иначе, чем выбор пули в дебатах
  var SW_SFX_BLADE  = 'https://github.com/hwhyssjej/game-audio/raw/refs/heads/main/GyqQg-yu.wav';

  window.swState = { active: false, id: null, alive: [], phase: 'idle', phaseIdx: 0, onComplete: null };

  function swRoot() { return document.getElementById('sw-root'); }

  // ------------------------------------------------------------
  // 1. ПЛАШКА «ПРОТИВ» — жёлтая полоса с чёрным обрамлением
  // ------------------------------------------------------------
  function swBanner(battle, next) {
    var host = document.getElementById('ct-root') || document.body;
    var old = document.getElementById('sw-banner'); if (old) old.remove();
    // Буквы не повернуты: столбец сам идёт под углом правой грани клина.
    // Первая буква крупнее остальных, множитель кегля задаётся через --m.
    // Буквы стоят плотным столбцом — читаются как слово, но строй не ровный:
    // у каждой свой кегль и небольшой сдвиг вбок (--dx, в долях базового
    // кегля). --gap добавляет разрыв сверху, сейчас он везде нулевой.
    // «П» заметно крупнее прочих и набрана отдельным засечным шрифтом.
    // lh — интерлиньяж строчного бокса. Он должен быть выше капители буквы,
    // иначе соседние глифы налезают друг на друга.
    // Слово «ПРОТИВ» убрано: на плашке остаётся только имя.

    // Декор живёт ВНУТРИ жёлтого листа и наследует его обрезку,
    // поэтому ничего из этого не может вылезти за чёрные грани.
    var echoWord = (battle.opponent || '').toUpperCase();
    var echo = '';
    for (var e = 0; e < 5; e++) echo += '<span>' + echoWord + '</span>';

    var el = document.createElement('div');
    el.id = 'sw-banner';
    // Полоса — клин: левая грань почти отвесная, правая завалена сильнее.
    // Жёлтое и чёрные грани режутся из одной геометрии, поэтому жёлтый
    // не может вылезти за обводку.
    el.innerHTML =
      '<div class="swb-band">' +
        '<div class="swb-sheet">' +
          '<div class="swb-echo">' + echo + '</div>' +
          '<div class="swb-dots"></div>' +
          '<div class="swb-grain"></div>' +
          '<div class="swb-gloss"></div>' +
        '</div>' +
        '<div class="swb-vignette"></div>' +
      '<div class="swb-flash"></div>' +
      '<div class="swb-edge swb-edge-l"></div>' +
        '<div class="swb-edge swb-edge-r"></div>' +
        '<div class="swb-face">' +
          '<div class="swb-who">' +
            '<span class="swb-who-name"></span>' +
            '<span class="swb-who-kicker">ОПРОВЕРЖЕНИЕ</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    host.appendChild(el);
    el.querySelector('.swb-who-name').textContent = echoWord;
    void el.offsetWidth;
    swPlaceWord(el);
    var armed = false;
    function arm() { if (armed) return; armed = true; el.classList.add('is-in'); }
    requestAnimationFrame(arm);
    setTimeout(arm, 60);

    nsdPlaySfx(SW_SFX_BANNER, 0.85);

    // Тряска кадра на двух ударах: приземление полосы и приход имени.
    // Класс снимаем по окончании его анимации, иначе второй толчок
    // не перезапустится.
    var ctRoot = document.getElementById('ct-root');
    function quake(cls, ms) {
      if (!ctRoot) return;
      ctRoot.classList.remove('sw-quake-1');
      void ctRoot.offsetWidth;
      ctRoot.classList.add(cls);
      nsdWait(function () { ctRoot.classList.remove(cls); }, ms);
    }
    nsdWait(function () { quake('sw-quake-1', 480); }, 420);

    nsdWait(function () { next(el); }, SW_BANNER_IN_MS + SW_BANNER_HOLD_MS);
  }


  // Столбец «ПРОТИВ» идёт ровно по углу правой грани клина. Буквы при этом
  // не повёрнуты: наклон даёт не поворот глифа, а сдвиг каждой строки влево.
  // Шаг считаем по реальной высоте строк — первая буква крупнее остальных,
  // поэтому равномерный отступ здесь не подошёл бы.

  // ------------------------------------------------------------
  // 2. РАСКОЛОТЫЙ ЭКРАН И СКОШЕННОЕ ОКНО
  // ------------------------------------------------------------
  function swBuildSplit(battle) {
    var host = document.getElementById('ct-root') || document.body;
    var old = document.getElementById('sw-split'); if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'sw-split';
    el.innerHTML =
      '<div class="swsp-half swsp-l"></div>' +
      '<div class="swsp-half swsp-r"></div>' +
      '<div class="swsp-seam"></div>' +
      '<div class="swsp-box" id="swsp-box">' +
        '<div class="swsp-panel"></div>' +
        // Плашка имени лежит в обёртке, повторяющей наклон панели: только так
        // она садится на скошенную линию ровно наполовину, как в обычном окне.
        '<div class="swsp-cardwrap">' +
          '<div class="ct-namecard swsp-card" id="swsp-card">' +
            '<div class="ct-name-plate">' +
              '<div class="ct-namecard-line1" id="swsp-name"></div>' +
              '<div class="ct-namecard-line2"></div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="swsp-content">' +
          '<div class="swsp-text" id="swsp-text"></div>' +
        '</div>' +
      '</div>';
    host.appendChild(el);
    void el.offsetWidth;
    var armed = false;
    function arm() { if (armed) return; armed = true; el.classList.add('is-in'); }
    requestAnimationFrame(arm);
    setTimeout(arm, 60);
    return el;
  }

  // Окно скашивается в сторону говорящего и плавно перетекает обратно
  function swSay(entry, done) {
    var box = document.getElementById('swsp-box');
    var nameEl = document.getElementById('swsp-name');
    var card = document.getElementById('swsp-card');
    var textEl = document.getElementById('swsp-text');
    if (!box || !textEl) { done(); return; }

    var left = entry.side !== 'right';
    // окно стоит на месте, наклон постоянный: меняется только сторона
    // плашки с именем и выключка самой реплики
    box.classList.toggle('says-right', !left);
    // мысли — тем же голубым курсивом, что и в обычном окне суда
    textEl.classList.toggle('is-thought', entry.thought === true);
    // Реплика пролога может бить звуком и тряской кадра — как в обычном окне суда.
    if (entry.sfx) nsdPlaySfx(entry.sfx, 0.7);
    if (entry.quake) {
      var cq = document.getElementById('ct-root');
      if (cq) { cq.classList.remove('ct-quake'); void cq.offsetWidth; cq.classList.add('ct-quake');
        setTimeout(function () { cq.classList.remove('ct-quake'); }, 520); }
    }
    if (card) {
      card.classList.toggle('at-right', !left);
      // зеркалим обёртку целиком: и фигура плашки, и её отступ от края
      var wrap = card.parentNode;
      if (wrap && wrap.classList) wrap.classList.toggle('at-right', !left);
      swRenderName(nameEl, entry.name);
      card.classList.remove('is-in'); void card.offsetWidth; card.classList.add('is-in');
    }

    textEl.textContent = '';
    var tnode = document.createTextNode('');
    textEl.appendChild(tnode);
    var text = entry.text, shown = 0, started = 0, typed = false;
    function frame(now) {
      if (!started) started = now;
      var want = Math.min(text.length, Math.floor((now - started) / CT_CHAR_MS) + 1);
      if (want > shown) { tnode.data = text.slice(0, want); shown = want; }
      if (shown < text.length) window.swSayRaf = requestAnimationFrame(frame);
      else typed = true;
    }
    window.swSayRaf = requestAnimationFrame(frame);
    // страховка на случай, когда кадры не идут (свёрнутая вкладка)
    var guard = setTimeout(function () { tnode.data = text; typed = true; }, text.length * CT_CHAR_MS + 400);

    function onClick(e) {
      e.stopPropagation();
      if (!typed) { cancelAnimationFrame(window.swSayRaf); tnode.data = text; typed = true; return; }
      clearTimeout(guard);
      cancelAnimationFrame(window.swSayRaf);
      document.removeEventListener('click', onClick, true);
      sfxAdvance.play();   // тот же звук перелистывания, что и в обычном окне
      done();
    }
    setTimeout(function () { document.addEventListener('click', onClick, true); }, 140);
  }

  function swRunSequence(list, i, done) {
    if (i >= list.length) { done(); return; }
    swSay(list[i], function () { swRunSequence(list, i + 1, done); });
  }

  function swSplitShow(on) {
    var sp = document.getElementById('sw-split');
    if (!sp) return;
    sp.classList.toggle('is-hidden', !on);
  }

  // Имя в скошенном окне рисуем той же функцией, что и в суде,
  // чтобы плашка была один в один — форма, цвет, наклон букв.
  function swRenderName(target, name) {
    if (!target) return;
    ctBuildNameSpans(target, name || '');
    var plate = target.closest ? target.closest('.ct-name-plate') : null;
    ctFitNameTilt(plate, target);
    requestAnimationFrame(function () { ctFitNameTilt(plate, target); });
  }

  // ------------------------------------------------------------
  // 3. ЗАСТАВКА: «СХВАТКА АРГУМЕНТАМИ» -> линии -> «СТАРТ!»
  // ------------------------------------------------------------
  // Ставит имя ровно поперёк жёлтого поля на его высоте. Считаем в
  // координатах вёрстки (offset*), а не экранных: в момент раскладки полоса
  // ещё сдвинута вниз анимацией въезда, и getBoundingClientRect дал бы
  // положение грани совсем не там.
  function swPlaceWord(el) {
    var who = el.querySelector('.swb-who');
    if (!who) return;

    function apply() {
      var cs = getComputedStyle(el);
      var lt = parseFloat(cs.getPropertyValue('--lt')), lb = parseFloat(cs.getPropertyValue('--lb'));
      var rt = parseFloat(cs.getPropertyValue('--rt')), rb = parseFloat(cs.getPropertyValue('--rb'));
      if (isNaN(lt) || isNaN(rt)) return;
      var W = el.offsetWidth, H = el.offsetHeight;
      if (!W || !H) return;
      var f = (parseFloat(who.style.getPropertyValue('--py')) || 50) / 100;
      var L = (lt + (lb - lt) * f) / 100 * W;
      var R = (rt + (rb - rt) * f) / 100 * W;
      // середина жёлтого поля на этой высоте; если имя шире поля — прижимаем
      var hw = who.offsetWidth / 2;
      var pad = hw + W * 0.014;
      var x = (L + R) / 2;
      var lo = L + pad, hi = R - pad;
      if (hi < lo) { lo = hi = (L + R) / 2; }
      if (x < lo) x = lo;
      if (x > hi) x = hi;
      who.style.setProperty('--who-x', (x / W * 100).toFixed(2) + '%');
    }
    apply();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply).catch(function () {});
    requestAnimationFrame(apply);
    function onResize() {
      if (!el.isConnected) { window.removeEventListener('resize', onResize); if (ro) ro.disconnect(); return; }
      apply();
    }
    window.addEventListener('resize', onResize);
    var ro = null;
    if (window.ResizeObserver) { ro = new ResizeObserver(onResize); ro.observe(document.documentElement); }
  }

  // Заставка собрана ровно как у нон-стоп дебатов: тот же звук, те же
  // классы (а значит и та же анимация «СТАРТ!»), те же выдержки. Отличаются
  // только надпись и стойка с катанами поверх.
  function swIntroAnim(battle, next) {
    if (battle && battle.music && battle.music !== battle.prelude) nsdEnterMusic(battle.music, true);
    var host = document.getElementById('ct-root') || document.body;
    var old = document.getElementById('sw-intro'); if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'sw-intro';
    el.innerHTML =
      '<div class="nsd-intro-dim"></div>' +
      '<div class="nsd-intro-bars">' + ctFlyLines(12, 'nsd-ray') + '</div>' +
      '<div class="nsd-intro-title" id="swi-title"></div>' +
      '<div class="nsd-intro-start" id="swi-start"></div>';
    host.appendChild(el);

    var titleEl = el.querySelector('#swi-title');
    var startEl = el.querySelector('#swi-start');
    // Буквы готовим заранее и даём браузеру кадр на растеризацию — иначе
    // первый кадр анимации совпадает с вёрсткой и заставка дёргается.
    nsdJitterSpans(titleEl, 'СХВАТКА АРГУМЕНТАМИ');
    nsdJitterSpans(startEl, 'СТАРТ!');
    void el.offsetWidth;

    var armed = false;
    function arm() {
      if (armed) return;
      armed = true;
      nsdPlaySfx(NSD_INTRO_SFX, 0.85);
      titleEl.classList.add('is-shown');
    }
    requestAnimationFrame(arm);
    setTimeout(arm, 60);

    nsdWait(function () {
      titleEl.classList.add('is-out');
      startEl.classList.add('is-shown');
      startEl.classList.add('is-popping');
      var fx = document.createElement('div');
      fx.className = 'nsd-intro-fx';
      fx.innerHTML = '<div class="nsd-intro-flash"></div><div class="nsd-intro-shock"></div>' +
        '<div class="nsd-start-ring" style="--rd:0.2s"></div>';
      el.appendChild(fx);
      el.classList.add('is-firing');
    }, NSD_START_AT_MS);

    nsdWait(function () { if (el.parentNode) el.remove(); }, NSD_START_AT_MS + NSD_START_HOLD_MS);

    // катаны выезжают по одной прямо поверх заставки
    nsdWait(function () {
      swShowBlades(battle, next);
    }, SW_RACK_AT_MS);
  }

  // ------------------------------------------------------------
  // 4. АРЕНА
  // ------------------------------------------------------------
  function swBuildArena(battle) {
    var host = document.getElementById('ct-root') || document.body;
    var old = swRoot(); if (old) old.remove();
    var pips = '';
    for (var i = 0; i < battle.phases.length; i++) pips += '<i class="sw-pip" style="--i:' + i + '"></i>';

    var r = document.createElement('div');
    r.id = 'sw-root';
    r.style.setProperty('--seam', SW_SEAM_START + '%');
    r.innerHTML =
      // Фоновых лучей на арене нет: восемь бесконечных анимаций под холстом
      // разбития давали заметную просадку кадров, а видно их почти не было.
      '<div class="sw-bg"></div>' +
      '<div class="sw-divider"></div>' +
      '<div class="sw-blade-line" id="sw-blade-line"></div>' +
      '<div class="sw-pips" id="sw-pips">' + pips + '</div>' +
      '<div class="sw-lane" id="sw-lane"></div>' +
      '<div class="sw-lane-r" id="sw-lane-r"></div>' +
      '<div class="sw-floor">' +
        '<div class="sw-plate sw-plate-l"><span></span></div>' +
        '<div class="sw-plate sw-plate-r"><span></span></div>' +
      '</div>';
    host.appendChild(r);
    r.querySelector('.sw-plate-l span').textContent = battle.opponent || '';
    r.querySelector('.sw-plate-r span').textContent = battle.hero || '';
    return r;
  }

  // Граница половины Юты: в начале фазы залезает на сторону Треска,
  // с каждой разрубленной репликой отходит к центру.
  function swSetSeam(pct) {
    var r = swRoot();
    if (r) r.style.setProperty('--seam', pct.toFixed(2) + '%');
  }
  function swSeamForProgress(done, total) {
    if (!total) return SW_SEAM_END;
    return SW_SEAM_START + (SW_SEAM_END - SW_SEAM_START) * (done / total);
  }

  // ---------- клинок: одна тонкая линия по направлению курсора ----------
  var swDrag = null;
  function swBladeEl() { return document.getElementById('sw-blade-line'); }
  function swBladeDraw(x1, y1, x2, y2) {
    var b = swBladeEl();
    if (!b) return;
    var dx = x2 - x1, dy = y2 - y1;
    var len = Math.hypot(dx, dy);
    if (len < 4) { b.classList.remove('is-on'); return; }
    b.style.left = x1 + 'px';
    b.style.top = y1 + 'px';
    b.style.width = len + 'px';
    b.style.transform = 'rotate(' + Math.atan2(dy, dx) + 'rad)';
    b.classList.add('is-on');
  }
  function swBladeHide() {
    var b = swBladeEl();
    if (b) b.classList.remove('is-on');
  }

  function swPointerDown(e) {
    swBladeHide();
    if (!window.swState.active || swInputLocked) return;
    if (window.swState.phase !== 'run' && window.swState.phase !== 'weak') return;
    swDrag = { ox: e.clientX, oy: e.clientY, x: e.clientX, y: e.clientY, moved: 0 };
    document.documentElement.classList.add('sw-swinging');
  }
  function swPointerMove(e) {
    // Линия живёт строго внутри протяжки: без зажатой кнопки и вне боевых
    // фаз её быть не должно — иначе она мелькала поверх реплик Треска.
    if (!swDrag) { swBladeHide(); return; }
    if (e.buttons === 0 && e.pointerType === 'mouse') { swDrag = null; swBladeHide(); return; }
    // Фаза могла закрыться прямо посреди взмаха — рубить больше нечего, но
    // сам взмах доводим до конца, иначе последний слайс фазы не отрисуется.
    var live = window.swState.phase === 'run' || window.swState.phase === 'weak';
    swDrag.moved += Math.hypot(e.clientX - swDrag.x, e.clientY - swDrag.y);
    // линия одна: тянется от точки нажатия до текущего положения курсора
    swBladeDraw(swDrag.ox, swDrag.oy, e.clientX, e.clientY);
    if (live) swTestCut(swDrag.x, swDrag.y, e.clientX, e.clientY);
    swDrag.x = e.clientX; swDrag.y = e.clientY;
  }
  function swPointerUp(e) {
    swBladeHide();
    if (!swDrag) return;
    var d = swDrag;
    if (d.moved < 8) {
      d.ox = e.clientX - 70; d.oy = e.clientY - 26;
      swTestCut(e.clientX - 26, e.clientY - 26, e.clientX + 26, e.clientY + 26);
      if (d.cut) swSlashFlash(d.ox, d.oy, e.clientX + 70, e.clientY + 26);
    } else if (d.cut) {
      swSlashFlash(d.ox, d.oy, e.clientX, e.clientY);
    }
    // Окончательный срез разбираем здесь: взмах уже целиком известен, и
    // проверка идёт по всей его линии — от нажатия до отпускания.
    if (d.finalEl) {
      var blade = swPickedBlade();
      if (blade) swFinalCut(d.finalEl, blade, d.ox, d.oy, e.clientX, e.clientY);
    }
    document.documentElement.classList.remove('sw-swinging');
    swDrag = null;
    if (swInputLocked) swAttachInput(false);   // фаза кончилась во время взмаха
  }
  // Отвязываем ввод не сразу: вспышка разруба рисуется на pointerup, а разруб
  // последней реплики фазы происходит ещё в движении. Снимем слушатели тут же —
  // и на последнем взмахе каждой фазы слайс просто не появлялся.
  var swInputLocked = false;
  function swBindInput(on) {
    if (on) {
      swInputLocked = false;
      swAttachInput(true);
      return;
    }
    swInputLocked = true;
    if (!swDrag) swAttachInput(false);   // взмаха нет — можно снимать сразу
  }
  function swAttachInput(on) {
    var fn = on ? 'addEventListener' : 'removeEventListener';
    document[fn]('pointerdown', swPointerDown, true);
    document[fn]('pointermove', swPointerMove, true);
    document[fn]('pointerup', swPointerUp, true);
    document[fn]('pointercancel', swPointerUp, true);
    if (!on) swBladeHide();
  }

  // Пересечение отрезка с прямоугольником — реплика на экране одна,
  // так что честная проверка дешевле выборок elementFromPoint.
  function swSegHitsRect(x1, y1, x2, y2, r) {
    if (x1 >= r.left && x1 <= r.right && y1 >= r.top && y1 <= r.bottom) return true;
    if (x2 >= r.left && x2 <= r.right && y2 >= r.top && y2 <= r.bottom) return true;
    function seg(ax, ay, bx, by) {
      function d(px, py, qx, qy, rx, ry) { return (qx - px) * (ry - py) - (qy - py) * (rx - px); }
      var d1 = d(x1, y1, x2, y2, ax, ay), d2 = d(x1, y1, x2, y2, bx, by);
      var d3 = d(ax, ay, bx, by, x1, y1), d4 = d(ax, ay, bx, by, x2, y2);
      return ((d1 > 0) !== (d2 > 0)) && ((d3 > 0) !== (d4 > 0));
    }
    return seg(r.left, r.top, r.right, r.top) || seg(r.right, r.top, r.right, r.bottom) ||
           seg(r.right, r.bottom, r.left, r.bottom) || seg(r.left, r.bottom, r.left, r.top);
  }

  function swTestCut(x1, y1, x2, y2) {
    var st = window.swState;
    if (swInputLocked) return;   // фаза уже закрыта, но взмах ещё дорисовывается
    var picked = swPickedBlade();
    for (var i = 0; i < st.alive.length; i++) {
      var el = st.alive[i];
      if (!el.parentNode || el.dataset.dead === '1') continue;
      if (!swSegHitsRect(x1, y1, x2, y2, el.getBoundingClientRect())) continue;
      // Катана в руке — срез окончательный. Судить его прямо здесь нельзя:
      // swTestCut зовётся на каждом сдвиге курсора и видит только последний
      // отрезок взмаха, поэтому «мимо» получалось даже у правильного удара.
      // Запоминаем задетую реплику и разбираем весь взмах на отпускании.
      if (picked) {
        if (swDrag) { swDrag.finalEl = el; swDrag.cut = true; }
        else swFinalCut(el, picked, x1, y1, x2, y2);
      } else swCutNormal(el);
      return;
    }
  }

  function swDropAlive(el) {
    var a = window.swState.alive, k = a.indexOf(el);
    if (k !== -1) a.splice(k, 1);
  }

  // Вспышка повторяет весь отрезок, который провёл курсор — от точки нажатия
  // до точки отпускания. Рисуем её именно на отпускании: разруб срабатывает в
  // середине взмаха, и на этот момент конец траектории ещё не известен.
  function swSlashFlash(x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1;
    var len = Math.hypot(dx, dy);
    if (len < 24) return;
    // немного выпускаем за оба конца, чтобы взмах читался как сквозной
    var ex = (dx / len) * len * 0.12, ey = (dy / len) * len * 0.12;
    var f = document.createElement('div');
    f.className = 'sw-slash-flash';
    f.style.left = (x1 - ex) + 'px';
    f.style.top = (y1 - ey) + 'px';
    f.style.width = (len * 1.24) + 'px';
    f.style.setProperty('--ang', Math.atan2(dy, dx).toFixed(4) + 'rad');
    (swRoot() || document.body).appendChild(f);
    setTimeout(function () { if (f.parentNode) f.remove(); }, 500);
  }

  function swCutNormal(el) {
    var st = window.swState;
    el.dataset.dead = '1';
    swDropAlive(el);
    nsdPlaySfx(SW_SFX_SLICE, 0.8);
    el.classList.add('is-cut');
    if (swDrag) swDrag.cut = true;   // вспышку нарисуем, когда взмах закончится
    setTimeout(function () { if (el.parentNode) el.remove(); }, 440);

    st.cleared++;
    swSetSeam(swSeamForProgress(st.cleared, st.total));
    swNextLine();
  }

  // Слабая точка больше не отдельная сцена: она едет в общей очереди фазы
  // последней репликой. Список считаем один раз и кешируем на самой фазе.
  function swPhaseLines(phase) {
    if (!phase._lines) {
      phase._lines = phase.weak ? phase.lines.concat([phase.weak.text]) : phase.lines.slice();
      phase._answer = phase.weak ? phase._lines.length - 1 : -1;
    }
    return phase._lines;
  }

  // Реплика со слабой точкой доезжает до середины и замирает там на пару
  // секунд — только в этот момент по ней можно попасть. Момент ловим по
  // фактическим координатам: так пауза не зависит ни от ширины реплики,
  // ни от того, сколько длится проезд в этой фазе.
  function swHoldAtCenter(el, lane) {
    var st = window.swState;
    var raf = 0;
    function tick() {
      if (!st.active || !el.parentNode || el.dataset.dead === '1') return;
      var r = el.getBoundingClientRect(), lr = lane.getBoundingClientRect();
      if (r.left + r.width / 2 <= lr.left + lr.width / 2) {
        // Паузу ставим классом, а не el.style: в CSS у .sw-stmt анимация
        // объявлена сокращённо и с !important, а такое объявление
        // сбрасывает animation-play-state обратно в running и перебивает
        // инлайновый стиль. Реплика тогда не замирала вовсе.
        el.classList.add('is-held');
        nsdWait(function () {
          if (!el.parentNode || el.dataset.dead === '1') return;
          el.classList.remove('is-held');
        }, SW_HOLD_MS);
        return;
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    el._holdRaf = function () { cancelAnimationFrame(raf); };
  }

  // ---------- реплики фазы: строго по одной ----------
  function swSpawnLine(phase, i) {
    var st = window.swState;
    if (!st.active || st.phase !== 'run') return;
    var lane = document.getElementById('sw-lane');
    if (!lane) return;

    var el = document.createElement('div');
    el.className = 'sw-stmt';
    el.dataset.weak = '0';
    el.style.setProperty('--travel', (phase.travel || 5200) + 'ms');
    el.style.setProperty('--row', (i % 3));
    el.style.setProperty('--tilt', ((i % 2 ? 1 : -1) * (1.2 + (i % 3) * 0.7)).toFixed(1) + 'deg');
    var inner = document.createElement('div');
    inner.className = 'sw-stmt-inner';
    nsdBuildLineText(inner, swPhaseLines(phase)[i]);
    el.appendChild(inner);
    if (i === phase._answer) el.dataset.answer = '1';
    lane.appendChild(el);
    // Реплика могла развернуться в три строки и вылезти за нижний край
    // дорожки — дорожка режет по overflow, и последняя строка пропадала.
    // Меряем по факту и подтягиваем вверх, если не помещается.
    var lh = lane.clientHeight, eh = el.offsetHeight, tp = el.offsetTop;
    if (tp + eh > lh - 6) el.style.top = Math.max(6, lh - eh - 6) + 'px';
    st.alive.push(el);
    // Любая золотая вставка — слабая точка: такая реплика замирает в центре.
    if (inner.querySelector('.nsd-weak-segment.is-gold')) {
      el.dataset.weak = '1';
      el.classList.add('has-weak');
      swHoldAtCenter(el, lane);
    }

    el.addEventListener('animationend', function (ev) {
      if (ev.animationName !== 'swFly') return;
      if (el.dataset.dead === '1') return;
      el.dataset.dead = '1';
      swDropAlive(el);
      if (el.parentNode) el.remove();
      if (!window.swState.active) return;
      swFlashMiss();
      swNextLine();          // пропущенную реплику Юта повторит на новом круге
    });
  }

  // Следующая реплика выходит только после того, как предыдущая ушла
  function swNextLine() {
    var st = window.swState;
    if (!st.active || st.phase !== 'run') return;
    var battle = SWORD_BATTLES[st.id];
    var phase = battle.phases[st.phaseIdx];
    if (st.cleared >= st.total) { swPhaseCleared(battle, phase); return; }
    st.cursor = (st.cursor + 1) % swPhaseLines(phase).length;
    nsdWait(function () { swSpawnLine(phase, st.cursor); }, SW_LINE_GAP_MS);
  }

  function swFlashMiss() {
    var r = swRoot();
    if (!r) return;
    r.classList.remove('is-hurt'); void r.offsetWidth; r.classList.add('is-hurt');
  }

  function swMarkPhase(idx) {
    var bar = document.getElementById('sw-pips');
    if (!bar) return;
    Array.prototype.forEach.call(bar.children, function (p, i) {
      p.classList.toggle('is-done', i < idx);
      p.classList.toggle('is-now', i === idx);
    });
  }

  function swPhaseCleared(battle, phase) {
    var st = window.swState;
    st.phase = 'between';
    nsdClearTimers();
    swBindInput(false);
    // Ответ Треска приходит на его половину — так же, как реплики Юты,
    // только справа и приглушённым голубым. Реплик может быть несколько:
    // они идут одна за другой, каждая уходит до появления следующей.
    var reply = phase.reply;
    if (!reply) { st.phaseIdx++; nsdWait(function () { swRunPhase(battle); }, 620); return; }
    var texts = (reply.length !== undefined ? reply : [reply])
        .map(function (r) { return typeof r === 'string' ? r : r.text; });
    (function step(i) {
      if (i >= texts.length) {
        window.swState.phaseIdx++;
        swRunPhase(battle);
        return;
      }
      swHeroLine(texts[i], function () { step(i + 1); });
    })(0);
  }

  function swHeroLine(text, done) {
    var lane = document.getElementById('sw-lane-r');
    if (!lane) { done(); return; }
    var el = document.createElement('div');
    el.className = 'sw-stmt is-hero sw-hero-in';
    var inner = document.createElement('div');
    inner.className = 'sw-stmt-inner';
    nsdBuildLineText(inner, text);
    el.appendChild(inner);
    lane.appendChild(el);
    nsdWait(function () {
      el.classList.remove('sw-hero-in');
      el.classList.add('sw-hero-out');
      nsdWait(function () { if (el.parentNode) el.remove(); done(); }, 420);
    }, SW_HERO_HOLD_MS);
  }

  function swRunPhase(battle) {
    var st = window.swState;
    // Круг замкнут: если фазы кончились, а окончательный срез так и не
    // прошёл, схватка начинается заново с первой фазы.
    var phase = battle.phases[st.phaseIdx];
    if (!phase) { st.phaseIdx = 0; phase = battle.phases[0]; }
    if (!phase) { swFinishBattle(); return; }
    st.phase = 'run';
    st.alive = [];
    st.cleared = 0;
    st.total = swPhaseLines(phase).length;
    st.cursor = -1;
    swMarkPhase(st.phaseIdx);
    swSetSeam(SW_SEAM_START);
    swBindInput(true);
    nsdWait(function () { st.cursor = 0; swSpawnLine(phase, 0); }, SW_PHASE_LEAD_MS);
  }

  // ---------- стойка с катанами (аналог барабана пуль, только для схваток) ----------
  // Название улики написано прямо на ножнах: отдельной таблички нет.
  function swShowBlades(battle, callback) {
    var root = swRoot();
    if (!root) { callback(); return; }
    var required = null;
    (battle.phases || []).forEach(function (p) { if (p.weak) required = p.weak.weakPoint; });

    var ids = [];
    if (required && CLUE_DATA_JS[required]) ids.push(required);
    (battle.blades || []).forEach(function (id) { if (CLUE_DATA_JS[id] && ids.indexOf(id) === -1) ids.push(id); });
    if (!ids.length) { callback(); return; }
    nsdShuffle(ids);

    var rows = ids.map(function (id, i) {
      return '<div class="sw-blade" data-blade="' + id + '"' +
             ' style="--d:' + ((SW_RACK_STEP[i] == null ? i * 500 : SW_RACK_STEP[i]) / 1000) + 's">' +
               '<span class="sw-katana">' +
                 '<span class="sw-katana-grip"></span>' +
                 '<span class="sw-katana-knot"></span>' +
                 '<span class="sw-katana-tsuba"></span>' +
                 '<span class="sw-katana-saya"><span class="sw-katana-name"></span></span>' +
               '</span>' +
             '</div>';
    }).join('');

    var wrap = document.createElement('div');
    wrap.id = 'sw-blades';
    wrap.className = 'sw-blades';
    wrap.innerHTML = '<div class="sw-blades-rack">' + rows + '</div>';
    root.appendChild(wrap);

    var names = wrap.querySelectorAll('.sw-katana-name');
    ids.forEach(function (id, i) {
      if (names[i]) names[i].textContent = (CLUE_DATA_JS[id] && CLUE_DATA_JS[id].title) ? CLUE_DATA_JS[id].title : 'УЛИКА';
    });

    // По умолчанию не выбрана ни одна: обычные реплики рубятся просто так.
    // Катану берут только под окончательный срез — тогда и включается
    // проверка. Повторный клик по той же катане снимает выбор.
    wrap.querySelectorAll('.sw-blade').forEach(function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var was = b.classList.contains('is-active');
        wrap.querySelectorAll('.sw-blade').forEach(function (o) { o.classList.remove('is-active'); });
        if (!was) b.classList.add('is-active');
        wrap.classList.toggle('is-armed', !was);
        nsdPlaySfx(SW_SFX_BLADE, 0.8);
      });
    });

    void wrap.offsetWidth;
    var armed = false;
    function arm() { if (armed) return; armed = true; wrap.classList.add('is-ready'); }
    requestAnimationFrame(arm);
    setTimeout(arm, 60);

    // каждая катана выезжает со своим щелчком — тем же, что и выбор улики
    ids.forEach(function (id, i) {
      var d = SW_RACK_STEP[i] == null ? i * 500 : SW_RACK_STEP[i];
      nsdWait(function () { nsdPlaySfx(SW_SFX_BLADE, 0.7); }, d);
    });

    var last = SW_RACK_STEP[ids.length - 1] != null ? SW_RACK_STEP[ids.length - 1] : (ids.length - 1) * 500;
    nsdWait(function () { wrap.classList.add('is-parked'); }, last + SW_RACK_PARK_MS);
    nsdWait(callback, last + SW_RACK_PARK_MS + 520);
  }

  function swPickedBlade() {
    var a = document.querySelector('.sw-blade.is-active');
    return a ? a.getAttribute('data-blade') : null;
  }

  // Окончательный срез: верной должна быть и реплика с золотой вставкой,
  // и место разруба по ней, и сама катана. Ошибка в любом из трёх —
  // схватка начинается заново с первой фазы.
  function swFinalCut(el, picked, x1, y1, x2, y2) {
    if (el.dataset.busy === '1') return;
    var st = window.swState;
    var seg = el.querySelector('.nsd-weak-segment.is-gold');
    var placeOk = el.dataset.answer === '1' && seg &&
                  swSegHitsRect(x1, y1, x2, y2, seg.getBoundingClientRect());
    if (placeOk && picked === st.weakPoint) { swStrikeWeak(el); return; }
    swFailRestart(el);
  }

  function swFailRestart(el) {
    var st = window.swState;
    if (st.restarting) return;
    st.restarting = true;
    st.phase = 'between';
    if (el) { el.dataset.busy = '1'; el.classList.add('is-blocked'); }
    sfxShoot.play();
    // Ошибка стоит половину звезды; опустело — состояние наливается заново
    // вместе с самой схваткой.
    if (hpLose()) hpReset();
    swFlashMiss();
    nsdClearTimers();
    swBindInput(false);
    var root = swRoot();
    if (root) root.classList.add('is-restart');
    nsdWait(function () {
      st.alive.slice().forEach(function (n) {
        if (n._holdRaf) n._holdRaf();
        if (n.parentNode) n.remove();
      });
      st.alive = [];
      var lane = document.getElementById('sw-lane');
      if (lane) lane.querySelectorAll('.sw-stmt').forEach(function (n) { n.remove(); });
      if (root) root.classList.remove('is-restart');
      var blades = document.getElementById('sw-blades');
      if (blades) {
        blades.classList.remove('is-armed');
        blades.querySelectorAll('.sw-blade').forEach(function (o) { o.classList.remove('is-active'); });
      }
      st.restarting = false;
      st.phaseIdx = 0;
      swRunPhase(SWORD_BATTLES[st.id]);
    }, SW_RESTART_MS);
  }

  function swStrikeWeak(el) {
    var st = window.swState;
    el.dataset.busy = '1';
    el.dataset.dead = '1';
    st.phase = 'done';
    swDropAlive(el);
    nsdClearTimers();
    if (swDrag) swDrag.cut = true;   // вспышку дорисуем на отпускании
    swBindInput(false);
    nsdPlaySfx(SW_SFX_SLICE, 0.9);

    var blades = document.getElementById('sw-blades');
    if (blades) blades.classList.add('is-gone');
    nsdShatterWord(el, el.querySelector('.nsd-weak-segment'));
    // сюда приходят из обработчика разруба, где самого боя под рукой нет —
    // берём его по идентификатору из состояния
    swFinalBreak(SWORD_BATTLES[st.id]);
  }

  // Разбитие экрана и «ПРОРЫВ!» — тот же финал, что и у нон-стоп дебатов
  function swFinalBreak(battle) {
    var root = document.getElementById('ct-root');
    nsdWait(function () {
      if (root && !document.getElementById('nsd-dim')) {
        var dim = document.createElement('div');
        dim.id = 'nsd-dim';
        root.appendChild(dim);
        void dim.offsetWidth;
        var armed = false;
        var arm = function () { if (armed) return; armed = true; dim.classList.add('is-on'); };
        requestAnimationFrame(arm); setTimeout(arm, 60);
      }
      nsdWait(function () {
        // Арена с градиентами, лучами и стойкой мечей осталась бы под холстом
        // и композитилась каждый кадр — из-за неё разбитие подвисало.
        var arena = swRoot();
        if (arena) arena.style.display = 'none';
        var bl = document.getElementById('sw-blades'); if (bl) bl.remove();
        nsdPlaySfx(NSD_SFX_BREAK, 0.9);
        nsdRunBreak();
        nsdWait(function () {
          var d = document.getElementById('nsd-dim');
          if (d) d.classList.add('is-full');
          nsdWait(function () {
            nsdShowBreakWord();
            nsdWait(function () {
              var bw = document.querySelector('.nsd-break-word');
              if (bw) bw.classList.add('is-fading');
              nsdWait(function () { swAfterBreak(battle); }, NSD_WORD_FADE_MS);
            }, SW_BREAK_HOLD_MS);
          }, SW_DARK_MS);
        }, NSD_GLASS_MS);
      }, NSD_REFUTE_MS);
    }, NSD_WORD_BURST_MS);
  }

  // После «ПРОРЫВ!» бой заканчивается и управление возвращается обычному
  // режиму суда: продолжение разговора идёт уже там, обычным окном с
  // плашкой «3 ГЛАВА» и бегущей строкой.
  function swAfterBreak(battle) {
    // Музыка финала заводится здесь и остаётся играть после схватки:
    // подменяем «трек до сцены», поэтому nsdExitMusic уходит именно в неё.
    // Только подменяем «трек до сцены»: сам переход сделает nsdExitMusic
    // внутри swFinishBattle. Раньше здесь ещё и вызывался nsdEnterMusic,
    // и трек заводился дважды — сначала тут, потом на выходе из боя.
    var outro = battle && battle.outro && TRACKS[battle.outro];
    if (outro) window.nsdState.prevTrack = outro.url;
    swFinishBattle();
  }

  function swFinishBattle() {
    var st = window.swState;
    if (!st.active) return;
    document.documentElement.classList.remove('nsd-panic-on');
    st.active = false;
    var cb = st.onComplete;
    st.onComplete = null;
    nsdClearTimers();
    swBindInput(false);
    hpRemove();
    nsdFadeBack(function (cleanup, reveal) {
      document.documentElement.classList.remove('nsd-active', 'sw-active', 'sw-swinging');
      ['sw-root', 'sw-split', 'sw-banner', 'sw-intro', 'sw-blades', 'nsd-break', 'nsd-dim', 'nsd-panic'].forEach(function (id) {
        var n = document.getElementById(id); if (n) n.remove();
      });
      if (nsdBreakState) { cancelAnimationFrame(nsdBreakState.raf); nsdBreakState = null; }
      nsdClearBlacked();
      var tx = document.getElementById('ct-dialogue-text'); if (tx) tx.textContent = '';
      var nf = document.getElementById('ct-name-first'); if (nf) nf.textContent = '';
      var bx = document.querySelector('.ct-dialogue-box'); if (bx) bx.style.display = '';
      var nc = document.getElementById('ct-namecard'); if (nc) nc.style.display = '';
      nsdExitMusic();
      reveal(function () {
        window.ctEventRunning = false;
        if (cb) cb();
      });
    });
  }

  window.startSwordBattle = function (battleId, onComplete) {
    var battle = SWORD_BATTLES[battleId];
    if (!battle) { if (onComplete) onComplete(); return; }
    nsdClearTimers();
    ctCancelAuto();
    // Прогреваем звуки боя: первый удар иначе звучал с задержкой, пока
    // браузер тянул файл с GitHub.
    [SW_SFX_SLICE, SW_SFX_BLADE].forEach(function (u) {
      try { if (!nsdSfxCache[u]) { var a = nsdSfxCache[u] = new Audio(u); a.preload = 'auto'; a.load(); } } catch (e) {}
    });
    window.ctEventRunning = true;
    window.swState = { active: true, id: battleId, alive: [], cleared: 0, total: 0, cursor: -1, phase: 'intro', phaseIdx: 0, restarting: false, weakPoint: null, onComplete: onComplete || null };
    // Верная улика для окончательного среза известна с самого начала:
    // раньше она проставлялась в отдельной сцене слабого места, которой
    // теперь нет — слабая точка едет в общей очереди.
    (battle.phases || []).forEach(function (p) { if (p.weak) window.swState.weakPoint = p.weak.weakPoint; });
    document.documentElement.classList.add('nsd-active', 'sw-active');
    nsdEnterMusic(battle.prelude || battle.music);

    swBanner(battle, function (bannerEl) {
      // плашка остаётся под холстом трещины: стекло осыпается прямо по ней
      ctCrackScreen(function () {
        if (bannerEl && bannerEl.parentNode) bannerEl.remove();
        var brk = document.getElementById('nsd-break'); if (brk) brk.remove(); nsdClearBlacked();
        if (nsdBreakState) { cancelAnimationFrame(nsdBreakState.raf); nsdBreakState = null; }
        var dm = document.getElementById('nsd-dim'); if (dm) dm.remove();
        swBuildSplit(battle);
        swRunSequence(battle.prologue || [], 0, function () {
          // Арену собираем ПОД расколотым экраном и только потом гасим его:
          // иначе между ними на кадр проступал обычный экран суда.
          swBuildArena(battle);
          // «Состояние» общее со всеми мини-играми: ряд звёзд справа сверху.
          // Заводим его здесь, а не на входе в сцену: вступительная трещина
          // снимает HUD с кадра вместе с часами.
          hpReset();
          swIntroAnim(battle, function () { swRunPhase(battle); });
          nsdWait(function () { swSplitShow(false); }, 120);
        });
      });
    });
  };


  // ============================================================
  // ВЫБОР ПРЕДПОЛОЖЕНИЯ
  // Справа столбик пронумерованных вариантов, над ним «Ответ» курсивом,
  // под ним часы. Пятнадцать секунд на решение: не успел или ошибся —
  // половина звезды и сцена идёт заново с репликой-подсказкой.
  // ============================================================
  var CT_GUESS_MS = 15000;

  function ctGuessRoot() { return document.getElementById('ct-guess'); }

  function ctGuessClose() {
    ctClockStop();
    var el = ctGuessRoot();
    if (el) el.remove();
    document.removeEventListener('keydown', ctGuessOnKey, true);
    document.documentElement.classList.remove('ct-guess-on');
  }

  function ctGuessOnKey(e) {
    var el = ctGuessRoot();
    if (!el || el.dataset.busy === '1') return;
    var opts = el.querySelectorAll('.ctg-opt');
    if (!opts.length) return;
    var n = parseInt(e.key, 10);
    if (n >= 1 && n <= opts.length) { e.preventDefault(); opts[n - 1].click(); }
  }

  // conf: { options: [строки], correct: индекс, timeMs, wrong: [реплики] }
  function ctRunGuess(conf, onDone) {
    var host = document.getElementById('ct-root') || document.body;
    ctGuessClose();
    ctCancelAuto();
    document.documentElement.classList.add('ct-guess-on');

    var rows = '';
    (conf.options || []).forEach(function (t, i) {
      rows += '<div class="ctg-opt" data-i="' + i + '" role="button" tabindex="0" style="--i:' + i + '">' +
                '<i class="ctg-num">' + (i + 1) + '</i>' +
                '<span class="ctg-text"></span>' +
              '</div>';
    });

    var el = document.createElement('div');
    el.id = 'ct-guess';
    el.innerHTML =
      '<div class="ctg-dim"></div>' +
      '<div class="ctg-panel">' +
        '<div class="ctg-cap">Ответ</div>' +
        '<div class="ctg-list">' + rows + '</div>' +
        '<div class="ctg-clock" id="ctg-clock"></div>' +
      '</div>';
    host.appendChild(el);

    // Текст вариантов ставим через textContent: он приходит из данных сцены.
    Array.prototype.forEach.call(el.querySelectorAll('.ctg-opt'), function (o, i) {
      o.querySelector('.ctg-text').textContent = conf.options[i];
    });

    void el.offsetWidth;
    el.classList.add('is-in');
    nsdPlaySfx(SFX_DETERMINED, 0.5);

    // «Состояние» тут такое же, как во всех мини-играх
    hpReset();
    ctClockStart(conf.timeMs || CT_GUESS_MS, function () { finish(-1); },
                 { host: el.querySelector('#ctg-clock'), variant: 'is-guess' });

    var done = false;
    function finish(picked) {
      if (done) return;
      done = true;
      el.dataset.busy = '1';
      var ok = picked === conf.correct;
      var chosen = picked >= 0 ? el.querySelectorAll('.ctg-opt')[picked] : null;
      if (chosen) chosen.classList.add(ok ? 'is-right' : 'is-wrong');
      nsdPlaySfx(ok ? NSD_SFX_BULLET_HIT : SFX_LOUD_TEXT2, 0.85);
      if (!ok) {
        // Промах и утекшее время стоят одинаково — половины звезды
        if (hpLose()) hpReset();
        var root = document.getElementById('ct-root');
        if (root) { root.classList.remove('ct-quake'); void root.offsetWidth; root.classList.add('ct-quake'); }
      }
      ctClockStop();
      nsdWait(function () {
        var r = document.getElementById('ct-root');
        if (r) r.classList.remove('ct-quake');
        el.classList.add('is-out');
        nsdWait(function () { ctGuessClose(); onDone(ok); }, 320);
      }, ok ? 620 : 900);
    }

    el.addEventListener('click', function (e) {
      var o = e.target && e.target.closest ? e.target.closest('.ctg-opt') : null;
      if (!o || el.dataset.busy === '1') return;
      e.stopPropagation();
      finish(parseInt(o.getAttribute('data-i'), 10));
    }, true);
    document.addEventListener('keydown', ctGuessOnKey, true);
  }

  // ============================================================
  // СЦЕНА «ТРИ ОКНА»: экран делится на 2, потом на 3 части,
  // у каждого героя своё диалоговое окно со своей линией.
  // ============================================================
  var CT_TRIOS = {
    "trio1": {
      panels: [
        { key: 'kai',    name: 'Кай',    lean: 3.2,  color: 'pink' },
        { key: 'polina', name: 'Полина', lean: -2.6, color: 'cyan' },
        { key: 'null',   name: 'Нулл',   lean: 1.8,  color: 'violet' }
      ],
      steps: [
        { show: 1, who: 'kai',    text: 'Если что, меня можете сразу вычеркивать!' },
        { show: 2, who: 'polina', text: 'А я все время была с Ютой!', sfx: SFX_LOUD_TEXT, music: 'nsd-space' },
        { show: 3, who: 'null',   text: 'Я была одна, но я никак не связана с этим.' },
        { show: 3, who: 'kai',    text: 'Если вы не верите мне, спросите мою маму! Я точно не плохой мальчик!' },
        { show: 3, who: 'polina', text: 'У меня есть алиби!!', sfx: SFX_DETERMINED, quake: true },
        { show: 3, who: 'null',   text: 'Я не убийца.' },
        { show: 3, who: 'polina', text: 'Я тоже не убийца!!!' },
        { show: 3, who: 'kai',    text: 'Я никого не убивал!' }
      ]
    },
    // Финальный разбор: три окна ведут пересказ по очереди, и через каждое
    // по ходу сцены говорят разные герои — имя окна меняется вместе с шагом.
    "trio2": {
      panels: [
        { key: 'top', name: 'Нулл',  lean: 3.2,  color: 'violet' },
        { key: 'mid', name: 'Треск', lean: -2.6, color: 'cyan' },
        { key: 'bot', name: 'Бог',   lean: 1.8,  color: 'pink' }
      ],
      steps: [
        { show: 1, who: 'top', name: 'Нулл', text: 'Все началось с мотива, данный нам Ксебетом.' },
        { show: 1, who: 'top', name: 'Нулл', text: 'По его словам, в здании существует путь побега – через вентиляцию, которая ведет на крышу.' },
        { show: 1, who: 'top', name: 'Нулл', text: 'Но этот путь был для нас закрыт.' },
        { show: 1, who: 'top', name: 'Нулл', text: 'По его условиям, лишь тот, кто убьет кого-то и переживет классный суд, получит ключ от дверцы, которая ведет наружу.' },
        { show: 1, who: 'top', name: 'Нулл', text: 'И, похоже, кто-то поверил его словам.' },

        { show: 2, who: 'mid', name: 'Треск', text: 'План убийцы начался днем, когда он повесил табличку с надписью «Дезинфекция» на ворота столовой.' },
        { show: 2, who: 'mid', name: 'Треск', text: 'Это бы предотвратило учеников входить в первую локацию до осуществления его плана – чтобы они не смогли легко вернуть освещение.' },
        { show: 2, who: 'mid', name: 'Треск', text: 'Это было ключевым козырем убийцы, так как без света его бы никто не смог разглядеть.' },

        { show: 3, who: 'bot', name: 'Бог', text: 'В два часа ночи на второй этаж приходит Треск и заходит на кухню.' },
        { show: 3, who: 'bot', name: 'Бог', text: 'До этого убийца оставил ему записку от лица Нулл, якобы говоря, что «они нашли выход».' },
        { show: 3, who: 'bot', name: 'Бог', text: 'Убийца баррикадирует дверь с помощью шкафа, поэтому с двух часов ночи до десяти утра его нигде не было.' },
        { show: 3, who: 'bot', name: 'Бог', text: 'А нашли и открыли двери только во время расследования.' },
        { show: 3, who: 'bot', name: 'Бог', text: 'Это было сделано для того, чтобы мы в будущем смогли обвинить Треска, потому что он был ближе всех к месту убийства.' },
        { show: 3, who: 'bot', name: 'Бог', text: 'Это был запасной план, если мы вдруг поймем, что это не был несчастный случай.' },

        { show: 3, who: 'top', name: 'Кай', text: 'В 2:30 убийца специально пролил воду из ведра, которое стояло в коридоре, перед приходом Фусту.' },
        { show: 3, who: 'top', name: 'Кай', text: 'Для осуществления своего плана он берет свою электрогитару и очки ночного видения.' },
        { show: 3, who: 'top', name: 'Кай', text: 'Очки нужны были ему, чтобы ориентироваться в темноте.' },
        { show: 3, who: 'top', name: 'Кай', text: 'Убийца снимает с электрогитары струны.' },
        { show: 3, who: 'top', name: 'Кай', text: 'Он использует их как провода, так как они отлично проводят ток.' },
        { show: 3, who: 'top', name: 'Кай', text: 'Именно струны были использованы из-за того, что убийце было необходимо потом их где-то спрятать.' },
        { show: 3, who: 'top', name: 'Кай', text: 'А из-за таланта убийцы, струны не вызвали бы ни у кого подозрения, если бы их нашли.' },

        { show: 3, who: 'mid', name: 'Шин', text: 'Далее убийца одевает резиновые перчатки, чтобы его самого не ударило током.' },
        { show: 3, who: 'mid', name: 'Шин', text: 'Он зачистил концы струны и подключает одну струну к фазе в розетке комнаты видеонаблюдения, а вторую — к металлической ручке двери, которую Фусту должен был открыть.' },
        { show: 3, who: 'mid', name: 'Шин', text: 'Когда Фусту открывает дверь, он хватается за металлическую ручку.' },
        { show: 3, who: 'mid', name: 'Шин', text: 'Через струну, натянутую внутри дверного проёма, проходит ток 220В. Фусту получает удар током через руку, проходящий через сердце.' },
        { show: 3, who: 'mid', name: 'Шин', text: 'Он падает внутрь комнаты и в этот момент выключается свет. Убийца быстро оттягивает тело внутрь.' },

        { show: 3, who: 'bot', name: 'Полина', text: 'Мы не знаем, почему именно Фусту решил включить в тот момент диктофон, но это стало ключевой уликой в этом деле.' },
        { show: 3, who: 'bot', name: 'Полина', text: 'Я и Юта провели практически всю ночь в библиотеке, и видели, как Фусту поднимается на второй этаж.' },
        { show: 3, who: 'bot', name: 'Полина', text: 'Это был последний раз, когда мы видели его живым.' },

        { show: 3, who: 'top', name: 'Стерва', text: 'Убийца аккуратно снимает гитарную струну, но она бьет его по запястью и оставляет тонкий кровавый след.' },
        { show: 3, who: 'top', name: 'Стерва', text: 'Две капли крови падают на пол, но он их не замечает, а резиновые перчатки он выбрасывает в урну.' },
        { show: 3, who: 'top', name: 'Стерва', text: 'В последствии на основе этой улики мы поймем, что была использована именно гитарная струна.' },

        { show: 3, who: 'mid', name: 'Юта', text: 'Убийца включил компьютер и удалил все сохраненные записи с видеокамер, а сами камеры он отключил.' },
        { show: 3, who: 'mid', name: 'Юта', text: 'Это было сделано для того, чтобы мы не знали, что происходило ночью.' },
        { show: 3, who: 'mid', name: 'Юта', text: 'Чертежи, что были у Фусту, он скорее всего выкинул или забрал себе.' },
        { show: 3, who: 'mid', name: 'Юта', text: 'Убийца прячет тело Фусту в самодельный мешок, склеенный несколькими мусорными пакетами между собой скотчем.' },
        { show: 3, who: 'mid', name: 'Юта', text: 'Он берет тело Фусту на руки, поднимается по лестнице и бросает в вентиляцию которая ведет в ТВ-комнату.' },
        { show: 3, who: 'mid', name: 'Юта', text: 'Убийца скидывает ногой лестницу и она падает.' },

        { show: 3, who: 'bot', name: 'Треск', text: 'Тело приземляется на диван, так как до этого он был подвинут прямо под вентиляцию.' },
        { show: 3, who: 'bot', name: 'Треск', text: 'Это снизило урон от падения и не создало шум, который могли бы услышать Полина или Юта.' },
        { show: 3, who: 'bot', name: 'Треск', text: 'Но на затылке Фусту все равно остался синяк.' },

        { show: 3, who: 'top', name: 'Нулл', text: 'Следующим этапом убийца сам спрыгивает через вентиляцию. Он срывает мусорные пакеты с тела Фусту и выбрасывает их в урну.' },
        { show: 3, who: 'top', name: 'Нулл', text: 'Тело он размещает рядом с телевизором, у которого открыта крышка, а в руки кладет отвертку.' },
        { show: 3, who: 'top', name: 'Нулл', text: 'Таким образом создавая сцену несчастного случая.' },

        { show: 3, who: 'mid', name: 'Бог', text: 'Но план убийцы был саботирован.' },
        { show: 3, who: 'mid', name: 'Бог', text: 'Нулл, которая находилась в баре в тот момент, включила обратно свет.' },
        { show: 3, who: 'mid', name: 'Бог', text: 'Убийца запаниковал и выбросил очки ночного видения в первое попавшееся место – под диван ТВ-комнаты.' },
        { show: 3, who: 'mid', name: 'Бог', text: 'Заключительным этапом он быстро покинул ТВ-комнату вместе со струнами и вернулся в место, где обычно спит.' },

        { show: 3, who: 'bot', name: 'Треск', text: 'И тот, кто сделал такой продуманный план, был никто иной как **Оса, Абсолютный Музыкант!**', sfx: SFX_DETERMINED, quake: true }
      ]
    }
  };

  // Три клина, на которые «Y»-разделение режет кадр. Одни и те же
  // координаты используют и сцена «три окна», и массовая паника, поэтому
  // разметка живёт в одном месте.
  var CT3_ZONES = [
    'polygon(0% 0%, 36% 0%, 46% 58%, 24% 100%, 0% 100%)',
    'polygon(36% 0%, 100% 0%, 100% 44%, 46% 58%)',
    'polygon(46% 58%, 100% 44%, 100% 100%, 24% 100%)'
  ];
  function ct3Zones() {
    var out = '';
    for (var i = 0; i < CT3_ZONES.length; i++) {
      out += '<div class="ct3-zone" data-zone="' + i + '" style="--clip:' + CT3_ZONES[i] + '"></div>';
    }
    // Разделительные линии рисуем SVG в тех же процентах, что и клинья.
    // Повёрнутыми полосками это сделать нельзя: угол луча зависит от
    // соотношения сторон кадра, и на любом другом экране линии разъезжались
    // бы с границами клиньев.
    out += '<svg class="ct3-edges" viewBox="0 0 100 100" preserveAspectRatio="none">' +
             '<path d="M36 0 L46 58 L100 44 M46 58 L24 100" ' +
             'fill="none" stroke="#05030a" stroke-width="10" ' +
             'vector-effect="non-scaling-stroke" stroke-linejoin="round" stroke-linecap="round"/>' +
           '</svg>';
    return out;
  }

  function ctTrioBuild(trio) {
    var host = document.getElementById('ct-root') || document.body;
    var old = document.getElementById('ct-trio'); if (old) old.remove();
    var el = document.createElement('div');
    el.id = 'ct-trio';
    var html = '<div class="ct3-split">' + ct3Zones() + '</div>';
    trio.panels.forEach(function (p, i) {
      html += '<div class="ctt-panel" data-key="' + p.key + '" data-zone="' + i + '">' +
                '<div class="ctt-bar"><span class="ctt-text"></span></div>' +
                '<div class="ctt-card"><span class="ctt-name"></span></div>' +
              '</div>';
    });
    el.innerHTML = html;
    host.appendChild(el);
    trio.panels.forEach(function (p) {
      var n = el.querySelector('.ctt-panel[data-key="' + p.key + '"] .ctt-name');
      if (n) n.textContent = p.name;
    });
    void el.offsetWidth;
    return el;
  }

  function ctTrioRun(trioId, done) {
    var trio = CT_TRIOS[trioId];
    if (!trio) { done(); return; }
    var el = ctTrioBuild(trio);
    document.documentElement.classList.add('ct-trio-on');
    var i = 0;

    function step() {
      if (i >= trio.steps.length) {
        el.classList.add('is-out');
        nsdWait(function () {
          if (el.parentNode) el.remove();
          document.documentElement.classList.remove('ct-trio-on');
          done();
        }, 420);
        return;
      }
      var st = trio.steps[i++];
      el.setAttribute('data-show', st.show);
      // В кадре всегда только одно окно — то, через которое говорят сейчас.
      // Остальные прячутся и возвращаются, когда очередь дойдёт до них.
      var panels = el.querySelectorAll('.ctt-panel');
      Array.prototype.forEach.call(panels, function (p) {
        var live = p.getAttribute('data-key') === st.who;
        p.classList.toggle('is-live', live);
        p.classList.toggle('is-speaking', live);
      });
      var zones = el.querySelectorAll('.ct3-zone');
      Array.prototype.forEach.call(zones, function (z, k) { z.classList.toggle('is-live', k < st.show); });
      var edges = el.querySelector('.ct3-edges');
      if (edges) edges.classList.toggle('is-live', st.show >= 2);
      var box = el.querySelector('.ctt-panel[data-key="' + st.who + '"] .ctt-text');
      if (!box) { step(); return; }
      // Через одно и то же окно по ходу сцены могут говорить разные герои —
      // тогда шаг несёт своё имя и подменяет карточку.
      if (st.name) {
        var nm = el.querySelector('.ctt-panel[data-key="' + st.who + '"] .ctt-name');
        if (nm && nm.textContent !== st.name) nm.textContent = st.name;
      }
      if (st.music) nsdCrossfade((TRACKS[st.music] || {}).url || null);
      if (st.sfx) nsdPlaySfx(st.sfx, 0.8);
      if (st.quake) {
        var cr = document.getElementById('ct-root');
        if (cr) { cr.classList.remove('ct-quake'); void cr.offsetWidth; cr.classList.add('ct-quake');
                  setTimeout(function () { cr.classList.remove('ct-quake'); }, 520); }
      }
      // Печать по кадрам, как в обычном окне, и теми же кусками: **золото**
      // и ##дрожь## в финальном разборе нужны ровно так же, как в суде.
      box.textContent = '';
      var segs = ctBuildDialogueSegments(box, st.text);
      var total = ctSegsLength(segs), shown = 0, started = 0, typed = false, raf = 0;
      function frame(now) {
        if (!started) started = now;
        var want = Math.min(total, Math.floor((now - started) / CT_CHAR_MS) + 1);
        if (want > shown) { ctFillSegments(segs, want); shown = want; }
        if (shown < total) raf = requestAnimationFrame(frame); else typed = true;
      }
      raf = requestAnimationFrame(frame);
      var guard = setTimeout(function () { ctFillSegments(segs, total); typed = true; }, total * CT_CHAR_MS + 400);

      function onClick(e) {
        e.stopPropagation();
        if (!typed) { cancelAnimationFrame(raf); ctFillSegments(segs, total); typed = true; return; }
        clearTimeout(guard);
        cancelAnimationFrame(raf);
        document.removeEventListener('click', onClick, true);
        sfxAdvance.play();
        step();
      }
      setTimeout(function () { document.addEventListener('click', onClick, true); }, 140);
    }
    step();
  }

  // ============================================================
  // ДЕБАТЫ-СХВАТКА
  // Зал раскалывается на два лагеря: слева обвинение, справа защита.
  // Каждый раунд обвинение выкидывает довод, а игрок выбирает справа то
  // слово, которым этот довод перебивают. Промах и утекшее время бьют по
  // «Состоянию»; когда оно пустеет — схватка начинается с начала.
  // ============================================================
  var SCR_SFX_HIT   = NSD_SFX_BULLET_HIT;
  var SCR_SFX_MISS  = SFX_LOUD_TEXT2;
  var SCR_SFX_ARROW = SW_SFX_BLADE;

  var SCR_CLAIM_MS    = 26;    // скорость печати довода
  var SCR_HOLD_MS     = 4000;  // сколько довод висит, прежде чем слово берёт следующий
  var SCR_HIT_MS      = 900;   // разбор верного ответа
  var SCR_MISS_MS     = 620;
  var SCR_WIN_HOLD_MS = 700;
  var SCR_FAIL_MS     = 1600;

  var SCRUM_SCENES = {
    "scrum1": {
      music: 'nsd-scrum',
      // Тема, которая остаётся играть после схватки. Второй раз её заводить
      // из реплик нельзя: выход из сцены уже поднял её, и второй запуск шёл
      // поверх первого.
      outro: 'new-classmates',
      question: 'Виновен ли Треск?',
      accuse: { title: 'Треск — убийца!',    team: ['Оса', 'Юта', 'Бог', 'Стерва', 'Шин'] },
      defend: { title: 'Треск — не убийца!', team: ['Нулл', 'Треск', 'Полина', 'Кай'] },
      // Минута на раздумья: во время разбора ответа часы стоят, поэтому
      // счёт идёт только на решения игрока.
      timeMs: 60000,
      health: 5,
      rounds: [
        { who: 'Оса',    claim: 'Треск находился совсем рядом с местом убийства!',
          key: 'Рядом',         hi: 'рядом',        by: 'Нулл',   answer: 'Треска обхитрили с помощью записки, он не должен был там быть.', answerHi: 'записки' },
        { who: 'Юта',    claim: 'Он весь воняет хлоркой!',
          key: 'Хлорка',        hi: 'хлоркой',      by: 'Треск',  answer: 'Я убирался на кухне и хлорка попала на одежду.', answerHi: 'убирался' },
        { who: 'Бог',    claim: 'Треск взял нож из кухни, чтобы открыть вентиляцию.',
          key: 'Нож',           hi: 'нож',          by: 'Полина', answer: 'Нож мог быть взят любым человеком, когда Треска не было на кухне.', answerHi: 'любым человеком' },
        { who: 'Стерва', claim: 'Треск увидел Фусту с чертежами и захотел убить его и получить ключ первым!',
          key: 'Ключ',          hi: 'ключ',         by: 'Кай',    answer: 'Треск мылся и не услышал объявление Ксебета, он не знал про мотив.', answerHi: 'не услышал' },
        { who: 'Шин',    claim: 'Он вернулся на второй этаж после того, как скинул тело Фусту.',
          key: '2 этаж',        hi: 'второй этаж',  by: 'Полина', answer: 'Его бы, скорее всего, увидели я и Юта в библиотеке.', answerHi: 'в библиотеке' },
        { who: 'Оса',    claim: 'Треск специально вернулся в офис через вентиляцию, чтобы создать ложное алиби!',
          key: 'Алиби',         hi: 'ложное алиби', by: 'Нулл',   answer: 'Решетка стояла за диваном, но под ним нет никаких следов передвижения.', answerHi: 'нет никаких следов' }
      ]
    }
  };

  window.scrumState = window.scrumState || { active: false };

  function scrRoot() { return document.getElementById('scrum-root'); }

  function scrEsc(t) {
    return String(t == null ? '' : t)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }

  // ---------- РАКЕТА ----------
  // Референс: тупой хвост со стороны своего края кадра, длинный корпус в
  // разводах и косой штриховке, остриё смотрит ВНУТРЬ кадра.
  // Слои снизу вверх: кант (обводка) -> корпус (блик, штриховка, грязь,
  // потёки) -> текст. Обводка рисуется подложкой, а не бордюром:
  // бордюр нельзя обрезать по clip-path.
  function scrArrowHtml(cls, text, extra) {
    return '<div class="scr-arrow ' + cls + '"' + (extra || '') + '>' +
             '<span class="scr-arrow-edge"></span>' +
             '<span class="scr-arrow-body">' +
               '<span class="scr-arrow-hatch"></span>' +
               '<span class="scr-arrow-grunge"></span>' +
               '<span class="scr-arrow-scuff"></span>' +
               '<span class="scr-arrow-sheen"></span>' +
             '</span>' +
             '<span class="scr-arrow-text">' + scrEsc(text) + '</span>' +
           '</div>';
  }

  // ------------------------------------------------------------
  // ЗАСТАВКА СХВАТКИ — 32 СЕКУНДЫ ПОД ВСТУПЛЕНИЕ ТЕМЫ
  // Тема «Debate Scrum» начинается с длинного вступления, и сами дебаты
  // в ней вступают на 32-й секунде. Заставка расписана по этому вступлению:
  // вопрос -> перекличка лагерей -> стрелы сходятся в упор -> взрыв ->
  // и дальше слово берёт заставка нон-стоп дебатов: «ДЕБАТЫ-СХВАТКА» и
  // «СТАРТ!» идут её же анимацией и её же таймингом. Ровно к 32-й секунде
  // открывается арена.
  // Все метки — миллисекунды от начала трека, так что двигать любую сцену
  // можно по одной строке.
  var SCR_T = {
    Q_IN:        400,   // буквы вопроса влетают
    Q_OUT:      5200,   // и разлетаются
    ROSTER_L:   5900,   // лагерь обвинения и его имена
    ROSTER_R:  10600,   // лагерь защиты и её имена
    ROSTER_OUT:14800,
    BANNER_L:  15300,   // красная стрела влетает слева
    BANNER_R:  17300,   // голубая — справа
    CHARGE:    19100,   // упор: стрелы давят друг на друга
    BOOM:      28100,   // столкновение
    ARENA:     32000    // ровно туда, где в теме вступают сами дебаты
  };
  // Заставка нон-стоп дебатов длится NSD_START_AT_MS + NSD_START_HOLD_MS,
  // и её конец должен лечь ровно на арену — отсюда и считаем, когда её пускать.
  SCR_T.TITLE = SCR_T.ARENA - (NSD_START_AT_MS + NSD_START_HOLD_MS);
  var SCR_NAME_STEP = 460;   // шаг между именами в перекличке
  var SCR_CHARGE_MS = SCR_T.BOOM - SCR_T.CHARGE;

  function scrOpening(scene, next, prewarm) {
    var host = document.getElementById('ct-root') || document.body;
    var old = document.getElementById('scr-open'); if (old) old.remove();

    var el = document.createElement('div');
    el.id = 'scr-open';
    el.innerHTML =
      '<div class="scro-dim"></div>' +
      '<div class="nsd-intro-bars scro-rays"></div>' +
      '<div class="scro-stage">' +
        '<div class="scro-q"></div>' +
        '<div class="scro-roster scro-roster-l">' +
          '<div class="scro-cap"></div><div class="scro-names"></div>' +
        '</div>' +
        '<div class="scro-roster scro-roster-r">' +
          '<div class="scro-cap"></div><div class="scro-names"></div>' +
        '</div>' +
        '<div class="scro-banner scro-banner-l">' + scrArrowHtml('scr-arrow-l is-banner', '') + '</div>' +
        '<div class="scro-banner scro-banner-r">' + scrArrowHtml('scr-arrow-r is-banner', '') + '</div>' +
      '</div>' +
      '<div class="scro-flash"></div>';
    host.appendChild(el);

    // Текст расставляем через textContent: имена и заголовки приходят
    // из данных сцены, и их нельзя вклеивать в разметку строкой.
    el.querySelector('.scro-banner-l .scr-arrow-text').textContent = scene.accuse.title;
    el.querySelector('.scro-banner-r .scr-arrow-text').textContent = scene.defend.title;
    el.querySelector('.scro-roster-l .scro-cap').textContent = scene.accuse.title;
    el.querySelector('.scro-roster-r .scro-cap').textContent = scene.defend.title;

    var qEl = el.querySelector('.scro-q');
    String(scene.question).split('').forEach(function (ch, i) {
      var sp = document.createElement('span');
      sp.style.setProperty('--i', i);
      // Пробел между словами схлопывается: буквы стоят каждая своим
      // inline-block. Помечаем его классом — ширину задаёт стиль.
      if (ch === ' ') { sp.className = 'is-space'; sp.textContent = ' '; }
      else sp.textContent = ch;
      qEl.appendChild(sp);
    });

    function fillNames(sel, list) {
      var box = el.querySelector(sel);
      list.forEach(function (nm, i) {
        var n = document.createElement('div');
        n.className = 'scro-name';
        n.style.setProperty('--i', i);
        n.textContent = nm;
        box.appendChild(n);
      });
      return box;
    }
    fillNames('.scro-roster-l .scro-names', scene.accuse.team);
    fillNames('.scro-roster-r .scro-names', scene.defend.team);

    // Длину упора задаём переменной: анимации толчка и тряски тянутся
    // ровно до столкновения, сколько бы ни стояло в SCR_T.
    el.style.setProperty('--charge', SCR_CHARGE_MS + 'ms');
    void el.offsetWidth;

    var armed = false;
    function arm() {
      if (armed) return;
      armed = true;
      el.classList.add('is-on');
      if (scene.music) nsdEnterMusic(scene.music);
    }
    requestAnimationFrame(arm);
    setTimeout(arm, 60);

    // ------------------------------------------------------------
    // ЧАСЫ ЗАСТАВКИ — ПОЗИЦИЯ ТРЕКА, НО ХОДА НАЗАД У НИХ НЕТ.
    //
    // Тема лежит на чужом сервере, и пока браузер тянет файл и поднимает
    // громкость, она успевает опоздать на секунды. Раньше это время часы
    // шли по настенным, а когда трек наконец начинался — откатывались к
    // его нулю. Все шаги до этой отметки уже отыграли, и заставка просто
    // стояла, пока музыка их догоняла: «СТАРТ!» приходил на столько же
    // позже, на сколько опоздал звук. Ровно та задержка, что было видно.
    //
    // Теперь часы сначала ждут трек на месте (не дольше SCR_AUDIO_WAIT),
    // а если он всё-таки опоздал — его позиция принимается со сдвигом, и
    // часы идут дальше с той же отметки: ни прыжка назад, ни простоя.
    // ------------------------------------------------------------
    var SCR_AUDIO_WAIT = 1500;   // сколько ждём трек, прежде чем идти без него
    var trackUrl = (TRACKS[scene.music] || {}).url || null;
    var steps = [], pumpRaf = 0, pumping = true;
    var bootT0 = Date.now(), wallT0 = 0, lastT = 0, audioBias = null;
    function at(ms, fn) { steps.push({ at: ms, fn: fn, done: false }); }
    function sceneClock() {
      var a = window.bgAudio, pos = -1;
      if (trackUrl && a && !a.paused && window.currentTrack === trackUrl &&
          a.currentTime > 0.01 && a.currentTime * 1000 < SCR_T.ARENA + 6000) {
        pos = a.currentTime * 1000;
      }
      if (pos >= 0) {
        if (audioBias === null) audioBias = Math.max(0, lastT - pos);
        var t = pos + audioBias;
        if (t > lastT) lastT = t;
        wallT0 = Date.now() - lastT;      // запасной ход держим наготове
        return lastT;
      }
      if (!wallT0) {
        if (Date.now() - bootT0 < SCR_AUDIO_WAIT) return lastT;   // ждём трек
        wallT0 = Date.now() - lastT;
      }
      var w = Date.now() - wallT0;
      if (w > lastT) lastT = w;
      return lastT;
    }
    function pump() {
      if (!pumping) return;
      var t = sceneClock();
      for (var i = 0; i < steps.length; i++) {
        if (!steps[i].done && t >= steps[i].at) { steps[i].done = true; steps[i].fn(); }
      }
      pumpRaf = requestAnimationFrame(pump);
    }
    window.scrOpeningStop = function () { pumping = false; cancelAnimationFrame(pumpRaf); };
    pumpRaf = requestAnimationFrame(pump);

    // Линии проигрываются один раз, поэтому за полминуты подсыпаем их
    // волнами: ближе к столкновению волны чаще и гуще.
    var rays = el.querySelector('.scro-rays');
    (function () {
      var t = 0;
      while (t < SCR_T.BOOM) {
        (function (t0) {
          var q = t0 / SCR_T.BOOM;
          var count = 6 + Math.round(q * q * 16);
          at(t0, function () { if (rays) rays.innerHTML = ctFlyLines(count, 'nsd-ray', 1.0, 0.8, 0.5); });
        })(t);
        t += Math.round(1700 - 900 * (t / SCR_T.BOOM));
      }
    })();

    // --- вопрос ---
    at(SCR_T.Q_IN, function () {
      el.classList.add('is-q');
      nsdPlaySfx(SFX_DETERMINED, 0.55);
    });
    at(SCR_T.Q_OUT, function () { el.classList.add('is-q-out'); });

    // --- перекличка лагерей ---
    function roster(side, at0, team) {
      at(at0, function () { el.classList.add('is-roster-' + side); });
      team.forEach(function (nm, i) {
        at(at0 + 500 + i * SCR_NAME_STEP, function () {
          var n = el.querySelectorAll('.scro-roster-' + side + ' .scro-name')[i];
          if (n) n.classList.add('is-in');
          nsdPlaySfx(NSD_SFX_PICK, 0.35);
        });
      });
    }
    roster('l', SCR_T.ROSTER_L, scene.accuse.team);
    roster('r', SCR_T.ROSTER_R, scene.defend.team);
    at(SCR_T.ROSTER_OUT, function () { el.classList.add('is-roster-out'); });

    // --- стрелы ---
    var ctRoot = document.getElementById('ct-root');
    function quake(cls, ms) {
      if (!ctRoot) return;
      ctRoot.classList.remove(cls);
      void ctRoot.offsetWidth;
      ctRoot.classList.add(cls);
      nsdWait(function () { ctRoot.classList.remove(cls); }, ms);
    }
    at(SCR_T.BANNER_L, function () {
      el.classList.add('is-banner-l');
      nsdPlaySfx(SCR_SFX_ARROW, 0.85);
      quake('ct-quake', 520);
    });
    at(SCR_T.BANNER_R, function () {
      el.classList.add('is-banner-r');
      nsdPlaySfx(SCR_SFX_ARROW, 0.85);
      quake('ct-quake', 520);
    });

    // --- упор: стрелы давят друг на друга, кадр трясёт всё сильнее ---
    at(SCR_T.CHARGE, function () { el.classList.add('is-charge'); });
    var sparks = 9;
    for (var sp = 0; sp < sparks; sp++) {
      (function (k) {
        // искры учащаются к концу упора
        var q = (k + 1) / sparks;
        at(SCR_T.CHARGE + Math.round(SCR_CHARGE_MS * q * q), function () {
          var r = (scrRoot() || document.getElementById('ct-root'));
          if (!r) return;
          var b = r.getBoundingClientRect();
          nsdImpactBurst(b.width / 2 + (Math.random() * 60 - 30), b.height / 2 + (Math.random() * 60 - 30));
        });
      })(sp);
    }

    // --- столкновение ---
    at(SCR_T.BOOM, function () {
      el.classList.add('is-boom');
      nsdPlaySfx(NSD_SFX_BREAK, 0.9);
      quake('ct-quake', 620);
      var r = document.getElementById('ct-root');
      if (r) {
        var b = r.getBoundingClientRect();
        nsdImpactBurst(b.width / 2, b.height / 2);
      }
    });

    // Арену верстаем заранее — под заставкой, пока кадр ещё занят тёмным.
    at(SCR_T.BOOM + 300, function () { if (prewarm) prewarm(); });

    // Линии свою анимацию к этому времени отыграли, но узлы остаются в
    // кадре и лишний раз участвуют в отрисовке вспышки. Убираем их.
    at(SCR_T.TITLE - 200, function () { if (rays) rays.innerHTML = ''; });

    // --- «ДЕБАТЫ-СХВАТКА» и «СТАРТ!»: заставка нон-стоп дебатов ---
    // Дальше сцену ведёт она: своя анимация, свой тайминг, свой звук.
    // От заставки схватки остаётся только затемнение — стрелы, вопрос и
    // лучи с отрисовки снимаются, чтобы не тащить их через удар «СТАРТ!».
    at(SCR_T.TITLE, function () {
      pumping = false;
      cancelAnimationFrame(pumpRaf);
      el.classList.add('is-title');
      nsdPlayIntroAnim(function () {
        if (el.parentNode) el.remove();
        next();
      }, { title: 'ДЕБАТЫ-СХВАТКА' });
    });
  }

  // ------------------------------------------------------------
  // 4. АРЕНА
  // ------------------------------------------------------------
  function scrBuildArena(scene) {
    var host = document.getElementById('ct-root') || document.body;
    var old = scrRoot(); if (old) old.remove();

    var pips = '';
    for (var i = 0; i < scene.rounds.length; i++) pips += '<i class="scr-pip" style="--i:' + i + '"></i>';

    var left = '';
    scene.rounds.forEach(function (r, i) {
      left += scrArrowHtml('scr-arrow-l scr-claim-chip', '???',
        ' data-i="' + i + '" style="--i:' + i + '"');
    });

    // Слова-ответы лежат вперемешку: порядок раундов по ним не читается.
    var keys = nsdShuffle(scene.rounds.map(function (r) { return r.key; }));
    var right = '';
    keys.forEach(function (k, i) {
      right += scrArrowHtml('scr-arrow-r scr-option', k,
        ' data-key="' + scrEsc(k) + '" role="button" tabindex="0" style="--i:' + i + '"');
    });

    var r = document.createElement('div');
    r.id = 'scrum-root';
    r.innerHTML =
      '<div class="scr-bg"></div>' +
      '<div class="scr-seam"></div>' +
      '<div class="scr-hud">' +
        '<div class="scr-pipbar">' +
          '<div class="scr-pips" id="scr-pips">' + pips + '</div>' +
          '<i class="scr-pipbar-tail"></i>' +
        '</div>' +
      '</div>' +
      '<div class="scr-side-tag scr-side-l"><span></span></div>' +
      '<div class="scr-side-tag scr-side-r"><span></span></div>' +
      '<div class="scr-column scr-column-l" id="scr-left">' + left + '</div>' +
      '<div class="scr-say" id="scr-say">' +
        '<div class="scr-say-who" id="scr-say-who"></div>' +
        // Линии лежат в одной обёртке с текстом, а не в окне целиком: окно
        // держит постоянную высоту, и линии в нём приходились ровно на
        // строки. В обёртке они меряются от самих букв и отчёркивают
        // реплику сверху и снизу, сколько бы строк в ней ни было.
        //
        // Линий ровно две — одна над репликой, одна под ней, обе в цвет
        // говорящего и с одинаковым наклоном. У обвинения они идут снизу
        // вверх направо, у защиты — зеркально.
        '<div class="scr-say-body">' +
          '<div class="scr-say-lines">' +
            '<i class="scr-ln scr-ln-t"></i>' +
            '<i class="scr-ln scr-ln-b"></i>' +
          '</div>' +
          '<div class="scr-say-text" id="scr-say-text"></div>' +
        '</div>' +
      '</div>' +
      '<div class="scr-column scr-column-r" id="scr-right">' + right + '</div>' +
      '<div class="scr-flash" id="scr-flash"></div>';
    host.appendChild(r);
    r.querySelector('.scr-side-l span').textContent = scene.accuse.title;
    r.querySelector('.scr-side-r span').textContent = scene.defend.title;
    void r.offsetWidth;
    r.classList.add('is-in');
    return r;
  }

  // ---------- таймер ----------
  // Часы у схватки общие с остальными мини-играми: цифры по центру сверху.
  function scrPause(on) { ctClockPause(on); }

  // Время вышло — это такая же ошибка, как промах: половина звезды и часы
  // заводятся заново. Схватка идёт с начала, только когда состояние пустеет.
  function scrOutOfTime() {
    var st = window.scrumState;
    if (!st || !st.active || st.failing || st.winning) return;
    if (hpLose()) { scrFail('СОСТОЯНИЕ НА НУЛЕ!'); return; }
    ctClockStart(st.scene.timeMs, scrOutOfTime);
    ctClockPause(st.locked);
  }

  // ---------- раунд ----------
  // ОКНО РЕПЛИКИ ПО РЕФЕРЕНСУ
  // Реплика идёт во весь кадр огромными белыми буквами с чёрной обводкой,
  // а ключевое слово в ней горит оранжевым — по нему и видно, каким словом
  // довод перебивается. Довод обвинения въезжает слева направо, ответ
  // защиты — справа налево.
  //
  // Где в реплике ключевое слово, ищем сначала по точному вхождению hi,
  // потом по основе самого длинного слова ключа: «2 этаж» так находит
  // «этаж» в «вернулся на второй этаж».
  var SCR_WORD_CH = /[^\s.,!?;:«»"'()\-—]/;
  function scrHiRange(text, hi) {
    if (!hi) return null;
    var lo = text.toLowerCase(), h = String(hi).toLowerCase().trim();
    if (!h) return null;
    var at = lo.indexOf(h);
    if (at !== -1) return [at, at + h.length];
    var words = h.split(/\s+/).filter(Boolean).sort(function (a, b) { return b.length - a.length; });
    for (var i = 0; i < words.length; i++) {
      var w = words[i];
      if (w.length < 3) continue;
      var stem = w.slice(0, Math.max(3, w.length - 2));
      var p = lo.indexOf(stem);
      if (p === -1) continue;
      var e = p + stem.length;
      while (e < text.length && SCR_WORD_CH.test(text[e])) e++;
      while (p > 0 && SCR_WORD_CH.test(text[p - 1])) p--;
      return [p, e];
    }
    return null;
  }

  // Буквы расставляем в разметку сразу, а печать только открывает их одну
  // за другой. Так строки не переливаются на каждом символе: переносы
  // считаются один раз, и огромный текст не дёргается при наборе.
  function scrLayoutSay(textEl, text, hi) {
    textEl.textContent = '';
    var range = scrHiRange(text, hi);
    var ink = document.createElement('span');
    ink.className = 'scr-say-ink';
    var chars = [], word = null;
    for (var i = 0; i < text.length; i++) {
      var ch = text[i];
      if (ch === ' ') {
        word = null;
        ink.appendChild(document.createTextNode(' '));
        continue;
      }
      if (!word) {
        word = document.createElement('span');
        word.className = 'scr-w';
        ink.appendChild(word);
      }
      var c = document.createElement('i');
      c.className = 'scr-c' + (range && i >= range[0] && i < range[1] ? ' is-hi' : '');
      c.textContent = ch;
      word.appendChild(c);
      chars.push(c);
    }
    textEl.appendChild(ink);
    return chars;
  }

  function scrSay(side, who, text, hi, done) {
    var st = window.scrumState;
    var panel = document.getElementById('scr-say');
    var whoEl = document.getElementById('scr-say-who');
    var textEl = document.getElementById('scr-say-text');
    if (!panel || !textEl) { if (done) done(); return; }

    panel.className = 'scr-say is-' + side;
    void panel.offsetWidth;
    panel.classList.add('is-in');
    if (whoEl) whoEl.textContent = who || '';

    var chars = scrLayoutSay(textEl, text, hi);
    var shown = 0, started = 0, finished = false;
    function reveal(n) { while (shown < n) { chars[shown].classList.add('is-on'); shown++; } }
    function finish() {
      if (finished) return;
      finished = true;
      reveal(chars.length);
      panel.classList.add('is-typed');
      if (done) done();
    }
    function frame(now) {
      if (!st.active) return;
      if (!started) started = now;
      reveal(Math.min(chars.length, Math.floor((now - started) / SCR_CLAIM_MS) + 1));
      if (shown < chars.length) st.claimRaf = requestAnimationFrame(frame);
      else finish();
    }
    st.claimRaf = requestAnimationFrame(frame);
    // страховка на случай, когда кадры не идут (свёрнутая вкладка)
    nsdWait(function () {
      if (!st.active) return;
      cancelAnimationFrame(st.claimRaf);
      finish();
    }, chars.length * SCR_CLAIM_MS + 500);
  }

  function scrRunRound(i) {
    var st = window.scrumState;
    if (!st || !st.active || !st.scene) return;
    var scene = st.scene;
    if (i >= scene.rounds.length || !scene.rounds[i]) { scrWin(); return; }
    st.round = i;
    var r = scene.rounds[i];
    scrStopHold();

    var root = scrRoot(); if (!root) return;
    Array.prototype.forEach.call(root.querySelectorAll('.scr-pip'), function (p, k) {
      p.classList.toggle('is-done', !!st.done[k]);
      p.classList.toggle('is-live', k === i);
    });
    Array.prototype.forEach.call(root.querySelectorAll('.scr-claim-chip'), function (c, k) {
      c.classList.toggle('is-live', k === i && !st.done[k]);
    });

    // пока довод печатается — выбирать нельзя, и часы стоят
    st.locked = true;
    st.resolved = false;
    scrPause(true);
    // hi не передаём: у обвинения ключевое слово не подсвечивается вовсе,
    // довод идёт целиком белым.
    scrSay('left', r.who, r.claim, null, function () {
      if (!st.active || st.round !== i || st.resolved) return;
      st.locked = false;
      scrPause(false);
      // Довод не висит вечно: не сбили за SCR_HOLD_MS — слово берёт
      // следующий обвинитель, а этот вернётся на новом круге.
      scrArmHold();
    });
  }

  function scrStopHold() {
    var st = window.scrumState;
    if (st && st.hold) { clearTimeout(st.hold); st.hold = 0; }
  }

  function scrArmHold() {
    var st = window.scrumState;
    if (!st || !st.active) return;
    scrStopHold();
    st.hold = nsdWait(function () {
      st.hold = 0;
      if (!st.active || st.resolved || st.failing || st.winning) return;
      scrNextRound();
    }, SCR_HOLD_MS);
  }

  // Следующий неразбитый довод по кругу. Разобрали все — схватка выиграна.
  function scrNextRound() {
    var st = window.scrumState;
    // Сцену могли снести из-под отложенного вызова — например, перезапуском
    // суда. Без этой проверки таймер падал на пустом состоянии.
    if (!st || !st.active || !st.scene) return;
    var total = st.scene.rounds.length;
    for (var k = 1; k <= total; k++) {
      var idx = (st.round + k) % total;
      if (!st.done[idx]) { scrRunRound(idx); return; }
    }
    scrWin();
  }

  function scrOptionClick(chip) {
    var st = window.scrumState;
    if (!st || !st.active || st.locked) return;
    if (chip.classList.contains('is-used')) return;
    var r = st.scene.rounds[st.round];
    if (!r) return;
    if (chip.getAttribute('data-key') === r.key) scrHit(chip, r);
    else scrMiss(chip);
  }

  function scrHit(chip, r) {
    var st = window.scrumState;
    st.locked = true;
    st.resolved = true;
    st.done[st.round] = true;
    scrStopHold();
    scrPause(true);
    cancelAnimationFrame(st.claimRaf);
    chip.classList.add('is-used', 'is-fired');
    nsdPlaySfx(SCR_SFX_HIT, 0.85);

    // Ракета обвинения перестаёт быть «???»: на ней проступает то самое слово,
    // которым её сбили.
    var root = scrRoot();
    var target = root && root.querySelector('.scr-claim-chip[data-i="' + st.round + '"]');
    if (target) {
      var txt = target.querySelector('.scr-arrow-text');
      if (txt) txt.textContent = r.key;
      target.classList.remove('is-live');
      target.classList.add('is-broken');
    }
    // Точка гаснет сразу на попадании, а не на следующем раунде: иначе
    // счётчик доводов отстаёт от кадра ровно на один шаг.
    if (root) Array.prototype.forEach.call(root.querySelectorAll('.scr-pip'), function (p, k) {
      p.classList.toggle('is-done', !!st.done[k]);
    });

    var panel = document.getElementById('scr-say');
    if (panel) panel.classList.add('is-broken');

    var flash = document.getElementById('scr-flash');
    if (flash) { flash.classList.remove('is-hit'); void flash.offsetWidth; flash.classList.add('is-hit'); }

    // Сначала довод перечёркивается, и только потом окно переезжает вправо
    // с ответом — так видно, что именно чем перебили.
    nsdWait(function () {
      if (!st.active) return;
      scrSay('right', r.by, r.answer, r.answerHi || null, function () {
        // Длинный ответ читается дольше короткого
        var hold = Math.min(2600, 900 + String(r.answer).length * 22);
        nsdWait(function () {
          if (!st.active) return;
          scrNextRound();
        }, hold);
      });
    }, SCR_HIT_MS);
  }

  function scrMiss(chip) {
    var st = window.scrumState;
    st.locked = true;
    // на разборе промаха часы стоят, и отсчёт до следующего обвинителя тоже
    scrStopHold();
    scrPause(true);
    nsdPlaySfx(SCR_SFX_MISS, 0.75);
    chip.classList.remove('is-wrong'); void chip.offsetWidth; chip.classList.add('is-wrong');
    var root = scrRoot();
    if (root) { root.classList.remove('is-hurt'); void root.offsetWidth; root.classList.add('is-hurt'); }
    var flash = document.getElementById('scr-flash');
    if (flash) { flash.classList.remove('is-miss'); void flash.offsetWidth; flash.classList.add('is-miss'); }

    // Ошибка снимает половину звезды из общего «Состояния».
    var drained = hpLose();

    nsdWait(function () {
      if (!st.active) return;
      if (root) root.classList.remove('is-hurt');
      if (drained) { scrFail('СОСТОЯНИЕ НА НУЛЕ!'); return; }
      if (!st.resolved) { st.locked = false; scrPause(false); scrArmHold(); }
    }, SCR_MISS_MS);
  }

  // ---------- провал: схватка идёт заново ----------
  function scrFail(reason) {
    var st = window.scrumState;
    if (!st.active || st.failing) return;
    st.failing = true;
    st.locked = true;
    scrStopHold();
    ctClockStop();
    cancelAnimationFrame(st.claimRaf);
    nsdPlaySfx(SFX_DETERMINED, 0.8);

    var host = scrRoot() || document.getElementById('ct-root');
    var arena = scrRoot();
    if (arena) arena.classList.add('is-failing');
    var el = document.createElement('div');
    el.className = 'scr-fail';
    el.innerHTML = '<div class="scr-fail-word"></div><div class="scr-fail-sub">Схватка начинается заново</div>';
    el.querySelector('.scr-fail-word').textContent = reason;
    if (host) host.appendChild(el);
    void el.offsetWidth;
    el.classList.add('is-in');

    var scene = st.scene, onComplete = st.onComplete;
    nsdWait(function () {
      if (el.parentNode) el.remove();
      scrStartArena(scene, onComplete);
    }, SCR_FAIL_MS);
  }

  // ---------- победа ----------
  // Финальной плашки защиты здесь больше нет: разбили последний довод —
  // короткая пауза, и сразу трескается экран с «ПРОРЫВ!».
  function scrWin() {
    var st = window.scrumState;
    if (!st.active || st.winning) return;
    st.winning = true;
    st.locked = true;
    scrStopHold();
    ctClockStop();

    var root = scrRoot();
    if (root) {
      Array.prototype.forEach.call(root.querySelectorAll('.scr-pip'), function (p) {
        p.classList.remove('is-live'); p.classList.add('is-done');
      });
      root.classList.add('is-won');
    }
    var panel = document.getElementById('scr-say');
    if (panel) panel.className = 'scr-say';

    nsdWait(function () { scrFinalBreak(); }, SCR_WIN_HOLD_MS);
  }

  function scrFinalBreak() {
    var st = window.scrumState;
    var root = document.getElementById('ct-root');
    if (root && !document.getElementById('nsd-dim')) {
      var dim = document.createElement('div');
      dim.id = 'nsd-dim';
      root.appendChild(dim);
      void dim.offsetWidth;
      dim.classList.add('is-on');
    }
    nsdWait(function () {
      var arena = scrRoot();
      if (arena) arena.classList.add('is-gone');
      nsdPlaySfx(NSD_SFX_BREAK, 0.9);
      nsdRunBreak();
      nsdWait(function () {
        var d = document.getElementById('nsd-dim');
        if (d) d.classList.add('is-full');
        nsdWait(function () {
          nsdShowBreakWord();
          nsdWait(function () {
            var bw = document.querySelector('.nsd-break-word');
            if (bw) bw.classList.add('is-fading');
            nsdWait(function () {
              var outro = st.scene && st.scene.outro && TRACKS[st.scene.outro];
              if (outro && window.nsdState) window.nsdState.prevTrack = outro.url;
              scrFinish();
            }, NSD_WORD_FADE_MS);
          }, SW_BREAK_HOLD_MS);
        }, SW_DARK_MS);
      }, NSD_GLASS_MS);
    }, NSD_REFUTE_MS);
  }

  function scrFinish() {
    var st = window.scrumState;
    if (!st.active) return;
    st.active = false;
    var cb = st.onComplete;
    st.onComplete = null;
    ctClockStop();
    hpRemove();
    cancelAnimationFrame(st.claimRaf);
    scrStopHold();
    if (window.scrOpeningStop) window.scrOpeningStop();
    nsdClearTimers();
    scrBindInput(false);
    nsdFadeBack(function (cleanup, reveal) {
      document.documentElement.classList.remove('nsd-active', 'scr-active', 'nsd-intro-on');
      ['scrum-root', 'scr-open', 'nsd-intro', 'nsd-break', 'nsd-dim'].forEach(function (id) {
        var n = document.getElementById(id); if (n) n.remove();
      });
      if (nsdBreakState) { cancelAnimationFrame(nsdBreakState.raf); nsdBreakState = null; }
      nsdClearBlacked();
      var tx = document.getElementById('ct-dialogue-text'); if (tx) tx.textContent = '';
      var nf = document.getElementById('ct-name-first'); if (nf) nf.textContent = '';
      var bx = document.querySelector('.ct-dialogue-box'); if (bx) bx.style.display = '';
      var nc = document.getElementById('ct-namecard'); if (nc) nc.style.display = '';
      nsdExitMusic();
      reveal(function () {
        window.ctEventRunning = false;
        if (cb) cb();
      });
    });
  }

  // ---------- ввод ----------
  function scrOnClick(e) {
    var chip = e.target && e.target.closest ? e.target.closest('.scr-option') : null;
    if (!chip) return;
    e.stopPropagation();
    e.preventDefault();
    scrOptionClick(chip);
  }
  function scrOnKey(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var chip = document.activeElement && document.activeElement.closest ? document.activeElement.closest('.scr-option') : null;
    if (!chip) return;
    e.preventDefault();
    scrOptionClick(chip);
  }
  function scrBindInput(on) {
    document.removeEventListener('click', scrOnClick, true);
    document.removeEventListener('keydown', scrOnKey, true);
    if (on) {
      document.addEventListener('click', scrOnClick, true);
      document.addEventListener('keydown', scrOnKey, true);
    }
  }

  // ---------- запуск арены (он же перезапуск после провала) ----------
  // Собрать арену молча, не запуская раунды: используется как прогрев
  // под заставкой, чтобы тяжёлый кадр вёрстки не пришёлся на «СТАРТ!».
  function scrPrewarmArena(scene) {
    if (scrRoot()) return;
    var r = scrBuildArena(scene);
    if (r) r.classList.add('is-warm');
  }

  function scrStartArena(scene, onComplete) {
    var warm = scrRoot();
    // прогретую арену не пересобираем — иначе весь смысл прогрева теряется
    if (warm && warm.classList.contains('is-warm')) warm.classList.remove('is-warm');
    else { if (warm) warm.remove(); warm = null; }
    window.scrumState = {
      active: true, scene: scene, onComplete: onComplete || null,
      round: 0,
      // разбитые доводы: круг идёт по оставшимся, пока не кончатся все
      done: scene.rounds.map(function () { return false; }),
      locked: true, resolved: false, failing: false, winning: false,
      claimRaf: 0, hold: 0
    };
    if (!warm) scrBuildArena(scene);
    scrBindInput(true);
    // «Состояние» наливается заново на каждый заход, часы — тоже
    hpReset();
    ctClockStart(scene.timeMs, scrOutOfTime);
    ctClockPause(true);
    nsdWait(function () { scrRunRound(0); }, 420);
  }

  window.startDebateScrum = function (sceneId, onComplete) {
    var scene = SCRUM_SCENES[sceneId];
    if (!scene) { if (onComplete) onComplete(); return; }
    nsdClearTimers();
    ctCancelAuto();
    // Первый new Audio(url) тянет файл по сети. Если он приходится на удар
    // «СТАРТ!», кадр встаёт вместе с запросом, поэтому греем все звуки
    // заставки заранее, а не только те, что нужны на арене.
    [SCR_SFX_HIT, SCR_SFX_MISS, SCR_SFX_ARROW,
     NSD_INTRO_SFX, SFX_DETERMINED, NSD_SFX_BREAK, NSD_SFX_PICK].forEach(function (u) {
      try { if (!nsdSfxCache[u]) { var a = nsdSfxCache[u] = new Audio(u); a.preload = 'auto'; a.load(); } } catch (e) {}
    });
    document.documentElement.classList.add('nsd-active', 'scr-active');
    window.ctEventRunning = true;
    scrOpening(scene, function () { scrStartArena(scene, onComplete); },
                     function () { scrPrewarmArena(scene); });
  };

  // ============================================================
  // НАБЛЮДАТЕЛЬ
  // ============================================================
  var updateScheduled = false;
  function runUpdates() {
    checkAndPlay();
    ensureMuteButton();
    ensureGameMenu();
    ensureCtAutoButton();
    layoutTrialGrid();
    applyLetterShake();
    applyGlitchDecode();
    syncFromState();
    reconcileSpots();
    checkDialogueClosed();
    attachDialogueCloseInterceptor();
    attachExitCheckInterceptor();
  }
  function scheduleUpdate() { if (updateScheduled) return; updateScheduled = true; requestAnimationFrame(function () { updateScheduled = false; runUpdates(); }); }

  // Печатная машинка и анимации суда мутируют DOM десятки раз в секунду.
  // Полный runUpdates на каждую такую мутацию съедал кадры, поэтому свои
  // же изменения внутри суда пропускаем — там перерисовывать нечего.
  var SELF_MUTATED = ['ct-dialogue-text', 'ct-namecard', 'nsd-root', 'nsd-cylinder', 'nsd-intro', 'nsd-break', 'nsd-aim', 'ct-marquee-track',
                      'sw-root', 'sw-split', 'sw-banner', 'sw-intro', 'sw-blades', 'ct-rebuttal-banner',
                      // Схватку в этот список забыли внести, когда её добавляли,
                      // и каждая её мутация гнала полный runUpdates: заставка
                      // подсыпает лучи волнами, печатает буквы реплики и верстает
                      // арену — на каждое такое движение шли layoutTrialGrid и
                      // reconcileSpots с чтением геометрии. Отсюда и рывки.
                      'scr-open', 'scrum-root', 'nsd-dim'];
  // Искры удара живут прямо в ct-root и своего id не имеют — их отсеиваем по классу.
  var SELF_MUTATED_CLASS = ['nsd-burst'];
  function isSelfNode(n) {
    if (!n || n.nodeType !== 1) return false;
    if (n.id && SELF_MUTATED.indexOf(n.id) !== -1) return true;
    if (n.classList) {
      for (var i = 0; i < SELF_MUTATED_CLASS.length; i++) {
        if (n.classList.contains(SELF_MUTATED_CLASS[i])) return true;
      }
    }
    return false;
  }
  function isSelfMutation(rec) {
    for (var n = rec.target; n && n.nodeType === 1; n = n.parentNode) {
      if (isSelfNode(n)) return true;
    }
    // Слои сцены приходят в ct-root целиком, и тогда мутация числится за
    // самим ct-root — по цепочке родителей её не отсеять. Поэтому смотрим и
    // на то, ЧТО именно пришло или ушло: если это только наши слои, суду
    // перерисовываться незачем.
    var add = rec.addedNodes, rem = rec.removedNodes;
    var total = add.length + rem.length;
    if (!total) return false;
    var mine = 0, k;
    for (k = 0; k < add.length; k++) if (isSelfNode(add[k])) mine++;
    for (k = 0; k < rem.length; k++) if (isSelfNode(rem[k])) mine++;
    return mine === total;
  }
  function attachObserver() {
    var s = document.querySelector('tw-story');
    if (!s) { setTimeout(attachObserver, 300); return; }
    new MutationObserver(function (recs) {
      for (var i = 0; i < recs.length; i++) {
        if (isSelfMutation(recs[i])) continue;
        applyTypewriter();
        scheduleUpdate();
        return;
      }
    }).observe(s, { childList: true, subtree: true });
    applyTypewriter(); runUpdates();
  }
  // Harlowe держит содержимое нового пассажа в tw-transition-container и
  // разворачивает его только через 0.8 с. Смена родителя перезапускает CSS-
  // анимации всего поддерева — из-за этого титул проигрывался дважды.
  // Вынимаем его из контейнера сами, на первом же кадре: анимация успевает
  // сброситься до того, как её видно, и дальше идёт ровно один раз.
  (function kvTitleGuard() {
    var tries = 0;
    (function look() {
      var kv = document.querySelector('#kv-title');
      if (kv) {
        var box = kv.parentNode;
        if (box && box.tagName === 'TW-TRANSITION-CONTAINER' && box.parentNode) {
          box.parentNode.appendChild(kv);
        }
        return;
      }
      if (++tries < 120) requestAnimationFrame(look);
    })();
  })();

  attachObserver();

})();
