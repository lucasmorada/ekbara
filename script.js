// === ELEMENTOS PARA O SISTEMA DE ÁREA ATIVA ===
const areaSections = document.querySelectorAll('.area-section');
const imageItems = document.querySelectorAll('.image-item');
const progressBars = document.querySelectorAll('.progress-bar');

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.6 // porcentagem visível para considerar ativo
};

// Função chamada quando uma área entra na tela
function updateActiveArea(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      imageItems.forEach(item => item.classList.toggle('active', item.dataset.id === id));
      progressBars.forEach(bar => bar.classList.toggle('active', bar.dataset.id === id));
    }
  });
}

// JS para animação ao scroll da seção "Quem Somos"
const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.fade-in').forEach(el => fadeInObserver.observe(el));



// === HEADER AO SCROLL ===
const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// === OBSERVADOR DE SEÇÕES ===
const observer = new IntersectionObserver(updateActiveArea, observerOptions);
areaSections.forEach(section => observer.observe(section));

// Estado inicial
if (areaSections.length > 0) {
  const firstId = areaSections[0].id;
  imageItems.forEach(item => item.classList.toggle('active', item.dataset.id === firstId));
  progressBars.forEach(bar => bar.classList.toggle('active', bar.dataset.id === firstId));
}

const container = document.querySelector('.carousel-container');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const range = document.getElementById('carousel-range');

const scrollAmount = 300; // quantidade que o carrossel anda com o botão

// Botões
prevBtn.addEventListener('click', () => {
  container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

nextBtn.addEventListener('click', () => {
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

// Barra de rolagem
container.addEventListener('scroll', () => {
  const maxScroll = container.scrollWidth - container.clientWidth;
  range.value = (container.scrollLeft / maxScroll) * 100;
});

range.addEventListener('input', () => {
  const maxScroll = container.scrollWidth - container.clientWidth;
  container.scrollLeft = (range.value / 100) * maxScroll;
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



(function () {
  const el = document.getElementById('codeFooter');
  const raw = el.getAttribute('data-raw') || '';

  function startTyping() {
    let i = 0;
    function typeChar() {
      if (i < raw.length) {
        const partial = raw.slice(0, i + 1);
        el.innerHTML = highlight(escapeHtml(partial)); // garante que tags só aparecem completas
        i++;
        const delay = raw[i - 1] === '\n' ? 40 : 22;
        setTimeout(typeChar, delay);
      }
    }
    typeChar();
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function highlight(t) {
    t = t.replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>');
    t = t.replace(/('[^']*'|"[^"]*")/g, '<span class="token-value">$1</span>');
    t = t.replace(
      /\b(const|let|var|function|return|=>)\b/g,
      '<span class="token-key">$1</span>'
    );
    t = t.replace(
      /\b(console|log|fazerSite)\b/g,
      '<span class="token-func">$1</span>'
    );
    return t;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startTyping();
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(el);
})();
