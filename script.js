document.addEventListener("DOMContentLoaded", () => {
//Initialize dom variables 
const movieNameInput = document.querySelector("#movieName");
const yearReleasedInput = document.querySelector("#yearReleased");
const movieInfo = document.querySelector("#movieInfo");
const searchForm = document.querySelector("#searchForm");
const movieTrailer = document.querySelector("#movieTrailer");
const addToWatchlist = document.querySelector("#addToWatchlist");
const definiteWatchList = document.querySelector("#definiteWatchList");
const maybeWatchList = document.querySelector("#maybeWatchList");
const notMyTasteList = document.querySelector("#notMyTasteList");
const watchedList = document.querySelector("#watchedList");
const binList = document.querySelector("#binList");
const radioButtons = document.querySelectorAll("input[type='radio']");
const apiKey = "k_k7rhb843";
const loading = document.querySelector("#loading");

retrieveLists(); // Retrive movie lists stored in local storage

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
        await fetchTrailer();
        loading.setAttribute("hidden", "hidden");

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
        await fetchReport();
    } catch (error) {
        alert(`Error fetching data from server. Reload: ${error.message}`);
    };
}
//An event listener for the search form
searchForm.addEventListener("submit", event => {
    event.preventDefault();
    const movieName = movieNameInput.value;
    const yearReleased = yearReleasedInput.value;
    fetchAndDisplay(movieName,yearReleased);
    searchForm.reset();
    loading.setAttribute("hidden", '');
  });

// Test the functions with a movie/Placeholder
fetchAndDisplay("Top Gun: Maverick", 2022);

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
        definiteWatchList.appendChild(newMovieList);
    } else if (rank === "maybeWatch") {
        maybeWatchList.appendChild(newMovieList);
    } else if (rank === "notMyTaste") {
        notMyTasteList.appendChild(newMovieList);
    }

    saveLists();
    searchForm.reset();
    addEventListenersToButtons();
}

//An event listener to add a movie to the watchlist
addToWatchlist.addEventListener("click",renderWatchlist);

//Saving the movie list to local storage
function saveLists() {
    const movieList = {
    definiteWatchSaved: definiteWatchList.innerHTML,
    maybeWatchSaved: maybeWatchList.innerHTML,
    notMyTasteSaved: notMyTasteList.innerHTML
    };
    localStorage.setItem("movieList", JSON.stringify(movieList));
    console.log(`saved to local storage ${movieList}`);
}

//A function to save the already watched to local storage
  function saveAlredyWatched() {
    const alredyWatchedObject = {
        watchedListSaved: watchedList.innerHTML,
    };
    localStorage.setItem("watchedListSaved", JSON.stringify(alredyWatchedObject));
  }

  //A function to save the binlist to local storage
  function saveBinList() {
    const   binListObject = {
      binList: binList.innerHTML,
    };
    localStorage.setItem("binList", JSON.stringify(binListObject));
  }

  function addEventListenersToButtons() {
    const classBinButtons = document.querySelectorAll(".binButton");
    const classWatchedButtons = document.querySelectorAll(".watchedButton");
  
    classBinButtons.forEach(button => {
      button.addEventListener("click", event => {
        let binnedClickedItem = event.target.parentNode;
        console.log(binnedClickedItem);
        binList.appendChild(binnedClickedItem);
        saveLists();
        saveBinList();
        saveAlredyWatched();
        binnedClickedItem.remove();
        retrieveLists();
      });
    });
  
    classWatchedButtons.forEach(button => {
      button.addEventListener("click", event => {
        let watchedClickedItem = event.target.parentNode;
        console.log(watchedClickedItem);
        watchedList.appendChild(watchedClickedItem);
        saveLists();
        saveBinList();
        saveAlredyWatched();
        watchedClickedItem.remove();
        retrieveLists();
      });
    });
  }

//Check for listed movies stored in local storage
async function retrieveLists(){
    const savedMovieList = JSON.parse(localStorage.getItem("movieList"));
    const savedAlredyWatched = JSON.parse(localStorage.getItem("watchedListSaved"));
    const savedBinList = JSON.parse(localStorage.getItem("binList"));
    try{
        if (savedMovieList || savedAlredyWatched || savedBinList) {
            if(savedMovieList){
                definiteWatchList.innerHTML = savedMovieList.definiteWatchSaved;
                maybeWatchList.innerHTML = savedMovieList.maybeWatchSaved;
                notMyTasteList.innerHTML = savedMovieList.notMyTasteSaved;
            };
            if(savedAlredyWatched){
                watchedList.innerHTML = savedAlredyWatched.watchedListSaved;
            };
            if(savedBinList){
                binList.innerHTML = savedBinList.binList;
            };
            addEventListenersToButtons();
        };
    }catch (error) {
        alert(`Error retrieving the saved movie lists from local storage: ${error.message}`);
    };
}

    // An event listener for the delete buttons in the bin and watched lists
    const deletebin = document.querySelector("#deletebin");
    const deleteWatched = document.querySelector("#deleteWatched");

    deletebin.addEventListener("click", () => {
        binList.innerHTML = '';
        saveBinList();
    })

    deleteWatched.addEventListener("click", () => {
        watchedList.innerHTML = '';
        saveAlredyWatched();
    })
});