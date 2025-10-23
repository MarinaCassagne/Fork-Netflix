//SCRIPT PAGE DESCRIPTIVE

// Récupérer les données à afficher sur notre page descriptive du film...
// il nous faut donc l'ID et le Type

/**
 * Récupérer dans l'URL tous ce qu'il y a après le point d'interrogation (id,type)
 *
 */
function getUrlParams() {
  let params = new URLSearchParams(window.location.search);
  return {
    id: params.get("id"),
    type: params.get("type")
  };
}

//=====================================================================================================

function chargerItemDetail() {
  let params = getUrlParams();//récupération de l'id et type

  let itemId = params.id;
  console.log(itemId);
  
  let itemType = params.type;
  console.log(itemType);
  

  let xhr = new XMLHttpRequest(); //xhr = XMLHttpRequest

  xhr.open("GET", "netflop.json", true);

  //Définir le gestionnaire d'évenement pour le chargement
  xhr.onload = function () {
    //vérifier si la requête réussi
    //status 200 = OK (succès)
    if (xhr.status === 200) {
      //Parser le JSON avec la méthode parse
        let data = JSON.parse(xhr.responseText);
        console.log(data); 
      //La méthode .parse parse le text json recu et le converti en objet JSON
      //xhr.responseText renvoit le contenu de l'objet JSON

      //Afficher les différentes catégories
      //chercher template par type (xmlDoc, itemId, itemType)
      
      let item = chercherItemPartype(data,itemId,itemType);
      console.log(`Affichage item ${item}`);
      
      
      afficherDetailItem(item);

      // afficherDetailItem(item, itemType);
      console.log(item);
      console.log(data);
    

    } else {

      console.error("erreur de chargement du JSON");
      console.error("status:", xhr.status);
      console.error("message:", xhr.statusText);
    }
  };
  //Envoyer la requête
   xhr.send();
}

chargerItemDetail();


//=====================================================================================================

function chercherItemPartype(data, itemId, itemType) {
  //Parcours la liste des items
 
    console.log(data.netflop);

  // Arriver au bon noeud pour boucler dessus
  // Remplacer l'itemType (exemple:film) par la catégorie() la tableau de correspondance
let categoryMap = {
  "film": { categorie: "films", tableau: "data.netflop.films.film" },
  "serie": { categorie: "séries", tableau: "data.netflop.series.serie" },
  "documentaire": { categorie: "documentaires", tableau: "data.netflop.documentaires.documentaire" },
  "manga": { categorie: "mangas", tableau: "data.netflop.mangas.manga" },
  "anime": { categorie: "animés", tableau: "data.netflop.animes.anime" },
  "show": { categorie: "shows", tableau: "data.netflop.shows.show" },
  "concert": { categorie: "concerts", tableau: "data.netflop.concerts.concert" }
};

 
  let config = categoryMap[itemType];
  if(!config) {
    return null;
  }
  if (config.tableau && Array.isArray(config.tableau)) {
    for(let i = 0; i < config.tableau.length;i++) {
      if (config.tableau[i].id === itemId) {
        return config.tableau[i];
      }

      }
    }
    console.log(config.tableau[i]);
    
  }


//=====================================================================================================

// Afficher le descriptif de l'itenm cliqué (films, séries, etc...)
function afficherDetailItem(item) {
 // créer le conteneur de la carte
    // créer une div pour la carte
    let card = document.createElement("div");
    card.className = "card"; // = card.setAttribute(className,"card");

    // extraire du JSON
console.log(item);

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

    let monMain = document.getElementById("tata");
    monMain.appendChild(card);

}
