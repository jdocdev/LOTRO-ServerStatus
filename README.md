# 💍 LOTRO Server Status Monitor

A lightweight, fully serverless web application that monitors the real-time status of *Lord of the Rings Online* (LOTRO) 64-bit servers and tracks active Steam players.

## ✨ Features
- **Live Status Checking**: See the status and estimated population of all official game worlds (Glamdring, Sting, Angmar, Mordor, etc.).
- **Real-time Latency**: Measures your browser's latency to the actual LOTRO datacenters.
- **Steam Charts Integration**: Interactive graph plotting the last 48 hours of connected Steam players.
- **Multi-language Support (i18n)**: Fully translated into English, Spanish, French, and German! (Persists via `localStorage`).
- **Serverless Architecture**: Data is fetched automatically every 10 minutes entirely through GitHub Actions.

## 🚀 How it works

The frontend is built using pure Vanilla JavaScript, HTML, and CSS (no bulky frameworks). 
A Node.js script (`scraper.js`) runs continuously on GitHub Actions, fetching the latest server and player data from Steam, and updates `servers.json`. The web app simply consumes this static JSON file, guaranteeing incredibly fast load times and zero hosting costs.

### 🛠️ Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/jdocdev/LOTRO-Server-Status.git
   ```
2. Run the scraper to fetch fresh data:
   ```bash
   node scraper.js
   ```
3. Start a local server (e.g. using Python):
   ```bash
   python3 -m http.server 8080
   ```
4. Open `http://localhost:8080` in your browser.

## 🎨 Design

The UI was crafted with a dark, premium aesthetic focusing on "glassmorphism" to capture the epic, high-fantasy feeling of Middle-earth, with subtle golden glow effects and skeleton loading states.

## 📄 License & Credits
Created by **jdocdev**. 
If you find this useful, a GitHub star is always appreciated! ⭐
