const btnCovoiturages=document.getElementById("btnCovoiturages");
const dateDepart=document.getElementById("dateDepart");
const lieuDepart=document.getElementById("lieuDepart");
const lieuArrivee=document.getElementById("lieuArrivee");
const covoituragesForm=document.getElementById("covoituragesForm");

btnCovoiturages.addEventListener("click",()=>{dataForm = new FormData(covoituragesForm); window.location.replace("/covoiturages" +"?lieuDepart=" + dataForm.get("lieuDepart") + "&lieuArrivee=" + dataForm.get("lieuArrivee")  + "&dateDepart=" + dataForm.get("dateDepart"));})
btnCovoiturages.disabled=true;


dateDepart.addEventListener("change", ()=>{validateForm(btnCovoiturages,dateDepart,lieuDepart,lieuArrivee);});
lieuDepart.addEventListener("change", ()=>{validateForm(btnCovoiturages,dateDepart,lieuDepart,lieuArrivee);});
lieuArrivee.addEventListener("change", ()=>{validateForm(btnCovoiturages,dateDepart,lieuDepart,lieuArrivee);});
