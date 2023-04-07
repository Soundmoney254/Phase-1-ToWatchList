document.addEventListener("DOMContentLoaded", () => {
//Initialize dom variables 
const movieNameInput = document.querySelector("#movieName");
const yearReleasedInput = document.querySelector("#yearReleased");
const movieInfo = document.querySelector("#movieInfo");
const searchForm = document.querySelector("#searchForm");
const movieTrailer = document.querySelector("#movieTrailer");
const addToWatchlist = document.querySelector("#addToWatchlist");
const definiteWatch = document.querySelector("#definiteWatchList");
const maybeWatch = document.querySelector("#maybeWatchList");
const notMyTaste = document.querySelector("#notMyTasteList");
const savedMovieList = JSON.parse(localStorage.getItem("movieList"));
const apiKey = "k_0pjrunt0";

//A function for rendering a movies Info after fetching the data
async function fetchAndDisplay (movieNameString, yearReleasedNumber){
    let movieName = movieNameString;
    let yearReleased = yearReleasedNumber
    const fetchUrl = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName} ${yearReleased}`
    console.log(fetchUrl);

    //Starting a fetch for 
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
//   fetchAndDisplay("Top Gun: Maverick", 2022);

//A function for rendering movie data to the watchlist div
function renderWatchlist(){
    console.log("addToWatchlist Clicked")
    let rank;
    const radioButtons = document.querySelectorAll("input[type='radio']");
    radioButtons.forEach(button => {
        if (button.checked) {
            rank = button.value;
        }
        return rank;
    });
        let appendMovieName = movieNameInput.value;
        let newMovieList = document.createElement('li');
        newMovieList.textContent = appendMovieName;
        console.log(rank);
        console.log(newMovieList);
        
        if (rank === "definiteWatch") {
            definiteWatch.appendChild(newMovieList);
            console.log("appended child to definiteWatch")
        } else if (rank === "maybeWatch") {
            maybeWatch.appendChild(newMovieList);
            console.log("appended child to maybeWatch");
        } else if (rank === "notMyTaste") {
            notMyTaste.appendChild(newMovieList);
            console.log("appended child to notMyTaste");
        }

        //Saving the movie list to local storage
        function saveLists() {
        const movieList = {
        definiteWatch: definiteWatch.innerHTML,
        maybeWatch: maybeWatch.innerHTML,
        notMyTaste: notMyTaste.innerHTML
        };
        console.log(movieList);
        localStorage.setItem("movieList", JSON.stringify(movieList));
        console.log(`saved to local storage ${movieList}`);
        }
        saveLists();
}

//An event listener to add a movie to the watchlist
addToWatchlist.addEventListener("click",renderWatchlist);

//Check for listed movies stored in local storage
if (savedMovieList) {
    definiteWatch.innerHTML = savedMovieList.definiteWatch;
    maybeWatch.innerHTML = savedMovieList.maybeWatch;
    notMyTaste.innerHTML = savedMovieList.notMyTaste;
}
//Delete Movies stored in localstorege
// localStorage.removeItem("movieList");
});