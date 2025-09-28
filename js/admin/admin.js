/* global Chart */
let datesDeparts = [];
let nombresDeparts = [];
let datesOperations = [];
let nbCreditsParJour = [];
const creditsTotal = document.getElementById("creditsTotal");
const adminName = document.getElementById("adminName");
const updatedAtChart = document.getElementById("updatedAtChart");
const updatedAtBarChart = document.getElementById("updatedAtBarChart");
const updatedAtCredit = document.getElementById("updatedAtCredit");

initData();

// Retourne toutes les informations utilisateurs
async function initData() {
  await window.AppData.withLoader(async () => {
    const result = await window.AppData.getInfosUser();
    adminName.textContent = `${result['prenom']}  ${result['nom']}`;
    await nombreDeparts();
    await nombreCreditsTotal();
    await nombreCreditsParJour();
  });
}

function updateTime(element) {
  const dateStr = new Date().toLocaleDateString('fr-FR');
  const timeStr = new Date().toLocaleTimeString('fr-FR');
  element.textContent = `Mis à jour le ${dateStr} à ${timeStr}.`;
}

async function nombreDeparts() {
  const result = await window.AppData.apiFetch("covoiturage/nombreDeparts")
  if (!result.ok) {
    console.log("Impossible de récupérer le nombre de départs", result.message);
    window.AppData.showToast(result.message, "danger")
    return;
  }
  for (let row of result.data) {
    datesDeparts.push(row['date_depart']);
    nombresDeparts.push(row['nombre']);
  }
  drawChart();
  updateTime(updatedAtChart);
}

// Area Chart Example
function drawChart() {
  var ctx = document.getElementById("myAreaChart");
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: datesDeparts,
      datasets: [{
        label: "Covoiturages",
        lineTension: 0.3,
        backgroundColor: "#008677",
        borderColor: "#008677",
        pointRadius: 5,
        pointBackgroundColor: "3F997A",
        pointBorderColor: "rgba(255,255,255,0.8)",
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "3F997A",
        pointHitRadius: 50,
        pointBorderWidth: 2,
        data: nombresDeparts,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 7
          }
        },
        y: {
          ticks: {
            min: 0,
            max: Math.max(...nombresDeparts),
            maxTicksLimit: 5
          },
          gridLines: {
            color: "rgba(0, 0, 0, .125)",
          }
        },
      },
      legend: {
        display: false
      }
    }
  });
}

async function nombreCreditsParJour() {
  const result = await window.AppData.apiFetch("operation/nombreCreditsParJour");
  if (!result.ok) {
    console.log("Impossible de récupérer le nombre de crédits gagnés par jour.", result.message);
    window.AppData.showToast(result.message, "danger")
    return;
  }
  for (let i of result.data) {
    datesOperations.push(i['date_operation']);
    nbCreditsParJour.push(i['total']);
  }
  drawBarChart();
  updateTime(updatedAtBarChart);

}

async function nombreCreditsTotal() {
  const result = await window.AppData.apiFetch("credit/nombreCreditsTotal");
  if (!result.ok) {
    console.log("Impossible de récupérer le nombre de crédits gagnés total.", result.message);
    window.AppData.showToast(result.message, "danger")
    return;
  }
  let newSpan = window.AppData.createEl("span", ["credit-total"], window.AppData.formatPrix(result.data["creditTotal"]))
  let creditsText = window.AppData.createEl("span", [], " crédits");
  creditsTotal.appendChild(newSpan);
  creditsTotal.appendChild(creditsText);
  updateTime(updatedAtCredit);

}

function drawBarChart() {
  var ctx = document.getElementById("myBarChart");
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: datesOperations,
      datasets: [{
        label: "Credits",
        backgroundColor: "#008677",
        borderColor: "#008677",
        data: nbCreditsParJour,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          time: {
            unit: 'date'
          },
          gridLines: {
            display: false
          },
          ticks: {
            maxTicksLimit: 6
          }
        },
        y: {
          ticks: {
            min: 0,
            max: Math.max(...nbCreditsParJour),
            maxTicksLimit: 5
          },
          gridLines: {
            display: true
          }
        },
      },
      legend: {
        display: false
      }
    }
  });
}
