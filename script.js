// === HEADER AO SCROLL ===
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

const observer = new IntersectionObserver(updateActiveArea, observerOptions);
areaSections.forEach(section => observer.observe(section));

// Estado inicial
if (areaSections.length > 0) {
  const firstId = areaSections[0].id;
  imageItems.forEach(item => item.classList.toggle('active', item.dataset.id === firstId));
  progressBars.forEach(bar => bar.classList.toggle('active', bar.dataset.id === firstId));
}

// === CARROSSEL DA EQUIPE (DRAG HORIZONTAL) ===
const teamCarousel = document.querySelector('.carousel');
let isDown = false;
let startX;
let scrollLeft;

teamCarousel.addEventListener('mousedown', (e) => {
  isDown = true;
  teamCarousel.classList.add('active');
  startX = e.pageX - teamCarousel.offsetLeft;
  scrollLeft = teamCarousel.scrollLeft;
});

teamCarousel.addEventListener('mouseleave', () => {
  isDown = false;
  teamCarousel.classList.remove('active');
});

teamCarousel.addEventListener('mouseup', () => {
  isDown = false;
  teamCarousel.classList.remove('active');
});

teamCarousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - teamCarousel.offsetLeft;
  const walk = (x - startX) * 1;
  teamCarousel.scrollLeft = scrollLeft - walk;
});

// === CARROSSEL DE MARCAS COM ANIMAÇÃO ===
const brandsCarousel = document.getElementById('brandsCarousel');
if (brandsCarousel) {
  const track = brandsCarousel.querySelector('.carousel-track');
  let isDragging = false;
  let startXBrands;
  let scrollLeftBrands;

  brandsCarousel.addEventListener('mousedown', (e) => {
    isDragging = true;
    startXBrands = e.pageX - brandsCarousel.offsetLeft;
    scrollLeftBrands = brandsCarousel.scrollLeft;
    if (track) track.style.animationPlayState = 'paused';
    brandsCarousel.style.cursor = 'grabbing';
  });

  brandsCarousel.addEventListener('mouseleave', () => {
    if (isDragging) resumeScroll();
  });

  brandsCarousel.addEventListener('mouseup', () => {
    if (isDragging) resumeScroll();
  });

  brandsCarousel.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - brandsCarousel.offsetLeft;
    const walk = (x - startXBrands) * 1.5;
    brandsCarousel.scrollLeft = scrollLeftBrands - walk;
  });

  function resumeScroll() {
    isDragging = false;
    if (track) track.style.animationPlayState = 'running';
    brandsCarousel.style.cursor = 'grab';
  }
}
