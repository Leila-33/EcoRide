/* global bootstrap */
const btnPassager = document.getElementById("passagerCheck");
const btnChauffeur = document.getElementById("chauffeurCheck");
btnChauffeur.addEventListener("change", async () => window.AppData.withLoader(() => updateRole("chauffeur")));
btnPassager.addEventListener("change", async () => window.AppData.withLoader(() => updateRole("passager")));
window.AppData.notRespondedCovoiturages = window.AppData.notRespondedCovoiturages || [];

// Fonction permettant d'afficher dans une popover le nombre de covoiturages à valider 
function showPopover(result, element) {
    const link = document.getElementById('validations');
    bootstrap.Popover.getInstance(link)?.dispose();
    const popoverInstance = new bootstrap.Popover(link, {
        trigger: 'manual', placement: 'bottom', html: true, customClass: 'custom-popover',
        content: `Vous avez <b>${result}</b> ${window.AppData.pluralize(result, 'covoiturage')} à valider.`
    });
    popoverInstance.show();
    // Si le clic est en dehors de la popup, la popup se ferme sinon elle se ferme et l'utilisateur est redirigé
    // vers le premier covoiturage non validé
    function handleClickOutside(e) {
        const popoverEl = document.querySelector('.popover');
        if (popoverEl && popoverEl.contains(e.target)) {
            element.scrollIntoView({ behavior: "smooth", block: 'start' });
        }
        popoverInstance.hide();
        document.removeEventListener('click', handleClickOutside);
    }
    setTimeout(() => { document.addEventListener('click', handleClickOutside); }, 0);
}



//Mes informations personelles
const Nom = document.getElementById("Nom");
const DateDeNaissance = document.getElementById("DateDeNaissance");
const Email = document.getElementById("Email");
const Telephone = document.getElementById("Telephone");
const Adresse = document.getElementById("Adresse");
const imgInfos = document.getElementById("imgInfos");
const mesInfos1 = document.getElementById("mesInfos1");
const imgInfos1 = document.getElementById("imgInfos1");

//Modale "Modifier mes informations personelles"
const infosForm = document.getElementById("infosForm");
window.AppData.inputPhoto = document.querySelector("input[type=file]")
window.AppData.inputNom = document.getElementById("NomInput");
window.AppData.inputPrenom = document.getElementById("PrenomInput");
window.AppData.inputPseudo = document.getElementById("PseudoInput");
window.AppData.inputEmail = document.getElementById("EmailInput");
window.AppData.emailFeedback = document.getElementById("emailFeedback");
window.AppData.inputDateDeNaissance = document.getElementById("DateDeNaissanceInput");
window.AppData.dateNaissanceFeedback = document.getElementById("dateNaissanceFeedback");
window.AppData.inputAdresse = document.getElementById("AdresseInput");
window.AppData.inputTelephone = document.getElementById("TelephoneInput");
window.AppData.btnInscription = document.getElementById("btnInscription");
const btnDeletePhoto = document.getElementById("btnDeletePhoto");
const today = new Date().toISOString().split("T")[0];
window.AppData.inputDateDeNaissance.setAttribute('max', today);
window.AppData.inputPhoto.addEventListener("change", () => { 
    window.AppData.validateForm("modification");
    addPhoto();
 });
[window.AppData.inputNom, window.AppData.inputPrenom, window.AppData.inputDateDeNaissance, window.AppData.inputTelephone].forEach(input => {
    input.addEventListener("input", () => { window.AppData.validateForm("modification"); });
})
window.AppData.btnInscription.addEventListener("click", async () => await window.AppData.withLoader(updateInfos));
window.AppData.btnInscription.disabled = true;
btnDeletePhoto.addEventListener('click', () => { 
    btnDeletePhoto.disabled = true; 
    deletePhoto = true; 
    window.AppData.addLettre(imgInfos1, window.AppData.inputPseudo.value);
    window.AppData.inputPhoto.value = ''; 
    window.AppData.validateForm("modification");});

let ListElement = [];
let idUser = null, deletePhoto = false, vehiculesLength = 0;
// Modale "Modifier mon mot de passe"
const passwordForm = document.getElementById("passwordForm");
const currentPassword = document.getElementById("currentPasswordInput");
window.AppData.inputPassword = document.getElementById("PasswordInput");
window.AppData.passwordFeedback = document.getElementById("passwordFeedback");
window.AppData.inputValidationPassword = document.getElementById("ValidatePasswordInput");
window.AppData.passwordConfirmationFeedback = document.getElementById("passwordConfirmationFeedback");
const btnChangePassword = document.getElementById("btnChangePassword");
btnChangePassword.disabled = true;
[currentPassword, window.AppData.inputPassword, window.AppData.inputValidationPassword].forEach(input => {
    input.addEventListener("input", validateFormPassword);
})
btnChangePassword.addEventListener("click", async () => await window.AppData.withLoader(editPassword));
// Mes crédits
const credits = document.getElementById("credits");

// Mes voitures
const MesVoitures = document.getElementById("MesVoitures");
const voitures = document.getElementById("voitures");
// Modale "myModalAjouterVoiture"
const vehiculeForm = document.getElementById("vehiculeForm");
const inputPlaque = document.getElementById("PlaqueInput");
const inputDateImmatriculation = document.getElementById("DateImmatriculationInput");
const dateImmatriculationFeedbackVoiture = document.getElementById("dateImmatriculationFeedbackVoiture");
const inputMarque = document.getElementById("MarqueInput");
const inputModele = document.getElementById("ModeleInput");
const inputCouleur = document.getElementById("CouleurInput");
const inputNbPlaces = document.getElementById("NbPlacesInput");
const btnVehicule = document.getElementById("btnVehicule");
btnVehicule.addEventListener("click", async () => await window.AppData.withLoader(() => addVoiture(vehiculeForm)));
btnVehicule.disabled = true;
[inputPlaque, inputDateImmatriculation, inputMarque, inputModele, inputCouleur, inputNbPlaces].forEach(input => {
    input.addEventListener("input", () => { validateFormVehicule(inputPlaque, inputDateImmatriculation, inputMarque, inputModele, inputCouleur, inputNbPlaces, btnVehicule, dateImmatriculationFeedbackVoiture); });
})
// Modale "myModalSupprimerVoiture"
const btnSupprimerVoiture = document.getElementById("supprimerVoiture");
const myModalSupprimerVoiture = new bootstrap.Modal('#myModalSupprimerVoiture');
btnSupprimerVoiture.addEventListener("click", async () => {
    const id = btnSupprimerVoiture.dataset.id;
    await window.AppData.withLoader(() => supprimerVoiture(id));
});



//Modale "Veuillez enregistrer une voiture et vos préférences"
const vehiculeForm1 = document.getElementById("vehiculeForm1");
const inputPlaque1 = document.getElementById("PlaqueInput1");
const inputDateImmatriculation1 = document.getElementById("DateImmatriculationInput1");
const dateImmatriculationFeedbackChauffeur = document.getElementById("dateImmatriculationFeedbackChauffeur");
const inputMarque1 = document.getElementById("MarqueInput1");
const inputModele1 = document.getElementById("ModeleInput1");
const inputCouleur1 = document.getElementById("CouleurInput1");
const inputNbPlaces1 = document.getElementById("NbPlacesInput1");
const flexRadioDefault1 = document.getElementById("flexRadioDefault1");
const flexRadioDefault2 = document.getElementById("flexRadioDefault2");
const flexRadioDefault3 = document.getElementById("flexRadioDefault3");
const flexRadioDefault4 = document.getElementById("flexRadioDefault4");
const preferenceChauffeur = document.getElementById("preferenceChauffeur");
const formPreferenceChauffeur = document.getElementById("formPreferenceChauffeur");
const btnPreferencesChauffeur = document.getElementById("btnPreferencesChauffeur");
const formCheck1 = document.getElementById("formCheck1");
const btnEnregistrerPreference = document.getElementById("enregistrerPreference");
btnPreferencesChauffeur.addEventListener("click", function () {
    const dataForm = new FormData(formPreferenceChauffeur);
    let proprieteValeur = ListElement.find(el => el.propriete === dataForm.get("propriete"));
    if (proprieteValeur) {
        proprieteValeur.valeur = dataForm.get("valeur")
    }
    else {
        ListElement.push({ "propriete": dataForm.get("propriete"), "valeur": dataForm.get("valeur") })
    };
    setPreferences(preferenceChauffeur, ListElement);
});


[inputPlaque1, inputDateImmatriculation1, inputMarque1, inputModele1, inputCouleur1, inputNbPlaces1, formCheck1].forEach(input => {
    input.addEventListener("input", validateFormChauffeur);
});
btnEnregistrerPreference.disabled = true;
btnEnregistrerPreference.addEventListener("click", async function () {
    // L'utilisateur peut être chauffeur
    await window.AppData.withLoader(async () => {
        btnChauffeur.checked = true;
        if (!voitures.firstChild) { await addVoiture(vehiculeForm1); }
        if (animauxEtFumeurs != 2) {
            const dataForm = new FormData(formCheck1);
            const promises = [];
            for (let i of dataForm) { promises.push(updatePreferences(i[0], i[1])); }
            for (let i of ListElement) { promises.push(updatePreferences(i['propriete'], i['valeur'])); }
            await Promise.all(promises);
        }
        await updateRole("chauffeur");
        ListElement.length = 0;
    })
});

const inputProprieteChauffeur = document.getElementById("proprieteInputChauffeur")
const inputValeurChauffeur = document.getElementById("valeurInputChauffeur");
[inputValeurChauffeur, inputProprieteChauffeur].forEach(input => { input.addEventListener("input", () => { validatePreferencesForm(btnPreferencesChauffeur, inputProprieteChauffeur, inputValeurChauffeur) }) });



// Mes préférences
const MesPreferences = document.getElementById("MesPreferences");
const preference = document.getElementById("preference");
const preferenceForm = document.getElementById("preferenceForm");
let NbParametres;
// Modale "myModalAjouterPreference"
const inputPropriete = document.getElementById("proprieteInput")
const inputValeur = document.getElementById("valeurInput");
const btnPreferences = document.getElementById("btnPreferences");
[inputValeur, inputPropriete].forEach(input => { input.addEventListener("input", () => { validatePreferencesForm(btnPreferences, inputPropriete, inputValeur) }) });
btnPreferences.addEventListener("click", async function () {
    let dataForm = new FormData(preferenceForm);
    await window.AppData.withLoader(() => updatePreferences(dataForm.get("propriete"), dataForm.get("valeur")));
});
btnPreferences.disabled = true;
// Modale "myModalSupprimerPreference"
const myModalSupprimerPreference = new bootstrap.Modal('#myModalSupprimerPreference');
const btnSupprimerPreference = document.getElementById("supprimerPreference");
btnSupprimerPreference.onclick = async () => {
    const id = btnSupprimerPreference.dataset.id;
    await window.AppData.withLoader(() => supprimerPreference(id))
};
let animauxEtFumeurs; // Variable permettant de savoir si l'utilisateur a renseigné les préférences "animaux" et "fumeurs"

//Saisir un voyage
const saisirUnVoyage = document.getElementById("saisirUnVoyage");
const MesVoyagesPassager = document.getElementById("MesVoyagesPassager");
const MesVoyagesChauffeur = document.getElementById("MesVoyagesChauffeur");
window.AppData.selected = false; // Variable permettant de savoir si l'utilisateur a cliqué sur une ville suggérée
const voitureForm = document.getElementById("voitureForm");
const voyageForm = document.getElementById("voyageForm");
const inputLieuDepart = document.getElementById("lieuDepart");
const inputLieuArrivee = document.getElementById("lieuArrivee");
const inputDateDepart = document.getElementById("dateDepart");
const inputDateArrivee = document.getElementById("dateArrivee");
const inputHeureDepart = document.getElementById("heureDepart");
const inputHeureArrivee = document.getElementById("heureArrivee");
const Depart = document.getElementById("Depart"); // Les villes retournées par la fonction d'autocompletion s'affichent ici
const Arrivee = document.getElementById("Arrivee"); // Les villes retournées par la fonction d'autocompletion s'affichent ici
const inputPrix = document.getElementById("prixInput");
const inputNbPlace = document.getElementById("nbPlaceInput");
const tomorrowDate = new Date();
tomorrowDate.setDate(tomorrowDate.getDate() + 1);
const tomorrow = tomorrowDate.toISOString().split("T")[0];
inputDateDepart.setAttribute('min', tomorrow);
inputDateDepart.addEventListener('input', () => { inputDateArrivee.setAttribute('min', inputDateDepart.value); });
[inputDateDepart, inputDateArrivee, inputHeureDepart].forEach(input => {
    input.addEventListener('input', () => {
        if (inputDateDepart.value && inputDateDepart.value == inputDateArrivee.value) { inputHeureArrivee.setAttribute('min', inputHeureDepart.value); }
        else { inputHeureArrivee.removeAttribute('min'); }
    })
});
inputLieuDepart.addEventListener("input", () => { window.AppData.selected = false; window.AppData.debouncedGetVilles(inputLieuDepart, Depart); });
inputLieuArrivee.addEventListener("input", () => { window.AppData.selected = false; window.AppData.debouncedGetVilles(inputLieuArrivee, Arrivee); });

const inputVehicules = document.getElementById("inputVehicules");
const inputPlaque2 = document.getElementById("PlaqueInput2");
const inputDateImmatriculation2 = document.getElementById("DateImmatriculationInput2");
[inputDateImmatriculation, inputDateImmatriculation1, inputDateImmatriculation2].forEach(item => item.setAttribute('max', today));
const dateImmatriculationFeedbackVoyage = document.getElementById("dateImmatriculationFeedbackVoyage");
const inputMarque2 = document.getElementById("MarqueInput2");
const inputModele2 = document.getElementById("ModeleInput2");
const inputCouleur2 = document.getElementById("CouleurInput2");
const inputNbPlaces2 = document.getElementById("NbPlacesInput2");
const btnEnregistrerVoyage = document.getElementById("enregistrerVoyage");
[inputLieuDepart, inputLieuArrivee, inputDateDepart, inputDateArrivee, inputHeureDepart, inputHeureArrivee, inputPrix, inputNbPlace, inputPlaque2,
    inputDateImmatriculation2, inputMarque2, inputModele2, inputCouleur2, inputNbPlaces2, inputVehicules]
    .forEach(input => { input.addEventListener("input", validateFormVoyage); });
let addedVoiture = 0; // Variable permettant de savoir si l'utilisateur a selectionné une voiture (addedVoiture=0) ou 'autre' (addedVoiture=1) dans le formulaire "Saisir un voyage"
inputVehicules.addEventListener("input", function () {
    if (inputVehicules.value == "autre") { voitureForm.classList.remove("d-none"); addedVoiture = 1; }
    else { voitureForm.classList.add("d-none"); addedVoiture = 0; }
});
btnEnregistrerVoyage.addEventListener("click", async () => { await window.AppData.withLoader(() => addVoyage()) });
btnEnregistrerVoyage.disabled = true;
// Modale "myModalSupprimerCovoiturage"
const btnSupprimerCovoiturage = document.getElementById("btnSupprimerCovoiturage");
btnSupprimerCovoiturage.onclick = async () => {
    const id = btnSupprimerCovoiturage.dataset.id;
    const estChauffeur = btnSupprimerCovoiturage.dataset.chauffeur === "true";
    await window.AppData.withLoader(() => supprimerCovoiturage(id, estChauffeur));
};
const myModalSupprimerCovoiturage = new bootstrap.Modal('#myModalSupprimerCovoiturage');


// Mes voyages enregistrés
const voyagesPassager = document.getElementById("voyagesPassager");
const voyagesChauffeur = document.getElementById("voyagesChauffeur");


//Fonction permettant de valider le formulaire apparaissant en activant le mode "Chauffeur"
function validateFormPassword() {
    const currentPasswordOk = window.AppData.validateRequired(currentPassword);
    const passwordOk = window.AppData.validatePassword(window.AppData.inputPassword);
    const passwordConfirmOk = window.AppData.validateConfirmationPassword(window.AppData.inputPassword, window.AppData.inputValidationPassword);
    btnChangePassword.disabled = !(currentPasswordOk && passwordOk && passwordConfirmOk);
}


//Fonction permettant de valider le formulaire apparaissant en activant le mode "Chauffeur"
function validateFormChauffeur() {
    let voitureOk, choixPreferencesOk;
    voitureOk = !voitures.firstChild ? validateFormVehicule(inputPlaque1, inputDateImmatriculation1, inputMarque1, inputModele1, inputCouleur1, inputNbPlaces1, null, dateImmatriculationFeedbackChauffeur) : true;
    choixPreferencesOk = (animauxEtFumeurs == 2) || ((flexRadioDefault1.checked || flexRadioDefault2.checked) && (flexRadioDefault3.checked || flexRadioDefault4.checked));
    btnEnregistrerPreference.disabled = !(voitureOk && choixPreferencesOk);
}

// Fonction permettant de valider le formulaire "Saisir un voyage"
function validateFormVoyage() {
    const lieuDepartOk = window.AppData.validateNomVille(inputLieuDepart);
    const lieuArriveeOk = window.AppData.validateNomVille(inputLieuArrivee) && inputLieuDepart.value.trim() != inputLieuArrivee.value.trim();
    const prixOk = window.AppData.validatePrix(inputPrix);
    const NbPlaceOk = window.AppData.validateNbPlaces(inputNbPlace);
    const datesOk = validateDates(inputDateDepart, inputDateArrivee, inputHeureDepart, inputHeureArrivee)
    // Si 'autre véhicule' est selectionné, vérifier les champs du formulaire du véhicule
    let voitureValidated = (addedVoiture === 1) ? validateFormVehicule(inputPlaque2, inputDateImmatriculation2, inputMarque2, inputModele2, inputCouleur2, inputNbPlaces2, null, dateImmatriculationFeedbackVoyage) : true;
    btnEnregistrerVoyage.disabled = !(lieuDepartOk && lieuArriveeOk && prixOk && NbPlaceOk && voitureValidated && datesOk);
}


/* Fonction permettant de valider les dates et heures comme suit :
- si (un champ est manquant) {invalide}
- si (date de départ > date d'arrivée) {invalide}
- si (date de départ == date d'arrivée) && (heure de départ >= heure d'arrivée) {invalide}
- sinon {valide}  
*/
function validateDates(inputDateDepart, inputDateArrivee, inputHeureDepart, inputHeureArrivee) {
    const dateDepartFeedback = document.getElementById('dateDepartFeedback')
    const dateArriveeFeedback = document.getElementById('dateArriveeFeedback');
    const heureArriveeFeedback = document.getElementById('heureArriveeFeedback');
    dateDepartFeedback.textContent = "";
    dateArriveeFeedback.textContent = "";
    heureArriveeFeedback.textContent = "";
    [inputDateDepart, inputDateArrivee, inputHeureArrivee, inputHeureDepart].forEach(input => {
        input.classList.remove('is-valid');
        input.classList.remove('is-invalid');
    })
    let isValid = true;
    [inputDateDepart, inputDateArrivee, inputHeureArrivee, inputHeureDepart].forEach(input => {
        if (!input.value) {
            input.classList.remove('is-valid', 'is-invalid');
            isValid = false;
        }
    });
    if (!isValid) return false;
    const now = new Date().toISOString().split("T")[0];;
    const dateDepart = inputDateDepart.value;
    const dateArrivee = inputDateArrivee.value;
    if (dateDepart <= now) {
        inputDateDepart.classList.add('is-invalid');
        dateDepartFeedback.textContent = "La date de départ doit être postérieure à aujourd'hui.";
        isValid = false;
    }
    if (dateArrivee <= now) {
        inputDateArrivee.classList.add('is-invalid');
        dateArriveeFeedback.textContent = "La date d'arrivée doit être postérieure à aujourd'hui.";
        isValid = false;
    }
    if (dateDepart > dateArrivee) {
        inputDateArrivee.classList.add('is-invalid');
        dateArriveeFeedback.textContent = "La date d'arrivée doit être égale à ou après la date de départ.";
        return false;
    }
    const dateTimeDepart = new Date(`${inputDateDepart.value}T${inputHeureDepart.value}`);
    const dateTimeArrivee = new Date(`${inputDateArrivee.value}T${inputHeureArrivee.value}`);
    if (dateTimeDepart >= dateTimeArrivee) {
        inputHeureArrivee.classList.add('is-invalid');
        heureArriveeFeedback.textContent = "L'heure d'arrivée doit être après l'heure de départ.";
        return false;
    }
    if (isValid) {
        [inputDateDepart, inputDateArrivee, inputHeureArrivee, inputHeureDepart].forEach(input => {
            input.classList.add('is-valid');
            input.classList.remove('is-invalid');
            isValid = true;
        });
    }
    return isValid;
}


//Fonction permettant de valider le formulaire "Mes voitures"
function validateFormVehicule(inputPlaque, inputDateImmatriculation, inputMarque, inputModele, inputCouleur, inputNbPlaces, btnVehicule, dateImmatriculationFeedback) {
    const PlaqueOk = window.AppData.validateRequired(inputPlaque);
    const DateImmatriculationOk = window.AppData.validateDate(inputDateImmatriculation, dateImmatriculationFeedback, "La date d'immatriculation ne doit pas être dans le futur.", (inputDate, today) => inputDate <= today);
    const MarqueOk = window.AppData.validateRequired(inputMarque);
    const ModeleOk = window.AppData.validateRequired(inputModele);
    const CouleurOk = window.AppData.validateRequired(inputCouleur);
    const NbPlacesOk = window.AppData.validateNbPlaces(inputNbPlaces);
    const formValid = PlaqueOk && DateImmatriculationOk && MarqueOk && ModeleOk && CouleurOk && NbPlacesOk;
    if (btnVehicule) {
        btnVehicule.disabled = !(formValid);
    }
    return formValid;
}
//Fonction permettant de valider le formulaire "Mes préférences"
function validatePreferencesForm(btnPreferences, inputPropriete, inputValeur) {
    const proprieteOk = window.AppData.validateRequired(inputPropriete);
    const valeurOk = window.AppData.validateRequired(inputValeur);
    btnPreferences.disabled = !(proprieteOk && valeurOk);
}

// Ajouter une photo à la modale "Modifier mes informations personnelles"
function addPhoto(){
        const file = window.AppData.inputPhoto.files[0];
        if (file){
            imgInfos1.innerHTML="";
            const img = window.AppData.createEl('img', ['imgAccount']);
            const reader = new FileReader();
            reader.onload = (e) => {
                img.src = e.target.result;
                }
            reader.readAsDataURL(file)
            imgInfos1.appendChild(img);
            btnDeletePhoto.disabled=false;
}
}

// Fonction permettant d'afficher les informations de l'utilisateur dans la carte
// "Mes informations personnelles" et dans la modale "Modifier mes informations personnelles"
function setUser(user) {
    idUser = user['id'];
    window.AppData.inputNom.value = user['nom'];
    window.AppData.inputPrenom.value = user['prenom'];
    window.AppData.inputPseudo.value = user['pseudo'];
    window.AppData.inputDateDeNaissance.value = user['dateNaissance'];
    window.AppData.inputEmail.value = user['email'];
    window.AppData.inputTelephone.value = user['telephone'];
    window.AppData.inputAdresse.value = user['adresse'];
    [imgInfos, imgInfos1].forEach(image => { 
        image.innerHTML="";
        if (user['photo']){
            const img = window.AppData.createEl('img', ['imgAccount']);
            img.src = `${window.AppData.urlPhoto}/${user['photo']}`;
            img.alt = "Photo de profil"
            image.appendChild(img);
        }
        else {
            window.AppData.addLettre(image, user['pseudo']);
        }});
    btnDeletePhoto.disabled = user['photo'] ? false : true;
    deletePhoto = false;
    mesInfos1.textContent = user['pseudo'];
    Nom.textContent = `${user['nom']} ${user['prenom']}`;
    let dateNaissance = '';
    if (user['dateNaissance']) {
        const d = new Date(user['dateNaissance']);
        if (!isNaN(d.getTime())) {
            dateNaissance = new Intl.DateTimeFormat("fr-FR").format(d)
        }
    }
    DateDeNaissance.textContent = `Date de naissance : ${dateNaissance}`;
    Email.textContent = `Email : ${user['email']}`;
    Telephone.textContent = `Téléphone : ${user['telephone']}`;
    Adresse.textContent = `Adresse : ${user['adresse']}`
}




async function updateInfos() {
    const dataForm = new FormData(infosForm);
    let photo = dataForm.get("Photo");
    let b64Img = null;
    if (photo && photo.size > 0) {
        b64Img = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve(event.target.result.split(',')[1]);
            reader.readAsDataURL(photo);
        });
    }

    let body = {
        "photo": b64Img,
        "delete_photo": deletePhoto,
        "nom": dataForm.get("Nom"),
        "prenom": dataForm.get("Prenom"),
        "dateNaissance": dataForm.get("DateDeNaissance"),
        "telephone": dataForm.get("Telephone"),
        "adresse": dataForm.get("Adresse"),
        "password": dataForm.get("mdp")
    };
    const result = await window.AppData.apiFetch("account/edit", "PUT", body);
    if (!result.ok) {
        console.error("Erreur lors de la mise à jour des données utilisateur", result.message);
        window.AppData.showToast(`Erreur lors de la mise à jour des données utilisateur ${result.message}`, "danger");
        return;
    }
    const userResult = await window.AppData.getInfosUser();
    window.AppData.showToast("Profil mis à jour avec succès", "success");
    setUser(userResult);
    getCovoiturages("chauffeur");
}

async function editPassword() {
    let dataForm = new FormData(passwordForm);
    let body = {
        "currentPassword": dataForm.get("currentPassword"),
        "password": dataForm.get("password")
    };
    const result = await window.AppData.apiFetch("editPassword", "PUT", body);
    if (!result.ok) {
        console.error(`Impossible de mettre à jour le mot de passe.`, result.message);
        window.AppData.showToast(result.message || 'Erreur', "danger");
        return false;
    }
    window.AppData.showToast("Mot de passe changé avec succès", "success");
    return true;

}
// Enregistrer une nouvelle voiture
async function addVoiture(vehiculeForm) {
    let dataForm = new FormData(vehiculeForm);
    let body = {
        "marque": { "libelle": dataForm.get("Marque") },
        "modele": dataForm.get("Modele"),
        "immatriculation": dataForm.get("Plaque"),
        "energie": dataForm.get("Energie"),
        "couleur": dataForm.get("Couleur"),
        "datePremiereImmatriculation": dataForm.get("DateImmatriculation"),
        "nbPlaces": Number(dataForm.get("NbPlaces")),
    };
    const result = await window.AppData.apiFetch("voiture/addVoiture", "POST", body);
    if (result.data) {
        window.AppData.showToast("Voiture ajoutée avec succès", "success");
        await getVoitures();
        return result.data['id'];
    }
    else {
        console.error("Erreur lors de l'ajout de la voiture", result.message);
        window.AppData.showToast(`Erreur lors de l'ajout de la voiture: ${result.message}`, "danger");
        return false;
    }
}

//Obtenir les voitures
async function getVoitures() {
    const result = await window.AppData.apiFetch("voiture/allVoitures");
    if (!result.ok) {
        console.error("Impossible de récupérer les informations des voitures", result.message);
        return;
    }
    setVoitures(result.data);
    if (result.data.length == 0) {
        if (btnChauffeur.checked) {
            btnChauffeur.checked = false;
            await updateRole("chauffeur");
        }
    }
}

// Afficher les voitures
function setVoitures(vehicules) {
    voitures.innerHTML = "";
    inputVehicules.innerHTML = "";
    vehiculesLength = vehicules.length;
    if (vehiculesLength > 0) {
        vehicules.forEach((i, idx) => {
            const index = idx + 1;
            inputVehicules.add(new Option(`Voiture ${index}`, i['id']));
            const newDiv = window.AppData.createEl("div", ['col']);
            const card = window.AppData.createEl("div", ["card", "image-card"]);
            const cardBody = window.AppData.createEl("div", ["card-body", "shadow-sm", "p-3", "bg-body-tertiary", "rounded"]);
            const newDiv3 = window.AppData.createEl("div", ["text-center"], `Voiture ${index}`);
            const newDiv31 = window.AppData.createEl("div", ["text-center"], `${i['immatriculation']} ${new Intl.DateTimeFormat("fr-FR").format(new Date(i['datePremiereImmatriculation']))}`);
            const newDiv32 = window.AppData.createEl("div", ["text-center"], `${i['marque']['libelle']} ${i['modele']} ${i['couleur']}`);
            const newDiv33 = window.AppData.createEl("div", ["text-center"], `${i['nbPlaces']} ${window.AppData.pluralize(i['nbPlaces'], "place")} ${i['energie']}`);
            const actionDiv = window.AppData.createEl("div", ["action-image-buttons"]);
            const icon = window.AppData.createEl("i", ["bi", "bi-trash"]);
            const btnSupprimer = window.AppData.makeButton(actionDiv, "", [], () => {
                btnSupprimerVoiture.dataset.id = i['id'];
                myModalSupprimerVoiture.show();
            }); // Modale pour supprimer une voiture
            btnSupprimer.setAttribute('title', "Supprimer");
            btnSupprimer.appendChild(icon);
            [actionDiv, newDiv3, newDiv31, newDiv32, newDiv33].forEach(child => { cardBody.appendChild(child); });
            card.appendChild(cardBody);
            newDiv.appendChild(card);
            voitures.appendChild(newDiv);
        });
        inputVehicules.add(new Option("Autre voiture", 'autre'));
        voitures.after(window.AppData.createEl("div", ["mb-3"]));
    }
}

// Supprimer une voiture
async function supprimerVoiture(id) {
    if (!id) {
        console.error('ID de voiture invalide.');
        return;
    }
    const result = await window.AppData.apiFetch(`voiture/${id}`, "DELETE");
    if (!result.ok) {
        console.error('Erreur lors de la suppression de la voiture.', result.message);
        window.AppData.showToast(`Erreur lors de la suppression de la voiture: ${result.message}`, "danger");
        return;
    }
    await getVoitures();
}

// Afficher ou cacher les cartes "Mes voitures", "Mes préférences", "Saisir un voyage", "Mes voyages enregistrés - Chauffeur".
function afficherCartes(i) {
    const cartes = [MesVoitures, MesPreferences, saisirUnVoyage, MesVoyagesChauffeur];
    cartes.forEach(carte => carte.classList.toggle("d-none", !i));
}

// Ajouter ou supprimer le rôle "Chauffeur"
async function updateRole(role) {
    /*S'il n'y a pas les préférences animaux et fumeurs enregistrées ou s'il n'y a pas de véhicule, le mode
    "Chauffeur" est désactivé et une modale apparait pour permettre à l'utilisateur d'enregistrer une voiture
    et ses préférences. */
    const isChauffeur = role === "chauffeur";
    const isPassager = role === "passager";
    const btn = isChauffeur ? btnChauffeur : btnPassager;
    console.log(window.AppData.notRespondedCovoiturages);
    if (isPassager && !btn.checked && window.AppData.notRespondedCovoiturages.length > 0) {
        alert("Vous devez valider vos covoiturages avant de pouvoir désactiver le mode passager.");
        btn.checked = true;
        return;
    }
    const hasVoiture = !!voitures.firstChild;
    const preferencesOk = animauxEtFumeurs === 2;
    if (isChauffeur && btn.checked && (!hasVoiture || !preferencesOk)) {
        // Si une voiture est enregistrée, pas besoin de renseigner une voiture dans la modale
        vehiculeForm1.classList.toggle("d-none", hasVoiture);
        // Si les préférences animaux et fumeurs sont enregistrées, pas besoin de les renseigner dans la modale
        formCheck1.classList.toggle("d-none", preferencesOk);
        btnChauffeur.checked = false;
        new bootstrap.Modal('#myModalChauffeur').show();
        return;
    }
    const method = btn.checked ? 'POST' : 'DELETE';
    const endpoint = btn.checked ? "roleEntity" : `roleEntity/${role}`;
    const body = btn.checked ? { "libelle": role } : null;

    const result = await window.AppData.apiFetch(endpoint, method, body);
    if (!result.ok) {
        console.error(`Impossible de mettre à jour le rôle ${role}.`, result.message);
        return;
    }
    // Afficher ou cacher les cartes du mode "Chauffeur"
    if (isChauffeur) afficherCartes(btn.checked);
    else if (isPassager) { MesVoyagesPassager.classList.toggle("d-none", !btn.checked); }
}




// Afficher les rôles
async function getRoles() {
    const roles = await window.AppData.apiFetch("roleEntity");
    if (!roles) {
        console.error("Impossible de récupérer les rôles.");
        return;
    }
    const estChauffeur = roles.data.some(r => r.libelle === "chauffeur");
    const estPassager = roles.data.some(r => r.libelle === "passager");
    btnChauffeur.checked = estChauffeur;
    afficherCartes(estChauffeur);
    btnPassager.checked = estPassager;
    MesVoyagesPassager.classList.toggle("d-none", !estPassager)
}



// Ajouter une préférence
async function updatePreferences(propriete, valeur) {
    if (NbParametres >= 10) {
        alert("Le nombre maximal de préférences enregistrés est de 10.");
        return false;
    }

    let body = {
        "propriete": propriete,
        "valeur": valeur
    };
    const success = await window.AppData.apiFetch("parametre", "POST", body);
    if (!success.ok) {
        console.error("Erreur lors de l'ajout de la préférence.", success.message);
        window.AppData.showToast(`Erreur lors de l'ajout de la préférence: ${success.message}`, "danger");
        return false;
    }
    window.AppData.showToast("Préférence ajoutée avec succès", "success");
    const result = await window.AppData.getInfosUser();
    setPreferences(preference, result['parametres']);
    return true;
}


//Afficher les préférences
function setPreferences(div, parametres) {
    div.innerText = "";
    if (!parametres || parametres.length == 0) { return; }
    NbParametres = parametres.length;
    animauxEtFumeurs = parametres.filter(p => ["fumeurs", "animaux"].includes(p.propriete)).length;
    parametres.forEach(i => {
        const newDiv = window.AppData.createEl("div", ['col']);
        const card = window.AppData.createEl("div", ["card", "image-card"]);
        const cardBody = window.AppData.createEl("div", ["card-body", "shadow-sm", "p-3", "bg-body-tertiary", "rounded"]);
        const textDiv = window.AppData.createEl("div", ["text-center"], `${i['propriete']} : ${i['valeur']}`);
        const actionDiv = window.AppData.createEl("div", ["action-image-buttons"]);
        const icon = window.AppData.createEl("i", ["bi", "bi-trash"]);
        const btnSupprimer = window.AppData.makeButton(actionDiv, "", [], async () => {
            if (div == preference) {
                btnSupprimerPreference.dataset.id = i['id'];
                myModalSupprimerPreference.show();
            }
            else {
                newDiv.remove();
                ListElement = ListElement.filter(item => item.propriete !== i['propriete']);
            }
        });
        btnSupprimer.setAttribute('title', "Supprimer");
        btnSupprimer.appendChild(icon);
        cardBody.appendChild(actionDiv);
        cardBody.appendChild(textDiv);
        card.appendChild(cardBody);
        newDiv.appendChild(card);
        div.prepend(newDiv);
    });
    div.after(window.AppData.createEl("div", ["mb-3"]));
}


async function supprimerPreference(id) {
    if (!id) {
        console.error("ID de la préférence invalide.");
        return;
    }
    const success = await window.AppData.apiFetch(`parametre/${id}`, "DELETE");
    if (!success.ok) {
        console.error('Erreur lors de la suppression de la préférence.');
        window.AppData.showToast(`Erreur lors de la suppression de la préférence: ${success.message}`, "danger");
        return null;
    }
    const result = await window.AppData.getInfosUser();
    setPreferences(preference, result['parametres']);
    if (animauxEtFumeurs !== 2 && btnChauffeur.checked) {
        btnChauffeur.checked = false;
        await updateRole("chauffeur");
    }
    return true;
}



// Ajouter un voyage 
async function addVoyage() {
    let dataForm = new FormData(voyageForm);
    let nom;
    const baseVoyage = {
        "dateDepart": dataForm.get("dateDepart"),
        "heureDepart": dataForm.get("heureDepart"),
        "lieuDepart": dataForm.get("lieuDepart"),
        "dateArrivee": dataForm.get("dateArrivee"),
        "heureArrivee": dataForm.get("heureArrivee"),
        "lieuArrivee": dataForm.get("lieuArrivee"),
        "statut": "en attente",
        "nbPlaces": Number(dataForm.get("nbPlaces")),
        "prixPersonne": String(dataForm.get("prix")),
    };
    if (addedVoiture) {
        nom = await addVoiture(voitureForm);
        if (!nom) {
            console.error("Impossible d'ajouter la voiture");
            return;
        }
    }
    else if (dataForm.get("inputVehicules")) {
        nom = dataForm.get("inputVehicules");
    }
    else {
        throw new Error("Erreur : Veuillez sélectionner une voiture.");
    }
    const result = await window.AppData.apiFetch(`covoiturage/${nom}`, "POST", baseVoyage);
    if (!result.ok) {
        console.error("Erreur lors de l'ajout du voyage.", result.message);
        window.AppData.showToast(`Erreur lors de l'ajout du voyage: ${result.message}`, "danger");
        return null;
    }
    window.AppData.showToast("Covoiturage ajouté avec succès", "success");
    const res = await getCovoiturages("chauffeur");
    if (res) MesVoyagesChauffeur.scrollIntoView({ behavior: "smooth", block: 'start' });
}
// Supprimer un covoiturage
async function supprimerCovoiturage(id, estChauffeur) {
    if (!id) {
        console.error("ID du covoiturage invalide.");
        return;
    }
    let endpoint = estChauffeur ? "covoiturage/" : "covoiturage/removeUser/"
    const result = await window.AppData.apiFetch(endpoint + id, "DELETE");
    if (!result.ok) {
        console.error('Erreur lors de la suppression du covoiturage.', result.message);
        window.AppData.showToast(`Erreur lors de la suppression du covoiturage: ${result.message}`, "danger");
        return null;
    }
    getCovoiturages(estChauffeur ? "chauffeur" : "passager");
}

// Obtenir les covoiturages "passager" ou "chauffeur" suivant le rôle
async function getCovoiturages(role) {
    let url = role === "passager" ? "covoiturage/allCovoiturages" : `covoiturage/allCovoiturages/${idUser}`;
    let div = role === "passager" ? voyagesPassager : voyagesChauffeur;
    let result = await window.AppData.apiFetch(url);
    if (!result.ok) {
        console.error(result.message);
        return;
    }
    result = result.data;
    await setCovoiturages(result["actifs"], div);
    if (Array.isArray(result["termines"]) && result["termines"].length > 0) {
        let newDiv = window.AppData.createEl("div", ["mb-3", "bg-body-tertiary"]);
        let newDiv1 = document.createElement("div");
        let text = window.AppData.createEl("p", ["text-center"], "Mes covoiturages passés");
        newDiv.appendChild(text);
        newDiv.appendChild(newDiv1);
        div.appendChild(newDiv);
        await setCovoiturages(result["termines"], newDiv1);
    }
    return result;

}


//Afficher les covoiturages
async function setCovoiturages(covoiturages, div) {
    div.innerText = "";
    if (!Array.isArray(covoiturages) || covoiturages.length === 0) return;
    let tasks = [];
    for (let i of covoiturages) {
        const card = window.AppData.createEl("div", ["card", "mb-3"]);
        const cardBody = window.AppData.createEl("div", ["card-body", "shadow-sm", "p-3", "bg-body-tertiary", "rounded"]);
        const container = window.AppData.createEl("div", ["container1"]);
     if (i['chauffeur']['photo']){
            const img = window.AppData.createEl("img", ["item1","imgAccount", "mx-auto", "my-auto"]);
            img.src = `${window.AppData.urlPhoto}/${i['chauffeur']['photo']}`;
            img.alt = "Photo de profil"
            container.appendChild(img)
        }
        else {
            window.AppData.addLettre(container, i['chauffeur']['pseudo'], true);
        };
        const depart = window.AppData.createEl("p", ["item2", "my-auto"], "Départ :");
        const dateDepart1 = window.AppData.createEl("p", ["item3", "my-auto"], new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateDepart'])));
        const heureDepart = window.AppData.createEl("p", ["item4", "text-center", "my-auto"], i['heureDepart']);
        const lieuDepart = window.AppData.createEl("p", ["item5", "my-auto"], i['lieuDepart']);

        const arrivee = window.AppData.createEl("p", ["item9", "text-center"], "Arrivée :");
        const dateArrivee = window.AppData.createEl("p", ["item10"], new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateArrivee'])));
        const heureArrivee = window.AppData.createEl("p", ["item11", "text-center"], i['heureArrivee']);
        const lieuArrivee = window.AppData.createEl("p", ["item12"], i['lieuArrivee']);

        const duree = window.AppData.createEl("p", ["item6", "my-auto"], `Durée : ${window.AppData.toHours(new Date(`${i['dateArrivee']}T${i['heureArrivee']}`) - new Date(`${i['dateDepart']}T${i['heureDepart']}`))}`);
        const prix = window.AppData.createEl("p", ["item7", "my-auto"], `Prix : ${window.AppData.formatPrix(i['prixPersonne'])} crédits`);
        const pseudo = window.AppData.createEl("p", ["item8", "text-center"], i['chauffeur']['pseudo']);


        let placeText = i['nbPlaces'] === 0 ? "Complet" : i['nbPlaces'] === 1 ? "1 place restante" : `${i['nbPlaces']} places restantes`;
        const place = window.AppData.createEl("p", ["item13"], placeText);
        const energie = window.AppData.createEl("p", ["item14"], i['energie'] == "Essence" ? "Trajet non écologique" : "Trajet écologique");


        let btnDetail = window.AppData.createEl('a', ["btn", "btn-primary", "btnDetail"], 'Détail');
        btnDetail.href = `/detail?id=${i['id']}`;

        let estChauffeur = (idUser === i['chauffeur']['id']);
        if (i['statut'] == "terminé" && estChauffeur) {
            tasks.push((async () => {
                let nbReponses = await getNbReponses(i['id']);
                // Variable valant true si tous les participants ont répondu au covoiturage
                let tousRepondu = i['users'].length === nbReponses['nbReponses'];
                // Le covoiturage peut être supprimé uniquement si le statut est terminé et si tous les participants ont validé leur voyage
                if (tousRepondu) {
                    ajouterBoutonSupprimer(estChauffeur, cardBody, i['id']);
                    card.classList.add("image-card");
                }
            })());
        }// Si l'utilisateur est participant et s'il il a répondu au covoiturage, il peut le supprimer de son historique
        else {
            tasks.push((async () => {
                let Reponse = await getReponse(i['id'])
                if (Reponse) {
                    ajouterBoutonSupprimer(null, cardBody, i['id']);
                    card.classList.add("image-card");
                }
            })());
        }
        [depart, dateDepart1, heureDepart, lieuDepart, arrivee, dateArrivee, heureArrivee, lieuArrivee, duree, prix,
            pseudo, place, energie, btnDetail].forEach(child => { container.appendChild(child); });
        cardBody.appendChild(container);
        card.appendChild(cardBody);


        if (Array.isArray(window.AppData.notRespondedCovoiturages) && window.AppData.notRespondedCovoiturages.length > 0) {
            // L'élément sur lequel le scroll est fait lorsque l'utilisateur clique sur la popover montrant le nombre de covoiturages à valider
            if (window.AppData.notRespondedCovoiturages.some(item => item.id === i.id)) {
                card.classList.add('aValiderBorder');
                btnDetail.appendChild(document.createTextNode(' (À valider)'));
                btnDetail.classList.add('aValiderBtn');
                btnDetail.title = "Voir le détail pour valider ce covoiturage";
                if (window.AppData.notRespondedCovoiturages[0]['id'] === i.id) {
                    showPopover(window.AppData.notRespondedCovoiturages.length, card);
                }
            }
        }
        let theFirstChild = div.firstChild;
        div.insertBefore(card, theFirstChild);
    }
    await Promise.all(tasks);
    div.after(window.AppData.createEl("div", ["mb-3"]));
}

function ajouterBoutonSupprimer(estChauffeur, container, id) {
    const actionDiv = window.AppData.createEl("div", ["action-image-buttons"]);
    const icon = window.AppData.createEl("i", ["bi", "bi-trash"]);
    const btnSupprimer = window.AppData.makeButton(actionDiv, null, [], () => {
        btnSupprimerCovoiturage.dataset.id = id;
        btnSupprimerCovoiturage.dataset.chauffeur = estChauffeur;
        myModalSupprimerCovoiturage.show();
    })
    btnSupprimer.title = "Supprimer";
    btnSupprimer.appendChild(icon);
    container.appendChild(actionDiv);
};



// Retourne le nombre de réponses liées à un covoiturage d'identifiant $id.
async function getNbReponses(id) {
    if (!id) {
        console.error("ID invalide.");
        return null;
    }
    const numId = Number(id);
    const result = await window.AppData.apiFetch(`reponse/getNbReponses/${numId}`);
    if (!result.ok) return null;
    return result.data;
}

// Retourne la réponse de l'utilisateur pour le covoiturage ayant l'identifiant id 
async function getReponse(id) {
    if (!id) {
        console.error("ID invalide.");
        return null;
    }
    const numId = Number(id);
    const result = await window.AppData.apiFetch(`reponse/show/${numId}`);
    if (!result.ok) {
        console.error('Aucune réponse trouvée pour cet utilisateur.', result.message);
        return null;
    }
    return result.data;
}
// Récupère le nombre total de crédits de l'utilisateur et l'affiche dans l'élément "crédits"
async function nombreCreditsTotal() {
    const result = await window.AppData.apiFetch("credit/nombreCreditsTotal");
    if (!result.ok) return;
    let newSpan = window.AppData.createEl("span", ["credit-total"], window.AppData.formatPrix(result.data["creditTotal"]));
    let newSpan1 = document.createElement("span");
    newSpan1.textContent = " crédits";
    credits.appendChild(newSpan);
    credits.appendChild(newSpan1);
}

// Initialiser les informations de l'utilisateur
async function initUserData() {
    try {
        await window.AppData.withLoader(async () => {
            await nombreCreditsTotal();
            const result = await window.AppData.getInfosUser();
            setUser(result);
            await getRoles();
            setPreferences(preference, result.parametres);
            if (animauxEtFumeurs != 2 && btnChauffeur.checked) {
                btnChauffeur.checked = false;
                await updateRole("chauffeur");
            }
            await getVoitures();
            await getCovoiturages("chauffeur");
            await getCovoiturages("passager");

        });
    } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur : ", error);
    }
}
initUserData();