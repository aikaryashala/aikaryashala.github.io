const rows = document.querySelectorAll('.id-row');
rows.forEach(setupRow);

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
  const galleryImages = Array.from(galleryGrid.querySelectorAll('img'));
  const galleryItems = Array.from(galleryGrid.children).filter((item) =>
    item.matches('picture, img')
  );
  const preloadQueue = galleryImages.map((img) => img.currentSrc || img.src).filter(Boolean);
  const previewLimit = 9;
  const hiddenItems = galleryItems.slice(previewLimit);

  hiddenItems.forEach((item) => {
    item.classList.add('gallery-hidden');
  });

  if (hiddenItems.length) {
    const moreButton = document.createElement('button');
    moreButton.type = 'button';
    moreButton.className = 'gallery-more';
    moreButton.textContent = `+${hiddenItems.length} more`;
    const referenceItem = galleryItems[previewLimit];
    if (referenceItem) {
      galleryGrid.insertBefore(moreButton, referenceItem);
    } else {
      galleryGrid.appendChild(moreButton);
    }

    moreButton.addEventListener('click', () => {
      hiddenItems.forEach((item) => item.classList.remove('gallery-hidden'));
      moreButton.remove();
    });
  }

  const lightbox = document.querySelector('.gallery-lightbox');
  const lightboxImg = lightbox?.querySelector('img');
  const lightboxCaption = lightbox?.querySelector('.lightbox-caption');
  let currentIndex = 0;

  function displayImage(index) {
    const target = galleryImages[index];
    if (!lightboxImg || !lightboxCaption || !target) return;
    lightboxImg.classList.add('transitioning');
    setTimeout(() => {
      lightboxImg.src = target.src;
      lightboxCaption.textContent = target.alt || `Image ${index + 1}`;
      lightboxImg.classList.remove('transitioning');
    }, 180);
    const nextIndex = (index + 1) % galleryImages.length;
    const prevIndex = (index - 1 + galleryImages.length) % galleryImages.length;
    const next = galleryImages[nextIndex];
    const prev = galleryImages[prevIndex];
    if (next) {
      const preloadNext = new Image();
      preloadNext.src = next.currentSrc || next.src;
    }
    if (prev) {
      const preloadPrev = new Image();
      preloadPrev.src = prev.currentSrc || prev.src;
    }
  }

  function openLightbox(index) {
    currentIndex = index;
    if (!lightbox) return;
    displayImage(currentIndex);
    const nextIndex = (currentIndex + 1) % galleryImages.length;
    const prevIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    if (galleryImages[nextIndex]) {
      const preloadNext = new Image();
      preloadNext.src = galleryImages[nextIndex].currentSrc || galleryImages[nextIndex].src;
    }
    if (galleryImages[prevIndex]) {
      const preloadPrev = new Image();
      preloadPrev.src = galleryImages[prevIndex].currentSrc || galleryImages[prevIndex].src;
    }
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

  function preloadAllLightboxImages() {
    let index = 0;
    const step = () => {
      if (index >= preloadQueue.length) return;
      const src = preloadQueue[index];
      index += 1;
      const img = new Image();
      img.onload = () => setTimeout(step, 80);
      img.onerror = () => setTimeout(step, 80);
      img.src = src;
    };
    step();
  }

  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(preloadAllLightboxImages, { timeout: 2000 });
  } else {
    window.addEventListener('load', () => {
      setTimeout(preloadAllLightboxImages, 500);
    });
  }
}

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

function setupRow(row) {
  const slider = row.querySelector('.id-scroll');
  const track = row.querySelector('.id-track');
  const hoverLeft = row.querySelector('.hover-left');
  const hoverRight = row.querySelector('.hover-right');
  const directionMultiplier = row.dataset.direction === 'reverse' ? -1 : 1;

  if (!slider || !track || !hoverLeft || !hoverRight) return;

  const baseSpeed = 0.6;
  let edgeBoost = 0;
  let isPaused = false;
  let isDown = false;
  let startX = 0;
  let startScroll = 0;
  const cards = Array.from(track.querySelectorAll('.id-card'));
  const firstDup = cards.find((card) => {
    const input = card.querySelector('input');
    return input && /d$/.test(input.id);
  });

  function getLoopWidth() {
    if (firstDup && firstDup.offsetLeft > 0) {
      return firstDup.offsetLeft;
    }
    return track.scrollWidth / 2;
  }

  if (directionMultiplier === -1) {
    requestAnimationFrame(() => {
      slider.scrollLeft = getLoopWidth();
    });
  }

  function autoScroll() {
    const rawSpeed = baseSpeed + edgeBoost;
    if (!isPaused) {
      slider.scrollLeft += rawSpeed * directionMultiplier;
    }

    if (!isPaused) {
      normalizeScroll();
    }

    requestAnimationFrame(autoScroll);
  }

  function normalizeScroll() {
    const loopWidth = getLoopWidth();
    if (directionMultiplier === 1 && slider.scrollLeft >= loopWidth) {
      slider.scrollLeft = 0;
    } else if (directionMultiplier === -1 && slider.scrollLeft <= 0) {
      slider.scrollLeft = loopWidth - 1;
    }
  }

  function normalizeManualScroll() {
    const loopWidth = getLoopWidth();
    if (slider.scrollLeft >= loopWidth) {
      slider.scrollLeft = 0;
    } else if (slider.scrollLeft <= 0) {
      slider.scrollLeft = loopWidth - 1;
    }
  }

  function rampSpeed(e, zoneDirection) {
    const zoneWidth = e.currentTarget.offsetWidth;
    const distance =
      zoneDirection === -1 ? zoneWidth - e.offsetX : e.offsetX;
    const intensity = Math.min(distance / zoneWidth, 1);
    edgeBoost = intensity * 5 * directionMultiplier * zoneDirection;
  }

  hoverLeft.addEventListener('mousemove', (e) => rampSpeed(e, -1));
  hoverRight.addEventListener('mousemove', (e) => rampSpeed(e, 1));
  hoverLeft.addEventListener('mouseleave', () => (edgeBoost = 0));
  hoverRight.addEventListener('mouseleave', () => (edgeBoost = 0));

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX;
    startScroll = slider.scrollLeft;
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const walk = e.pageX - startX;
    slider.scrollLeft = startScroll - walk;
    normalizeManualScroll();
  });

  slider.addEventListener('wheel', (e) => {
    e.preventDefault();
    slider.scrollLeft += e.deltaY;
    normalizeManualScroll();
  });

  slider.addEventListener('mouseover', (e) => {
    if (e.target.closest('.id-card')) {
      isPaused = true;
    }
  });

  slider.addEventListener('mouseout', (e) => {
    if (e.target.closest('.id-card')) {
      isPaused = false;
    }
  });

  autoScroll();
}
