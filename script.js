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
        chartLabel: "Players Online",
        popNA: "N/A",
        footerText: '© jdocdev. Data updated every 10 min. If you like it, dropping a <a href="https://github.com/" target="_blank" style="color:var(--accent-gold);text-decoration:none;">star on GitHub</a> would be awesome ⭐'
    },
    es: {
        title: "Estado de Servidores LOTRO",
        subtitle: "Monitoreo en tiempo real de la Tierra Media",
        latency: "Latencia a NJ (Estimada)",
        calculating: "Calculando...",
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
        statusOffline: "Desconectado",
        chartLabel: "Jugadores Conectados",
        popNA: "N/A",
        footerText: '© jdocdev. Datos actualizados cada 10 min. Si te sirve de algo, se agradece una <a href="https://github.com/" target="_blank" style="color:var(--accent-gold);text-decoration:none;">estrellita en GitHub</a> de forma tranki ⭐'
    },
    fr: {
        title: "État des Serveurs LOTRO",
        subtitle: "Surveillance en temps réel de la Terre du Milieu",
        latency: "Latence vers NJ (Estimée)",
        calculating: "Calcul...",
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
        footerText: '© jdocdev. Données mises à jour toutes les 10 min. Si ça vous aide, une petite <a href="https://github.com/" target="_blank" style="color:var(--accent-gold);text-decoration:none;">étoile sur GitHub</a> fait toujours plaisir ⭐'
    },
    de: {
        title: "LOTRO Serverstatus",
        subtitle: "Echtzeit-Überwachung von Mittelerde",
        latency: "Latenz nach NJ (Geschätzt)",
        calculating: "Berechnung...",
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
        footerText: '© jdocdev. Daten alle 10 Minuten aktualisiert. Wenn es dir gefällt, freue ich mich über einen <a href="https://github.com/" target="_blank" style="color:var(--accent-gold);text-decoration:none;">Stern auf GitHub</a> ⭐'
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

    // Calculamos ping en paralelo mientras cargan los datos
    calculatePing();
    await loadServerStatus();
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
    // Aquí es donde sucede la magia: pintamos la tabla de servidores en la pantalla
    const tbody = document.getElementById('server-body');
    let onlineCount = 0;

    tbody.innerHTML = servers.map((srv, index) => {
        const isOnline = srv.status.toLowerCase() === 'online' || srv.status.toLowerCase() === 'en línea';
        if (isOnline) onlineCount++;
        
        const badgeClass = isOnline ? 'status-online' : 'status-offline';
        const translatedStatus = isOnline ? t('statusOnline') : t('statusOffline');
        const translatedPop = mapPopulation(srv.pop);
        
        return `
            <tr style="animation: fadeIn 0.5s ease-out ${index * 0.05}s forwards; opacity: 0;">
                <td style="font-weight: 600;">${srv.name}</td>
                <td><span class="status-badge ${badgeClass}">${translatedStatus}</span></td>
                <td style="color: var(--text-secondary);">${translatedPop}</td>
            </tr>
        `;
    }).join('');

    updateGlobalStatus(onlineCount, servers.length);
}

async function loadServerStatus() {
    try {
        // Le damos un pequeño respiro artificial (600ms) para que la animación se aprecie un poco
        await new Promise(r => setTimeout(r, 600)); 
        
        // ¡Traemos los datos frescos!
        const response = await fetch(DATA_URL);
        globalServerData = await response.json();
        
        renderServers(globalServerData.servers);

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

function updateGlobalStatus(online, total, isError = false) {
    const globalText = document.getElementById('global-text');
    const globalIndicator = document.querySelector('.global-indicator');

    if (isError) {
        globalText.innerText = t('offlineSystems');
        globalText.style.color = "var(--status-offline)";
        globalIndicator.style.background = "var(--status-offline)";
        globalIndicator.style.boxShadow = "0 0 10px var(--status-offline-glow)";
        return;
    }

    if (online === total) {
        globalText.innerText = t('allOnline');
        globalText.style.color = "#3fb950";
        globalIndicator.style.background = "#3fb950";
        globalIndicator.style.boxShadow = "0 0 10px var(--status-online-glow)";
    } else if (online > 0) {
        globalText.innerText = t('partialIssues');
        globalText.style.color = "#d29922";
        globalIndicator.style.background = "#d29922";
        globalIndicator.style.boxShadow = "0 0 10px rgba(210, 153, 34, 0.4)";
    } else {
        globalText.innerText = t('allDown');
        globalText.style.color = "#ff7b72";
        globalIndicator.style.background = "#ff7b72";
        globalIndicator.style.boxShadow = "0 0 10px var(--status-offline-glow)";
    }
}

function calculatePing() {
    const start = Date.now();
    const pingDisplay = document.getElementById('my-ping');
    
    const bypassCache = `?t=${new Date().getTime()}`;

    fetch(AUTH_SERVER + bypassCache, { mode: 'no-cors', cache: 'no-store' })
        .then(() => {
            const delta = Date.now() - start;
            displayPing(delta);
        })
        .catch(() => {
            const delta = Date.now() - start;
            displayPing(delta);
        });
}

function displayPing(ms) {
    const pingDisplay = document.getElementById('my-ping');
    pingDisplay.classList.remove('loading');
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
