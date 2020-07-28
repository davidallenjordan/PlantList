// When page is loaded Make a default API call and populate page
// Retrieve a selection of plants including names and image and populate the page
// Create html dynamically for card information
// On click onto plant card bring up hidden card with additional information
// Listen for form submit on the search bar and empty page and search API with value, populate page with corresponding plants
// If search request can't be made, have a notice pop up

// Stretch Goal:
// 'pagination' - On scroll to bottom of screen have more cards pop up and be populated by API
// Error handling for spelling of search parameter







const url = 'https://trefle.io/api/v1/plants/'; 
const otherTHing = 'search';
const searchItem = 'orchid';


const app = {};
const key = 'V2xFZkxEWTRQcWJaeUJtTGo3Ynl0QT09';
const apiUrl = 'https://trefle.io/api/v1/plants/';

app.init = () => {
  app.getPlants();
}

app.getPlants = () => {

const query = '';

  $.ajax({
    url: 'http://proxy.hackeryou.com',
    dataType: 'json',
    method: 'GET',
    data: {
      reqUrl: apiUrl,
      params: {
        token: key,
        // q: query,
      }
    }
  }).then(function (res) {
    console.log(res);
    app.displayImages(res);
  })
}

app.displayImages = (data) => {
  // const apiResults = data;

  app.forEach(function() {
    // const image = $('<img>').attr('src',data.image_url);
    const name = $('<h2>').text(data[0].common_name);
    console.log('hi')
  })
}


$(document).ready(function(){
  app.init();
})

