/* global bootstrap */
const avisContainer = document.getElementById("avis");
const adminName = document.getElementById("adminName");


async function initUserData() {
    await window.AppData.withLoader(async () => {
        await getAvis();
        const result = await window.AppData.getInfosUser();
        adminName.textContent = `${result['prenom']}  ${result['nom']}`;
    })
}
initUserData();

// Obtenir les avis
async function getAvis() {
    const result = await window.AppData.apiFetch("avis/avisAVerifier");
    if (!result.ok) {
        console.error("Impossible de récupérer les avis.", result.message);
        return;
    }
    setAvis(result.data);
}

async function setAvis(avisList) {
    avisContainer.innerHTML = "";
    if (!Array.isArray(avisList) || avisList.length === 0) {
        avisContainer.classList.add('text-center');
        avisContainer.textContent = ("Il n'y pas d'avis à vérifier.");
        return;
    }

    for (let avis of avisList) {
        let pseudo = window.AppData.createEl("p", ["m-auto", "pseudo-employe"], avis['auteurPseudo']);
        let note = window.AppData.createEl("p", ["m-auto", "note-employe"], `${avis['note']}/5`);
        let commentaire = window.AppData.createEl("p", ["my-auto", "p-3", "commentaireReponse-employe"], avis['commentaire']);
        let card = window.AppData.createEl("div", ["card", "mx-1", "mx-md-5", "mb-3", "shadow-sm"]);
        let cardBody = window.AppData.createEl("div", ["card-body", "rounded", "card-avis-employe"]);
        let cardPseudoNote = window.AppData.createEl("div", ["card-pseudo-note"]);


        let btnValider = window.AppData.makeButton(cardBody, "Valider", ["btn-primary", "btnValider"], async () => {
            const success = await validerAvis(avis['id']);
            if (success) {
                card.remove();
                getAvis();}
        });
        let btnSupprimer = window.AppData.makeButton(cardBody, "Supprimer", ["btn-danger", "btnSupprimer"], async () => {
            const success = await supprimerAvis(avis['id']);
            if (success) {
                card.remove();
                getAvis();}
        });
        [pseudo, note].forEach(child => { cardPseudoNote.appendChild(child); });
        [cardPseudoNote, commentaire].forEach(child => { cardBody.appendChild(child); });
        card.appendChild(cardBody);
        avisContainer.appendChild(card);
    }
}




async function validerAvis(avisId) {
    const result = await window.AppData.apiFetch(`avis/validerAvis/${avisId}`, "PUT");
    if (!result.ok) {
        console.error("Impossible de valider l'avis.", result.message);
        return false;
    }
    window.AppData.showToast('Avis validé.', "success");
    return true;
}

async function supprimerAvis(avisId) {
    const result = await window.AppData.apiFetch(`avis/${avisId}`, "DELETE");
    if (!result.ok) {
        console.error("Impossible de supprimer l'avis.", result.message);
        return false;
    }
    window.AppData.showToast('Avis supprimé.', "danger");
    return true;
}
