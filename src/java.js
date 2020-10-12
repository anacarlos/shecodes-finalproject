let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  
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
    "December"
  ];
  
  let atualDate = new Date();
  let thisDay = atualDate.getDay();
  let thisDate = atualDate.getDate();
  let thisMonth = atualDate.getMonth();
  let year = atualDate.getFullYear();
  let hour = atualDate.getHours();
  let minutes = atualDate.getMinutes();
  
  let date = document.querySelector("h4");
  let time = document.querySelector("small");
  date.innerHTML = `${days[thisDay]}, ${thisDate}th ${months[thisMonth]} ${year}`;
  time.innerHTML = `@ ${hour}:${minutes}`;

  function changeCity(event) {
    event.preventDefault();
    let inputCity = document.querySelector("#city-search");
    let location = document.querySelector("h1");
    location.innerHTML = inputCity.value;
    searchCity(inputCity.value);
  }
  
  function showTemperature(response) {
    let temperature = Math.round(response.data.main.temp);
    let temp = document.querySelector("#one");
    temp.innerHTML = temperature;
    let icon = document.querySelector("#sunny");
    let wind = document.querySelector("#wind");
    let precipitation = document.querySelector("#precipitation");
    let description = document.querySelector("#description");

    celsiusTemperature = response.data.main.temp;

    icon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
    icon.setAttribute("alt", response.data.weather[0].main);
    let local = document.querySelector("h1");
    let city = response.data.name;
    local.innerHTML = city;
    precipitation.innerHTML = (response.data.main.humidity);
    wind.innerHTML = Math.round(response.data.wind.speed);
    description.innerHTML = response.data.weather[0].description;
  }
  
  function searchCity(city) {
    let apiKey = "2b9bb1f42e00c8dc2835307067c88f1c";
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(showTemperature);
  }

  function retrievePosition(position) {
    let apiKey = "2b9bb1f42e00c8dc2835307067c88f1c";
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units = "metric";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl = `${apiEndPoint}?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  
    axios.get(apiUrl).then(showTemperature);
  }
  
  function setPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
  }
  
  let current = document.querySelector("#current-button");
  current.addEventListener("click", setPosition);

  function displayFahTemperature(event){
    event.preventDefault();
    let temperatureElement = document.querySelector("#one");
    celsiusLink.classList.remove("active");
    fahLink.classList.add("active");
    let fahTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahTemperature);
  }

  function displayCelsiusTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.add("#active");
    fahLink.classList.remove("#active");
    let temperatureElement = document.querySelector("p");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let form = document.querySelector("#form-search");
  form.addEventListener("submit", changeCity);
  
  let fahLink = document.querySelector("#fahrenheit-link");
  fahLink.addEventListener("click", displayFahTemperature);
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", displayCelsiusTemperature);
  
  