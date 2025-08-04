const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  const divisions = [
    {
      title: "Ekbara Creative",
      desc: "Onde nascem as ideias visuais e conceitos criativos que movem nossas marcas."
    },
    {
      title: "Ekbara Atelier",
      desc: "O nosso núcleo artesanal e artístico: design, moda e produção autoral."
    },
    {
      title: "Ekbara Web",
      desc: "Criação de experiências digitais, sites, sistemas e interações."
    },
    {
      title: "Ekbara Sounds",
      desc: "Identidade sonora, trilhas, produções e tudo que envolve áudio."
    },
    {
      title: "Ekbara Forma",
      desc: "Exploração de estruturas, arquitetura e projetos físicos e visuais."
    }
  ];

  const container = document.getElementById("folderContainer");

  divisions.forEach((div, i) => {
    const el = document.createElement("div");
    el.className = "folder-card";
    el.innerHTML = `
      <div>
        <h3 class="folder-title">${div.title}</h3>
        <p class="folder-desc">${div.desc}</p>
      </div>
    `;
    el.addEventListener("click", () => {
      document.querySelectorAll('.folder-card').forEach(c => c.classList.remove('active'));
      el.classList.add('active');
    });
    container.appendChild(el);
  });

  // Ativar o primeiro por padrão
  window.addEventListener("DOMContentLoaded", () => {
    const first = container.querySelector('.folder-card');
    if (first) first.classList.add('active');
  });


