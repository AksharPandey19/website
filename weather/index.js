// Select all relevant elements
const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const inputField = document.querySelector('.search-box input');

// Search button click event
search.addEventListener('click', () => {
    const APIKey = '5796abbde9106b7da4febfae8c44c232';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;


    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            // Hide all raindrops and snowflakes initially
            drops.forEach(drop => drop.style.display = 'none');

            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'clear.png';
                    image.style.animation = 'spin 0.1s infinite linear';
                    temperature.style.color = '#ffdb58'; // Warm color for sunny
                    break;
                case 'Rain':
                    image.src = 'rain.png';
                    temperature.style.color = ''; // Reset color
                    break;
                case 'Snow':
                    image.src = 'snowy.png';
                    temperature.style.color = '#fffafa'; // Reset color
                    break;
                case 'Clouds':
                    image.src = 'cloudy.png';
                    temperature.style.color = ''; // Reset color
                    break;
                case 'Haze':
                    image.src = 'mist.png';
                    temperature.style.color = ''; // Reset color
                    break;
                default:
                    image.src = '';
                    temperature.style.color = ''; // Reset color
            }

            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '560px';
        });
});

// Clear input field on click
inputField.addEventListener('click', function () {
    this.value = '';

    // Hide weather boxes and error message
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'none';
    container.style.height = '100px';

    // Hide raindrops and snowflakes
    const drops = document.querySelectorAll('.drop');
});

// index.js