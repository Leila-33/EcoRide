let lienCovoiturages=document.getElementById("lienCovoiturages");
let dateDepart=document.getElementById("dateDepart");
let lieuDepart=document.getElementById("lieuDepart");
let lieuArrivee=document.getElementById("lieuArrivee");
let covoituragesForm=document.getElementById("covoituragesForm");
let id1=document.getElementById("id1");

let param=new URL(document.location).searchParams;
let idUser=0;
if (isConnected()){      
idUser=getIdUser();
}
lieuDepart.value=param.get("lieuDepart");
lieuArrivee.value=param.get("lieuArrivee");
dateDepart.value=param.get("dateDepart");

lienCovoiturages.addEventListener("click",()=>{ getCovoiturages();})
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
function getCovoiturages(){
    let myHeaders = new Headers();
    //myHeaders.append("X-AUTH-TOKEN", getToken());

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

     fetch(apiUrl+"covoiturage/Covoiturages/" + lieuDepart.value + "/"+ lieuArrivee.value +"/" + dateDepart.value, requestOptions)
    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les informations des covoiturages");
            id1.textContent="Il n'y a pas de covoiturages disponibles à cette date.";
        }
    })
      .then(result => {
        console.log(result);
        setCovoiturages(result);

})
    .catch(error =>{
        console.error("erreur lors de la récupération des données des covoiturages", error);
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
        if (isConnected()){
        let Chauffeur = idUser ==(i['voiture']['user']['id']) ? true : false ;
        btn.setAttribute("href","/detail" +"?id=" + i['id'] + "&idUser=" + idUser + "&Chauffeur=" + Chauffeur);}
        else{
        btn.setAttribute("href","/detail");}
     

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
