const apiKey = 'GDP9bJc29sN1gTNFJnsZCvtLYM56cg0b';
const city = 'New York';
const stateCode = 'NY';
const pageSize = 200; // Number of venues per page
let page = 0; // Page number

const venueList = document.getElementById('venue-list');

async function fetchVenues() {
  const url = `https://app.ticketmaster.com/discovery/v2/venues.json?apikey=${apiKey}&size=${pageSize}&page=${page}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    // Handle the JSON data here (e.g., display venues).
    console.log(data);

    // Check if there are more pages of results
    if (data.page.totalPages > page) {
      page++;
      fetchVenues(); // Fetch the next page
    }

    data._embedded?.venues.forEach((venue) => {
        const venueName = venue.name;
        const latitude = venue.location?.latitude;
        const longitude = venue.location?.longitude;

        if (venueName && latitude && longitude) {
            const listItem = document.createElement('li');
            listItem.textContent = `Venue: ${venueName}, Latitude: ${latitude}, Longitude: ${longitude}`;
            venueList.appendChild(listItem);
        }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}
fetchVenues();

