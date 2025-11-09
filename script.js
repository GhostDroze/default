const map = L.map('map').setView([35.0, -78.0], 7);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch('locations.json')
  .then(response => response.json())
  .then(locations => {
    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.description || ''}`);
    });
  });
