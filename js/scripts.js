let pokemonRepository = (function () {
  let pokemonlist = [
  
  {
   name: "Bulbasaur",
   height: 0.7,
   types:["grass", "poison"]
  
  },
  
  {
  name: "Charmander",
  height: 0.6,
  types:["fire"], 
  
  },
  
  {
  name: "Gastly",
  height: 1.3,
  types:["ghost", "poison"]
  
  },
  
  {
   name: "Squirtle",
   height: 0.5,
   types:["water"]
  
  },
  
  {
   name: "Charizard",
  height: 1.7,
  types:["fire", "flying"]
      
  },
  ];
  
  function add(pokemon){
   if (typeof pokemon === 'object') {
      // Check if all expected keys are present
      const pokemonKeys = Object.keys(pokemon);
      const expectedKeys = ["name", "height", "type"]; 
      const allKeysPresent = pokemonKeys.length === expectedKeys.length && 
                            pokemonKeys.every(key => expectedKeys.includes(key));
      if (allKeysPresent) {
        pokemonlist.push(pokemon); 
      } else {
        console.error("Error: Invalid Pokemon object. Missing required properties.");
      }
    } else {
      console.error("Error: Invalid data type. Only Pokemon objects can be added.");
    }
  
  }
  
  function getAll() {
      return pokemonlist;
  }
  
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click', function (event) {
      console.log(pokemon.name);
    })
  }
  
  function showDetails(pokemon) {
    console.log(pokemon)
  }
  
  return{
    add: add,

    getAll: getAll,

   addListItem: addListItem
  }
    
  })();
  
  console.log(pokemonRepository.getAll());
  pokemonRepository.add({name:'Pikachu', height:0.4, type: ['Electric']});
  console.log(pokemonRepository.getAll());
  
  
  pokemonRepository.getAll().forEach(function(pokemon){
  
  pokemonRepository.addListItem(pokemon);
  });
  
  function filterbyName(PokemonName){
    return pokemonRepository
    .getAll()
    .filter((name) => name.name.toLowerCase().includes(pokemonName.toLowerCase()));
  }