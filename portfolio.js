/* =====================================================
   PORTFOLIO CONTENT - edit this part to change your work
   -----------------------------------------------------
   Every item is a file in your public Google Drive folder.
   "id" is the long code in the file's share link:
   https://drive.google.com/file/d/<THIS PART>/view
   The file must stay shared as "Anyone with the link".
   ===================================================== */
const DRIVE_URL = 'https://drive.google.com/drive/folders/12uuKvX4SyLDwhbmhSJSYIyYtUJL_qJUs?usp=sharing';

const GRAPHICS = [
  { id: '1yHqcs281Bs_3i-pCveRz_oiOtYd8UKAJ', title: 'Top 5 Tools Every Business Owner Should Know', subtitle: 'LinkedIn carousel · Virtual assistant agency', alt: 'Carousel cover reading "Top 5 Tools Every Business Owner Should Know"' },
  { id: '1HLEkd7qYcdLjLY615vwEiimGgYPGKsZz', title: 'Eisenhower Matrix', subtitle: 'Social media graphic · Virtual assistant agency', alt: 'Graphic explaining the Eisenhower Matrix decision-making tool' },
  { id: '1zZB_r4HRpspESkShzHxgYYBaE-BJaFGv', title: 'Build, Print, and Deliver a Service Plan', subtitle: 'One-pager · Consulting', alt: 'One-pager outlining five steps to build and deliver a service plan' },
  { id: '1S8JMNOGrjWpOLc-WfP5CQwVRnDCEkBjn', title: 'Why Choose Protective Choice Insurance?', subtitle: 'Social media graphic · Insurance', alt: 'Insurance ad with a smiling agent and a checklist of reasons to choose the agency' },
  { id: '1Vr5vczp2Om4SmPx809aABoUyTLdNs836', title: 'Household Products', subtitle: 'Brochure · Product catalog', alt: 'Brochure cover for household cleaning products' },
  { id: '1Ow_4VsKVIiqF0SMjKKfMVoNca9jGF7NK', title: 'The Landscape Architect', subtitle: 'Social media graphic · Architecture & engineering', alt: 'Landscape architecture services post featuring a resort building' },
  { id: '1v-nVALN8Xs3y6Whe0v0XuWLwFWS6pY16', title: 'CRISP 3-D Cheat Sheet', subtitle: 'One-pager · Consulting', alt: 'Blue cheat sheet one-pager titled "CRISP 3-D: Define What You Do Better"' },
  { id: '1ibYwYEH0omxDQsrXE3J7fxdtnSHQ7Sg8', title: 'Automate These 3 Tasks', subtitle: 'LinkedIn carousel · Virtual assistant agency', alt: 'Carousel cover reading "Automate these 3 tasks to save 10+ hours a week"' },
  { id: '18esrrs7B8Gmno7MdGZPjfgpL_k6hWUXe', title: '3 Ways to Lower Your Flood Insurance Premiums', subtitle: 'Social media graphic · Insurance', alt: 'Yellow and black insurance tips graphic about lowering flood insurance premiums' },
  { id: '1mgUNNbil7YYH8WLtkCVrfrRs2Rijwec0', title: '5 Ways to Delegate Effectively', subtitle: 'Social media graphic · Virtual assistant agency', alt: 'Blue tips graphic listing five ways to delegate before the weekend' },
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
const previewUrl = id => `https://drive.google.com/file/d/${id}/preview`;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// Drive thumbnails sometimes fail when many load at once, so retry a few times.
function loadDriveImage(img, id, w, onFail) {
  let tries = 0;
  img.addEventListener('error', () => {
    tries += 1;
    if (tries <= 4) setTimeout(() => { img.src = `${thumbUrl(id, w)}&t=${tries}`; }, 600 * tries + Math.random() * 400);
    else onFail?.();
  });
  img.src = thumbUrl(id, w);
}

/* ---------- Drive link ---------- */
const driveLink = document.getElementById('driveLink');
if (driveLink) driveLink.href = DRIVE_URL;

/* ---------- Viewer (full-size image / video from Drive) ---------- */
const viewer = document.getElementById('viewer');
const viewerFrame = document.getElementById('viewerFrame');
const viewerTitle = document.getElementById('viewerTitle');
const viewerOpen = document.getElementById('viewerOpen');
let viewerReturnFocus = null;

function openViewer(item, kind) {
  viewerReturnFocus = document.activeElement;
  viewerTitle.textContent = item.title;
  viewerOpen.href = `https://drive.google.com/file/d/${item.id}/view`;
  viewer.classList.toggle('is-video', kind === 'video');
  viewerFrame.innerHTML = `<iframe src="${previewUrl(item.id)}" title="${item.title}" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
  viewer.hidden = false;
  document.body.style.overflow = 'hidden';
  viewer.querySelector('.viewer-close').focus();
}
function closeViewer() {
  viewer.hidden = true;
  viewerFrame.innerHTML = '';
  document.body.style.overflow = '';
  viewerReturnFocus?.focus();
}
viewer?.querySelectorAll('[data-viewer-close]').forEach(el => el.addEventListener('click', closeViewer));
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && viewer && !viewer.hidden) closeViewer();
});

/* ---------- Coverflow ---------- */
(function coverflow() {
  const root = document.getElementById('coverflow');
  const stage = document.getElementById('coverflowStage');
  const titleEl = document.getElementById('cfTitle');
  const subEl = document.getElementById('cfSub');
  const caption = titleEl?.parentElement;
  if (!root || !GRAPHICS.length) return;

  let active = Math.floor(GRAPHICS.length / 2) - 1;
  let dragged = false;

  const covers = GRAPHICS.map((item, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cover';
    const img = document.createElement('img');
    img.alt = item.alt || item.title;
    img.draggable = false;
    img.decoding = 'async';
    btn.appendChild(img);
    // stagger requests so Drive doesn't throttle them
    setTimeout(() => loadDriveImage(img, item.id, 600, () => {
      btn.innerHTML = `<div class="cover-ph">${item.title}<small>View on Google Drive</small></div>`;
    }), Math.abs(i - active) * 150);
    btn.addEventListener('click', () => {
      if (dragged) return;
      if (i === active) openViewer(item, 'image');
      else select(i);
    });
    stage.appendChild(btn);
    return btn;
  });

  function render() {
    covers.forEach((c, i) => {
      const d = i - active;
      const ad = Math.abs(d);
      const s = Math.sign(d);
      c.style.transform = d === 0
        ? 'translateX(0) translateZ(40px) rotateY(0deg)'
        : `translateX(${s * (74 + (ad - 1) * 28)}%) translateZ(${-120 - ad * 40}px) rotateY(${-s * 58}deg)`;
      c.style.zIndex = String(10 - ad);
      const hidden = ad > 2;
      c.style.opacity = hidden ? '0' : '1';
      c.style.pointerEvents = hidden ? 'none' : '';
      c.tabIndex = d === 0 ? 0 : -1;
      c.setAttribute('aria-pressed', String(d === 0));
      c.setAttribute('aria-hidden', String(hidden));
      c.setAttribute('aria-label', d === 0
        ? `${GRAPHICS[i].title}. Open full size`
        : `Show ${GRAPHICS[i].title}`);
    });
  }

  function setCaption() {
    const item = GRAPHICS[active];
    if (reduceMotion.matches || !caption) {
      titleEl.textContent = item.title;
      subEl.textContent = item.subtitle;
      return;
    }
    caption.classList.add('swap');
    setTimeout(() => {
      titleEl.textContent = item.title;
      subEl.textContent = item.subtitle;
      caption.classList.remove('swap');
    }, 180);
  }

  function select(i, focus) {
    const next = Math.max(0, Math.min(GRAPHICS.length - 1, i));
    if (next === active) return;
    active = next;
    render();
    setCaption();
    if (focus) covers[active].focus();
  }

  root.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); select(active - 1, true); }
    if (e.key === 'ArrowRight') { e.preventDefault(); select(active + 1, true); }
  });

  // Swipe
  let startX = null;
  root.addEventListener('pointerdown', e => { startX = e.clientX; dragged = false; });
  root.addEventListener('pointerup', e => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 40) {
      dragged = true;
      select(active + (dx < 0 ? 1 : -1));
      setTimeout(() => { dragged = false; }, 0);
    }
  });
  root.addEventListener('pointercancel', () => { startX = null; });

  render();
  titleEl.textContent = GRAPHICS[active].title;
  subEl.textContent = GRAPHICS[active].subtitle;
})();

/* ---------- Reels: expanding panels ---------- */
(function reels() {
  const root = document.getElementById('reels');
  if (!root || !REELS.length) return;

  const playIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l11-6.5z" fill="currentColor"/></svg>';

  const panels = REELS.map((item, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'panel';

    const img = document.createElement('img');
    img.className = 'panel-media';
    img.alt = `Opening frame of ${item.title}`;
    img.decoding = 'async';
    btn.appendChild(img);
    setTimeout(() => loadDriveImage(img, item.id, 500, () => img.remove()), 900 + i * 200);

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
      if (current === i && btn.dataset.ready === '1') openViewer(item, 'video');
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
})();
