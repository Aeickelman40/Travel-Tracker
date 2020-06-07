import './css/base.scss';

let allTravelersData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/travelers/travelers')
  .then(response => response.json());

let allTripsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/trips/trips')
  .then(response => response.json());

let allDestinationsData = fetch('https://fe-apps.herokuapp.com/api/v1/travel-tracker/data/destinations/destinations')
  .then(response => response.json());

let travelersData, tripsData, destinationsData;

Promise.all([allTravelersData, allTripsData, allDestinationsData])
  .then(data => {
    travelersData = data[0];    
    tripsData = data[1]; 
    destinationsData = data[2];
  })
  .catch(error => {
    console.error(error)
  });