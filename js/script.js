const rows = document.querySelectorAll('.id-row');
rows.forEach(setupRow);

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
