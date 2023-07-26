const apiKey = "c38356d6";
const searchBtn = document.getElementById("searchBtn");
const movieInput = document.getElementById("movieInput");
const movieDetails = document.getElementById("movieDetails");
const titleButton = document.getElementById("movieTitleBtn");

function fetchMovieData(movieTitle) {
  const apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&t=${encodeURIComponent(movieTitle)}`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      if (data.Response === "False") {
        movieDetails.innerHTML = "<p>Movie not found or invalid input</p>";
      } else {
        const title = data.Title;
        const poster = data.Poster;
        const imdbLink = "https://www.netflix.com/in/";
        titleButton.innerHTML = title;
        titleButton.addEventListener("click", () => {
          window.location.href = imdbLink; // Redirect to the IMDb page
        });
        const html = `
          
          <img src="${poster}" alt="${title} Poster">
        `;
        movieDetails.innerHTML = html;
      }
    })
    .catch((error) => {
      console.error("Error fetching movie data:", error);
    });
}

searchBtn.addEventListener("click", () => {
  titleButton.style.display="block" ;
  const movieTitle = movieInput.value;
  fetchMovieData(movieTitle);
});

movieInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    const movieTitle = movieInput.value;
    fetchMovieData(movieTitle);
  }
});
