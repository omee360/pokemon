// Main containers
const appContainer = document.getElementById("appContainer");
const innerContainer = document.getElementById("innerContainer");
const searchForm = document.getElementById("searchForm");
const results = document.getElementById("results");
const imgContainer = document.getElementById("imgContainer");
const statsContainer = document.getElementById("statsContainer");

// Search form elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Pokémon details elements
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const sprite = document.getElementById("sprite");

// Pokémon type element
const types = document.getElementById("types");

// Pokémon stats elements
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");

// Pokemon Search API
const pokemonSearchApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/";
const pokemonImagesApi = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

// Helper Function
const isInputValid = (input) => {
  const cleanString = input.trim();
  if(!cleanString) {
    alert("This field cannot be empty");
    return false;
  }
  return true;
};

const fetchData = async (input) => {
  // console.log(input);
  try {
    const res = await fetch(pokemonSearchApi);
    const data = await res.json();
    // console.log(data);
    fetchPokemonDetails(input, data);
  } catch (error) {
    console.log("Error: ", error);
  }
}

const fetchPokemon = async (url) => {
  // console.log(input);
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data);
    displayData(data);
  } catch (error) {
    console.log("Error: ", error);
    return false;
  }
}

const displayData = data => {
  console.log(data.types);
  pokemonName.textContent = data.name;
  pokemonId.textContent = `#${data.id}`;
  weight.textContent = data.weight;
  height.textContent = data.height;
  sprite.src = data.sprites.front_default;
  types.innerHTML += data.types.map(el => {
    return `<span class="${el.type.name}">${el.type.name}</span>`
  }).join("");
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
}

const reset = () => {
  pokemonName.textContent = "";
  pokemonId.textContent = "";
  weight.textContent = "";
  height.textContent = "";
  sprite.src = "https://place-hold.it/100";
  types.textContent = "";
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
}

// Main function to get Pokemon details
const fetchPokemonDetails = (input, data) => {
  // console.log(data);
  const findObj = (data) => data.results.find(obj => obj.id.toString() === input || obj.name.toLowerCase() === input) || null;
  // console.log(findObj(data));
  const pokemonObj = findObj(data);
  if(pokemonObj !== null) {
    const fetchPokemonObj = obj => fetchPokemon(obj.url);
    fetchPokemonObj(pokemonObj);
    // console.log(pokemon.name);
  } else {
    alert("Pokémon not found");
  }
};

searchButton.addEventListener("click", e => {
  e.preventDefault();
  if(isInputValid(searchInput.value)) {
    fetchData(searchInput.value.trim().toLowerCase());
  }
  searchInput.value = "";
  reset();
});
