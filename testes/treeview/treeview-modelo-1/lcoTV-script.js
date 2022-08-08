const lco_tv_items = document.querySelectorAll(".lco-tv-item");
const lco_tv_pastas = document.querySelectorAll(".lco-tv-pasta");

lco_tv_items.forEach((x) => {
  x.addEventListener("click", () => {
    x.classList.toggle("ativado");
  });
});

lco_tv_pastas.forEach((x) => {
  x.addEventListener("click", () => {
    x.classList.toggle("ativado");
    x.nextElementSibling.classList.toggle("ativado");
  });
});
