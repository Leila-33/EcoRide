lienCovoiturages=document.getElementById("lienCovoiturages");
dateDepart=document.getElementById("dateDepart");
lieuDepart=document.getElementById("lieuDepart");
lieuArrivee=document.getElementById("lieuArrivee");

covoituragesForm=document.getElementById("covoituragesForm");

lienCovoiturages.addEventListener("click",()=>{dataForm = new FormData(covoituragesForm); lienCovoiturages.setAttribute("href","/covoiturages" +"?lieuDepart=" + dataForm.get("lieuDepart") + "&lieuArrivee=" + dataForm.get("lieuArrivee")  + "&dateDepart=" + dataForm.get("dateDepart"));})
