const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  const planetsData = [
    { name: "Creative", link: "/creative" },
    { name: "Atelier", link: "/atelier" },
    { name: "Web", link: "/web" },
    { name: "Sounds", link: "/sounds" },
    { name: "Forma", link: "/forma" }
  ];

  const container = document.querySelector(".planets");
  let currentIndex = 0;

  function render() {
    container.innerHTML = "";

    const prevIndex = (currentIndex - 1 + planetsData.length) % planetsData.length;
    const nextIndex = (currentIndex + 1) % planetsData.length;

    [prevIndex, currentIndex, nextIndex].forEach((i, idx) => {
      const planet = document.createElement("a");
      planet.className = "planet-card " + (i === currentIndex ? "active" : "inactive");
      planet.textContent = planetsData[i].name;
      planet.href = planetsData[i].link;
      container.appendChild(planet);
    });
  }

  document.querySelector(".nav.left").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + planetsData.length) % planetsData.length;
    render();
  });

  document.querySelector(".nav.right").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % planetsData.length;
    render();
  });

  render();