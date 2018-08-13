$("#find-movie").on("click", function (event) {

    event.preventDefault();

    const movie = $("#movie-input").val();
    $("#movie-input").val("");
    const queryURL = "https://api.themoviedb.org/3/search/movie?query=" + movie + "&api_key=75f535f5e5c1d23e72fcdbe931044574";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
       if (response.results[0]) {
           displayInfo(response);
       } else {
            $("#movie-view").text("No results found. Maybe you can make a new movie with that title! You can also search for these movies currently in theaters:");
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

    const posterColumn = "<div class='col-sm-4'>" + posterImg + "</div>";
    const infoColumn = "<div class='col-sm-4'>" + titleP + releaseDateP + plotP + "</div>";
    console.log(infoColumn)

    $("#movie-view").text("");

    $("#movie-view").append(
        posterColumn,
        infoColumn
    );
}