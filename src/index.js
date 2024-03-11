function refreshWeather(response) {
  let temperatureElement = response.data.temperature.current;
  let weatherAppValueElement = document.querySelector("#weather-value");
  let temperature = Math.round(temperatureElement);
  let city = document.querySelector("#weather-app-city");
  let descriptionElement = document.querySelector("#weather-condition");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let icon = document.querySelector("#icon");
  weatherAppValueElement.innerHTML = temperature;
  city.innerHTML = response.data.city;
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/hr`;
  timeElement.innerHTML = formatDate(date);
  icon.innerHTML = `<img
    src="${response.data.condition.icon_url}"
    class="weather-icon"
  />`;

  getForecast(response.data.city);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "aae4390da28do47e0e9dfc3fdaftcdbb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "aae4390da28do47e0e9dfc3fdaftcdbb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
        <div class="weather-forecast-date">
        <div class="weather-forecast-day">${day}</div>
        <div class="weather-forecast-icon">🌤</div>
        <div class="weather-temperatures">
        <span class="weather-temperature-max"> 19 º</span>
        <span class="weather-temperature-min"> 7 º</span>
        </div>
        </div>
        `;
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchFomrElement = document.querySelector("#search-form");
searchFomrElement.addEventListener("submit", handleSearchSubmit);

searchCity("London");
