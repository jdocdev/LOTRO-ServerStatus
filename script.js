// 1. Configuración
const DATA_URL = 'servers.json'; 
const AUTH_SERVER = 'https://gls.lotro.com/favicon.ico';

// Translations
const translations = {
    en: {
        title: "LOTRO Server Status",
        subtitle: "Real-time monitoring of Middle-earth",
        latency: "Latency to NJ (Estimated)",
        calculating: "Calculating...",
        activePlayers: "Active Population",
        steamLabel: "Steam Players",
        launcherLabel: "Launcher (Est.)",
        estimatedTotal: "Total Estimated",
        estNote: "* Based on 3.2x Steam multiplier",
        globalStatus: "Global Status",
        verifying: "Verifying...",
        steamPlayers: "Steam Players (Last 48 hrs)",
        server: "Server",
        status: "Status",
        population: "Population",
        disclaimer: "Data updated automatically every 10 min via GitHub Actions.",
        repo: "View Repository",
        allOnline: "All systems online",
        partialIssues: "Partial Issues",
        allDown: "All systems down",
        offlineSystems: "Systems Offline",
        errorLoading: "Error loading data. Check connection or URL.",
        popLow: "Low",
        popMedium: "Medium",
        popHigh: "High",
        popVeryHigh: "Very High",
        statusOnline: "Online",
        statusOffline: "Offline",
        statusMaintenance: "Maintenance",
        chartLabel: "Players Online",
        popNA: "N/A",
        footerText: '© jdocdev. Data updated every 10 min. If you like it, dropping a <a href="https://github.com/" target="_blank" style="color:var(--accent-gold);text-decoration:none;">star on GitHub</a> would be awesome ⭐',
        metaDesc: "Check the real-time status, latency, and population of Lord of the Rings Online (LOTRO) servers, plus live Steam player charts."
    },
    es: {
        title: "Estado de Servidores LOTRO",
        subtitle: "Monitoreo en tiempo real de la Tierra Media",
        latency: "Latencia a NJ (Estimada)",
        calculating: "Calculando...",
        activePlayers: "Población Activa",
        steamLabel: "Jugadores Steam",
        launcherLabel: "Launcher (Est.)",
        estimatedTotal: "Total Estimado",
        estNote: "* Basado en un factor x3.2 de Steam",
        globalStatus: "Estado Global",
        verifying: "Verificando...",
        steamPlayers: "Jugadores en Steam (Últimas 48 hrs)",
        server: "Servidor",
        status: "Estado",
        population: "Población",
        disclaimer: "Datos actualizados automáticamente cada 10 min via GitHub Actions.",
        repo: "Ver Repositorio",
        allOnline: "Todos los sistemas en línea",
        partialIssues: "Problemas Parciales",
        allDown: "Todos los sistemas caídos",
        offlineSystems: "Sistemas Fuera de Línea",
        errorLoading: "Error al cargar los datos. Verifica la conexión o la URL.",
        popLow: "Baja",
        popMedium: "Media",
        popHigh: "Alta",
        popVeryHigh: "Muy Alta",
        statusOnline: "En línea",
        statusOffline: "Desconectado",
        statusMaintenance: "Mantenimiento",
        chartLabel: "Jugadores Conectados",
        popNA: "N/A",
        footerText: '© jdocdev. Datos actualizados cada 10 min. Si te sirve de algo, se agradece una <a href="https://github.com/" target="_blank" style="color:var(--accent-gold);text-decoration:none;">estrellita en GitHub</a> de forma tranki ⭐',
        metaDesc: "Consulta el estado en tiempo real, latencia y población de los servidores de Lord of the Rings Online (LOTRO) y gráficas de Steam."
    },
    fr: {
        title: "État des Serveurs LOTRO",
        subtitle: "Surveillance en temps réel de la Terre du Milieu",
        latency: "Latence vers NJ (Estimée)",
        calculating: "Calcul...",
        activePlayers: "Population Active",
        steamLabel: "Joueurs Steam",
        launcherLabel: "Launcher (Est.)",
        estimatedTotal: "Total Estimé",
        estNote: "* Basé sur un multiplicateur Steam de 3,2x",
        globalStatus: "État Global",
        verifying: "Vérification...",
        steamPlayers: "Joueurs sur Steam (48 dernières heures)",
        server: "Serveur",
        status: "État",
        population: "Population",
        disclaimer: "Données mises à jour automatiquement toutes les 10 min via GitHub Actions.",
        repo: "Voir le Dépôt",
        allOnline: "Tous les systèmes en ligne",
        partialIssues: "Problèmes Partiels",
        allDown: "Tous les systèmes hors ligne",
        offlineSystems: "Systèmes hors ligne",
        errorLoading: "Erreur de chargement des données. Vérifiez la connexion ou l'URL.",
        popLow: "Faible",
        popMedium: "Moyenne",
        popHigh: "Élevée",
        popVeryHigh: "Très Élevée",
        statusOnline: "En ligne",
        statusOffline: "Hors ligne",
        statusOffline: "Hors ligne",
        chartLabel: "Joueurs Connectés",
        popNA: "N/A",
        footerText: '© jdocdev. Données mises à jour toutes les 10 min. Si ça vous aide, une petite <a href="https://github.com/" target="_blank" style="color:var(--accent-gold);text-decoration:none;">étoile sur GitHub</a> fait toujours plaisir ⭐',
        metaDesc: "Vérifiez l'état en temps réel, la latence et la population des serveurs du Seigneur des Anneaux Online (SdAO)."
    },
    de: {
        title: "LOTRO Serverstatus",
        subtitle: "Echtzeit-Überwachung von Mittelerde",
        latency: "Latenz nach NJ (Geschätzt)",
        calculating: "Berechnung...",
        activePlayers: "Aktive Bevölkerung",
        steamLabel: "Steam-Spieler",
        launcherLabel: "Launcher (Est.)",
        estimatedTotal: "Gesamt (Geschätzt)",
        estNote: "* Basierend auf 3,2x Steam-Multiplikator",
        globalStatus: "Globaler Status",
        verifying: "Überprüfung...",
        steamPlayers: "Steam-Spieler (Letzte 48 Std.)",
        server: "Server",
        status: "Status",
        population: "Bevölkerung",
        disclaimer: "Daten werden automatisch alle 10 Minuten über GitHub Actions aktualisiert.",
        repo: "Repository anzeigen",
        allOnline: "Alle Systeme online",
        partialIssues: "Teilweise Probleme",
        allDown: "Alle Systeme offline",
        offlineSystems: "Systeme offline",
        errorLoading: "Fehler beim Laden. Überprüfen Sie die Verbindung oder die URL.",
        popLow: "Niedrig",
        popMedium: "Mittel",
        popHigh: "Hoch",
        popVeryHigh: "Sehr Hoch",
        statusOnline: "Online",
        statusOffline: "Offline",
        statusOffline: "Offline",
        chartLabel: "Verbundene Spieler",
        popNA: "N/A",
        footerText: '© jdocdev. Daten alle 10 Minuten aktualisiert. Wenn es dir gefällt, freue ich mich über einen <a href="https://github.com/" target="_blank" style="color:var(--accent-gold);text-decoration:none;">Stern auf GitHub</a> ⭐',
        metaDesc: "Überprüfen Sie den Echtzeit-Status, die Latenz und die Bevölkerung der Herr der Ringe Online (HdRO) Server."
    }
};

// Intentamos recordar el último idioma que eligió el usuario (¡nada de molestarle cada vez!)
let currentLang = localStorage.getItem('lotro_lang') || 'en';
let globalServerData = null;
let steamChartInstance = null;

function t(key) {
    return translations[currentLang][key] || key;
}

function updateStaticTranslations() {
    // Recorremos todo lo que tenga la etiqueta i18n y le metemos el texto o HTML correcto
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[currentLang] && translations[currentLang][key]) {
            el.innerHTML = translations[currentLang][key]; // Usamos innerHTML para soportar el enlace de GitHub
        }
    });
}

function changeLang(lang) {
    // ¡Cambio de idioma en camino! Guardamos la preferencia y actualizamos la interfaz
    currentLang = lang;
    localStorage.setItem('lotro_lang', lang);
    
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    updateStaticTranslations();

    // Dinamismo puro para el SEO (Search Engine Optimization)
    document.documentElement.lang = lang;
    document.title = t('title') + " - Monitor";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && translations[lang] && translations[lang].metaDesc) {
        metaDesc.setAttribute("content", translations[lang].metaDesc);
    }

    // Actualizar ping manualmente si está cargando
    const pingEl = document.getElementById('my-ping');
    if (pingEl && pingEl.classList.contains('loading')) {
        pingEl.innerText = t('calculating');
    }

    // Re-render data if already loaded
    if (globalServerData) {
        renderServers(globalServerData.servers);
        if (globalServerData.steam_data && globalServerData.steam_data.length > 0) {
            renderChart(globalServerData.steam_data);
        }
    }
}

async function init() {
    // Inicializar idioma
    changeLang(currentLang);

    // Calculamos ping y estado en vivo en paralelo
    calculatePing();
    
    // Traemos los datos del JSON (que pueden estar desactualizados por el delay de GitHub)
    await loadServerStatus();

    // ¡NUEVO! Verificación en tiempo real desde el navegador del usuario para saltarse el delay del bot
    checkLiveStatus();
}

async function checkLiveStatus() {
    const banner = document.getElementById('outage-banner');
    const bannerText = document.getElementById('outage-text');
    const globalText = document.getElementById('global-text');
    const globalIndicator = document.querySelector('.global-indicator');

    try {
        console.log("Iniciando verificación en vivo desde el navegador...");
        
        // 1. Verificamos conectividad básica con el servidor de login de LOTRO (favicon trick)
        const connectivityCheck = fetch('https://gls.lotro.com/favicon.ico', { mode: 'no-cors', cache: 'no-store' });
        
        // 2. Obtenemos jugadores en Steam usando un proxy CORS público (seguro y sin tokens)
        const steamProxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?appid=212500')}&t=${Date.now()}`;
        const steamCheck = fetch(steamProxyUrl).then(r => r.json());

        const [conn, steamResponse] = await Promise.all([connectivityCheck, steamCheck]);
        const liveData = JSON.parse(steamResponse.contents);
        const livePlayers = liveData.response.player_count || 0;

        console.log(`Verificación en vivo: Conexión OK, Jugadores: ${livePlayers}`);

        // 3. Forzar actualización de población con el dato hiper fresquito
        if (livePlayers > 0) {
            renderPopulation(livePlayers);
        }

        // LÓGICA DE OVERRIDE: Si en Steam hay gente (> 600) pero el JSON aún dice "Offline" o "Maintenance"
        const jsonIsOutage = globalServerData && globalServerData.is_down;
        
        if (jsonIsOutage && livePlayers > 600) {
            // ¡Detectamos que los servidores han vuelto antes que el bot de GitHub!
            banner.classList.add('visible');
            banner.style.background = "rgba(63, 185, 80, 0.1)";
            banner.style.borderColor = "#3fb950";
            banner.style.color = "#3fb950";
            banner.querySelector('.card-icon').innerText = "✅";
            banner.querySelector('.card-icon').style.borderColor = "#3fb950";
            
            bannerText.innerHTML = `<strong>Detección en Vivo:</strong> Se detectan ${livePlayers} jugadores activos. ¡Es muy probable que los servidores ya estén disponibles! <small style="display:block; opacity: 0.8;">(El bot de GitHub se actualizará en breve)</small>`;
            
            // Actualizar el indicador global también
            globalText.innerText = "Reapertura Detectada";
            globalText.style.color = "#3fb950";
            globalIndicator.style.background = "#3fb950";
            globalIndicator.style.boxShadow = "0 0 15px var(--status-online-glow)";
        }

    } catch (e) {
        console.warn("La verificación en vivo falló (esto es normal si el usuario tiene bloqueadores de rastreo):", e.message);
    }
}

function mapPopulation(popText) {
    if (!popText) return t('popNA');
    const p = popText.toLowerCase();
    if (p.includes('baja') || p.includes('low') || p.includes('faible') || p.includes('niedrig')) return t('popLow');
    if (p.includes('muy alta') || p.includes('very high') || p.includes('très élevée') || p.includes('sehr hoch')) return t('popVeryHigh');
    if (p.includes('alta') || p.includes('high') || p.includes('élevée') || p.includes('hoch')) return t('popHigh');
    if (p.includes('media') || p.includes('medium') || p.includes('moyenne') || p.includes('mittel')) return t('popMedium');
    return t('popNA');
}

function renderServers(servers) {
    const tbody = document.getElementById('server-body');
    const banner = document.getElementById('outage-banner');
    const bannerText = document.getElementById('outage-text');
    let onlineCount = 0;

    // Mostrar banner de alerta si hay mensaje oficial o sospecha de caída
    if (globalServerData && (globalServerData.is_down || globalServerData.outage_message)) {
        banner.classList.add('visible');
        const msg = globalServerData.outage_message || "Suspected Maintenance or Outage";
        
        if (globalServerData.outage_link) {
            banner.style.cursor = 'pointer';
            banner.onclick = () => window.open(globalServerData.outage_link, '_blank');
            bannerText.innerHTML = `${msg} <small style="display:block; opacity: 0.8; font-weight: normal; margin-top: 4px;">Click to read official post ↗</small>`;
        } else {
            banner.style.cursor = 'default';
            banner.onclick = null;
            bannerText.innerText = msg;
        }
    } else {
        banner.classList.remove('visible');
    }

    tbody.innerHTML = servers.map((srv, index) => {
        const s = srv.status.toLowerCase();
        const isOnline = s === 'online' || s === 'en línea';
        const isMaintenance = s === 'maintenance' || s === 'mantenimiento';
        
        if (isOnline) onlineCount++;
        
        let badgeClass = 'status-offline';
        let translatedStatus = t('statusOffline');
        
        if (isOnline) {
            badgeClass = 'status-online';
            translatedStatus = t('statusOnline');
        } else if (isMaintenance) {
            badgeClass = 'status-partial';
            translatedStatus = t('statusMaintenance');
        }
        
        const translatedPop = mapPopulation(srv.pop);
        
        return `
            <tr style="animation: fadeIn 0.5s ease-out ${index * 0.05}s forwards; opacity: 0;">
                <td style="font-weight: 600;">
                    ${srv.name}
                    ${srv.type === 'Legendary' ? '<span class="vip-badge">VIP</span>' : ''}
                </td>
                <td><span class="status-badge ${badgeClass}">${translatedStatus}</span></td>
                <td style="color: var(--text-secondary);">${translatedPop}</td>
            </tr>
        `;
    }).join('');

    updateGlobalStatus(onlineCount, servers.length, false, globalServerData?.is_down);
}

function renderPopulation(livePlayers) {
    const multiplier = 3.2;
    const estTotal = Math.round(livePlayers * multiplier);
    const estLauncher = estTotal - livePlayers;

    const popCount = document.getElementById('pop-count');
    const popDetails = document.getElementById('pop-details');

    if (popCount) {
        popCount.innerText = estTotal.toLocaleString();
        popCount.classList.remove('loading');
    }

    if (popDetails) {
        popDetails.style.display = 'flex';
        popDetails.innerHTML = `
            <div class="pop-item">
                <span class="pop-label">${t('steamLabel')}</span>
                <span class="pop-value">${livePlayers.toLocaleString()}</span>
            </div>
            <div class="pop-item">
                <span class="pop-label">${t('launcherLabel')}</span>
                <span class="pop-value">${estLauncher.toLocaleString()}</span>
            </div>
            <div class="pop-item" style="border-top: 1px solid rgba(255,255,255,0.1); margin-top: 5px; padding-top: 5px;">
                <span class="pop-label" style="color: var(--accent-gold);">${t('estimatedTotal')}</span>
                <span class="pop-value pop-total-est">${estTotal.toLocaleString()}</span>
            </div>
            <div class="pop-note">${t('estNote')}</div>
        `;
    }
}

async function loadServerStatus() {
    try {
        // Le damos un pequeño respiro artificial (600ms) para que la animación se aprecie un poco
        await new Promise(r => setTimeout(r, 600)); 
        
        // ¡Traemos los datos frescos!
        const response = await fetch(DATA_URL);
        globalServerData = await response.json();
        
        renderServers(globalServerData.servers);

        // --- ACTUALIZAR POBLACIÓN ESTIMADA INICIAL ---
        const livePlayers = globalServerData.live_players || 0;
        renderPopulation(livePlayers);

        if (globalServerData.steam_data && globalServerData.steam_data.length > 0) {
            renderChart(globalServerData.steam_data);
        }

    } catch (e) {
        console.error("Error cargando servidores", e);
        const tbody = document.getElementById('server-body');
        tbody.innerHTML = `<tr><td colspan="3" style="text-align:center; color: var(--status-offline);">${t('errorLoading')}</td></tr>`;
        updateGlobalStatus(0, 1, true);
    }
}

function updateGlobalStatus(online, total, isError = false, isDown = false) {
    const globalText = document.getElementById('global-text');
    const globalIndicator = document.querySelector('.global-indicator');

    if (isError || isDown) {
        globalText.innerText = isDown ? t('allDown') : t('offlineSystems');
        const color = isDown ? "var(--accent-gold)" : "var(--status-offline)";
        globalText.style.color = color;
        globalIndicator.style.background = color;
        globalIndicator.style.color = color;
        return;
    }

    if (online === total) {
        globalText.innerText = t('allOnline');
        globalText.style.color = "#3fb950";
        globalIndicator.style.background = "#3fb950";
        globalIndicator.style.color = "#3fb950";
    } else if (online > 0) {
        globalText.innerText = t('partialIssues');
        globalText.style.color = "#d29922";
        globalIndicator.style.background = "#d29922";
        globalIndicator.style.color = "#d29922";
    } else {
        globalText.innerText = t('allDown');
        globalText.style.color = "var(--status-offline)";
        globalIndicator.style.background = "var(--status-offline)";
        globalIndicator.style.color = "var(--status-offline)";
    }
}

function calculatePing() {
    const start = Date.now();
    
    const bypassCache = `?t=${new Date().getTime()}`;

    fetch(AUTH_SERVER + bypassCache, { mode: 'no-cors', cache: 'no-store' })
        .then(() => {
            const delta = Date.now() - start;
            displayPing(delta);
        })
        .catch(() => {
            const delta = Date.now() - start;
            displayPing(delta, true);
        });
}

function displayPing(ms, isError = false) {
    const pingDisplay = document.getElementById('my-ping');
    pingDisplay.classList.remove('loading');
    
    if (isError) {
        pingDisplay.innerText = "Error";
        pingDisplay.style.color = "#ff7b72";
        return;
    }

    pingDisplay.innerText = `${ms} ms`;

    if (ms < 150) {
        pingDisplay.style.color = "#3fb950"; 
    } else if (ms < 250) {
        pingDisplay.style.color = "#d29922"; 
    } else {
        pingDisplay.style.color = "#ff7b72"; 
    }
}

function renderChart(steamData) {
    const ctx = document.getElementById('steam-chart').getContext('2d');
    
    const labels = steamData.map(point => {
        const date = new Date(point[0]);
        return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    });
    
    const dataPoints = steamData.map(point => point[1]);

    if (steamChartInstance) {
        steamChartInstance.data.datasets[0].label = t('chartLabel');
        steamChartInstance.update();
        return;
    }

    steamChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: t('chartLabel'),
                data: dataPoints,
                borderColor: '#daa520',
                backgroundColor: 'rgba(218, 165, 32, 0.1)',
                borderWidth: 2,
                pointRadius: 1,
                pointHoverRadius: 4,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                    backgroundColor: 'rgba(22, 27, 34, 0.9)',
                    titleColor: '#e6edf3',
                    bodyColor: '#daa520',
                    borderColor: 'rgba(218, 165, 32, 0.2)',
                    borderWidth: 1
                }
            },
            scales: {
                x: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
                    ticks: { color: '#8b949e', maxTicksLimit: 8 }
                },
                y: {
                    grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
                    ticks: { color: '#8b949e' }
                }
            },
            interaction: { mode: 'nearest', axis: 'x', intersect: false }
        }
    });
}

// Make changeLang available to global scope for HTML onclick
window.changeLang = changeLang;

init();
