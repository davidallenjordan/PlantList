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
        token: key,
      }
    }
  }).then(function (result) {
    const apiResults = result.data;
    console.log(result);
    app.cardFront(apiResults);
  })
}

app.cardFront = (res) => {
  console.log(res);

  // Iterates through data array and dynamically creates elements for plant cards
  res.forEach((arr) => {
    console.log(arr);

    // Main card information
    const commonName = arr.common_name;
    
    const name = $('<div>').addClass('nameContainer').append($('<h2>').text(commonName));
    const image = $('<div>').addClass('imageContainer').append($('<img>').attr('src', arr.image_url).attr('alt', commonName));

    const card = $('<li>').append(image, name);

    $('ul').append(card);
  });
  
  app.cardClick(res, name, image);

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
  

// Listen for 'li' click and bring up additional information from API
// app.cardClick = (res, name, image) => {
//     $('li').on('click', () => {

//       const card = $('<div>')

//       <div>        
//         <div>
//           <img></img>
//         </div>

//         <div class="textContainer">
//           <h2>${name}</h2>
//           <p>botanical name</p>
//           <p>more info</p>
//           <p>soil type</p>
//           <p>country of origin</p>
//         </div>

//       </div>

//     })
    
//   }

  // app.cardReverse(res, name, image);
// app.cardReverse = (res, name, image) => {

//   // res.forEach((arr) => {
//   // })
// }


$(document).ready(function(){
  app.init();
});