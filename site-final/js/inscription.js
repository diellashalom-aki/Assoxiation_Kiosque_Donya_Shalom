const params = new URLSearchParams(location.search);
const choix = params.get("evenement");
const liste = document.getElementById("evenement");
if (choix && liste) liste.value = choix;
document.getElementById("form-inscription").addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = document.getElementById("confirmation");
  const nom = new FormData(e.target).get("nom");
  msg.textContent = "Merci " + nom + ", votre inscription à « " + liste.selectedOptions[0].text + " » est enregistrée.";
  msg.hidden = false;
});
