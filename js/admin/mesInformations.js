const adminName = document.getElementById("adminName");
const imgInfos = document.getElementById("imgInfos");
const mesInfos = document.getElementById("mesInfos");
const Nom = document.getElementById("Nom");
const DateDeNaissance = document.getElementById("DateDeNaissance");
const Email = document.getElementById("Email");
const Telephone = document.getElementById("Telephone");
const Adresse = document.getElementById("Adresse");
//const roleDiv = document.getElementById("role");

initData();


// Retourne toutes les informations utilisateurs
async function initData() {
    await window.AppData.withLoader(async () => {
        const result = await window.AppData.getInfosUser();
        adminName.textContent = `${result['prenom']} ${result['nom']}`;
        setUser(result);
    });
}


// Fonction permettant d'afficher les informations de l'utilisateur
function setUser(user) {
        if (user['photo']){
            const img = window.AppData.createEl('img', ['imgAccount']);
            img.src = `${window.AppData.urlPhoto}/${user['photo']}`;
            img.alt = "Photo de profil"
            imgInfos.appendChild(img);
        }
        else {
            window.AppData.addLettre(imgInfos, user['pseudo']);
        };
    mesInfos.textContent = user['pseudo'];
    Nom.textContent = `${user['nom']} ${user['prenom']}`;
    const dateNaissance = user['dateNaissance'] ? new Intl.DateTimeFormat("fr-FR").format(new Date(user['dateNaissance'])) : '';
    DateDeNaissance.textContent = `Date de naissance : ${dateNaissance}`;
    Email.textContent = `Email : ${user['email']}`;
    Telephone.textContent = `Téléphone : ${user['telephone']}`;
    Adresse.textContent = `Adresse : ${user['adresse']}`;
}


