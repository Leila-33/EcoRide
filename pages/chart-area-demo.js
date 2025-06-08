// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily = '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = '#292b2c';
let dates=[];
let dates1=[];
let nombres=[];
let nombres1=[];
const inputPersonnes=document.getElementById("inputPersonnes");
const creditsTotal=document.getElementById("creditsTotal");
const btnSuspendre=document.getElementById("btnSuspendre");
btnSuspendre.addEventListener("click", ()=>{suspendre(inputPersonnes.value);});

nombreDeparts();
nombreCreditsTotal();
nombreCreditsParJour();
personnes();
function personnes(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
      
     fetch(apiUrl+"personnes"  ,requestOptions)

    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les données");
        }
        
        }
    )
      .then(result => {
        for (let i of result){
          console.log(result)
 let opt = document.createElement("option");
        opt.text=i['nom'] +' ' + i['prenom'] ;
        opt.value=i['id'];
        inputPersonnes.add(opt,null);}

})
    .catch(error =>{
        console.log(error);
        console.error("erreur lors de la récupération des données", error);
    });
}
function suspendre(id){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'DELETE',
        headers: myHeaders,
        redirect: 'follow'
    };
      
     fetch(apiUrl+ id  ,requestOptions)

    .then(response =>{
        if(response.ok){
            return response.json();
        }
        else{
            console.log("Impossible de récupérer les données");
        }
        
        }
    )
      .then(result => {
        for (let i of result){
          console.log(result)
 let opt = document.createElement("option");
        opt.text=i['nom'] +' ' + i['prenom'] ;
        opt.value=i['id'];
        inputPersonnes.add(opt,null);}

})
    .catch(error =>{
        console.log(error);
        console.error("erreur lors de la récupération des données", error);
    });
}

function nombreDeparts(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

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
        for (let i of result){dates.push(i['date_depart']);nombres.push(i['COUNT(*)']);}
        console.log(dates);
        drawChart();

})
    .catch(error =>{
        console.log(error);
        console.error("erreur lors de la récupération des données des covoiturages", error);
    });
}
// Area Chart Example
function drawChart(){
var ctx = document.getElementById("myAreaChart");
var myLineChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: dates,
    datasets: [{
      label: "Sessions",
      lineTension: 0.3,
      backgroundColor: "rgba(2,117,216,0.2)",
      borderColor: "rgba(2,117,216,1)",
      pointRadius: 5,
      pointBackgroundColor: "rgba(2,117,216,1)",
      pointBorderColor: "rgba(255,255,255,0.8)",
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(2,117,216,1)",
      pointHitRadius: 50,
      pointBorderWidth: 2,
      data: nombres,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 7
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: Math.max(...nombres),
          maxTicksLimit: 5
        },
        gridLines: {
          color: "rgba(0, 0, 0, .125)",
        }
      }],
    },
    legend: {
      display: false
    }
  }
});}

function nombreCreditsParJour(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
      
     fetch(apiUrl+"operation/nombreCreditsParJour"  ,requestOptions)

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
        for (let i of result){dates1.push(i['date_operation']);nombres1.push(i['SUM(o.operation)']);}
        drawBarChart();
        console.log(dates1);
        console.log(nombres1);

})
    .catch(error =>{
        console.log(error);
        console.error("erreur lors de la récupération des données des covoiturages", error);
    });
}
function nombreCreditsTotal(){
    let myHeaders = new Headers();
    myHeaders.append("X-AUTH-TOKEN", getToken());
    myHeaders.append("Content-Type", "application/json");

    let requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };
      
     fetch(apiUrl+"credit/nombreCreditsTotal"  ,requestOptions)

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
        creditsTotal.textContent=result;

})
    .catch(error =>{
        console.log(error);
        console.error("erreur lors de la récupération des données des covoiturages", error);
    });
}

function drawBarChart(){
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: dates1,
    datasets: [{
      label: "Revenue",
      backgroundColor: "rgba(2,117,216,1)",
      borderColor: "rgba(2,117,216,1)",
      data: nombres1,
    }],
  },
  options: {
    scales: {
      xAxes: [{
        time: {
          unit: 'date'
        },
        gridLines: {
          display: false
        },
        ticks: {
          maxTicksLimit: 6
        }
      }],
      yAxes: [{
        ticks: {
          min: 0,
          max: Math.max(...nombres1),
          maxTicksLimit: 5
        },
        gridLines: {
          display: true
        }
      }],
    },
    legend: {
      display: false
    }
  }
});}
