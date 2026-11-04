const bouton = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
if (bouton && nav) {
  bouton.addEventListener("click", () => {
    const ouvert = nav.classList.toggle("ouvert");
    bouton.setAttribute("aria-expanded", String(ouvert));
  });
}
