/* ==========================================================================
   ADMINISTRATION DASHBOARD - BIGG BDE
   Fichier : /admin/script.js
   ========================================================================== */

// 1. CONFIGURATION SUPABASE (Remplace par tes vrais identifiants Supabase)
const SUPABASE_URL = 'https://qchyaljicwhdeouajlbx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjaHlhbGppY3doZGVvdWFqbGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NTMwNTQsImV4cCI6MjEwMTQyOTA1NH0.i1NcSHYwj_gmP6MyjQexZJieV1lWTyYVxVsM5DlmRmY';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Variables de session
let currentUser = null;
let currentProfile = null;

// ==========================================================================
// INITIALISATION & AUTHENTIFICATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initContainerStructure();
    initAuthListener();
    setupFormListeners();
    setupAutoSlugListeners();
});

// Injection dynamique du conteneur de toast et du bloc de login si non présents
function initContainerStructure() {
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

// Écoute de l'état d'authentification Supabase
function initAuthListener() {
    supabase.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
            currentUser = session.user;
            await loadUserProfile(session.user.id);
            renderAuthenticatedUI();
        } else {
            currentUser = null;
            currentProfile = null;
            renderLoginUI();
        }
    });
}

// Charger le profil utilisateur depuis la table "profils"
async function loadUserProfile(userId) {
    try {
        const { data, error } = await supabase
            .from('profils')
            .select('*')
            .eq('id', userId)
            .single();

        if (error) throw error;
        currentProfile = data;
    } catch (err) {
        console.error("Erreur lors du chargement du profil :", err.message);
        showToast("Impossible de charger votre profil utilisateur.", "error");
    }
}

// ==========================================================================
// RENDU DYNAMIQUE DE L'INTERFACE (RBAC)
// ==========================================================================
function renderLoginUI() {
    const mainContainer = document.querySelector('main.admin-dashboard');
    if (!mainContainer) return;

    mainContainer.innerHTML = `
        <div class="login-wrapper">
            <div class="login-card">
                <h2>Connexion Admin</h2>
                <p>Accédez à l'espace de gestion du BIGG BDE</p>
                <form id="form-login" class="admin-form">
                    <div class="form-group">
                        <label for="login-email">Adresse Email</label>
                        <input type="email" id="login-email" placeholder="ex: webmaster@biggbde.fr" required>
                    </div>
                    <div class="form-group">
                        <label for="login-password">Mot de passe</label>
                        <input type="password" id="login-password" placeholder="••••••••" required>
                    </div>
                    <button type="submit" class="btn-submit">Se connecter</button>
                </form>
            </div>
        </div>
    `;

    document.getElementById('form-login').addEventListener('submit', handleLogin);
}

function renderAuthenticatedUI() {
    const mainContainer = document.querySelector('main.admin-dashboard');
    if (!mainContainer) return;

    // Si la structure authentifiée existe déjà, on met à jour les données
    if (document.getElementById('user-bar')) {
        updateUserBarUI();
        applyRoleRestrictions();
        return;
    }

    // Sinon on recharge la page pour re-masser le HTML initial avec la session active
    location.reload();
}

// Application du contrôle d'accès basé sur les rôles (RBAC)
function applyRoleRestrictions() {
    if (!currentProfile) return;

    const userRole = currentProfile.role;
    
    // Mapping Rôle -> ID des sections autorisées
    const rolePermissions = {
        'admin': ['gestion-evenements', 'gestion-actus', 'gestion-billeterie', 'gestion-partenariats', 'gestion-profil'],
        'evenementiel': ['gestion-evenements', 'gestion-profil'],
        'communication': ['gestion-actus', 'gestion-profil'],
        'tresorerie': ['gestion-billeterie', 'gestion-profil'],
        'partenariats': ['gestion-partenariats', 'gestion-profil']
    };

    const allowedSections = rolePermissions[userRole] || ['gestion-profil'];
    const allSections = document.querySelectorAll('.admin-section');

    allSections.forEach(section => {
        if (allowedSections.includes(section.id)) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });

    // Remplir le formulaire de profil
    const nomInput = document.getElementById('prof-nom');
    const prenomInput = document.getElementById('prof-prenom');
    const emailInput = document.getElementById('prof-email');
    const roleInput = document.getElementById('prof-role');

    if (nomInput) nomInput.value = currentProfile.nom || '';
    if (prenomInput) prenomInput.value = currentProfile.prenom || '';
    if (emailInput) emailInput.value = currentProfile.email || '';
    if (roleInput) roleInput.value = currentProfile.role || '';
}

function updateUserBarUI() {
    if (!currentProfile) return;

    const nameElem = document.getElementById('user-display-name');
    const emailElem = document.getElementById('user-display-email');
    const roleElem = document.getElementById('user-display-role');
    const avatarElem = document.getElementById('user-avatar-initial');

    if (nameElem) nameElem.textContent = `${currentProfile.prenom || ''} ${currentProfile.nom || ''}`.trim() || 'Utilisateur';
    if (emailElem) emailElem.textContent = currentProfile.email;
    if (roleElem) {
        roleElem.textContent = currentProfile.role;
        roleElem.className = `role-badge role-${currentProfile.role}`;
    }
    if (avatarElem) {
        const initial = (currentProfile.prenom || currentProfile.nom || currentProfile.email || 'U').charAt(0).toUpperCase();
        avatarElem.textContent = initial;
    }
}

// Handlers Authentification
async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        showToast("Connexion réussie !", "success");
    } catch (err) {
        showToast("Identifiants incorrects ou erreur de connexion.", "error");
    }
}

async function handleLogout() {
    try {
        await supabase.auth.signOut();
        showToast("Vous avez été déconnecté.", "success");
        renderLoginUI();
    } catch (err) {
        showToast("Erreur lors de la déconnexion.", "error");
    }
}

// ==========================================================================
// FORMULAIRES DE GESTION DU CONTENU
// ==========================================================================
function setupFormListeners() {
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    // 1. Événements
    const formEvent = document.getElementById('form-evenement');
    if (formEvent) {
        formEvent.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formEvent);
            
            const payload = {
                titre: formData.get('titre'),
                date_event: formData.get('date_event'),
                heure_debut: formData.get('heure_debut') || null,
                heure_fin: formData.get('heure_fin') || null,
                lieu: formData.get('lieu') || null,
                description: formData.get('description'),
                image_url: formData.get('image_url') || null,
                organisateurs: parseCommaList(formData.get('organisateurs')),
                photographes: parseCommaList(formData.get('photographes')),
                a_venir: formData.get('a_venir') === 'on',
                est_publie: formData.get('est_publie') === 'on'
            };

            await insertData('evenements', payload, formEvent);
        });
    }

    // 2. Actualités
    const formActus = document.getElementById('form-actus');
    if (formActus) {
        formActus.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formActus);

            const payload = {
                titre: formData.get('titre'),
                slug: formData.get('slug') || slugify(formData.get('titre')),
                contenu: formData.get('contenu'),
                image_url: formData.get('image_url') || null,
                image_alt: formData.get('image_alt') || null,
                auteur: formData.get('auteur') || null,
                categorie: formData.get('categorie') || null,
                date_publication: formData.get('date_publication') || null,
                tags: parseCommaList(formData.get('tags')),
                est_publie: formData.get('est_publie') === 'on',
                est_en_une: formData.get('est_en_une') === 'on'
            };

            await insertData('actus', payload, formActus);
        });
    }

    // 3. Billetterie
    const formBilleterie = document.getElementById('form-billeterie');
    if (formBilleterie) {
        formBilleterie.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formBilleterie);

            const payload = {
                titre: formData.get('titre'),
                slug: formData.get('slug') || slugify(formData.get('titre')),
                description: formData.get('description') || null,
                url_achat: formData.get('url_achat'),
                image_url: formData.get('image_url') || null,
                est_disponible: formData.get('est_disponible') === 'on',
                est_publie: formData.get('est_publie') === 'on'
            };

            await insertData('billeterie', payload, formBilleterie);
        });
    }

    // 4. Partenariats
    const formPartenariats = document.getElementById('form-partenariats');
    if (formPartenariats) {
        formPartenariats.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formPartenariats);

            const payload = {
                nom: formData.get('nom'),
                slug: formData.get('slug') || slugify(formData.get('nom')),
                description: formData.get('description') || null,
                offres: formData.get('offres'),
                conditions: formData.get('conditions') || null,
                logo_url: formData.get('logo_url') || null,
                categorie: formData.get('categorie') || null,
                site_web: formData.get('site_web') || null,
                adresse: formData.get('adresse') || null,
                telephone: formData.get('telephone') || null,
                email: formData.get('email') || null,
                date_debut: formData.get('date_debut') || null,
                date_fin: formData.get('date_fin') || null,
                est_actif: formData.get('est_actif') === 'on',
                est_publie: formData.get('est_publie') === 'on'
            };

            await insertData('partenariats', payload, formPartenariats);
        });
    }

    // 5. Profil utilisateur
    const formProfil = document.getElementById('form-profil');
    if (formProfil) {
        formProfil.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(formProfil);

            const payload = {
                nom: formData.get('nom'),
                prenom: formData.get('prenom'),
                updated_at: new Date().toISOString()
            };

            try {
                const { error } = await supabase
                    .from('profils')
                    .update(payload)
                    .eq('id', currentUser.id);

                if (error) throw error;
                showToast("Profil mis à jour avec succès !", "success");
                await loadUserProfile(currentUser.id);
                updateUserBarUI();
            } catch (err) {
                showToast("Erreur lors de la mise à jour du profil : " + err.message, "error");
            }
        });
    }
}

// Fonction générique d'insertion dans Supabase
async function insertData(tableName, payload, formElement) {
    try {
        const { error } = await supabase
            .from(tableName)
            .insert([payload]);

        if (error) throw error;

        showToast("Enregistrement réussi ! Le site va se mettre à jour.", "success");
        formElement.reset();
    } catch (err) {
        console.error(`Erreur ${tableName}:`, err);
        showToast("Erreur d'enregistrement : " + err.message, "error");
    }
}

// ==========================================================================
// FONCTIONS UTILITAIRES
// ==========================================================================

// Génération automatique des Slugs lors de la saisie des titres
function setupAutoSlugListeners() {
    const bindSlug = (sourceId, targetId) => {
        const source = document.getElementById(sourceId);
        const target = document.getElementById(targetId);
        if (source && target) {
            source.addEventListener('input', () => {
                if (!target.dataset.userModified) {
                    target.value = slugify(source.value);
                }
            });
            target.addEventListener('input', () => {
                target.dataset.userModified = 'true';
            });
        }
    };

    bindSlug('act-titre', 'act-slug');
    bindSlug('bil-titre', 'bil-slug');
    bindSlug('part-nom', 'part-slug');
}

// Transformer une chaîne "Mot1, Mot2" en tableau JS ['Mot1', 'Mot2'] pour Postgres TEXT[]
function parseCommaList(text) {
    if (!text) return [];
    return text.split(',').map(s => s.trim()).filter(Boolean);
}

// Convertir une chaîne en slug propre (URL friendly)
function slugify(text) {
    if (!text) return '';
    return text
        .toString()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 -]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
}

// Système de notification Toast
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()" style="background:none;border:none;cursor:pointer;font-size:1.1rem;">&times;</button>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 4500);
}



document.addEventListener('DOMContentLoaded', async () => {
    // 1. Vérifier si l'utilisateur est bien connecté
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
        // Si non connecté, on le renvoie vers la page de login
        window.location.href = 'https://biggbde.fr/sign-in';
        return;
    }

    const user = session.user;
    
    // 2. Récupération du rôle
    // Hypothèse : le rôle est stocké dans les métadonnées de l'utilisateur sur Supabase
    const userRole = user.user_metadata?.role || 'invite'; 

    // 3. Logique d'affichage selon le rôle
    if (userRole === 'admin') {
        document.getElementById('section-events').classList.remove('hidden');
        document.getElementById('section-actus').classList.remove('hidden');
        document.getElementById('section-treso').classList.remove('hidden');
        document.getElementById('section-parts').classList.remove('hidden');
        document.getElementById('section-profils').classList.remove('hidden');
    } 
    else if (userRole === 'tresorerie') {
        document.getElementById('section-treso').classList.remove('hidden');
    }
    else if (userRole === 'partenariats') {
        document.getElementById('section-parts').classList.remove('hidden');
    }
    else if (userRole === 'evenementiel') {
        document.getElementById('section-events').classList.remove('hidden');
    }
    else if (userRole === 'communication') {
        document.getElementById('section-actus').classList.remove('hidden');
    }
    
    // Le RLS de Supabase fera le reste du travail en bloquant 
    // les requêtes réseau si quelqu'un modifie le DOM à la main via la console.
});