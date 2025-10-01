/* global bootstrap */
const covoiturages = document.getElementById("covoiturages");
const emailForm = document.getElementById("emailForm");
window.AppData.inputEmail = document.getElementById("EmailInput");
window.AppData.emailFeedback = document.getElementById("emailFeedback");
window.AppData.inputObjet = document.getElementById("ObjetInput");
window.AppData.inputMessage = document.getElementById("MessageInput");
window.AppData.btnEnvoyerEmail = document.getElementById("btnEnvoyerEmail");
window.AppData.btnEnvoyerEmail.addEventListener("click", async () => { await window.AppData.withLoader(() => emailChauffeur()) });
window.AppData.btnEnvoyerEmail.disabled = true;
[window.AppData.inputEmail, window.AppData.inputObjet, window.AppData.inputMessage].forEach(input => { input.addEventListener("input", window.AppData.validateFormContact); });
const adminName = document.getElementById("adminName");

async function initUserData() {
    await window.AppData.withLoader(async () => {
        const result = await window.AppData.getInfosUser();
        adminName.textContent = `${result['prenom']}  ${result['nom']}`;
        await getReponsesNon();
    })
}
initUserData();


async function getReponsesNon() {
    const result = await window.AppData.apiFetch("reponse/reponsesNon")
    if (!result.ok) {
        console.error("Impossible de récupérer les réponses.", result.message);
        return;
    }
    setReponses(result.data);
}

async function setReponses(reponses) {
    covoiturages.innerHTML = "";
    if (!Array.isArray(reponses) || reponses.length === 0) {
        covoiturages.classList.add('text-center');
        covoiturages.textContent = "Aucun trajet à traiter.";
        return;
    }
    for (let reponse of reponses) {
        let covoiturage = reponse['covoiturage'];
        let card = window.AppData.createEl("div", ["card", "mb-3", "mx-1", "mx-md-5"]);
        let cardBody = window.AppData.createEl("div", ["card-body", "shadow-sm", "rounded", "cardBodyReponses-employe"]);

        let depart = window.AppData.createEl("p", ["my-auto", "depart-employe"], "Départ :");
        let dateDepart = window.AppData.createEl("p", ["my-auto", "dateDepart-employe"], new Intl.DateTimeFormat("fr-FR").format(new Date(covoiturage['dateDepart'])));
        let heureDepart = window.AppData.createEl("p", ["my-auto", "heureDepart-employe"], covoiturage['heureDepart']);
        let lieuDepart = window.AppData.createEl("p", ["my-auto", "lieuDepart-employe"], covoiturage['lieuDepart']);

        let arrivee = window.AppData.createEl("p", ["my-auto", "arrivee-employe"], "Arrivée");
        let dateArrivee = window.AppData.createEl("p", ["my-auto", "dateArrivee-employe"], new Intl.DateTimeFormat("fr-FR").format(new Date(covoiturage['dateArrivee'])));
        let heureArrivee = window.AppData.createEl("p", ["my-auto", "heureArrivee-employe"], covoiturage['heureArrivee']);
        let lieuArrivee = window.AppData.createEl("p", ["my-auto", "lieuArrivee-employe"], covoiturage['lieuArrivee']);

        let participant = window.AppData.createEl("p", ["my-auto", "participant-employe"], `Participant : ${reponse['user']['email']}`);
        let commentaireText = reponse['commentaire'] ? reponse['commentaire']['commentaire'] : "Aucun commentaire";
        let commentaire = window.AppData.createEl("p", ["my-auto", "commentaire-employe"], `Commentaire : ${commentaireText}`);
        let email = window.AppData.createEl("p", ["my-auto", "email-employe"], `Chauffeur : ${covoiturage['chauffeur']['email']}`);

        let num = window.AppData.createEl("p", ["mx-auto", "num-employe"], `Covoiturage n°${covoiturage['id']}`);
        let prix = window.AppData.createEl("p", ["my-auto", "prix-employe"], `Prix : ${window.AppData.formatPrix(covoiturage['prixPersonne'])} crédits`);

        [num, depart, dateDepart, heureDepart, lieuDepart, arrivee, dateArrivee, heureArrivee, lieuArrivee, prix,email, participant, commentaire].forEach(child => cardBody.appendChild(child));
        card.appendChild(cardBody);

        let btnContacter = window.AppData.makeButton(cardBody, 'Contacter le chauffeur', ["btn-primary", "m-auto", "btnContacter-employe"], () => {
            const myModalEnvoyerEmail = new bootstrap.Modal('#myModalEnvoyerEmail');
            window.AppData.inputEmail.value = covoiturage['chauffeur']['email'];
            window.AppData.inputObjet.value = `Covoiturage du ${new Date(covoiturage['dateDepart']).toLocaleDateString('fr-FR')} à ${covoiturage['heureDepart']}`;
            myModalEnvoyerEmail.show();
        });

        let btnPayer = window.AppData.makeButton(cardBody, 'Payer le chauffeur', ["btn-primary", "m-auto", "btnPayer-employe"],
            async () => {
                await window.AppData.withLoader(async () => {
                    const success = await window.AppData.paiement(covoiturage['prixPersonne'], covoiturage['chauffeur']['id'], "payerChauffeur");
                    if (success) btnPayer.remove();
                });
            });

        let btnResolu = window.AppData.makeButton(cardBody, 'Résolu', ["btn-primary", "m-auto", "btnResolu-employe"], async () => {
            await window.AppData.withLoader(async () => {
                const success= await setStatutResolu(Number(reponse['id']));
                if (success) {
                    card.remove();
                    getReponsesNon();}

                 });            
        })


        covoiturages.appendChild(card);
    }
    covoiturages.after(window.AppData.createEl("div", ["mb-3"]));
}







async function setStatutResolu(numId){
    const result = await window.AppData.apiFetch(`reponse/setStatutResolu/${numId}`, "PUT");
    if (!result.ok) {
        console.error("Erreur lors de la mise à jour du statut.", result.message);
        return null;
    }
    window.AppData.showToast('Statut mis à jour avec succès : résolu', "success");
    return true;
}

async function emailChauffeur() {
    let dataForm = new FormData(emailForm);
    let body = {
        "email": dataForm.get("Email"),
        "subject": dataForm.get("Objet"),
        "message": dataForm.get("Message")
    };
    const result = await window.AppData.apiFetch("mailer/emailEmploye", "POST", body)
    if (!result.ok) {
        console.error("Impossible d'envoyer l'email.", result.message);
        window.AppData.validateForm.showToast(`Impossible d'envoyer l'email. ${result.message}`, "danger")
        return;
    }
    window.AppData.btnEnvoyerEmail.disabled = true;
    window.AppData.showToast("Email envoyé avec succès.", "success")
    window.AppData.inputMessage.value = "";
    window.AppData.inputMessage.classList.remove("is-valid");
}