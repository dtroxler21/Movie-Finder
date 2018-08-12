$("#find-movie").on("click", function (event) {

    event.preventDefault();

    const movie = $("#movie-input").val();
    const queryURL = "https://api.themoviedb.org/3/search/movie?query=" + movie + "&api_key=75f535f5e5c1d23e72fcdbe931044574";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
       if (response.results[0]) {
           displayInfo(response);
       } else {
            $("#movie-view").text("No results found. Maybe you can make a new movie with that title! You can also check out these movies currently in theaters:");
       }
    });

});

const displayInfo = (response) => {
    const movieInfo = response.results[0];
    const movieDiv = $("<div class='movie'>");
    const title = movieInfo.title
    const poster = "https://image.tmdb.org/t/p/w300" + movieInfo.poster_path;
    const releaseDate = movieInfo.release_date
    const plot = movieInfo.overview;

    movieDiv.append(
        $("<img>").attr("src", poster),
        $("<p>").text("Title: " + title),
        $("<p>").text("Released: " + releaseDate),
        $("<p>").text("Plot: " + plot)
    )

    $("#movie-view").html(movieDiv);
}