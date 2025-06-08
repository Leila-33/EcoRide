
let param=new URL(document.location).searchParams;
const btnSupprimerCovoiturage = document.getElementById("btnSupprimerCovoiturage");
//btnSupprimerCovoiturage.addEventListener("click",function(){supprimerCovoiturage(),});
const confirmerParticiper = document.getElementById("confirmerParticiper");
const btnParticiperCovoiturage = document.getElementById("btnParticiperCovoiturage");
const annulerCovoiturage = document.getElementById("annulerCovoiturage");
 btnParticiperCovoiturage.addEventListener("click", ()=>{ console.log('covoiturage')});
const myModalParticiperCovoiturage = new bootstrap.Modal('#myModalParticiperCovoiturage');
const myModalAnnulerCovoiturage = new bootstrap.Modal('#myModalAnnulerCovoiturage');
btnSupprimerCovoiturage.addEventListener("click",function(){supprimerCovoiturage(),myModalAnnulerCovoiturage.hide()});

const id0 = document.getElementById("id0");
const id1 = document.getElementById("id1");
const id2 = document.getElementById("id2");
const id3 = document.getElementById("id3");
const id4 = document.getElementById("id4");
const id5 = document.getElementById("id5");
const id6 = document.getElementById("id6");
const id7 = document.getElementById("id7");
const id8 = document.getElementById("id8");
const id9 = document.getElementById("id9");
const id10 = document.getElementById("id10");
const id11 = document.getElementById("id11");
const id12 = document.getElementById("id12");
const id13 = document.getElementById("id13");
const id14 = document.getElementById("id14");
const id15 = document.getElementById("id15");
const id16 = document.getElementById("id16");
const id17 = document.getElementById("id17");
const id18 = document.getElementById("id18");


const responseUser = document.getElementById("responseUser");
let statut=0;
let idChauffeur=0;
let btnStatut, prix, users, nbPlace, idUser, credit, Chauffeur, dateDepart;
btnStatut=document.createElement("button");
btnStatut.classList.add("btnDetail", "btn", "btn-primary","my-auto");
id0.appendChild(btnStatut);

let btnAnnuler=document.createElement("button");
btnAnnuler.appendChild(document.createTextNode('Annuler'));
btnAnnuler.classList.add("btnDetail1", "btn", "btn-primary","my-auto");

//Modal "Laisser un avis"
avisForm=document.getElementById("avisForm")
btnEnvoyerAvis=document.getElementById("btnEnvoyerAvis");
btnEnvoyerCommentaire=document.getElementById("btnEnvoyerCommentaire");
let userResponse;

if (isConnected()){      
getIdUser();
}else{getCovoiturage();}




function getIdUser(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

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
        idUser = result['id'];
        credit = result['credit'];
        getCovoiturage();



    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}
function getReponse(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"reponse/show/" + param.get("id"), requestOptions)
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
        userResponse=result;
        setQuestionPassager();

    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}

function paiement(prix){
    console.log(prix);
   let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

   let raw = JSON.stringify({
        "date_operation": new Date(Date()).toISOString().slice(0,10),
        "operation": prix});
    let requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"credit", requestOptions)
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


    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}

function paiement(prix, id1, id2){
    console.log(prix);
   let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

   let raw = JSON.stringify({
        "date_operation": new Date(Date()).toISOString().slice(0,10),
        "operation": prix});
    let requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"credit/payer/" + id1 +"/" + id2, requestOptions)
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


    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}
function paiementEcoride(prix){
   let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

   let raw = JSON.stringify({
        "date_operation": new Date(Date()).toISOString().slice(0,10),
        "operation": prix});
    let requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"credit/payerEcoride/", requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de payer");
        }
    })
    .then(result => {
        console.log(result);


    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}
//Obtenir le covoiturage
function getCovoiturage(){

        let myHeaders = new Headers();         
        myHeaders.append("Content-Type", "application/json");
   
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        }; 
         fetch(apiUrl+"covoiturage/c/" + parseInt(param.get("id")), requestOptions)
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
            Chauffeur = idUser == result['idChauffeur'] ? true : false ;

            setCovoiturage(result);
            getAvis()
        })
        .catch(error =>{
            console.error("erreur lors de la récupération des données des véhicules", error);
        });
    }
    //Afficher le covoiturage
    function setCovoiturage(covoiturages){
          i=covoiturages;
            let place=i['nbPlace']>1?" places restantes":" place restante";
            id1.setAttribute("src",'data:'+i['voiture']['user']['photoMime'] + ';base64,' +i['voiture']['user']['photo']);
            id2.innerHTML="Départ :";
            id3.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateDepart']));
            id4.innerHTML=i['heureDepart'];
            id5.innerHTML=i['lieuDepart'];
            id6.innerHTML="Durée : " + toHours(new Date(i['dateArrivee'].replace("00:00",i['heureArrivee']))-new Date(i['dateDepart'].replace("00:00",i['heureDepart']))) ;
            id7.innerHTML="Prix : " + i['prixPersonne'];
            let noteChauffeur=i['noteChauffeur']!=null?i['noteChauffeur']:'';
            id8.innerHTML=i['voiture']['user']['pseudo'] +"<br>" + i['voiture']['user']['pseudo'] + "<br>"+ "Note : " + noteChauffeur + '/5';
            id9.innerHTML="Arrivée :";
            id10.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateArrivee']));
            id11.innerHTML=i['heureArrivee'];
            id12.innerHTML=i['lieuArrivee'];
            id13.innerHTML=i['nbPlace'] + place;
            id14.innerHTML=i['energie']=="Fuel"? "Trajet non écologique" : "Trajet écologique";
            id15.innerHTML="Voiture : "
            id16.innerHTML=i["voiture"]["marque"]["libelle"] +" " +i["voiture"]["modele"] + " " +i["voiture"]["couleur"];;
            id17.innerHTML="Préférences du conducteur:"; 
            for (l of i["voiture"]["user"]["parametres"]){ 
            let newDiv= document.createElement("p");
            ll=i["voiture"]["user"]["parametres"].indexOf(l)+4
            lll=ll>8?6:5;
            newDiv.innerHTML+=l['propriete'] + ' : ' + l['valeur'];
            newDiv.setAttribute("style","grid-column:" + ll + "/" +Number(ll+1) +";grid-row:" +lll + "/" + Number(lll+1) +";");
            id0.appendChild(newDiv);           
            } 
            idChauffeur=i['idChauffeur'];
            prix=i['prixPersonne'];
            users=i['users'];
            nbPlace=i['nbPlace'];
            dateDepart=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateDepart']));
            console.log(dateDepart);
            // Personne connecté
            if (isConnected()){
            statut=i["statut"];
             /*if (Chauffeur==true){
    setStatutButton();
            
   // }else{*/

       setStatutButton();
// Personne non connectée
    }  else{setStatutButton();}
       let sp1 = document.createElement("div");
        sp1.classList.add("mb-3");
        let parentDiv = id0.parentNode;
        parentDiv.insertBefore(sp1, id0.nextSibling);}
    
// Afficher le bouton indiquant le statut
        function  setStatutButton(){
    
            //Chauffeur
        if (Chauffeur==true){
            console.log('chauffeur');
                switch (statut){
            case "en attente":
                btnStatut.textContent='Démarrer'; 
                btnAnnuler.addEventListener("click", ()=>{myModalAnnulerCovoiturage.show();})
                id0.appendChild(btnAnnuler);
                break;
            case "en cours":
                btnStatut.textContent='Arrivé à destination'; break;
            case "terminé": 
                btnStatut.textContent='Terminé';break;} 
            btnStatut.addEventListener("click",()=>{clickStatutAndButton()});}
          // Utilisateur connecté
          else if (isConnected()){
            btnStatut.remove();
            btnStatut=document.createElement("button");
            btnStatut.classList.add("btnDetail", "btn", "btn-primary","my-auto");
            id0.appendChild(btnStatut);
            if (includes(users,idUser)==true){// Participant
                switch (statut){
                    case "en attente":                       
                        btnStatut.textContent='En attente';
                        let credits=credit>1?"credits":"credit"
                        btnAnnuler.addEventListener("click", ()=>{
                        annulerCovoiturage.textContent="En annulant, vous confirmez le remboursement de "+ prix +" "+ credits+ " sur votre compte.";
                        myModalAnnulerCovoiturage.show();})
                        id0.appendChild(btnAnnuler);
                        break;
                    case "en cours":
                        btnStatut.textContent='En cours';
                        break;
                    case "terminé": 
                        btnStatut.textContent='Arrivé à destination';               
                        getReponse();  
                        break;}}
                        //Non participant
            else if (statut=='en attente' && (!includes(users,idUser))){
                btnStatut.textContent='Participer';
                //Si credit insuffisant
                if (credit<l){btnStatut.disabled=true;
                    let creditInsuffisant=document.createElement("p");
                    creditInsuffisant.classList.add("item18","mx-auto");
                    creditInsuffisant.appendChild(document.createTextNode('Credit insuffisant'));
                    id0.appendChild(creditInsuffisant);}
                //Si nombre de place insuffisant
                else if (nbPlace==0){btnStatut.disabled=true;}
                else {     
                    let credits=credit>1?"credits":"credit"

                    btnStatut.addEventListener("click",()=>{
                    confirmerParticiper.textContent="En participant, vous confirmez le débit de "+ prix +" "+ credits+ " de votre compte.";
                    myModalParticiperCovoiturage.show();})
                    
                    btnParticiperCovoiturage.onclick=function(){myModalParticiperCovoiturage.hide();
                    paiement(prix,idUser,9);
                    ajouterParticipant();
               
                     };
        }}}  
        // Personne non connectée
            else{  btnStatut.textContent='Participer';
 
        btnStatut.addEventListener("click",()=>{window.location.replace("/signin")});}
        }
           




    function includes(a,l){
        for(let i of a){
            if (i['id']==l){return true;}
        }
        return false;

    }
     


    function setQuestionPassager(){
        console.log(userResponse);
 if (!userResponse){
            responseUser.textContent="Le trajet s'est-il bien passé ?"
            let btnResponseUserOui=document.createElement("button");
            let btnResponseUserNon=document.createElement("button");
            btnResponseUserOui.classList.add("btn","btn-primary","btnResponseUserOui");
            btnResponseUserNon.classList.add("btn","btn-primary","btnResponseUserNon");
            btnResponseUserOui.appendChild(document.createTextNode('Oui'));
            btnResponseUserNon.appendChild(document.createTextNode('Non'));
            id0.appendChild(btnResponseUserOui);
            id0.appendChild(btnResponseUserNon);
            btnResponseUserOui.addEventListener("click",()=>{
                setReponse1("oui");
                btnResponseUserOui.remove();btnResponseUserNon.remove();responseUser.remove();  
                setBoutons(2); // Soumettre un avis
                paiement(prix,9,idChauffeur);
            })
            btnResponseUserNon.addEventListener("click",()=>{
                btnResponseUserOui.remove();btnResponseUserNon.remove();responseUser.remove();
                setReponse1("non");
                setBoutons(1); // Laisser un commentaire
            });
        } else if (userResponse["reponse1"]=="oui" && (userResponse["reponse2"]=="")){
                setBoutons(2); // Soumettre un avis

              
        } else if (userResponse["reponse1"]=="non" && (userResponse["reponse2"]=="")){
                setBoutons(1); // Laisser un commentaire
        }
         


    } // Afficher les boutons "Laisser un commentaire" et "Soumetre un avis"
        function setBoutons(i){
            if (i==1){
            let btnLaisserCommentaire=document.createElement("button");
            btnLaisserCommentaire.classList.add("btn","btn-primary","btnResponseUserOui");
            btnLaisserCommentaire.appendChild(document.createTextNode('Laisser un commentaire'));
            id0.appendChild(btnLaisserCommentaire);
            btnLaisserCommentaire.addEventListener("click",()=>{   
            const myModalLaisserCommentaire = new bootstrap.Modal('#myModalLaisserCommentaire');
            myModalLaisserCommentaire.show();});
            btnEnvoyerCommentaire.addEventListener("click",()=>{setReponse2("oui");btnLaisserCommentaire.remove();
            LaisserCommentaire()            
                       });}
            else{let btnSoumettreAvis=document.createElement("button");
                btnSoumettreAvis.classList.add("btn","btn-primary","btnResponseUserOui");
                btnSoumettreAvis.appendChild(document.createTextNode('Soumettre un avis'));
                id0.appendChild(btnSoumettreAvis);
                btnSoumettreAvis.addEventListener("click",()=>{
                    const myModalLaisserAvis = new bootstrap.Modal('#myModalLaisserAvis');
                    myModalLaisserAvis.show();});
                btnEnvoyerAvis.addEventListener("click",()=>{setReponse2("oui");btnSoumettreAvis.remove();
                    LaisserAvis();
                })}}
                //enregistrer avis
                
              
        

        



            function setReponse1(reponse){
               let myHeaders = new Headers();
               myHeaders.append("X-AUTH-TOKEN", getToken());
               myHeaders.append("Content-Type", "application/json");
               raw = JSON.stringify({"reponse1" : reponse,
                "reponse2" : "",
                 "commentaire" : ""})

              let requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
                        };              
                fetch(apiUrl+"reponse/setReponse1/" + param.get("id"), requestOptions)
                    .then(response => {
                        if(response.ok){
                            return response
                            }
                        })
                        .then(result => {
                        })
                        .catch(error => console.log('error', error));
                    }
            function setReponse2(reponse){
               let myHeaders = new Headers();
               myHeaders.append("X-AUTH-TOKEN", getToken());
               myHeaders.append("Content-Type", "application/json");
               raw = JSON.stringify({"reponse2" : reponse})

              let requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
                        };              
                fetch(apiUrl+"reponse/editReponse2/" + param.get("id"), requestOptions)
                    .then(response => {
                        if(response.ok){
                            return response
                            }
                        })
                        .then(result => {
                        })
                        .catch(error => console.log('error', error));
                    }

       function supprimerCovoiturage(){
            let myHeaders = new Headers();
            myHeaders.append("X-AUTH-TOKEN", getToken());
            myHeaders.append("Content-Type", "application/json");
            let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'  };
            let nom;
            if (Chauffeur==true){nom="covoiturage/";}
            else{nom="covoiturage/removeUser/";}
            fetch(apiUrl + nom + parseInt(param.get("id")), requestOptions)
            .then(response => { if(response.ok){ return response; }})
            .then(result => { if (Chauffeur==true){window.location.replace("/account");
                mailAnnulerCovoiturage();
            }
        else{btnAnnuler.remove();
            console.log(id0)
            paiement(prix, idUser,);
            getCovoiturage();
        } })
            .catch(error => console.log('error', error));}

    function mailAnnulerCovoiturage(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

  let raw = JSON.stringify({
        "email": 'Le covoiturage du ' + new Date(Date()).toISOString().slice(0,10) + ' a été annulé.'
    });
    let requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"mailer/covoiturageAnnule/" + parseInt(param.get("id")), requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible d'envoyer un mail");
        }
    })
    .then(result => {

    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });


        }

       function LaisserCommentaire(){      
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
     myHeaders.append("Content-Type", "application/json");

   CommentaireInput=document.getElementById("CommentaireInput");
    let  raw = JSON.stringify({"commentaire": CommentaireInput.value});
    let requestOptions = {
        method: 'PUT',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };
        fetch(apiUrl+"reponse/editCommentaire/" + param.get("id"), requestOptions)    
        .then(response => { if(response.ok){ return response; }})
                .then(result =>{})
                .catch(error => console.log('error', error))

}

       function LaisserAvis(){      
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
     myHeaders.append("Content-Type", "application/json");
 let dataForm = new FormData(avisForm);
                raw = JSON.stringify({
                "note": dataForm.get("Note"),
                "commentaire": dataForm.get("Avis"),
                "idChauffeur": idChauffeur,
                "statut":"en attente"});
    let requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };
       fetch(apiUrl+"avis", requestOptions)
                .then(response => { if(response.ok){ return response; }})
                .then(result =>{getAvis();})
                .catch(error => console.log('error', error));}
                        
              
    // Mettre à jour le statut et le bouton Statut en fonction du clic
    function clickStatutAndButton(){
        if (Chauffeur==true){
            let raw=0;
        switch (statut){
        case "en attente":
            btnAnnuler.classList.add("d-none");
            raw = JSON.stringify({"statut": "en cours"});
            btnStatut.firstChild.textContent='Arrivé à destination';
            statut="en cours";
            break;
        case "en cours":
            raw = JSON.stringify({"statut": "terminé"});
            btnStatut.firstChild.textContent='Terminé';
            statut="terminé";
            setQuestionPassager();
            mailFinTrajet();
            break;
               } 
           if (raw!=0){
               let myHeaders = new Headers();
               myHeaders.append("X-AUTH-TOKEN", getToken());
               myHeaders.append("Content-Type", "application/json");
              let requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'};
              fetch(apiUrl+"covoiturage/" + parseInt(param.get("id")), requestOptions)
                        .then(response => { if(response.ok){return response.json(); } })
                        .then(result => {})
                        .catch(error => console.log('error', error));
                    }
                }

                }
                
        function mailFinTrajet(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
     myHeaders.append("Content-Type", "application/json");

 let raw = JSON.stringify({
        "email": 'Rendez-vous sur votre espace personnel pour valider votre trajet. '
    });
    let requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"mailer/email/" + parseInt(param.get("id")) + "/" + dateDepart, requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible d'envoyer un mail");
        }
    })
    .then(result => {

    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });


        }

// Obtenir les avis
    function getAvis(){
        let myHeaders = new Headers();
        //myHeaders.append("X-AUTH-TOKEN", getToken());
         myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };    
         fetch(apiUrl+"avis/allAvis/" + Number(idChauffeur), requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de récupérer les informations des avis");
            }
        })
          .then(result => {
            setAvis(result);
        })
        .catch(error =>{
            console.error("erreur lors de la récupération des données des avis", error);
        });
    }
    //Afficher les avis
     function setAvis(avis){
            id18.setAttribute("style", "display:grid; grid-template-columns:100px 100px 1fr; grid-template-rows: repeat(" + Number(avis.length+1)+ ", minmax(0, 100px)");
          for(let i of avis){
            let newDiv= document.createElement("p");
            newDiv.innerHTML+=i['user']['pseudo'];
            newDiv.setAttribute("style","grid-column:1/2; grid-row:" +Number(avis.length+1-avis.indexOf(i)) + "/" + Number(avis.length+2-avis.indexOf(i)) +";");
            let newDiv1= document.createElement("p");
            newDiv1.innerHTML=i['note']+"/5";
            newDiv1.setAttribute("style","grid-column:2/3; grid-row:" +Number(avis.length+1-avis.indexOf(i)) + "/" + Number(avis.length+2-avis.indexOf(i)) +";");
            let newDiv2= document.createElement("p");
            newDiv2.innerHTML=i['commentaire'];
            newDiv2.setAttribute("style","grid-column:3/4; grid-row:" +Number(avis.length+1-avis.indexOf(i)) + "/" + Number(avis.length+2-avis.indexOf(i)) +";");
            id18.appendChild(newDiv);           
            id18.appendChild(newDiv1);           
            id18.appendChild(newDiv2);           

         
    }}
    
function ajouterParticipant(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
     myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"covoiturage/addUser/" + param.get("id"), requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations utilisateur");
        }
    })
    .then(result => {getCovoiturage();


    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });



    
}