/* global bootstrap */
const tokenCookieName = "accesstoken";
const signoutBtn = document.getElementById("signout-btn");
const nbCovoituragesNotResponded = document.getElementById("nbCovoituragesNotResponded");

window.AppData = window.AppData || {};
if (window.location.hostname === 'localhost'){
    window.AppData.urlPhoto = 'http://localhost:8000/';
    window.AppData.apiUrl = "https://127.0.0.1:8000/api/";

} else {
    window.AppData.urlPhoto = 'https://ecoride.e-mecaformation.com/';
    window.AppData.apiUrl = "https://backend-ecoride.e-mecaformation.com/api/";

}
window.AppData.RoleCookieName = "role";
window.AppData.notRespondedCovoiturages = null;
window.AppData.credit = document.getElementById("credit");
signoutBtn.addEventListener("click", signout);
window.AppData.villesController = null;

window.AppData.selected = null;
const loader = document.getElementById('loader');

function showLoader() {
    loader.classList.remove('d-none');

}
function hideLoader() {
    loader.classList.add('d-none');
}
window.AppData.withLoader = async function (asyncFunc) {
    showLoader();
    document.getElementById('main-page').classList.add('loading');
    try {
        return await asyncFunc();
    } finally {
        hideLoader();
        document.getElementById('main-page').classList.remove('loading');
    }
}

function getRole() {
    return getCookie(window.AppData.RoleCookieName);
}
window.AppData.setToken = function (token) {
    window.AppData.setCookie(tokenCookieName, token, 7);
}

function getToken() {
    return getCookie(tokenCookieName);
}



window.AppData.setCookie = function (name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
window.AppData.isConnected = function () {
    if (getToken() == null || getToken == undefined) {
        return false;
    }
    else {
        return true;
    }
}

function signout() {
    eraseCookie(tokenCookieName);
    eraseCookie(window.AppData.RoleCookieName);
    window.location.reload();
}

window.AppData.showAndHideElementsForRoles = function () {
    const userConnected = window.AppData.isConnected();
    const role = getRole();

    let allElementsToEdit = document.querySelectorAll('[data-show]');

    allElementsToEdit.forEach(element => {
        switch (element.dataset.show) {
            case 'disconnected':
                if (userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'connected':
                if (!userConnected) {
                    element.classList.add("d-none");
                }
                break;
            case 'admin':
                if (!userConnected || role != "ROLE_ADMIN") {
                    element.classList.add("d-none");
                }
                break;
            case 'client':
                if (!userConnected || role != "ROLE_USER") {
                    element.classList.add("d-none");
                }
                break;
            case 'employé':
                if (!userConnected || role != "ROLE_EMPLOYE") {
                    element.classList.add("d-none");
                }
                break;

        }
    })
}
/*function sanitizeHtml(text){
    // Créez un élément HTML temporaire de type "div"
    const tempHtml = document.createElement('div');
    
    // Affectez le texte reçu en tant que contenu texte de l'élément "tempHtml"
    tempHtml.textContent = text;
    
    // Utilisez .innerHTML pour récupérer le contenu de "tempHtml"
    // Cela va "neutraliser" ou "échapper" tout code HTML potentiellement malveillant
    return tempHtml.innerHTML;
}*/

// Applique la classe "is-valid" et supprime la classe "is-invalid" si la condition est vraie sinon l'inverse si la condition est fausse.
window.AppData.setClass = function (condition, input, feedbackElement = null, message = "") {
    input.classList.toggle("is-valid", condition);
    input.classList.toggle("is-invalid", !condition);
    if (feedbackElement) {
        feedbackElement.textContent = condition ? "" : message;
    }
    return condition;
}
// Vérifie que le champ n'est pas vide.
window.AppData.validateRequired = function (input) {
    return window.AppData.setClass(input.value != '', input);
}
// Vérifie qu'une date est valide par rapport à un comparateur fourni.
window.AppData.validateDate = function (input, feedback, message, comparator) {
    if (!input.value.trim()) {
        return window.AppData.setClass(false, input, feedback, "Veuillez saisir une date.");
    }
    return window.AppData.setClass(comparator(new Date(input.value).setHours(0, 0, 0, 0), new Date().setHours(0, 0, 0, 0)), input, feedback, message);
}
// Vérifie que la date de naissance n’est pas vide, qu’elle n’est pas égale à aujourd’hui ou 
// située dans le futur et que l’âge est supérieur à égal à 18 ans.
function validateDateNaissance(input) {
    const value = input.value.trim()
    if (!value) {
        return window.AppData.setClass(false, input, window.AppData.dateNaissanceFeedback, "La date de naissance est requise.");
    }
    const birthDate = new Date(value);
    const today = new Date();
    if (birthDate >= today) {
        return window.AppData.setClass(false, input, window.AppData.dateNaissanceFeedback, "La date ne peut être dans le futur.");
    }
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) age--;
    if (age < 18) {
        return window.AppData.setClass(false, input, window.AppData.dateNaissanceFeedback, "Un utilisateur doit avoir au moins 18 ans.");
    }
    return window.AppData.setClass(true, input, window.AppData.dateNaissanceFeedback)

}

// Vérifie que le prix est un nombre supérieur ou égal à 3. (Car 2 crédits sont prix par la plateforme)
window.AppData.validatePrix = function (input) {
    return window.AppData.setClass(input.value >= 3 && input.value <= 999.99, input);
}
// Vérifie que le nombre de places est supérieur à 0 et inférieur à 7.
window.AppData.validateNbPlaces = function (input) {
    return window.AppData.setClass(input.value > 0 && input.value < 7, input);
}
// Vérifie que si le champ est non vide alors c’est une image du type png ou jpeg.
function validatePhoto(input) {
    const fileTypes = ["image/png", "image/jpeg"];
    return window.AppData.setClass(input.files.length === 0 || (fileTypes.includes(input.files[0].type)), input);
}

// Fonction vérifiant que la saisie est au format téléphone.
function validateTelephone(input) {
    const telephoneRegex = /^[0-9]{10}$/;
    const telephoneUser = input.value;
    return window.AppData.setClass(telephoneUser.match(telephoneRegex) || telephoneUser == "", input);
}
// Fonction vérifiant que la saisie est au format email.
window.AppData.validateMail = function (input) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailUser = input.value;
    if (!mailUser.trim()) {
        return window.AppData.setClass(false, input, window.AppData.emailFeedback, "L'adresse e-mail est requise.");
    }
    const isValid = mailUser.match(emailRegex);
    return window.AppData.setClass(isValid, input, window.AppData.emailFeedback, "L'adresse e-mail n'est pas au bon format.");
}
// Fonction vérifiant que la saisie est un mot de passe sécurisé.
window.AppData.validatePassword = function (input) {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{12,}$/;
    const passwordUser = input.value;
    if (!passwordUser.trim()) {
        return window.AppData.setClass(false, input, window.AppData.passwordFeedback, "Le mot de passe est requis.");
    }
    const isStrong = passwordUser.match(passwordRegex);
    return window.AppData.setClass(isStrong, input, window.AppData.passwordFeedback, "Le mot de passe doit contenir au moins 12 caractères dont au moins une majuscule, une minuscule, un chiffre et un caractère spécial.");
}

// Fonction vérifiant que les deux saisies sont identiques.
window.AppData.validateConfirmationPassword = function (inputPwd, inputConfirmPwd) {
    if (!inputConfirmPwd.value.trim()) {
        return window.AppData.setClass(false, inputConfirmPwd, window.AppData.passwordConfirmationFeedback, "");
    }
    const isMatch = inputPwd.value == inputConfirmPwd.value;
    return window.AppData.setClass(isMatch, inputConfirmPwd, window.AppData.passwordConfirmationFeedback, "La confirmation n'est pas identique au mot de passe.");
}
// Convertit un temps en ms au format Xh YY
window.AppData.toHours = function (time) {
    let hours = Math.floor(time / (3600000));
    let minutes = Math.floor(time / (60000) - hours * 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours}h${minutes}`;

}

// Vérifie que la date est renseignée et que les deux champs ville de départ et ville d'arrivée ont été renseignées avec
// avec des villes enregistrées
window.AppData.validateFormRecherche = function (btn, dateDepart, villeDepart, villeArrivee) {
    const dateDepartOk = window.AppData.validateDate(dateDepart, window.AppData.dateDepartFeedback, "La date de départ doit être aujourd'hui ou dans le futur.", (inputDate, today) => inputDate >= today);
    const villeDepartOk = window.AppData.validateNomVille(villeDepart);
    const villeArriveeOk = window.AppData.validateNomVille(villeArrivee) && villeArrivee.value != villeDepart.value;
    btn.disabled = !(dateDepartOk && villeDepartOk && villeArriveeOk);
}

//Function permettant de valider le formulaire de contact
window.AppData.validateFormContact = function (contexte) {
    let nomOk, prenomOk;
    if (contexte == "contact") {
        nomOk = window.AppData.validateRequired(window.AppData.inputNom);
        prenomOk = window.AppData.validateRequired(window.AppData.inputPrenom);
    }
    else {
        nomOk = true;
        prenomOk = true;
    }
    const emailOk = window.AppData.validateMail(window.AppData.inputEmail);
    const objetOk = window.AppData.validateRequired(window.AppData.inputObjet);
    const messageOk = window.AppData.validateRequired(window.AppData.inputMessage);
    window.AppData.btnEnvoyerEmail.disabled = !(nomOk && prenomOk && emailOk && objetOk && messageOk);
}
// Vérifie que la saisie correspond à un nom de ville parmi celles présent dans ce tableau.
window.AppData.validateNomVille = function (input) {
    const villes = ["Paris", "Lyon", "Marseille", "Toulouse", "Nice",
        "Strasbourg", "Montpellier", "Bordeaux", "Lille", "Reims", "Saint-Étienne", "Grenoble",
        "Angers", "Nîmes", "Villeurbanne", "Clermont-Ferrand"];
    return window.AppData.setClass(villes.some(ville => sanitize(ville) == (sanitize(input.value))), input)
}
function sanitize(str) {
    return str.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

// Exécute func uniquement après 'wait' ms sans nouvels appels
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    }
}
window.AppData.debouncedGetVilles = debounce(getVilles, 300);
// Retourne toutes les villes dont le nom commence par la chaine de caractères contenue dans la variable lieu
async function getVilles(lieu, results) {
    let mot = lieu.value.trim();
    if (window.AppData.selected || mot === '') {
        results.innerHTML = "";
        if (window.AppData.villesController) window.AppData.villesController.abort();
        return;
    }
    if (window.AppData.villesController) { window.AppData.villesController.abort() }
    window.AppData.villesController = new AbortController();
    let signal = window.AppData.villesController.signal;
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        signal
    };
    try {
        const response = await fetch(`${window.AppData.apiUrl}ville/autocomplete?mot=${lieu.value}`, requestOptions)
        if (!response.ok) {
            console.error("Impossible de récupérer les villes", result.message);
        }
        const result = await response.json();
        results.innerHTML = "";
        if (Array.isArray(result)) {
            for (const ville of result) {
                let newDiv = window.AppData.createEl("div", ['form-control'], ville);
                newDiv.style.borderColor = "#93c8b6";
                newDiv.style.boxShadow = "0 0 0 0.25rem rgba(39, 144, 109, 0.25)";
                newDiv.addEventListener("click", () => {
                    lieu.value = ville;
                    lieu.dispatchEvent(new Event('input', { bubbles: true }));
                    results.innerHTML = "";
                    window.AppData.selected = true;
                });
                results.appendChild(newDiv);
            }
        }
    } catch (error) {
        if (error.name !== 'AbortError')
            console.error("Erreur lors de la récupération des villes :", error);
    };
}





// Retourne toutes les informations utilisateurs
window.AppData.getInfosUser = async function () {
    const result = await window.AppData.apiFetch("account/me");
    if (!result.ok) {
        console.error("Impossible de récupérer les informations utilisateur.", result.message);
        return null;
    }
    return result.data;
}


//Fonction permettant de valider les formulaire "Inscription", "Créer un compte employé", "Modifier mes informations personnelles"
window.AppData.validateForm = function (contexte) {
    const PhotoOk = (contexte === 'employe') || (contexte === "modification") ? validatePhoto(window.AppData.inputPhoto) : true;
    const nomOk = window.AppData.validateRequired(window.AppData.inputNom);
    const prenomOk = window.AppData.validateRequired(window.AppData.inputPrenom);
    const pseudoOk = (contexte === 'employe') || (contexte === "inscription") ? window.AppData.validateRequired(window.AppData.inputPseudo) : true;
    const DateDeNaissanceOk = validateDateNaissance(window.AppData.inputDateDeNaissance);
    const EmailOk = (contexte === 'employe') || (contexte === "inscription") ? window.AppData.validateMail(window.AppData.inputEmail) : true;
    const TelephoneOk = validateTelephone(window.AppData.inputTelephone);
    const AdresseOk = (contexte === 'employe') ? window.AppData.validateRequired(window.AppData.inputAdresse) : true;
    const passwordOk = (contexte === 'modification') ? true : window.AppData.validatePassword(window.AppData.inputPassword);
    const passwordConfirmOk = (contexte === 'modification') ? true : window.AppData.validateConfirmationPassword(window.AppData.inputPassword, window.AppData.inputValidationPassword);
    window.AppData.btnInscription.disabled = !(PhotoOk && nomOk && pseudoOk && prenomOk && DateDeNaissanceOk && EmailOk && TelephoneOk && AdresseOk && passwordOk && passwordConfirmOk);
}

window.AppData.createEl = function (tag, classes = [], text = "") {
    const el = document.createElement(tag);
    if (classes.length) { el.classList.add(...classes); }
    if (text) { el.textContent = text; }
    return el;
}

window.AppData.showToast = function (message, type = 'info') {
    const toastEl = document.getElementById("liveToast");
    const toastMessage = document.getElementById("toastMessage");
    toastMessage.textContent = message;
    toastEl.className = `toast align-items-center text-bg-${type} border-0`;
    const bsToast = bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 7000 });
    bsToast.show();
}
// Créer un bouton
window.AppData.makeButton = function (container, label, classes, onClick) {
    const btn = window.AppData.createEl("button", ["btn", ...classes], label);
    if (container) {
        container.appendChild(btn);
    } else (console.warn('Container non défini.'))
    btn.onclick = onClick;
    return btn;
}
window.AppData.apiFetch = async function (endpoint, method = "GET", body = null, auth = true) {
    const headers = { "Content-Type": "application/json" };
    if (auth) headers["X-AUTH-TOKEN"] = getToken();

    const requestOptions = { method, headers };
    if (body) requestOptions.body = JSON.stringify(body);
    try {
        const response = await fetch(window.AppData.apiUrl + endpoint, requestOptions);
        let data = null;
        try {
            data = await response.json();
        } catch (jsonError) {
            data = null;
        }
        if (!response.ok) {
            let serverMsg = null;
            if (data) {

                if (data.error) {
                    serverMsg = data.error;
                }
                else if (data.errors) {
                    serverMsg = Object.entries(data.errors).map(([field, msg]) => `${field}: ${msg}`).join("\n");
                    serverMsg = serverMsg.replace(/\s*\(code .*?\)$/, '').trim();
                }
            }
            console.error(`Erreur ${response.status} lors de l'appel à ${endpoint}.`, serverMsg || data);
            return { ok: false, message: serverMsg || "Erreur serveur", data };
        }
        return { ok: true, data: response.status === 204 ? true : data };

    } catch (error) {
        console.error(`Erreur lors de l'appel à ${endpoint}.`, error);
        return { ok: false, message: "Erreur réseau ou serveur inaccessible", error };
    }
}

// Paiement du participant à la plateforme ou de la plateforme au participant/chauffeur
window.AppData.paiement = async function (prix, id, motif) {
    let body = {
        "dateOperation": new Date().toISOString(),
        "montant": prix
    };
    if (!["payerChauffeur", "achat", "remboursement"].includes(motif)) {
        console.error("Motif invalide.")
        return false;
    }
    const result = await window.AppData.apiFetch(`credit/payer/${Number(id)}/${motif}`, "POST", body);
    if (!result.ok) {
        const message = result.message || "une erreur est survenue lors du paiement."
        window.AppData.showToast(`Echec du paiement : ${message}`, "danger");
        return false;
    }
    let texteMotif = motif === "payerChauffeur" ? "Paiement du chauffeur" : motif === "achat" ? "Paiement" : "Remboursement";
    window.AppData.showToast(`${texteMotif} effectué avec succès.`, "success");
    window.AppData.credit = result.data['creditTotal'];
    return true;
}


// Retourne le nombre de covoiturages non validés (le nombre de covoiturages auquel l'utilisateur a participé
// mais n'a pa encore validé en répondant à la question de fin de trajet).
window.AppData.getNotRespondedCovoiturages = async function () {
    const result = await window.AppData.apiFetch("covoiturage/NotRespondedCovoiturages");
    if (!result.ok) {
        console.error("Impossible de récupérer le nombre de covoiturages non validés.", result.message);
        nbCovoituragesNotResponded.classList.add('hidden');
        return null;
    }
    if (Array.isArray(result.data) && result.data.length > 0) {
        window.AppData.notRespondedCovoiturages = result.data;
        nbCovoituragesNotResponded.textContent = result.data.length;
        nbCovoituragesNotResponded.classList.remove('hidden');
    } else {
        nbCovoituragesNotResponded.classList.add('hidden');
    }
    return result.data;
}
    ; (async () => {
        if (window.AppData.isConnected()) {
            await window.AppData.getNotRespondedCovoiturages();
        }
    })();

window.AppData.pluralize = function (count, word) {
    return count > 1 ? word + 's' : word;
}

window.AppData.formatPrix = function (valeur) {
    const nombre = typeof valeur === "string" ? parseFloat(valeur) : valeur;
    if (isNaN(nombre)) return valeur;
    return nombre.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
// Image  de profil par défault
window.AppData.addLettre = function (image,pseudo, chauffeur=false){
    image.innerHTML="";
    const div = window.AppData.createEl('div', ['lettre']);
    div.textContent=pseudo.charAt(0);
    if (chauffeur){
        div.classList.add('item1')
    }
    image.appendChild(div);

}