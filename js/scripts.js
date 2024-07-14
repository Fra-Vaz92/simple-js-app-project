let pokemonRepository = (function () {
  let pokemonlist = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 

  function add(pokemon){
    const expectedKeys = ["name"];
    if (typeof pokemon !== 'object' || !Object.keys(pokemon).every(key => expectedKeys.includes(key))) {
       return;
    }
        pokemonlist.push(pokemon); 
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
    button.addEventListener("click", function(event) {
    showDetails(pokemon);
      });
    }

  async function loadList() {
        return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }


  async function loadDetails(item) {
    let url= item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.heigths = details.heigths;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
    }

    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function() {
      console.log(pokemon);
    });
    }

  return{
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showDetails: showDetails
  };
    
  })();
  
  pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon){
  pokemonRepository.addListItem(pokemon);
    });
  });
  
  function filterbyName(PokemonName){
    return pokemonRepository
    .getAll()
    .filter((name) => name.name.toLowerCase().includes(pokemonName.toLowerCase()));
  }