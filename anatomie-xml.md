## eXtensible Markup Language(XML)
**xml** est un langage de balisage utilisé pour stocker et partager des donnés de manière structurer

# structure de base

# entete
<?xml version="1.0" encoding="UTF-8"?>
    <racine>
        <element>contenu</element>
    </racine>

# balise auto-fermante

<image src="tata.png">

### des conunentaires
    <!-- ceci est un commentaire -->

### important
    une seule racine
    balises bien fermée
    respecter les imbrications

sensible à la casse
    <Titre>baba</Titre>
    <titre>baba</titre>

Noms valides (pas d'espace dans les noms et pas de chiffres en début)
    <titre-film><titre-film>

## version simple d'un xml
<?xml version="1.0" encoding="UTF-8"?>
<film>
    <titre>tata</titre>
    <annee>5321</annee>
    <genre>sci-fi</genre>
    <realisateur>moi</realisateur>
</film>


## version attribut
<?xml version="1.0" encoding="UTF-8"?>
<film id="1" langue="ja">
    <titre>tata</titre>
    <annee>5321</annee>
    <genre type="principal">sci-fi</genre>
    <genre type="secondaire">horreur</genre>
    <realisateur nationalité="fr">moi</realisateur>
    <resume>

        <![CDATA[
            Kevin a déjà tuer !
        ]]>
    </resume>
</film>

## CDATA permet d' inclure du texte qui pourrait contenir des caractères spéciaux
💡Faire des CDATA quand bloc de texte

## les namespaces : a éviter les conflits de noms
<?xml version="1.0" encoding="UTF-8"?>
<catalogue xmlns:film="http://mabibli.fr/films"
           xmlns:livre="http://mabibli.fr/films"

<film:item id="1" langue="ja">
<film:titre>tata</film:titre>
