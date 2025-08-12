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

// === CARROSSEL DA EQUIPE (DRAG HORIZONTAL) ===
const teamCarousel = document.querySelector('.carousel');
if (teamCarousel) {
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
    const walk = (x - startX) * 1; // sensibilidade
    teamCarousel.scrollLeft = scrollLeft - walk;
  });
}

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


(function(){
  const el = document.getElementById('codeFooter');
  const raw = el.getAttribute('data-raw') || '';
  el.textContent = ''; // start empty

  let i = 0;
  function typeChar() {
    if (i < raw.length) {
      el.textContent += raw[i++];
      // small pause for newlines to feel natural
      const delay = raw[i-1] === '\n' ? 40 : 22;
      setTimeout(typeChar, delay);
    } else {
      // after typing, wait and then replace with colored HTML
      setTimeout(() => {
        el.innerHTML = highlight(raw);
      }, 400);
    }
  }
  typeChar();

  // simple highlighter (works for this small footer)
  function escapeHtml(s){ return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
  function highlight(s){
    let t = escapeHtml(s);
    // comments
    t = t.replace(/(\/\/.*)/g, '<span class="token-comment">$1</span>');
    // strings
    t = t.replace(/('[^']*'|"[^"]*")/g, '<span class="token-value">$1</span>');
    // keywords
    t = t.replace(/\b(const|let|var|function|return|=>)\b/g, '<span class="token-key">$1</span>');
    // funcs / console / nomes
    t = t.replace(/\b(console|log|fazerSite)\b/g, '<span class="token-func">$1</span>');
    // keep line breaks
    return t;
  }
})();