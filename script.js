const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  const container = document.querySelector('.tabs-container');
const tabs = document.querySelectorAll('.tab');
const arrowLeft = document.getElementById('arrow-left');
const arrowRight = document.getElementById('arrow-right');

let scrollAmount = 0;
const scrollStep = 320;

function updateArrows() {
  arrowLeft.classList.toggle('hidden', container.scrollLeft === 0);
  arrowRight.classList.toggle('hidden', container.scrollLeft + container.clientWidth >= container.scrollWidth - 1);
}

arrowLeft.addEventListener('click', () => {
  container.scrollBy({ left: -scrollStep, behavior: 'smooth' });
  setTimeout(updateArrows, 300);
});

arrowRight.addEventListener('click', () => {
  container.scrollBy({ left: scrollStep, behavior: 'smooth' });
  setTimeout(updateArrows, 300);
});

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});

window.addEventListener('load', updateArrows);
window.addEventListener('resize', updateArrows);




