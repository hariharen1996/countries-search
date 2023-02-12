let searchInputEl = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");
let resultCountries = document.getElementById("resultCountries");

let searchInputValue = "";
let countriesList = [];

function createAndAppendCountry(country) {
  let countryEl = document.createElement("div");
  countryEl.classList.add(
    "country-card",
    "col-11",
    "col-md-5",
    "mr-auto",
    "ml-auto",
    "d-flex",
    "flex-row"
  );
  resultCountries.appendChild(countryEl);

  let countryImageEl = document.createElement("img");
  countryImageEl.src = country.flag;
  countryImageEl.classList.add("country-flag", "mt-auto", "mb-auto");
  countryEl.appendChild(countryImageEl);

  let countryInfoEl = document.createElement("div");
  countryInfoEl.classList.add("d-flex", "flex-column", "ml-4");
  countryEl.appendChild(countryInfoEl);

  let countryNameEl = document.createElement("p");
  countryNameEl.textContent = country.name;
  countryNameEl.classList.add("country-name");
  countryInfoEl.appendChild(countryNameEl);

  let countryPopulationEl = document.createElement("p");
  countryPopulationEl.textContent = country.population;
  countryPopulationEl.classList.add("country-population");
  countryInfoEl.appendChild(countryPopulationEl);
}

function displaySearch() {
  resultCountries.textContent = "";
  for (let country of countriesList) {
    let countryName = country.name;
    if (countryName.toLowerCase().includes(searchInputValue.toLowerCase())) {
      createAndAppendCountry(country);
    }
  }
}

function getCountries() {
  let url = "https://apis.ccbp.in/countries-data";
  let options = {
    method: "GET",
  };

  spinner.classList.remove("d-none");

  fetch(url, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      spinner.classList.add("d-none");
      countriesList = data;
      displaySearch();
    });
}

function onChangeSearch(event) {
  searchInputValue = event.target.value;
  displaySearch();
}

getCountries();
searchInputEl.addEventListener("keyup", onChangeSearch);
