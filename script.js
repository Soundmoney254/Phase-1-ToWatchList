//Initialize dom variables 
const movieName = document.querySelector("#movieName");
const yearReleased = document.querySelector("#yearReleased");
const movieInfo = document.querySelector("#movieInfo");
const searchForm = document.querySelector("#searchForm");
const fetchUrl =  `https://imdb-api.com/en-US/k_k7rhb843/searchMovie?expression=${movieNameInput}&year=${yearReleasedInput}`;

//A function for rendering a movies Info after fetching the data
async function fetchAndDisplay (movieNameInput, yearReleasedInput){
    try{
        const response = await fetch(fetchUrl);
        const data = await response.json();
        console.log(data);

        const synopsis = data.plot;
        const actors = data.actors;
        const rating = data.ratings.rating;
        const trailer = data.trailer.link;

        console.log(`Synopsis: ${synopsis}`);
        console.log(`Main actors: ${actors}`);
        console.log(`Rating: ${rating}`);
        console.log(`Trailer: ${trailer}`);

    } catch (error) {
        alert(`Error fetching data : ${error.message}`);
    };
}
//An event listener for the search form
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const movieNameInput = movieName.value;
    const yearReleasedInput = yearReleased.value;

    fetchAndDisplay(movieNameInput,yearReleasedInput);
  });