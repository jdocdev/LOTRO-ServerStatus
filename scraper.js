const fs = require('fs');
const cheerio = require('cheerio'); 

const OUTPUT_FILE = 'servers.json';

// Acá van los mundos oficiales (los nuevos de 64 bits que metieron hace poco)
const LOTRO_SERVERS = [
    // NA Servers
    "Arkenstone", "Brandywine", "Crickhollow", "Gladden", "Landroval",
    // EU Servers
    "Belegaer", "Evernight", "Gwaihir", "Laurelin", "Sirannon",
    // New 64-bit / Legendary Servers
    "Angmar", "Mordor", "Glamdring", "Sting", "Orcrist"
];

async function scrapeLotroStatus() {
    console.log("Iniciando recolección de estado REAL de servidores de LOTRO...");
    
    try {
        console.log("Consultando el feed oficial de noticias (Launcher Feed)...");
        let outageFromNews = false;
        let newsMessage = "";
        let outageLink = "";
        
        try {
            const newsRes = await fetch('https://www.lotro.com/en/launcher-feed.xml');
            const xml = await newsRes.text();
            const $ = cheerio.load(xml, { xmlMode: true });
            
            // Buscamos noticias recientes que hablen de downtime o mantenimiento
            const items = $('item');
            for (let i = 0; i < Math.min(items.length, 5); i++) {
                const item = $(items[i]);
                const title = item.find('title').text();
                const desc = item.find('description').text();
                const link = item.find('link').text();
                const pubDateStr = item.find('pubDate').text();
                const pubDate = new Date(pubDateStr);
                
                const now = new Date();
                const diffHours = Math.abs(now - pubDate) / 36e5;
                
                const mentionsDowntime = /downtime|maintenance|mantenimiento|caída/i.test(title);
                const mentionsUnavailable = /unavailable|cerrados/i.test(desc);
                const mentionsReopened = /reopened|reabierto|disponible/i.test(desc);
                
                if (diffHours < 24) {
                    if (mentionsDowntime || mentionsUnavailable) {
                        outageFromNews = true;
                        newsMessage = title;
                        outageLink = link;
                        
                        // Si mencionan que ya están reabriendo, no marcamos como caída total
                        if (mentionsReopened) {
                            outageFromNews = false;
                            console.log("Detectado que los servidores están reabriendo.");
                        }
                    }
                }
            }
        } catch (e) {
            console.error("No se pudo consultar el feed de noticias:", e.message);
        }

        console.log("Consultando jugadores en tiempo real (Steam Web API)...");
        let livePlayers = 0;
        try {
            const liveRes = await fetch('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=212500');
            const liveData = await liveRes.json();
            livePlayers = liveData.response.player_count || 0;
            console.log(`Jugadores actuales en Steam: ${livePlayers}`);
        } catch (e) {
            console.error("No se pudo obtener el conteo de Steam en vivo:", e.message);
        }

        console.log("Obteniendo datos históricos para la gráfica...");
        let steamData = [];
        try {
            const steamRes = await fetch('https://steamcharts.com/app/212500/chart-data.json');
            const fullSteamData = await steamRes.json();
            steamData = fullSteamData.slice(-48);
        } catch (e) {
            console.error("No se pudo obtener datos históricos de Steam:", e.message);
        }

        let finalStatus = "Online";
        let isOutage = false;

        if (outageFromNews && livePlayers < 500) {
            finalStatus = "Offline";
            isOutage = true;
        } else if (livePlayers < 1200) {
            // Si hay poca gente o estamos en proceso de reapertura
            finalStatus = "Maintenance";
            isOutage = true;
        }

        // Si ya hay más de 1200 personas, es muy probable que la mayoría de mundos estén UP
        if (livePlayers > 1500) {
            finalStatus = "Online";
            isOutage = false;
        }

        const servers = LOTRO_SERVERS.map(name => {
            let pop = "N/A";
            let srvStatus = finalStatus;

            // Heurística: Algunos servidores suelen abrir antes que otros (Arkenstone es de los primeros)
            if (finalStatus === "Maintenance") {
                if (livePlayers > 800) {
                    if (["Arkenstone", "Evernight", "Gladden"].includes(name)) srvStatus = "Online";
                }
            }

            if (srvStatus === "Online") {
                if (livePlayers > 2000) pop = "Alta";
                else if (livePlayers > 1200) pop = "Media";
                else pop = "Baja";
            }
            return { name: name, status: srvStatus, pop: pop };
        });

        const result = {
            last_updated: new Date().toISOString(),
            servers: servers,
            steam_data: steamData,
            live_players: livePlayers,
            outage_message: outageFromNews ? newsMessage : null,
            outage_link: outageFromNews ? outageLink : null,
            is_down: isOutage
        };

        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));
        console.log(`¡Datos reales guardados en ${OUTPUT_FILE}!`);
        
    } catch (error) {
        console.error("Error crítico durante el proceso:", error.message);
        process.exit(1);
    }
}

scrapeLotroStatus();
