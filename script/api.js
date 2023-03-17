const capitalInput = document.querySelector("#capital");
const generateButton = document.querySelector("#generate");
const container = document.querySelector(".container");

const sceleton = (name, state, image, population, googleMap) => {
  return `
    <div class="capital">
        <h2>Name: ${name}</h2>
        <p>State: ${state}</p>
        <img width="400px" height="300px" alt=${name} src=${image}>
        <span>Population: ${population}</span>
        <a href=${googleMap} target="_blank"><button>Google Map</button></a>
    </div>
    `;
};

const handleApi = () => {
  const capital = capitalInput.value;
  fetch(`https://restcountries.com/v3.1/capital/${capital}`)
    .then((res) => res.json())
    .then((data) => {
      const [capitalData] = data;
      const { flags, maps, name, population } = capitalData;
      const { common: countryName } = name;
      const { png: countryFlag } = flags;
      const { googleMaps } = maps;
      container.innerHTML += sceleton(
        capital.toUpperCase(),
        countryName,
        countryFlag,
        population,
        googleMaps
      );
    });
};

document.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    handleApi();
  }
});
generateButton.addEventListener("click", handleApi);
