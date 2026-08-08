const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    }
  },
  {
    threshold: 0.2,
    rootMargin: '0px 0px -10% 0px',
  }
);

revealElements.forEach((element) => observer.observe(element));

const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
  const moveHandler = (event) => {
    const bounds = heroVisual.getBoundingClientRect();
    const pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    const pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;

    heroVisual.style.setProperty('--tilt-x', `${pointerX * 8}deg`);
    heroVisual.style.setProperty('--tilt-y', `${pointerY * -8}deg`);
  };

  heroVisual.addEventListener('pointermove', moveHandler);
  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.removeProperty('--tilt-x');
    heroVisual.style.removeProperty('--tilt-y');
  });

  heroVisual.addEventListener('pointermove', () => {
    heroVisual.style.transform = 'perspective(1400px) rotateX(var(--tilt-y, 0deg)) rotateY(var(--tilt-x, 0deg))';
  });

  heroVisual.addEventListener('pointerleave', () => {
    heroVisual.style.transform = '';
  });
}
