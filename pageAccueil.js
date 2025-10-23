//SCRIPT PAGE ACCUEIL
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
            afficherSeriesXML(xmlDoc);
            afficherDocumentairesXML(xmlDoc);
            afficherMangasXML(xmlDoc);
            afficherAnimesXML(xmlDoc);
            afficherShowsXML(xmlDoc);
            afficherConcertsXML(xmlDoc);
            
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

// =========================================================================================================
/**
 * Fonction pour afficher les FILMS depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
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
        let filmCard = creerCarteXML(films[i]);
        container.appendChild(filmCard);
    }
 }

 /**
 * Fonction pour afficher les SERIES depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
 */

 function afficherSeriesXML(xmlDoc) {
    //Récupérer le conteneur HTML où afficher les series
    let container = document.getElementById("series");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Séries";
    container.appendChild(titre);

    //Récupérer TOUS les Elements <series> du XML
    //getElementsByName() retourne une collection de tous les elements avec ce nom de balise
    let series = xmlDoc.getElementsByTagName("serie");
    console.log(series);
    
    //Parcourir tous les series ( attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < series.length;i++) {
        console.log(series[i]);
        let serieCard = creerCarteXML(series[i]);
        container.appendChild(serieCard);
    }
 }

 /**
 * Fonction pour afficher les DOCUMENTAIRES depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
 */

 function afficherDocumentairesXML(xmlDoc) {
    //Récupérer le conteneur HTML où afficher les documentaires
    let container = document.getElementById("documentaires");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Documentaires";
    container.appendChild(titre);

    //Récupérer TOUS les Elements <documentaires> du XML
    //getElementsByName() retourne une collection de tous les elements avec ce nom de balise
    let documentaires = xmlDoc.getElementsByTagName("documentaire");
    console.log(documentaires);
    
    //Parcourir tous les documentaires (attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < documentaires.length;i++) {
        console.log(documentaires[i]);
        let documentaireCard = creerCarteXML(documentaires[i]);
        container.appendChild(documentaireCard);
    }
 }
 
 /**
 * Fonction pour afficher les MANGAS depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
 */

 function afficherMangasXML(xmlDoc) {
    //Récupérer le conteneur HTML où afficher les mangas
    let container = document.getElementById("mangas");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Mangas";
    container.appendChild(titre);

    //Récupérer TOUS les Elements <mangas> du XML
    //getElementsByName() retourne une collection de tous les elements avec ce nom de balise
    let mangas = xmlDoc.getElementsByTagName("manga");
    console.log(mangas);
    
    //Parcourir tous les mangas (attention mangas est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < mangas.length;i++) {
        console.log(mangas[i]);
        let mangaCard = creerCarteXML(mangas[i]);
        container.appendChild(mangaCard);
    }
 }

  /**
 * Fonction pour afficher les ANIMES depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
 */

 function afficherAnimesXML(xmlDoc) {
    //Récupérer le conteneur HTML où afficher les animes
    let container = document.getElementById("animes");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Animes";
    container.appendChild(titre);

    //Récupérer TOUS les Elements <animes> du XML
    //getElementsByName() retourne une collection de tous les elements avec ce nom de balise
    let animes = xmlDoc.getElementsByTagName("anime");
    console.log(animes);
    
    //Parcourir tous les animes (attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < animes.length;i++) {
        console.log(animes[i]);
        let animeCard = creerCarteXML(animes[i]);
        container.appendChild(animeCard);
    }
 }
 
  /**
 * Fonction pour afficher les SHOWS depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
 */

 function afficherShowsXML(xmlDoc) {
    //Récupérer le conteneur HTML où afficher les series
    let container = document.getElementById("shows");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Shows";
    container.appendChild(titre);

    //Récupérer TOUS les Elements <shows> du XML
    //getElementsByName() retourne une collection de tous les elements avec ce nom de balise
    let shows = xmlDoc.getElementsByTagName("show");
    console.log(shows);
    
    //Parcourir tous les shows (attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < shows.length;i++) {
        console.log(shows[i]);
        let showCard = creerCarteXML(shows[i]);
        container.appendChild(showCard);
    }
 }

  /**
 * Fonction pour afficher les CONCERTS depuis le document XML
 * @param {Document} xmlDoc Document XML parsé par DOMParser
 */

 function afficherConcertsXML(xmlDoc) {
    //Récupérer le conteneur HTML où afficher les concerts
    let container = document.getElementById("concerts");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Concerts";
    container.appendChild(titre);

    //Récupérer TOUS les Elements <concerts> du XML
    //getElementsByName() retourne une collection de tous les elements avec ce nom de balise
    let concerts = xmlDoc.getElementsByTagName("concert");
    console.log(concerts);
    
    //Parcourir tous les concerts (attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < concerts.length;i++) {
        console.log(concerts[i]);
        let concertCard = creerCarteXML(concerts[i]);
        container.appendChild(concertCard);
    }
 }
 
//========================================================================================================
 /**
  * Fonction générique pour créer une carte d'affichage à partir d'un élément XML
  * @param {element} item - element XML (film, serie, etc)
  @returns {HTMLElement} element div representant la carte
  */

 function creerCarteXML(item){
    // créer le conteneur de la carte
    // créer une div pour la carte
    let card = document.createElement("div");
    card.className = "card"; // = card.setAttribute(className,"card");

    // extraire du XML

    // récupérer le nom depuis la balise <nom>
    let nom = item.getElementsByTagName("nom")[0].textContent;

    // récupérer le genre depuis la balise <genre>
    let genre= item.getElementsByTagName("genre")[0].textContent;

    // récupérer le réalisateur depuis la balise <realisateur>
    let realisateur = item.getElementsByTagName("realisateur")[0].textContent;

    // récupérer la date de sortie depuis la balise <dateSortie>
    let dateSortie = item.getElementsByTagName("dateSortie")[0].textContent;

    // récuperer le resumé depuis la balise <resumer>
    //trim( )- supprimer les espaces au début et à la fin
    let resumer = item.getElementsByTagName("resumer")[0].textContent.trim()

    // recuperer l'url de l'image depuis la balise <url>
    let url = item.getElementsByTagName("url")[0].textContent;

    // créer un element img pour afficher l'image
    let img = document.createElement("img");
    // définir la source de l' image
    img.src = url;
    img.alt = nom;
    img.className = "card-image";

    // créer le conteneur pour les informations
    // créer un div pour contenir toutes les infos textuelles
    let infoDiv = document.createElement("div");
    infoDiv.className = "card-info";

    // créer le titre
    // créer un element H3 pour le titre 
    let titreElement = document.createElement ("h3");
    titreElement.textContent = nom;

    // créer l'element genre
    // creer un paragraphe pour le genre
    let genreElement = document.createElement("p");
    //innerHTML permet d'insérer du html
    genreElement.innerHTML = "<strong>Genre : </strong>" + genre;
    // créer l'element realisateur
    // créer un paragraphe pour le realisateur
    let realisateurElement = document.createElement("p");
    realisateurElement.innerHTML = "<strong>Réalisateur : </strong>" + realisateur;

    // créer l'element date de sortie
    // créer un paragraphe date de sortie
    let dateElement = document.createElement("p")
    dateElement.innerHTML = "<strong>Date de sortie : </strong>" + dateSortie;

    // créer le conteneur du résumé
    // créer un div pour contenir le résumé et le bouton
    let resumerContainer = document.createElement("div");
    resumerContainer.className = "resume-container";

    // créer l'element résumé
    // créer le paragraphe pour le résumé
    let resumerElement = document.createElement("p");
    resumerElement.className = "resume";
    resumerElement.innerHTML = "<strong>Résumé : </strong>" + resumer;

    // ajouter le resumé au conteneur
    resumerContainer.appendChild(resumerElement);

    // vérifier si le résumé dépasse 4 lignes la fonction bonus ()
    // utiliser le set Timeout pour laisser le DOM se mettre à jour
    // permettre aussi de mesurer la hauteur réelle

    // assembler tous les element
    // ajouter tous les elements au conteneur d'information
    infoDiv.appendChild(titreElement);
    infoDiv.appendChild(genreElement);
    infoDiv.appendChild(realisateurElement);
    infoDiv.appendChild(dateElement);
    infoDiv.appendChild(resumerContainer);


    // ajoute l'image et les informations à la carte
    card.appendChild(img);
    card.appendChild(infoDiv);

    // Rendre l'élément card cliquable
    
        //Récupérer l'id de l'élément depuis l'attribut "id"
        let itemId = item.getAttribute("id");

        //Récupérer le nom de la balise XML pour déterminer la catégorie
        let itemType = item.tagName.toLowerCase();

        // Vérifier que l' id existe avant de rendre la carte cliquable
        if(itemId && itemType) {
            //ajouter l'évènement au click
            card.onclick = function() {
                //rédiger vers la page descriptive avec l'id et le type dynamique
                window.location.href = `ficheDescriptive.html?id=${itemId}&type=${itemType}`;
            };

        } else {
            console.error("Le type ou l'id n'a pas été trouvé.");
        }
    return card;

 } 

/**Charger les données lorsque le DOM est complétement chargé
*DOMContentLoaded = évenement declenché lorsque le html est pret
*/
document.addEventListener("DOMContentLoaded", function() {
    console.log("Le DOM est chargé,lancement de netflop avec DOMParser...");

    //executer la function chargerNetflopXML
    chargerNetflopXml();
})

console.log(chargerNetflopXml);