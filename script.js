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


app.getPlants = () => {
  const key = 'V2xFZkxEWTRQcWJaeUJtTGo3Ynl0QT09';
  const apiUrl = 'https://trefle.io/api/v1/plants/';

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

//function for search by name bar
$('form').on('submit', function(event){
  event.preventDefault();
  console.log('submitted');

  const userInput = $(name).val();
  console.log(userInput);
  // name.filter(searchName => {
  //   name.container(userInput)
  // })

  if (userInput === name) {
    console.log('display info')
  } else {
    console.log('sorry, there is an error!')
  }

})

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
})

