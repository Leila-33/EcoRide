/* global bootstrap */
const inputPersonnes = document.getElementById("inputPersonnes");
const btnSuspendre = document.getElementById("btnSuspendre");
const myModalSuspendreCompte = new bootstrap.Modal('#myModalSuspendreCompte');
const modalSuspendreCompte = document.getElementById("modalSuspendreCompte");
const btnSuspendreCompte = document.getElementById("btnSuspendreCompte");
btnSuspendre.addEventListener("click", () => {
    if (!inputPersonnes.value) {
        alert('Veuillez sélectionner une personne.');
        return;
    }
    modalSuspendreCompte.textContent = `Voulez-vous vraiment suspendre le compte de ${inputPersonnes.options[inputPersonnes.selectedIndex].text} ?`;
    myModalSuspendreCompte.show()
});
btnSuspendreCompte.addEventListener("click", async () => { await window.AppData.withLoader(() => suspendre(inputPersonnes.value)); });
const adminName = document.getElementById("adminName");

initData();


// Retourne toutes les informations utilisateurs
async function initData() {
    await window.AppData.withLoader(async () => {
        const result = await window.AppData.getInfosUser();
        adminName.textContent = `${result['prenom']} ${result['nom']}`;
        await personnes();
    });
}


async function personnes() {
    inputPersonnes.innerHTML = "";
    const result = await window.AppData.apiFetch("personnes");
    if (!result.ok) {
        console.log("Impossible de récupérer la liste des utilisateurs.", result.message);
        return;
    }
    inputPersonnes.add(new Option("Sélectionnez une personne", ""));
    result.data.forEach(personne => {
        const opt = new Option(`${personne['nom']} ${personne['prenom']}`, personne['id']);
        inputPersonnes.add(opt);
    })
}


async function suspendre(id) {
    const result = await window.AppData.apiFetch(id, "DELETE");
    if (!result.ok) {
        console.log("Impossible de suspendre le compte de cet utilisateur.", result.message);
        return;
    }
    await personnes();
}