
let param=new URL(document.location).searchParams;
const supprimerVehicule = document.getElementById("supprimerVehicule");
supprimerVehicule.addEventListener("click",supprimerCovoiturage);
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


const btnResponseUserOui = document.getElementById("btnResponseUserOui");
const btnResponseUserNon = document.getElementById("btnResponseUserNon");
const responseUser = document.getElementById("responseUser");
let statut=0;
let idChauffeur=0;

const btnStatut = document.getElementById("btnStatut");
let btnAnnuler=document.createElement("button");
avisForm=document.getElementById("avisForm")
envoyerAvis=document.getElementById("envoyerAvis");
envoyerCommentaire=document.getElementById("envoyerCommentaire");
let userResponse;
let userResponse1;
btnStatut.addEventListener("click",()=>{clickStatutAndButton()});

getCovoiturage();
function getCovoiturage(){
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());
    
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
    
         fetch(apiUrl+"covoiturage/" + parseInt(param.get("id")), requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de récupérer les informations des véhicules");
            }
        })
          .then(result => {
            setCovoiturages(result);
            getAvis()

        })
        .catch(error =>{
            console.error("erreur lors de la récupération des données des véhicules", error);
        });
    }
    function setCovoiturages(covoiturages){
          i=covoiturages;
            let place=i['nbPlace']>1?" places restantes":" place restante";
            id1.setAttribute("src",'data:'+i['voiture']['user']['photoMime'] + ';base64,' +i['voiture']['user']['photo']);
            id2.innerHTML="Départ :";
            id3.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateDepart']));
            id4.innerHTML=i['heureDepart'];
            id5.innerHTML=i['lieuDepart'];
            id6.innerHTML="Durée : " + toHours(new Date(i['dateArrivee'].replace("00:00",i['heureArrivee']))-new Date(i['dateDepart'].replace("00:00",i['heureDepart']))) ;
            id7.innerHTML="Prix : " + i['prixPersonne'];
            id8.innerHTML=i['voiture']['user']['pseudo'] +"<br>" + i['voiture']['user']['pseudo'];
            id9.innerHTML="Arrivée :";
            id10.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateArrivee']));
            id11.innerHTML=i['heureArrivee'];
            id12.innerHTML=i['lieuArrivee'];
            id13.innerHTML=i['nbPlace'] + place;
            id14.innerHTML=i['energie']=="Fuel"? "Trajet non écologique" : "Trajet écologique";
            id15.innerHTML="Voiture : "
            id16.innerHTML=i["voiture"]["marque"]["libelle"] +" " +i["voiture"]["modele"] + " " +i["voiture"]["couleur"];;
            id17.innerHTML="Préférences du conducteur:"; 
            for (l of i["voiture"]["user"]["configurations"][0]["parametres"]){ 
            let newDiv= document.createElement("p");
            ll=i["voiture"]["user"]["configurations"][0]["parametres"].indexOf(l)+4
            lll=ll>8?6:5;
            newDiv.innerHTML+=l['propriete'] + ' : ' + l['valeur'];
            newDiv.setAttribute("style","grid-column:" + ll + "/" +Number(ll+1) +";grid-row:" +lll + "/" + Number(lll+1) +";");
            id0.appendChild(newDiv);           
            } 
            idChauffeur=i['voiture']['user']['id'];
            statut=i["statut"];
            userResponse=i["reponses"];
            userResponse1=i["reponses1"];
            if (param.get("Chauffeur")){
            switch (statut){
            case "en attente": btnStatut.appendChild(document.createTextNode('Démarrer')); 
            btnAnnuler.classList.add("btnDetail1", "btn", "btn-primary","my-auto");
            btnAnnuler.appendChild(document.createTextNode('Annuler'));
            btnAnnuler.addEventListener("click",()=>{
            const myModalAnnulerCovoiturage = new bootstrap.Modal('#myModalAnnulerCovoiturage');
            myModalAnnulerCovoiturage.show();})
            id0.appendChild(btnAnnuler);
            break;
            case "en cours":
            btnStatut.appendChild(document.createTextNode('Arrivé à destination')); break;
            case "terminé": btnStatut.appendChild(document.createTextNode('Terminé'));break;} 
   // }else{
       if (statut=='terminé'){
        setQuestionPassager();}}
        let sp1 = document.createElement("div");
        sp1.classList.add("mb-3");
        let parentDiv = detail.parentNode;
        parentDiv.insertBefore(sp1, detail.nextSibling);
    }
    



    function setQuestionPassager(){
 if (!userResponse || userResponse[param.get("idUser")]==""){
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
                setReponse("reponse","oui");
                btnResponseUserOui.remove();btnResponseUserNon.remove();responseUser.remove();  
                setBoutons(2);
            })
            btnResponseUserNon.addEventListener("click",()=>{
                btnResponseUserOui.remove();btnResponseUserNon.remove();responseUser.remove();
                setReponse("reponse","non");
                setBoutons(1);
            });
        } else if (userResponse[param.get("idUser")]=="oui" && (!userResponse1 || userResponse1[param.get("idUser")]=="")){
                setBoutons(2);

              
        } else if (userResponse[param.get("idUser")]=="non" && (!userResponse1 || userResponse1[param.get("idUser")]=="")){
                setBoutons(1);
        }
         


    }
        function setBoutons(i){
            if (i==1){
            let btnLaisserCommentaire=document.createElement("button");
            btnLaisserCommentaire.classList.add("btn","btn-primary","btnResponseUserOui");
            btnLaisserCommentaire.appendChild(document.createTextNode('Laisser un commentaire'));
            id0.appendChild(btnLaisserCommentaire);
            btnLaisserCommentaire.addEventListener("click",()=>{   
            const myModalLaisserCommentaire = new bootstrap.Modal('#myModalLaisserCommentaire');
            myModalLaisserCommentaire.show();});
            envoyerCommentaire.addEventListener("click",()=>{setReponse("reponse1","oui");btnLaisserCommentaire.remove();});}
            else{let btnSoumettreAvis=document.createElement("button");
                btnSoumettreAvis.classList.add("btn","btn-primary","btnResponseUserOui");
                btnSoumettreAvis.appendChild(document.createTextNode('Soumettre un avis'));
                id0.appendChild(btnSoumettreAvis);
                btnSoumettreAvis.addEventListener("click",()=>{
                    const myModalLaisserAvis = new bootstrap.Modal('#myModalLaisserAvis');
                    myModalLaisserAvis.show();});
                envoyerAvis.addEventListener("click",()=>{setReponse("reponse1","oui");btnSoumettreAvis.remove();
                //enregistre ravis
                let dataForm = new FormData(avisForm);
                console.log("note" + dataForm.get("Note"));
                console.log(dataForm.get("Avis"));
                console.log(idChauffeur);
                let raw = JSON.stringify({
                "note": dataForm.get("Note"),
                "commentaire": dataForm.get("Avis"),
                "idChauffeur": idChauffeur,
                "statut":"en attente"});
                let myHeaders = new Headers();
            myHeaders.append("X-AUTH-TOKEN", getToken());
            myHeaders.append("Content-Type", "application/json");
            let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'  };
            fetch(apiUrl+"avis", requestOptions)
            .then(response => { if(response.ok){ return response; }})
            .then(result =>{getAvis();})
            .catch(error => console.log('error', error));
                       })}}
        

        



            function setReponse(reponses,reponse){
               let myHeaders = new Headers();
               myHeaders.append("X-AUTH-TOKEN", getToken());
               myHeaders.append("Content-Type", "application/json");
               if (reponses=='reponse'){
               raw = JSON.stringify({"reponse" : reponse});}
               else{
              raw = JSON.stringify({"reponse1" : reponse});}
              let requestOptions = {
              method: 'PUT',
              headers: myHeaders,
              body: raw,
              redirect: 'follow'
                        };              
                fetch(apiUrl+"covoiturage/reponses/" + parseInt(param.get("id")), requestOptions)
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
            fetch(apiUrl+"covoiturage/"+ parseInt(param.get("id")), requestOptions)
            .then(response => { if(response.ok){ return response; }})
            .then(result => { window.location.replace("/account");})
            .catch(error => console.log('error', error));
                       }

        
            
    
    function clickStatutAndButton(){
        if (param.get("Chauffeur")){
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
                    }}}

    function getAvis(){
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());
    
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