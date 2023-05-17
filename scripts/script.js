//https://api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} 
let urlP = 'https://api.openweathermap.org/data/2.5/forecast?q=';
let city = 'Lodi'
let apiKey = '&appid=577122a8386d0022274fc1628b099977'
let units = '&units=imperial';
let degSymbol = `&deg;F`

let search = document.getElementById('search');
let btn = document.getElementById('btn');
let place = document.getElementById('place');
let date = document.getElementById('date');
let degrees = document.getElementById('degrees');
let min = document.getElementById('min');
let max = document.getElementById('max');
let favBtn = document.getElementById('favBtn');
let delBtn = document.getElementById('delBtn');
let favorites = document.getElementById('favorites');
let favoritesContainer = document.querySelector('.favoritesContainer');
let forecastContainer = document.getElementById('forecastContainer')
let weatherArr = [];
let favArr = ''
let searchedCity = '';

btn.addEventListener('click',e=>{
  fetchWeather(urlP+search.value+apiKey+units);
  searchedCity = search.value;
  place.innerText = search.value
});

favBtn.addEventListener('click',e=>{
  let obj = {
    name: weatherArr[weatherArr.length - 1].city.name,
    weatherData: weatherArr[weatherArr.length - 1]
  }
  addFavorite(obj);
});

delBtn.addEventListener('click', (e) => {
  const currentCity = place.innerText;

  // Find the matching list item in the favorites list
  const favoriteItems = favorites.getElementsByTagName('li');
  for (let i = 0; i < favoriteItems.length; i++) {
    if (favoriteItems[i].textContent === currentCity) {
      favorites.removeChild(favoriteItems[i]); 
      break;
    }
  }
});




function fetchWeather(url)
{
  fetch(url)
    .then(data => data.json())
    .then(response => {
      getWeather(response);
    });
}
fetchWeather(urlP+city+apiKey+units);

function getWeather(weatherData)
{
    weatherArr = [];
    weatherArr.push(weatherData);
    console.log(weatherArr);
    console.log(weatherData);
    let main = weatherData.list[0].main;
    let dt = weatherData.list[0].dt;
    let milliseconds = dt * 1000;
    let currentDay = new Date(milliseconds)
    place.innerText = weatherData.city.name;
    date.innerText =  currentDay.toLocaleDateString('en-US', { weekday: 'short' });
    degrees.innerHTML = `${parseInt(main.temp)}${degSymbol}`;
    min.innerHTML = `Min: ${parseInt(main.temp_min)}${degSymbol}`; //fixed it, it was innerhtml not inner text, was struggling to get the degree symbol to actually show up
    max.innerHTML = `Max: ${parseInt(main.temp_max)}${degSymbol}`;

    forecastContainer.innerHTML = '' //clear previous data otherwise it just all adds up
   
    for (let i = 1; i <= 5; i++) { //adds the 5 day weather forcast, not styled yet, will do that later on
      let forecast = weatherData.list[i];
      let forecastDt = forecast.dt * 1000;
      let forecastDay = new Date(forecastDt);

      forecastDay.setDate(currentDay.getDate() + i);
  
      // Create a new column for each day
      let forecastColumn = document.createElement('div');
      forecastColumn.classList.add('col');
      forecastContainer.appendChild(forecastColumn);
      
      // Creates elements to display the data
      let forecastDate = document.createElement('div');
      forecastDate.innerText = forecastDay.toLocaleDateString('en-US', { weekday: 'short' });
      forecastColumn.appendChild(forecastDate);
      
      let forecastDegrees = document.createElement('div');
      forecastDegrees.innerHTML = parseInt(forecast.main.temp);
      forecastColumn.appendChild(forecastDegrees);
      
      let forecastTemp = document.createElement('div');
      forecastTemp.innerHTML = `
        Min: ${parseInt(forecast.main.temp_min)}${degSymbol}
        Max: ${parseInt(forecast.main.temp_max)}${degSymbol}
      `;
      forecastColumn.appendChild(forecastTemp);
    }
    
    search.value = '';

    
}

//with the help of chatGBT and a whole bunch of other things like in the styles.css, we not have a scrollable list when amount of cities get beyond three
//i will update this with yes or no if doing it so different like this causes me problems with the functionality of the list later --> (yes)
function addFavorite(cityData) {
  const newFavorite = document.createElement("li");
  newFavorite.className = "list-group-item";
  newFavorite.textContent = cityData.name;
  newFavorite.weatherData = cityData.weatherData; // Store the weather data object

  favorites.appendChild(newFavorite);

  if (favorites.children.length > 0) { //making the scroll bar word after it gets to a certain length of favorites
    if (!favoritesContainer) {
      favoritesContainer = document.createElement("div");
      favoritesContainer.className = "favoritesContainer";
      favorites.parentElement.insertBefore(favoritesContainer, favorites);
      favoritesContainer.appendChild(favorites);
    }
  }

  newFavorite.addEventListener('click', (e) => {
    getWeather(newFavorite.weatherData); // Fetch the weather data from the stored object
  });
  
}



