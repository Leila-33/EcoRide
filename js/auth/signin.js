const mailInput = document.getElementById("EmailInput");
const passwordInput = document.getElementById("PasswordInput");
const btnSingin = document.getElementById("btnSignin");
const signinForm = document.getElementById("signinForm")
mailInput.addEventListener("keyup", validateForm);
passwordInput.addEventListener("keyup", validateForm);
btnSingin.addEventListener("click", checkCredentials);

btnSingin.disabled=true;

function validateForm(){
    const mailOk = validateMail(mailInput);
    const passwordOk = validateRequired(passwordInput);

    if (mailOk && passwordOk){
        btnSingin.disabled=false;
    }
    else{
        btnSingin.disabled=true;
    }
}

function checkCredentials(){
    let dataForm = new FormData(signinForm);
    
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({
        "username": dataForm.get("Email"),
        "password": dataForm.get("mdp")
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(apiUrl+"login", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            mailInput.classList.add("is-invalid");
            passwordInput.classList.add("is-invalid");
        }
    })
    .then(result => {
        const token = result.apiToken;
        setToken(token);
        //placer ce token en cookie

        setCookie(RoleCookieName, result.roles[0], 7);
        window.location.replace("/");
    })
    .catch(error => console.log('error', error));
}
