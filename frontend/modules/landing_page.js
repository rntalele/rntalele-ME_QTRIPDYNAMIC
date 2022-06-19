import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log(cities);
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let data = await fetch(config.backendEndpoint + '/cities');
    return data.json();
    
  } catch (error) {
    return null;
  }

}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  // let colDiv = document.createElement('div');
  // colDiv.className = "col-lg-3 col-sm-6 col-12 mb-4";
  // let a = document.createElement('a');

    let card = `
    <div class="col-lg-3 col-sm-6 col-12 mb-4">
        <a href="pages/adventures/?city=${id}" id=${id}>
          <div class="tile">
            <img src=${image} class="img-fluid" alt=${id}>
            <div class="tile-text text-center text-white">
              <h5>${city}</h5>
              <p>${description}</p>
            </div>
          </div>
        </a>
      </div>
      `
  let rowDiv = document.getElementById('data');
  rowDiv.innerHTML += card;

}

export { init, fetchCities, addCityToDOM };
 