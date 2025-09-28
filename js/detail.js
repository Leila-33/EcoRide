/* global bootstrap */
let param = new URL(document.location).searchParams;
const numId = parseInt(param.get("id"));
// Modale "Participer à ce covoiturage"
const myModalParticiperCovoiturage = new bootstrap.Modal('#myModalParticiperCovoiturage');
const btnParticiperCovoiturage = document.getElementById("btnParticiperCovoiturage");
const confirmerParticiper = document.getElementById("confirmerParticiper");
// Modale "Annuler"
const myModalAnnulerCovoiturage = new bootstrap.Modal('#myModalAnnulerCovoiturage');
const annulerCovoiturageModal = document.getElementById("annulerCovoiturageModal");
const btnSupprimerCovoiturage = document.getElementById("btnSupprimerCovoiturage");
btnSupprimerCovoiturage.addEventListener("click", async () => {
    await window.AppData.withLoader(async () => {
        await supprimerCovoiturage();
        myModalAnnulerCovoiturage.hide();
    });
});

const container = document.getElementById("container");
const img = document.getElementById("img");
const depart = document.getElementById("depart");
const departDate = document.getElementById("departDate");
const heureDepart = document.getElementById("heureDepart");
const lieuDepart = document.getElementById("lieuDepart");
const duree = document.getElementById("duree");
const prixPersonne = document.getElementById("prixPersonne");
const arrivee = document.getElementById("arrivee");
const arriveeDate = document.getElementById("arriveeDate");
const heureArrivee = document.getElementById("heureArrivee");
const lieuArrivee = document.getElementById("lieuArrivee");
const place = document.getElementById("place");
const energie = document.getElementById("energie");
const voiture = document.getElementById("voiture");
const voitureDetails = document.getElementById("voitureDetails");
const preference = document.getElementById("preference");
const pseudo = document.getElementById("pseudo");
const note = document.getElementById("note");
const avisContainer = document.getElementById("avis");
const question = document.getElementById("question");
let statut = "", idChauffeur = null, userResponse = null, prix = 0, users = [], nbPlace = 0, idUser = null, pseudoUser = "", emailUser = "", Chauffeur = false, Passager = false, isAdminOrEmploye = false;
let btnStatut = window.AppData.makeButton(null, "Statut", ["btn-primary", "m-auto"], () => { })
let btnAnnuler;

//Modale "Laisser un avis"
const avisForm = document.getElementById("avisForm")
const btnEnvoyerAvis = document.getElementById("btnEnvoyerAvis");
btnEnvoyerAvis.disabled = true;
const NoteInput = document.getElementById("NoteInput");
NoteInput.addEventListener('input', validateFormAvis);
function validateFormAvis() {
    btnEnvoyerAvis.disabled = !(window.AppData.setClass((NoteInput.value > 0) && (NoteInput.value < 6), NoteInput));
}

//Modale "Laisser un commentaire"
const CommentaireInput = document.getElementById("CommentaireInput")
const btnEnvoyerCommentaire = document.getElementById("btnEnvoyerCommentaire");
btnEnvoyerCommentaire.disabled = true;
CommentaireInput.addEventListener("input", () => { btnEnvoyerCommentaire.disabled = !(window.AppData.validateRequired(CommentaireInput)) });


// Initialiser les informations de l'utilisateur
async function initUserData() {
    await window.AppData.withLoader(async () => {
        try {
            if (window.AppData.isConnected()) {
                const result = await window.AppData.getInfosUser();
                idUser = result['id'];
                pseudoUser = result['pseudo'];
                emailUser = result['email'];
                window.AppData.credit = result['credit']['total'];
                const roles = result['roles'] || [];
                isAdminOrEmploye = roles.includes("ROLE_ADMIN") || roles.includes("ROLE_EMPLOYE");
                await getRoles();
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données utilisateur : ", error);
        }
        finally { await getCovoiturage(); }
    });
}
initUserData();

// Obtenir les rôles
async function getRoles() {
    const roles = await window.AppData.apiFetch("roleEntity");
    if (!roles.ok) {
        console.error("Impossible de récupérer les rôles.", roles.message);
        return;
    }
    Passager = roles.data.some(r => r.libelle === "passager");
}


// Retourne la réponse de l'utilisateur à la question qui lui est posée en fin de trajet
async function getReponse() {
    const result = await window.AppData.apiFetch(`reponse/show/${numId}`);
    if (!result.ok) {
        console.error('Aucune réponse trouvée pour cet utilisateur.', result.message);
        return;
    }
    userResponse = result.data;
}





// Retourne le covoiturage
async function getCovoiturage() {
    let requestOptions = {
        method: "GET",
        headers: { "Content-Type": "application/json" }
    };
    if (!numId) {
        console.error('ID du covoiturage manquant.');
    }
    try {
        const response = await fetch(`${window.AppData.apiUrl}covoiturage/${numId}`, requestOptions);
        if (!response.ok) {
            console.error("Impossible de récupérer les informations du covoiturage.");
            window.location.replace("/");
        }
        const result = await response.json();

        // Variable valant true si l'utilisateur est chauffeur du covoiturage
        Chauffeur = idUser == result['chauffeur']['id'];
        await setCovoiturage(result);
        await getAvis();
    }
    catch (error) {
        console.error('Erreur dans la récupération des covoiturages :', error);
        return null;
    }

}

// Afficher le covoiturage
async function setCovoiturage(i) {
    note.textContent = i['noteMoyenne'] != null ? `Note : ${i['noteMoyenne']}/5` : '';
    btnAnnuler?.remove();
    btnStatut?.remove();
      if (i['chauffeur']['photo']){
            const image = window.AppData.createEl("img", ["imgAccount"]);
            image.src = `${window.AppData.urlPhoto}/${i['chauffeur']['photo']}`;
            image.alt = "Photo de profil"
            img.appendChild(image)
        }
        else {
            window.AppData.addLettre(img, i['chauffeur']['pseudo']);
        };
    depart.textContent = "Départ :";
    departDate.textContent = new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateDepart']));
    heureDepart.textContent = i['heureDepart'];
    lieuDepart.textContent = i['lieuDepart'];
    duree.textContent = `Durée : ${window.AppData.toHours(new Date(`${i['dateArrivee']}T${i['heureArrivee']}`) - new Date(`${i['dateDepart']}T${i['heureDepart']}`))}`;
    prixPersonne.textContent = `Prix : ${i['prixPersonne']} crédits`;
    pseudo.textContent = i['chauffeur']['pseudo'];
    arrivee.textContent = "Arrivée :";
    arriveeDate.textContent = new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateArrivee']));
    heureArrivee.textContent = i['heureArrivee'];
    lieuArrivee.textContent = i['lieuArrivee'];
    place.textContent = i['nbPlaces'] === 0 ? "Complet" : i['nbPlaces'] === 1 ? "1 place restante" : `${i['nbPlaces']} places restantes`;
    energie.textContent = i['energie'] == "Essence" ? "Trajet non écologique" : "Trajet écologique";
    voiture.textContent = "Voiture : "
    voitureDetails.textContent = `${i["voiture"]["marque"]} ${i["voiture"]["modele"]} ${i["voiture"]["couleur"]}`;
    preference.textContent = "Préférences du conducteur:";
    let ligne, colonne;
    i["chauffeur"]["parametres"].forEach((parametre, index) => {
        colonne = (index % 4) + 4;
        ligne = colonne > 8 ? 6 : 5;
        let newDiv = document.createElement("p");
        newDiv.textContent = `${parametre['propriete']} ${parametre['valeur']}`;
        newDiv.style.gridColumn = `${colonne}/${colonne + 1}`;
        newDiv.style.gridRow = `${ligne}/${ligne + 1}`;
        container.appendChild(newDiv);
    });
    idChauffeur = i['chauffeur']['id'];
    prix = i['prixPersonne'];
    users = i['users'];
    nbPlace = i['nbPlaces'];
    statut = i["statut"];
    await setStatutButton();
    const nbParams = i["chauffeur"]["parametres"].length;
    adjustButtonsForMobile(nbParams); 
    window.addEventListener("resize", () => adjustButtonsForMobile(nbParams));
}

function moveButtonsToEnd(nb){
    const row = 11 + Math.ceil((nb-2)/4);
    btnStatut.style.gridRow = `${row+2}/${row+3}`;
    question.style.gridColumn = "1/3";
    question.style.gridRow = `${row}/${row+1}`;    
    if (btnAnnuler){
        btnStatut.style.gridColumn = "2/3";
        container.appendChild(btnAnnuler);
        btnAnnuler.style.gridColumn = "3/4";
        btnAnnuler.style.gridRow = `${row+2}/${row+3}`;
    }
    else{
        btnStatut.style.gridColumn = "1/-1";

    
}}
function adjustButtonsForMobile(nb){
    container.appendChild(btnStatut);
    if (window.innerWidth <= 768){
        moveButtonsToEnd(nb);
    }
    else{
    question.style.gridColumn = "2/4";
    question.style.gridRow = "6/7"; 
       btnStatut.style.gridColumn ="8/9";
        btnStatut.style.gridRow = "2/3";
        if (btnAnnuler){
            btnAnnuler.style.gridColumn ="8/9";
            btnAnnuler.style.gridRow = "3/4";}
    }
    }
    function setButtonsForMobile(btnOui,btnNon){
        btnOui.style.marginBottom = "auto";
        btnOui.style.marginRight = "auto";
        btnNon.style.marginBottom = "auto";

    if (window.innerWidth <= 768){
        btnOui.style.gridColumn ="3/4";
        btnOui.style.gridRow = "12/13";
        btnNon.style.gridColumn ="4/5";
        btnNon.style.gridRow = "12/13";
        btnNon.style.marginRight = "auto";
        btnNon.style.marginLeft = "";

    }
    else{
        btnOui.style.gridColumn ="4/5";
        btnOui.style.gridRow = "6/7";
        btnNon.style.gridColumn ="4/5";
        btnNon.style.gridRow = "6/7";
        btnNon.style.marginBottom = "auto";
        btnNon.style.marginLeft = "auto";
        btnNon.style.marginRight = "";

    }}




// Affiche le statut du covoiturage pour le chauffeur
function setButtonChauffeur() {
    switch (statut) {
        case "en attente":
            btnAnnuler = window.AppData.makeButton(container, "Annuler", ["btn-danger", "m-auto"], () => { myModalAnnulerCovoiturage.show(); })
            btnStatut.textContent = 'Démarrer';
            break;
        case "en cours":
            btnStatut.textContent = 'Arrivé à destination';
            break;
        case "terminé":
            btnStatut.textContent = 'Terminé';
            break;
    }
    btnStatut.onclick = async () => { await window.AppData.withLoader(clickStatutAndButton); };
}

// Affiche le statut du covoiturage pour le participant
async function setButtonPassagerParticipant() {
    switch (statut) {
        case "en attente":
            btnStatut.textContent = 'En attente';
            btnAnnuler = window.AppData.makeButton(container, "Annuler", ["btn-danger", "my-auto"], () => {
                annulerCovoiturageModal.textContent = `En annulant, un remboursement de ${window.AppData.formatPrix(prix)} crédits sera effectué sur votre compte.`;
                myModalAnnulerCovoiturage.show();
            })
            break;
        case "en cours":
            btnStatut.textContent = 'En cours';
            break;
        case "terminé":
            btnStatut.textContent = 'Arrivé à destination';
            await getReponse();
            setQuestionPassager();
            break;
    }
}
async function setButtonPassagerNonParticipant() {
    // Si le nombre de places est insuffisant
    btnStatut.disabled = (nbPlace == 0 || parseFloat(window.AppData.credit) < parseFloat(prix) || statut != 'en attente' || isAdminOrEmploye);
    if (nbPlace == 0) {
        btnStatut.textContent = 'Complet'; return;
    }
    if (statut == 'en attente') {
        btnStatut.textContent = 'Participer';
        //Si crédit insuffisant
        if (parseFloat(window.AppData.credit) < parseFloat(prix)) {
            btnStatut.disabled = true;
            let creditInsuffisant = window.AppData.createEl("p", ["item18", "mx-auto"], 'Solde insuffisant');
            container.appendChild(creditInsuffisant);
            return;
        }

        btnStatut.onclick = () => {
            if (Passager) {
                confirmerParticiper.textContent = `En participant, vous acceptez le débit de ${window.AppData.formatPrix(prix)} crédits de votre compte.`;
                myModalParticiperCovoiturage.show();
            }
            else { alert('Pour participer, vous devez activer le mode "Passager" depuis votre espace personnel.') }
        };

        btnParticiperCovoiturage.onclick = async () => {
            await window.AppData.withLoader(participerCovoiturage);

        }
    } else {
        btnStatut.textContent = 'Covoiturage démarré';
    }
}
// Participer au covoiturage
async function participerCovoiturage() {
    // Effectuer le paiement
    const paiementReussi = await window.AppData.paiement(prix, idUser, "achat");
    if (!paiementReussi) {
        alert('Le paiement a échoué. Veuillez réessayer.');
        return;
    }
    // Ajouter le participant
    const ajoutOk = await ajouterParticipant();
    if (ajoutOk) {
        myModalParticiperCovoiturage.hide();
        window.AppData.showToast('Participation enregistrée avec succès.', "success");
        await email("confirmationPassager", { utilisateurs: [{ id: idUser, pseudo: pseudoUser, email: emailUser }] });
        return;
    }
    // Si l'ajout échoue, rembourser automatiquement
    const remboursementOk = await window.AppData.paiement(prix, idUser, "remboursement");
    if (remboursementOk) {
        window.AppData.showToast("Votre participation n'a pas pu être enregistrée. Le remboursement a été effectué.", "danger");
    }
    else {
        console.error('Impossible de rembourser automatiquement.');
        await email("remboursementEchoue", { utilisateurs: [{ id: idUser, pseudo: pseudoUser, email: emailUser }] });
        window.AppData.showToast("Une erreur est survenue et le remboursement n'a pas pu été effectué. Le support a été notifié.", "danger");
    }

}

// Affiche le statut du covoiturage pour l'invité
function setButtonInvite() {
    btnStatut.disabled = (nbPlace == 0 || statut != "en attente")
    if (statut != "en attente") {
        btnStatut.textContent = 'Covoiturage démarré';
    }
    else if (nbPlace == 0) {
        btnStatut.textContent = 'Complet';
    }
    else {
        btnStatut.textContent = 'Participer';
        btnStatut.onclick = () => { window.location.replace("/signin") };
    }
}




// Afficher le bouton indiquant le statut
async function setStatutButton() {
    // Si l'utilisateur est chauffeur
    if (Chauffeur == true) {
        setButtonChauffeur();
        // Si l'utilisateur est non chauffeur et connecté
    } else if (window.AppData.isConnected()) {
        if (includes(users, idUser)) {// Si l'utilisateur est participant
            await setButtonPassagerParticipant();
        }
        else {
            await setButtonPassagerNonParticipant();
        }
    } // Si l'utilisateur est non participant          
    // Personne non connectée
    else { setButtonInvite(); }
}

// Retourne true si l'utilisateur est participant du covoitueage
function includes(users, idUser) {
    return users.some(u => u.id === idUser);
}
// Affiche la question permettant au passager de valider le covoiturage
async function setQuestionPassager() {
    if (!includes(users, idUser)) { return; }
    // Si l'utilisateur est participant et n'a pas répondu
    if (!userResponse) {
        question.textContent = "Le trajet s'est-il bien passé ?"
        let btnOui = window.AppData.makeButton(container, "Oui", ["btn-primary"], async () => {
            await window.AppData.withLoader(async () => {
                const success = await setReponse({ reponse1: "oui" });
                if (!success) return;
                await window.AppData.getNotRespondedCovoiturages();
                [btnOui, btnNon, question].forEach(btn => btn.remove());
                await setBoutons(1); // Afficher "Soumettre un avis"
                await window.AppData.paiement(prix, idChauffeur, "payerChauffeur");
            });
        }) // Payer le chauffeur
            ;
        let btnNon = window.AppData.makeButton(container, "Non", ["btn-danger"], async () => {
            await window.AppData.withLoader(async () => {
                const success = await setReponse({ reponse1: "non" });
                if (!success) return;
                await window.AppData.getNotRespondedCovoiturages();
                [btnOui, btnNon, question].forEach(btn => btn.remove());
                await setBoutons(2); // Afficher "Laisser un commentaire"
            });
        });
        setButtonsForMobile(btnOui,btnNon);
        window.addEventListener("resize", () => setButtonsForMobile(btnOui,btnNon));

    } else if (userResponse["reponse1"] === "oui" && (!userResponse["reponse2"])) {
        await window.AppData.withLoader(() => setBoutons(1)); // Afficher "Soumettre un avis"        
    } else if (userResponse["reponse1"] === "non" && (!userResponse["reponse2"])) {
        await window.AppData.withLoader(() => setBoutons(2)); // Afficher "Laisser un commentaire"
    }
}

// Afficher les boutons "Soumetre un avis" et "Laisser un commentaire"
async function setBoutons(i) {
    if (i == 1) { // Soumetre un avis
        let btnSoumettreAvis = window.AppData.makeButton(container, 'Soumettre un avis', ["btn-primary", "btnOui"], () => {
            const myModalLaisserAvis = new bootstrap.Modal('#myModalLaisserAvis');
            myModalLaisserAvis.show();
        });

        btnEnvoyerAvis.onclick = async () => {
            await window.AppData.withLoader(async () => {
                const success = await LaisserAvis();
                if (!success) return;
                btnSoumettreAvis.remove();
                await setReponse({ reponse2: "oui" });
            });
        };
    }
    else { // Laisser un commentaire
        let btnLaisserCommentaire = window.AppData.makeButton(container, 'Laisser un commentaire', ["btn-primary", "btnOui"], () => {
            const myModalLaisserCommentaire = new bootstrap.Modal('#myModalLaisserCommentaire');
            myModalLaisserCommentaire.show();
        });

        btnEnvoyerCommentaire.onclick = async () => {
            await window.AppData.withLoader(async () => {
                const success = await LaisserCommentaire();
                if (!success) return;
                btnLaisserCommentaire.remove();
                await setReponse({ reponse2: "oui" });

            });
        }
    }
}



// Enregitrer la réponse à la question de validation du covoiturage "Le trajet s'est-il bien passé ?" 
async function setReponse({ reponse1 = null, reponse2 = null }) {
    let url, method, body;
    if (reponse1 !== null) {
        url = `reponse/setReponse1/${numId}`;
        method = "POST";
        body = { reponse1 };
    } else if (reponse2 !== null) {
        url = `reponse/editReponse/${numId}`;
        method = "PUT";
        body = { reponse2 };
    }
    else {
        console.error("Aucune donnée valide transmise à setReponse.");
        return null;
    }
    const result = await window.AppData.apiFetch(url, method, body)
    if (!result.ok) {
        console.error("Erreur lors de l'envoi de la réponse", result.message);
        return false;
    }
    return true;
}



// Supprimer le covoiturage si l'utilisateur est chauffeur ou annuler sa participation au covoiturage s'il est passager
async function supprimerCovoiturage() {
    let endpoint = Chauffeur ? "covoiturage/" : "covoiturage/removeUser/"
    const result = await window.AppData.apiFetch(endpoint + numId, "DELETE");
    if (!result.ok) {
        console.error('Erreur lors de la suppression du covoiturage.', result.message);
        return null;
    }
    await annulerCovoiturage();
}

// Pour annuler le covoiturage :
// Si l'utilisateur est chauffeur, il faut prévenir les participants que le trajet a été annulé, rembourser les participants.
// Si l'utlisateur est participant, il faut rembourser le participant et si le remboursement échoue.
// Si un remboursement échoue, il faut prévenir le support.
async function annulerCovoiturage() {
    try {
        if (Chauffeur) {
            await email("annuler"); // Prévenir les passagers que le trajet a été annulé
            const results = await Promise.allSettled(users.map(user => window.AppData.paiement(prix, user['id'], "remboursement"))); // Remboursement de tous les passagers
            const failedPayments = results.map((r, i) => r.status === 'rejected' || r.value === 'false' ? users[i] : null).filter(u => u !== null);
            if (failedPayments.length > 0) {
                console.error(`${failedPayments.length} remboursements ont échoué.`);
                await email("remboursementEchoue", { utilisateurs: failedPayments });
            } // Prévenir que certains remboursements ont échoués
            window.location.replace("/account");
            return;
        }
        else {
            const success = await window.AppData.paiement(prix, idUser, "remboursement"); // Remboursement du passager
            if (!success) {
                await email("remboursementEchoue", { utilisateurs: [{ id: idUser, pseudo: pseudoUser, email: emailUser }] }); // Prévenir que le remboursement a échoué
                alert("Le remboursement n'a pas pu être effectué. Le support a été notifié.");
                return;
            }
            await getCovoiturage();
        }
    }
    catch (error) {
        console.error('Erreur dans annulerCovoiturage:', error);
    }
}


// Laisser un avis si le covoiturage s'est bien passé
async function LaisserAvis() {
    let dataForm = new FormData(avisForm);
    if (!dataForm.get("Note")) {
        console.error('Note manquante');
        return;
    }
    let body = {
        "note": Number(dataForm.get("Note")),
        "commentaire": dataForm.get("Avis"),
        "chauffeur": idChauffeur
    };
    let result = await window.AppData.apiFetch("avis", "POST", body);
    if (!result.ok) {
        window.AppData.showToast(`Erreur lors de l'envoi de l'avis : ${result.message}`, "danger");
        return;
    }
    window.AppData.showToast("Avis envoyé avec succès.", "success");
    await getAvis();
    return true;
}

async function LaisserCommentaire() {
    let body = {
        "commentaire": CommentaireInput.value.trim()
    };
    let result = await window.AppData.apiFetch(`commentaire/${numId}`, "POST", body);
    if (!result.ok) {
        window.AppData.showToast(`Erreur lors de l'envoi du commentaire : ${result.message}`, "danger");
        return;
    }
    window.AppData.showToast("Commentaire envoyé avec succès.", "success");
    return true;
}

// Mettre à jour le statut et le bouton statut en fonction d'un clic
async function clickStatutAndButton() {
    let body = null;
    if (statut === "en attente") { body = { "statut": "en cours" }; }
    else if (statut === "en cours") { body = { "statut": "terminé" }; }
    if (!body) { return; }
    const result = await window.AppData.apiFetch(`covoiturage/${numId}`, "PUT", body);
    if (!result.ok) {
        console.error("Erreur lors de la mise à jour du statut.", result.message);
        return null;
    }
    if (statut === "en attente") {
        btnAnnuler.remove();
        btnStatut.textContent = 'Arrivé à destination';
        statut = "en cours";
    }
    else if (statut === "en cours") {
        btnStatut.textContent = 'Terminé';
        statut = "terminé";
        setQuestionPassager();
        await email("finTrajet");
    }
    console.log("Statut mis à jour :", statut);
}


// Obtenir les avis
async function getAvis() {
    const result = await window.AppData.apiFetch(`avis/allAvis/${Number(idChauffeur)}`, "GET", null, false);
    if (!result.ok) {
        console.error("Impossible de récupérer les avis.", result.message);
        return null;
    }
    setAvis(result.data);
}

// Afficher les avis
function setAvis(avis) {
    if (!Array.isArray(avis) || avis.length == 0) {
        avisContainer.classList.add('text-center');
        avisContainer.textContent = ("Ce chauffeur n'a pas encore d'avis.");
        return [];
    }

    avisContainer.innerText = '';
    avisContainer.setAttribute("style", `display:grid; grid-template-columns:100px 100px 1fr; grid-template-rows: repeat(${avis.length}, auto)`);

    avis.forEach((i, index) => {
        let row = Number(avis.length - index);
        let pseudo = window.AppData.createEl("p", [], i['auteurPseudo']);
        pseudo.style.gridColumn = "1/2";
        pseudo.style.gridRow = `${row}/${row + 1}`;

        let note = window.AppData.createEl("p", [], `${i['note']}/5`);
        note.style.gridColumn = "2/3";
        note.style.gridRow = `${row}/${row + 1}`;
        let commmentaireText;
        if (i['statut'] === 'validé') {
            commmentaireText = i['commentaire'];
        } else if (i['auteurId'] === idUser) {
            commmentaireText = `${i['commentaire']} (en attente de modération)`;
        } else { commmentaireText = `Avis en attente de modération`; }
        let commentaire = window.AppData.createEl("p", [], commmentaireText);
        commentaire.style.gridColumn = "3/4";
        commentaire.style.gridRow = `${row}/${row + 1}`;
        avisContainer.append(pseudo, note, commentaire);
    })
}

// Ajouter l'utilisateur aux users (participants) du covoiturage 
async function ajouterParticipant() {
    const result = await window.AppData.apiFetch(`covoiturage/addUser/${numId}`, "PUT");
    if (!result.ok) {
        console.error("Impossible d'ajouter un participant.", result.message);
        return null;
    }
    console.log("Participant ajouté.");
    await getCovoiturage();
    return true;
}

// Envoyer un email
async function email(subject, extraData = {}) {
    const body = { "subject": subject, ...extraData };
    const result = await window.AppData.apiFetch(`mailer/emailCovoiturage/${numId}`, "POST", body);
    if (!result.ok) {
        console.error("Impossible d'envoyer l'email.", result.message);
        return;
    }
    console.log("Email envoyé avec succès.");
}


