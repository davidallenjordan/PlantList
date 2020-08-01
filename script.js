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
    const name = $('<div>').addClass('nameContainer').append($('<h2>').text(commonName));
    const image = $('<div>').addClass('imageContainer').append($('<img>').attr('src', arr.image_url).attr('alt', commonName));
    
    
    // Back of card
    const imageBack = $('<div>').addClass('backImageContainer').append($('<img>').attr('src', arr.image_url).attr('alt', commonName));
    const nameFront = $('<h3>').text(`Common Name: ${commonName}`);
    const genus = $('<p>').text(`Genus: ${arr.genus}`);
    const family = $('<p>').text(`Family: ${arr.family} '${arr.family_common_name}'`);
    const sciName = $('<p>').text(`Scientific Name: ${arr.scientific_name}`);
    const textBox = $('<div>').addClass('textContainer').append(nameFront, sciName, genus, family);

    
    
    const cardBack = $('<div>').addClass('cardBackContainer').addClass('cardBackToggle').append(imageBack, textBox);
    
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

  //pass userInput into ajax call
  
  getData(userInput);
  
  //    if (userInput === common_name) {
  //     getData(common_name)
  // } else {
  // this else will catch both an empty string and anything that doesn't match common_name
    // console.error('sorry, something went wrong')
  // }
})
  
  //function for search by name bar
  

// Listen for 'li' click and reveal additional information
app.cardClick = function() {
    $('li').on('click', function() {
      // Find the array # of the card being clicked and display info

      $(this).children('.cardBackContainer').toggleClass('cardBackToggle');
      console.log($(this));

    })
}


$(document).ready(function(){
  app.init();
});