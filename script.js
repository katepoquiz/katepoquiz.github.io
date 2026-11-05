// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  })
);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
const scroller = document.getElementById('scroller');
const sections = [...document.querySelectorAll('.page > .snap, #contact')];

/* -----------------------------------------------------
   SECTION DOTS + KEYBOARD SECTION JUMPS
   ----------------------------------------------------- */
const dotsNav = document.getElementById('dots');
const dots = sections.map((sec, i) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'dot';
  b.setAttribute('aria-label', `Go to ${sec.dataset.label || sec.id}`);
  b.addEventListener('click', () => goTo(i));
  dotsNav?.appendChild(b);
  return b;
});
let currentIndex = 0;

function topOf(i) {
  // the contact footer snaps to the very end of the page
  return sections[i].id === 'contact' ? scroller.scrollHeight - scroller.clientHeight : sections[i].offsetTop;
}
function goTo(i) {
  const idx = Math.max(0, Math.min(sections.length - 1, i));
  scroller.scrollTo({ top: topOf(idx), behavior: prefersReduced.matches ? 'auto' : 'smooth' });
}

let pageIndex = 0;      // last section crossing the middle of the screen
let contactShown = false;
function setIndex(i) {
  if (i === currentIndex && dots[i]?.classList.contains('active')) return;
  currentIndex = i;
  dots.forEach((d, j) => {
    d.classList.toggle('active', j === i);
    if (j === i) d.setAttribute('aria-current', 'true');
    else d.removeAttribute('aria-current');
  });
  setCurrentNav(sections[i].id);
}
const contactIndex = sections.findIndex(s => s.id === 'contact');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) pageIndex = sections.indexOf(e.target);
  });
  if (!contactShown) setIndex(pageIndex);
// a section counts as current once it crosses the middle of the screen
// (works for sections taller than the screen too)
}, { root: scroller, rootMargin: '-50% 0px -50% 0px', threshold: 0 });
// The contact footer sits behind the page (sticky), so it's tracked by scroll position instead.
sections.forEach(s => { if (s.id !== 'contact') sectionObserver.observe(s); });
function checkContact() {
  const footerH = document.getElementById('contact').offsetHeight;
  const revealed = scroller.scrollTop + scroller.clientHeight - document.getElementById('page').offsetHeight;
  contactShown = revealed > footerH * 0.5;
  setIndex(contactShown ? contactIndex : pageIndex);
}
scroller?.addEventListener('scroll', checkContact, { passive: true });

document.addEventListener('keydown', e => {
  if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
  if (document.querySelector('#lightbox:not([inert])') || !document.getElementById('viewer')?.hidden) return;
  const tag = document.activeElement?.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;
  const sec = sections[currentIndex];
  // Arrow keys jump sections only when the current one fits on screen;
  // inside a long section they scroll normally.
  const fits = sec.offsetHeight <= scroller.clientHeight + 4;
  if (e.key === 'PageDown' || (e.key === 'ArrowDown' && fits)) { e.preventDefault(); goTo(currentIndex + 1); }
  if (e.key === 'PageUp' || (e.key === 'ArrowUp' && fits)) { e.preventDefault(); goTo(currentIndex - 1); }
});

/* -----------------------------------------------------
   NAV: GLIDING HOVER / FOCUS INDICATOR
   ----------------------------------------------------- */
const navWrap = document.getElementById('navWrap');
const pill = navWrap?.querySelector('.nav-pill');
const line = navWrap?.querySelector('.nav-line');
const navAnchors = navWrap ? [...navWrap.querySelectorAll('a')] : [];
let hoverLink = null;
let currentLink = null;

function placeIndicator(link, mode) {
  if (!navWrap) return;
  if (!link) { navWrap.dataset.mode = 'none'; return; }
  const x = link.offsetLeft, w = link.offsetWidth;
  pill.style.transform = `translateX(${x}px)`;
  pill.style.width = `${w}px`;
  line.style.transform = `translateX(${x + 8}px)`;
  line.style.width = `${Math.max(0, w - 16)}px`;
  navWrap.dataset.mode = mode;
  navAnchors.forEach(a => a.classList.toggle('lit', a === link));
}
function restIndicator() {
  // rest on the section you're reading, so the bar shows where you are
  placeIndicator(currentLink, currentLink ? 'pill' : 'none');
}
function setCurrentNav(id) {
  currentLink = navAnchors.find(a => a.dataset.sec === id) || null;
  navAnchors.forEach(a => {
    if (a === currentLink) a.setAttribute('aria-current', 'location');
    else a.removeAttribute('aria-current');
  });
  if (!hoverLink && !navWrap?.contains(document.activeElement)) restIndicator();
}
navAnchors.forEach(a => {
  a.addEventListener('pointerenter', () => { hoverLink = a; placeIndicator(a, 'pill'); });
  a.addEventListener('focus', () => {
    placeIndicator(a, a.matches(':focus-visible') ? 'line' : 'pill');
  });
  a.addEventListener('blur', () => { setTimeout(() => { if (!navWrap.contains(document.activeElement)) restIndicator(); }, 0); });
});
navWrap?.addEventListener('pointerleave', () => { hoverLink = null; restIndicator(); });
if (navWrap && 'ResizeObserver' in window) {
  new ResizeObserver(() => placeIndicator(hoverLink || currentLink, navWrap.dataset.mode === 'line' ? 'line' : (hoverLink || currentLink ? 'pill' : 'none'))).observe(navWrap);
}

/* -----------------------------------------------------
   CONTACT CURTAIN: small parallax as it's revealed
   ----------------------------------------------------- */
const page = document.getElementById('page');
const curtainInner = document.getElementById('curtainInner');
let curtainTick = false;
function updateCurtain() {
  curtainTick = false;
  if (!curtainInner || prefersReduced.matches) return;
  const footerH = document.getElementById('contact').offsetHeight;
  const revealed = scroller.scrollTop + scroller.clientHeight - page.offsetHeight;
  const p = Math.max(0, Math.min(1, revealed / footerH));
  curtainInner.style.transform = `translateY(${(1 - p) * 22}px)`;
  curtainInner.style.opacity = String(0.4 + p * 0.6);
}
scroller?.addEventListener('scroll', () => {
  if (!curtainTick) { curtainTick = true; requestAnimationFrame(updateCurtain); }
}, { passive: true });
updateCurtain();

/* -----------------------------------------------------
   COUNTING ANIMATION
   ----------------------------------------------------- */
function animateCounters() {
  const counters = document.querySelectorAll('.stat-num[data-target]');
  counters.forEach(counter => {
    const target = +counter.dataset.target;
    const suffix = counter.dataset.suffix || '';
    const useComma = counter.hasAttribute('data-comma');
    const duration = 1800;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(ease * target);
      const display = useComma ? current.toLocaleString() : current;
      counter.textContent = display + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounters();
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) statsObserver.observe(statsGrid);
