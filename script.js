/* ============================================================
   CHETAN GUPTA PORTFOLIO — script.js (upgraded)
   ============================================================ */

/* ── DOM refs ─────────────────────────────────────────── */
const menuToggle    = document.querySelector('.menu-toggle');
const siteHeader    = document.querySelector('.site-header');
const navLinks      = document.querySelector('.nav-links');
const navAnchors    = document.querySelectorAll('.nav-links a');
const revealItems   = document.querySelectorAll('.reveal');
const typingText    = document.getElementById('typingText');
const progressBar   = document.getElementById('scrollProgress');
const feedbackForm  = document.getElementById('feedbackForm');
const feedbackStatus= document.getElementById('feedbackStatus');
const cursorGlow    = document.getElementById('cursorGlow');
const yearEl        = document.getElementById('year');
const modal         = document.getElementById('projectModal');
const modalClose    = document.getElementById('modalClose');
const modalBody     = document.getElementById('modalBody');
const modalTitle    = document.getElementById('modalTitle');
const previewButtons= document.querySelectorAll('.btn-demo');
const projectCards  = document.querySelectorAll('.project-card[data-project-key]');

const feedbackRecipientEmail = 'chetangupta9764@gmail.com';

/* ── Year ─────────────────────────────────────────────── */
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ── Splash screen ────────────────────────────────────── */
const splash = document.createElement('div');
splash.className = 'splash-screen';
splash.innerHTML = `
  <div class="splash-screen__card">
    <p class="splash-screen__eyebrow">Portfolio</p>
    <h2>Chetan Gupta</h2>
    <p>AI/ML Engineer &amp; Software Developer</p>
    <div class="splash-bar"><div class="splash-bar-fill"></div></div>
  </div>`;
document.body.appendChild(splash);

function hideSplash() {
  setTimeout(() => {
    splash.classList.add('hide');
    setTimeout(() => splash.remove(), 420);
  }, 1300);
}
document.readyState === 'complete' ? hideSplash() : window.addEventListener('load', hideSplash, { once: true });

/* ── Ready class ──────────────────────────────────────── */
requestAnimationFrame(() => document.body.classList.add('ready'));

/* ── Cursor glow ──────────────────────────────────────── */
let mx = -999, my = -999;
window.addEventListener('mousemove', (e) => {
  mx = e.clientX; my = e.clientY;
  if (cursorGlow) {
    cursorGlow.style.left = mx + 'px';
    cursorGlow.style.top  = my + 'px';
  }
});

/* ── Particle canvas ──────────────────────────────────── */
(function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const N = Math.min(60, Math.floor(window.innerWidth / 22));
  for (let i = 0; i < N; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.6 + 0.4,
      dx: (Math.random() - 0.5) * 0.28,
      dy: (Math.random() - 0.5) * 0.28,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(37,99,235,0.45)';
      ctx.fill();
    });

    // Draw lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(37,99,235,${0.12 * (1 - dist/130)})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Scroll progress + header ─────────────────────────── */
function updateScroll() {
  const scrollTop    = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio        = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  if (progressBar) progressBar.style.width = ratio + '%';
  if (siteHeader)  siteHeader.classList.toggle('scrolled', scrollTop > 8);
}
window.addEventListener('scroll', updateScroll, { passive: true });
updateScroll();

/* ── Nav menu toggle ──────────────────────────────────── */
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const open = navLinks.getAttribute('data-open') === 'true';
    navLinks.setAttribute('data-open', String(!open));
    menuToggle.setAttribute('aria-expanded', String(!open));
  });
  navAnchors.forEach(a => a.addEventListener('click', () => {
    navLinks.setAttribute('data-open', 'false');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
}

/* ── Active nav section highlight ────────────────────── */
const sections = document.querySelectorAll('main section[id]');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.getAttribute('id');
    navAnchors.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + id));
  });
}, { threshold: 0.4, rootMargin: '-12% 0px -28% 0px' });
sections.forEach(s => sectionObs.observe(s));

/* ── Reveal on scroll ─────────────────────────────────── */
const revealObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('is-visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealItems.forEach((el, i) => {
  el.style.setProperty('--stagger', String(i % 6));
  revealObs.observe(el);
});

/* ── Typing animation ─────────────────────────────────── */
const phrases = [
  'AI/ML Engineer & Software Developer',
  'Building RAG Chatbots on Custom Data',
  'Shipping Production-Ready Android Apps',
  'Fine-tuning LLMs for Domain Tasks',
];
let pIdx = 0, cIdx = 0, deleting = false;

function typeLoop() {
  if (!typingText) return;
  const cur  = phrases[pIdx];
  const next = deleting ? cur.slice(0, Math.max(0, cIdx - 1)) : cur.slice(0, Math.min(cur.length, cIdx + 1));
  typingText.textContent = next;
  cIdx = next.length;

  let delay = deleting ? 42 : 80;
  if (!deleting && next === cur) { delay = 1400; deleting = true; }
  else if (deleting && next.length === 0) { deleting = false; pIdx = (pIdx + 1) % phrases.length; delay = 280; }
  setTimeout(typeLoop, delay);
}
typeLoop();

/* ── Counter animation ────────────────────────────────── */
function animateCount(el) {
  const target = parseInt(el.getAttribute('data-count'), 10);
  const duration = 1200;
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num[data-count]');
const statObs = new IntersectionObserver((entries, obs) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCount(e.target); obs.unobserve(e.target); }
  });
}, { threshold: 0.5 });
statNums.forEach(n => statObs.observe(n));

/* ── Magnetic buttons ─────────────────────────────────── */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top  + rect.height / 2);
    btn.style.transform = `translate(${dx * 0.28}px, ${dy * 0.28}px) translateY(-2px)`;
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = '';
  });
});

/* ── Project media map ────────────────────────────────── */
const projectMediaMap = {
  'notelab': {
    images: [
      'image/notelab/notelab_02.png','image/notelab/notelab_03.png','image/notelab/notelab_04.png',
      'image/notelab/notelab_05.png','image/notelab/notelab_06.png','image/notelab/notelab_07.png',
      'image/notelab/notelab_08.png','image/notelab/notelab_09.png','image/notelab/notelab_10.png',
      'image/notelab/notelab_11.png','image/notelab/notelab_12.png','image/notelab/notelab_13.jpg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM.jpeg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM (1).jpeg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM (2).jpeg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM (3).jpeg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM (4).jpeg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM (5).jpeg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM (6).jpeg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM (7).jpeg',
      'image/notelab/WhatsApp Image 2026-06-02 at 11.47.01 AM (8).jpeg',
    ],
    video: 'image/notelab/Screen Recording 2026-04-23 123440.mp4',
    device: 'mobile',
  },
  'chatbot-rag': {
    images: [
      'image/create your own chatbot/create_your_own_chatbot_01.png',
      'image/create your own chatbot/create_your_own_chatbot_02.png',
      'image/create your own chatbot/create_your_own_chatbot_03.png',
      'image/create your own chatbot/create_your_own_chatbot_04.png',
      'image/create your own chatbot/create_your_own_chatbot_05.png',
      'image/create your own chatbot/create_your_own_chatbot_06.png',
      'image/create your own chatbot/create_your_own_chatbot_07.png',
      'image/create your own chatbot/create_your_own_chatbot_08.png',
      'image/create your own chatbot/create_your_own_chatbot_09.png',
    ],
    video: 'image/create your own chatbot/20260423-0608-11.5115436.mp4',
    device: 'desktop',
  },
  'train-tracker': {
    images: [
      'image/train web app/train_web_app_01.png','image/train web app/train_web_app_02.png',
      'image/train web app/train_web_app_03.png','image/train web app/train_web_app_04.jpeg',
    ],
    video: 'image/train web app/20260423-0739-56.0867746.mp4',
    device: 'desktop',
  },
  'pdf-viewer': {
    images: [
      'image/notelab/notelab_01.png','image/pdf viewer/pdf_viewer_01.png',
      'image/pdf viewer/pdf_viewer_02.png','image/pdf viewer/pdf_viewer_03.png',
      'image/pdf viewer/pdf_viewer_04.png','image/pdf viewer/pdf_viewer_05.png',
    ],
    video: 'image/pdf viewer/20260423-0644-55.2251212.mp4',
    device: 'mobile',
  },
  'fine-tuning': {
    images: ['image/fine tuning/fine_tuning_01.png','image/fine tuning/fine_tuning_02.png'],
    video: '',
    device: 'desktop',
  },
};

/* ── Modal state ──────────────────────────────────────── */
const state = {
  title: '', key: '', images: [], video: '', device: 'desktop',
  activeIndex: 0, touchStartX: null,
};

function closeModal() {
  if (!modal || !modalBody) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalBody.innerHTML = '';
}

function shiftGallery(step) {
  if (!state.images.length) return;
  const last = state.images.length - 1;
  const next = state.activeIndex + step;
  state.activeIndex = next < 0 ? last : next > last ? 0 : next;
  renderModal();
}

function renderModal() {
  if (!modal || !modalBody || !modalTitle) return;
  const { images, video, device, activeIndex, title } = state;
  const hasImg  = images.length > 0;
  const hasVid  = Boolean(video);
  const isMob   = device === 'mobile';
  const imgSrc  = hasImg ? encodeURI(images[activeIndex]) : '';

  const thumbs = hasImg ? images.map((src, i) => {
    const s = encodeURI(src);
    return `<button class="gallery-thumb ${i === activeIndex ? 'active' : ''}" data-thumb-index="${i}" aria-label="Preview ${i+1}"><img src="${s}" alt="${title} screenshot ${i+1}" loading="lazy" /></button>`;
  }).join('') : '';

  const imgSection = hasImg
    ? isMob
      ? `<div class="gallery-frame mobile-gallery-frame">
           <button class="gallery-nav prev" data-gallery-nav="prev" aria-label="Previous">&#10094;</button>
           <div class="device-stage"><div class="device-frame"><div class="device-notch" aria-hidden="true"></div>
           <div class="device-screen"><img class="modal-media gallery-main mobile-media" src="${imgSrc}" alt="${title} screenshot ${activeIndex+1}" loading="lazy" /></div></div></div>
           <button class="gallery-nav next" data-gallery-nav="next" aria-label="Next">&#10095;</button>
         </div><div class="gallery-thumbs">${thumbs}</div>`
      : `<div class="gallery-frame">
           <button class="gallery-nav prev" data-gallery-nav="prev" aria-label="Previous">&#10094;</button>
           <img class="modal-media gallery-main" src="${imgSrc}" alt="${title} screenshot ${activeIndex+1}" loading="lazy" />
           <button class="gallery-nav next" data-gallery-nav="next" aria-label="Next">&#10095;</button>
         </div><div class="gallery-thumbs">${thumbs}</div>`
    : '<p class="modal-empty">No screenshots available.</p>';

  const vidSection = hasVid
    ? isMob
      ? `<div class="project-video-wrap"><div class="device-stage"><div class="device-frame"><div class="device-notch" aria-hidden="true"></div>
         <div class="device-screen"><video class="modal-media video mobile-media" autoplay muted loop playsinline controls preload="metadata">
         <source src="${encodeURI(video)}" type="video/mp4" /></video></div></div></div></div>`
      : `<div class="project-video-wrap"><video class="modal-media video" controls preload="metadata">
         <source src="${encodeURI(video)}" type="video/mp4" /></video></div>`
    : '<p class="modal-note">Video preview not available for this project.</p>';

  modalBody.innerHTML = `<div class="project-modal-layout"><div class="project-gallery-wrap">${imgSection}</div>${vidSection}</div>`;
}

function openModal(key, title, startIndex = 0) {
  const media = projectMediaMap[key];
  if (!media) return;
  state.title  = title; state.key = key;
  state.images = media.images; state.video = media.video;
  state.device = media.device || 'desktop';
  state.activeIndex = Math.max(0, Math.min(startIndex, media.images.length - 1));
  if (modalTitle) modalTitle.textContent = title;
  renderModal();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

/* Demo buttons */
previewButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const key   = btn.getAttribute('data-project-key') || '';
    const title = btn.getAttribute('data-project') || 'Project Preview';
    if (key && projectMediaMap[key]) openModal(key, title);
  });
});

/* Card click */
projectCards.forEach(card => {
  card.setAttribute('role', 'button'); card.setAttribute('tabindex', '0');
  const h = card.querySelector('h3');
  const title = h ? (h.textContent || '').trim() : 'Project Preview';
  const key   = card.getAttribute('data-project-key') || '';
  if (!key || !projectMediaMap[key]) return;

  card.addEventListener('click', (e) => {
    if (e.target instanceof HTMLElement && e.target.closest('.project-actions')) return;
    openModal(key, title);
  });
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(key, title); }
  });
});

/* Modal events */
if (modalClose) modalClose.addEventListener('click', closeModal);

if (modal) {
  modal.addEventListener('click', (e) => {
    const t = e.target;
    if (t instanceof HTMLElement && t.hasAttribute('data-close')) { closeModal(); return; }
    if (!(t instanceof HTMLElement)) return;

    const thumb = t.closest('[data-thumb-index]');
    if (thumb) {
      const idx = Number(thumb.getAttribute('data-thumb-index'));
      if (!isNaN(idx)) { state.activeIndex = idx; renderModal(); }
      return;
    }
    const nav = t.closest('[data-gallery-nav]');
    if (nav) shiftGallery(nav.getAttribute('data-gallery-nav') === 'prev' ? -1 : 1);
  });

  modalBody.addEventListener('touchstart', (e) => {
    if (!modal.classList.contains('active')) return;
    if (!(e.target instanceof HTMLElement) || !e.target.closest('.mobile-gallery-frame')) return;
    state.touchStartX = e.changedTouches[0]?.clientX ?? null;
  }, { passive: true });

  modalBody.addEventListener('touchend', (e) => {
    if (!modal.classList.contains('active')) return;
    if (!(e.target instanceof HTMLElement) || !e.target.closest('.mobile-gallery-frame')) return;
    if (state.touchStartX === null) return;
    const dist = (e.changedTouches[0]?.clientX ?? state.touchStartX) - state.touchStartX;
    state.touchStartX = null;
    if (Math.abs(dist) < 35) return;
    shiftGallery(dist > 0 ? -1 : 1);
  }, { passive: true });
}

window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ── Google Cloud achievement ─────────────────────────── */
const gcBtn = document.querySelector('.achievement-google-cloud');
if (gcBtn) {
  gcBtn.addEventListener('click', () => {
    if (!modal || !modalBody || !modalTitle) return;
    const src = 'image/acivedments/Google cloud.jpeg';
    state.title = 'Google Cloud'; state.images = [src]; state.video = ''; state.device = 'desktop'; state.activeIndex = 0;
    modalTitle.textContent = 'Google Cloud Achievement';
    modalBody.innerHTML = `<div class="project-modal-layout"><div class="project-gallery-wrap"><div class="gallery-frame"><img class="modal-media gallery-main" src="${src}" alt="Google Cloud Achievement" loading="lazy" /></div></div></div>`;
    modal.classList.add('active'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
  });
}

/* ── Feedback form ────────────────────────────────────── */
if (feedbackForm && feedbackStatus) {
  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data    = new FormData(feedbackForm);
    const name    = String(data.get('feedbackName') || '').trim();
    const message = String(data.get('feedbackText') || '').trim();
    if (!name || !message) {
      feedbackStatus.textContent = 'Please fill all fields before submitting.';
      feedbackStatus.style.color = '#ef4444';
      return;
    }
    const subject = encodeURIComponent(`Portfolio Feedback from ${name}`);
    const body    = encodeURIComponent(`Name: ${name}\n\nFeedback:\n${message}`);
    window.location.href = `mailto:${feedbackRecipientEmail}?subject=${subject}&body=${body}`;
    feedbackStatus.textContent = `Thanks ${name}! Opening your email app.`;
    feedbackStatus.style.color = '#16a34a';
    feedbackForm.reset();
  });
}