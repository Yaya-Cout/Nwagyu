# Agrandissez votre mémoire !

Normalement, la calculatrice NumWorks ne vous laisse qu'environ 2,5 Mo pour
installer des applications. Mais grâce à Nwagra, vous serez capable d'utiliser
jusqu'à 6 Mo !

::: warning
Nwagra ne fonctionne pas sur des versions récentes d'Epsilon. Si votre
calculatrice commence à vous dire que le mode examen est activé après avoir
installé des applications externes, Nwagra est probablement incompatible avec
votre version.

Comme Nwagra n'est plus nécessaire pour KhiCAS, cette fonctionnalité est moins
utile qu'avant.
:::

## Configuration de Nwagra

1. Glissez ce lien dans votre barre personnelle :
   <!-- TODO: Try to see if we can use a markdown link here -->
   <a href="javascript:(function()%7B!function()%7Blet%20t%3Ddocument.createElement(%22script%22)%3Bt.type%3D%22text%2Fjavascript%22%2Ct.src%3D%22https%3A%2F%2Fyaya-cout.github.io%2FNwagyu%2Fnwagra.min.js%22%2Cdocument.head.appendChild(t)%7D()%3B%7D)()%3B">Nwagra</a>
2. Allez sur le [site de NumWorks](https://my.numworks.com/devices/upgrade) et
   mettez à jour votre calculatrice
   calculator
3. Mettez à jour votre calculatrice encore une fois. Oui, vous devez la mettre à jour *deux fois*

## Utilisation de Nwagra

1. Allez sur l'[installateur d'applications de NumWorks](https://my.numworks.com/apps)
2. Cliquez sur le marque page “Nwagra”. Le titre de la page devrait désormais
   afficher « Enlarged Extra Apps ».
3. Vous êtes prêts, vous pouvez utiliser plus d'espace pour installer des applications NWA !

## Et si ça ne marche pas ?

Si ça ne marche pas, assurez-vous que :

- Vous utilisez Google Chrome ou un autre navigateur basé sur Chromium avec le
  support du WebUSB
- Vous avez mis à jour votre calculatrice deux fois
- Vous avez débranché votre calculatrice avant d'aller sur l'installateur
  d'applications de NumWorks et de cliquer sur le marque page Nwagra

## À propos de Nwagra

### Comment ça marche ?

La calculatrice NumWorks garde deux copies de son système d'exploitation.
Pourquoi ?

Pour mettre la procédure de mise à jour plus fiable. Quand vous mettez à jour
votre calculatrice, vous ne remplacez pas le système d'exploitation de votre
calculatrice : à la place, vous ajoutez un nouveau système d'exploitation à côté
de celui actuel. De cette manière, si vous cassez la procédure de mise à jour,
l'ancien système d'exploitation est toujours présent et votre calculatrice, même
si non mise à jour, fonctionne toujours correctement.

Cela signifie donc que la majorité du temps, plus de la moitié de la mémoire de
la calculatrice est gaspillée avec une copie inutile du système d'exploitation.
Nwagra vous permet de remplacer cette deuxième copie avec des applications

### Cela va-t-il endommager ma calculatrice ?

Normalement, ça ne devrait avoir aucun impact. Si pour une raison votre système
d'exploitation devient corrompu, vous aurez à réinstaller le système
d'exploitation de votre calculatrice

### Comment fonctionne le marque-page ?

Le système d'exploitation de la NumWorks contient un marqueur spécial qui dit
quelle partie de la mémoire flash peut être utilisée pour installer des
applications externes. L'installateur d'applications de NumWorks lit ce marqueur
via l'USB pour savoir où installer les applications. Ce marque-page remplace
simplement les appels au WebUSB que l'installateur d'applications de NumWorks
fait et signale davantage d'espace utilisable

### Est-ce une blague ?

Non, ce n'est pas une blague. Ça fonctionne vraiment. Ça supprime juste les
limitations du site de NumWorks
