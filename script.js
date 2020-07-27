// When page is loaded Make a default API call and populate page
// Retrieve a selection of plants including names and image and populate the page
// Create html dynamically for card information
// On click onto plant card bring up hidden card with additional information
// Listen for form submit on the search bar and empty page and search API with value, populate page with corresponding plants
// If search request can't be made, have a notice pop up

// Stretch Goal:
// 'pagination' - On scroll to bottom of screen have more cards pop up and be populated by API
// Error handling for spelling of search parameter


$.ajax({
  url: 'http://proxy.hackeryou.com',
  dataType: 'json',
  method: 'GET',
  data: {
    reqUrl: 'https://trefle.io/api/v1/plants/',
    params: {
      token: 'V2xFZkxEWTRQcWJaeUJtTGo3Ynl0QT09',
    }
  }
}).then(function (res) {
  console.log(res)
})

const url = 'https://trefle.io/api/v1/plants/'; 
const otherTHing = 'search';
const searchItem = 'orchid';

