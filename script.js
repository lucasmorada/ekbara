const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  const cards = document.querySelectorAll(".division-card");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      cards.forEach(c => {
        if (c !== card) c.classList.remove("active");
      });
      card.classList.toggle("active");
    });
  });



