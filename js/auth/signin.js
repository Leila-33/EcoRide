const EmailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSignin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm");
window.AppData.passwordFeedback = document.getElementById("passwordFeedback");
[EmailInput, passwordInput].forEach(input => { input.addEventListener("input", validateForm); });
btnSignin.addEventListener("click", async () => await window.AppData.withLoader(() => checkCredentials()));
btnSignin.disabled = true;

function validateForm() {
    const mailOk = window.AppData.validateMail(EmailInput);
    const passwordOk = window.AppData.validateRequired(passwordInput);
    btnSignin.disabled = !(mailOk && passwordOk);
}



async function checkCredentials() {
    let dataForm = new FormData(signinForm);
    let body = {
        "username": dataForm.get("Email"),
        "password": dataForm.get("mdp")
    };
    const res = await window.AppData.apiFetch("login", "POST", body, false)
    if (!res.ok) {
        EmailInput.classList.add("is-invalid");
        passwordInput.classList.add("is-invalid");
        window.AppData.passwordFeedback.textContent = 'L\'adresse e-mail et le mot de passe ne correspondent pas.'
        return null;
    }
    const result = res.data;
    let token = result.apiToken;
    window.AppData.setToken(token);
    window.AppData.setCookie(window.AppData.RoleCookieName, result.roles[0], 7);
    window.location.replace("/");
}

