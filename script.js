const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  document.addEventListener('DOMContentLoaded', () => {
    const areaSections = document.querySelectorAll('.area-section');
    const imageItems = document.querySelectorAll('.image-item');
    const progressBars = document.querySelectorAll('.progress-bar');

    const observerOptions = {
        threshold: 0.6, // Quando 60% do elemento está visível
        rootMargin: '-20% 0px -20% 0px' // Ajusta o viewport para o cálculo de intersecção
    };

    const updateActiveArea = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const activeId = entry.target.id;

                // Atualiza a imagem ativa
                imageItems.forEach(item => {
                    if (item.dataset.id === activeId) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });

                // Atualiza a barra de progresso ativa
                progressBars.forEach(bar => {
                    if (bar.dataset.id === activeId) {
                        bar.classList.add('active');
                    } else {
                        bar.classList.remove('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(updateActiveArea, observerOptions);

    // Observa cada seção de texto
    areaSections.forEach(section => {
        observer.observe(section);
    });

    // Define o estado ativo inicial para o primeiro item ao carregar a página
    if (areaSections.length > 0) {
        const firstId = areaSections[0].id;
        imageItems.forEach(item => {
            if (item.dataset.id === firstId) {
                item.classList.add('active');
            }
        });
        progressBars.forEach(bar => {
            if (bar.dataset.id === firstId) {
                bar.classList.add('active');
            }
        });
    }
});

  const genericCarousel = document.querySelector('.carousel');
if (genericCarousel) {
  let isDraggingGeneric = false;
  let startXGeneric;
  let scrollLeftGeneric;

  genericCarousel.addEventListener('mousedown', (e) => {
    isDraggingGeneric = true;
    startXGeneric = e.pageX - genericCarousel.offsetLeft;
    scrollLeftGeneric = genericCarousel.scrollLeft;
    genericCarousel.style.cursor = 'grabbing';
  });

  genericCarousel.addEventListener('mouseleave', () => {
    isDraggingGeneric = false;
    genericCarousel.style.cursor = 'grab';
  });

  document.addEventListener('mouseup', () => {
    isDraggingGeneric = false;
    genericCarousel.style.cursor = 'grab';
  });

  genericCarousel.addEventListener('mousemove', (e) => {
    if (!isDraggingGeneric) return;
    e.preventDefault();
    const x = e.pageX - genericCarousel.offsetLeft;
    const walk = (x - startXGeneric) * 2; // Velocidade do arrasto
    genericCarousel.scrollLeft = scrollLeftGeneric - walk;
  });
}

// Carrossel de marcas (id #brandsCarousel)
const brandsCarousel = document.getElementById('brandsCarousel');
if (brandsCarousel) {
  const track = brandsCarousel.querySelector('.carousel-track');

  let isDraggingBrands = false;
  let startXBrands;
  let scrollLeftBrands;

  brandsCarousel.addEventListener('mousedown', (e) => {
    isDraggingBrands = true;
    startXBrands = e.pageX - brandsCarousel.offsetLeft;
    scrollLeftBrands = brandsCarousel.scrollLeft;
    if (track) track.style.animationPlayState = 'paused';
    brandsCarousel.style.cursor = 'grabbing';
  });

  brandsCarousel.addEventListener('mouseleave', () => {
    if (isDraggingBrands) resumeBrandsScroll();
  });

  brandsCarousel.addEventListener('mouseup', () => {
    if (isDraggingBrands) resumeBrandsScroll();
  });

  brandsCarousel.addEventListener('mousemove', (e) => {
    if (!isDraggingBrands) return;
    e.preventDefault();
    const x = e.pageX - brandsCarousel.offsetLeft;
    const walk = (x - startXBrands) * 1.5;
    brandsCarousel.scrollLeft = scrollLeftBrands - walk;
  });

  function resumeBrandsScroll() {
    isDraggingBrands = false;
    if (track) track.style.animationPlayState = 'running';
    brandsCarousel.style.cursor = 'grab';
  }
}