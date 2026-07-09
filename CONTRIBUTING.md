# Contribuer au site du BIGG BDE

Merci de l'intérêt que tu portes à notre projet ! Ce dépôt est sous **licence MIT**, ce qui signifie que tu es libre de contribuer, de copier et de modifier le code, tant que la mention de l'auteur original est conservée.

## 🚀 Pour commencer

1. **Fork** le dépôt (crée une copie sur ton propre compte GitHub).
2. **Clone** ton fork localement : `git clone https://github.com/TON-UTILISATEUR/nom-du-repo.git`
3. Crée une branche pour ta fonctionnalité : `git checkout -b feature/nom-de-ta-feature`
4. Suis les instructions du `README.md` pour comprendre l'architecture du projet.

## 💻 Flux de développement

### Avant de commencer
* Vérifie les *issues* (problèmes) et les *Pull Requests* (PR) existantes pour éviter de faire le travail en double.
* Pour des modifications majeures, ouvre d'abord une *issue* pour discuter de ta proposition avec l'équipe.

### Standards de Code
* **HTML/CSS/JS (Vanilla) :** Le site est statique. N'utilise pas de frameworks lourds (comme React ou Vue) à moins que cela n'ait été discuté au préalable.
* **Architecture :** Respecte la hiérarchie des dossiers (`/evenements`, `/bureau`, etc.).
* **Design :** Garde une cohérence visuelle avec la charte graphique existante (rouge et blanc). Assure-toi de toujours inclure le footer standardisé sur les nouvelles pages et évite d'ajouter des systèmes complexes (comme des tags) si l'interface a été épurée.
* **Responsive :** Toute nouvelle page ou fonctionnalité doit s'afficher correctement sur ordinateur et sur smartphone.

### Déploiement
Le projet utilise **GitHub Actions**. Tu n'as pas besoin de compiler ou de déployer quoi que ce soit manuellement. Une fois ta PR validée et fusionnée (merge) sur la branche `main`, le site `biggbde.fr` se mettra à jour automatiquement en quelques minutes.

## 📝 Règles de Commit

* Écris des messages de commit clairs et concis.
* Utilise le format conventionnel : `feat:` (nouvelle fonctionnalité), `fix:` (correction de bug), `docs:` (documentation), `refactor:` (optimisation du code).
* Fais référence aux issues liées : `fix: résolution du problème d'affichage #123`.

## 🔄 Processus de Pull Request (PR)

1. Mets à jour ta branche avec le dépôt principal : `git pull origin main`
2. Pousse tes modifications : `git push origin feature/nom-de-ta-feature`
3. Ouvre une PR en incluant :
   * Une description claire des changements.
   * La référence aux issues liées.
   * Des captures d'écran (s'il y a des changements visuels sur l'interface).

## ⚖️ Accord de Licence
En contribuant, tu acceptes que tes contributions soient sous la même **licence MIT** que le projet. Tu conserves les droits d'auteur de tes contributions, mais tu accordes aux mainteneurs du projet les droits spécifiés dans la licence.

## ❓ Des questions ?
* Ouvre une *issue* pour signaler un bug ou demander une fonctionnalité.
* Contacte-nous directement à **[webmaster@biggbde.fr](mailto:webmaster@biggbde.fr?subject=Contribution%20au%20site%20du%20BIGG)**.
