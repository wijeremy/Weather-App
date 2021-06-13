var trueLocation = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
var locationField = document.getElementById("locationField");
var locationBtn = document.getElementById("locationBtn");
var apiKey = "d9427cb88440c4a3909a929c3b2d8e88";
var currentCity;
var units = "imperial";
var currentCityEl = document.getElementById("currentCity");
var currentTempEl = document.getElementById("currentTemp");
var currentFeelsEl = document.getElementById("currentFeels");
var currentWeatherEl = document.getElementById("currentWeather");
var currentPoPEl = document.getElementById("currentPoP");
var currentWindEl = document.getElementById("currentWind");
var currentUVIEl = document.getElementById("currentUVI");
var now = moment();
var alertTextBox = document.getElementById("alertTextBox");
var alertTextFiller = "This is a test of the National Weather Alert System. In the case of a real emergency, information and instructions would be posted here. This is only a test."
var dailyBtn = document.getElementById("daily-btn");
var hourlyBtn = document.getElementById("hourly-btn");
var dailyForecast = document.getElementById("dailyForecast");
var hourlyForecast = document.getElementById("hourlyForecast");
var cityList = document.getElementById("cityList")
var newLocationModal = document.getElementById("newLocationModal")
var newLocationModalLabel = document.getElementById("newLocationModalLabel")
var newLocationModalBody = document.getElementById("newLocationModalBody")
var newLocationEnterBtn = document.getElementById("newLocationEnterBtn")



function removeWhiteSpace(text){
    text = text.trim();
    text = text.split(" ");
    var tempText = [];
    for (var i = 0; i < text.length; i++){
        if (i == text.length - 1) {
            tempText.push(text[i])
        } else {
            tempText.push(text[i])
            tempText.push("%20")
        };
    };
    tempText = tempText.join("");
    return tempText
};

function addWhiteSpace(text){
    text = text.trim();
    text = text.split("%20");
    var tempText = [];
    for (var i = 0; i < text.length; i++){
        if (i == text.length - 1) {
            tempText.push(text[i])
        } else {
            tempText.push(text[i])
            tempText.push(" ")
        };
    };
    tempText = tempText.join("");
    return tempText
};

function idify(text){
    text = text.trim();
    text = text.split(" ");
    var tempText = [];
    for (var i = 0; i < text.length; i++){
        if (i == text.length - 1) {
            tempText.push(text[i])
        } else {
            tempText.push(text[i])
            tempText.push("-")
        };
    };
    tempText = tempText.join("");
    return tempText
};

function unidify(text){
    text = text.trim();
    text = text.split("-");
    var tempText = [];
    for (var i = 0; i < text.length; i++){
        if (i == text.length - 1) {
            tempText.push(text[i])
        } else {
            tempText.push(text[i])
            tempText.push(" ")
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
            var latLon = [data.coord.lat, data.coord.lon]
            currentCity = data.name
            return latLon
        })
        .then (function (latLon){
            setWeatherByCoord(latLon[0], latLon[1])            
        })
};

function setWeatherByCoord(lat, lon){
    var weatherApi = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=" + units + "&appid=" + apiKey
    fetch(weatherApi)
        .then(function(response){
            return response.json();
        })
        .then(function (data) {
            console.log(data)
            currentCityEl.textContent = currentCity
            currentTempEl.textContent = "Temperature: " + Math.round(data.current.temp) + "F";
            currentFeelsEl.textContent = "Feels like: " + Math.round(data.current.feels_like) + "F";
            currentWeatherEl.textContent = data.current.weather[0].description;
            currentPoPEl.textContent = "Chance of rain: " + Math.round((data.hourly[0].pop)*100) + "%";
            currentWindEl.textContent = "Wind: " + data.current.wind_speed + "mph";
            currentUVIEl.textContent = "UV Index: " + data.current.uvi;
            for (var i = 0; i < 8; i++) {
                var dailyHi = data.daily[i].temp.max;
                var dailyLo = data.daily[i].temp.min;
                var dailyWeather = data.daily[i].weather[0].description;
                var dailyWeatherIcon = data.daily[i].weather[0].icon;
                var dailyWind = data.daily[i].wind_speed;
                var dailyPoP = data.daily[i].pop;
                var dailyHumidity = data.daily[i].humidity;
                var dailyUVI = data.daily[i].uvi;
                var hiEl = document.getElementById("day" + i + "Hi");
                var loEl = document.getElementById("day" + i + "Lo");
                var weatherEl = document.getElementById("day" + i + "Weather");
                var weatherImg = document.getElementById("day" + i + "Img");
                var windEl = document.getElementById("day" + i + "Wind");
                var popEl = document.getElementById("day" + i + "PoP");
                var humidityEl = document.getElementById("day" + i + "Humidity");
                var UVIEl = document.getElementById("day" + i + "UVI");
                hiEl.textContent = "Hi: " + Math.round(dailyHi) + "F";
                loEl.textContent = "Lo: " + Math.round(dailyLo) + "F";
                weatherEl.textContent = dailyWeather;
                weatherImg.setAttribute("src", "https://openweathermap.org/img/w/" + dailyWeatherIcon + ".png");
                weatherImg.setAttribute("alt", dailyWeather);
                windEl.textContent = "Wind: " + dailyWind + "mph";
                popEl.textContent = "Chance of Rain: " + Math.round(dailyPoP*100) + "%";
                humidityEl.textContent = "Humidity: " + dailyHumidity + "%";
                UVIEl.textContent = "UV Index: " + dailyUVI;
            }
            for (var i = 0; i < 48; i++) {
                var hourlyTemp = Math.round(data.hourly[i].temp);
                var hourlyPoP = Math.round(data.hourly[i].pop * 100);
                var hourlyImg = data.hourly[i].weather[0].icon;
                var hourlyWeather = data.hourly[i].weather[0].description
                var hourlyTempEl = document.getElementById("hour" + i + "Temp");
                var hourlyPoPEl = document.getElementById("hour" + i + "PoP");
                var hourlyImgEl = document.getElementById("hour" + i + "Img");
                hourlyTempEl.textContent = hourlyTemp + "F";
                hourlyPoPEl.textContent = hourlyPoP + "% rain";
                hourlyImgEl.setAttribute("src", "https://openweathermap.org/img/w/" + hourlyImg + ".png");
                hourlyImgEl.setAttribute("alt", hourlyWeather);
            }
            var dataKeys = Object.keys(data)
            var alertArray = []
            var ticker = document.getElementById("ticker-move")
            for (var i = 0; i < dataKeys.length; i++) {
                if (dataKeys[i] === "alerts") {
                    var alerts = data.alerts
                    for (var j = 0; j < alerts.length; j++) {
                        alertArray.push(alerts[j].description.split("\n").join(" "))
                    }
                    var alertText = alertArray.join(" ... ALERT! ALERT! ALERT! ... ")
                    alertTextBox.textContent = alertText
                    ticker.setAttribute("style", "animation-duration: " + alertText.length/10 + "s")
                } else if (i === dataKeys.length - 1) {
                    alertTextBox.textContent = alertTextFiller
                    ticker.setAttribute("style", "animation-duration: " + alertTextFiller.length/10 + "s")
                };
            };
            var utcOffset = data.timezone_offset/3600;
            var now = moment().utcOffset(utcOffset);
            document.getElementById("currentTime").textContent = now.format("ddd MMM Do, YYYY h:mm a");
            for (var i = 0; i < 8; i++) {
                var nextDay = now;
                document.getElementById("day" + i + "Day").textContent = nextDay.format("ddd M/DD");
                now.add(1,"d")
            };
            now = moment().utcOffset(utcOffset);
            for (var i = 0; i < 48; i++) {
                var nextHour = now.add(1, "h");
                document.getElementById("hour" + i + "Time").textContent = nextHour.format("ddd h a")
            };
            if (localStorage.getItem(currentCity) === null){
                var cities = Object.keys(localStorage);
                for (var i = 0; i < cities.length; i++) {
                    var cityStorage = JSON.parse(localStorage.getItem(cities[i]))
                    cityStorage.status = "past"
                    localStorage.setItem(cities[i], JSON.stringify(cityStorage))
                }
                var cityStorage = {
                    status: "current",
                    lat: data.lat,
                    lon: data.lon
                }
                localStorage.setItem(currentCity, JSON.stringify(cityStorage));
                init()
            }
        })
}


locationBtn.addEventListener("click", function(event){
    event.preventDefault();
    currentCity = removeWhiteSpace(locationField.value)
    setWeather(currentCity)
});

dailyBtn.addEventListener('click', function(){
    if (dailyForecast.classList.contains("none")){
        hourlyForecast.classList.remove("flexDown");
        hourlyForecast.classList.add("none");
        dailyForecast.classList.remove("none");
        dailyForecast.classList.add("flexDown");
    };
});

hourlyBtn.addEventListener('click', function(){
    if (hourlyForecast.classList.contains("none")){
        dailyForecast.classList.remove("flexDown");
        dailyForecast.classList.add("none");
        hourlyForecast.classList.remove("none");
        hourlyForecast.classList.add("flexDown");
    };
});

function init(){
    cityList.innerHTML = ""
    var cities = Object.keys(localStorage);
    if (cities.length === 0){
        cities.push("Dallas")
        var cityStorage = {
            status: "current",
            lat: 32.7668,
            lon: -96.7836
        }
        localStorage.setItem("Dallas", JSON.stringify(cityStorage))
    }
    for (var i = 0; i < cities.length; i++){
        var cityStorage = JSON.parse(localStorage.getItem(cities[i]))
        if (cityStorage.status === "current"){
            currentCity = cities[i]
            document.createElement("li");
            var cityEl = document.createElement("li");
            cityEl.textContent = currentCity;
            var tempText = idify(currentCity)
            cityEl.setAttribute("id", tempText)
            cityEl.classList.add("dropdown-item")
            cityEl.addEventListener("click", function(event){
                var city = event.target.getAttribute("id")
                currentCity = unidify(city)
                var cityStorage = cityStorage = JSON.parse(localStorage.getItem(currentCity))
                setWeatherByCoord(cityStorage.lat, cityStorage.lon)
            })
            setWeatherByCoord(cityStorage.lat, cityStorage.lon)
            cityList.appendChild(cityEl);
            var divider = document.createElement("li")
            var dividerInner = document.createElement("hr")
            dividerInner.classList.add("dropdown-divider")
            divider.appendChild(dividerInner)
            cityList.appendChild(divider)
            var cities = Object.keys(localStorage);
            for (var i = 0; i < cities.length; i++){ 
                var cityStorage = JSON.parse(localStorage.getItem(cities[i]))
                if (cityStorage.status === "past"){
                    document.createElement("li");
                    var cityEl = document.createElement("li");
                    cityEl.textContent = cities[i];
                    var tempText = idify(cities[i])
                    cityEl.setAttribute("id", tempText)
                    cityEl.classList.add("dropdown-item")
                    cityEl.addEventListener("click", function(event){
                        var city = event.target.getAttribute("id")
                        currentCity = unidify(city)
                        var cities = Object.keys(localStorage);
                        for (var i = 0; i < cities.length; i++) {
                            var cityStorage = JSON.parse(localStorage.getItem(cities[i]))
                            cityStorage.status = "past"
                            localStorage.setItem(cities[i], JSON.stringify(cityStorage))
                        }
                        var cityStorage = JSON.parse(localStorage.getItem(currentCity))
                        cityStorage.status = "current"
                        localStorage.setItem(currentCity, JSON.stringify(cityStorage));
                        init()
                    })
                    cityList.appendChild(cityEl);
                }
            }
        }
    }
};
init()

newLocationBtn.addEventListener("click", function(){
    var newLocationEnterBtn = document.getElementById("newLocationEnterBtn")
    newLocationModalBody.innerHTML = ""
    var newLocationSelect = document.createElement("select")
    newLocationSelect.setAttribute("id", "newLocationSelect")
    newLocationSelect.classList.add("form-control")
    newLocationModalBody.appendChild(newLocationSelect)
    newLocationModalLabel.textContent = "Select your country:"
    fetch("./assets/js/country-codes.json")
        .then(function(response){
            return response.json()
        })
        .then(function(data){
            for (var i = 0; i < data.length; i ++){
                var country = document.createElement("option");
                country.textContent = data[i].name + " - " + data[i].id;
                newLocationSelect.appendChild(country);
            };
            var countryBtn = newLocationEnterBtn.cloneNode(true)
            newLocationEnterBtn.parentNode.replaceChild(countryBtn, newLocationEnterBtn)
            countryBtn.addEventListener("click", function(){
                var myCountry = newLocationSelect.value
                var myTempArray = myCountry.split("-")
                myCountryId = myTempArray[1].trim()
                console.log(myCountryId)
                newLocationSelect.innerHTML = "" 
                fetch("./assets/js/city.list.json")
                    .then(function(response){
                        return response.json()
                    })
                    .then(function(data){
                        newLocationModalLabel = "Select your state:"
                        var eachStateInCountry = []
                        for (var i = 0; i < data.length; i++){
                            if (data[i].country == myCountryId){
                                eachStateInCountry.push(data[i].state)
                            }
                        }
                        eachStateInCountry = [...new Set(eachStateInCountry)].sort()
                        console.log(myCountryId)
                        if (eachStateInCountry.length === 1){
                            var state = document.createElement("option")
                            state.textContent = "PRESS ENTER TO CONTINUE"
                            newLocationSelect.appendChild(state)
                        }   else {
                            for (var i = 0; i < eachStateInCountry.length; i++){
                                var state = document.createElement("option")
                                state.textContent = eachStateInCountry[i]
                                newLocationSelect.appendChild(state)
                            }
                        }
                        var stateBtn = countryBtn.cloneNode(true)
                        countryBtn.parentNode.replaceChild(stateBtn, countryBtn)
                        stateBtn.addEventListener("click", function(){
                            var myStateId = newLocationSelect.value
                            if (myStateId === "PRESS ENTER TO CONTINUE"){
                                myStateId = ""
                            }
                            newLocationSelect.innerHTML = ""
                            console.log(myCountryId)
                            newLocationModalLabel = "Select your city:"
                            var cityArray = []
                            for (var i = 0; i < data.length; i++){
                                if (myStateId == data[i].state && myCountryId == data[i].country){
                                    cityArray.push(data[i].name)
                                }
                            }
                            cityArray = cityArray.sort()
                            for (var i = 0; i < cityArray.length; i++){
                                var city = document.createElement("option")
                                city.textContent = cityArray[i]
                                newLocationSelect.appendChild(city)
                            }
                            var cityBtn = stateBtn.cloneNode(true)
                            stateBtn.parentNode.replaceChild(cityBtn, stateBtn)
                            cityBtn.setAttribute("data-bs-dismiss", "modal")
                            cityBtn.addEventListener("click", function(){
                                console.log(myStateId)
                                var myCity = newLocationSelect.value
                                for (var i = 0; i < data.length; i++){
                                    if (myCountryId == data[i].country && myStateId == data[i].state && myCity == data[i].name){
                                        currentCity = data[i].name
                                        setWeatherByCoord(data[i].coord.lat, data[i].coord.lon)
                                    }
                                }
                                var newLocationEnterBtn = cityBtn.cloneNode(true)
                                cityBtn.parentNode.replaceChild(newLocationEnterBtn, cityBtn)
                                newLocationEnterBtn.removeAttribute("data-bs-dismiss")
                            })                        
                        })
                    })
            });
        })
})