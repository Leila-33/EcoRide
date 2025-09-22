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
window.AppData.inputPassword = document.getElementById("PasswordInput");
window.AppData.passwordFeedback = document.getElementById("passwordFeedback");
window.AppData.inputValidationPassword = document.getElementById("ValidatePasswordInput");
window.AppData.passwordConfirmationFeedback = document.getElementById("passwordConfirmationFeedback");
window.AppData.btnInscription = document.getElementById("btnInscription");
const infosForm = document.getElementById("infosForm");
const adminName = document.getElementById("adminName");
const today = new Date().toISOString().split("T")[0];
window.AppData.inputDateDeNaissance.setAttribute('max', today);
window.AppData.inputPhoto.addEventListener("change", () => { window.AppData.validateForm("employe") });
[window.AppData.inputPhoto, window.AppData.inputNom, window.AppData.inputPrenom, window.AppData.inputPseudo, window.AppData.inputDateDeNaissance, window.AppData.inputEmail, window.AppData.inputTelephone, window.AppData.inputAdresse, window.AppData.inputPassword, window.AppData.inputValidationPassword].forEach(input => {
  input.addEventListener("input", () => {window.AppData.validateForm("employe"); });
})
window.AppData.btnInscription.disabled = true;
window.AppData.btnInscription.addEventListener("click", async () => { await window.AppData.withLoader(InscrireEmploye) });

initData();


// Retourne toutes les informations utilisateurs
async function initData() {
  await window.AppData.withLoader(async () => {
    const result = await window.AppData.getInfosUser();
    adminName.textContent = `${result['prenom']} ${result['nom']}`;
  });
}


async function InscrireEmploye() {
  let dataForm = new FormData(infosForm);
  let body = {
    "nom": dataForm.get("Nom"),
    "prenom": dataForm.get("Prenom"),
    "telephone": dataForm.get("Telephone"),
    "adresse": dataForm.get("Adresse"),
    "dateNaissance": dataForm.get("DateDeNaissance"),
    "pseudo": dataForm.get("Pseudo"),
    "email": dataForm.get("Email"),
    "password": dataForm.get("mdp"),
    "roles": ["ROLE_EMPLOYE"]
  };

  const result = await window.AppData.apiFetch("registration", "POST", body)
  if (!result.ok) {
    console.log(`Erreur lors de l'inscription: ${result.message}.toLowerCase()`);
    window.AppData.showToast(`Erreur lors de l'inscription: ${result.message.toLowerCase()}`, "danger");
    return null;
  }
  window.AppData.showToast(`Vous venez d'inscrire ${dataForm.get("Prenom")} ${dataForm.get("Nom")}.`, "success");
  [window.AppData.inputPhoto, window.AppData.inputNom, window.AppData.inputPrenom, window.AppData.inputPseudo, window.AppData.inputDateDeNaissance, window.AppData.inputEmail, window.AppData.inputTelephone,
  window.AppData.inputAdresse, window.AppData.inputPassword, window.AppData.inputValidationPassword].forEach(input => { input.value = ""; input.classList.remove('is-valid'); });


}



