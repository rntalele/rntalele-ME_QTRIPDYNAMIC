
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let cityId = new URLSearchParams(search).get('city');
  return cityId
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let res = await fetch(config.backendEndpoint + '/adventures?city=' + city)
    return res.json();
  } catch (error) {
    return null;
  }

}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let rowDiv = document.getElementById('data');
  adventures.forEach(({ id, category, image, name, costPerHead, duration }) => {
    let card = 
      `
        <div class="col-lg-3 col-sm-6 mb-4">
          <a href="detail/?adventure=${id}" id="${id}">
            <div class="activity-card">
              <div class="category-banner">${category}</div>
              <img src=${image} class="img-fluid" alt=${id}>
              <div class="d-flex flex-column p-2">
                <div class="d-flex justify-content-between">
                  <h5 class="float-left">${name}</h5>
                  <p class="float-right">${costPerHead}</p>
                </div>
                <div class="d-flex justify-content-between">
                  <h5>Duration</h5>
                  <p>${duration}</p>
                </div>
              </div>
            </div>
            
          </a>
        </div>
      `
    rowDiv.innerHTML += card;
  });

}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  return list.filter(adventure => adventure.duration >= low && adventure.duration <= high);

}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  return list.filter(adventure=>categoryList.includes(adventure.category))
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if (filters.duration !== '' && filters.category.length < 1) {
    let [low, high] = filters.duration.split('-');
    let filteredList = filterByDuration(list, Number(low), Number(high));
    return filteredList;
  }
  else if (filters.category.length >= 1 && filters.duration === '') {
    let filteredList = filterByCategory(list, filters.category);
    return filteredList;
  }
  else if(filters.category.length >= 1 && filters.duration !== ''){
    let [low, high] = filters.duration.split('-');
    let filteredList = filterByDuration(filterByCategory(list, filters.category), Number(low), Number(high));
    return filteredList;
  }
  
  else return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  return JSON.parse(localStorage.getItem('filters'));

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  document.getElementById('duration-select').value = filters.duration;
  let categoryList = document.getElementById('category-list');
  filters.category.forEach(category => {
    let pill = document.createElement('div');
    pill.innerText = category;
    pill.className = 'category-filter';
    categoryList.append(pill);
  })

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
