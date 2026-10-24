var embedsToggle = document.getElementById('pref-embeds');

function saveChoice(analyticsAccepted, embedsAccepted) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        choice: (analyticsAccepted && embedsAccepted) ? 'accepted'
              : (!analyticsAccepted && !embedsAccepted) ? 'refused'
              : 'custom',
        analytics: analyticsAccepted,
        embeds: embedsAccepted,
        necessary: true,
        timestamp: Date.now()
    }));

    if (analyticsAccepted) loadAnalytics();

    feedback.classList.add('is-visible');
    setTimeout(function () { feedback.classList.remove('is-visible'); }, 3000);
}

saveBtn.addEventListener('click', function () {
    saveChoice(analyticsToggle.checked, embedsToggle.checked);
});
acceptAllBtn.addEventListener('click', function () {
    analyticsToggle.checked = true;
    embedsToggle.checked = true;
    saveChoice(true, true);
});
refuseAllBtn.addEventListener('click', function () {
    analyticsToggle.checked = false;
    embedsToggle.checked = false;
    saveChoice(false, false);
});

// Init : coche les deux toggles selon le choix mémorisé
var current = getCurrentChoice();
analyticsToggle.checked = !!current.analytics;
embedsToggle.checked = !!current.embeds;