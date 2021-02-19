//Finding & formatting Date and Time 

function formatDateAndTime (timestamp) {
    let dateNow = new Date (timestamp);
    console.log(dateNow);
     let date = dateNow.getDate();

    let months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let month = months[dateNow.getMonth()];

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[dateNow.getDay()];

    let hour = dateNow.getHours();
      if (hour < 10) {
       hour = `0${hour}`;}

    let minutes = dateNow.getMinutes();
      if (minutes < 10) {
        minutes = `0${minutes}`}

    return `${day} ${date} ${month}, ${hour}:${minutes}`;
}

//Weather

//Search Submit 
function handleSubmit(event) {
  event.preventDefault();
  let originalSearchInput = document.querySelector("#search-text-input");
  search(originalSearchInput.value);
}

//Feeding in City, Calling API, sending Result to showWeather Function 
function search(city) {
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=6b93f7db7d89a630dd34ca79b7238880&units=metric`;
    console.log(apiUrl);

    axios.get(apiUrl).then(showWeather);
}

// Controlling HTML
let form = document.querySelector("#search-form"); 
form.addEventListener("submit", handleSubmit);


//Selecting the right elements and formatting them, from what the API returned 
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
    let dateElement = document.querySelector ("#date-today");
    
//City Name Entered now comes from API
    let cityName = response.data.name;
    let city = document.querySelector("#city-name")
    city.innerHTML = cityName;

    celsiusTemperature = response.data.main.temp; 
    // Can use above in let temperature 

//Presenting Translated Variables on HTML
    temperatureElement.innerHTML = temperature;
    humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
    windElement.innerHTML = `Wind: ${windRounded}mph`;
    weatherDescriptionElement.innerHTML = response.data.weather[0].description;
    iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    dateElement.innerHTML = formatDateAndTime (response.data.dt * 1000);
}


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


//Changing from °C to °F - Unit Conversion 

// °F Conversion 
function convertToFah(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#temperature");
    //let temperature = tempElement.innerHTML;
    //temperature = Number(temperature);
    celTemp.classList.remove("active");
    fahTemp.classList.add("active");
    tempElement.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
    }

let fahTemp = document.querySelector("#fahrenheit-link");
fahTemp.addEventListener("click", convertToFah);

// °C Conversion 
function convertToCel(event) {
    event.preventDefault();
    celTemp.classList.add("active");
    fahTemp.classList.remove("active");
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round (celsiusTemperature);
    //let temperature = tempElement.innerHTML;
    //temperature = Number(temperature);
    //tempElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
    }

let celsiusTemperature = null;

let celTemp = document.querySelector("#celsius-link");
celTemp.addEventListener("click", convertToCel);



// Default City to be fed through on load
search ("Edinburgh");









