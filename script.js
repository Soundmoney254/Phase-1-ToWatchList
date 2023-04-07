//Initialize dom variables 
const movieNameInput = document.querySelector("#movieName");
const yearReleasedInput = document.querySelector("#yearReleased");
const movieInfo = document.querySelector("#movieInfo");
const searchForm = document.querySelector("#searchForm");
const movieTrailer = document.querySelector("#movieTrailer");
const apiKey = 'k_k7rhb843';

//A function for rendering a movies Info after fetching the data
async function fetchAndDisplay (movieNameString, yearReleasedNumber){
    let movieName = movieNameString;
    let yearReleased = yearReleasedNumber
    const fetchUrl = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName} ${yearReleased}`
    
    console.log(fetchUrl);
    try{
        const response = await fetch(fetchUrl);
        const data = await response.json();
        if (data.errorMessage) {
            throw new Error(`Unable to fetch the movie ID: ${data.errorMessage}`);
          }
        console.log(data);

        const movieId = data.results[0].id;
        console.log(movieId);

        const fetchTrailerUrl = `https://imdb-api.com/en/API/Trailer/${apiKey}/${movieId}`
        const fetchMovieReportUrl = `https://imdb-api.com/en/API/Report/${apiKey}/${movieId}/FullActor,Ratings`

        console.log(`Trailer link: ${fetchTrailerUrl}`);
        console.log(`Movie Report link: ${fetchMovieReportUrl}`);
        
        // A function for fetching and rendering the trailer
        async function fetchTrailer(){
        let trailerResponse = await fetch(fetchTrailerUrl);
        let trailerData = await trailerResponse.json();
        if (trailerData.errorMessage) {
            throw new Error(`Unable to fetch trailer: ${trailerData.errorMessage}`);
          }
        console.log(trailerData);
        let trailer = trailerData.linkEmbed
        console.log(`Trailer Embed Link${trailer}`)

        movieTrailer.innerHTML = `
        <iframe src="${trailer}" width="560" height="315" frameborder="0" allowfullscreen></iframe>
        `;
        }
        
        fetchTrailer();


        

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

  // Test the function with a movie
  fetchAndDisplay("Top Gun: Maverick", 2022);