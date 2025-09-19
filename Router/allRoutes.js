import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", [],"/js/home.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"],"/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"],"/js/auth/signup.js"),
    new Route("/account", "Mon espace", "/pages/auth/account.html", ["ROLE_USER"], "/js/auth/account.js"),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["ROLE_USER", "admin"], "/js/auth/editPassword.js"),
    new Route("/detail", "Détails du covoiturage", "/pages/detail.html", [],"/js/detail.js"),
    new Route("/contact", "Contact", "/pages/contact.html", [],"/js/contact.js"),
    new Route("/covoiturages", "Covoiturages", "/pages/covoiturages.html", [],"/js/covoiturages.js"),
    new Route("/mentionslegales", "Mentions légales", "/pages/mentionslegales.html", []),
    new Route("/employe", "Espace employé", "/pages/employe.html", ["ROLE_EMPLOYE"],"/js/employe.js"),
    new Route("/admin", "Espace admin", "/pages/admin/admin.html", ["ROLE_ADMIN"],["https://cdn.jsdelivr.net/npm/chart.js","js/admin/admin.js"]),
    new Route("/createaccount", "Créer un compte", "/pages/admin/createaccount.html", ["ROLE_ADMIN"],["js/admin/createaccount.js"]),
    new Route("/suspendre", "Suspendre un compte", "/pages/admin/suspendre.html", ["ROLE_ADMIN"],["js/admin/suspendre.js"]),
    new Route("/mesInformations", "Mes informations personnelles", "/pages/admin/mesInformations.html", ["ROLE_ADMIN", "ROLE_EMPLOYE"],["js/admin/mesInformations.js"]),


    ];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";