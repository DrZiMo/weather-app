const API_KEY = "9fbf21dfcb44feb10b6a05cd6047621f";

const cityName = document.querySelector(".city-name");
const weatherDescription = document.querySelector(".wheather-description");
const weatherImg = document.querySelector(".weather-img");
const temp = document.querySelector(".temperature");
const maxTemp = document.querySelector(".max");
const minTemp = document.querySelector(".min");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");
const sunrise = document.querySelector(".sunrise")
const sunset = document.querySelector(".sunset")
const cityInput = document.querySelector(".city");
const searchBtn = document.querySelector(".search");


const getWheather = async () => {
    const city = cityInput.value;

    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    if (!city) {
        alert("Please enter city name!");
        return;
    }

    const response = await fetch(API_URL);
    const data = await response.json();

    if (data.cod == '404') {
        alert("Please enter valid city name");
        cityInput.value = "";
        return;
    }

    console.log(data);
    cityName.textContent = data.city.name;
    weatherDescription.textContent = data.list[0].weather[0].description;
    weatherImg.src = `http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@4x.png`;
    temp.textContent = (data.list[0].main.temp - 273).toFixed(1);
    maxTemp.textContent = " " + (data.list[0].main.temp_max - 273).toFixed(1);
    minTemp.textContent = " " + (data.list[0].main.temp_min - 273).toFixed(1);
    humidity.textContent = data.list[0].main.humidity + "%";
    wind.textContent = data.list[0].wind.speed + "km/h";
    const sunriseTime = new Date(data.city.sunrise * 1000);
    const sunsetTime = new Date(data.city.sunset * 1000);
    sunrise.textContent = `${sunriseTime.getHours()}:${sunriseTime.getMinutes() < 10 ? "0" + sunriseTime.getMinutes() : sunriseTime.getMinutes()}:${sunriseTime.getSeconds()}`;
    sunset.textContent = `${sunsetTime.getHours()}:${sunsetTime.getMinutes() < 10 ? "0" + sunsetTime.getMinutes() : sunsetTime.getMinutes()}:${sunsetTime.getSeconds()}`;

    // next 4 days
    for (let i = 5; i <= 29; i += 8) {
        let dayDate = new Date(data.list[i].dt * 1000);
        let dayName = document.querySelector(`.day-${(i - 5) / 8 + 1}-name`);
        let dayImg = document.querySelector(`.weather-img-day-${(i - 5) / 8 + 1}`);
        let dayTemp = document.querySelector(`.day-${(i - 5) / 8 + 1}-temp`);

        dayImg.src = `http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png`;
        dayTemp.textContent = (data.list[i].main.temp - 273).toFixed(1);

        switch (dayDate.getDay()) {
            case 1:
                dayName.textContent = "Mon";
                break;
            case 2:
                dayName.textContent = "Tue";
                break;
            case 3:
                dayName.textContent = "Wed";
                break;
            case 4:
                dayName.textContent = "Thus";
                break;
            case 5:
                dayName.textContent = "Fri";
                break;
            case 6:
                dayName.textContent = "Sat";
                break;
            case 7:
                dayName.textContent = "Sun";
                break;
            default:
                dayName.textContent = "Unkown";
                break;
        }
    }
}

searchBtn.addEventListener("click", getWheather);