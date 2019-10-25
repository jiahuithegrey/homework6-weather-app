var searchBtn = $(".fa-search");

function SearchCityWeather(city){ //is city a property here?
    var APIKey = "04a910d3dcce5f3a689d56a30faedf19"; 
    var queryURL =
    "http://api.openweathermap.org/data/2.5/weather?"+"q="+city+ 
    "&units=imperial&appid="+APIKey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        $("#high-temperature").text("Highest Temperature: " + response.main.temp_max);
        $("#low-temperature").text("Lowest Temperature: " + response.main.temp_min);
        $("#humidity").text("Humidity: " + response.main.humidity);
        $("#wind-speed").text("Wind Speed: " + response.wind.speed);
        $("#uv-index").text(response.weather.main); //?????
    });
}
searchBtn.on("click", function(event) {
  event.preventDefault();
  var cityEl = $(".city").val().trim(); //why value?
  SearchCityWeather(cityEl);
});



