//SCRIPT PAGE ACCUEIL
// Netflop version XMLHttpRequest (Objet javascript qui permet de récupérer un fichier JSON ou XML : il envoie une requête au serveur pour récupérer des infos)

function chargerNetflopJSON() {
    //Créer un nouvel objet XMLHttpRequest
    let xhr = new XMLHttpRequest();
    
    //configurer une requete
    //utiliser la methode "GET" = pour récupérer des données
    // le nom du fichier à charger
    // - true = requête asynchrone (le programme n'attend pas que les informations soient reçues pour continuer à fonctionner donc cela ne bloque pas le navigateur et l'exécution du code)
    xhr.open("GET","netflop.json",true);

    //Définir le gestionnaire d'évenement pour le chargement
    xhr.onload = function(){
        //vérifier si la requête réussi
        //status 200 = OK (succès)
        if(xhr.status === 200) {
        //Parser le JSON avec la méthode parse
            let data = JSON.parse(xhr.responseText);
            console.log(data); 
            //La méthode .parse parse le text json recu et le converti en objet JSON
            //xhr.responseText renvoit le contenu de l'objet JSON
                       
            //Afficher les différentes catégories
            afficherFilmsJSON(data.netflop.films.film);
            afficherMangasJSON(data.netflop.mangas.manga);
            afficherSeriesJSON(data.netflop.series.serie);
            afficherShowsJSON(data.netflop.shows.show);
            afficherConcertsJSON(data.netflop.concerts.concert);
            afficherDocumentairesJSON(data.netflop.documentaires.documentaire);
            afficherAnimesJSON(data.netflop.animes.anime);
    
        }else{
            console.error("erreur de chargement du JSON");
            console.error("status:", xhr.status);
            console.error("message:", xhr.statusText);            
        }
    }

    //Gérer les erreurs réseau
    xhr.onerror = function(){
        console.log("erreur reseau lors du chargement du JSON");
        alert("impossible de charger les données. Vérifier votre connexion !");        
    }
    //Envoyer la requête
    xhr.send();
}

// =========================================================================================================
/**
 * Fonction pour afficher les FILMS depuis le document JSON
 * @param {Document} films films = data.netflop.films; dans le document JSON 
 */

 function afficherFilmsJSON(films) {
    //Récupérer le conteneur HTML où afficher les films
    let container = document.getElementById("films");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Films";
    container.appendChild(titre);
    
    //Parcourir tous les films ( attention films est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < films.length;i++) {
        console.log(films[i]);
        let filmCard = creerCarteJSON(films[i], "film");
        container.appendChild(filmCard);
    }
    
 }

 /**
 * Fonction pour afficher les SERIES depuis le document JSON
 * @param {Document} series series = data.netflop.series; dans le document JSON 
 */

 function afficherSeriesJSON(series) {
    //Récupérer le conteneur HTML où afficher les series
    let container = document.getElementById("series");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Séries";
    container.appendChild(titre);
    
    //Parcourir tous les series ( attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < series.length;i++) {
        console.log(series[i]);
        let serieCard = creerCarteJSON(series[i],"serie");
        container.appendChild(serieCard);
    }
 }

 /**
 * Fonction pour afficher les DOCUMENTAIRES depuis le document JSON
 * @param {Document} documentaires documentaires = data.netflop.documentaires; dans le document JSON 
 */

 function afficherDocumentairesJSON(documentaires) {
    //Récupérer le conteneur HTML où afficher les documentaires
    let container = document.getElementById("documentaires");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Documentaires";
    container.appendChild(titre);
    
    //Parcourir tous les documentaires (attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < documentaires.length;i++) {
        console.log(documentaires[i]);
        let documentaireCard = creerCarteJSON(documentaires[i],"documentaire");
        container.appendChild(documentaireCard);
    }
 }
 
 /**
 * Fonction pour afficher les MANGAS depuis le document JSON
 * @param {Document} mangas mangas = data.netflop.mangas; dans le document JSON
 */

 function afficherMangasJSON(mangas) {
    //Récupérer le conteneur HTML où afficher les mangas
    let container = document.getElementById("mangas");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Mangas";
    container.appendChild(titre);

    
    //Parcourir tous les mangas (attention mangas est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < mangas.length;i++) {
        console.log(mangas[i]);
        let mangaCard = creerCarteJSON(mangas[i], "manga");
        container.appendChild(mangaCard);
    }
 }

  /**
 * Fonction pour afficher les ANIMES depuis le document JSON
 * @param {Document} animes animes = data.netflop.animes; dans le document JSON
 */

 function afficherAnimesJSON(animes) {
    //Récupérer le conteneur HTML où afficher les animes
    let container = document.getElementById("animes");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Animes";
    container.appendChild(titre);
    
    //Parcourir tous les animes (attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < animes.length;i++) {
        console.log(animes[i]);
        let animeCard = creerCarteJSON(animes[i], "animes");
        container.appendChild(animeCard);
    }
 }
 
  /**
 * Fonction pour afficher les SHOWS depuis le document JSON
 * @param {Document} shows shows = data.netflop.shows; dans le document JSON
 */

 function afficherShowsJSON(shows) {
    //Récupérer le conteneur HTML où afficher les series
    let container = document.getElementById("shows");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Shows";
    container.appendChild(titre);
    
    //Parcourir tous les shows (attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < shows.length;i++) {
        console.log(shows[i]);
        let showCard = creerCarteJSON(shows[i], "shows");
        container.appendChild(showCard);
    }
 }

  /**
 * Fonction pour afficher les CONCERTS depuis le document JSON
 * @param {Document} concerts concerts = data.netflop.concerts; dans le document JSON
 */

 function afficherConcertsJSON(concerts) {
    //Récupérer le conteneur HTML où afficher les concerts
    let container = document.getElementById("concerts");

    //Créer un titre pour la section
    let titre = document.createElement("h2");
    titre.textContent = "Concerts";
    container.appendChild(titre);
    
    //Parcourir tous les concerts (attention series est un HTMLCollection, du coup pas un vrai tableau!)
    for (let i = 0; i < concerts.length;i++) {
        console.log(concerts[i]);
        let concertCard = creerCarteJSON(concerts[i], "concert");
        container.appendChild(concertCard);
    }
 }
 
//========================================================================================================
 /**
  * Fonction générique pour créer une carte d'affichage à partir d'un élément JSON
  * @param {element} item - element JSON (film, serie, etc)
  @returns {HTMLElement} element div representant la carte
  */

 function creerCarteJSON(item, itemType){
    console.log(item);
    // créer le conteneur de la carte
    // créer une div pour la carte
    let card = document.createElement("div");
    card.className = "card"; // = card.setAttribute(className,"card");

    // extraire du JSON

    // récupérer le nom depuis la propriété nom: de mon objet item
    let nom = item.nom;

    // récupérer le genre depuis la propriété genre: de mon objet item
    let genre= item.genre;

    // récupérer le réalisateur depuis la propriété realisateur: de mon objet item
    let realisateur = item.realisateur;

    // récupérer la date de sortie depuis la propriété dateSortie: de mon objet item
    let dateSortie = item.dateSortie;

    // récuperer le resumé depuis la propriété resumer: de mon objet item
    //trim( )- supprimer les espaces au début et à la fin
    let resumer = item.resumer;

    // recuperer l'url de l'image epuis la propriété url: de mon objet item
    let url = item.url;

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
        let itemId = item.id;

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

    //executer la fonction chargerNetflopJSON
    chargerNetflopJSON();
})

console.log(chargerNetflopJSON);