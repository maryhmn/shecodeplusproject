function formattedDate(date) {
  let weekDays = [
    "Sunday",
    "Monday",
    "Thusday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = weekDays[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}
function searchForm(event) {
  event.preventDefault();
  let city = document.querySelector("#search-bar").value;
  search(city);
}
function search(city) {
  let apiKey = "94599333407598f6d7648d2d8c8c3a16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempreture);
}
function showTempreture(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  let min = Math.round(response.data.main.temp_min);
  let max = Math.round(response.data.main.temp_max);
  document.querySelector("#tempreture").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feel-like").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector("#min-max").innerHTML = `${min}°/ ${max}°`;
  document.querySelector("#describ").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "94599333407598f6d7648d2d8c8c3a16";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTempreture);
}
function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentTime = new Date();
let today = document.querySelector("#current-day");
today.innerHTML = formattedDate(currentTime);
let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", searchForm);
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", currentCity);
search("New York");
