// Fichier : scripts/generate-data.js
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// On récupère les identifiants depuis les variables d'environnement de GitHub Actions
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error("Erreur : Les clés Supabase sont introuvables.");
    process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function generateEvents() {
    console.log("Récupération des événements depuis Supabase...");

    try {
        // 1. Requête Supabase
        const { data: events, error } = await supabase
            .from('evenements')
            .select('*')
            .eq('est_publie', true)
            .order('date_event', { ascending: true });

        if (error) throw error;

        // 2. Définition des chemins
        // Remonte d'un cran depuis le dossier "scripts" pour aller à la racine, puis dans "assets/json"
        const outputDir = path.join(__dirname, '..', 'assets', 'json');
        const outputFile = path.join(outputDir, 'data-events.json');

        // 3. Création du dossier s'il n'existe pas
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // 4. Écriture du fichier JSON
        fs.writeFileSync(outputFile, JSON.stringify(events, null, 2), 'utf-8');
        
        console.log(`Succès : ${events.length} événements générés dans ${outputFile}`);

    } catch (error) {
        console.error("Erreur lors de la génération des événements :", error.message);
        process.exit(1); // Fait planter volontairement l'Action pour que tu sois notifié de l'erreur
    }
}

// Lancement de la fonction
generateEvents();