// When page is loaded Make a default API call and populate page
// Retrieve a selection of plants including names and image and populate the page
// Create html dynamically for card information
// On click onto plant card bring up hidden card with additional information
// Listen for form submit on the search bar and empty page and search API with value, populate page with corresponding plants
// If search request can't be made, have a notice pop up

// Stretch Goal:
// 'pagination' - On scroll to bottom of screen have more cards pop up and be populated by API
// Error handling for spelling of search parameter








const app = {};


app.init = () => {
  app.clearSearch()
  app.getPlants();

}
const key = 'V2xFZkxEWTRQcWJaeUJtTGo3Ynl0QT09';
const apiUrl = 'https://trefle.io/api/v1/plants/';

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
    
    // const apiResults = result.data;
    console.log(result);

    const plantList = [];

    for(let i = 0; i <= 19; i++) {
      plantList.push(result.data[i]);
    }
    console.log(plantList);

    app.cardFront(plantList);
  })
}


// Notates through data to append onto the page 'ul'
app.cardFront = (res) => {

  // Iterates through data array and dynamically creates elements for plant cards
  res.forEach((arr) => { 

    const commonName = arr.common_name;
    
    // Front of card
    const name = $('<div>').addClass('frontNameContainer').append($('<h2>').text(commonName));
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
    const cardBack = $('<div>').addClass('overlayContainer').addClass('hide').append(imageBack, textBox);
    
    // Front Card Package with Overlay Package as a hidden child
    const card = $('<li>').append(image, name, cardBack);
    
    $('.cardFront').append(card);
    
  });
    
  // Give the images a chance to render before hiding loading screen
  setTimeout(() => {
    app.toggleLoadingScreen();    
  }, 2000);
  
  // Add a jquery action to change class and reveal page
  app.overlayToggle();
}



// Listen for 'li' click and reveal additional information for the card that was clicked
app.overlayToggle = function() {

  $('.cardFront').on('click', 'li', function() {
    // $('.overlayContainer').addClass('hide');
    $(this).children('.overlayContainer').toggleClass('hide');
  }) 

  // Why does this not work wtf
  // $('.cardFront').on('click', 'button', function() {
  //   $('.overlayContainer').addClass('hide');
  // })
}

//Listen to click on the img to open new tab
// app.openNewTab = function() {
//   $('overlayContainer').on('click', 'img', function(event) {
//     event.preventDefault();
//     console.log('the clicky worked!')
//   })
// }

function getData (name) {
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
    $('.cardFront').empty();
    console.log('it works!', result)
    app.toggleLoadingScreen();
    app.cardFront(result.data);
    
    // Error message if search fails
    if ($('.cardFront').children().length === 0) {
      alert(`oops! We don't have what you're looking for!`)
    }; 
  })
}

// Brings up loader as images are rendering
app.toggleLoadingScreen = () => {
  $('.loader').toggleClass('loadingScreen');
  $('.cardFront').toggleClass('hiddenOnLoad');
}


$('form').on('submit', function(event){
  event.preventDefault();
  const userInput = $('#search').val();
  
  // Pass userInput into ajax call

  getData(userInput);

})



$(document).ready(function(){
  app.init();
});