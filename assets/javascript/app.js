$(document).ready(() => {
    $("#movie-view").html("<p class='text-center'>Need some ideas? Search for one of my favorite movies:</p>");
    myFavorites();
});

$("#find-movie").on("click", (event) => {

    event.preventDefault();

    const movie = $("#movie-input").val();
    $("#movie-input").val("");
    const queryURL = "https://api.themoviedb.org/3/search/movie?query=" + movie + "&api_key=75f535f5e5c1d23e72fcdbe931044574";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((response) => {
       if (response.results[0]) {
            $("#movie-view").text("");
            displayInfo(response);
       } else {
            $("#movie-view").html("<p class='text-center'>No results found. You can search for these movies now playing in theaters:</p><br>");
            getPoster("https://api.themoviedb.org/3/movie/now_playing?api_key=75f535f5e5c1d23e72fcdbe931044574&language=en-US&page=1");
        }
    });

});

const displayInfo = (response) => {
    const movieInfo = response.results[0];
    const titleP = "<p>Title: " + movieInfo.title + "</p>";
    const poster = "https://image.tmdb.org/t/p/w300" + movieInfo.poster_path;
    const posterImg = "<img src='" + poster + "'>";
    const releaseDateP = "<p>Released: " + movieInfo.release_date + "</p>";;
    const plotP = "<p>Plot: " + movieInfo.overview + "</p>";

    const posterColumn = "<div class='col-sm-12 col-md-4'>" + posterImg + "</div>";
    const infoColumn = "<div class='col-sm-12 col-md-4'>" + titleP + releaseDateP + plotP + "</div>";

    $("#movie-view").append(
        posterColumn,
        infoColumn
    );
};

const getPoster = (url) => {
    $.ajax({
        url: url,
        method: "GET"
    }).then((response) => {
        if (url=="https://api.themoviedb.org/3/movie/now_playing?api_key=75f535f5e5c1d23e72fcdbe931044574&language=en-US&page=1") {
            const movies = response.results;
            for (var i=0; i < 9; i++) {
                const posterImg = "<img src='https://image.tmdb.org/t/p/w300" + movies[i].poster_path + "'>";
                const movieColumn = "<div class='col-sm-12 col-md-4'>" + posterImg + "</div>"

                $("#movie-view").append(
                    movieColumn
                );
            }
        } else {
            const movie = response.results[0]
            const posterImg = "<img src='https://image.tmdb.org/t/p/w300" + movie.poster_path + "'>";
            const movieColumn = "<div class='col-sm-12 col-md-4'>" + posterImg + "</div>"

            $("#movie-view").append(
            movieColumn
            );
        }
    })
};

const myFavorites = () => {
    const myFavoritesArray = ["goonies", "42", "the book of eli", "the dark knight", "christmas vacation", "black panther", "beauty and the beast", "zootopia", "the sandlot"]
    for (var i=0; i < myFavoritesArray.length; i++) {
        const url = "https://api.themoviedb.org/3/search/movie?query=" + myFavoritesArray[i] + "&api_key=75f535f5e5c1d23e72fcdbe931044574";
        getPoster(url)
    }
};