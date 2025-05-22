const btnPassager = document.getElementById("passagerCheck");
const btnChauffeur = document.getElementById("chauffeurCheck");
btnChauffeur.addEventListener("change", updateRoleChauffeur);
btnPassager.addEventListener("change", updateRolePassager);
//Mes informations personelles
let mesInfos=document.getElementById("mesInfos");
let imgInfos=document.getElementById("imgInfos");
const inputPhoto = document.querySelector("input[type=file]");
const labelNomPrenom = document.getElementById("nomPrenom");
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
const btnInfos1 = document.getElementById("btnInfos1");
const infosForm = document.getElementById("infosForm1");
inputPhoto.addEventListener("change", validateForm); 
inputNom.addEventListener("keyup", validateForm); 
inputPreNom.addEventListener("keyup", validateForm);
inputPseudo.addEventListener("keyup", validateForm);
inputTelephone.addEventListener("keyup", validateForm);
inputPassword.addEventListener("keyup", validateForm);
inputValidationPassword.addEventListener("keyup", validateForm);
btnInfos.addEventListener("click",()=>{ updateInfos;btnInfos1.classList.remove("d-none");});
btnInfos1.addEventListener("click", ()=>{btnInfos1.classList.add("d-none");});
btnInfos.disabled=true;
let btnClass="";
let ListElement="";
let Chauffeur1=0;
let addVoiture=0;4
let idUser=0;

//while (Chauffeur1==0){btnChauffeur.checked=false;}
//Mes véhicules
let voitures = document.getElementById("voitures");
const myModal = document.getElementById("myModal");
const vehiculeForm = document.getElementById("vehiculeForm");
const inputPlaque = document.getElementById("PlaqueInput");
const inputDateImmatriculation = document.getElementById("DateImmatriculationInput");
const inputMarque = document.getElementById("MarqueInput");
const inputModele = document.getElementById("ModeleInput");
const inputCouleur = document.getElementById("CouleurInput");
const inputNbPlaces = document.getElementById("NbPlacesInput");
const btnVehicule = document.getElementById("btnVehicule");
const btnAjoutVehicule = document.getElementById("btnAjoutVehicule");
inputPlaque.addEventListener("keyup", ()=>{validateFormVehicule(inputPlaque,inputDateImmatriculation,inputMarque,inputModele,inputCouleur,inputNbPlaces,btnVehicule);}); 
inputDateImmatriculation.addEventListener("keyup", ()=>{validateFormVehicule(inputPlaque,inputDateImmatriculation,inputMarque,inputModele,inputCouleur,inputNbPlaces,btnVehicule);});
inputMarque.addEventListener("keyup", ()=>{validateFormVehicule(inputPlaque,inputDateImmatriculation,inputMarque,inputModele,inputCouleur,inputNbPlaces,btnVehicule);});
inputModele.addEventListener("keyup", ()=>{validateFormVehicule(inputPlaque,inputDateImmatriculation,inputMarque,inputModele,inputCouleur,inputNbPlaces,btnVehicule);});
inputCouleur.addEventListener("keyup", ()=>{validateFormVehicule(inputPlaque,inputDateImmatriculation,inputMarque,inputModele,inputCouleur,inputNbPlaces,btnVehicule);});
inputNbPlaces.addEventListener("change", ()=>{validateFormVehicule(inputPlaque,inputDateImmatriculation,inputMarque,inputModele,inputCouleur,inputNbPlaces,btnVehicule);});
const btnSupprimerVehicule = document.getElementById("supprimerVehicule");
btnSupprimerVehicule.addEventListener("click", supprimerVehicule);
btnAjoutVehicule.addEventListener("click", ()=>{btnAjoutVehicule.classList.add("d-none");});
btnVehicule.addEventListener("click", ()=>{updateVehicule(vehiculeForm);btnAjoutVehicule.classList.remove("d-none");});

btnVehicule.disabled=true;


//Modal "Veuillez enregistrer un véhicule et vos préférences"
const vehiculeForm1 = document.getElementById("vehiculeForm1");
const inputPlaque1 = document.getElementById("PlaqueInput1");
const inputDateImmatriculation1 = document.getElementById("DateImmatriculationInput1");
const inputMarque1 = document.getElementById("MarqueInput1");
const inputModele1 = document.getElementById("ModeleInput1");
const inputCouleur1 = document.getElementById("CouleurInput1");
const inputNbPlaces1 = document.getElementById("NbPlacesInput1");
const flexRadioDefault1= document.getElementById("flexRadioDefault1");
const flexRadioDefault2= document.getElementById("flexRadioDefault2");
const flexRadioDefault3= document.getElementById("flexRadioDefault3");
const flexRadioDefault4= document.getElementById("flexRadioDefault4");
const formCheck1= document.getElementById("formCheck1");
const btnEnregistrerPreference = document.getElementById("enregistrerPreference");
inputPlaque1.addEventListener("keyup", validateFormChauffeur);
inputDateImmatriculation1.addEventListener("keyup", validateFormChauffeur);
inputMarque1.addEventListener("keyup", validateFormChauffeur);
inputModele1.addEventListener("keyup", validateFormChauffeur);
inputCouleur1.addEventListener("keyup", validateFormChauffeur);
inputNbPlaces1.addEventListener("change", validateFormChauffeur);
formCheck1.addEventListener("change", validateFormChauffeur);
btnEnregistrerPreference.disabled=true;
btnEnregistrerPreference.addEventListener("click", function(){
    Chauffeur1=1;
    btnChauffeur.checked=true;
    updateRoleChauffeur();
    updateVehicule(vehiculeForm1); 
    createConfiguration(); dataForm = new FormData(formCheck1);
    for (let i of dataForm){updatePreferences(i[0],i[1]);} });


//Mes préférences
let preference = document.getElementById("preference");
let preferenceForm = document.getElementById("preferenceForm");
const inputPropriete = document.getElementById("proprieteInput")
const inputValeur = document.getElementById("valeurInput");
const btnPreferences1 = document.getElementById("btnPreferences1");
const btnPreferences = document.getElementById("btnPreferences");
const btnSupprimerPreference = document.getElementById("supprimerPreference");
btnPreferences.addEventListener("click", function(){let dataForm = new FormData(preferenceForm);
updatePreferences(dataForm.get("propriete"),dataForm.get("valeur"));btnPreferences1.classList.remove("d-none");});
btnPreferences1.addEventListener("click", function(){btnPreferences1.classList.add("d-none");});
btnSupprimerPreference.addEventListener("click", supprimerPreference);
inputValeur.addEventListener("keyup", validatePreferencesForm);
inputPropriete.addEventListener("keyup", validatePreferencesForm);
btnPreferences.disabled=true;

//Saisir un voyage
const vehiculeForm2 = document.getElementById("vehiculeForm2");
const inputLieuDepart=document.getElementById("lieuDepart");
const inputLieuArrivee=document.getElementById("lieuArrivee");
const inputDateDepart=document.getElementById("dateDepart");
const inputDateArrivee=document.getElementById("dateArrivee");
const inputHeureDepart=document.getElementById("heureDepart");
const inputHeureArrivee=document.getElementById("heureArrivee");
const inputPrix=document.getElementById("prixInput");
const inputNbPlace = document.getElementById("nbPlaceInput");
const inputVehicules=document.getElementById("inputVehicules");
const inputPlaque2 = document.getElementById("PlaqueInput2");
const inputDateImmatriculation2 = document.getElementById("DateImmatriculationInput2");
const inputMarque2 = document.getElementById("MarqueInput2");
const inputModele2 = document.getElementById("ModeleInput2");
const inputCouleur2= document.getElementById("CouleurInput2");
const inputNbPlaces2 = document.getElementById("NbPlacesInput2");
const btnEnregistrerVoyage=document.getElementById("enregistrerVoyage");
inputLieuDepart.addEventListener("change", validateFormVoyage);
inputLieuArrivee.addEventListener("change", validateFormVoyage);
inputDateDepart.addEventListener("change", validateFormVoyage);
inputDateArrivee.addEventListener("change", validateFormVoyage);
inputHeureDepart.addEventListener("change", validateFormVoyage);
inputHeureArrivee.addEventListener("change", validateFormVoyage);
inputPrix.addEventListener("change", validateFormVoyage);
inputNbPlace.addEventListener("change", validateFormVoyage);
inputPlaque2.addEventListener("keyup", validateFormVoyage);
inputDateImmatriculation2.addEventListener("keyup", validateFormVoyage);
inputMarque2.addEventListener("keyup", validateFormVoyage);
inputModele2.addEventListener("keyup", validateFormVoyage);
inputCouleur2.addEventListener("keyup", validateFormVoyage);
inputNbPlaces2.addEventListener("change", validateFormVoyage);
inputVehicules.addEventListener("change",function(){
    if (inputVehicules.value=="autre"){ vehiculeForm2.classList.remove("d-none");addVoiture=1;}
    else{vehiculeForm2.classList.add("d-none");addVoiture=0;}
    validateFormVoyage();});
btnEnregistrerVoyage.addEventListener("click", updateVoyage);


btnEnregistrerVoyage.disabled=true;
//btnEnregistrerVehicule.addEventListener("keyup", addVehiculeVoyage)

// Mes voyages enregistrés
const btnMesVoyages= document.getElementById("btnMesVoyages");
const accordionBody = document.getElementById("accordionBody");
function addVehiculeVoyage(){
    let dataForm = new FormData(vehiculeForm2);
    vehiculeVoyage.innerHTML="Voiture de voyage" + '<br>'+i['immatriculation'] + ' ' + i['datePremiereImmatriculation'] + '<br>' + i['marque']['libelle'] + ' ' + i['modele'] + ' ' + i['couleur'] + '<br>' + i['nbPlace'] +'places' + ' ' + i['energie'];

}
//Fonction permettant de valider tout le formulaire apparaissant en activant le mode "Chauffeur"
function validateFormChauffeur(){
    const PlaqueOk = validateRequired(inputPlaque1);
    const DateImmatriculationOk = validateDate(inputDateImmatriculation1);
    const MarqueOk = validateRequired(inputMarque1);
    const ModeleOk = validateRequired(inputModele1);
    const CouleurOk = validateRequired(inputCouleur1);
    const NbPlacesOk = validateRequired(inputNbPlaces1);
    const choix1Ok= flexRadioDefault1.checked || flexRadioDefault2.checked; 
    const choix2Ok= flexRadioDefault3.checked || flexRadioDefault4.checked; 
    if (PlaqueOk && DateImmatriculationOk && MarqueOk && ModeleOk && CouleurOk && NbPlacesOk && choix1Ok && choix2Ok ){
        btnEnregistrerPreference.disabled=false;
    }
    else{
        btnEnregistrerPreference.disabled=true;
    }
}


//Fonction permettant de valider tout le formulaire "Mes informations personnelles"
function validateForm(){
    const PhotoOk = validatePhoto(inputPhoto);
    const nomOk = validateRequired(inputNom);
    const prenomOk = validateRequired(inputPreNom);
    const pseudoOk = validateRequired(inputPseudo);
    const TelephoneOk = validateTelephone(inputTelephone);
    const passwordOk = validatePassword(inputPassword);
    const passwordConfirmOk = validateConfirmationPassword(inputPassword,inputValidationPassword);
    if (PhotoOk && nomOk && prenomOk && pseudoOk && TelephoneOk && passwordOk && passwordConfirmOk){
        btnInfos.disabled=false;
    }
    else{
        btnInfos.disabled=true;
    }
}


function validateFormVoyage(){
    const lieuDepartOk = validateRequired(inputLieuDepart);
    const lieuArriveeOk = validateRequired(inputLieuArrivee);
    const dateDepartOk = validateRequired(inputDateDepart);
    const dateArriveeOk = validateRequired(inputDateArrivee);
    const heureDepartOk = validateRequired(inputHeureDepart);
    const heureArriveeOk = validateRequired(inputHeureArrivee);
    const prixOk = validateRequired(inputPrix);
    const NbPlaceOk = validateRequired(inputNbPlace);
    let voitureValidated=false;
    if (addVoiture==1){voitureValidated=validateFormVehicule(inputPlaque2,inputDateImmatriculation2,inputMarque2,inputModele2,inputCouleur2,inputNbPlaces2,null);
    if (lieuDepartOk && lieuArriveeOk && dateDepartOk && dateArriveeOk && heureDepartOk && heureArriveeOk && prixOk && NbPlaceOk && voitureValidated ){
        btnEnregistrerVoyage.disabled=false;
    }
    else{
        btnEnregistrerVoyage.disabled=true;
    }}
    else{ if (lieuDepartOk && lieuArriveeOk && dateDepartOk && dateArriveeOk && heureDepartOk && heureArriveeOk && prixOk){
        btnEnregistrerVoyage.disabled=false;
    }
    else{
        btnEnregistrerVoyage.disabled=true;
    }}
}
//Fonction permettant de valider tout le formulaire "Mes véhicules"
function validateFormVehicule(inputPlaque,inputDateImmatriculation,inputMarque,inputModele,inputCouleur,inputNbPlaces,btnVehicule){
    const PlaqueOk = validateRequired(inputPlaque);
    const DateImmatriculationOk = validateDate(inputDateImmatriculation);
    const MarqueOk = validateRequired(inputMarque);
    const ModeleOk = validateRequired(inputModele);
    const CouleurOk = validateRequired(inputCouleur);
    const NbPlacesOk = validateRequired(inputNbPlaces);
    if (btnVehicule!=null){
    if (PlaqueOk && DateImmatriculationOk && MarqueOk && ModeleOk && CouleurOk && NbPlacesOk){
        btnVehicule.disabled=false;
    }
    else{
        btnVehicule.disabled=true;
    }}
    return PlaqueOk && DateImmatriculationOk && MarqueOk && ModeleOk && CouleurOk && NbPlacesOk;

}
//Fonction permettant de valider tout le formulaire "Mes préférences"
function validatePreferencesForm(){
    const proprieteOk = validateRequired(inputPropriete);
    const valeurOk = validateRequired(inputValeur);
    if (proprieteOk && valeurOk ){
        btnPreferences.disabled=false;
    }
    else{
        btnPreferences.disabled=true;
    }
}

//Affiche les infomations de l'utilisateur
getRoles(); 
getInfosUser();
getVehicules();
getPreferences();




function getInfosUser(){
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
        getCovoiturages();

    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}

function setUser(user){
    mesInfos=document.getElementById("mesInfos");
    imgInfos=document.getElementById("imgInfos"); 
    imgInfos.src='data:'+user['photoMime'] + ';base64,' +user['photo'];
    mesInfos.innerHTML=user['pseudo']+'<br>' + user['nom'] + " " + user['prenom'] +'<br>'+user['dateNaissance'] +'<br>'+ user['email']+'<br>' + user['telephone']+'<br>'+ user['adresse'];
    idUser=user['id'];
    NomInput.value=user['nom'];
    PrenomInput.value=user['prenom'];
    PseudoInput.value=user['pseudo'];
    DateDeNaissanceInput.value=user['dateNaissance'];
    EmailInput.value=user['email'];
    TelephoneInput.value=user['telephone']; 
    AdresseInput.value= user['adresse'];
    //PhotoInput.value= user['photo'];


}

function updateInfos(){
    let dataForm = new FormData(infosForm); 
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    let photo = dataForm.get("Photo");
    const reader = new FileReader();
    reader.addEventListener("load", function(event){
        const b64Img = event.target.result.split(',')[1];
    

    let raw = JSON.stringify({
        "photo": b64Img,
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
}) ;   reader.readAsDataURL(photo);
}
function updateVehicule(vehiculeForm){
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
      getVehicules();
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
         console.log(voitures.firstChild);
    if (voitures.firstChild==null){Chauffeur1=0;btnChauffeur.checked=false;updateRoleChauffeur();}
    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données des véhicules", error);
    });
}
function setVehicules(vehicules){
    while (voitures.firstChild) {
        voitures.removeChild(voitures.firstChild);
      }
      while (inputVehicules.firstChild) {
        inputVehicules.removeChild(inputVehicules.firstChild);
      }
    /*if (!(vehicules.length>0)){
        vehicules=[vehicules];
    };*/
    if (vehicules.length>0){ 
    for (let i of vehicules){
        console.log(vehicules);
        let index=Number(vehicules.indexOf(i))+1;
        let opt = document.createElement("option");
        opt.text="Voiture " + index;
        opt.value=index;
        inputVehicules.add(opt,null);
        let newDiv = document.createElement("div");
        let newDiv1 = document.createElement("div");
        let newDiv2 = document.createElement("div");
        let newDiv3 = document.createElement("div");

        newDiv.classList.add("col");
        newDiv1.classList.add("card");
        newDiv2.classList.add("card-body","shadow", "p-3",  "bg-body-tertiary", "rounded","mb-3");
        newDiv3.classList.add("text-center");
        newDiv3.innerHTML="Voiture "+ index +'<br>'+'<br>'+ i['immatriculation'] + ' ' + i['datePremiereImmatriculation'] + '<br>' + i['marque']['libelle'] + ' ' + i['modele'] + ' ' + i['couleur'] + '<br>' + i['nbPlace'] +'places' + ' ' + i['energie'];
        let btn=document.createElement("button");
        btn.classList.add("btn","btn-primary");
        btn.appendChild(document.createTextNode('Supprimer'));
        newDiv2.appendChild(newDiv3);
        newDiv1.appendChild(newDiv2);
        newDiv.appendChild(newDiv1);

        newDiv2.appendChild(btn);
        let theFirstChild = voitures.firstChild;
        let theLastChild = voitures.lastChild;

        btn.onclick=function(ev){ btnClass= i['id'];
        const myyModal = new bootstrap.Modal('#myModal');
        myyModal.show();
        ListElement=newDiv;

        }  
        if (theFirstChild==null){ voitures.insertBefore(newDiv, theFirstChild);}
        else{voitures.insertBefore(newDiv, theLastChild.nextSibling)};
    } 
    opt = document.createElement("option");
    opt.text="Autre voiture";
    opt.value='autre'
    inputVehicules.add(opt,null); 
 
    let sp1 = document.createElement("div");
    sp1.classList.add("mb-3");
    let parentDiv = voitures.parentNode;
    parentDiv.insertBefore(sp1, voitures.nextSibling);
}}
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
            return response;
        }
    })
    .then(result => {
        getVehicules();

       })
       .catch(error => console.log('error', error));
   }

function updateRoleChauffeur(e){
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("X-AUTH-TOKEN", getToken()); 
    if (btnChauffeur.checked){
    if (Chauffeur1==0){ btnChauffeur.checked=false;
        const myyModal = new bootstrap.Modal('#myModalChauffeur');
        myyModal.show();}
    else{ 
        document.getElementById("chauffeur").classList.remove("d-none");
        document.getElementById("preferences").classList.remove("d-none");
        document.getElementById("voyage").classList.remove("d-none");
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
    .catch(error => console.log('error', error));}}
    else {
        document.getElementById("chauffeur").classList.add("d-none");
        document.getElementById("voyage").classList.add("d-none");
        document.getElementById("preferences").classList.add("d-none");
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

    function updateRolePassager(e){
        let myHeaders = new Headers(); 
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-AUTH-TOKEN", getToken());  
        if (btnPassager.checked){
            let raw = JSON.stringify({
                "libelle": "passager"});
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
            fetch(apiUrl+"role/passager", requestOptions)
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
         fetch(apiUrl+"role", requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de récupérer les informations utilisateur");
            }
        })
        .then(result => {
            console.log(result);
            let mesVehicules=0;
            for (let i of result){
                if (i['libelle']=="chauffeur"){btnChauffeur.checked=true; mesVehicules=1;}
                if (i['libelle']=="passager"){btnPassager.checked=true};
        }
        if (mesVehicules==0){
            document.getElementById("chauffeur").classList.add("d-none");
            document.getElementById("voyage").classList.add("d-none");
            document.getElementById("preferences").classList.add("d-none");}
        else{ document.getElementById("chauffeur").classList.remove("d-none");
        document.getElementById("voyage").classList.remove("d-none");
        document.getElementById("preferences").classList.remove("d-none");
    }})  
        .catch(error =>{
            console.error("erreur lors de la récupération des données utilisateur", error);
        });
    }
    
function createConfiguration(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
    };
    fetch(apiUrl+"configuration", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(result => {
      console.log(result);
    })
    .catch(error => console.log('error', error));
}

    function updatePreferences(propriete,valeur){
        let myHeaders = new Headers();  
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("X-AUTH-TOKEN", getToken()); 
            let raw = JSON.stringify({
                "propriete":propriete,
                "valeur": valeur});   
            let requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'     
            };
        fetch(apiUrl+"parametre", requestOptions)
        .then(response => {
            if(response.ok){
                return response.json();
            } 
        })
        .then(result => { getPreferences();   
        })
        .catch(error => console.log('error', error));
    }

      function getPreferences(){
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken()); 
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
         fetch(apiUrl+"parametre", requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de récupérer les informations utilisateur");
            }
        })
        .then(result => {
            console.log(result);
            setPreferences(result)
      })  
        .catch(error =>{
            console.error("erreur lors de la récupération des données utilisateur", error);
        });
    }
    
    function setPreferences(parametres){
        while (preference.firstChild) {
            preference.removeChild(preference.firstChild);
          }
            if (parametres.length==0){
                parametres=[parametres];
            };
            if (parametres){ 
                let animauxEtFumeurs=0;
            for (let i of parametres){
                if (i['propriete']=="fumeurs" || i['propriete']=="animaux"){;animauxEtFumeurs++;}
                        let newDiv = document.createElement("div");
                        let newDiv1 = document.createElement("div");
                        let newDiv2 = document.createElement("div");
                        let newDiv3 = document.createElement("div");
                
                        newDiv.classList.add("col");
                        newDiv1.classList.add("card");
                        newDiv2.classList.add("card-body","shadow", "p-3",  "bg-body-tertiary", "rounded","mb-3");
                        newDiv3.classList.add("text-center");
                        newDiv3.innerHTML=i['propriete'] + ' : ' + i['valeur'];
                        let btn=document.createElement("button");
                        btn.classList.add("btn","btn-primary");
                        btn.appendChild(document.createTextNode('Supprimer'));
                        newDiv2.appendChild(newDiv3);
                        newDiv1.appendChild(newDiv2);
                        newDiv.appendChild(newDiv1);
                
                        newDiv2.appendChild(btn);
                        let theFirstChild = preference.firstChild;
                        let theLastChild = preference.lastChild;
                
                        btn.onclick=function(ev){ btnClass= i['id'];
                        const myyModal = new bootstrap.Modal('#myModal1');
                        myyModal.show();
                        ListElement=newDiv;
                
                        }
                
 
                preference.insertBefore(newDiv, theFirstChild);
        
                }   if (animauxEtFumeurs!=2){Chauffeur1=0;btnChauffeur.checked=false;updateRoleChauffeur();console.log(animauxEtFumeurs);}
    }
            let sp1 = document.createElement("div");
            sp1.classList.add("mb-3");
            let parentDiv = preference.parentNode;
            parentDiv.insertBefore(sp1, preference.nextSibling);
        }

function supprimerPreference(){
    ListElement.remove();
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
  

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch(apiUrl+"parametre/"+btnClass, requestOptions)
    .then(response => {
        if(response.ok){
            return response;
        }
    })
    .then(result => {
        getPreferences();
       })
       .catch(error => console.log('error', error));
   } function updateVoyage(){
    let dataForm = new FormData(vehiculeForm3);
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
    /*if (addVoiture==1){
        console.log(updateVehicule(vehiculeForm2)); 

    }*/
    let raw = JSON.stringify({
        "date_depart": dataForm.get("dateDepart"),
        "heure_depart": dataForm.get("heureDepart"),
        "lieu_depart":dataForm.get("lieuDepart"),
        "date_arrivee": dataForm.get("dateArrivee"),
        "heure_arrivee": dataForm.get("heureArrivee"),
        "lieu_arrivee":dataForm.get("lieuArrivee"),
        "statut": "en attente",
        "nb_place": Number(dataForm.get("nbPlace")),
        "prix_personne": Number(dataForm.get("prix")),
        "voiture":{"immatriculation" : toString(Number(dataForm.get("inputVehicules"))-1)},
        "reponses":[""],
 
    });

    let requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch(apiUrl+"covoiturage", requestOptions)
    .then(response => {
        if(response.ok){
            return response.json();
        }
    })
    .then(result => {
        getCovoiturages();
        btnMesVoyages.click();
    })
    .catch(error => console.log('error', error));
}
function getCovoiturages(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

     fetch(apiUrl+"covoiturage/allCovoiturages", requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations des véhicules");
        }
    })
      .then(result => {
        console.log(result);

        setCovoiturages(result);
        console.log(result);
    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données des véhicules", error);
    });
}
function setCovoiturages(covoiturages){
    while (accordionBody.firstChild) {
        accordionBody.removeChild(accordionBody.firstChild);
      }
 
    /*if (!(vehicules.length>0)){
        vehicules=[vehicules];
    };*/
    if (covoiturages.length>0){ 
    for (let i of covoiturages){
        let index=Number(covoiturages.indexOf(i))+1;
      
        let newDiv = document.createElement("div");
        let newDiv1 = document.createElement("div");
        let newDiv2 = document.createElement("div");
        let newDiv3 = document.createElement("img");
        let newDiv4 = document.createElement("p");
        let newDiv5 = document.createElement("p");
        let newDiv6 = document.createElement("p");
        let newDiv7 = document.createElement("p");
        let newDiv8 = document.createElement("div");
        let newDiv9 = document.createElement("p");
        let newDiv10 = document.createElement("p");
        let newDiv11 = document.createElement("p");
        let newDiv12 = document.createElement("p");
        let newDiv13= document.createElement("p");
        let newDiv14= document.createElement("p");
        let newDiv15= document.createElement("p");
        let newDiv16= document.createElement("p");
        let newDiv17= document.createElement("p");


        newDiv.classList.add("card", "mb-3");
        newDiv1.classList.add("card-body","shadow", "p-3",  "bg-body-tertiary", "rounded");
        newDiv2.classList.add("container1");
        newDiv3.classList.add("item1", "mx-auto", "my-auto");
        newDiv4.classList.add("item2", "my-auto");
        newDiv5.classList.add("item3", "my-auto");
        newDiv6.classList.add("item4", "text-center", "my-auto");
        newDiv7.classList.add("item5", "my-auto");
        newDiv8.classList.add("item6", "my-auto");
        newDiv9.classList.add("item7", "my-auto");
        newDiv11.classList.add("item8","text-center");
        newDiv12.classList.add("item9");
        newDiv13.classList.add("item10");
        newDiv14.classList.add("item11", "text-center");
        newDiv15.classList.add("item12");
        newDiv16.classList.add("item13");
        newDiv17.classList.add("item14");

        let place=i['nbPlace']>1?" places restantes":" place restante";
        newDiv3.setAttribute("src",'data:'+i['voiture']['user']['photoMime'] + ';base64,' +i['voiture']['user']['photo']);
        newDiv4.innerHTML="Départ :";
        newDiv5.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateDepart']));
        newDiv6.innerHTML=i['heureDepart'];
        newDiv7.innerHTML=i['lieuDepart'];
        newDiv8.innerHTML="Durée : " + toHours(new Date(i['dateArrivee'].replace("00:00",i['heureArrivee']))-new Date(i['dateDepart'].replace("00:00",i['heureDepart']))) ;
        newDiv9.innerHTML="Prix : " + i['prixPersonne'];
        newDiv11.innerHTML=i['voiture']['user']['pseudo'] +"<br>" + i['voiture']['user']['pseudo'];
        newDiv12.innerHTML="Arrivée :";
        newDiv13.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateArrivee']));
        newDiv14.innerHTML=i['heureArrivee'];
        newDiv15.innerHTML=i['lieuArrivee'];
        newDiv16.innerHTML=i['nbPlace'] + place;
        newDiv17.innerHTML=i['energie']=="Fuel"? "Trajet non écologique" : "Trajet écologique";

  
        newDiv10.classList.add( "btnDetail");

 
     
        newDiv2.appendChild(newDiv3);
        newDiv2.appendChild(newDiv4);
        newDiv2.appendChild(newDiv5);
        newDiv2.appendChild(newDiv6);

        newDiv2.appendChild(newDiv7);
        newDiv2.appendChild(newDiv8);
        newDiv2.appendChild(newDiv9);
        newDiv2.appendChild(newDiv10);
        newDiv2.appendChild(newDiv11);

        newDiv2.appendChild(newDiv12);
        newDiv2.appendChild(newDiv13);
        newDiv2.appendChild(newDiv14);
        newDiv2.appendChild(newDiv15);
        newDiv2.appendChild(newDiv16);
        newDiv2.appendChild(newDiv17);
        newDiv1.appendChild(newDiv2);
        newDiv.appendChild(newDiv1);

        let btn=document.createElement("a");
        btn.classList.add("btn","btn-primary");
        let Chauffeur = idUser ==(i['voiture']['user']['id']) ? true : false ;
        btn.setAttribute("href","/detail" +"?id=" + i['id'] + "&idUser=" + idUser + "&Chauffeur=" + Chauffeur);
        btn.appendChild(document.createTextNode('Détail'));
        newDiv10.appendChild(btn);
        let theFirstChild = accordionBody.firstChild;
        let theLastChild = accordionBody.lastChild;

        btn.onclick=function(ev){
            btnClass= i['id'];
 

            /*btnId= i['id'];
            let newDiv = document.createElement("div");
            let newDiv1 = document.createElement("div");
            let newDiv2 = document.createElement("div");
            
        newDiv.classList.add("card", "mb-3");
        newDiv1.classList.add("card-body","shadow", "p-3",  "bg-body-tertiary", "rounded");
        newDiv2.classList.add("container1")
        newDiv1.appendChild(newDiv2);
        newDiv.appendChild(newDiv1);
        detail=document.getElementById("detail");
        let theFirstChild = detail.firstChild;
        console.log("o");
 
        ListElement=newDiv;*/

        }  
       // if (theFirstChild==null){
        accordionBody.insertBefore(newDiv, theFirstChild);
       // else{accordionBody.insertBefore(newDiv, theLastChild.nextSibling)};
    } 

 
    let sp1 = document.createElement("div");
    sp1.classList.add("mb-3");
    let parentDiv = accordionBody.parentNode;
    parentDiv.insertBefore(sp1, accordionBody.nextSibling);
}}
function toHours(time){
let hours=Math.floor(time/(3600000)); 
let minutes=time/(60000)-hours*60;
if (minutes<10){minutes="0"+minutes;}
return hours+ "h" + minutes;

}
