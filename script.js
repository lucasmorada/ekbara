const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  const data = [
    {
      name: "Dev",
      color: "#1e3a8a",
      title: "Ekb... Dev",
      text: "Desenvolvemos soluções digitais sob medida para sua ideia ganhar vida com tecnologia de ponta."
    },
    {
      name: "Creative",
      color: "#7c3aed",
      title: "Ekb... Creative",
      text: "Criatividade em sua forma mais pura — design gráfico, direção de arte e experiências únicas."
    },
    {
      name: "Atelier",
      color: "#e11d48",
      title: "Ekb... Atelier",
      text: "Nosso espaço experimental onde ideias se transformam em realidade visual e artística."
    },
    {
      name: "Sounds",
      color: "#059669",
      title: "Ekb... Sounds",
      text: "Produção musical e sonora com identidade forte e marcante, pra fazer sua marca cantar."
    },
    {
      name: "Forma",
      color: "#d97706",
      title: "Ekb... Forma",
      text: "Formas que comunicam — arquitetura, produto e identidade espacial como expressão da marca."
    }
  ];

  let currentIndex = 0;

  const carousel = document.getElementById("carousel");
  const infoBox = document.getElementById("infoBox");
  const infoTitle = document.getElementById("infoTitle");
  const infoText = document.getElementById("infoText");

  function renderCards() {
    carousel.innerHTML = "";

    const prev = (currentIndex - 1 + data.length) % data.length;
    const next = (currentIndex + 1) % data.length;

    const indices = [prev, currentIndex, next];

    indices.forEach((i, index) => {
      const div = document.createElement("div");
      div.className = "card " + (i === currentIndex ? "active" : "inactive");
      div.style.backgroundColor = data[i].color;
      div.textContent = data[i].name;
      carousel.appendChild(div);
    });

    updateInfoBox();
  }

  function updateInfoBox() {
    const current = data[currentIndex];
    infoBox.style.backgroundColor = current.color;
    infoTitle.textContent = current.title;
    infoText.textContent = current.text;
  }

  document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + data.length) % data.length;
    renderCards();
  });

  document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % data.length;
    renderCards();
  });

  renderCards();

