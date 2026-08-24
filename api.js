// Shared helper - executes fetch, parses JSON, and returns a consistent result shape.
async function fetchAndParse(url, options = {}) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    console.error("API Fetch Error:", error);
    return { success: false, error: "Could not fetch data right now. Please check your connection." };
  }
}

// Reverse-geocodes coordinates into a readable address using Nominatim.
async function fetchAddressFromCoords(lat, lon) {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(lat)}&lon=${encodeURIComponent(lon)}`;
  return fetchAndParse(url, { headers: { Accept: "application/json" } });
}

// Fetches nearby hospitals within the requested radius using the Overpass API.
async function fetchNearbyHospitals(lat, lon, radiusMeters = 5000) {
  const query = `[out:json];(nwr["amenity"="hospital"](around:${radiusMeters},${lat},${lon}););out center tags;`;
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;
  return fetchAndParse(url, { headers: { Accept: "application/json" } });
}

// Fetches the daily health tip from the public ZenQuotes API.
async function fetchHealthTip() {
  return fetchAndParse("https://zenquotes.io/api/today", { headers: { Accept: "application/json" } });
}
