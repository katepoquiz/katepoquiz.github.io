/* =====================================================
   PORTFOLIO CONTENT - edit this part to change your work
   -----------------------------------------------------
   Every item is a file in your public Google Drive folder.
   "id" is the long code in the file's share link:
   https://drive.google.com/file/d/<THIS PART>/view
   Files must stay shared as "Anyone with the link".
   ===================================================== */
const DRIVE_URL = 'https://drive.google.com/drive/folders/12uuKvX4SyLDwhbmhSJSYIyYtUJL_qJUs?usp=sharing';

// Graphics, grouped by industry
const GRAPHICS = [
  {
    industry: 'Virtual Assistant Agency',
    items: [
      { id: '1HLEkd7qYcdLjLY615vwEiimGgYPGKsZz', title: 'Eisenhower Matrix: Your Decision-Making Tool', alt: 'Blue graphic explaining the Eisenhower Matrix with do now, schedule, delegate, and delete steps' },
      { id: '11VcS0r9iDWzUbZSVB9ONXwDOZqA-oRmB', title: "What's the Difference Between a VA, OBM, and PM?", alt: 'Graphic comparing a virtual assistant, online business manager, and project manager' },
      { id: '1lcCEJRTpE0PB7n6wu_iosFUpRJF1xo-k', title: 'Streamline Your Inbox & Calendar', alt: 'Graphic with a calendar on a tablet promoting inbox and calendar support' },
      { id: '1vMqNQSORJPPP0j-SP5r17yaHlut-rpaS', title: 'We Are Hiring', alt: 'Hiring announcement graphic for virtual assistants with a megaphone illustration' },
      { id: '1mAQ61D-StcG23hW2Mv_CB9Hxj6h481DR', title: 'From Scattered to Systemized', alt: 'Case study graphic showing how a client\'s operations were systemized in 30 days' },
    ],
  },
  {
    industry: 'Architectural & Engineering Services',
    items: [
      { id: '1Ow_4VsKVIiqF0SMjKKfMVoNca9jGF7NK', title: 'Commercial Services Offered', alt: 'Landscape architect services post featuring a beachfront resort' },
      { id: '1ormWa9vUUEkou_JhJP68nuzKwsVNYo7o', title: 'Did You Know?', alt: 'Educational post about placing trees to lower energy bills, with palm trees beside a house' },
      { id: '1fSJMhjXawTtu_MabR6SYhnIw9WDd4Ofl', title: 'Concept to Completion', alt: 'Before-and-after post showing a pool and fire bowl from concept rendering to finished build' },
      { id: '1upgMDRZfvChIUEBa0w3pXqteAqCtc5ql', title: 'Ignite Your Outdoor Experience', alt: 'Evening photo of a lit mansion courtyard with a fire pit' },
      { id: '1Gorj9UZWYxd0KK2hUx1Yu63N2mcLCI9G', title: 'Services', alt: 'Services post listing residential, commercial, and landscape architectural design with project photos' },
    ],
  },
  {
    industry: 'Insurance',
    items: [
      { id: '1S8JMNOGrjWpOLc-WfP5CQwVRnDCEkBjn', title: 'Why Choose Protective Choice Insurance?', alt: 'Yellow and black insurance ad with an agent and a checklist of client results' },
      { id: '1VmOqt6aT0OweX_JSAPqLjMCiYOBe_m-P', title: 'Myth vs. Fact: Home Insurance', alt: 'Myth versus fact graphic about common home insurance misconceptions' },
      { id: '1wMAGvqde05Uxroz0VBz_3C6pX5YtzWYZ', title: '5 Factors That Impact Your Car Insurance Premium', alt: 'Numbered list graphic of five factors that affect car insurance premiums' },
      { id: '13DHfcN0XuWoHUYLluGbKFmNi84v1KPXF', title: 'How Coverage Has Changed', alt: 'Throwback Thursday graphic comparing insurance coverage then and now' },
      { id: '1chrsg_kNAfPIN_sFzJ3UVYB91mEyPlB5', title: "Monday Myths: I Don't Need Life Insurance", alt: 'Monday Myths graphic explaining why single people still need life insurance' },
    ],
  },
];

// Carousels, in file-name order. Row 1 and row 2 of the marquee.
const CAROUSEL_ROWS = [
  [
    { name: 'Blog', title: 'The Value of Time Management', ids: ['1Z7kPuRMhFtKJP9J3op4E1uI91CbbwjUY', '1COgc5nqpIpdsAgJaDQXh1rM5E5j3_qmH', '11ykM9RHFN9ZUOZ5wlSbUBhiz5dGU-0ei', '1V8dJ2lw-pk-v86z7_R_qEMyDsGjVgXDO'] },
    { name: 'Why Choose PCI', title: 'Why Choose PCI', ids: ['1lHqjXZwnjEYGl5wq-GOdWKZkmiC-hQLf', '1eb5KWOTkreSCt9LYKGwa_B7HXrDNh6Ya', '19a4NQXBwpECf6t0rE4tNG_TIXR8_DIGV', '15Zcjvx2JFsUFPq7sHo40hH71xSvICdaf'] },
  ],
  [
    { name: 'Strategy', title: 'Automate These 3 Tasks', ids: ['1ibYwYEH0omxDQsrXE3J7fxdtnSHQ7Sg8', '15spwWPGMZyvRy9cDrRsB4Cjxtp_o4Sk0', '1kmjztvnH9k_45A2mILUuxRI2onMXXQcC', '1nd1kUWeJONvqIdn9oz1lv4vHCxfvcDvl'] },
    { name: 'Teach', title: 'Top 5 Tools Every Business Owner Should Know', ids: ['1yHqcs281Bs_3i-pCveRz_oiOtYd8UKAJ', '1S2ftLMKrhaLuN0AFfFLIdfw4g6gIrjmr', '1wflNobEDaXoEYlEADvbtrCp0TrUb46NL', '1p8BbB8UN1SZCKb-X_J6Achwk8GlwfpgG', '1Ngml1EMkC-eda9HaG2gjGGjfjjJAf_TL', '1MloWMHt43uErjC-XFRnJHbs31BDcxkHz'] },
  ],
];

const REELS = [
  { id: '1Zcg49SUrLnpcLDuQ-P4z895BjCdvdpgS', title: 'Project Reel 1', subtitle: 'Architecture & engineering · CapCut' },
  { id: '1GPmG9xdv-QSP34XWvpCVh9Irz5iJizRi', title: 'Project Reel 2', subtitle: 'Architecture & engineering · CapCut' },
  { id: '1y6cKheN1ODTcz2c_XXeDYgfUCZX6gvWD', title: 'Project Reel 3', subtitle: 'Architecture & engineering · CapCut' },
  { id: '1G6vdiKF9QxxLA5sb2ItTTYWoo3wMWE6A', title: 'Project Reel 4', subtitle: 'Architecture & engineering · CapCut' },
  { id: '1uFq6AV4QkMbVInki7oZY7MS8m-nDkSS4', title: 'Project Reel 5', subtitle: 'Architecture & engineering · CapCut' },
  { id: '1jAxzaFsaBr_qGMLPqITgThCFqf_JsmTl', title: 'Project Reel 6', subtitle: 'Architecture & engineering · CapCut' },
];

/* ===================================================== */

const thumbUrl = (id, w = 800) => `https://drive.google.com/thumbnail?id=${id}&sz=w${w}`;
const fileUrl = id => `https://drive.google.com/file/d/${id}/view`;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Drive thumbnails sometimes fail when many load at once, so load them
// through a small queue and retry failures with a growing delay.
const imageQueue = [];
let activeLoads = 0;
function queueDriveImage(img, id, w, onFail) {
  imageQueue.push({ img, id, w, onFail, tries: 0 });
  pumpQueue();
}
function pumpQueue() {
  while (activeLoads < 4 && imageQueue.length) {
    const job = imageQueue.shift();
    activeLoads++;
    const done = ok => {
      activeLoads--;
      if (!ok) {
        job.tries++;
        if (job.tries <= 6) setTimeout(() => { imageQueue.push(job); pumpQueue(); }, 800 * job.tries);
        else job.onFail?.();
      }
      pumpQueue();
    };
    job.img.onload = () => done(true);
    job.img.onerror = () => done(false);
    job.img.src = thumbUrl(job.id, job.w) + (job.tries ? `&t=${job.tries}` : '');
  }
}

/* ---------- Drive link ---------- */
const driveLink = document.getElementById('driveLink');
if (driveLink) driveLink.href = DRIVE_URL;

/* ---------- Grow-in lightbox (FLIP) ---------- */
const lightbox = (() => {
  const root = document.getElementById('lightbox');
  if (!root) return null;
  const fig = document.getElementById('lbFigure');
  const img = document.getElementById('lbImg');
  const title = document.getElementById('lbTitle');
  const open = document.getElementById('lbOpen');
  const closeBtn = document.getElementById('lbClose');
  const SPRING = 'linear(0, 0.094 5.6%, 0.274 11.1%, 0.455 16.7%, 0.608 22.2%, 0.726 27.8%, 0.812 33.3%, 0.873 38.9%, 0.944 50%, 0.976 61.1%, 1 100%)';
  let thumb = null;
  let closing = false;

  function finalBox() {
    const size = Math.min(window.innerWidth * 0.88, window.innerHeight * 0.72, 860);
    return { w: size, left: (window.innerWidth - size) / 2, top: Math.max(16, (window.innerHeight - size) / 2 - 36) };
  }
  function transformTo(rect, box) {
    const s = rect.width / box.w;
    return `translate(${rect.left - box.left}px, ${rect.top - box.top}px) scale(${s})`;
  }

  function show(thumbBtn, item) {
    if (thumb) return;
    thumb = thumbBtn;
    const thumbImg = thumbBtn.querySelector('img');
    const box = finalBox();
    Object.assign(fig.style, { width: `${box.w}px`, height: `${box.w}px`, left: `${box.left}px`, top: `${box.top}px` });
    document.getElementById('lbCaption').style.top = `${box.top + box.w + 14}px`;

    img.src = thumbImg?.currentSrc || thumbImg?.src || '';
    img.alt = item.alt || item.title;
    title.textContent = item.title;
    open.href = fileUrl(item.id);
    // swap in a sharper version once it loads
    const hi = new Image();
    hi.onload = () => { if (thumb === thumbBtn) img.src = hi.src; };
    hi.src = thumbUrl(item.id, 1400);

    const rect = thumbBtn.getBoundingClientRect();
    fig.style.transition = 'none';
    fig.style.transform = transformTo(rect, box);
    root.inert = false;
    root.classList.add('open');
    thumbBtn.classList.add('lb-hidden');
    void fig.offsetWidth; // force reflow so the start position sticks
    fig.style.transition = reduceMotion.matches ? 'none' : `transform 600ms ${SPRING}`;
    fig.style.transform = 'none';
    closeBtn.focus({ preventScroll: true });
  }

  function hide() {
    if (!thumb || closing) return;
    closing = true;
    const t = thumb;
    const finish = () => {
      root.classList.remove('closing');
      root.inert = true;
      t.classList.remove('lb-hidden');
      t.focus({ preventScroll: true });
      thumb = null;
      closing = false;
    };
    root.classList.add('closing');
    root.classList.remove('open');
    if (reduceMotion.matches) { fig.style.transform = 'none'; finish(); return; }
    const box = finalBox();
    fig.style.transition = `transform 600ms ${SPRING}`;
    fig.style.transform = transformTo(t.getBoundingClientRect(), box);
    let ended = false;
    const end = () => { if (ended) return; ended = true; finish(); };
    fig.addEventListener('transitionend', end, { once: true });
    setTimeout(end, 700);
  }

  root.querySelectorAll('[data-lb-close]').forEach(el => el.addEventListener('click', hide));
  root.addEventListener('keydown', e => {
    if (e.key === 'Escape') { e.preventDefault(); hide(); }
    if (e.key === 'Tab') {
      // keep focus inside: Drive link <-> close button
      const items = [open, closeBtn];
      const i = items.indexOf(document.activeElement);
      e.preventDefault();
      items[(i + (e.shiftKey ? items.length - 1 : 1)) % items.length].focus();
    }
  });
  window.addEventListener('resize', () => { if (thumb && !closing) hide(); });
  return { show };
})();

function makeThumb(item, { hidden = false, w = 600 } = {}) {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'thumb';
  if (hidden) {
    btn.tabIndex = -1;
    btn.setAttribute('aria-hidden', 'true');
  } else {
    btn.setAttribute('aria-label', `${item.title}. View full size`);
  }
  const img = document.createElement('img');
  img.alt = hidden ? '' : (item.alt || item.title);
  img.draggable = false;
  img.decoding = 'async';
  img.addEventListener('load', () => img.classList.add('is-loaded'));
  btn.appendChild(img);
  btn.addEventListener('click', () => lightbox?.show(btn, item));
  const fail = () => { btn.classList.add('thumb-failed'); btn.dispatchEvent(new Event('thumbfail')); };
  return { btn, img, load: () => queueDriveImage(img, item.id, w, fail) };
}

// Start loading portfolio images only when the section gets close.
function whenNear(el, cb) {
  if (!el) return;
  const io = new IntersectionObserver(entries => {
    if (entries.some(e => e.isIntersecting)) { io.disconnect(); cb(); }
  }, { root: document.getElementById('scroller'), rootMargin: '1200px 0px' });
  io.observe(el);
}

/* ---------- Graphics grid ---------- */
(function graphics() {
  const root = document.getElementById('graphics');
  if (!root) return;
  const loaders = [];
  GRAPHICS.forEach(group => {
    const block = document.createElement('div');
    block.className = 'g-group';
    block.innerHTML = `<h4 class="g-industry">${group.industry}</h4>`;
    const grid = document.createElement('div');
    grid.className = 'g-grid';
    group.items.forEach(item => {
      const t = makeThumb(item);
      grid.appendChild(t.btn);
      loaders.push(t.load);
    });
    block.appendChild(grid);
    root.appendChild(block);
  });
  whenNear(root, () => loaders.forEach(l => l()));
})();

/* ---------- Carousels: two-row photo marquee ---------- */
(function carousels() {
  const root = document.getElementById('carousels');
  if (!root) return;
  const loaders = [];
  CAROUSEL_ROWS.forEach((row, r) => {
    const rowEl = document.createElement('div');
    rowEl.className = `pm-row pm-row-${r + 1}`;
    const track = document.createElement('div');
    track.className = 'pm-track';
    const slides = row.flatMap(set => set.ids.map((id, i) => ({
      id,
      title: `${set.title} (slide ${i + 1} of ${set.ids.length})`,
      alt: `${set.title} carousel, slide ${i + 1} of ${set.ids.length}`,
      first: i === 0,
    })));
    const originals = [];
    [false, true].forEach(isCopy => {
      const group = document.createElement('div');
      group.className = 'pm-group';
      if (isCopy) group.setAttribute('aria-hidden', 'true');
      slides.forEach((s, i) => {
        const t = makeThumb(s, { hidden: isCopy, w: 500 });
        if (s.first) t.btn.classList.add('pm-first');
        group.appendChild(t.btn);
        if (!isCopy) {
          originals.push(t);
          loaders.push(t.load);
        } else {
          // the hidden copy shows the same image once the original has loaded
          const src = originals[i];
          src.img.addEventListener('load', () => { t.img.src = src.img.src; });
          src.btn.addEventListener('thumbfail', () => t.btn.classList.add('thumb-failed'));
        }
      });
      track.appendChild(group);
    });
    rowEl.appendChild(track);
    root.appendChild(rowEl);
  });
  whenNear(root, () => loaders.forEach(l => l()));
})();

/* ---------- Video viewer (reels) ---------- */
const viewer = document.getElementById('viewer');
const viewerFrame = document.getElementById('viewerFrame');
const viewerTitle = document.getElementById('viewerTitle');
const viewerOpen = document.getElementById('viewerOpen');
let viewerReturnFocus = null;

function openViewer(item) {
  viewerReturnFocus = document.activeElement;
  viewerTitle.textContent = item.title;
  viewerOpen.href = fileUrl(item.id);
  viewer.classList.add('is-video');
  viewerFrame.innerHTML = `<iframe src="https://drive.google.com/file/d/${item.id}/preview" title="${item.title}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  viewer.hidden = false;
  viewer.querySelector('.viewer-close').focus();
}
function closeViewer() {
  viewer.hidden = true;
  viewerFrame.innerHTML = '';
  viewerReturnFocus?.focus();
}
viewer?.querySelectorAll('[data-viewer-close]').forEach(el => el.addEventListener('click', closeViewer));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && viewer && !viewer.hidden) closeViewer();
});

/* ---------- Reels: expanding panels ---------- */
(function reels() {
  const root = document.getElementById('reels');
  if (!root || !REELS.length) return;

  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';
  const loaders = [];

  const panels = REELS.map((item, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'panel';

    const img = document.createElement('img');
    img.className = 'panel-media';
    img.alt = `Opening frame of ${item.title}`;
    img.decoding = 'async';
    btn.appendChild(img);
    loaders.push(() => queueDriveImage(img, item.id, 500, () => img.remove()));

    btn.insertAdjacentHTML('beforeend', `
      <span class="panel-scrim" aria-hidden="true"></span>
      <span class="panel-play" aria-hidden="true">${playIcon}</span>
      <span class="panel-num" aria-hidden="true">${i + 1}</span>
      <span class="panel-text"><span class="panel-title">${item.title}</span><span class="panel-subtitle">${item.subtitle} · Click to play</span></span>
    `);

    btn.addEventListener('pointerenter', () => setActive(i));
    btn.addEventListener('focus', () => setActive(i));
    btn.addEventListener('click', () => {
      // A click (or Enter/Space) on the open panel plays the reel.
      if (current === i && btn.dataset.ready === '1') openViewer(item);
      else setActive(i);
    });
    root.appendChild(btn);
    return btn;
  });

  let current = -1;
  function setActive(i) {
    if (i === current) return;
    current = i;
    panels.forEach((p, j) => {
      const on = j === i;
      p.classList.toggle('active', on);
      p.setAttribute('aria-expanded', String(on));
      p.setAttribute('aria-label', on ? `${REELS[j].title}. Play reel` : `Show ${REELS[j].title}`);
      p.dataset.ready = '0';
    });
    // Touch taps fire pointerenter then click; wait a beat so one tap expands and a second tap plays.
    setTimeout(() => { if (current === i) panels[i].dataset.ready = '1'; }, 250);
  }
  setActive(0);
  whenNear(root, () => loaders.forEach(l => l()));
})();
