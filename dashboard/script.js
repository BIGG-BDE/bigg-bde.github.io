/* ==========================================================================
   ADMINISTRATION DASHBOARD - BIGG BDE
   Fichier : /admin/script.js
   ========================================================================== */

// 1. CONFIGURATION SUPABASE
const SUPABASE_URL = 'https://qchyaljicwhdeouajlbx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjaHlhbGppY3doZGVvdWFqbGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NTMwNTQsImV4cCI6MjEwMTQyOTA1NH0.i1NcSHYwj_gmP6MyjQexZJieV1lWTyYVxVsM5DlmRmY';

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// Injection dynamique du conteneur de toast (notifications)
function initContainerStructure() {
    if (!document.getElementById('toast-container')) {
        const toastContainer = document.createElement('div');
        toastContainer.id = 'toast-container';
        document.body.appendChild(toastContainer);
    }
}

// Écoute de l'état d'authentification Supabase
function initAuthListener() {
    supabaseClient.auth.onAuthStateChange(async (event, session) => {
        if (session && session.user) {
            currentUser = session.user;
            await loadUserProfile(session.user.id);
            
            // Si on est connecté, on met à jour l'interface
            if (document.getElementById('user-bar')) {
                updateUserBarUI();
                applyRoleRestrictions();
            }
        } else {
            // Si aucune session n'est trouvée, redirection immédiate vers la page de connexion
            window.location.href = 'https://biggbde.fr/sign-in';
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

// Application du contrôle d'accès basé sur les rôles (RBAC)
function applyRoleRestrictions() {
    if (!currentProfile) return;

    const userRole = currentProfile.role || 'invite';
    
    // Mapping Rôle -> ID des sections autorisées (correspondant à ton HTML)
    const rolePermissions = {
        'admin': ['section-events', 'section-actus', 'section-treso', 'section-parts', 'section-profils'],
        'evenementiel': ['section-events', 'section-profils'],
        'communication': ['section-actus', 'section-profils'],
        'tresorerie': ['section-treso', 'section-profils'],
        'partenariats': ['section-parts', 'section-profils']
    };

    const allowedSections = rolePermissions[userRole] || [];
    
    // On cache toutes les sections par défaut, puis on affiche celles autorisées
    const allSections = document.querySelectorAll('.admin-section, [id^="section-"]');

    allSections.forEach(section => {
        if (allowedSections.includes(section.id)) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });

    // Pré-remplir le formulaire de profil s'il existe sur la page
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

async function handleLogout() {
    try {
        await supabaseClient.auth.signOut();
        // La redirection vers /sign-in se fera automatiquement grâce à initAuthListener()
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

    // Les écouteurs d'événements pour tes autres formulaires (actus, events...) restent ici.
    // (J'ai conservé cette logique identique à celle de base)
}

// Fonction générique d'insertion dans Supabase
async function insertData(tableName, payload, formElement) {
    try {
        const { error } = await supabaseClient
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

function parseCommaList(text) {
    if (!text) return [];
    return text.split(',').map(s => s.trim()).filter(Boolean);
}

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