import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureId = new URLSearchParams(search).get('adventure');
  return adventureId;

  // Place holder for functionality to work in the Stubs
  // return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let res = await fetch(config.backendEndpoint + '/adventures/detail?adventure=' + adventureId);
    let data = await res.json();
    return data;
  } catch (error) {
    return null;
  }
  
// Place holder for functionality to work in the Stubs
  
} 

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById('adventure-name').innerHTML = adventure.name;
  document.getElementById('adventure-subtitle').innerHTML = adventure.subtitle;
  let imageContainer = document.getElementById('photo-gallery');
  adventure.images.forEach(image => {
    let img = document.createElement('img');
    img.src = image;
    img.className='activity-card-image'
    imageContainer.append(img);
  });
  document.getElementById('adventure-content').innerHTML = adventure.content;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGallery = document.getElementById('photo-gallery');
  photoGallery.className = 'carousel slide';
  photoGallery.setAttribute('data-bs-ride', 'carousel')
  
  let carouselIndicator = document.createElement('div');
  carouselIndicator.className = 'carousel-indicators';
  images.forEach((image, index) => {
    carouselIndicator.innerHTML +=
      `<button type="button" data-bs-target="#photo-gallery" data-bs-slide-to="${index}" class="${index > 0 ? '':'active'}" aria-current="true" aria-label="Slide ${index+1}"></button>`
  })


  let imageContainer = document.createElement('div');
  imageContainer.className = 'carousel-inner';
  let count = 0;
  images.forEach((image) => {
    let img = `<div class="carousel-item ${count >= 1 ? '':'active'}">
                <img src=${image} class="activity-card-image">
              </div>`
    imageContainer.innerHTML += img;
    count += 1;
  })

  let prevButton = document.createElement('button');
  prevButton.type = 'button';
  prevButton.className = 'carousel-control-prev';
  prevButton.setAttribute('data-bs-target', '#photo-gallery')
  prevButton.setAttribute('data-bs-slide', 'prev');
  prevButton.innerHTML = 
    `<span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>`
  
  let nextButton = document.createElement('button');
  nextButton.type = 'button';
  nextButton.className = 'carousel-control-next';
  nextButton.setAttribute('data-bs-target', '#photo-gallery')
  nextButton.setAttribute('data-bs-slide', 'next');
  nextButton.innerHTML = 
    `<span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>`
  photoGallery.innerHTML = ''
  photoGallery.append(carouselIndicator);
  photoGallery.append(imageContainer);
  photoGallery.append(prevButton);
  photoGallery.append(nextButton);

  // photoGallery.replaceChildren(carouselIndicator,imageContainer,prevButton,nextButton);
  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
