var trueLocation = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
var locationField = document.getElementById("locationField");
var locationBtn = document.getElementById("locationBtn");
var apiKey = "d9427cb88440c4a3909a929c3b2d8e88";
var currentCity;
var units = "imperial";
var currentTemp = document.getElementById("currentTemp");
var currentFeels = document.getElementById("currentFeels");
var currentWeather = document.getElementById("currentWeather");
var currentPoP = document.getElementById("currentPoP");
var currentWind = document.getElementById("currentWind");
var currenUVI = document.getElementById("currentUVI");

function removeWhiteSpace(text){
    text = text.trim();
    text = text.split("");
    var tempText = [];
    for (var i = 0; i < text.length; i++){
        if (text[i] == " ") {
            tempText.push("%20")
        } else {
            tempText.push(text[i])
        };
    };
    tempText = tempText.join("");
    return tempText
};

function setWeather(cityName){
    var geoApi = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + units + "&appid=" + apiKey
    fetch(geoApi)
        .then(function (response) {
            return response.json();
        })
        .then(function (data){
            console.log(data)
            var latLon = [data.coord.lat, data.coord.lon]
            return latLon
        })
        .then (function (latLon){
            console.log(latLon[0] + ", " + latLon[1]);
            var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + latLon [0] + "&lon=" + latLon[1] + "&units=" + units + "&appid=" + apiKey
            fetch(weatherApi)
                .then(function(response){
                    return response.json();
                })
                .then(function (data) {
                    currentTemp.textContent = "Temperature: " + Math.round(data.current.temp) + "F";
                    currentFeels.textContent = "Feels like: " + Math.round(data.current.feels_like) + "F";
                    currentWeather.textContent = data.current.weather[0].description;
                    currentPoP.textContent = "Chance of rain: " + ((data.hourly[0].pop)*100) + "%";
                    currentWind.textContent = "Wind: " + data.current.wind_speed + "mph";
                    currentUVI.textContent = "UV Index: " + data.current.uvi;
                    console.log(data)

                })
        })
};



locationBtn.addEventListener("click", function(event){
    event.preventDefault();
    currentCity = removeWhiteSpace(locationField.value)
    console.log(currentCity)
    setWeather(currentCity)
});

