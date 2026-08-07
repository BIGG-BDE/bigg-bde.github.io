document.addEventListener("DOMContentLoaded", function() {
    // 1. GESTION DES FILTRES PAR MANDAT
    const filterBtns = document.querySelectorAll('.filter-btn');
    const mandateSections = document.querySelectorAll('.mandate-section');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filterValue = btn.getAttribute('data-filter');
            mandateSections.forEach(section => {
                if (filterValue === 'all' || section.getAttribute('data-mandat') === filterValue) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        });
    });

    // 2. GESTION DE L'ACCORDÉON DES MANDATS
    const mandateHeaders = document.querySelectorAll('.mandate-header');
    mandateHeaders.forEach(header => {
        header.addEventListener('click', () => {
            header.classList.toggle('active');
            const content = header.nextElementSibling;
            if (header.classList.contains('active')) {
                content.style.display = 'block';
            } else {
                content.style.display = 'none';
            }
        });
    });

    // 3. ÉVÉNEMENTS PASSÉS DÉPLIABLES (Automatique)
    const pastContents = document.querySelectorAll('.timeline.past .timeline-content, .timeline.past .has-pictures .timeline-content');
    pastContents.forEach(content => {
        const title = content.querySelector('h3');
        if (title && !content.hasAttribute('data-initialized')) {
            content.setAttribute('data-initialized', 'true');
            const hasPictures = content.closest('.has-pictures');
            if (!hasPictures) {
                content.classList.add('is-collapsed');
            }
            const bodyWrapper = document.createElement('div');
            bodyWrapper.className = 'past-event-body';
            const bodyInner = document.createElement('div');
            bodyInner.className = 'past-event-body-inner';
            while (title.nextSibling) {
                bodyInner.appendChild(title.nextSibling);
            }
            bodyWrapper.appendChild(bodyInner);
            title.parentNode.appendChild(bodyWrapper);
            title.classList.add('past-event-title');
            const arrow = document.createElement('span');
            arrow.className = 'toggle-arrow';
            arrow.innerHTML = '▼';
            title.appendChild(arrow);
            title.addEventListener('click', () => {
                content.classList.toggle('is-collapsed');
            });
        }
    });
});