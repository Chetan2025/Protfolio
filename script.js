// Start-Process index.html
const menuToggle = document.querySelector('.menu-toggle');
const siteHeader = document.querySelector('.site-header');
const navLinks = document.querySelector('.nav-links');
const navAnchors = document.querySelectorAll('.nav-links a');
const revealItems = document.querySelectorAll('.reveal');
const year = document.getElementById('year');
const typingText = document.getElementById('typingText');
const progressBar = document.getElementById('scrollProgress');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackStatus = document.getElementById('feedbackStatus');
const glows = document.querySelectorAll('.glow');
const feedbackRecipientEmail = 'chetangupta@example.com';

const modal = document.getElementById('projectModal');
const modalClose = document.getElementById('modalClose');
const modalBody = document.getElementById('modalBody');
const modalTitle = document.getElementById('modalTitle');
const previewButtons = document.querySelectorAll('.btn-demo');
const projectCards = document.querySelectorAll('.project-card[data-project-key]');
const mobileProjectKeys = new Set(['notelab', 'pdf-viewer']);

const projectMediaMap = {
  'notelab': {
    images: [
      'image/notelab/notelab_01.png',
      'image/notelab/notelab_02.png',
      'image/notelab/notelab_03.png',
      'image/notelab/notelab_04.png',
      'image/notelab/notelab_05.png',
      'image/notelab/notelab_06.png',
      'image/notelab/notelab_07.png',
      'image/notelab/notelab_08.png',
      'image/notelab/notelab_09.png',
      'image/notelab/notelab_10.png',
      'image/notelab/notelab_11.png',
      'image/notelab/notelab_12.png',
      'image/notelab/notelab_13.jpg',
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
      'image/train web app/train_web_app_01.png',
      'image/train web app/train_web_app_02.png',
      'image/train web app/train_web_app_03.png',
      'image/train web app/train_web_app_04.jpeg',
    ],
    video: 'image/train web app/20260423-0739-56.0867746.mp4',
    device: 'desktop',
  },
  'pdf-viewer': {
    images: [
      'image/pdf viewer/pdf_viewer_01.png',
      'image/pdf viewer/pdf_viewer_02.png',
      'image/pdf viewer/pdf_viewer_03.png',
      'image/pdf viewer/pdf_viewer_04.png',
      'image/pdf viewer/pdf_viewer_05.png',
    ],
    video: 'image/pdf viewer/20260423-0644-55.2251212.mp4',
    device: 'mobile',
  },
  'fine-tuning': {
    images: [
      'image/fine tuning/fine_tuning_01.png',
      'image/fine tuning/fine_tuning_02.png',
    ],
    video: '',
    device: 'desktop',
  },
};

const modalState = {
  title: '',
  key: '',
  images: [],
  video: '',
  device: 'desktop',
  activeImageIndex: 0,
  touchStartX: null,
};

if (year) {
  year.textContent = String(new Date().getFullYear());
}

window.requestAnimationFrame(() => {
  document.body.classList.add('ready');
});

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    const opened = navLinks.getAttribute('data-open') === 'true';
    navLinks.setAttribute('data-open', String(!opened));
    menuToggle.setAttribute('aria-expanded', String(!opened));
  });

  navAnchors.forEach((anchor) => {
    anchor.addEventListener('click', () => {
      navLinks.setAttribute('data-open', 'false');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item, index) => {
  item.style.setProperty('--stagger', String(index % 6));
  revealObserver.observe(item);
});

const typingPhrases = [
  'AI/ML Engineer & Software Developer',
  'Building RAG Chatbots on Custom Data',
  'Shipping Real-World Apps with Impact',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingText) return;

  const current = typingPhrases[phraseIndex];
  const nextText = isDeleting
    ? current.slice(0, Math.max(0, charIndex - 1))
    : current.slice(0, Math.min(current.length, charIndex + 1));

  typingText.textContent = nextText;
  charIndex = nextText.length;

  let delay = isDeleting ? 45 : 85;

  if (!isDeleting && nextText === current) {
    delay = 1300;
    isDeleting = true;
  } else if (isDeleting && nextText.length === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % typingPhrases.length;
    delay = 260;
  }

  window.setTimeout(typeLoop, delay);
}

typeLoop();

function updateProgress() {
  if (!progressBar) return;

  const scrollTop = window.scrollY;
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
  progressBar.style.width = `${ratio}%`;

  if (siteHeader) {
    siteHeader.classList.toggle('scrolled', scrollTop > 6);
  }

  // Subtle parallax shift for floating glows.
  glows.forEach((glow, index) => {
    const speed = index === 0 ? 0.04 : 0.025;
    glow.style.transform = `translateY(${scrollTop * speed}px)`;
  });
}

window.addEventListener('scroll', updateProgress, { passive: true });
updateProgress();

const sections = document.querySelectorAll('main section[id]');
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      if (!id) return;

      navAnchors.forEach((anchor) => {
        const isMatch = anchor.getAttribute('href') === `#${id}`;
        anchor.classList.toggle('active', isMatch);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: '-15% 0px -30% 0px',
  }
);

sections.forEach((section) => sectionObserver.observe(section));

function closeModal() {
  if (!modal || !modalBody) return;

  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalBody.innerHTML = '';
}

function shiftGallery(step) {
  if (!modalState.images.length) return;
  const lastIndex = modalState.images.length - 1;
  const nextIndex = modalState.activeImageIndex + step;
  if (nextIndex < 0) {
    modalState.activeImageIndex = lastIndex;
  } else if (nextIndex > lastIndex) {
    modalState.activeImageIndex = 0;
  } else {
    modalState.activeImageIndex = nextIndex;
  }
  renderModalContent();
}

function renderModalContent() {
  if (!modal || !modalBody || !modalTitle) return;

  const hasImages = modalState.images.length > 0;
  const hasVideo = Boolean(modalState.video);
  const isMobileShowcase = modalState.device === 'mobile';
  const imageSrc = hasImages ? encodeURI(modalState.images[modalState.activeImageIndex]) : '';

  const thumbs = hasImages
    ? modalState.images
        .map((src, index) => {
          const safeSrc = encodeURI(src);
          const activeClass = index === modalState.activeImageIndex ? 'active' : '';
          return `<button class="gallery-thumb ${activeClass}" data-thumb-index="${index}" aria-label="Show preview ${index + 1}"><img src="${safeSrc}" alt="${modalState.title} screenshot ${index + 1}" loading="lazy" /></button>`;
        })
        .join('')
    : '';

  const imageSection = hasImages
    ? isMobileShowcase
      ? `<div class="gallery-frame mobile-gallery-frame"><button class="gallery-nav prev" aria-label="Previous image" data-gallery-nav="prev">&#10094;</button><div class="device-stage"><div class="device-frame"><div class="device-notch" aria-hidden="true"></div><div class="device-screen"><img class="modal-media gallery-main mobile-media" src="${imageSrc}" alt="${modalState.title} screenshot ${modalState.activeImageIndex + 1}" loading="lazy" /></div></div></div><button class="gallery-nav next" aria-label="Next image" data-gallery-nav="next">&#10095;</button></div><div class="gallery-thumbs">${thumbs}</div>`
      : `<div class="gallery-frame"><button class="gallery-nav prev" aria-label="Previous image" data-gallery-nav="prev">&#10094;</button><img class="modal-media gallery-main" src="${imageSrc}" alt="${modalState.title} screenshot ${modalState.activeImageIndex + 1}" loading="lazy" /><button class="gallery-nav next" aria-label="Next image" data-gallery-nav="next">&#10095;</button></div><div class="gallery-thumbs">${thumbs}</div>`
    : '<p class="modal-empty">No screenshots available for this project.</p>';

  const videoSection = hasVideo
    ? isMobileShowcase
      ? `<div class="project-video-wrap"><div class="device-stage"><div class="device-frame"><div class="device-notch" aria-hidden="true"></div><div class="device-screen"><video class="modal-media video mobile-media" autoplay muted loop playsinline controls preload="metadata"><source src="${encodeURI(modalState.video)}" type="video/mp4" />Your browser does not support the video tag.</video></div></div></div></div>`
      : `<div class="project-video-wrap"><video class="modal-media video" controls preload="metadata"><source src="${encodeURI(modalState.video)}" type="video/mp4" />Your browser does not support the video tag.</video></div>`
    : '<p class="modal-note">Video preview not available for this project.</p>';

  modalBody.innerHTML = `<div class="project-modal-layout"><div class="project-gallery-wrap">${imageSection}</div>${videoSection}</div>`;
}

function openProjectModal(projectKey, title, preferredIndex = 0) {
  if (!modal || !modalBody || !modalTitle) return;

  const media = projectMediaMap[projectKey];
  if (!media) return;

  const initialIndex = Math.max(0, Math.min(preferredIndex, Math.max(media.images.length - 1, 0)));

  modalState.title = title;
  modalState.key = projectKey;
  modalState.images = media.images;
  modalState.video = media.video;
  modalState.device = media.device || 'desktop';
  modalState.activeImageIndex = initialIndex;

  modalTitle.textContent = title;
  renderModalContent();
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
}

previewButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    const projectKey = button.getAttribute('data-project-key') || '';
    const title = button.getAttribute('data-project') || 'Project Preview';
    if (!projectKey) return;
    openProjectModal(projectKey, title);
  });
});

projectCards.forEach((card) => {
  card.setAttribute('role', 'button');
  card.setAttribute('tabindex', '0');

  const titleNode = card.querySelector('h3');
  const title = titleNode ? titleNode.textContent?.trim() || 'Project Preview' : 'Project Preview';
  const projectKey = card.getAttribute('data-project-key') || '';

  if (!projectKey) return;

  if (mobileProjectKeys.has(projectKey)) {
    const existingTag = card.querySelector('.project-mobile-tag');
    if (!existingTag) {
      const titleElement = card.querySelector('h3');
      if (titleElement) {
        titleElement.insertAdjacentHTML('afterend', '<span class="project-mobile-tag">Mobile App</span>');
      }
    }
  }

  card.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.closest('.project-actions')) {
      return;
    }

    openProjectModal(projectKey, title);
  });

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    openProjectModal(projectKey, title);
  });
});

if (modalClose) {
  modalClose.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.hasAttribute('data-close')) {
      closeModal();
      return;
    }

    if (!(target instanceof HTMLElement)) return;

    const thumb = target.closest('[data-thumb-index]');
    if (thumb) {
      const nextIndex = Number(thumb.getAttribute('data-thumb-index'));
      if (!Number.isNaN(nextIndex)) {
        modalState.activeImageIndex = nextIndex;
        renderModalContent();
      }
      return;
    }

    const navButton = target.closest('[data-gallery-nav]');
    if (navButton && modalState.images.length) {
      const direction = navButton.getAttribute('data-gallery-nav');
      shiftGallery(direction === 'prev' ? -1 : 1);
    }
  });

  modalBody.addEventListener(
    'touchstart',
    (event) => {
      if (!modal.classList.contains('active')) return;
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.closest('.mobile-gallery-frame')) return;
      modalState.touchStartX = event.changedTouches[0]?.clientX ?? null;
    },
    { passive: true }
  );

  modalBody.addEventListener(
    'touchend',
    (event) => {
      if (!modal.classList.contains('active')) return;
      const target = event.target;
      if (!(target instanceof HTMLElement) || !target.closest('.mobile-gallery-frame')) return;
      if (modalState.touchStartX === null) return;

      const touchEndX = event.changedTouches[0]?.clientX ?? modalState.touchStartX;
      const distance = touchEndX - modalState.touchStartX;
      modalState.touchStartX = null;

      if (Math.abs(distance) < 35) return;
      shiftGallery(distance > 0 ? -1 : 1);
    },
    { passive: true }
  );
}

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

if (feedbackForm && feedbackStatus) {
  feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(feedbackForm);
    const name = String(formData.get('feedbackName') || '').trim();
    const message = String(formData.get('feedbackText') || '').trim();

    if (!name || !message) {
      feedbackStatus.textContent = 'Please fill all fields before submitting.';
      feedbackStatus.style.color = '#ff9ca7';
      return;
    }

    const subject = encodeURIComponent(`Portfolio Feedback from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\n\nFeedback:\n${message}`);
    const mailtoUrl = `mailto:${feedbackRecipientEmail}?subject=${subject}&body=${body}`;

    feedbackStatus.textContent = `Thanks ${name}. Opening your email app to send feedback.`;
    feedbackStatus.style.color = '#9af5bf';
    window.location.href = mailtoUrl;
    feedbackForm.reset();
  });
}
