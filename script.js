// var searchBtn = $(".fa-search");
var APIKey = "04a910d3dcce5f3a689d56a30faedf19"; 

function getCityWeather(city){
    var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?"+"q="+city+ 
    "&units=imperial&appid="+APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        updateCityWeather(response);
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        getUVIndex(lat,lon);
    });
}

function updateCityWeather(response) {
    $("#high-temperature").text("Highest Temperature: " + response.main.temp_max);
    $("#low-temperature").text("Lowest Temperature: " + response.main.temp_min);
    $("#humidity").text("Humidity: " + response.main.humidity);
    $("#wind-speed").text("Wind Speed: " + response.wind.speed);
}
    
function getUVIndex(lat,lon){
    var QueryURL =
    "http://api.openweathermap.org/data/2.5/uvi?appid="+APIKey+"&lat="+lat+"&lon="+lon;
    $.ajax({
        url: QueryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        updateUVIndex(response);
    });
}

function updateUVIndex(response) {
    $("#uv-index").text("UV Index: " + response.value); 
}

// function renderButtons() {

// }
$("#find-city").on("click", function(event) {
    event.preventDefault();
    var cityEl = $(".city").val().trim(); //otherwise var will be the whole input
    getCityWeather(cityEl);
});

//     var searchHistory = $(".search-history");
//     searchHistory = cityEl.value;
// });

// searchBtn.on("click", function(event) { //how to make enter work too?
//     $("#citySearch").submit();
// });
