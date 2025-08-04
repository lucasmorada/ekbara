const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  const cards = document.querySelectorAll('.card');

  cards.forEach(card => {
    card.addEventListener('click', () => {
      const isActive = card.classList.contains('active');

      cards.forEach(c => c.classList.remove('active'));

      if (!isActive) {
        card.classList.add('active');
      }
    });
  });

