// When page is loaded Make a default API call
// Retrieve a selection of plants including names and image and populate page dynamically
// On click onto plant card bring up hidden card with additional information
// Listen for form submit on the search bar and empty page and search API with value, populate page with corresponding plants
// If search request can't be made show an error

const app = {};

// Api Key & URL
const key = 'V2xFZkxEWTRQcWJaeUJtTGo3Ynl0QT09';
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
    url: 'http://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
      reqUrl: apiUrl,
      params: {
        token: key
      }
    }
  }).then(function (result) {
    
    app.createCards(result.data);

  })
}

// Notates through data to append onto the page 'ul'
app.createCards = (res) => {
  $('.cardFront').empty();

  // Iterates through data array and dynamically creates elements for plant cards
  res.forEach((arr) => { 

    const commonName = arr.common_name;
    let trimmedCommonName = commonName;

    // Error handling to check if the Common Name will fit on the front 'li' 
    if (trimmedCommonName.length > 21) {
      console.log('worw')
      trimmedCommonName = trimmedCommonName.slice(0, 19) + '...';
    };

    // Front of card
    const name = $('<div>').addClass('frontNameContainer').append($('<h2>').text(trimmedCommonName));
    let image = $('<div>').addClass('frontImageContainer').append($('<img>').attr('src', arr.image_url).attr('alt', commonName));
    
    // Back of card
    let imageBack = $('<div>').addClass('overlayImageContainer').append($('<img>').attr('src', arr.image_url).attr('alt', commonName));
    const nameFront = $('<h3>').html(`<span>Common Name:</span> ${commonName}`);
    const genus = $('<p>').html(`<span>Genus:</span> ${arr.genus}`);
    const family = $('<p>').html(`<span>Family:</span> ${arr.family} '${arr.family_common_name}'`);
    const sciName = $('<p>').html(`<span>Scientific Name:</span> ${arr.scientific_name}`);
    const closeButton = $('<button title="Close">').append('<i class="fas fa-times"></i>');
    const textBox = $('<div>').addClass('overlayTextContainer').append(closeButton, nameFront, sciName, genus, family);

    // No image available error handling
    if (!arr.image_url) {
      image = $('<div>').addClass('frontImageContainer').append($('<img>').attr('src', 'assets/errorImage.png').attr('alt', commonName));
      imageBack = $('<div>').addClass('overlayImageContainer').append($('<img>').attr('src', 'assets/errorImage.png').attr('alt', commonName));
    }
    
    // Overlay Card Package
    const cardBack = $('<div>').addClass('overlayContainer hide').append(imageBack, textBox);
    
    // Front Card Package with Overlay Package as a hidden child
    const card = $('<li>').attr('tabindex', '0').append(image, name, cardBack);
    
    $('.cardFront').append(card);

  });
    
  // Give the images a chance to render before hiding loading screen
  setTimeout(() => {
    app.toggleLoadingScreen();    
  }, 2000);
  
  app.overlayToggle();
}

// Listen for 'li' click and reveal additional information for the card that was clicked
app.overlayToggle = function() {
  $('.overlayContainer').addClass('hide');

  $('.cardFront').on('click', 'li', $('li').keydown(), function() {
    $(this).children('.overlayContainer').toggleClass('hide');
  }) 

  $('.cardFront').on('keydown', 'li', function() {
    $(this).children('.overlayContainer').toggleClass('hide');
  })

  // Why does this not work wtf
  // $('.cardFront').on('click', 'button', function() {
  //   $('.overlayContainer').addClass('hide');
  // })
}

// Form Submit Event to pass on user search input
app.userSearch = () => {
  $('form').on('submit', function(event){
    event.preventDefault();
    const userInput = $('#search').val();
    
    // Pass userInput into ajax call
    app.getData(userInput);
  })
}

// Api call for search parameter
app.getData = (name) => {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: `http://proxy.hackeryou.com/`, 
    data: {
      reqUrl: `${apiUrl}search`,
      params: {
        token: key,
        q: name,
      }
    }
    
  }).then((result) => {

    app.toggleLoadingScreen();
    // $('.cardFront').empty();
    app.createCards(result.data);
    app.errorMessage();
  })

}

// Error message if search fails
app.errorMessage = () => {
  if ($('.cardFront').children().length === 0) {
    $('nav p').removeClass('errorToggle');
  } else {
    $('nav p').addClass('errorToggle');
  };
}

// Brings up loader as images are rendering
app.toggleLoadingScreen = () => {
  $('.loader').toggleClass('loadingScreen');
  $('.cardFront').toggleClass('hiddenOnLoad');
}


// Document Ready!
$(document).ready(function(){
  app.init();
});