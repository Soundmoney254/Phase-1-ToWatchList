//Initialize dom variables 
const movieName = document.querySelector("#movieName");
const yearReleased = document.querySelector("#yearReleased");
const movieInfo = document.querySelector("#movieInfo");
const fetchUrl =  `https://imdb-api.com/en-US/k_k7rhb843/searchMovie?expression=${movieName}&year=${releaseYear}`


//A function for rendering a movies Info after fetching the data
async function fetchAndDisplay (){
    try{
        const response = await fetch(fetchUrl);
        const data = await response.json();
        console.log(data);

    } catch (error) {
        alert(`Error Fetch data : ${error.message}`);
    };
}