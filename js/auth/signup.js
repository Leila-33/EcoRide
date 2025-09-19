
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
const formInscription = document.getElementById("formulaireInscription");
const today = new Date().toISOString().split("T")[0];
window.AppData.inputDateDeNaissance.setAttribute('max', today);
[window.AppData.inputNom, window.AppData.inputPrenom, window.AppData.inputPseudo, window.AppData.inputDateDeNaissance, window.AppData.inputEmail, window.AppData.inputTelephone, window.AppData.inputPassword, window.AppData.inputValidationPassword].forEach(input => {
  input.addEventListener("input", () => window.AppData.validateForm("inscription"));
});
window.AppData.btnInscription.addEventListener("click", async () => await window.AppData.withLoader(() => InscrireUtilisateur()));
window.AppData.btnInscription.disabled = true;

// Fonction permettant d'inscrire un utilisateur
async function InscrireUtilisateur() {
  let dataForm = new FormData(formInscription);
  let body = {
    "nom": dataForm.get("Nom"),
    "prenom": dataForm.get("Prenom"),
    "telephone": dataForm.get("Telephone"),
    "adresse": dataForm.get("Adresse"),
    "dateNaissance": dataForm.get("DateDeNaissance"),
    "pseudo": dataForm.get("Pseudo"),
    "email": dataForm.get("Email"),
    "password": dataForm.get("mdp")
  };
  const result = await window.AppData.apiFetch("registration", "POST", body, false);
  if (!result.ok) {
    console.error(`Erreur lors de l'inscription: ${result.message.toLowerCase()}`);
    window.AppData.showToast(`Erreur lors de l'inscription: ${result.message.toLowerCase()}`, "danger");
    return null;
  }
  window.AppData.showToast(`Bravo ${dataForm.get("Prenom")}, vous êtes maintenant inscrit, vous pouvez vous connecter.`, "success");
  setTimeout(() => { document.location.href = "/signin"; }, 1500);
}

