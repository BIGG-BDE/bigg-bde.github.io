# <img src="https://biggbde.fr/assets/favicons/favicon-96x96.png" height="35" style="vertical-align: middle;"> BIGG BDE - Site Officiel 

Bienvenue sur le dépôt officiel du **BIGG BDE**, le Bureau des Étudiants de l'IUT Lyon 1 (Campus de Bourg-en-Bresse). 
Cette plateforme centralise la vie étudiante des départements **Bio, Info, GEA et MT2E**.

![Version](https://img.shields.io/badge/version-1.2.0-red)
![License](https://img.shields.io/badge/license-MIT-green)
![Deployment](https://img.shields.io/badge/deploy-GitHub_Actions-blue)


## 📌 Présentation
Ce site a pour vocation de :
- Présenter les membres du bureau (Trombinoscope).
- Diffuser l'agenda et la billetterie des événements associatifs (soirées étudiantes, séjours d'intégration, activités ponctuelles).
- Recenser des avantages exclusifs via nos partenaires locaux et nationaux.
- Permettre de facilement retrouver les photos de nos événements.
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
Le site du BIGG BDE est conçu de manière statique pour garantir performance et sécurité, offrant une base robuste parfaitement adaptée pour un hébergement fluide via GitHub Pages. L'interface épurée s'appuie sur une structure modulaire : chaque grande section du site est isolée dans son propre répertoire, contenant généralement son propre point d'entrée (index.html) et sa propre feuille de style (style.css), complétés parfois par un script dédié à ladite page (script.js).

- `/a-propos` : Lore de l'association et présentation des missions. Intègre le sous-dossier /documents pour les fichiers officiels téléchargeables (Statuts, RI).
- `/actualites` : Espace regroupant les annonces et articles du BDE, isolés dans des sous-dossiers dédiés (ex: `/le-nouveau-site`, `/nouveaux-emails`).
- `/assets` : Hub centralisé des ressources graphiques, triées de manière optimisée par format (`/favicons`, `/svg`, `/webp`).
- `/bureau` : Trombinoscope de l'équipe actuelle. Contient des dossiers spécifiques pour expliquer les objectifs et missions des différents `/roles-poles`, et archiver l'historique de l'asso (`/mandats-precedents`).
- `/contact` : Annuaire des réseaux sociaux et formulaires, incluant également des pages de documentation interne (ex: tutoriels pour la configuration des mails).
- `/evenements` : Calendrier et sous-pages dédiées à chaque manifestation étudiante (WEI, soirées, etc.).
- `/faq` : Foire aux questions pour aiguiller rapidement les étudiants.
- `/liens-utiles` : Hub de redirection rapide vers les plateformes importantes.
- `/maintenance` : Page d'attente à déployer lors des grosses mises à jour de l'infrastructure.
- `/mentions-legales` : Informations juridiques obligatoires et crédits du site.
- `/partenariats` : Vitrine des commerces partenaires, répertoriant les offres et avantages étudiants.
- `/photos` : Galerie et archives photographiques des événements passés.
- `.github` : Fichiers de configuration propres au dépôt (workflows, templates).

##### Fichiers à la racine :
- `index.html` : Point d'entrée et page d'accueil principale du site.
- `404.html` : Page d'erreur personnalisée pour rediriger les liens morts avec style.
- `CNAME` : Fichier de configuration assurant la liaison avec le nom de domaine personnalisé.
- `Fichiers collaboratifs` : CODE_OF_CONDUCT.md, CONTRIBUTING.md, SECURITY.md et LICENSE encadrant les règles de contribution au projet.
- `favicon.ico` : Icône globale du site pour les onglets des navigateurs.
- `script.js` : Script global du site (gestion du menu de navigation et des interactions).
- `style.css` : Feuille de style globale du site.
- `robots.txt` : Instructions pour les robots d'indexation des moteurs de recherche.
- `sitemap.xml` : Plan du site optimisé pour le référencement (SEO).


## 🚀 Maintenance & Mise à jour (pour les pious qui reprendront le site)
Pour ajouter un membre ou un nouvel événement, il suffit de dupliquer les dossiers et blocs HTML commentés dans les fichiers respectifs. L'architecture modulaire permet de créer de nouvelles pages d'événements en conservant facilement les standards SEO et graphiques du site. (On vous expliquera tqt)

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
