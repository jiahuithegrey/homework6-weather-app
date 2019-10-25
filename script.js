var searchBtn = $(".fa-search");
var lat;
var lon;

function SearchCityWeather(city){
    var APIKey = "04a910d3dcce5f3a689d56a30faedf19"; 
    var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?"+"q="+city+ 
    "&units=imperial&appid="+APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        var highTemperature = $("#high-temperature").text("Highest Temperature: " + response.main.temp_max);
        var lowTemperature = $("#low-temperature").text("Lowest Temperature: " + response.main.temp_min);
        var humidity = $("#humidity").text("Humidity: " + response.main.humidity);
        var windSpeed = $("#wind-speed").text("Wind Speed: " + response.wind.speed);
        lat = repsonse.coord.lat;
        lon = response.coord.lon;
    });
    
    var uvQueryURL =
    "http://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon;
    $.ajax({
        url: uvQueryURL,
        method: "GET"
    }).then(function(response) {
    var uvIndex = $("#uv-index").text(response.value); 
    });
}
// function renderButtons() {

// }
$("#citySearch").on("submit", function(event) {
    event.preventDefault();
    var cityEl = $(".city").val().trim(); //otherwise var will be the whole input
    SearchCityWeather(cityEl);

    var searchHistory = $(".search-history");
    searchHistory = cityEl.value;
});

searchBtn.on("click", function(event) { //how to make enter work too?
    $("#citySearch").submit();
});

