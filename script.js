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

  const container = document.getElementById('teamContainer');
  const nextBtn = document.getElementById('next');
  const prevBtn = document.getElementById('prev');

  nextBtn.addEventListener('click', () => {
    container.scrollBy({ left: 300, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    container.scrollBy({ left: -300, behavior: 'smooth' });
  });

  const teamMembers = [
    {
      name: "João Silva",
      title: "CEO & Fundador",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "linear-gradient(to top, rgba(219,39,119,0.5) 0%, rgba(147,51,234,0.5) 100%)"
    },
    {
      name: "Maria Oliveira",
      title: "Diretora de Marketing",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "linear-gradient(to top, rgba(249,115,22,0.5) 0%, rgba(34,197,94,0.5) 100%)"
    },
    {
      name: "Pedro Costa",
      title: "Líder de Desenvolvimento",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "linear-gradient(to top, rgba(59,130,246,0.5) 0%, rgba(6,182,212,0.5) 100%)"
    },
    {
      name: "Ana Santos",
      title: "Gerente de Projetos",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "linear-gradient(to top, rgba(239,68,68,0.5) 0%, rgba(250,204,21,0.5) 100%)"
    },
    {
      name: "Lucas Pereira",
      title: "Designer UX/UI",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "linear-gradient(to top, rgba(20,184,166,0.5) 0%, rgba(99,102,241,0.5) 100%)"
    },
    {
      name: "Sofia Mendes",
      title: "Especialista em Dados",
      image: "/placeholder.svg?height=400&width=400",
      gradient: "linear-gradient(to top, rgba(168,85,247,0.5) 0%, rgba(236,72,153,0.5) 100%)"
    },
  ];

  document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.getElementById('carouselTrack');
    teamMembers.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('team-card');
      card.innerHTML = `
        <div class="team-card-image-wrapper">
          <img src="${member.image}" alt="Foto de ${member.name}" class="team-card-image">
          <div class="team-card-gradient" style="background: ${member.gradient};"></div>
          <div class="team-card-content">
            <h3 class="team-card-name">${member.name}</h3>
            <p class="team-card-title">${member.title}</p>
          </div>
        </div>`;
      carouselTrack.appendChild(card);
    });
  });


