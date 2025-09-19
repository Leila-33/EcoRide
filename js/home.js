const btnCovoiturages = document.getElementById("btnCovoiturages");
const dateDepart = document.getElementById("dateDepart");
const lieuDepart = document.getElementById("lieuDepart");
const lieuArrivee = document.getElementById("lieuArrivee");
window.AppData.dateDepartFeedback = document.getElementById("dateDepartFeedback");
const Depart = document.getElementById("Depart"); // Les villes retournées par la fonction d'autocompletion s'affichent ici
const Arrivee = document.getElementById("Arrivee"); // Les villes retournées par la fonction d'autocompletion s'affichent ici
const covoituragesForm = document.getElementById("covoituragesForm");
btnCovoiturages.addEventListener("click", () => { const dataForm = new FormData(covoituragesForm); window.location.replace(`/covoiturages?lieuDepart=${dataForm.get("lieuDepart")}&lieuArrivee=${dataForm.get("lieuArrivee")}&dateDepart=${dataForm.get("dateDepart")}`); });
btnCovoiturages.disabled = true;
window.AppData.selected = false;
const today = new Date().toISOString().split('T')[0];
dateDepart.setAttribute('min', today);
lieuDepart.addEventListener("input", () => { window.AppData.selected = false; window.AppData.debouncedGetVilles(lieuDepart, Depart); window.AppData.validateFormRecherche(btnCovoiturages, dateDepart, lieuDepart, lieuArrivee); });
lieuArrivee.addEventListener("input", () => { window.AppData.selected = false; window.AppData.debouncedGetVilles(lieuArrivee, Arrivee); window.AppData.validateFormRecherche(btnCovoiturages, dateDepart, lieuDepart, lieuArrivee); });
dateDepart.addEventListener("input", () => { window.AppData.validateFormRecherche(btnCovoiturages, dateDepart, lieuDepart, lieuArrivee); });



