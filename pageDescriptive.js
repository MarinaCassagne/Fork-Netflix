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
  

  let xhr = new XMLHttpRequest();

  xhr.open("GET", "netflop.xml", true);

  //Définir le gestionnaire d'évenement pour le chargement
  xhr.onload = function () {
    //vérifier si la requête réussi
    //status 200 = OK (succès)
    if (xhr.status === 200) {
      //Parser le XML avec DOMPARSER
      //on crée une instance de DOMParser
      let parser = new DOMParser();
      //console.log(parser);
      //Parse le text xml recu et convertir en Document XML
      //xhr.responseText = le contenu du fichier XML en texte
      //"text/xml" = typeMIME pour indiquer que c'est du XML
      let xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");

      //Afficher les différentes catégories
      //chercher template par type (xmlDoc, itemId, itemType)
      
      let item = chercherItemPartype(xmlDoc,itemId,itemType);
      afficherDetailItem(item,itemType);

      // afficherDetailItem(item, itemType);
      console.log(item);
      console.log(xmlDoc);
    

    } else {

      console.error("erreur lors du chargement du fichier XML");
      console.error("status:", xhr.status);
      console.error("message:", xhr.statusText);
    }
  };
   xhr.send();
}

chargerItemDetail();


//=====================================================================================================

function chercherItemPartype(xmlDoc, itemId, itemType) {
  //on va rechercher l'élément dans notre xml par son type (films, séries, etc...)
  let items = xmlDoc.getElementsByTagName(itemType);
  //Parcours la liste des items
  for (i = 0; i < items.length; i++) {
    let item = items[i];
    console.log(item);
    
    //on vérifie si l'item a un attribut id
    if (item.hasAttribute("id") && item.getAttribute("id") === itemId) {
      return item;
    } 
    // else {
    //   return null;
    // }
  }
}

//=====================================================================================================

// Afficher le descriptif de l'itenm cliqué (films, séries, etc...)
function afficherDetailItem(item, itemType) {
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

    let monMain = document.getElementById("tata");
    monMain.appendChild(card);

}
