window.AppData.inputNom = document.getElementById("NomInput");
window.AppData.inputPrenom = document.getElementById("PrenomInput");
window.AppData.inputEmail = document.getElementById("EmailInput");
window.AppData.emailFeedback = document.getElementById("emailFeedback");
window.AppData.inputObjet = document.getElementById("ObjetInput");
window.AppData.inputMessage = document.getElementById("MessageInput");
window.AppData.btnEnvoyerEmail = document.getElementById("btnEnvoyerEmail");
const contactForm = document.getElementById("contactForm");
window.AppData.btnEnvoyerEmail.addEventListener("click", async () => { await window.AppData.withLoader(() => EnvoyerMessage()); });
window.AppData.btnEnvoyerEmail.disabled = true;
[window.AppData.inputNom, window.AppData.inputPrenom, window.AppData.inputEmail, window.AppData.inputObjet, window.AppData.inputMessage].forEach(input => { input.addEventListener("input", window.AppData.validateFormContact); });



async function EnvoyerMessage() {
  let dataForm = new FormData(contactForm);
  let body = {
    "nom": dataForm.get("Nom"),
    "prenom": dataForm.get("Prenom"),
    "email": dataForm.get("Email"),
    "subject": dataForm.get("Objet"),
    "message": dataForm.get("Message")
  };
  const result = await window.AppData.apiFetch("mailer/emailContact", "POST", body, false)
  if (!result.ok) {
    window.AppData.showToast(`Erreur lors de l'envoi du mail. Veuillez réessayer. ${result.message}`, "danger");
    return null;
  }
  window.AppData.btnEnvoyerEmail.disabled = true;
  window.AppData.showToast("Votre message a été envoyé.", "success");
  [window.AppData.inputNom, window.AppData.inputPrenom, window.AppData.inputEmail, window.AppData.inputObjet, window.AppData.inputMessage].forEach(item => { item.value = ""; item.classList.remove("is-valid"); });
}