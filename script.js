// --- script.js ---
document.addEventListener("DOMContentLoaded", function() {
    
    // 1. GESTION DU SCROLL (Bouton remonter & Header)
    let scrollBtn = document.getElementById("scrollTopBtn");
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    window.addEventListener("scroll", function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        scrollBtn.style.display = "none";
        // Le bouton s'affiche après 600px de défilement (plus bas qu'avant)
        if (scrollTop > 600) {
            scrollBtn.style.display = "flex";
        } else {
            scrollBtn.style.display = "none";
        }

        // Cacher/Montrer le header au scroll
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