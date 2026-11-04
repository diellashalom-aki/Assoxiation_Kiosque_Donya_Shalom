const bouton = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

bouton.addEventListener("click", () => {
    nav.classList.toggle("ouvert");
});