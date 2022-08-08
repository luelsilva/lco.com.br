const items = document.querySelectorAll(".item");
const pastas = document.querySelectorAll(".pasta");

items.forEach((x) => {
  x.addEventListener("click", () => {
    x.classList.toggle("ativado");
  });
});

pastas.forEach((x) => {
  x.addEventListener("click", () => {
    x.classList.toggle("ativado");
    x.nextElementSibling.classList.toggle("ativado");
  });
});
