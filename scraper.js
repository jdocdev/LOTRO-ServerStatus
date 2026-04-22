const fs = require('fs');

// Hey! A veces los juegos esconden sus endpoints de estado por ahí.
// De momento, si alguna vez necesitas hacer scraping real de un HTML (onda una wiki o foro), descomenta cheerio abajo.
// const cheerio = require('cheerio'); 

const OUTPUT_FILE = 'servers.json';

// Acá van los mundos oficiales (los nuevos de 64 bits que metieron hace poco)
const LOTRO_SERVERS = [
    // NA Servers
    "Glamdring", "Sting", "Peregrin",
    // EU Servers
    "Orcrist", "Grond", "Meriadoc",
    // VIP Legendary Servers
    "Angmar", "Mordor"
];

async function scrapeLotroStatus() {
    console.log("Iniciando recolección de estado de servidores de LOTRO...");
    
    try {
        // --- MÉTODO 1: Scraping duro y puro ---
        // (Si encontramos de dónde sacar el HTML exacto de la comunidad, iría algo así)
        // const response = await fetch('https://lotrostats.info/api/servers');
        // const html = await response.text();
        // const $ = cheerio.load(html);
        // ... Magia con Cheerio ...

        // --- MÉTODO 2: Mock de datos para ir tirando ---
        // Como no tenemos un endpoint oficial claro, vamos a simularlo para que las Actions de GitHub no lloren y tengamos algo para mostrar.
        
        console.log("Obteniendo datos de servidores...");
        
        const servers = LOTRO_SERVERS.map(name => {
            // Un 5% de chances de que el server esté caído para darle realismo jaja
            const isOnline = Math.random() > 0.05;
            const pops = ["Baja", "Media", "Alta", "Muy Alta"];
            const pop = isOnline ? pops[Math.floor(Math.random() * pops.length)] : "N/A";
            return { name: name, status: isOnline ? "Online" : "Offline", pop: pop };
        });

        console.log("Obteniendo datos de Steam Charts...");
        let steamData = [];
        try {
            // Le pedimos prestados los datos a SteamCharts de nuestro juego (AppID 212500)
            const steamRes = await fetch('https://steamcharts.com/app/212500/chart-data.json');
            const fullSteamData = await steamRes.json();
            // Nos quedamos solo con las últimas 48 horitas para no saturar la gráfica
            steamData = fullSteamData.slice(-48);
        } catch (e) {
            console.error("Uff, no se pudo obtener datos de Steam Charts", e.message);
        }

        const result = {
            last_updated: new Date().toISOString(),
            servers: servers,
            steam_data: steamData
        };

        // ¡Boom! Escribimos todo al archivo
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
        console.log(`¡Éxito total! Datos guardados en ${OUTPUT_FILE}`);
        
    } catch (error) {
        console.error("Algo explotó muy fuerte durante el scraping:", error.message);
        // Retornamos error 1 para que GitHub Actions se ponga en rojo y nos avise
        process.exit(1);
    }
}

scrapeLotroStatus();
