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

  // Data of team/testimonials
  const testimonials = [
    {
      name: "John Davis",
      role: "Sales Director",
      company: "Atlassian",
      quote: "Framify has completely transformed my design workflow!",
      photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/d9869c25-783c-41d6-934d-406ec6a32370.png",
      companyLogo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/9588dc2f-ab2d-49c0-9c91-d8a054a2de7a.png"
    },
    {
      name: "Sophia Turner",
      role: "Product Manager",
      company: "Atlassian",
      quote: "Framify has completely transformed my design workflow!",
      photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/6ad6e89a-07ef-4aea-8324-078917669384.png",
      companyLogo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/df853038-8a93-493e-adab-337f7d5127ae.png"
    },
    {
      name: "Michael Brown",
      role: "Lead Developer",
      company: "Atlassian",
      quote: "Framify has completely transformed my design workflow!",
      photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/c26f58cf-6865-40e3-8a34-783c5e09f216.png",
      companyLogo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/8101807f-58ff-47c7-b128-b1acfa1b4edb.png"
    },
    {
      name: "Isabella Evans",
      role: "UX Designer",
      company: "Atlassian",
      quote: "Framify has completely transformed my design workflow!",
      photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/4fd4ce99-2e4e-4397-99b6-76664397a46f.png",
      companyLogo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/500f7970-0471-49ec-960e-1b32b104da0b.png"
    },
    {
      name: "David Wilson",
      role: "Marketing Head",
      company: "Atlassian",
      quote: "Framify has completely transformed my design workflow!",
      photo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/7f203570-b4b4-41ba-8e65-b0124cecdfb2.png",
      companyLogo: "https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/f4b2e4cf-82cf-44f8-94ed-d40c0af8e94a.png"
    }
  ];

  const carouselTrack = document.getElementById('carouselTrack');

  // Duplicate cards for infinite effect
  function createCard(testimonial) {
    const card = document.createElement('li');
    card.className = 'card';
    card.setAttribute('role', 'listitem');
    card.setAttribute('tabindex', '0');
    card.innerHTML = `
      <div class="image-container">
        <img src="${testimonial.photo}" alt="Portrait photo of ${testimonial.name} with vibrant colored background" loading="lazy" onerror="this.onerror=null;this.src='https://storage.googleapis.com/workspace-0f70711f-8b4e-4d94-86f1-2a93ccde5887/image/336361c2-e164-4bf4-a410-3f3776fec38f.png';" />
      </div>
      <p class="testimonial-quote">"${testimonial.quote}"</p>
      <div class="card-footer">
        <div class="person-info">
          <span class="person-name">${testimonial.name}</span>
          <span class="person-role">${testimonial.role}</span>
        </div>
        <img src="${testimonial.companyLogo}" alt="${testimonial.company} logo" class="company-logo" loading="lazy" onerror="this.style.opacity='0.1';" />
      </div>
    `;
    return card;
  }

  // Build carousel with duplicated sets to simulate infinity
  function buildCarousel() {
    carouselTrack.innerHTML = '';
    // We will add three sets of the cards
    for (let repeat = 0; repeat < 3; repeat++) {
      testimonials.forEach(t => {
        carouselTrack.appendChild(createCard(t));
      });
    }
  }

  buildCarousel();

  // Scroll carousel for infinite effect
  const cardWidth = 320 + 20; // width + gap approx (gap is 1.25rem ~20px in px)
  let isDragging = false;
  let startX;
  let scrollLeft;

  const carousel = carouselTrack.parentElement;

  carouselTrack.scrollLeft = carouselTrack.scrollWidth / 3;

  // Loop scroll for infinite effect
  function loopScroll(){
    const scrollWidth = carouselTrack.scrollWidth;
    const third = scrollWidth / 3;
    if(carouselTrack.scrollLeft >= third * 2){
      carouselTrack.scrollLeft -= third;
    } else if (carouselTrack.scrollLeft <= 0){
      carouselTrack.scrollLeft += third;
    }
  }

  // Listen for mouse drag events
  carouselTrack.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - carouselTrack.offsetLeft;
    scrollLeft = carouselTrack.scrollLeft;
    carouselTrack.style.cursor = 'grabbing';
  });

  carouselTrack.addEventListener('mouseleave', () => {
    isDragging = false;
    carouselTrack.style.cursor = 'grab';
  });

  carouselTrack.addEventListener('mouseup', () => {
    isDragging = false;
    carouselTrack.style.cursor = 'grab';
  });

  carouselTrack.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselTrack.offsetLeft;
    const walk = (startX - x) * 2; //scroll-fast
    carouselTrack.scrollLeft = scrollLeft + walk;
    loopScroll();
  });

  // Touch support (mobile)
  carouselTrack.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].pageX - carouselTrack.offsetLeft;
    scrollLeft = carouselTrack.scrollLeft;
  });

  carouselTrack.addEventListener('touchend', () => {
    isDragging = false;
  });

  carouselTrack.addEventListener('touchmove', (e) => {
    if(!isDragging) return;
    const x = e.touches[0].pageX - carouselTrack.offsetLeft;
    const walk = (startX - x) * 2;
    carouselTrack.scrollLeft = scrollLeft + walk;
    loopScroll();
  });

  // Arrow buttons scroll by card width
  document.getElementById('arrowLeft').addEventListener('click', () => {
    smoothScrollBy(-cardWidth * 2);
  });
  document.getElementById('arrowRight').addEventListener('click', () => {
    smoothScrollBy(cardWidth * 2);
  });

  function smoothScrollBy(distance) {
    let start = carouselTrack.scrollLeft;
    let end = start + distance;
    const scrollWidth = carouselTrack.scrollWidth;
    const third = scrollWidth / 3;

    // Clamp and fix for infinite scroll loop on manual scrolls
    if(end >= third * 2){
      end -= third;
    } else if(end <= 0){
      end += third;
    }
    let startTime = null;

    function animateScroll(timestamp) {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const easeInOutQuad = progress => {
        return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      }
      let percent = progress / 300;
      percent = percent > 1 ? 1 : percent;
      const easePercent = easeInOutQuad(percent);
      carouselTrack.scrollLeft = start + (end - start) * easePercent;
      if (percent < 1) {
        window.requestAnimationFrame(animateScroll);
      } else {
        loopScroll();
      }
    }
    window.requestAnimationFrame(animateScroll);
  }

  // Accessibility improvement: keyboard scroll with arrow keys when focused
  carousel.addEventListener('keydown', e => {
    if(e.key === "ArrowRight"){
      e.preventDefault();
      smoothScrollBy(cardWidth);
    } else if(e.key === "ArrowLeft"){
      e.preventDefault();
      smoothScrollBy(-cardWidth);
    }
  });

  // Initial cursor style
  carouselTrack.style.cursor = 'grab';


