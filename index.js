// http://www.omdbapi.com/?i=tt3896198&apikey=1fd6092d

document.addEventListener('DOMContentLoaded', function() {
});

function setupSearchListener(searchBarId, callback) { // Callback function from the search bar
  const searchBar = document.getElementById(searchBarId);
  searchBar.addEventListener('search', function() {
    const searchTerm = searchBar.value;
    callback(searchTerm); // Call the callback function with the searchTerm
  });
}

setupSearchListener('search__bar', handleSearchTerm);

let result // make result global so we can use it in other functions

// Use the search term to fetch the data
async function handleSearchTerm(searchTerm) { 
  // Fetch the data from the API
  loadingStateOn();
  const url = await fetch(`https://www.omdbapi.com/?apikey=1fd6092d&s=${searchTerm}`);
  result = await url.json();
  const movieElement = document.querySelector(".movies");
  movieElement.innerHTML = result.Search.slice(0, 6).map((result) => movieHTML(result)).join("");
  setTimeout(() => {
  showDiv()
  const resultSection = document.querySelector('.search__nav')
  resultSection.scrollIntoView({behavior: 'smooth', block: 'start'});
}, 1000);
loadingStateOff()
}

// Search on click function
const searchButton = document.querySelector('.search__button');
searchButton.addEventListener('click', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const searchTerm = document.querySelector('#search__bar').value;
  // Run search
  handleSearchTerm(searchTerm)
}

// Fetch the movie imdb data to use on click
function showMovieImdb(imdb) {
  localStorage.setItem('movieImdb', imdb);
  window.location.href = `${window.location.origin}/movie.html`
  console.log(imdb);
}

function movieHTML(result) {  // Create the HTML for the movie
  return `<div class="movie" onClick="showMovieImdb('${result.imdbID}')">
            <div class="movie__title">
              <div class="movie__title--wrapper">
                <h3>${result.Title}</h3>
                    <p>Released: ${result.Year}</p>
                    <p>Type: ${result.Type}</p>
                    <p>IMDB: ${result.imdbID}</p>
              </div>
            </div>
              <div class="movie__poster--wrapper">
                <img class="movie__poster" src="${result.Poster}" alt="">
              </div>
            </div>
            `;
}

// Sort movies by year either low to high or high to low
function sortMovies(event) {
    if (event.target.value === 'LOW_TO_HIGH') {
      result.Search.sort((a, b) => a.Year - b.Year);
    } else if (event.target.value === 'HIGH_TO_LOW') {
      result.Search.sort((a, b) => b.Year - a.Year);
    }
    const movieElement = document.querySelector(".movies");
    movieElement.innerHTML = result.Search.slice(0, 6).map((result) => movieHTML(result)).join("");
  }

// Show the results section when triggered
function showDiv() {
  const myDiv = document.getElementById('movies__section');
  myDiv.style.display = 'block';
}

function searchOverlay () {
  const loading = document.getElementsByClassName('search__button');
  const success = document.getElementsByClassName('search__button');
}

// Hide magnifying icon when triggered
function loadingStateOn() {
  const magGlass = document.getElementById("magnifying-glass");
  magGlass.style.visibility = 'hidden';
  const spinner = document.getElementById("spinner")
  spinner.style.visibility = "visible"
}

// Show magnifying icon when triggered
function loadingStateOff() {
  const magGlass = document.getElementById("magnifying-glass");
  magGlass.style.visibility = 'visible';
  const spinner = document.getElementById("spinner")
  spinner.style.visibility = "hidden"
}