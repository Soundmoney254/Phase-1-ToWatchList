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
const watchedList = document.querySelector("#watchedList");
const binList = document.querySelector("#binList");
const savedMovieList = JSON.parse(localStorage.getItem("movieList"));
const alredyWatched = JSON.parse(localStorage.getItem("alredyWatched"));
const savedBinList = JSON.parse(localStorage.getItem("savedBinList"));
const radioButtons = document.querySelectorAll("input[type='radio']");
const apiKey = "k_0pjrunt0";

//A function for rendering a movies Info after fetching the data
async function fetchAndDisplay (movieNameString, yearReleasedNumber){
    let movieName = movieNameString;
    let yearReleased = yearReleasedNumber
    const fetchUrl = `https://imdb-api.com/en/API/SearchMovie/${apiKey}/${movieName} ${yearReleased}`
    console.log(fetchUrl);

    //Starting a fetch for the movie ID
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
            alert("Movie Info loaded successfully scroll down to view")
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
// fetchAndDisplay("Top Gun: Maverick", 2022);

//A function for rendering movie data to the watchlist div
function renderWatchlist(){
    console.log("addToWatchlist Clicked")
    let rank;
    radioButtons.forEach(button => {
        if (button.checked) {
            rank = button.value;
        }
        return rank;
    });
    let appendMovieName = movieNameInput.value;
    if (!appendMovieName) {
        alert("Add the name of the movie to be added in the input field")
        return;
      }
      
    let newMovieList = document.createElement('li');
    let watchedButton = document.createElement('button');
    watchedButton.classList.add("watchedButton");
    let binButton = document.createElement('button');
    binButton.classList.add("binButton");
    
    watchedButton.textContent = "Watched";
    binButton.textContent = "Bin";
    newMovieList.textContent = `${appendMovieName}     `;

    newMovieList.appendChild(watchedButton);
    newMovieList.appendChild(binButton);

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

    saveLists();

//An event listener to add a movie to the watchlist button
addToWatchlist.addEventListener("click",renderWatchlist);

// An event listener for the bin button
binButton.addEventListener("click",  () => {
  const listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
  bin.appendChild(listItem);
  saveLists();
});

// An event listener for the watched button
watchedButton.addEventListener("click", () => {
  const listItem = this.parentNode;
  listItem.parentNode.removeChild(listItem);
  bin.appendChild(listItem);
  watched.appendChild(listItem);
  saveLists();
});   
}
//An event listener to add a movie to the watchlist
addToWatchlist.addEventListener("click",renderWatchlist);


//A function to save the already watched to local storage
  function saveAlredyWatched() {
    const alredyWatched = {
        watchedList: watchedList.innerHTML,
    };
    localStorage.setItem("alredyWatched", JSON.stringify(alredyWatched));
  }
  saveAlredyWatched();

  //A function to save the binlist to local storage
  function saveBinList() {
    const   saveBinList = {
      bin: binList.innerHTML,
    };
    localStorage.setItem("savedBinList", JSON.stringify(saveBinList));
  }
  saveBinList();

  //Check for listed movies stored in local storage
if (savedMovieList || alredyWatched || savedbinList) {
    definiteWatch.innerHTML = savedMovieList.definiteWatch;
    maybeWatch.innerHTML = savedMovieList.maybeWatch;
    notMyTaste.innerHTML = savedMovieList.notMyTaste;
    binList.innerHTML = savedBinList.savedbinList;
    watchedList.innerHTML = alredyWatched.watchedList;
};


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

    function addEventListenersToButtons() {
    const classBinButtons = document.querySelectorAll(".binButton");
    const classWatchedButtons = document.querySelectorAll(".watchedButton");
  
    classBinButtons.forEach(button => {
      button.addEventListener('click', function() {
        const listItem = this.parentNode;
        listItem.parentNode.removeChild(listItem);
        bin.appendChild(listItem);
        saveLists();
        saveBinList()
      });
    });
  
    classWatchedButtons.forEach(button => {
      button.addEventListener('click', function() {
        const listItem = this.parentNode;
        listItem.parentNode.removeChild(listItem);
        bin.appendChild(listItem);
        watched.appendChild(listItem);
        saveLists();
        saveAlredyWatched();
      });
    });
  }
  addEventListenersToButtons();
});