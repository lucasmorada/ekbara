const header = document.querySelector('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

  const folders = document.querySelectorAll(".folder");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let activeIndex = 0;

function updateFolders() {
  folders.forEach((folder, i) => {
    folder.classList.remove("active");
    if (i === activeIndex) {
      folder.classList.add("active");
    }
  });
}

prevBtn.addEventListener("click", () => {
  activeIndex = (activeIndex - 1 + folders.length) % folders.length;
  updateFolders();
});

nextBtn.addEventListener("click", () => {
  activeIndex = (activeIndex + 1) % folders.length;
  updateFolders();
});

updateFolders();

