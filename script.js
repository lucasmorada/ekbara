document.addEventListener('DOMContentLoaded', () => {
  console.log("Script carregado!");

  // === HEADER AO SCROLL ===
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // === ÁREAS INTERATIVAS COM IMAGENS E PROGRESSO ===
  const areaSections = document.querySelectorAll('.area-section');
  const imageItems = document.querySelectorAll('.image-item');
  const progressBars = document.querySelectorAll('.progress-bar');

  const observerOptions = {
    threshold: 0.6,
    rootMargin: '-20% 0px -20% 0px'
  };

  const updateActiveArea = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.id;

        imageItems.forEach(item => {
          item.classList.toggle('active', item.dataset.id === activeId);
        });

        progressBars.forEach(bar => {
          bar.classList.toggle('active', bar.dataset.id === activeId);
        });
      }
    });
  };

  const observer = new IntersectionObserver(updateActiveArea, observerOptions);
  areaSections.forEach(section => observer.observe(section));

  // Estado inicial
  if (areaSections.length > 0) {
    const firstId = areaSections[0].id;
    imageItems.forEach(item => item.classList.toggle('active', item.dataset.id === firstId));
    progressBars.forEach(bar => bar.classList.toggle('active', bar.dataset.id === firstId));
  }

  // === CARROSSEL DA EQUIPE (DRAG HORIZONTAL) ===
  const carouselEl = document.querySelector('.carousel');
  if (carouselEl) {
    let isDown = false;
    let startX;
    let scrollLeft;

    carouselEl.addEventListener('mousedown', (e) => {
      isDown = true;
      startX = e.pageX - carouselEl.offsetLeft;
      scrollLeft = carouselEl.scrollLeft;
    });

    carouselEl.addEventListener('mouseleave', () => {
      isDown = false;
    });

    document.addEventListener('mouseup', () => {
      isDown = false;
    });

    carouselEl.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carouselEl.offsetLeft;
      const walk = (x - startX) * 2;
      carouselEl.scrollLeft = scrollLeft - walk;
    });
  }

  // === CARROSSEL DE MARCAS COM ANIMAÇÃO ===
  const carousel = document.getElementById('brandsCarousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    let isDragging = false;
    let startXBrands;
    let scrollLeftBrands;

    carousel.addEventListener('mousedown', (e) => {
      isDragging = true;
      startXBrands = e.pageX - carousel.offsetLeft;
      scrollLeftBrands = carousel.scrollLeft;
      if (track) track.style.animationPlayState = 'paused';
      carousel.style.cursor = 'grabbing';
    });

    carousel.addEventListener('mouseleave', () => {
      if (isDragging) resumeScroll();
    });

    carousel.addEventListener('mouseup', () => {
      if (isDragging) resumeScroll();
    });

    carousel.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = (x - startXBrands) * 1.5;
      carousel.scrollLeft = scrollLeftBrands - walk;
    });

    function resumeScroll() {
      isDragging = false;
      if (track) track.style.animationPlayState = 'running';
      carousel.style.cursor = 'grab';
    }
  }
});
