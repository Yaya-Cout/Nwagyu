# Backup

Cette application vous permet de transférer le stockage de votre calculatrice
en utilisant des QR Codes, sans utiliser aucun câble, par exemple pour
sauvegarder rapidement votre stockage depuis un téléphone.

## Comment utiliser l'application

En ouvrant l'application, vous devez choisir entre 4 modes. Les trois premiers
sont les modes de transfert, trié du plus rapide au plus lent. Le quatrième est
un raccourci pour ouvrir le site de scan sur un téléphone.

Sélectionnez un mode de transfert dans le menu (en utilisant les flèches et
OK/EXE, ou en utilisant les touches de chiffres), puis scannez les QR Codes en
utilisant
[Upsilon Workshop](https://yaya-cout.github.io/Upsilon-Workshop/calculator?qr=1).

Une fois le transfert terminé, le site devrait commencer à télécharger un
fichier zip contenant une sauvegarde de tous les fichiers de la calculatrice,
avec les scripts Python et les fichiers binaires comme les sauvegardes
d'émulateurs.

Pour restaurer cette sauvegarde, vous pouvez utiliser le bouton "+" sur la page
"calculatrice" de Upsilon Workshop après avoir connecté votre calculatrice en
USB. Vous pouvez aussi utiliser [NumWorks Connector] pour envoyer le fichier
zip.

::: note
Upsilon Workshop ne supporte pas pour le moment la restauration de fichiers
binaires (sauvegardes d'émulateurs). Si vous devez les restaurer, utilisez
[NumWorks Connector]. La sauvegarde de fichiers binaires par Upsilon Workshop
via les QR Codes fonctionne (seul la restauration n'est pas implémentée).
:::

::: tip
Vous n'avez jamais besoin de compte pour utiliser cette application. Upsilon
Workshop ne nécessite un compte que pour éditer et créer des projets en ligne.
:::

## Téléchargement

Vous pouvez télécharger l'application Backup depuis ce lien :

- [Backup v1.0.0](https://yaya-cout.github.io/Nwagyu/assets/apps/backup-1.0.0.nwa)

## Installation

Pour installer l'application Backup, suivez les instructions dans le guide
[comment installer](../help/how-to-install.md).

## Source code

Le code source de Backup est disponible
[ici](https://codeberg.org/Yaya-Cout/Backup).

[NumWorks Connector]: https://yaya-cout.github.io/Numworks-connector/#/
