async function showMovie() {
  const movieImdb = localStorage.getItem("movieImdb");
  const url = await fetch(
    `https://www.omdbapi.com/?apikey=1fd6092d&i=${movieImdb}`
  );
  const result = await url.json();
  console.log(result);
  const movieElement = document.querySelector("#fullMovieDb");
  movieElement.innerHTML = fullMovie(result);
}

showMovie();

function fullMovie(result) {
  return `<section id="fullMovieDb">
    <h1 class="title">${result.Title}</h1>
    <div class="line"></div>
    <div class="movie__container">
      <div class="image__container">
        <img
          src="${result.Poster}"
          alt=""
          class="movie__image"
        />
      </div>
      <div class="movie__details">
        <h2>Movie Details</h2>
        <div class="line"></div>
        <div class="movie__details__container">
          <div class="movie__details__wrapper">
            <h3>Release Date:</h3>
            <p>${result.Released}</p>
          </div>
          <div class="movie__details__wrapper">
            <h3>Genre:</h3>
            <p>${result.Genre}</p>
          </div>
          <div class="movie__details__wrapper">
            <h3>Director:</h3>
            <p>${result.Director}</p>
          </div>
          <div class="movie__details__wrapper">
            <h3>Cast:</h3>
            <p>${result.Actors}</p>
          </div>
          <div class="movie__details__wrapper">
            <h3>Plot:</h3>
            <p>${result.Plot}</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;
}
