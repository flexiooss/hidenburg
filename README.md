# Hidenburg

Composant select pour Hotballon

- `hbshed clean generate-sources install`
- `hbshed dev`

> Le LZ 129 Hindenburg, construit par la firme allemande Zeppelin,
 est le plus grand dirigeable commercial jamais réalisé
  et affecté sur une ligne régulière Europe-États-Unis
 https://fr.wikipedia.org/wiki/LZ_129_Hindenburg
 
  
Il est détruit par un incendie, le 6 mai 1937


# Utilisation :

Voir exemple hidenburg-explosion

## Actions :

3 actions disponible :

- actionSelect : chaque selection (click)
- actionSelected : élément sélectionné
- actionUnselected : élément désélectionné

# Configuration

On peut fournir un builder pour créer les items de la liste comme souhaité.

Néanmoins, il existe differents parametres, définit dans `src/component/ComponentSelectConfig.js` :
{multiple: false, search: false, autoUpdateItems: true, pagination: false, closeListNotMultiple: true}
> - nom du parametre {valeur par defaut} [valeur possible] : description
- multiple {false} [false/true/0-n] : liste de selection multiple ou unique, nombre d'items maximum
- search {false} [false/true] : champ de recherche
- autoUpdateItems {true} [false/true] : les elements sont
- autoCloseListNotMultiple {true} [false/true] : la liste se ferme automatiquement apres une séléction en cas de liste non multiple


# TODOs :

Liste des fonctionnalités à implementer :

- Champ de recherche
- Pagination

Liste des proprietés à implementer :
- attributs HTML
    - placeholder
- affichage en cas de séléction multiple (nb elements, les elements, ...)

