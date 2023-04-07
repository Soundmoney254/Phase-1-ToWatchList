document.addEventListener("DOMContentLoaded", () => {
//Initialize dom variables 
const movieNameInput = document.querySelector("#movieName");
const yearReleasedInput = document.querySelector("#yearReleased");
const movieInfo = document.querySelector("#movieInfo");
const searchForm = document.querySelector("#searchForm");
const movieTrailer = document.querySelector("#movieTrailer");
const addToWatchlist = document.querySelector("#addToWatchlist");
const rankMovies = document.querySelector("#rankMovies");
const definiteWatch = document.querySelector("#definiteWatch");
const maybeWatch = document.querySelector("#maybeWatch");
const notMyTaste = document.querySelector("#notMyTaste");
const apiKey = "k_ui12w03w";

//A function for rendering a movies Info after fetching the data
async function fetchAndDisplay (movieNameString, yearReleasedNumber){
    let movieName = movieNameString;
    let yearReleased = yearReleasedNumber
    const fetchUrl = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName} ${yearReleased}`
    console.log(fetchUrl);

    //An event listener to add a movie to the watchlist
    addToWatchlist.addEventListener("click",() => {
        console.log("addToWatchlist Clicked")
        const rank = rankMovies.value;
    
        if (rank === "definiteWatch") {
            definiteWatch.innerHTML = `<li>${movieName}</li>`;
        } else if (rank === "maybeWatch") {
            maybeWatch.innerHTML = `<li>${movieName}</li>`;
        } else if (rank === "notMyTaste") {
            notMyTaste.innerHTML = `<li>${movieName}</li>`;
        }
    });

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
        console.log(`Trailer Embed Link: ${trailer}`)

        movieTrailer.innerHTML = `
        <h2>The Trailer</h2>
        <iframe src="${trailer}" width="900px" height="900px" frameborder="0" allowfullscreen></iframe>
        `;
        }
        fetchTrailer();

        // A function for fetching and rendering the movie Information PNG
        async function fetchReport(){
            let reportResponse = await fetch(fetchMovieReportUrl);
            if (!reportResponse.ok) {
                throw new Error(`Unable to fetch movie report. Response status: ${reportResponse.status}`);
              }
            let reportBlob = await reportResponse.blob();
            let reportUrl = URL.createObjectURL(reportBlob);
            console.log(`Report PNG: ${reportUrl}`)
            movieInfo.innerHTML = `
            <img src="${reportUrl}" alt="The movie report" width="auto">`
        }
        fetchReport();

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
    form.reset();
  });

  // Test the functions with a movie/Placeholder
  fetchAndDisplay("Top Gun: Maverick", 2022);
});