# KhiCAS

KhiCAS est un [CAS](https://en.wikipedia.org/wiki/Computer_algebra_system)
(Computer Algebra System) qui peut résoudre des équations et faire des calculs
avancés.

Il n'y a pas beaucoup de documentation à propos de KhiCAS, et ce n'est pas hyper
intuitif, mais ça reste un outil très puissant. Si vous voulez en apprendre plus
sur KhiCAS, vous pouvez lire un peu de [documentation](#documentation).

::: tip
Si vous voulez juste installer, allez à la section [installation](#installation)
:::

## Documentation

Comme KhiCAS est très puissant, vous devez savoir quelle commande utiliser dans
quel contexte.

Il y a différentes sources pour apprendre à utiliser KhiCAS :

- Une [documentation rapide ](https://github.com/Yaya-Cout/KhiCAS_guide/blob/626b9786ff19504152628cfa42447c87ab73f648/KhiCAS_guide.pdf)
  en français avec des illustrations, qui devrait être simple pour commencer à
  utiliser KhiCAS
- La [vidéo de Schraf](https://www.youtube.com/watch?v=wykeOAVYMFI) pour
  apprendre KhiCAS
- Le [site officiel](https://www-fourier.univ-grenoble-alpes.fr/~parisse/numworks/khicasnw.html)
  qui est très complet

Vous pouvez également chercher de la documentation pour
[Giac/Xcas](https://xcas.univ-grenoble-alpes.fr/), la version ordinateur de
KhiCAS.

Comme KhiCAS est disponible sur beaucoup de calculatrices, vous pouvez essayer
de suivre des tutoriels pour d'autres calculatrices.

## Limites

Cette version à quelques limites par rapport aux autres versions de KhiCAS pour
NumWorks (à cause des limites imposées par NumWorks) :

- **Pour accéder au menu, vous devez utiliser Shift + EXE au lieu de HOME**
- Le lanceur doit être réinstallé à chaque RESET/crash (commentez ici pour
  manifester contre cette limitation arbitraire :
  <https://github.com/numworks/epsilon/issues/2167>. Cette limite n'a aucune
  raison d'exister vu que d'autres calculatrices (plus chères) l'autorisent,
  parfois même nativement !)
- KhiCAS n'est pas autorisé en mode examen, même s'il est autorisé au bac en
  France. (je ne suis pas juriste, à titre informatif uniquement)

## Installation

À cause des limites imposées par NumWorks, KhiCAS doit être installé d'une
manière spéciale pour contourner ces limites.

Plus d'informations peuvent être trouvées [ici](https://xcas.univ-grenoble-alpes.fr/nw/nws.html)
(vous devez juste aller dans la section d'installation, au niveau de
`Installation Numworks N0110 verrouillée, N0115/N0120`).

## Ancienne version

L'ancienne version de KhiCAS peut être trouvée [ici](./legacy/khicas.md), mais
vous ne devrez pas l'utiliser sauf si vous en avez besoin pour une raison
spécifique.
