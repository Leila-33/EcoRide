//Implémenter le JS de ma page

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputObjet = document.getElementById("ObjetInput");
const inputMessage = document.getElementById("MessageInput");
const btnValidation = document.getElementById("btn-Envoyer");


inputNom.addEventListener("keyup", validateForm); 
inputPreNom.addEventListener("keyup", validateForm);
inputObjet.addEventListener("keyup", validateForm);
inputMessage.addEventListener("keyup", validateForm);
btnValidation.addEventListener("click", EnvoyerMessage);
btnValidation.disabled=true;

//Function permettant de valider tout le formulaire
function validateForm(){
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPreNom);
    const ObjetOk = validateRequired(inputObjet);
    const MessageOk = validateRequired(inputMessage);

    if (nomOk && prenomOk && ObjetOk && MessageOk){
        btnValidation.disabled=false;
    }
    else{
        btnValidation.disabled=true;
    }
}


function EnvoyerMessage(){
    let dataForm = new formData(formInscription);
    let name
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    let raw = JSON.stringify({
      "firstName": dataForm.get("Nom"),
      "lastName":  dataForm.get("Prenom"),
      "email":  dataForm.get("Objet"),
      "message":  dataForm.get("Message")
    });
    
    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };
    
    fetch(apiUrl+"contact", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
        else{
            alert("Erreur lors de l'inscription");
        }
    })
    .then(result => {
        alert("Bravo "+dataForm.get("prenom")+", votre message a été envoyé.");
        document.location.href="/signin";
    })
    .catch(error => console.log('error', error));;
}