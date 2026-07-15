# <img src="https://biggbde.fr/assets/favicons/favicon-96x96.png" height="35" style="vertical-align: middle;"> BIGG BDE - Site Officiel 

Bienvenue sur le dépôt officiel du **BIGG BDE**, le Bureau des Étudiants de l'IUT Lyon 1 (Campus de Bourg-en-Bresse). 
Cette plateforme centralise la vie étudiante des départements **Bio, Info, GEA et MT2E**.

![Version](https://img.shields.io/badge/version-1.1.0-red)
![License](https://img.shields.io/badge/license-MIT-green)
![Deployment](https://img.shields.io/badge/deploy-GitHub_Actions-blue)


## 📌 Présentation
Ce site a pour vocation de :
- Présenter les membres du bureau (Trombinoscope).
- Diffuser l'agenda et la billetterie des évènements associatifs (soirées étudiantes, séjours d'intégration, activités ponctuelles).
- Recenser des avantages exclusifs via nos partenaires locaux et nationaux.
- Permettre de facilement retrouver les photos de nos évènements.
- Centraliser les liens utiles (HelloAsso, Discord, Instagram).
- Permettre de facilement contacter le bureau.

## 🛠 Technologies & Standardisation
- **Langages :** HTML5, CSS3 (Custom), Vanilla JavaScript.
- **SEO & Partage :** Intégration de balises Meta, Open Graph (Discord/Instagram), Twitter Cards et Schema.org.
- **Responsive Design :** Adaptabilité mobile/PC totale (incluant des éléments dynamiques au scroll).
- **Hébergement :** GitHub Pages.
- **Déploiement :** GitHub Actions (CI/CD automatique).
- **Domaine :** biggbde.fr (Configuré chez OVHcloud).

## 📂 Architecture du Projet
Le site est conçu de manière statique pour garantir performance et sécurité, avec une interface épurée et une navigation fluide. Le design s'appuie sur une structure harmonisée, intégrant un footer standardisé sur l'ensemble des pages.

- `/a-propos` : Lore de l'association, missions et documents officiels.
- `/bureau` : Trombinoscope du mandat actuel. (Possibilité de consulter les mandats précédents)
- `/contact` : Annuaire des mails et réseaux sociaux.
- `/documents` : Statuts, RI et autres fichiers téléchargeables.
- `/evenements` : Calendrier et pages dédiées pour chaque manifestation étudiante.
- `/images` : Assets graphiques (logos, photos du bureau/MA, favicons, partenaires).
- `/liens-utiles` : Hub de redirection.
- `/partenariats` : Liste des offres et codes promos.
- `index.html` : Page d'accueil.
- `style.css` : Feuille de style générique.

## 🚀 Maintenance & Mise à jour (pour les pious qui reprendront le site)
Pour ajouter un membre ou un nouvel évènement, il suffit de dupliquer les dossiers et blocs HTML commentés dans les fichiers respectifs. L'architecture modulaire permet de créer de nouvelles pages d'évènements en conservant facilement les standards SEO et graphiques du site. (On vous expliquera tqt)

### Déploiement automatique
Le site utilise **GitHub Actions**. Toute modification poussée (`git push`) sur la branche `main` déclenche automatiquement une mise à jour du site en ligne sous 30s à 2 minutes (selon la taille du push, typiquement si vous uploader des photos, ça prendra plus de temps).

## ⚖️ Licence
Ce projet est sous licence **MIT**. Vous êtes libre de copier et modifier ce code pour d'autres projets associatifs, tant que la mention de l'auteur original est conservée.

## ✉️ Contact
Pour toute question technique ou signalement de bug sur le site :
- **Webmaster :** [webmaster@biggbde.fr](mailto:webmaster@biggbde.fr?subject=Retour%20sur%20le%20site%20web%20du%20BIGG&body=Bonjour%20Antonin%2C%0A%0AJe%20pense%20que%20ton%20site%20est%20vraiment%20trop%20bien.)
- **Instagram :** [@bigg_bde](https://instagram.com/bigg_bde)
- **Site web :** [biggbde.fr](https://biggbde.fr)

---
*Fait avec ❤️ par le pôle développement du <img src="https://img.shields.io/badge/BIGG-BDE-gray?labelColor=red" style="vertical-align: middle;"> (càd Antonin TEP hihihi)* 
