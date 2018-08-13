$(document).ready(() => {
    $("#movie-view").html("<p class='text-center'>Current top movies based on The Movie Database ratings (search to see what they're all about!):</p><br>");
    nowPlayingOrTopRated("https://api.themoviedb.org/3/movie/top_rated?api_key=75f535f5e5c1d23e72fcdbe931044574&language=en-US&page=1&region=US");
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
           displayInfo(response);
       } else {
            $("#movie-view").html("<p class='text-center'>No results found. Maybe you can make a new movie with that title! You can also search for these movies currently in theaters:</p><br>");
            nowPlayingOrTopRated("https://api.themoviedb.org/3/movie/now_playing?api_key=75f535f5e5c1d23e72fcdbe931044574&language=en-US&page=1");
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
    console.log(infoColumn)

    $("#movie-view").text("");

    $("#movie-view").append(
        posterColumn,
        infoColumn
    );
}

const nowPlayingOrTopRated = (url) => {
    $.ajax({
        url: url,
        method: "GET"
    }).then((response) => {
        const currentMovies = response.results;
        for (var i=0; i < 9; i++) {
            const posterImg = "<img src='https://image.tmdb.org/t/p/w300" + currentMovies[i].poster_path + "'>";
            const movieColumn = "<div class='col-sm-12 col-md-4'>" + posterImg + "</div>"

            $("#movie-view").append(
                movieColumn
            );
        }
    })
}