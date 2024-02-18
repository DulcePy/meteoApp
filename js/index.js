function refreshWeather(response) {
  console.log(response.data);

  let temperatureElement = document.querySelector("#temperature");
  let temp = response.data.temperature.current;
  temperatureElement.innerHTML = Math.round(temp);

  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = response.data.city;
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Lisbon");