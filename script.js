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
    });

});

// Fonction déclenchée par le clic sur le bouton html
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleMenu() {
    document.querySelector('nav').classList.toggle('nav-open');
}