// Formulaire de recherche de covoiturages
const btnCovoiturages = document.getElementById("btnCovoiturages");
btnCovoiturages.addEventListener("click", () => window.AppData.withLoader(getCovoiturages));
btnCovoiturages.disabled = true;
window.AppData.selected = false;
const dateDepart = document.getElementById("dateDepart");
const lieuDepart = document.getElementById("lieuDepart");
const Depart = document.getElementById("Depart"); // Les villes retournées par la fonction d'autocompletion s'affichent ici
const lieuArrivee = document.getElementById("lieuArrivee");
const Arrivee = document.getElementById("Arrivee"); // Les villes retournées par la fonction d'autocompletion s'affichent ici
window.AppData.dateDepartFeedback = document.getElementById("dateDepartFeedback");
const today = new Date().toISOString().split('T')[0];
dateDepart.setAttribute('min', today);
dateDepart.addEventListener("input", () => { window.AppData.validateFormRecherche(btnCovoiturages, dateDepart, lieuDepart, lieuArrivee); });
lieuDepart.addEventListener("input", () => { window.AppData.selected = false; window.AppData.debouncedGetVilles(lieuDepart, Depart); window.AppData.validateFormRecherche(btnCovoiturages, dateDepart, lieuDepart, lieuArrivee); });
lieuArrivee.addEventListener("input", () => { window.AppData.selected = false; window.AppData.debouncedGetVilles(lieuArrivee, Arrivee); window.AppData.validateFormRecherche(btnCovoiturages, dateDepart, lieuDepart, lieuArrivee); });
// Carte où afficher les covoiturages
const voyages = document.getElementById("voyages");

let param = new URL(document.location).searchParams;
if (param.size > 0) {
    lieuDepart.value = param.get("lieuDepart");
    lieuArrivee.value = param.get("lieuArrivee");
    dateDepart.value = param.get("dateDepart");
    window.AppData.validateFormRecherche(btnCovoiturages, dateDepart, lieuDepart, lieuArrivee);
    btnCovoiturages.click();
}
let covoiturages = [];
let prixMinimum, prixMaximum, DureeMaximum, DureeMinimum;

//Filtres
const PrixInput = document.getElementById("PrixInput");;
const DureeInput = document.getElementById("DureeInput");
const NoteInput = document.getElementById("NoteInput");
const EnergieInput = document.getElementById("EnergieInput");
const btnFiltrer = document.getElementById("btnFiltrer");
const btnToutReinitialiser = document.getElementById("btnToutReinitialiser");
btnFiltrer.addEventListener("click", filtrerResultats);
btnToutReinitialiser.addEventListener("click", () => { EnergieInput.checked = false; DureeInput.value = ''; NoteInput.value = ''; PrixInput.value = '' });


// Fonction permettant de retourner le prix minimum, le prix maximum, la durée minimum et la durée maximum des covoiturages du jour recherché
// et les mettant comme limites aux champs des filtres

// Affiche les covoiturages
function setCovoiturages(covoiturages, div) {
    div.textContent = "";
    if (!Array.isArray(covoiturages) || covoiturages.length === 0) {
        div.textContent = "Aucun covoiturage disponible ne correspond à vos critères de recherche."
        return;
    }
    for (let i of covoiturages) {
        const noteChauffeur = window.AppData.createEl("p", ["item82", "text-center"], i['noteMoyenne'] != null ? `Note : ${i['noteMoyenne']}/5` : '');
        const card = window.AppData.createEl("div", ["card", "mb-3"]);
        const cardBody = window.AppData.createEl("div", ["card-body", "shadow-sm", "p-3", "bg-body-tertiary", "rounded", "container1"]);
        if (i['chauffeur']['photo']){
            const img = window.AppData.createEl("img", ["item1","imgAccount", "mx-auto", "my-auto"]);
            img.src = `${window.AppData.urlPhoto}${i['chauffeur']['photo']}`;
            img.alt = "Photo de profil"
            cardBody.appendChild(img)
        }
        else {
            window.AppData.addLettre(cardBody, i['chauffeur']['pseudo'], true);
        };
        const depart = window.AppData.createEl("p", ["item2", "my-auto"], "Départ :");
        const dateDepart = window.AppData.createEl("p", ["item3", "my-auto"], new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateDepart'])));
        const heureDepart = window.AppData.createEl("p", ["item4", "text-center", "my-auto"], i['heureDepart']);
        const lieuDepart = window.AppData.createEl("p", ["item5", "my-auto"], i['lieuDepart']);

        const duree = window.AppData.createEl("p", ["item6", "my-auto"],`Durée : ${window.AppData.toHours(new Date(`${i['dateArrivee']}T${i['heureArrivee']}`) - new Date(`${i['dateDepart']}T${i['heureDepart']}`))}`);

        const prix = window.AppData.createEl("p", ["item7", "my-auto"], `Prix : ${window.AppData.formatPrix(i['prixPersonne'])} crédits`);

        const arrivee = window.AppData.createEl("p", ["item9", "text-center"], "Arrivée :");
        const dateArrivee = window.AppData.createEl("p", ["item10"], new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateArrivee'])));
        const heureArrivee = window.AppData.createEl("p", ["item11", "text-center"], i['heureArrivee']);
        const lieuArrivee = window.AppData.createEl("p", ["item12"], i['lieuArrivee']);

        let placeText = i['nbPlaces'] === 0 ? "Complet" : i['nbPlaces'] === 1 ? "1 place restante" : `${i['nbPlaces']} places restantes`;
        const place = window.AppData.createEl("p", ["item13"], placeText);

        const energie = window.AppData.createEl("p", ["item14"], i['energie'] == "Essence" ? "Trajet non écologique" : "Trajet écologique");
        const item = window.AppData.createEl("p", ["item8", "text-center"]);
        const pseudo = window.AppData.createEl("p", ["item81", "text-center"], i['chauffeur']['pseudo']);
        let btnDetail = window.AppData.createEl('a', ["btn", "btn-primary", "btnDetail"], 'Détail');
        btnDetail.href = "/detail" + "?id=" + i['id'];

        [depart, dateDepart, heureDepart, lieuDepart, duree, prix, item, arrivee, dateArrivee,
            heureArrivee, lieuArrivee, place, energie, pseudo, noteChauffeur, btnDetail].forEach(el => cardBody.appendChild(el));
        item.appendChild(pseudo);
        item.appendChild(noteChauffeur);
        card.appendChild(cardBody);
        div.appendChild(card);
    }
    div.after(window.AppData.createEl('div', ["mb-3"]));
}



// Filtre les résultats avec les informations données dans les champs PrixInput, NoteInput, DuréeInput et dans la case à cocher EnergieInput
function filtrerResultats() {
    if (!Array.isArray(covoiturages) || covoiturages.length === 0) return;
    const covoituragesFiltres = [];
    const energieFiltre = EnergieInput.checked ? "Electrique" : '';
    const prixMax = PrixInput.value != '' ? Number(PrixInput.value) : prixMaximum
    const noteMin = NoteInput.value != '' ? Number(NoteInput.value) : 0;
    const dureeMax = DureeInput.value != '' ? Number(DureeInput.value) : DureeMaximum;
    for (let item of covoiturages) {
        const c = item.covoiturage;
        const noteMoyenne = item.noteMoyenne;
        if (energieFiltre && c['energie'] != energieFiltre) continue;
        const dateDepart = new Date(c['dateDepart'].replace('00:00:00+02:00', c['heureDepart']));
        const dateArrivee = new Date(c['dateArrivee'].replace('00:00:00+02:00', c['heureArrivee']));
        const dureeHeures = Math.floor((dateArrivee - dateDepart) / 3600000);
        if (Number(c['prixPersonne']) <= prixMax && noteMoyenne >= noteMin && dureeHeures <= dureeMax) {
            covoituragesFiltres.push(item);
        }
    }
    setCovoiturages(covoituragesFiltres, voyages);
}



async function ItineraireLePlusProche() {
    try {
        const result = await window.AppData.apiFetch(`covoiturage/Covoiturages/${lieuDepart.value}/${lieuArrivee.value}/${dateDepart.value}`, "GET", null, false)
        voyages.textContent = "";
        let card = window.AppData.createEl("div", ["card", "mb-3"]);
        let cardBody = window.AppData.createEl("div", ["card-body", "shadow", "p-3", "bg-body-tertiary", "rounded"]);
        let container = window.AppData.createEl("div", ["container5", "text-center"]);
        if (result.data?.date_proche) {
            const text = window.AppData.createEl("p", [], "Il n'y a aucun covoiturage disponible à cette date. Voulez vous modifier la date de voyage à la date du premier itinéraire le plus proche ?")
            let link = window.AppData.createEl("a", ["a"], new Intl.DateTimeFormat('fr-FR').format(new Date(result.data.date_proche)));
            link.href = "#";
            link.addEventListener("click", (e) => {
                e.preventDefault();
                dateDepart.value = result.data.date_proche.split('T')[0];
                getCovoiturages();
            });
            container.append(text, link);
            cardBody.appendChild(container);
            card.appendChild(cardBody);
            voyages.appendChild(card);
        }
        else {
            voyages.appendChild(window.AppData.createEl("p", ["text-center"], "Il n'y a aucun itinéraire disponible."));
        }
    } catch (error) {
        console.error("Erreur lors de la récupération de l'itinéraire le plus proche.", error);
    };
}

// Retourne tous les covoiturages correspondant aux informations données dans le formulaire de recherche
async function getCovoiturages() {
    try {
        let result = await window.AppData.apiFetch(`covoiturage/Covoiturages/${lieuDepart.value}/${lieuArrivee.value}/${dateDepart.value}/true`, "GET", null, false)
        result = result.data;
        if (result?.resultats?.length > 0) {
            setCovoiturages(result["resultats"], voyages);
            covoiturages = result["resultats"];
            let prixEtDuree = result["prixEtDureeMaximumEtMinimum"];
            prixMinimum = prixEtDuree['prix_min'];
            prixMaximum = prixEtDuree['prix_max']
            PrixInput.setAttribute("min", prixMinimum);    // Prix minimum et prix maximum des covoiturages; servent de limites au filtre "Prix"
            PrixInput.setAttribute("max", prixMaximum);
            DureeMaximum = prixEtDuree['duree_max'].split(":")[0];
            DureeMinimum = prixEtDuree['duree_min'].split(":")[0];
            DureeInput.setAttribute("max", DureeMaximum);    // Duree minimum et duree maximum des covoiturages; servent de limites au filtre "Durée"
            DureeInput.setAttribute("min", DureeMinimum);
            NoteInput.setAttribute("min", 1);
        } else {
            await ItineraireLePlusProche();
        }
    } catch (error) {
        console.error("Erreur lors de la récupération des données des covoiturages:", error);
    };
}



