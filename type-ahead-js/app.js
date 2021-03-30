
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const dataArray = [];
fetch(endpoint)
  .then(blob => blob.json())
  .then(data => dataArray.push(...data));

const containerDiv = document.getElementById("container")
const input = document.getElementById("input")
const ulEl = document.querySelector('.options')

function filterPlaces(value, dataArray) {
  return dataArray.filter(item => {
    let city = item.city.toUpperCase();
    let state = item.state.toUpperCase();
    return city.includes(value.toUpperCase()) || state.includes(value.toUpperCase())

  });
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function displayMatches() {
  const filteredArray = filterPlaces(this.value, dataArray)
  const html = filteredArray.map(place => {
    const regex = new RegExp(this.value, 'gi');
    const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
    const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);
    return `
      <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${numberWithCommas(place.population)}</span>
      </li>
    `;
  }).join('');

  ulEl.innerHTML = html;
}

input.addEventListener('change', displayMatches);
input.addEventListener('keyup', displayMatches);
