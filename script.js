// Namespace Object
const app = {};

// Api Key & URL
const key = 'a4nM7Nfjw1m61m8Y4TcFuA5U3xt49YFj4KkbPkPMeeE';
const apiUrl = 'https://trefle.io/api/v1/plants/';

// Initialize App
app.init = () => {
  app.clearSearch()
  app.getPlants();
  app.userSearch();
}

// Clears the search bar when the page is refreshed
app.clearSearch = () => {
  $('#search').val('');
}

// Initial API call to populate landing page with plants
app.getPlants = () => {

  $.ajax({
    url: 'https://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
      reqUrl: apiUrl,
      params: {
        token: key,
      }
    }
  }).then(function (result) {
    app.createCards(result.data);
  })
}

// Notates through data to append onto the page 'ul'..
app.createCards = (res) => {
  $('.cards').empty().unbind();

  // Iterates through data array and dynamically creates elements for plant cards
  res.forEach((arr) => { 

    const commonName = arr.common_name;
    let trimmedCommonName = commonName;

    // Error handling to check if the Common Name will fit on the front 'li' 
    if (trimmedCommonName.length > 20) {
      trimmedCommonName = trimmedCommonName.slice(0, 19) + '...';
    };

    // Front of card
    const name = $('<div>').addClass('frontNameContainer').append($('<h2>').text(trimmedCommonName));
    let image = $('<div>').addClass('frontImageContainer').append($('<img>').attr('src', arr.image_url).attr('alt', commonName));
    
    // Back of card
    const nameBack = $('<h3>').html(`<span>Common Name:</span> ${commonName}`);
    const genus = $('<p>').html(`<span>Genus:</span> ${arr.genus}`);
    const family = $('<p>').html(`<span>Family:</span> ${arr.family} '${arr.family_common_name}'`);
    const sciName = $('<p>').html(`<span>Scientific Name:</span> ${arr.scientific_name}`);

    // No image available error handling
    if (!arr.image_url) {
      image = $('<div>').addClass('frontImageContainer').append($('<img>').attr('src', 'assets/errorImage.png').attr('alt', commonName));
    }
    
    // Back Card Package
    const cardBack = $('<div>').addClass('backCard').append(nameBack, sciName, genus, family);
    
    // Front Card Package
    const card = $('<div>').addClass('frontCard').append(image, name);

    // Card Container
    const cardContainer = $('<li>').addClass('cardContainer').attr('tabindex', '0').attr('role', 'tab').attr('aria-label', 'plant list').attr('aria-selected', 'true').append(card, cardBack);
    
    // Append to the 'ul'
    $('.cards').append(cardContainer);
  });
    
  app.toggleLoadingScreen();   
}

// Brings up loader as images are rendering
app.toggleLoadingScreen = () => {

  setTimeout(() => {
    $('.loader').removeClass('loadingScreen');
    $('.cards').removeClass('hiddenOnLoad');
  }, 2000);

  $('.loader').addClass('loadingScreen');
  $('.cards').addClass('hiddenOnLoad');
}

// Form Submit Event to user input and pass to API call
app.userSearch = () => {
  $('form').on('submit', function(event){
    event.preventDefault();
    const userInput = $('#search').val();

    app.getSearch(userInput);
  })
}

// API call for search parameter
app.getSearch = (name) => {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: `https://proxy.hackeryou.com/`, 
    data: {
      reqUrl: `${apiUrl}search`,
      params: {
        token: key,
        q: name,
      }
    }
    
  }).then((result) => {

    app.createCards(result.data);
    app.errorMessage();
  })
}

// Error message if search fails
app.errorMessage = () => {
  if ($('.cards').children().length === 0) {
    $('.searchError').removeClass('errorToggle');
  } else {
    $('.searchError').addClass('errorToggle');
  };
}

// Document Ready!
$(document).ready(function(){
  app.init();
});