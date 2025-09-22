// Functionality for search bar to filter category cards
document.addEventListener('DOMContentLoaded', () => {
  const categorySearchInput = document.getElementById('categorySearch');
  const categoryGrid = document.getElementById('categoryGrid');
  const categoryCards = categoryGrid.querySelectorAll('.category_card');

  categorySearchInput.addEventListener('keyup', (event) => {
    const searchTerm = event.target.value.toLowerCase().trim();

    categoryCards.forEach(card => {
      const categoryName = card.dataset.category.toLowerCase();
      if (categoryName.includes(searchTerm)) {
        card.style.display = 'flex'; // Show the card
      } else {
        card.style.display = 'none'; // Hide the card
      }
    });
  });

  // Functionality for location input
  const locationInput = document.getElementById('locationInput');

  // Function to get user's current location
  function getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // You can use a reverse geocoding service here to get a readable address
          // For simplicity, we'll just display coordinates or a generic message
          locationInput.value = 'Fetching location...'; // Show a temporary message

          // Example using OpenStreetMap Nominatim API for reverse geocoding
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`)
            .then(response => response.json())
            .then(data => {
              const address = data.address;
              if (address) {
                const city = address.city || address.town || address.village || '';
                const state = address.state || '';
                const country = address.country || '';
                let displayLocation = '';

                if (city && state) {
                  displayLocation = `${city}, ${state}`;
                } else if (city) {
                  displayLocation = city;
                } else if (state) {
                  displayLocation = state;
                } else {
                  displayLocation = 'Unknown Location';
                }
                locationInput.value = displayLocation;
              } else {
                locationInput.value = 'Location not found';
              }
            })
            .catch(error => {
              console.error('Error fetching address:', error);
              locationInput.value = 'Location error';
            });
        },
        (error) => {
          console.error('Error getting location:', error);
          switch (error.code) {
            case error.PERMISSION_DENIED:
              locationInput.value = 'Location Blocked';
              alert("Location access denied. Please enable location services for a better experience.");
              break;
            case error.POSITION_UNAVAILABLE:
              locationInput.value = 'Location Unavailable';
              alert("Location information is unavailable.");
              break;
            case error.TIMEOUT:
              locationInput.value = 'Location Timeout';
              alert("The request to get user location timed out.");
              break;
            default:
              locationInput.value = 'Location Error';
              alert("An unknown error occurred while trying to get your location.");
              break;
          }
        }
      );
    } else {
      locationInput.value = 'Geolocation not supported';
      alert("Geolocation is not supported by your browser.");
    }
  }

  // Trigger location detection when the location input is focused or clicked
  locationInput.addEventListener('focus', getUserLocation);
  locationInput.addEventListener('click', getUserLocation); // For mobile/tablet to ensure it works on tap
});