document.addEventListener("DOMContentLoaded", () => {
    // 1. Gestion du bouton "masquer / afficher" global
    const toggleBtn = document.querySelector(".sidebar-toggle");
    const sidebarList = document.querySelector(".sidebar-list");

    if (toggleBtn && sidebarList) {
        toggleBtn.addEventListener("click", () => {
            const isHidden = sidebarList.style.display === "none";
            
            if (isHidden) {
                sidebarList.style.display = "block";
                toggleBtn.textContent = "masquer";
            } else {
                sidebarList.style.display = "none";
                toggleBtn.textContent = "afficher";
            }
        });
    }

    // 2. Gestion des flèches pour réduire/développer les catégories
    const parentItems = document.querySelectorAll(".sidebar-item.has-children");

    parentItems.forEach(item => {
        const link = item.querySelector(":scope > a"); // Le lien principal de la catégorie
        
        if (link) {
            // Optionnel : un clic sur le texte principal de la catégorie replie aussi, 
            // ou on peut cibler spécifiquement un espace. Ici on rend toute la ligne interactive ou on gère via un état.
            // On va ajouter un écouteur qui bascule la classe 'collapsed'
            item.addEventListener("click", (e) => {
                // Empêche de déclencher si on clique directement sur un sous-lien
                if (e.target.tagName === "A" && e.target !== link) return;
                
                // Si on clique sur le lien principal, on empêche le saut d'ancre pour laisser place au pliant, 
                // ou alors on gère le pliage au clic sur la flèche. Faisons un pliant propre :
                e.preventDefault();
                item.classList.toggle("collapsed");
            });
        }
    });
});