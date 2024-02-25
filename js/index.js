function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temp);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${response.data.wind.speed} km/h`;

  let date = new Date(response.data.time * 1000);
  let timeElement = document.querySelector("#current-date");
  timeElement.innerHTML = formatDate(date);

  let icon = document.querySelector("#icon");
  icon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;

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

  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "9234dd59ca8092tfabb2o8078c5f4477";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

function getForecast(city) {
  let apiKey = "9234dd59ca8092tfabb2o8078c5f4477";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function formatDay(timestemp) {
  let date = new Date(timestemp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function displayForecast(response) {
  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="weather-forecast-day">
      <div class="weather-forecast-date">${formatDay(day.time)}</div>
      <div>
        <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
      </div>
      <div class="weather-forecast-temperatures">
      <strong class="forecast-temperature-max">${Math.round(
        day.temperature.maximum
      )}°</strong>
      <span class="forecast-temperature-min">${Math.round(
        day.temperature.minimum
      )}°</span>
      </div>
      </div>`;
    }
  });

  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHTML;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");
