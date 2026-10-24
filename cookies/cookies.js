(function () {
    var BANNER_ID   = 'cookie-banner';
    var STORAGE_KEY = 'cookie_consent_choice';
    var EXPIRY_DAYS = 180;
    var GA_ID       = 'G-84NVSBQ842';

    function loadAnalytics() {
        if (window._gaLoaded) return;
        window._gaLoaded = true;
        var s = document.createElement('script');
        s.async = true;
        s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
        document.head.appendChild(s);
        window.dataLayer = window.dataLayer || [];
        function gtag(){ dataLayer.push(arguments); }
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', GA_ID);
    }

    function saveChoice(choice) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            choice: choice,
            timestamp: Date.now()
        }));
        var b = document.getElementById(BANNER_ID);
        if (b) b.style.display = 'none';
    }

    if (new URLSearchParams(location.search).has('resetcookies')) {
        localStorage.removeItem('cookie_consent_choice');
        history.replaceState({}, '', location.pathname);
    }
    
    function init() {
        var banner = document.getElementById(BANNER_ID);
        if (!banner) return;

        // Choix déjà enregistré et encore valide ?
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                var data = JSON.parse(raw);
                var ageDays = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);
                if (ageDays < EXPIRY_DAYS) {
                    if (data.choice === 'accepted') loadAnalytics();
                    banner.style.display = 'none';
                    return;
                }
            } catch (e) { /* ignore */ }
        }

        // Pas de choix valide : on affiche et on écoute
        document.getElementById('cookie-accept').addEventListener('click', function () {
            saveChoice('accepted');
            loadAnalytics();
        });
        document.getElementById('cookie-refuse').addEventListener('click', function () {
            saveChoice('refused');
        });
    }

    // Lien "Gérer mes cookies" dans le footer
    document.addEventListener('click', function (e) {
        var t = e.target.closest('#manage-cookies');
        if (t) {
            e.preventDefault();
            localStorage.removeItem(STORAGE_KEY);
            location.reload();
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
