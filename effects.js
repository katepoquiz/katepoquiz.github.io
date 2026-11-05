/* =====================================================
   Visual effects: bokeh backgrounds, typewriter titles,
   and line-by-line text reveals.
   ===================================================== */
(function () {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const scroller = document.getElementById('scroller');

  /* ---------- Bokeh discs behind each section ---------- */
  // Small seeded random so the layout is the same on every visit.
  function rng(seed) {
    return () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
  }
  document.querySelectorAll('.page > section.snap').forEach((sec, s) => {
    const layer = document.createElement('div');
    layer.className = 'bokeh';
    layer.setAttribute('aria-hidden', 'true');
    const rand = rng(97 + s * 31);
    const count = 11;
    for (let i = 0; i < count; i++) {
      const d = document.createElement('span');
      const size = Math.round(24 + rand() * 30); // 24-54px
      d.style.width = d.style.height = `${size}px`;
      // spread across the section, mostly toward the edges so text stays clear
      const edge = rand() < 0.5 ? rand() * 22 : 78 + rand() * 20;
      d.style.left = `${i % 2 ? edge : rand() * 96}%`;
      d.style.top = `${4 + rand() * 90}%`;
      d.style.animationDelay = `${(rand() * 10 - 5).toFixed(2)}s`; // -5s..+5s
      layer.appendChild(d);
    }
    sec.prepend(layer);
  });

  /* ---------- Typewriter titles ---------- */
  document.querySelectorAll('.tw[data-phrases]').forEach(el => {
    let phrases;
    try { phrases = JSON.parse(el.dataset.phrases); } catch { return; }
    const text = el.querySelector('.tw-text');
    if (!text || !phrases.length) return;
    text.textContent = phrases[0];
    if (reduced) return; // final state, no animation

    let idx = 0;
    let n = phrases[0].length;
    let mode = 'hold'; // type | hold | delete | pause
    let timer = null;
    let visible = false;

    const schedule = ms => { clearTimeout(timer); if (visible) timer = setTimeout(tick, ms); };
    function tick() {
      const phrase = phrases[idx];
      if (mode === 'type') {
        n++;
        text.textContent = phrase.slice(0, n);
        el.classList.add('typing');
        if (n >= phrase.length) { mode = 'hold'; el.classList.remove('typing'); schedule(1500); }
        else schedule(70 + Math.random() * 70); // 70-140ms, human-ish
      } else if (mode === 'hold') {
        mode = 'delete';
        el.classList.add('typing');
        schedule(30);
      } else if (mode === 'delete') {
        n--;
        text.textContent = phrase.slice(0, Math.max(0, n));
        if (n <= 0) { mode = 'pause'; el.classList.remove('typing'); schedule(400); }
        else schedule(30);
      } else {
        idx = (idx + 1) % phrases.length;
        n = 0;
        mode = 'type';
        schedule(80);
      }
    }
    // Only run while the title is on screen.
    new IntersectionObserver(entries => {
      visible = entries[0].isIntersecting;
      if (visible) schedule(mode === 'hold' ? 1500 : 120);
      else clearTimeout(timer);
    }, { root: scroller, threshold: 0 }).observe(el);
  });

  /* ---------- Line-by-line reveal ---------- */
  // Each block keeps its plain text; lines are rebuilt from it on resize.
  function splitIntoLines(block) {
    if (!block._original) block._original = block.textContent.replace(/\s+/g, ' ').trim();
    const words = block._original.split(' ');
    block.textContent = '';
    const spans = words.map((w, i) => {
      const s = document.createElement('span');
      s.className = 'rl-word';
      s.textContent = w + (i < words.length - 1 ? ' ' : '');
      block.appendChild(s);
      return s;
    });
    // group words by their vertical position into lines
    const lines = [];
    let top = null;
    spans.forEach(s => {
      const t = s.offsetTop;
      if (top === null || Math.abs(t - top) > 4) { lines.push([]); top = t; }
      lines[lines.length - 1].push(s.textContent);
    });
    block.textContent = '';
    return lines.map(parts => {
      const line = document.createElement('span');
      line.className = 'rl-line';
      line.textContent = parts.join('');
      block.appendChild(line);
      return line;
    });
  }

  function prepareGroup(group) {
    // A group is a paragraph, or a list whose items are split individually.
    const blocks = group.tagName === 'UL' ? [...group.children] : [group];
    let i = 0;
    blocks.forEach(b => {
      splitIntoLines(b).forEach(line => {
        line.style.setProperty('--i', Math.min(i, 12)); // cap the wait on long lists
        i++;
      });
    });
  }

  const groups = [...document.querySelectorAll('.reveal-lines')];
  if (!reduced) {
    groups.forEach(g => { g.classList.add('rl-ready'); prepareGroup(g); });

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('rl-in');
        io.unobserve(e.target);
      });
    }, { root: scroller, threshold: 0.4 });
    groups.forEach(g => io.observe(g));

    // Re-measure lines when the width changes (after reveal, lines just appear).
    let lastWidth = window.innerWidth;
    let t;
    window.addEventListener('resize', () => {
      if (window.innerWidth === lastWidth) return;
      lastWidth = window.innerWidth;
      clearTimeout(t);
      t = setTimeout(() => groups.forEach(g => {
        if (g.classList.contains('rl-in')) g.classList.add('rl-done');
        prepareGroup(g);
      }), 150);
    });
    // Fonts can change line breaks once they load.
    document.fonts?.ready.then(() => groups.forEach(g => { if (!g.classList.contains('rl-in')) prepareGroup(g); }));
  }
})();
