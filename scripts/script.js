let search = document.getElementById('search');
let btn = document.getElementById('btn');
let city = document.getElementById('city');
let date = document.getElementById('date');
let degrees = document.getElementById('degrees');
let min = document.getElementById('min');
let max = document.getElementById('max');
let favBtn = document.getElementById('favBtn');
let delBtn = document.getElementById('delBtn');
let favorites = document.getElementById('favorites');
let favoritesContainer = document.querySelector('.favoritesContainer');

function addFavorite(cityName) //with the help of chat gpt i spend and hour figuring this out along with all the parts for it you will see in the styles.css
{
  const newFavorite = document.createElement("li");
  newFavorite.className = "list-group-item";
  newFavorite.textContent = cityName;
  favorites.appendChild(newFavorite);

  if (favorites.children.length > 0) {
    if (!favoritesContainer) {
      // create the scrollable container and move the existing favorites list inside it
      favoritesContainer = document.createElement("div");
      favoritesContainer.className = "favoritesContainer";
      favorites.parentElement.insertBefore(favoritesContainer, favorites);
      favoritesContainer.appendChild(favorites);
    }
  }
}
addFavorite('lodi');
addFavorite('lodi');
addFavorite('lodi');
addFavorite('lodi');



