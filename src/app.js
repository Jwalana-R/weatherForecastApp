let now = new Date();
let Days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = Days[now.getDay()];

let datetime = document.querySelector("#date-time");
datetime.innerHTML = `${day} ${now.getHours()}:${now.getMinutes()} `;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  return Days[day];
}

function displayForecast(response) {
  console.log(response.data);
  let forecast = response.data.daily;

  let forecastEle = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML += `
            <div class="col-2">
              <div class="forecast-date">${formatDay(forecastDay.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt=""
                width="40px"
              />
              <div class="forecast-temp">
                <span class="forecast-temp-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="forecast-temp-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div>
            </div>
  `;
    }
  });
  forecastHTML += `</div>`;
  forecastEle.innerHTML = forecastHTML;
}
let apiKey = "c03face7caa58a9b7ffa9f52b7238a93";

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let form = document.querySelector("form");
form.addEventListener("submit", search);

let cityname = document.querySelector("#cityname");
let cityinput = document.querySelector("#city-input");

function search(event) {
  event.preventDefault();
  if (cityinput.value) {
    defaultdisplay(cityinput.value);
  }
}

function defaultdisplay(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(follow);
}

let weatherdes = document.querySelector("#description");
let temp = document.querySelector("#temperature");
let wind = document.querySelector("#wind");
let humidity = document.querySelector("#humidity");
let imgele = document.querySelector("#icon");
let cellink = document.querySelector("#cel-link");
let farlink = document.querySelector("#far-link");

function follow(response) {
  console.log(response);
  cityname.innerHTML = `${response.data.name}`;
  weatherdes.innerHTML = `${response.data.weather[0].description}`;
  temp.innerHTML = `${Math.round(response.data.main.temp)}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind: ${response.data.wind.speed}km/h`;
  cityname.innerHTML = `${response.data.name}`;
  imgele.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  imgele.setAttribute("alt", response.data.weather[0].description);
  celtemp = response.data.main.temp;
  getForecast(response.data.coord);
}

farlink.addEventListener("click", showfartemp);
let celtemp = null;

function showfartemp(event) {
  event.preventDefault();
  farlink.classList.add("active");
  cellink.classList.remove("active");
  let fartemp = (celtemp * 9) / 5 + 32;
  temp.innerHTML = `${Math.round(fartemp)}`;
}

cellink.addEventListener("click", showceltemp);

function showceltemp(event) {
  event.preventDefault();
  cellink.classList.add("active");
  farlink.classList.remove("active");
  temp.innerHTML = `${Math.round(celtemp)}`;
}
defaultdisplay("Gwalior");
