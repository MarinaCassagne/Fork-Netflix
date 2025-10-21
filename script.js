// Netflop version XMLHttpRequest (Objet javascript qui permet de récupérer un fichier JSON ou XML : il envoie une requête au serveur pour récupérer des infos)

function chargerNetflopXml() {
    //Créer un nouvel objet XMLHttpRequest
    let xhr = new XMLHttpRequest();
    
    //configurer une requete
    //utiliser la methode "GET" = pour récupérer des données
    // le nom du fichier à charger
    // - true = requête asynchrone (le programme n'attend pas que les informations soient reçues pour continuer à fonctionner donc cela ne bloque pas le navigateur et l'exécution du code)
    xhr.open("GET","netflop.xml",true);

    //Définir le gestionnaire d'évenement pour le chargement
    xhr.onload = function(){
        //vérifier si la requête réussi
        //status 200 = OK (succès)
        if(xhr.status === 200) {
            //Parser le XML avec DOMPARSER
            //on crée une instance de DOMParser
            let parser = new DOMParser();
            //console.log(parser);
            //Parse le text xml recu et convertir en Document XML
            //xhr.responseText = le contenu du fichier XML en texte
            //"text/xml" = typeMIME pour indiquer que c'est du XML
            let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");
            
            //Afficher les différentes catégories
            afficherFilmsXML(xmlDoc);




            console.log(xmlDoc);
    
        }else{
            console.error("erreur lors du chargement du fichier XML");
            console.error("status:", xhr.status);
            console.error("message:", xhr.statusText);            
        }
    }

    //Gérer les erreurs réseau
    xhr.onerror = function(){
        console.log("erreur reseau lors du chargement du fichier xml");
        alert("impossible de charger les données. Vérifier votre connexion !");        
    }
    //Envoyer la requête
    xhr.send();
}

console.log(chargerNetflopXml());

/**
 * Fonction pour afficher les films depuis le document XML
 * @param {Document} xmlDoc Docunent XML parsé par DOMParser
 */

 function afficherFilmsXML(xmlDoc) {
    //Récupérer le conteneur HTML où afficher les films
    let container = document.getElementById("films");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Films";
    container.appendChild(titre);

    //Récupérer TOUS les Elements <films> du XML
    //getElementsByName() retourne une collection de tous les elements avec ce nom de balise
    let films = xmlDoc.getElementsByTagName("film");
    console.log(films);
    
    //Parcourir tous les films ( attention films est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < films.length;i++) {
        console.log(films[i]);
    }
 }