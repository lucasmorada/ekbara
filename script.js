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


// Código para aparecer como se estivesse sendo digitado
const codeLines = [
  `<span class="token-comment">// Melhores sites que criamos</span>`,
  `<span class="token-key">const</span> <span class="token-func">melhoresSites</span> = [`,
  `  { <span class="token-attr">nome</span>: <span class="token-value">'Site Corporativo Premium'</span>, <span class="token-attr">link</span>: <span class="token-value">'https://exemplo1.com'</span> },`,
  `  { <span class="token-attr">nome</span>: <span class="token-value">'Plataforma Interativa'</span>, <span class="token-attr">link</span>: <span class="token-value">'https://exemplo2.com'</span> },`,
  `  { <span class="token-attr">nome</span>: <span class="token-value">'Loja Virtual Ultra Rápida'</span>, <span class="token-attr">link</span>: <span class="token-value">'https://exemplo3.com'</span> }`,
  `];`,
  ``,
  `<span class="token-func">mostrarSites</span>(melhoresSites);`,
  ``,
  `<span class="token-key">function</span> <span class="token-func">mostrarSites</span>(<span class="token-attr">lista</span>) {`,
  `  lista.<span class="token-func">forEach</span>(site => {`,
  `    console.<span class="token-func">log</span>(<span class="token-value">\`🔥 ${site.nome} → ${site.link}\`</span>);`,
  `  });`,
  `}`
];

let index = 0;
let charIndex = 0;
let codeArea = document.getElementById("codeArea");

function typeCode() {
  if (index < codeLines.length) {
    if (charIndex < codeLines[index].length) {
      codeArea.innerHTML += codeLines[index].charAt(charIndex);
      charIndex++;
      setTimeout(typeCode, 15);
    } else {
      codeArea.innerHTML += "\n";
      index++;
      charIndex = 0;
      setTimeout(typeCode, 200);
    }
  }
}

typeCode();