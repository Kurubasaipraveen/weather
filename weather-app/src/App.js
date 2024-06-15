const API_KEY = '424c22e3ccea1bb8cfc19290a9d937fa';

// Function to create a weather card element
function createWeatherCard(data) {
    const weatherCard = document.createElement('div');
    weatherCard.classList.add('weather-card');

    weatherCard.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>Temperature: ${data.main.temp} °C</p>
    <p>Weather: ${data.weather[0].main}</p>
    <p>Description: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Wind Speed: ${data.wind.speed} m/s</p>
    <p>Date: ${new Date().toLocaleDateString()}</p>
    <p>Time: ${new Date().toLocaleTimeString()}</p>
  `;

    return weatherCard;
}

// Function to fetch weather data from OpenWeatherMap API
async function fetchWeather() {
    const city = document.getElementById('city-input').value.trim();
    const weatherInfoDiv = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        const weatherCard = createWeatherCard(data);
        weatherInfoDiv.appendChild(weatherCard);
        errorMessage.textContent = '';
    } catch (err) {
        errorMessage.textContent = err.message;
    }
}

// Event listener for the form submission
document.getElementById('weather-form').addEventListener('submit', function(e) {
    e.preventDefault();
    fetchWeather();
});

// Event listener for the dark/light mode toggle button (if applicable)
document.getElementById('toggle-button').addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// Set initial mode (if applicable)
document.body.classList.add('light-mode');