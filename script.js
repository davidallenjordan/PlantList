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
  app.getPlants();
}
const key = 'V2xFZkxEWTRQcWJaeUJtTGo3Ynl0QT09';
const apiUrl = 'https://trefle.io/api/v1/plants/';

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



app.cardFront = (res) => {

  // Iterates through data array and dynamically creates elements for plant cards
  res.forEach((arr) => {
    console.log(arr);
    
    // Front of card
    const commonName = arr.common_name;
    const name = $('<div>').addClass('frontNameContainer').append($('<h2>').text(commonName));
    const image = $('<div>').addClass('frontImageContainer').append($('<img>').attr('src', arr.image_url).attr('alt', commonName));
    
    
    // Back of card
    const imageBack = $('<div>').addClass('overlayImageContainer').append($('<img>').attr('src', arr.image_url).attr('alt', commonName));
    const nameFront = $('<h3>').html(`Common Name: <span>${commonName}</span>`);
    const genus = $('<p>').text(`Genus: ${arr.genus}`);
    const family = $('<p>').text(`Family: ${arr.family} '${arr.family_common_name}'`);
    const sciName = $('<p>').text(`Scientific Name: ${arr.scientific_name}`);
    const textBox = $('<div>').addClass('overlayTextContainer').append(nameFront, sciName, genus, family);

    
    
    const cardBack = $('<div>').addClass('overlayContainer').addClass('overlayToggle').append(imageBack, textBox);
    
    const card = $('<li>').append(image, name, cardBack);
    
    $('.cardFront').append(card);

  
  });
  
  app.cardClick(res);

}

function getData (name) {
  $.ajax({
    method: 'GET',
    dataType: 'json',
    url: `http://proxy.hackeryou.com/`, // need help finding this on api
    data: {
      reqUrl: `${apiUrl}search`,
      params: {
        token: key,
        q: name,
      }
    }
    }).then((result) => {
      $('ul').empty();
      console.log('it works!', result)
      app.cardFront(result.data);
    })
}

$('form').on('submit', function(event){
  event.preventDefault();
  console.log('submitted');
  const userInput = $('#search').val();
  console.log(userInput);

  // Pass userInput into ajax call
  
  getData(userInput);
  
})


  //<------ If no picture available we could put up a default pic "sorry no image available" ------->

  // <-------- Have another click option on the overlay image to open a new window with just the full photo --->
  

// Listen for 'li' click and reveal additional information for the card that was clicked
app.cardClick = function() {
    $('li').on('click', function() {

      $(this).children('.overlayContainer').toggleClass('overlayToggle');
      console.log($(this));

    })
}


$(document).ready(function(){
  app.init();
});