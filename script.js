// === CONFIGURATION ===
const GITHUB_USERNAME = "your-username";  // 🔁 replace with your GitHub username
const REPO_NAME = "my-map-project";       // 🔁 replace with your repo name
const FILE_PATH = "locations.json";       // stays the same
const TOKEN = ""; // 🔒 Leave empty for now, we’ll use .env or a local method later

// === MAP SETUP ===
const map = L.map('map').setView([35.0, -78.0], 7);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// === FETCH LOCATIONS FROM GITHUB ===
async function loadLocations() {
  const url = `https://api.github.com/repos/${GITHUB_USERNAME}/${REPO_NAME}/contents/${FILE_PATH}`;
  
  const headers = TOKEN ? { Authorization: `token ${TOKEN}` } : {};
  const response = await fetch(url, { headers });

  if (!response.ok) {
    console.error("GitHub API error:", response.statusText);
    return;
  }

  const data = await response.json();

  // GitHub API returns base64 content
  const decoded = atob(data.content);
  const locations = JSON.parse(decoded);

  // Add each location to the map
  locations.forEach(loc => {
    L.marker([loc.lat, loc.lng])
      .addTo(map)
      .bindPopup(`<b>${loc.name}</b><br>${loc.description || ''}`);
  });
}

loadLocations();

