//Initialize dom variables 
const movieNameInput = document.querySelector("#movieName");
const yearReleasedInput = document.querySelector("#yearReleased");
const movieInfo = document.querySelector("#movieInfo");
const searchForm = document.querySelector("#searchForm");

const apiKey = 'k_k7rhb843';
const movieDetailsUrl = `https://imdb-api.com/en/API/Ratings/k_k7rhb843/{movieId}`;


//A function for rendering a movies Info after fetching the data
async function fetchAndDisplay (movieNameString, yearReleasedNumber){
    let movieName = movieNameString;
    let yearReleased = yearReleasedNumber
    const fetchUrl = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName} ${yearReleased}`
    console.log(fetchUrl)
    try{
        const response = await fetch(fetchUrl);
        const data = await response.json();
        if (data.errorMessage) {
            throw new Error(data.errorMessage);
          }
        console.log(data);

        const movieId = data.results[0].id;
        console.log(movieId);

        

        const synopsis = data.plot;
        const actors = data.actors;
        // const rating = data.ratings.rating;
        // const trailer = data.trailer.link;

        console.log(`Synopsis: ${synopsis}`);
        console.log(`Main actors: ${actors}`);
        console.log(`Rating: ${rating}`);
        console.log(`Trailer: ${trailer}`);

        // Update movie info div with the fetched data
        movieInfo.innerHTML = `
        <h2>${data.title} (${data.year})</h2>
        <img src="${data.image}" alt="${data.title} poster" width="200">
        <p>${synopsis}</p>
        <p>Actors: ${actors}</p>
        <p>Rating: ${rating}</p>
        <iframe src="${trailer}" width="560" height="315" frameborder="0" allowfullscreen></iframe>
        `;

    } catch (error) {
        alert(`Error fetching data : ${error.message}`);
    };
}
//An event listener for the search form
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const movieName = movieNameInput.value;
    const yearReleased = yearReleasedInput.value;

    fetchAndDisplay(movieName,yearReleased);
  });

  // Example usage:
  fetchAndDisplay("Top Gun: Maverick", 2022)
.then(details => console.log(details))
.catch(error => console.error(error));