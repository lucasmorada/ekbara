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


const carouselEl = document.querySelector('.carousel');
let isDown = false;
let startX;
let scrollLeft;

carouselEl.addEventListener('mousedown', (e) => {
  isDown = true;
  carouselEl.classList.add('active');
  startX = e.pageX - carouselEl.offsetLeft;
  scrollLeft = carouselEl.scrollLeft;
});
carouselEl.addEventListener('mouseleave', () => {
  isDown = false;
  carouselEl.classList.remove('active');
});
carouselEl.addEventListener('mouseup', () => {
  isDown = false;
  carouselEl.classList.remove('active');
});
carouselEl.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carouselEl.offsetLeft;
  const walk = (x - startX) * 2; // Velocidade
  carouselEl.scrollLeft = scrollLeft - walk;
});



