const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  const ekbaraTabs = document.querySelectorAll('.ekbara-divisions-tabs .tab');

ekbaraTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    ekbaraTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
  });
});
