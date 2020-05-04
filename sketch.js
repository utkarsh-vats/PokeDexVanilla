// urls:
// https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png
// https://pokeapi.co/api/v2/pokemon/${id}


const poke_container = document.getElementById('poke_container');
const generationFilter = document.querySelector('.generation-select');
const pokemons_number = 807;

const colors = {
	fire: '#fddfdf',
	grass: '#defde0',
	electric: '#fcf7de',
	water: '#def3fd',
	ground: '#f4e7da',
	rock: '#d5d5d4',
	fairy: '#fceaff',
	poison: '#98d7a5',
	bug: '#f8d5a3',
	dragon: '#97b3e6',
	psychic: '#eaeda1',
	flying: '#f5f5f5',
	fighting: '#e6e0d4',
	normal: '#f5f5f5'
}

const initialIdx = {
	1: 1,
	2: 152,
	3: 252,
	4: 387,
	5: 494,
	6: 650,
	7: 722
}

const lastIdx = {
	1: 151,
	2: 251,
	3: 386,
	4: 494,
	5: 649,
	6: 721,
	7: 807
}

const main_types= Object.keys(colors);

var isCreated = new Array(807);

generationFilter.addEventListener('click', filterPokemon);

const fetchPokemons = async (m, n) => {
	for(let i = m; i <= n; i++){
		if(!isCreated[i])
			await getPokemon(i);
	}
}

fetchPokemons(800, 807);

const getPokemon = async id => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const pokemon = await res.json();
	createPokemonCard(pokemon);
	// console.log(pokemon);
}

function createPokemonCard(pokemon) {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');
	
	const poke_types = pokemon.types.map(typeEl => typeEl.type.name);
	const type = main_types.find(type => poke_types.indexOf(type) > -1);
	const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
	const color = colors[type];

	pokemonEl.style.backgroundColor = color;
	
	const pokeInnerHTML = `
		<style>
			.pokemon {
				-moz-osx-font-smoothing: grayscale;
  				backface-visibility: hidden;
				transform: translateZ(0);
  				transition: transform 0.25s ease-out;
			}
			.pokemon:focus{
				cursor: pointer;
				transform: scale(1.05);
			}
		</style>
		<div class="img-container">
			<img src="https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png"/>
		</div>
		<div class="info">
			<span class="number">#${pokemon.id.toString().padStart(3,"0")}</span>
			<h3 class="name">${name}</h3>
			<small class="type">Type: <span>${type}</span></small>
		</div>
	`;

	pokemonEl.innerHTML = pokeInnerHTML;

	poke_container.appendChild(pokemonEl);
}

for(var i = 800; i<= 807; i++)
	isCreated[i] = false;
fetchPokemons(800, 807);

function filterPokemon(event) {
	// for(var i = initialIdx[event.target.value]; i <= lastIdx[event.target.value]; i++){
	// 	isCreated[i] = false;
	// }
	// fetchPokemons(initialIdx[event.target.value], lastIdx[event.target.value]);
}