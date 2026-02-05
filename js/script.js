const slider = document.querySelector('.id-scroll');
const track = document.querySelector('.id-track');
const hoverLeft = document.querySelector('.hover-left');
const hoverRight = document.querySelector('.hover-right');

/* =========================
   AUTO SCROLL CORE
========================= */
let baseSpeed = 0.6;     // default speed
let edgeBoost = 0;       // added by mouse distance
let autoRAF;

function autoScroll() {
  slider.scrollLeft += baseSpeed + edgeBoost;

  // infinite loop
  if (slider.scrollLeft >= track.scrollWidth / 2) {
    slider.scrollLeft = 0;
  }

  autoRAF = requestAnimationFrame(autoScroll);
}

// 🔥 START AUTOMATICALLY ON PAGE LOAD
autoScroll();

/* =========================
   EDGE SPEED RAMP
========================= */
function rampSpeed(e, direction) {
  const zoneWidth = e.currentTarget.offsetWidth;

  const distance =
    direction === -1
      ? zoneWidth - e.offsetX   // left edge
      : e.offsetX;              // right edge

  const intensity = Math.min(distance / zoneWidth, 1);

  // ramp smoothly (max ±3)
  edgeBoost = intensity * 5 * direction;
}

hoverLeft.addEventListener('mousemove', (e) => {
  rampSpeed(e, -1);
});

hoverRight.addEventListener('mousemove', (e) => {
  rampSpeed(e, 1);
});

hoverLeft.addEventListener('mouseleave', () => {
  edgeBoost = 0;
});

hoverRight.addEventListener('mouseleave', () => {
  edgeBoost = 0;
});

/* =========================
   DRAG SUPPORT
========================= */
let isDown = false;
let startX;
let startScroll;

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
});

/* =========================
   MOUSE WHEEL
========================= */
slider.addEventListener('wheel', (e) => {
  e.preventDefault();
  slider.scrollLeft += e.deltaY;
});

