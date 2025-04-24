const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
const btnValidation = document.getElementById("btn-Changement");
btnValidation.disabled=true;

function validateForm(){
   
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword,inputValidationPassword)

    if (passwordOk && passwordConfirmOk){
        btnValidation.disabled=false;
    }
    else{
        btnValidation.disabled=true;
    }
}
