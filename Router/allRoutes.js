import Route from "./Route.js";

//Définir ici vos routes
export const allRoutes = [
    new Route("/", "Accueil", "/pages/home.html", [],"/js/home.js"),
    new Route("/signin", "Connexion", "/pages/auth/signin.html", ["disconnected"],"/js/auth/signin.js"),
    new Route("/signup", "Inscription", "/pages/auth/signup.html", ["disconnected"],"/js/auth/signup.js"),
    new Route("/account", "Mon espace", "/pages/auth/account.html", ["client", "admin"], "/js/auth/account.js"),
    new Route("/editPassword", "Changement de mot de passe", "/pages/auth/editPassword.html", ["client", "admin"], "/js/auth/editPassword.js"),
    new Route("/allResa", "Mes covoiturages", "/pages/reservations/allResa.html", ["client"]),
    new Route("/reserver", "Rechercher", "/pages/reservations/reserver.html", ["client"]),
    new Route("/detail", "Détails du covoiturage", "/pages/reservations/detail.html", ["client"],"/js/detail.js"),
    new Route("/contact", "Contact", "/pages/contact.html", ["client"],"/js/contact.js"),
    new Route("/covoiturages", "Covoiturages", "/pages/covoiturages.html", ["client"],"/js/covoiturages.js"),


    ];

//Le titre s'affiche comme ceci : Route.titre - websitename
export const websiteName = "EcoRide";