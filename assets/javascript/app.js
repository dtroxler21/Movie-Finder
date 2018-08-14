// Displaying movie information when the page loads
$(document).ready(() => {
    // Displaying a line of text
    $("#movie-view").html("<p class='text-center'>Need some ideas? Search for one of my favorite movies:</p>");
    // Calling for the function to display the posters of my favorites movies
    myFavorites();
});

// Event for when user searches for a movie
$("#find-movie").on("click", (event) => {
    // Prevents page from reloading
    event.preventDefault();
    // Grabbing input value and storing it into a variable to be used in the queryURL
    const movie = $("#movie-input").val();
    // Emptying the input box
    $("#movie-input").val("");
    // Creating the queryURL using the API URL
    const queryURL = "https://api.themoviedb.org/3/search/movie?query=" + movie + "&api_key=75f535f5e5c1d23e72fcdbe931044574";
    // Ajax call to grab information from the API
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then((response) => {
        // Checking to see if there are results
        if (response.results[0]) {
            // Emptying the movie-view div
            $("#movie-view").text("");
            // Calling function displayInfo and passing in the response from the ajax call
            displayInfo(response);
        } else {
            // If there are no results, display a message and calling getPoster function
            $("#movie-view").html("<p class='text-center'>No results found. You can search for these movies now playing in theaters:</p><br>");
            getPoster("https://api.themoviedb.org/3/movie/now_playing?api_key=75f535f5e5c1d23e72fcdbe931044574&language=en-US&page=1");
        }
    });
});

// Function to display a movie's information upon searching
const displayInfo = (response) => {
    // Storing the top result, grabbing pertinent information, and creating html variables
    const movieInfo = response.results[0];
    const titleP = "<p>Title: " + movieInfo.title + "</p>";
    const poster = "https://image.tmdb.org/t/p/w300" + movieInfo.poster_path;
    const posterImg = "<img src='" + poster + "'>";
    const releaseDateP = "<p>Released: " + movieInfo.release_date + "</p>";;
    const plotP = "<p>Plot: " + movieInfo.overview + "</p>";
    // Creating a column for the poster and movie info
    const posterColumn = "<div class='col-sm-12 col-md-4'>" + posterImg + "</div>";
    const infoColumn = "<div class='col-sm-12 col-md-4'>" + titleP + releaseDateP + plotP + "</div>";
    // Displaying the poster and movie info inside the movie-view div
    $("#movie-view").append(
        posterColumn,
        infoColumn
    );
};

// Function to display the poster of movies
const getPoster = (url) => {
    $.ajax({
        url: url,
        method: "GET"
    }).then((response) => {
        // Checking for the now playing url to see which posters need to be displayed
        if (url=="https://api.themoviedb.org/3/movie/now_playing?api_key=75f535f5e5c1d23e72fcdbe931044574&language=en-US&page=1") {
            // Storing results in movies variable and displaying the poster for the first nine results
            const movies = response.results;
            for (var i=0; i < 9; i++) {
                const posterImg = "<img src='https://image.tmdb.org/t/p/w300" + movies[i].poster_path + "'>";
                const movieColumn = "<div class='col-sm-12 col-md-4'>" + posterImg + "</div>"
                $("#movie-view").append(
                    movieColumn
                );
            }
        } else {
            // Else statement used for initial loading of the page so that the favorite movie posters are displayed
            const movie = response.results[0]
            const posterImg = "<img src='https://image.tmdb.org/t/p/w300" + movie.poster_path + "'>";
            const movieColumn = "<div class='col-sm-12 col-md-4'>" + posterImg + "</div>"
            $("#movie-view").append(
                movieColumn
            );
        }
    })
};

// Function to create query urls for my favorite movies and passing them through getPoster function to display the posters
const myFavorites = () => {
    const myFavoritesArray = ["goonies", "42", "the book of eli", "the dark knight", "christmas vacation", "black panther", "beauty and the beast", "zootopia", "the sandlot"]
    for (var i=0; i < myFavoritesArray.length; i++) {
        const url = "https://api.themoviedb.org/3/search/movie?query=" + myFavoritesArray[i] + "&api_key=75f535f5e5c1d23e72fcdbe931044574";
        getPoster(url)
    }
};