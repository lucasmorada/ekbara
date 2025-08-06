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

document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.getElementById('carouselTrack');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');

    let isDown = false;
    let startX;
    let scrollLeft;

    // Lógica para arrastar com o mouse
    carouselTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        carouselTrack.classList.add('active');
        startX = e.pageX - carouselTrack.offsetLeft;
        scrollLeft = carouselTrack.scrollLeft;
    });

    carouselTrack.addEventListener('mouseleave', () => {
        isDown = false;
        carouselTrack.classList.remove('active');
    });

    carouselTrack.addEventListener('mouseup', () => {
        isDown = false;
        carouselTrack.classList.remove('active');
    });

    carouselTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carouselTrack.offsetLeft;
        const walk = (x - startX) * 2; // Multiplicador para sensibilidade
        carouselTrack.scrollLeft = scrollLeft - walk;
    });

    // Lógica para botões de navegação
    const scrollAmount = 340; // Largura do cartão + margem (320px + 20px)

    prevButton.addEventListener('click', () => {
        carouselTrack.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });

    nextButton.addEventListener('click', () => {
        carouselTrack.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    // Lógica para "loop infinito" (simulado) nos botões de navegação
    // Quando chega ao final, volta para o início e vice-versa
    carouselTrack.addEventListener('scroll', () => {
        // Se rolou para o final, volta para o início
        if (carouselTrack.scrollLeft + carouselTrack.clientWidth >= carouselTrack.scrollWidth - 1) {
            // Adiciona um pequeno atraso para a transição suave antes de pular
            setTimeout(() => {
                carouselTrack.scrollLeft = 0;
            }, 300); // Tempo da transição smooth
        }
        // Se rolou para o início, e não é o primeiro scroll, vai para o final
        else if (carouselTrack.scrollLeft <= 1) {
             setTimeout(() => {
                carouselTrack.scrollLeft = carouselTrack.scrollWidth;
            }, 300);
        }
    });
});


