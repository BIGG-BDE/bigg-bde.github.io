// Initialisation de Supabase (remplace par tes vraies clés)
const SUPABASE_URL = 'https://qchyaljicwhdeouajlbx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjaHlhbGppY3doZGVvdWFqbGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NTMwNTQsImV4cCI6MjEwMTQyOTA1NH0.i1NcSHYwj_gmP6MyjQexZJieV1lWTyYVxVsM5DlmRmY';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDisplay = document.getElementById('error-message');
    
    // Tentative de connexion
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
    });

    if (error) {
        // Affichage de l'erreur
        errorDisplay.textContent = "Identifiants incorrects.";
        errorDisplay.classList.remove('hidden');
    } else {
        // Redirection vers le dashboard
        window.location.href = 'https://biggbde.fr/dashboard';
    }
});