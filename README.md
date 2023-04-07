<br />
<div align="center">

<h3 align="center">ToWatchList - Watch trailers and save watchlists</h3>

  <p align="center">
    This is a web application allows users to search a movie by its name and the year it was released and get to see the trailer and a movie report with all the important information abouth the movie. Afterwards a user can add the movie to their watchList and save it for when they  will need recommendations again. When a user watches a movie they can push it to their already watched list and if they like a movie no more they can add it to the bin list.
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

### Built With

* HTML: provides the structure of the web page.
* CSS: provides the styling of the web page.
* JavaScript: provides the functionality of the web page.

<!-- GETTING STARTED -->
## Getting Started/Setup
### Installation

1. Clone the repo
   ```sh
     https://github.com/Soundmoney254/Phase-1-ToWatchList
   ```

<!-- USAGE EXAMPLES -->
## Usage

* Download the code files from the repository.
* Open the files on your code editor.
* Start a live server on the index.html file.
* Open the index.html file in a web browser.
* If you encounter an error fetching because of a rate limit Use the following alternative api keys by replacing them in the variable on line 18 of the javascript file.
 ```sh
    apiKeys:
    k_k7rhb843
    k_ui12w03w
    k_q46p3x9h
   ```
* A user can see the placeholder movies' trailer and detailed movie report with all the important information.
* Enter a movie in the search input accompanied with its release year like this examples.
      ```sh
      inception 2010
      titanic 1997
   ```
* After fetching the website will render a movies trailer and it's movie report.
* From there a user can decide to add the movie to their watched list by typing the movies name in the input field, selecting a ranking category and clicking the 'Add to watchlist' button.
* The movie will be added to the watchlist together with buttons to send the movie to the already watched, and bin list.
* All this lists are stored in the browsers locals storage in JSON format and readded back to the page when it loads fully.

<!-- ROADMAP -->
## Features

- The web page has a simple and user-friendly interface.
- The web page allows a user to search either movies or series as long as they are available on IMDB and see their trailer and other  data.
- The web page allows the user save the movies they want to see in their browser and see them later.

## Limitations
* The web page does not persist data to a database and hence clearing the cookies loses the list data.
* IMDB's free api keys rate limit to 100 fetch requests a day for the free version. 
* Use the following alternative api keys by replacing them in the variable on line 18 of the javascript file.
 ```sh
    api Keys:
k_k7rhb843
k_ui12w03w
k_q46p3x9h
   ```

* If you need to create a personal api key follow this link "https://imdb-api.com/Identity/Account/Register" to register and create an apikey and copy it from your profile to line 17

<!-- CONTRIBUTING -->
## Contributing

* Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

<!-- LICENSE -->
## License
* The code is released under the General Public License.
* Feel free to use and modify the code for personal or commercial purposes.

<!-- CONTACT -->
## Author
* This project was created by Samuel Mbugua.