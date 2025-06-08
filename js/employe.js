 const avis = document.getElementById("avis");
 const covoiturages = document.getElementById("covoiturages");
 const formEnvoyerEmail= document.getElementById("formEnvoyerEmail");


let avisId;
 getAvis();
getReponses();

 function getAvis(){
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };    
         fetch(apiUrl+"avis/avisAVerifier", requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de récupérer les informations des avis");
            }
        })
          .then(result => {
            console.log(result);
            setAvis(result);
        })
        .catch(error =>{
            console.error("erreur lors de la récupération des données des avis", error);
        });
    }
       function setAvis(l){
          for(let i of l){
            let newDiv= document.createElement("p");
            let newDiv1= document.createElement("p");
            let newDiv2= document.createElement("p");
            let newDiv3= document.createElement("div");
            let newDiv4= document.createElement("div");  
            
           // avis.setAttribute("style", "display:grid;  grid-template-rows: repeat(" + Number(l.length)+ ", minmax(0, 1fr)");
            newDiv3.classList.add("card", "mx-5","mb-3", "shadow-sm")
            newDiv4.classList.add("card-body", "rounded")
            newDiv4.setAttribute("style", "display:grid; grid-template-columns:100px 100px 1fr 100px; grid-template-rows:100px")



            newDiv.innerHTML=i['user']['pseudo'];
            newDiv.setAttribute("style","grid-column:1/2;");
            newDiv.classList.add("m-auto")
            newDiv1.innerHTML=i['note']+"/5";
            newDiv1.setAttribute("style","grid-column:2/3; ");
            newDiv1.classList.add("m-auto")

            newDiv2.innerHTML=i['commentaire'];
            newDiv2.setAttribute("style","grid-column:3/4;");
            newDiv2.classList.add("my-auto", "p-3")

            let btnValider= document.createElement("button"); 
            btnValider.classList.add("btn", "btn-primary");
            btnValider.setAttribute("style","grid-column:4/5;grid-row:1/2;margin-block-end:auto;");
            btnValider.textContent="Valider"
            btnValider.addEventListener("click",()=>{avisId=i['id'];validerAvis(); newDiv3.remove()});

            let btnSupprimer= document.createElement("button");
            btnSupprimer.classList.add("btn", "btn-primary");
            btnSupprimer.setAttribute("style","grid-column:4/5;grid-row:1/2;margin-block-start:auto;");
            btnSupprimer.textContent="Supprimer"
            btnSupprimer.addEventListener("click",()=>{avisId=i['id'];supprimerAvis(); newDiv3.remove()});

           
            newDiv4.appendChild(newDiv);           
            newDiv4.appendChild(newDiv1);           
            newDiv4.appendChild(newDiv2);           
            newDiv4.appendChild(btnValider);         
            newDiv4.appendChild(btnSupprimer);            
            newDiv3.appendChild(newDiv4);           
            avis.appendChild(newDiv3);           


         
    }} 
    function validerCommentaire(){
        let myHeaders = new Headers();
        //myHeaders.append("X-AUTH-TOKEN", getToken());
    
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };    
         fetch(apiUrl+"avis/validerAvis/" + avisId, requestOptions)
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
         function validerAvis(){
        let myHeaders = new Headers();
         myHeaders.append("X-AUTH-TOKEN", getToken());
        myHeaders.append("Content-Type", "application/json");
    
        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };    
         fetch(apiUrl+"avis/validerAvis" + avisId, requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de valider les avis");
            }
        })
          .then(result => {getAvis();
        })
        .catch(error =>{
            console.error("erreur lors de la récupération des données des avis", error);
        });
    }    
    
    function supprimerAvis(){
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };    
         fetch(apiUrl+"avis/" +avisId , requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de supprimer les avis");
            }
        })
          .then(result => {
        })
        .catch(error =>{
            console.error("erreur lors de la récupération des données des avis", error);
        });
    }
     function getReponses(){
        let myHeaders = new Headers();
        myHeaders.append("X-AUTH-TOKEN", getToken());
        myHeaders.append("Content-Type", "application/json");

        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };    
         fetch(apiUrl+"reponse/reponsesNon", requestOptions)
        .then(response =>{
            if(response.ok){
                return response.json();
            }
            else{
                console.log("Impossible de récupérer les réponses");
            }
        })
          .then(result => {
            console.log( 'l' + result);
            setReponses(result);
        })
        .catch(error =>{
            console.error("erreur lors de la récupération des données des avis", error);
        });
    }

function setReponses(reponses){
    while (covoiturages.firstChild) {
        covoiturages.removeChild(covoiturages.firstChild);
      }
    if (reponses.length>0){ 
    for (let l of reponses){
        let i=l['covoiturage'];
        let index=Number(reponses.indexOf(i))+1;
      
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
        let newDiv18= document.createElement("p");


        newDiv.classList.add("card", "mb-3");
        newDiv1.classList.add("card-body","shadow", "p-3", "rounded", "mx-5");
        newDiv2.setAttribute("style", "display:grid; grid-template-columns: repeat( 8, 1fr); grid-template-rows: repeat( 5, minmax(0, 1fr)");

        newDiv4.setAttribute("style","grid-column:1/2; grid-row: 2/3;");
        newDiv5.setAttribute("style","grid-column:2/3; grid-row: 2/3;");
        newDiv6.setAttribute("style","grid-column:3/4; grid-row: 2/3;");
        newDiv7.setAttribute("style","grid-column:4/5; grid-row: 2/3;");
        newDiv8.setAttribute("style","grid-column:1/2; grid-row: 3/4;");
        newDiv9.setAttribute("style","grid-column:2/3; grid-row: 3/4;");
        newDiv10.setAttribute("style","grid-column:3/4; grid-row: 3/4;");
        newDiv11.setAttribute("style","grid-column:4/5; grid-row: 3/4;");
        newDiv12.setAttribute("style","grid-column:1/3; grid-row: 4/5;");
        newDiv13.setAttribute("style","grid-column:1/2; grid-row: 5/6;");
        newDiv14.setAttribute("style","grid-column:5/9; grid-row: 3/4;");
        newDiv15.setAttribute("style","grid-column:7/9; grid-row: 3/4;");
        newDiv16.setAttribute("style","grid-column:1/9; grid-row: 1/2;");
        newDiv17.setAttribute("style","grid-column:7/9; grid-row: 2/3;");
        newDiv18.setAttribute("style","grid-column:5/7; grid-row: 2/3;");

        newDiv4.classList.add("my-auto");
        newDiv5.classList.add("my-auto");
        newDiv6.classList.add( "my-auto");
        newDiv7.classList.add("my-auto");
        newDiv8.classList.add("my-auto");
        newDiv9.classList.add("my-auto");
        newDiv10.classList.add("my-auto");
        newDiv11.classList.add("my-auto");
        newDiv12.classList.add("my-auto");
        newDiv13.classList.add("my-auto");
        newDiv14.classList.add("my-auto");
        newDiv16.classList.add("mx-auto");
        newDiv15.classList.add("mx-auto");
        newDiv17.classList.add("mx-auto");
        newDiv18.classList.add("my-auto");


   


        newDiv4.innerHTML="Départ :";
        newDiv5.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateDepart']));
        newDiv6.innerHTML=i['heureDepart'];
        newDiv7.innerHTML=i['lieuDepart'];
        newDiv8.innerHTML="Participant : " + l['user']['email'] ;    
        newDiv8.innerHTML="Arrivée :";
        newDiv9.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateArrivee']));
        newDiv10.innerHTML=i['heureArrivee'];
        newDiv11.innerHTML=i['lieuArrivee'];
        newDiv12.innerHTML='Participant : ' + l['user']['email'];
        newDiv13.innerHTML='Commentaire : ' + l['commentaire'] ;
        newDiv14.innerHTML='Chauffeur : ' + i['voiture']['user']['email'] ;

        newDiv16.innerHTML="Covoiturage n°" + i['id'];
        newDiv18.innerHTML="Prix : " + i['prixPersonne'];

     
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
        newDiv2.appendChild(newDiv18);

        newDiv1.appendChild(newDiv2);
        newDiv.appendChild(newDiv1);

        let btn=document.createElement("button");
        btn.classList.add("btn","btn-primary");
   
        let btn1=document.createElement("button");
        btn1.classList.add("btn","btn-primary");
   
        newDiv15.appendChild(btn);
        newDiv17.appendChild(btn1);
        btn.appendChild(document.createTextNode('Contacter le chauffeur'));
        btn.addEventListener("click",()=>{ 
            const myModalEnvoyerEmail = new bootstrap.Modal('#myModalEnvoyerEmail');
            EmailInput.value=i['voiture']['user']['email'];
            ObjetInput.value="Covoiturage du "+ i['dateDepart'].slice(0,10) +"T" +i['heureDepart'] ;
            const btnEnvoyerEmail = document.getElementById("btnEnvoyerEmail");
            btnEnvoyerEmail.addEventListener("click",mailChauffeur);
            myModalEnvoyerEmail.show();});
        btn1.appendChild(document.createTextNode('Payer le chauffeur'));
        btn1.addEventListener("click",()=>{btn1.remove(); idChauffeur=i['idChauffeur']; paiementChauffeur(prix);}) 
        
        let theFirstChild = covoiturages.firstChild;
        let theLastChild = covoiturages.lastChild;

        if (theFirstChild==null){
        covoiturages.insertBefore(newDiv, theFirstChild);}
        else{covoiturages.insertBefore(newDiv, theLastChild.nextSibling)};
    } }

 
    let sp1 = document.createElement("div");
    sp1.classList.add("mb-3");
    let parentDiv = covoiturages.parentNode;
    parentDiv.insertBefore(sp1, covoiturages.nextSibling);
}
function paiementChauffeur(prix){
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
     fetch(apiUrl+"credit/payerChauffeur/" + idChauffeur, requestOptions)
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
    function mailChauffeur(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");
 let dataForm = new FormData(formEnvoyerEmail);
                raw = JSON.stringify({
                "email": dataForm.get("Email"),
                "object": dataForm.get("Objet"),
                "message": dataForm.get("Message")});

    let requestOptions = {
        method: 'POST',
        body: raw,
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"mailer/email", requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible d'envoyer un mail");
        }
    })
    .then(result => {

    })}