// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => navLinks.classList.remove('open'))
);

/* -----------------------------------------------------
   SAMPLE GALLERIES
   To add a real image: replace { caption: '...' } with
   { src: 'images/your-image.jpg', caption: '...' }
   ----------------------------------------------------- */
const galleries = {
  'executive-support': {
    title: 'Executive Support — Samples',
    items: [
      { caption: 'Calendar management dashboard' },
      { caption: 'Inbox triage system' },
      { caption: 'Travel itinerary template' },
      { caption: 'Meeting agenda template' },
      { caption: 'Weekly executive brief' },
      { caption: 'Task delegation tracker' },
    ],
  },
  'business-development': {
    title: 'Business Development — Samples',
    items: [
      { caption: 'LinkedIn outreach sequence' },
      { caption: 'Lead generation tracker' },
      { caption: 'Newsletter design sample' },
      { caption: 'Prospect research one-pager' },
      { caption: 'Cold email templates' },
      { caption: 'Pipeline reporting dashboard' },
    ],
  },
  'crm-automation': {
    title: 'CRM & Automation — Samples',
    items: [
      { caption: 'GoHighLevel pipeline build' },
      { caption: 'Zapier workflow map' },
      { caption: 'HubSpot contact segmentation' },
      { caption: 'CRM cleanup before/after' },
      { caption: 'Automated follow-up flow' },
      { caption: 'Lead scoring system' },
    ],
  },
  'project-coordination': {
    title: 'Project Coordination — Samples',
    items: [
      { caption: 'SOW template' },
      { caption: 'NDA template' },
      { caption: 'Project tracker (Asana)' },
      { caption: 'Hours logging system' },
      { caption: 'Client onboarding checklist' },
      { caption: 'File organization system' },
    ],
  },
  'social-content': {
    title: 'Social Media & Content — Samples',
    items: [
      { caption: 'Instagram carousel design' },
      { caption: 'Reel — short-form video' },
      { caption: 'Monthly content calendar' },
      { caption: 'SEO blog post sample' },
      { caption: 'Brand graphics set' },
      { caption: 'Engagement metrics report' },
    ],
  },
  'documentation': {
    title: 'Documentation & SOPs — Samples',
    items: [
      { caption: 'Onboarding SOP' },
      { caption: 'Client case study' },
      { caption: 'Training module sample' },
      { caption: 'Process documentation template' },
      { caption: 'Internal knowledge base' },
      { caption: 'Quick reference guide' },
    ],
  },
};

// Modal logic
const modal      = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalGrid  = document.getElementById('modalGrid');

function openGallery(key) {
  const g = galleries[key];
  if (!g) return;
  modalTitle.textContent = g.title;
  modalGrid.innerHTML = g.items.map(item => `
    <div class="modal-item">
      ${item.src
        ? `<img src="${item.src}" alt="${item.caption}">`
        : `<div class="ph">Add image</div>`}
      <div class="cap">${item.caption}</div>
    </div>
  `).join('');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => openGallery(btn.dataset.open));
});
document.querySelectorAll('[data-close]').forEach(el => {
  el.addEventListener('click', closeModal);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') closeModal();
});
