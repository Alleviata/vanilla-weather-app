function formatDate(timestamp) {
  let now = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let dayOfMonth = now.getDate();
  let year = now.getFullYear();
  let hours = ("0" + now.getHours()).substr(-2);
  let minutes = ("0" + now.getMinutes()).substr(-2);
  let formatted = `${day}, ${month} ${dayOfMonth}  ${year}, ${hours}:${minutes}`;
  return formatted;
}

function formatWeekday(timestamp) {
  let now = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let day = days[now.getDay()];
  return day;
}

function showForecast(response) {
  let daily = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row seven-cols">`;
  daily.forEach(function (day, index) {
    if (index < 7) {
      forecastHTML =
        forecastHTML +
        `<div class="col-md-1 single-forecast">
              <div class="forecast-date">${formatWeekday(day.dt)}</div>
              <img 
              src="http://openweathermap.org/img/wn/${
                day.weather[0].icon
              }@2x.png"
              alt="weather icon"
              class="icon-small"/>
              <div class="forecast-temp">
                <span class="forecast-temp-max">${Math.round(
                  day.temp.max
                )}°C </span><span class="forecast-temp-min">${Math.round(
          day.temp.min
        )}°C</span></div>
            </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(cityLat, cityLon) {
  let lat = cityLat;
  let lon = cityLon;
  let apiKey = "7b6082b8fe526faa7a3e5f9d6dae8769";
  let unit = "metric";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiURL).then(showForecast);
}

function showWeather(response) {
  console.log(response);
  let currCity = response.data.name;
  let city = document.querySelector("#currCity");
  city.innerHTML = currCity;
  let currTemp = document.querySelector("#currTemp");
  currTemp.innerHTML = Math.round(response.data.main.temp);
  celciusTemp = response.data.main.temp;
  let currHum = document.querySelector("#currHumidity");
  currHum.innerHTML = response.data.main.humidity + "%";
  let currWind = document.querySelector("#currWind");
  currWind.innerHTML = response.data.wind.speed + " m/s";
  let currentDate = document.querySelector("#date");
  currentDate.innerHTML = formatDate(response.data.dt);
  let description = document.querySelector("#description");
  description.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon-big");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  //celsiusUnit.classList.add("active");
  //fahrenUnit.classList.remove("active");
  getForecast(response.data.coord.lat, response.data.coord.lon);
}

function search(city) {
  let apiKey = "7b6082b8fe526faa7a3e5f9d6dae8769";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#currCity");
  let input = document.querySelector("#city-input");
  city.innerHTML = input.value;
  search(input.value);
}

/*function changeToFahren(event) {
  event.preventDefault();
  let currTemp = document.querySelector("#currTemp");
  celsiusUnit.classList.remove("active");
  fahrenUnit.classList.add("active");
  let newTemp = Math.round(celciusTemp * 1.8 + 32);
  currTemp.innerHTML = newTemp;
}

function changeToCelcius(event) {
  event.preventDefault();
  let currTemp = document.querySelector("#currTemp");
  celsiusUnit.classList.add("active");
  fahrenUnit.classList.remove("active");
  currTemp.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;*/

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", changeCity);

/*let celsiusUnit = document.querySelector("#celcius");
celsiusUnit.addEventListener("click", changeToCelcius);

let fahrenUnit = document.querySelector("#fahrenheit");
fahrenUnit.addEventListener("click", changeToFahren);*/

search("Kyiv");
