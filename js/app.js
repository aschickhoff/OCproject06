const apiUrl = "http://localhost:8000/api/v1/titles/";

function showBestMovie() {
  let bestMovieTitle = document.getElementById("best-title");
  let bestMovieSummary = document.getElementById("best-summary");
  let bestMovieImage = document.getElementById("best-image");
  let url = apiUrl + "?sort_by=-imdb_score";
  let infoBtn = document.getElementById("info");

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let movieUrl = data["results"][0]["url"];
      fetch(movieUrl)
        .then((res) => res.json())
        .then((data) => {
          bestMovieTitle.innerHTML = data["title"];
          bestMovieSummary.innerHTML = data["description"];
          bestMovieImage.src = data["image_url"];
          bestMovieImage.id = data["id"];

          infoBtn.addEventListener("click", () => {
            showModal(bestMovieImage.id);
          });
        });
    });
}

function showMovies(genre) {
  let counter = 0;
  let translate_state = 0;
  let leftBtn = document.querySelector("#" + genre + "ButtonLeft");
  let rightBtn = document.querySelector("#" + genre + "ButtonRight");
  let carouselSlide = document.querySelector("#genre_" + genre);

  let url = apiUrl + "?sort_by=-imdb_score&genre=" + genre;
  let urlTwo = apiUrl + "?sort_by=-imdb_score&genre=" + genre + "&page=2";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      let pageOne = data["results"];

      fetch(urlTwo)
        .then((res) => res.json())
        .then((data) => {
          let pageTwo = data["results"];
          let urlMain = pageOne.concat(pageTwo);
          if (genre == "") {
            for (let i = 1; i < 8; i++) {
              let movieId = urlMain[i]["id"];
              let movieImage = urlMain[i]["image_url"];
              let showMovieImage = document.createElement("img");
              showMovieImage.id = movieId;
              showMovieImage.src = movieImage;
              showMovieImage.className = "movieThumbnail";

              let carousel = document.getElementById("genre_" + genre);
              carousel.appendChild(showMovieImage);
              openModal(movieId);
            }
          } else {
            for (let i = 0; i < 7; i++) {
              let movieId = urlMain[i]["id"];
              let movieImage = urlMain[i]["image_url"];
              let showMovieImage = document.createElement("img");
              showMovieImage.id = movieId;
              showMovieImage.src = movieImage;
              showMovieImage.className = "movieThumbnail";

              let carousel = document.getElementById("genre_" + genre);
              carousel.appendChild(showMovieImage);
              openModal(movieId);
            }
          }
        });
    });

  rightBtn.addEventListener("click", () => {
    if (counter <= -3) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter--;
    translate_state = translate_state - 25;
    carouselSlide.style.transform = "translateX(" + translate_state + "%)";
  });

  leftBtn.addEventListener("click", () => {
    if (counter >= 0) return;
    carouselSlide.style.transition = "transform 0.4s ease-in-out";
    counter++;
    translate_state = translate_state + 25;
    carouselSlide.style.transform = "translateX(" + translate_state + "%)";
  });
}

function openModal(movieId) {
  document.getElementById(movieId).onclick = function () {
    console.log(this.id);
    showModal(this.id);
  };
}

function showModal(id) {
  let modalBg = document.querySelector(".modal-bg");
  let modalId = id;
  let modalClose = document.querySelector(".modal-close");

  fetch(apiUrl + modalId)
    .then((res) => res.json())
    .then((data) => {
      document.getElementById("mimage").src = data["image_url"];
      document.getElementById("movie-title").innerHTML = data["original_title"];
      document.getElementById("movie-genre").innerHTML = data["genres"];
      document.getElementById("release-date").innerHTML =
        data["date_published"];
      document.getElementById("mpaa-rating").innerHTML = data["rated"];
      document.getElementById("imdb-score").innerHTML = data["imdb_score"];
      document.getElementById("movie-director").innerHTML = data["directors"];
      document.getElementById("movie-actors").innerHTML = data["actors"];
      document.getElementById("movie-duration").innerHTML =
        data["duration"] + " min";
      document.getElementById("movie-origin").innerHTML = data["countries"];
      let movieBoxOffice = document.getElementById("movie-office-result");
      if (data["worldwide_gross_income"] == null)
        movieBoxOffice.innerHTML = "not available";
      else movieBoxOffice.innerHTML = "$" + data["worldwide_gross_income"];
      document.getElementById("movie-summary").innerHTML = data["description"];
    });

  modalClose.addEventListener("click", () => {
    modalBg.classList.remove("bg-active");
  });
  modalBg.classList.add("bg-active");
  window.onclick = function (event) {
    if (event.target == modalBg) modalBg.classList.remove("bg-active");
  };
}

function main() {
  showBestMovie();
  showMovies("");
  showMovies("crime");
  showMovies("fantasy");
  showMovies("adventure");
}

main();
