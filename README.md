# 🐔 BIGG BDE - Site Officiel (biggbde.fr)

Bienvenue sur le dépôt officiel du **BIGG BDE**, le Bureau des Étudiants de l'IUT Lyon 1 (Campus de Bourg-en-Bresse). 
Cette plateforme centralise la vie étudiante des départements **Bio, Info, GEA et MT2E**.

![Version](https://img.shields.io/badge/version-1.0.0-red)
![License](https://img.shields.io/badge/license-MIT-green)
![Deployment](https://img.shields.io/badge/deploy-GitHub_Actions-blue)

## 📌 Présentation
Le BIGG BDE anime le campus burgien depuis **35 ans**. Ce site a pour vocation de :
- Présenter les membres du bureau (Trombinoscope).
- Diffuser l'agenda des événements (WEI, Loto, etc.).
- Proposer des avantages exclusifs via nos partenaires.
- Centraliser les liens utiles (HelloAsso, Discord, Instagram).

## 🛠 Technologies
- **Langages :** HTML5, CSS3 (Custom), Vanilla JavaScript.
- **Hébergement :** GitHub Pages.
- **Déploiement :** GitHub Actions (CI/CD automatique).
- **Domaine :** biggbde.fr (Configuré chez OVHcloud).

## 📂 Architecture du Projet
Le site est conçu de manière statique pour garantir performance et sécurité.
- `/a-propos` : Lore de l'association, missions et documents officiels.
- `/bureau` : Trombinoscope du mandat actuel.
- `/contact` : Annuaire des mails et réseaux sociaux.
- `/documents` : Statuts, RI et autres fichiers téléchargeables.
- `/evenements` : Timeline chronologique des projets.
- `/images` : Assets graphiques (logos, photos du bureau, partenaires).
- `/liens-utiles` : Hub de redirection.
- `/partenariats` : Liste des offres et codes promos.
- `index.html` : Page d'accueil.
- `style.css` : Feuille de style globale (Charte rouge/blanc).

## 🚀 Maintenance & Mise à jour
Pour ajouter un membre ou un événement, il suffit de dupliquer les blocs HTML commentés dans les fichiers `index.html` respectifs.

### Déploiement automatique
Le site utilise **GitHub Actions**. Toute modification poussée (`git push`) sur la branche `main` déclenche automatiquement une mise à jour du site en ligne sous 2 à 3 minutes.

## ⚖️ Licence
Ce projet est sous licence **MIT**. Vous êtes libre de copier et modifier ce code pour d'autres projets associatifs, tant que la mention de l'auteur original est conservée.

## ✉️ Contact
Pour toute question technique ou signalement de bug sur le site :
- **Webmaster :** [webmaster@biggbde.fr](mailto:webmaster@biggbde.fr)
- **Instagram :** [@bigg_bde](https://instagram.com/bigg_bde)
- **Site web :** [biggbde.fr](https://biggbde.fr)

---
*Fait avec ❤️ par le pôle développement du BIGG BDE (càd Antonin TEP hihihi)*
