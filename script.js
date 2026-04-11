// ===== JUMP TO TOP BUTTON =====
document.addEventListener('DOMContentLoaded', () => {
  const jumpBtn = document.querySelector('.jump-to-top');

  if (jumpBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        jumpBtn.classList.add('visible');
      } else {
        jumpBtn.classList.remove('visible');
      }
    }, { passive: true });

    // Scroll to top on click
    jumpBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ===== INFINITE SCROLL FOR CAROUSEL CARDS =====
  const carouselRows = document.querySelectorAll('.carousel-row');

  carouselRows.forEach((row) => {
    const track = row.querySelector('.id-track');
    const scroll = row.querySelector('.id-scroll');
    const idRow = row.querySelector('.id-row');

    if (track && scroll) {
      // Clone all cards for seamless infinite loop
      const cards = Array.from(track.querySelectorAll('.id-card'));
      cards.forEach((card) => {
        track.appendChild(card.cloneNode(true));
      });

      // Start animation after cloning — prevents blank gap on row 2
      const isReverse = idRow && idRow.dataset.direction === 'reverse';
      track.style.animation = isReverse
        ? 'scrollRightInfinite 60s linear infinite'
        : 'scrollLeftInfinite 60s linear infinite';

      // Pause on hover
      scroll.addEventListener('mouseenter', () => {
        track.style.animationPlayState = 'paused';
      }, { passive: true });
      scroll.addEventListener('mouseleave', () => {
        track.style.animationPlayState = 'running';
      }, { passive: true });
    }
  });
});

// Fullscreen modal for ID cards - optimized
const cardModal = document.createElement('div');
cardModal.className = 'card-modal';
cardModal.innerHTML = `
  <div class="modal-overlay"></div>
  <div class="modal-container">
    <button class="modal-close" aria-label="Close">×</button>
    <div class="modal-card-wrapper">
      <div class="modal-card-inner">
        <div class="card-face modal-front">
          <img src="" alt="Card Front" id="modal-front-img" loading="lazy">
        </div>
        <div class="card-face modal-back">
          <img src="" alt="Card Back" id="modal-back-img" loading="lazy">
        </div>
      </div>
    </div>
  </div>
`;
document.body.appendChild(cardModal);

// Modal state
let currentCardModal = null;

// Modal functions - optimized
function openCardModal(frontSrc, backSrc) {
  const modal = document.querySelector('.card-modal');
  const frontImg = modal.querySelector('#modal-front-img');
  const backImg = modal.querySelector('#modal-back-img');
  const wrapper = modal.querySelector('.modal-card-wrapper');
  const inner = modal.querySelector('.modal-card-inner');

  frontImg.src = frontSrc;
  backImg.src = backSrc;

  wrapper.classList.remove('flipped');
  inner.dataset.flipped = 'false';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
  currentCardModal = modal;
}

function closeCardModal() {
  const modal = document.querySelector('.card-modal');
  modal.classList.remove('active');
  const wrapper = modal.querySelector('.modal-card-wrapper');
  wrapper.classList.remove('flipped');
  const inner = modal.querySelector('.modal-card-inner');
  inner.dataset.flipped = 'false';
  document.body.style.overflow = '';
  currentCardModal = null;
}

function toggleCardFlip() {
  if (!currentCardModal) return;
  const wrapper = currentCardModal.querySelector('.modal-card-wrapper');
  const inner = currentCardModal.querySelector('.modal-card-inner');
  const isFlipped = inner.dataset.flipped === 'true';

  wrapper.classList.toggle('flipped', !isFlipped);
  inner.dataset.flipped = (!isFlipped).toString();
}

// Modal controls
const modalClose = document.querySelector('.modal-close');
const modalOverlay = document.querySelector('.modal-overlay');
const modalCardWrapper = document.querySelector('.modal-card-wrapper');

if (modalClose) modalClose.addEventListener('click', closeCardModal);
if (modalOverlay) modalOverlay.addEventListener('click', closeCardModal);
if (modalCardWrapper) modalCardWrapper.addEventListener('click', toggleCardFlip);

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  if (!currentCardModal || !currentCardModal.classList.contains('active')) return;

  if (e.key === 'Escape') {
    closeCardModal();
  } else if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleCardFlip();
  }
}, { passive: false });

// ===== OPTIMIZED ROW SETUP =====
const rows = document.querySelectorAll('.id-row');
rows.forEach(setupRow);

function setupRow(row) {
  const slider = row.querySelector('.id-scroll');
  const track = row.querySelector('.id-track');
  const hoverLeft = row.querySelector('.hover-left');
  const hoverRight = row.querySelector('.hover-right');
  const directionMultiplier = row.dataset.direction === 'reverse' ? -1 : 1;

  if (!slider || !track || !hoverLeft || !hoverRight) return;

  const baseSpeed = 0.2; // Very slow, smooth carousel motion
  let edgeBoost = 0;
  let isPaused = false;
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  let rafId = null;
  let lastTime = performance.now();

  const cards = Array.from(track.querySelectorAll('.id-card'));
  const firstDup = cards.find((card) => {
    const input = card.querySelector('input');
    return input && /d$/.test(input.id);
  });
  const loopEnabled = Boolean(firstDup);

  function getLoopWidth() {
    if (firstDup && firstDup.offsetLeft > 0) {
      return firstDup.offsetLeft;
    }
    return track.scrollWidth / 2;
  }

  if (directionMultiplier === -1 && loopEnabled) {
    requestAnimationFrame(() => {
      slider.scrollLeft = getLoopWidth();
    });
  }

  function autoScroll(currentTime) {
    // Only update if paused state changed or edgeBoost changed significantly
    const rawSpeed = baseSpeed + edgeBoost;
    if (!isPaused && rawSpeed !== 0) {
      slider.scrollLeft += rawSpeed * directionMultiplier;

      if (loopEnabled) {
        const loopWidth = getLoopWidth();
        if (directionMultiplier === 1 && slider.scrollLeft >= loopWidth) {
          slider.scrollLeft = 0;
        } else if (directionMultiplier === -1 && slider.scrollLeft <= 0) {
          slider.scrollLeft = loopWidth - 1;
        }
      }
    }

    rafId = requestAnimationFrame(autoScroll);
  }

  // Very aggressive throttling on mousemove
  let lastRampTime = 0;
  const rampThrottle = 32; // 30fps for hover zones

  function rampSpeed(e, zoneDirection) {
    const now = Date.now();
    if (now - lastRampTime < rampThrottle) return;
    lastRampTime = now;

    const zoneWidth = e.currentTarget.offsetWidth;
    const distance = zoneDirection === -1 ? zoneWidth - e.offsetX : e.offsetX;
    const intensity = Math.min(distance / zoneWidth, 1);
    edgeBoost = intensity * 0.8 * directionMultiplier * zoneDirection; // Very subtle speed increase
  }

  // Passive listeners for better scroll performance
  hoverLeft.addEventListener('mousemove', (e) => rampSpeed(e, -1), { passive: true });
  hoverRight.addEventListener('mousemove', (e) => rampSpeed(e, 1), { passive: true });
  hoverLeft.addEventListener('mouseleave', () => { edgeBoost = 0; }, { passive: true });
  hoverRight.addEventListener('mouseleave', () => { edgeBoost = 0; }, { passive: true });

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    isPaused = true;
    slider.classList.add('dragging');
    startX = e.pageX;
    startScroll = slider.scrollLeft;
  });

  const endDrag = () => {
    if (!isDown) return;
    isDown = false;
    isPaused = false;
    slider.classList.remove('dragging');
  };

  slider.addEventListener('mouseup', endDrag);
  slider.addEventListener('mouseleave', endDrag);

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const walk = e.pageX - startX;
    slider.scrollLeft = startScroll - walk;
  }, { passive: true });

  slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY;
  }, { passive: false });

  // Pause on card hover
  slider.addEventListener('mouseover', (e) => {
    if (e.target.closest('.id-card')) {
      isPaused = true;
    }
  }, { passive: true });

  slider.addEventListener('mouseout', (e) => {
    if (e.target.closest('.id-card')) {
      isPaused = false;
    }
  }, { passive: true });

  // Single-click handler for cards - opens fullscreen modal
  cards.forEach((card) => {
    card.addEventListener('click', (e) => {
      e.preventDefault();

      const frontImg = card.querySelector('.card-face.front img');
      const backImg = card.querySelector('.card-face.back img');

      if (frontImg && backImg) {
        const frontSrc = frontImg.src || frontImg.currentSrc;
        const backSrc = backImg.src;
        if (frontSrc && backSrc) {
          openCardModal(frontSrc, backSrc);
          isPaused = true;
        }
      }
    });
  });

  autoScroll(lastTime);
}

// ===== GALLERY SETUP =====
const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
  const galleryImages = Array.from(galleryGrid.querySelectorAll('img'));
  const galleryItems = Array.from(galleryGrid.children).filter((item) =>
    item.matches('picture, img')
  );
  const preloadQueue = galleryImages.map((img) => img.currentSrc || img.src).filter(Boolean);

  // Display all images - no hiding
  galleryItems.forEach((item) => {
    item.classList.remove('gallery-hidden');
  });

  const lightbox = document.querySelector('.gallery-lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  let currentIndex = 0;

  function displayImage(index) {
    const target = galleryImages[index];
    if (!lightboxImg || !lightboxCaption || !target) return;
    lightboxImg.classList.add('transitioning');
    setTimeout(() => {
      lightboxImg.src = target.dataset.full || target.src;
      lightboxCaption.textContent = target.alt || `Image ${index + 1}`;
      lightboxImg.classList.remove('transitioning');
    }, 180);
  }

  function openLightbox(index) {
    currentIndex = index;
    if (!lightbox) return;
    displayImage(currentIndex);
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  function navigate(delta) {
    currentIndex = (currentIndex + delta + galleryImages.length) % galleryImages.length;
    displayImage(currentIndex);
  }

  galleryImages.forEach((img, index) => {
    img.addEventListener('click', () => openLightbox(index));
  });

  if (lightbox) {
    lightbox.querySelectorAll('.lightbox-arrow').forEach((arrow) => {
      arrow.addEventListener('click', () => {
        const span = arrow.querySelector('.arrow');
        if (span) {
          span.classList.add('bouncing');
          setTimeout(() => span.classList.remove('bouncing'), 1400);
        }
        navigate(arrow.dataset.dir === 'next' ? 1 : -1);
      });
    });

    lightbox.querySelector('.lightbox-close')?.addEventListener('click', (event) => {
      const closeBtn = event.currentTarget;
      closeBtn.classList.add('bounce');
      setTimeout(() => closeBtn.classList.remove('bounce'), 400);
      closeLightbox();
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });
  }
}

// ===== PROJECTS GRID =====
const projectsGrid = document.querySelector('.projects-grid');
if (projectsGrid) {
  const projectCards = Array.from(projectsGrid.querySelectorAll('.project-card'));
  const previewLimit = 6;
  const hiddenCards = projectCards.slice(previewLimit);

  hiddenCards.forEach((card) => card.classList.add('project-hidden'));

  if (hiddenCards.length) {
    const projectsToggle = document.querySelector('.projects-toggle');
    const toggleContainer = projectsToggle || document.createElement('div');
    if (!projectsToggle) {
      toggleContainer.className = 'projects-toggle';
      projectsGrid.parentNode.insertBefore(toggleContainer, projectsGrid.nextSibling);
    }

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.className = 'projects-toggle-button';
    let expanded = false;

    const updateLabel = () => {
      toggleButton.textContent = expanded ? 'Show fewer projects' : `Show ${hiddenCards.length} more projects`;
      toggleButton.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    };
    updateLabel();

    toggleButton.addEventListener('click', () => {
      expanded = !expanded;
      hiddenCards.forEach((card) => card.classList.toggle('project-hidden', !expanded));
      updateLabel();
      if (!expanded) {
        projectsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });

    toggleContainer.appendChild(toggleButton);
  }
}

document.querySelectorAll('.project-link').forEach((link) => {
  link.addEventListener('click', () => {
    window.setTimeout(() => link.blur(), 0);
  });
});

document.body.classList.add('js');

// ===== REVEAL ANIMATIONS =====
const revealTargets = document.querySelectorAll('.reveal, .reveal-item');
if (revealTargets.length && 'IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px',
    }
  );

  revealTargets.forEach((target) => revealObserver.observe(target));
} else if (revealTargets.length) {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

// ===== HEADER SCROLL DETECTION - OPTIMIZED =====
const heroSection = document.querySelector('.hero');
if (heroSection) {
  let ticking = false;

  const toggleHeroState = () => {
    const heroHeight = heroSection.offsetHeight || 1;
    const threshold = heroHeight * 0.35;

    if (window.scrollY > threshold) {
      document.body.classList.add('scrolled');
    } else {
      document.body.classList.remove('scrolled');
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(toggleHeroState);
      ticking = true;
    }
  };

  toggleHeroState();
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', toggleHeroState);
}

// ===== PAGE INITIALIZATION =====
window.addEventListener('load', () => {
  // Only scroll to top if there's no hash anchor in the URL
  if (!window.location.hash) {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
});
