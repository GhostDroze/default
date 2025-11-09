const map = L.map('map').setView([39, -98], 4);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Simple fetch to test loading
fetch('locations.json')
  .then(res => res.json())
  .then(locations => {
    locations.forEach(loc => {
      L.marker([loc.lat, loc.lng])
        .addTo(map)
        .bindPopup(`<b>${loc.name}</b><br>${loc.description}`);
    });
  })
  .catch(err => console.error('Error loading locations:', err));
