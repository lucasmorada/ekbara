// Altera o fundo do header ao rolar a página
const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    header.classList.remove('transparent');
    header.classList.add('solid');
  } else {
    header.classList.add('transparent');
    header.classList.remove('solid');
  }
});

// Inicia transparente
header.classList.add('transparent');
