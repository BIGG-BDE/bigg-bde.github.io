// après load total du html
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. Gestion du scroll
    let scrollBtn = document.getElementById("scrollTopBtn");
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollBtn.style.display = "none";
        // Min. 600px de scroll pour afficher le bouton
        if (scrollTop > 600) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }

        // Affichage dynamique du header selon scroll haut/bas 
        // ca evite de devoir remonter tout en haut d'une page pour le header (notamment en responsive)
        const isMenuOpen = nav && nav.classList.contains('nav-open');
        
        if (isMenuOpen) {
            if(header) header.classList.remove('header-hidden');
            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            return; 
        }

        if (scrollTop > 80) {
            if (scrollTop > lastScrollTop) {
                if(header) header.classList.add('header-hidden');
            } else {
                if(header) header.classList.remove('header-hidden');
            }
        } else {
            if(header) header.classList.remove('header-hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; 
    })
    
    
    // 3. Fermer les dropdowns si on clique à l'extérieur
    document.addEventListener('click', function(e) {
        // On vérifie si l'élément cliqué (ou un de ses parents) possède la classe .has-dropdown
        const isClickInsideDropdown = e.target.closest('.nav-item.has-dropdown');
        
        // Si le clic est en dehors des sous-menus
        if (!isClickInsideDropdown) {
            // On cherche tous les sous-menus ouverts et on les ferme
            const openDropdowns = document.querySelectorAll('.mobile-dropdown-open');
            openDropdowns.forEach(dropdown => {
                dropdown.classList.remove('mobile-dropdown-open');
            });
        }
    });;

    // 2. Gestion des dropdowns sur mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            // On vérifie si on est en affichage mobile
            const isMobile = window.innerWidth <= 1155; 
            
            if (isMobile) {
                const parent = this.parentElement;
                
                // Si le sous-menu n'est PAS encore ouvert
                if (!parent.classList.contains('mobile-dropdown-open')) {
                    e.preventDefault(); // On bloque la redirection vers le lien
                    
                    // (Optionnel) Fermer les autres sous-menus ouverts
                    document.querySelectorAll('.nav-item.has-dropdown').forEach(item => {
                        if (item !== parent) item.classList.remove('mobile-dropdown-open');
                    });

                    // On ouvre ce sous-menu
                    parent.classList.add('mobile-dropdown-open');
                }
                // SI il est DÉJÀ ouvert, on ne fait rien (pas de preventDefault). 
                // Le navigateur suivra donc le lien 'href' normalement.
            }
        });
    });
});

// Fonction déclenchée par le clic sur le bouton html
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
    const nav = document.querySelector('nav');
    
    // Ouvre ou ferme le menu principal
    nav.classList.toggle('nav-open');
    
    // Referme automatiquement tous les sous-menus ouverts
    const openDropdowns = nav.querySelectorAll('.mobile-dropdown-open');
    openDropdowns.forEach(dropdown => {
        dropdown.classList.remove('mobile-dropdown-open');
    });
}