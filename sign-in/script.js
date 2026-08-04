// On attend que la page soit bien chargée
document.addEventListener('DOMContentLoaded', () => {
    
    const form = document.getElementById('login-form');
    
    // On met l'écouteur d'événement en TOUT PREMIER
    if (form) {
        form.addEventListener('submit', async (e) => {
            // 1. On bloque immédiatement le rechargement de la page
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const errorDisplay = document.getElementById('error-message');
            
            try {
                // 2. On initialise Supabase ici (ou en haut du fichier, mais au moins le formulaire est bloqué)
                const supabaseUrl = 'https://qchyaljicwhdeouajlbx.supabase.co';
                const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFjaHlhbGppY3doZGVvdWFqbGJ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU4NTMwNTQsImV4cCI6MjEwMTQyOTA1NH0.i1NcSHYwj_gmP6MyjQexZJieV1lWTyYVxVsM5DlmRmY';
                const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

                // 3. On tente la connexion
                const { data, error } = await supabase.auth.signInWithPassword({
                    email: email,
                    password: password,
                });

                if (error) throw error; // On déclenche l'erreur pour aller dans le catch

                // 4. Si tout est bon, redirection
                window.location.href = 'https://biggbde.fr/dashboard/';
                
            } catch (err) {
                // 5. On affiche l'erreur sans recharger la page
                console.error("Erreur de connexion :", err.message);
                errorDisplay.textContent = "Identifiants incorrects ou erreur réseau.";
                errorDisplay.classList.remove('hidden');
            }
        });
    }
});