let btnCovoiturages=document.getElementById("btnCovoiturages");
btnCovoiturages.addEventListener("click",()=>{getCovoiturages(2);})

let dateDepart=document.getElementById("dateDepart");
let lieuDepart=document.getElementById("lieuDepart");
let lieuArrivee=document.getElementById("lieuArrivee");
dateDepart.addEventListener("change", ()=>{validateForm(btnCovoiturages,dateDepart,lieuDepart,lieuArrivee);});
lieuDepart.addEventListener("change", ()=>{validateForm(btnCovoiturages,dateDepart,lieuDepart,lieuArrivee);});
lieuArrivee.addEventListener("change", ()=>{validateForm(btnCovoiturages,dateDepart,lieuDepart,lieuArrivee);});

let covoituragesForm=document.getElementById("covoituragesForm");
let id1=document.getElementById("id1");
let param=new URL(document.location).searchParams;
let idUser;
if (isConnected()){      
getIdUser();
}
lieuDepart.value=param.get("lieuDepart");
lieuArrivee.value=param.get("lieuArrivee");
dateDepart.value=param.get("dateDepart");



let prixMinimum, prixMaximum, DureeMaximum, DureeMinimum, energie, duree, note, prix, covoiturages, dateDepart1;
const PrixInput=document.getElementById("PrixInput");;
const DureeInput=document.getElementById("DureeInput");
const NoteInput=document.getElementById("NoteInput");
const EnergieInput=document.getElementById("EnergieInput");
const btnFiltrer=document.getElementById("btnFiltrer");
const btnToutReinitialiser= document.getElementById("btnToutReinitialiser");
btnFiltrer.addEventListener("click", filtrerResultats);
btnToutReinitialiser.addEventListener("click", ()=>{EnergieInput.checked==false;DureeInput.value='';NoteInput.value='';PrixInput.value=''});

btnCovoiturages.click();

function getPrixEtDureeMaximumEtMinimum(){
    let myHeaders = new Headers();

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
     fetch(apiUrl+"covoiturage/prixMaximumEtMinimum/" + lieuDepart.value + "/"+ lieuArrivee.value +"/" + dateDepart.value, requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations utilisateur");
        }
    })
    .then(result => {//filtre
        prixMinimum=Object.entries(result['0'])['0']['1'];
        prixMaximum=Object.entries(result['1'])['0']['1'];
        PrixInput.setAttribute("min",prixMinimum);
        PrixInput.setAttribute("max",prixMaximum);
        DureeMaximum=Object.entries(result['2'])['0']['1'].split(":")[0];
        DureeMinimum=Object.entries(result['3'])['0']['1'].split(":")[0];
        DureeInput.setAttribute("max",DureeMaximum);
        DureeInput.setAttribute("min",DureeMinimum);
        console.log(result);
    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });}


function getIdUser(){
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
        idUser= result['id'];

    })
    .catch(error =>{
        console.error("erreur lors de la récupération des données utilisateur", error);
    });
}

function setCovoiturages(covoiturages){
    while (id1.firstChild) {
        id1.removeChild(id1.firstChild);
      }
    let i=covoiturages;
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
        let noteChauffeur=i['noteChauffeur']!=null?i['noteChauffeur']:'';
        newDiv11.innerHTML=i['voiture']['user']['pseudo'] +"<br>" + i['voiture']['user']['pseudo']  +"<br>"+ "Note : " + noteChauffeur + '/5';
        newDiv12.innerHTML="Arrivée :";
        newDiv13.innerHTML=new Intl.DateTimeFormat("fr-FR").format(new Date(i['dateArrivee']));
        newDiv14.innerHTML=i['heureArrivee'];
        newDiv15.innerHTML=i['lieuArrivee'];
        newDiv16.innerHTML=i['nbPlace'] + place;
        newDiv17.innerHTML=i['voiture']['energie']=="Fuel"? "Trajet non écologique" : "Trajet écologique";
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
        if (isConnected()){
        let Chauffeur = idUser ==(i['voiture']['user']['id']) ? true : false ;
        btn.setAttribute("href","/detail" +"?id=" + i['id'] + "&idUser=" + idUser + "&Chauffeur=" + Chauffeur);}
        else{
        btn.setAttribute("href","/detail" + "?id=" + i['id']);}
     

        btn.appendChild(document.createTextNode('Détail'));
        newDiv10.appendChild(btn);
        let theFirstChild = id1.firstChild;
        let theLastChild = id1.lastChild;

        btn.onclick=function(ev){
            btnClass= i['id'];
 

         

        }  
        if (theFirstChild==null){
        id1.insertBefore(newDiv, theFirstChild);}
        else{id1.insertBefore(newDiv, theLastChild.nextSibling)};
    } }

 
    let sp1 = document.createElement("div");
    sp1.classList.add("mb-3");
    let parentDiv = id1.parentNode;
    parentDiv.insertBefore(sp1, id1.nextSibling);
}
function filtrerResultats(){
    let covoiturages1=[];
    energie=EnergieInput.checked==true?"Electrique":'';
    prix=PrixInput.value!=''?PrixInput.value:prixMaximum
    note=NoteInput.value!=''?NoteInput.value:0;
    duree=DureeInput.value!=''?DureeInput.value:DureeMaximum ;
      for(let i of covoiturages){
        if ((energie=="Electrique" && i['energie']=="Electrique") || energie==''){
            let date1= i['dateDepart'].replace('00:00:00+02:00',i['heureDepart']);    
            let date2= i['dateArrivee'].replace('00:00:00+02:00',i['heureArrivee']);
            let heure=(new Date(date2)-new Date(date1))/3600000;
            if (i['prixPersonne']<=prix && i['noteChauffeur']>=note && heure<=duree){ console.log("o");covoiturages1.push(i); }
      }
}
}

function ItineraireLePlusProche(){

    let myHeaders = new Headers();
    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };    
     fetch(apiUrl+"covoiturage/CovoituragesSansDate/" + lieuDepart.value + "/"+ lieuArrivee.value ,requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations des itinéraires sans date");
            id1.textContent="Il n'y a aucun itinéraire disponible.";
        }})
      .then(result => {
        console.log(result);
        if (result){
            let duree=Infinity;
            for(let i of result){
            if (duree>new Date(i['dateDepart'].replace('00:00:00+02:00',i['heureDepart'])) - new Date(dateDepart1)){
            duree=new Date(i['dateDepart'].replace('00:00:00+02:00',i['heureDepart'])) - new Date(dateDepart1);
            covoiturages=i;}}
        }

        let newDiv=document.createElement("div");
        let newDiv1=document.createElement("div"); 
        let newDiv2=document.createElement("div");
        let newDiv3=document.createElement("p");
        newDiv.classList.add("card", "mb-3");
        newDiv1.classList.add("card-body","shadow", "p-3",  "bg-body-tertiary", "rounded");
        newDiv2.classList.add("container5");
        newDiv2.classList.add("text-center");
        newDiv2.classList.add("text-center");

        newDiv.appendChild(newDiv1);
        newDiv1.appendChild(newDiv2);
        newDiv.appendChild(newDiv1);
        newDiv3.textContent="Il n'y a aucun covoiturage disponible à cette date. Voulez vous modifier la date de voyage à la date du premier itinéraire le plus proche ?";
        let newDiv4 = document.createElement("a");
        
        newDiv4.classList.add("a");
        newDiv4.textContent=new Intl.DateTimeFormat('fr-FR').format(new Date(covoiturages['dateDepart']));
   
        newDiv4.addEventListener("click", ()=>{dateDepart.value= covoiturages['dateDepart'].replace('T00:00:00+02:00','');getCovoiturages()});
        
        console.log('o');
        newDiv2.appendChild(newDiv3);
        newDiv2.appendChild(newDiv4);
        newDiv1.appendChild(newDiv2);
        newDiv.appendChild(newDiv1);
        id1.appendChild(newDiv);


})
    .catch(error =>{
        console.log(error);
        console.error("erreur lors de la récupération des données des covoiturages", error);
    });
}



function getCovoiturages(){
    let myHeaders = new Headers();
    //myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
      
     fetch(apiUrl+"covoiturage/Covoiturages/" + lieuDepart.value + "/"+ lieuArrivee.value +"/" + dateDepart.value ,requestOptions)

    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations des covoiturages");
            dateDepart1=dateDepart.value;
            while (id1.firstChild) {
        id1.removeChild(id1.firstChild);
      }
            ItineraireLePlusProche();
        }
        
        }
    )
      .then(result => {
        console.log(result);
        if (result){setCovoiturages(result);covoiturages=result;getPrixEtDureeMaximumEtMinimum();}

})
    .catch(error =>{
        console.log(error);
        console.error("erreur lors de la récupération des données des covoiturages", error);
    });
}
function validateForm(){
    const dateDepartOk = validateRequired(dateDepart);
    const lieuDepartOk = validateRequired(lieuDepart);
    const lieuArriveeOk = validateRequired(lieuArrivee);
    if (dateDepartOk && lieuDepartOk && lieuArriveeOk){
        btnCovoiturages.disabled=false;
    }
    else{
        btnCovoiturages.disabled=true;
    }
}
function validateRequired(input){
    return input.value != '';
}
nombreDeparts();
function nombreDeparts(){
    let myHeaders = new Headers();
    //myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
      
     fetch(apiUrl+"covoiturage/nombreDeparts"  ,requestOptions)

    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les nombre de covoiturages");
        }
        
        }
    )
      .then(result => {
        console.log(result);

})
    .catch(error =>{
        console.log(error);
        console.error("erreur lors de la récupération des données des covoiturages", error);
    });
}