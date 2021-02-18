//Finding & formatting Date and Time 

function formattingCurrentDate () {

    let dateNow = new Date();

  let date = dateNow.getDate();
  let year = dateNow.getFullYear();

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];
  let month = months[dateNow.getMonth()];

  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[dateNow.getDay()];

  return `${day} ${date} ${month} ${year}`;
}

let dateToday = document.querySelector("#date-today");
dateToday.innerHTML = formattingCurrentDate();



function formattingCurrentTime () {

    let timeNow = new Date();

    let hour = timeNow.getHours();
      if (hour < 10) {
       hour = `0${hour}`;}

    let minutes = timeNow.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`}

    return `${hour}:${minutes}`;
}

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = formattingCurrentTime();


//Weather


//Step 3 
function handleSubmit(event) {
  event.preventDefault();
  let originalSearchInput = document.querySelector("#search-text-input");
  search(originalSearchInput.value);
}

// Step 2 
// Step 4 
function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b93f7db7d89a630dd34ca79b7238880&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(showWeather);
}

// Step 1
let form = document.querySelector("#search-form"); 
form.addEventListener("submit", handleSubmit);


//Step 5
function showWeather (response) {
    console.log(response.data);

    let temperature = Math.round(response.data.main.temp);
    let wind = (response.data.wind.speed)*2.2;
    let windRounded = Math.round(wind);
    let temperatureElement = document.querySelector("#temperature");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let weatherDescriptionElement = document.querySelector("#weather-description");
    let iconElement = document.querySelector ("#weather-icon");

//Step 6
    let cityName = response.data.name;
    let city = document.querySelector("#city-name")
    city.innerHTML = cityName;

//Step 7
    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${windRounded}mph`;
    weatherDescriptionElement.innerHTML = response.data.weather[0].description;
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}


//Current Location Button Linking to showWeather Function Above

function findCurrentLocation() {
  navigator.geolocation.getCurrentPosition(defineLatLonLocation);
}

function defineLatLonLocation (position) {
    console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=6b93f7db7d89a630dd34ca79b7238880`;
  axios.get(url).then(showWeather);
}

let currentLocationButton = document.querySelector ("#current-location-button")
currentLocationButton.addEventListener("click", findCurrentLocation)


//Changing from °C to °F

function convertToFah(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    let temperature = tempElement.innerHTML;
    temperature = Number(temperature);
    tempElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
    }

let fahTemp = document.querySelector("#fahrenheit-link");
fahTemp.addEventListener("click", convertToFah);


function convertToCel(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    let temperature = tempElement.innerHTML;
    temperature = Number(temperature);
    tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
    }

let celTemp = document.querySelector("#celsius-link");
celTemp.addEventListener("click", convertToCel);


search ("Edinburgh");









