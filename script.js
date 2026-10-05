const scrollProgress = document.querySelector('.scroll-progress');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const height = document.documentElement.scrollHeight - window.innerHeight;
  scrollProgress.style.width = `${height > 0 ? (scrollTop / height) * 100 : 0}%`;
}
window.addEventListener('scroll', updateScrollProgress, { passive: true });
updateScrollProgress();

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => observer.observe(el));

const toggle = document.querySelector('.menu-toggle');
const header = document.querySelector('.site-header');
if (toggle) {
  toggle.addEventListener('click', () => {
    const open = header.classList.toggle('menu-open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
}

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    header?.classList.remove('menu-open');
    toggle?.setAttribute('aria-expanded', 'false');
  });
});

const cursor = document.querySelector('.cursor');
if (cursor && window.matchMedia('(pointer:fine)').matches) {
  let mouseX = -100, mouseY = -100, currentX = -100, currentY = -100;
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.add('is-active');
  }, { passive: true });

  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hover'));
  });

  function animateCursor() {
    currentX += (mouseX - currentX) * 0.16;
    currentY += (mouseY - currentY) * 0.16;
    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
}

document.querySelectorAll('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});
