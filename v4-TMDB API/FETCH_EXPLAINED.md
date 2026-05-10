# 📚 Explication détaillée de FETCH API

## 🎯 Qu'est-ce que fetch() ?

`fetch()` est une fonction JavaScript moderne pour faire des requêtes HTTP (appeler des APIs, charger des données depuis un serveur).

---

## 🔄 Les 3 étapes de fetch()

```javascript
// ÉTAPE 1 : Lancer la requête HTTP
const response = await fetch(url);

// ÉTAPE 2 : Vérifier le code HTTP (200, 404, 500...)
if (!response.ok) {
  throw new Error("Erreur: " + response.status);
}

// ÉTAPE 3 : Convertir la réponse JSON en objet JavaScript
const data = await response.json();
```

---

## 📖 Explication détaillée

### ÉTAPE 1 : Lancer la requête

```javascript
const response = await fetch(url);
```

**Ce qui se passe :**

1. `fetch(url)` envoie une requête HTTP GET vers l'URL
2. Le navigateur contacte le serveur TMDB
3. `await` = **ATTENDRE** que le serveur réponde (asynchrone)
4. Résultat : objet `Response` avec les infos de la réponse HTTP

**Sans await :**

```javascript
// ❌ Ne marche pas : response serait une Promise, pas les données
const response = fetch(url); // Retourne une Promise non résolue
```

**Avec await :**

```javascript
// ✅ Marche : on attend la fin de la requête
const response = await fetch(url); // Retourne l'objet Response
```

---

### ÉTAPE 2 : Vérifier le statut HTTP

```javascript
if (!response.ok) {
  throw new Error("Erreur: " + response.status);
}
```

**Codes HTTP :**

- `200` = OK (succès)
- `404` = Not Found (page/ressource introuvable)
- `500` = Server Error (erreur côté serveur)
- `401` = Unauthorized (clé API invalide)

**response.ok :**

- `true` si code 200-299 (succès)
- `false` si code 400-599 (erreur)

**Pourquoi vérifier ?**
Même si la requête "fonctionne" (pas d'erreur réseau), le serveur peut retourner une erreur (404, 500...). Il faut vérifier !

---

### ÉTAPE 3 : Convertir JSON → JavaScript

```javascript
const data = await response.json();
```

**Ce qui se passe :**

1. Le serveur envoie les données au format **JSON** (texte)

   ```json
   { "title": "Fight Club", "vote_average": 8.4 }
   ```

2. `response.json()` les convertit en **objet JavaScript**

   ```javascript
   {title: "Fight Club", vote_average: 8.4}
   ```

3. `await` = attendre la conversion (c'est aussi asynchrone)

4. On peut maintenant utiliser les données :
   ```javascript
   console.log(data.title); // "Fight Club"
   ```

---

## 🔍 Exemple complet avec commentaires

```javascript
async function chargerFilm(filmId) {
  try {
    // 1️⃣ Construire l'URL
    const url = `https://api.themoviedb.org/3/movie/${filmId}?api_key=XXX`;

    // 2️⃣ ÉTAPE 1 : Lancer la requête HTTP
    // fetch() envoie la requête au serveur TMDB
    // await = attendre la réponse (peut prendre 100ms-2s)
    const response = await fetch(url);

    // 3️⃣ ÉTAPE 2 : Vérifier le code HTTP
    // response.ok = true si code 200-299
    // Si erreur (404, 500...), on lance une exception
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    // 4️⃣ ÉTAPE 3 : Convertir JSON → objet JavaScript
    // response.json() lit le corps de la réponse
    // et le parse en objet JavaScript
    const data = await response.json();

    // 5️⃣ Utiliser les données
    console.log(data.title); // Titre du film
    console.log(data.vote_average); // Note moyenne
  } catch (error) {
    // 6️⃣ Gérer les erreurs
    // Capture :
    // - Erreurs réseau (pas d'internet)
    // - Erreurs HTTP (throw dans le if)
    // - Erreurs de parsing JSON
    console.error("Erreur:", error);
  }
}
```

---

## ⚡ async/await : pourquoi c'est nécessaire ?

### ❌ Sans async/await (callbacks) - Ancien style

```javascript
// Code illisible, difficile à maintenir
fetch(url)
  .then((response) => {
    if (!response.ok) throw new Error("Erreur");
    return response.json();
  })
  .then((data) => {
    console.log(data);
    // Faire autre chose...
    return fetch(autreUrl);
  })
  .then((response) => response.json())
  .then((autreData) => {
    console.log(autreData);
  })
  .catch((error) => {
    console.error(error);
  });
```

### ✅ Avec async/await - Style moderne

```javascript
// Code clair, lisible, facile à maintenir
async function chargerDonnees() {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Erreur");
    const data = await response.json();
    console.log(data);

    // Faire autre chose...
    const autreResponse = await fetch(autreUrl);
    const autreData = await autreResponse.json();
    console.log(autreData);
  } catch (error) {
    console.error(error);
  }
}
```

---

## 🔄 Requêtes multiples : séquentielles vs parallèles

### Séquentielles (une après l'autre)

```javascript
// ⏱️ Temps total : 2s + 2s = 4 secondes
const films = await fetch(urlFilms); // Attend 2s
const series = await fetch(urlSeries); // Attend 2s
```

### Parallèles (en même temps)

```javascript
// ⚡ Temps total : max(2s, 2s) = 2 secondes
const [films, series] = await Promise.all([
  fetch(urlFilms), // Lance les 2 requêtes
  fetch(urlSeries), // en même temps
]);
```

**Dans netflop-tmdb.js, on utilise Promise.all() :**

```javascript
// Charger films, séries, docs, animes EN MÊME TEMPS
await Promise.all([
  afficherFilmsPopulaires(),
  afficherSeriesPopulaires(),
  afficherDocumentaires(),
  afficherAnimes(),
]);
```

---

## 🛠️ Gestion des erreurs avec try/catch

```javascript
try {
  // Code qui peut générer une erreur
  const response = await fetch(url);
  if (!response.ok) throw new Error("HTTP " + response.status);
  const data = await response.json();
} catch (error) {
  // Si UNE erreur se produit dans try,
  // le code "saute" directement ici
  console.error("Erreur capturée:", error);
  alert("Impossible de charger les données");
}
```

**Types d'erreurs capturées :**

- ❌ Pas de connexion internet → `TypeError: Failed to fetch`
- ❌ Code HTTP 404/500 → `Error: HTTP 404`
- ❌ JSON invalide → `SyntaxError: Unexpected token`
- ❌ `throw new Error()` → Erreur personnalisée

---

## 📊 Récapitulatif visuel

```
┌──────────────────────────────────────────────────────────┐
│  1️⃣  FETCH                                               │
│  const response = await fetch(url);                      │
│                                                           │
│  JavaScript → Serveur TMDB                               │
│  Envoie: GET /movie/550?api_key=XXX                     │
│  Attend: réponse du serveur (100ms-2s)                   │
│  Reçoit: objet Response avec status, headers, body       │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│  2️⃣  VÉRIFICATION                                        │
│  if (!response.ok) throw new Error('Erreur');            │
│                                                           │
│  Vérifie le code HTTP :                                  │
│  ✅ 200-299 = Succès                                     │
│  ❌ 400-599 = Erreur                                     │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│  3️⃣  PARSING JSON                                        │
│  const data = await response.json();                     │
│                                                           │
│  Convertit le JSON (texte) en objet JavaScript           │
│  Texte: '{"title":"Fight Club"}'                         │
│  Objet: {title: "Fight Club"}                            │
└──────────────────────────────────────────────────────────┘
                        ↓
┌──────────────────────────────────────────────────────────┐
│  4️⃣  UTILISATION                                         │
│  console.log(data.title);                                │
│  afficherFilm(data);                                     │
│                                                           │
│  On peut maintenant accéder aux propriétés :             │
│  data.title, data.vote_average, data.poster_path...     │
└──────────────────────────────────────────────────────────┘
```

---

## 💡 Points clés à retenir

✅ **fetch()** = fonction moderne pour faire des requêtes HTTP  
✅ **await** = attendre la fin d'une opération asynchrone  
✅ **async** = marquer une fonction comme asynchrone  
✅ **response.ok** = vérifier si la requête a réussi (200-299)  
✅ **response.json()** = convertir JSON en objet JavaScript  
✅ **try/catch** = capturer et gérer les erreurs  
✅ **Promise.all()** = exécuter plusieurs requêtes en parallèle

---

## 🔗 Ressources

- MDN fetch : https://developer.mozilla.org/fr/docs/Web/API/Fetch_API
- MDN async/await : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/async_function
- API TMDB : https://developers.themoviedb.org/3
