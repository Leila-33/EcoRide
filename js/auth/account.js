const inputInfo = document.getElementById("infoInput");
const inputVehicule = document.getElementById("vehiculeInput");
const inputPreferences = document.getElementById("preferencesInput");
const inputChauffeur = document.getElementById("chauffeurInput");
const vehiculeForm = document.getElementById("vehiculeForm");
const infosForm = document.getElementById("infosForm");
const myModal = document.getElementById("myModal");
const btnSupprimer = document.getElementById("supprimer");
let btnClass="";
let ListElement="";
//Implémenter le JS de ma page
let voitures = document.getElementById("voitures");

const inputPlaque = document.getElementById("PlaqueInput");
const inputDateImmatriculation = document.getElementById("DateImmatriculationInput");
const inputMarque = document.getElementById("MarqueInput");
const inputModele = document.getElementById("ModeleInput");
const inputCouleur = document.getElementById("CouleurInput");
const inputNbPlaces = document.getElementById("NbPlacesInput");

const btnVehicule = document.getElementById("btnVehicule");
const btnPassager = document.getElementById("passagerCheck");
const btnChauffeur = document.getElementById("chauffeurCheck");

const inputNom = document.getElementById("NomInput");
const inputPreNom = document.getElementById("PrenomInput");
const inputPseudo = document.getElementById("PseudoInput");
const inputDateDeNaissance = document.getElementById("DateDeNaissanceInput");
const inputMail = document.getElementById("EmailInput");
const inputTelephone = document.getElementById("TelephoneInput");
const inputAdresse = document.getElementById("AdresseInput");
const inputPassword = document.getElementById("PasswordInput");
const inputValidationPassword = document.getElementById("ValidatePasswordInput");
const btnInfos = document.getElementById("btnInfos");

const formInfos = document.getElementById("infosForm");

inputNom.addEventListener("keyup", validateForm); 
inputPreNom.addEventListener("keyup", validateForm);
inputPseudo.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
inputPlaque.addEventListener("keyup", validateFormVehicule); 
inputDateImmatriculation.addEventListener("keyup", validateFormVehicule);
inputMarque.addEventListener("keyup", validateFormVehicule);
inputModele.addEventListener("keyup", validateFormVehicule);
inputCouleur.addEventListener("keyup", validateFormVehicule);
inputNbPlaces.addEventListener("keyup", validateFormVehicule);
btnChauffeur.addEventListener("change", updateRole);
//btnPassager.addEventListener("keyup", updateRole(1));
btnSupprimer.addEventListener("click", supprimerVehicule);
/*btnChauffeur.addEventListener("click", updateRole);*/
btnInfos.addEventListener("click", updateInfos);

btnVehicule.addEventListener("click", updateVehicule);
/*btnPreferences.addEventListener("click", updatePreferences);*/
btnInfos.disabled=true;
btnVehicule.disabled=true;

//Implémenter le JS de ma page


//Function permettant de valider tout le formulaire
function validateFormVehicule(){
    const PlaqueOk = validateRequired(inputPlaque);
    const DateImmatriculationOk = validateDate(inputDateImmatriculation);
    const MarqueOk = validateRequired(inputMarque);
    const ModeleOk = validateRequired(inputModele);
    const CouleurOk = validateRequired(inputCouleur);
    const NbPlacesOk = validateRequired(inputNbPlaces);

    if (PlaqueOk && DateImmatriculationOk && MarqueOk && ModeleOk && CouleurOk && NbPlacesOk){
        btnVehicule.disabled=false;
    }
    else{
        btnVehicule.disabled=true;
    }
}

function validateForm(){
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPreNom);
    const pseudoOk = validateRequired(inputPseudo);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword,inputValidationPassword);
    if (nomOk && prenomOk && pseudoOk && passwordOk && passwordConfirmOk){
        btnInfos.disabled=false;
    }
    else{
        btnInfos.disabled=true;
    }
}
getInfosUsers();
getVehicules();




function setUser(user){
    NomInput.value=user['nom'];
    PrenomInput.value=user['prenom'];
    PseudoInput.value=user['pseudo'];
    DateDeNaissanceInput.value=user['dateNaissance'];
    EmailInput.value=user['email'];
    TelephoneInput.value=user['telephone']; 
    AdresseInput.value= user['adresse'];

}
function setVehicules(vehicules){
    if (!(vehicules.length>0)){
        vehicules=[vehicules];
    };
    if (vehicules){ 
    for (let i of vehicules){
        let newDiv = document.createElement("li");
        newDiv.classList.add("list-group-item","flex-fill");
        newDiv.innerHTML=i['immatriculation'] + ' ' + i['datePremiereImmatriculation'] + '<br>' + i['marque']['libelle'] + ' ' + i['modele'] + ' ' + i['couleur'] + '<br>' + i['nbPlace'] +'places' + ' ' + i['energie'];
        let btn=document.createElement("button");
        btn.classList.add("btn","btn-primary");

        btn.appendChild(document.createTextNode('Supprimer'));
        newDiv.appendChild(btn);
        let theFirstChild = voitures.firstChild;

        btn.onclick=function(ev){ btnClass= i['id'];
 const myyModal = new bootstrap.Modal('#myModal');
        myyModal.show();
        ListElement=newDiv;
        }
        // ajoute le nouvel élément créé et son contenu dans le DOM
        voitures.insertBefore(newDiv, theFirstChild);
}

    let sp1 = document.createElement("div");
    sp1.classList.add("mb-3");

    let parentDiv = voitures.parentNode;


    // ajoute le nouvel élément créé et son contenu dans le DOM
    parentDiv.insertBefore(sp1, voitures.nextSibling);
}}



function getInfosUsers(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

     fetch(apiUrl+"account/me", requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations utilisateur");
        }
    })
    .then(result => {
        setUser(result);
    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}
function updateInfos(){
    let dataForm = new FormData(infosForm);
    
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        "nom": dataForm.get("Nom"),
        "prenom": dataForm.get("Prenom"),
        "date_naissance":dataForm.get("DateDeNaissance"),
        "telephone": dataForm.get("Telephone"),
        "adresse": dataForm.get("Adresse"),
        "password": dataForm.get("mdp")
    
    });

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(apiUrl+"account/edit", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
  
    })
    .then(result => { console.log(result);
      
    })
    .catch(error => console.log('error', error));
}
function updateVehicule(){
    let dataForm = new FormData(vehiculeForm);
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    let raw = JSON.stringify({
        "marque": {"libelle": dataForm.get("Marque")},
        "modele": dataForm.get("Modele"),
        "immatriculation":dataForm.get("Plaque"),
        "energie": dataForm.get("Energie"),
        "couleur": dataForm.get("Couleur"),
        "date_premiere_immatriculation": dataForm.get("DateImmatriculation"),
        "nb_place": Number(dataForm.get("NbPlaces")),

    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(apiUrl+"addVoiture", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(result => {
      setVehicules(result);
    })
    .catch(error => console.log('error', error));
}
function supprimerVehicule(){
    ListElement.remove();
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
  

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl+"voiture/"+btnClass, requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(result => {
     result
    })
    .catch(error => console.log('error', error));
}
function getVehicules(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

     fetch(apiUrl+"allVoitures", requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations des véhicules");
        }
    })
    .then(result => {
        setVehicules(result);
    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données des véhicules", error);
    });
}   
function updateRole(e){
    let myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken());

   

    if (btnChauffeur.checked){
        let raw = JSON.stringify({
            "libelle": "chauffeur"});
   
        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'     
        };
    fetch(apiUrl+"role", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        } 
    })
    .then(result => {      
    })
    .catch(error => console.log('error', error));}
    else {
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'     
        };
        fetch(apiUrl+"role/chauffeur", requestOptions)
        .then(response => {
            if(response.ok){
                return response.json();
            } 
        })
        .then(result => {      
        })
        .catch(error => console.log('error', error));}
    }


    function getRoles(){
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());
    
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
         fetch(apiUrl+"roles/", requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de récupérer les informations utilisateur");
            }
        })
        .then(result => {
            setUser(result);
        })
        .catch(error =>{
            console.error("erreur lors de la récupération des données utilisateur", error);
        });
    }