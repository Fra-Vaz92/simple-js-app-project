let pokemonRepository = (function () {
  let pokemonlist = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'; 

  function add(pokemon){
    let expectedKeys = ["name","detailsUrl","imageUrl"];
    if (typeof pokemon !== 'object' || !Object.keys(pokemon).every(key => expectedKeys.includes(key))) {
       return;
    }
        pokemonlist.push(pokemon); 
    } 
  
  
  function getAll() {
      return pokemonlist;
  }


  function showModal(pokemon){
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    let modalHeader = $(".modal-header");

    modalTitle.empty();
    modalBody.empty();


    let nameElement = $("<h1>" + pokemon.name + "</h1>");
    let imageElementFront = $('<img class="modal-img" style ="width:50%">');
    imageElementFront.attr("src", pokemon.imageUrlFront);
    let imageElementBack = $('<img class="modal-img" style ="width:50%">');
    imageElementBack.attr("src", pokemon.imageUrlBack);
    let heightElement = $("<p>" + "height: " + pokemon.height + "</p>");
    let weightElement = $("<p>" + "weight: " + pokemon.weight + "</p>");
    let typesElement = $("<p>" + "types: " + pokemon.types + "</p>");
    let abilitiesElement = $("<p>" + "abilities: " + pokemon.abilities + "</p>");


    modalTitle.append(nameElement);
    modalBody.append(imageElementFront);
    modalBody.append(imageElementBack);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }



  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listpokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    button.classList.add('list-group-item');
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
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.weight = details.weight;
      item.types = details.types.map(typeInfo => typeInfo.type.name);
      item.abilities = details.abilities.map(abilityInfo => abilityInfo.ability.name);
    }).catch(function (e) {
      console.error(e);
    });
    }


    function showDetails(pokemon) {
      loadDetails(pokemon).then(function() {  
            $('#pokemonName').text(pokemon.name);
            $('#pokemonHeight').text('Height: ' + pokemon.height);
            $('#pokemonImage').attr('src', pokemon.imageUrl);
            $('#pokemonWeight').text('Weight: ' + pokemon.weight);
            $('#pokemonTypes').text('Types: ' + pokemon.types);
            $('#pokemonAbilities').text('Abilities: ' + pokemon.abilities);
            $('#pokemonModal').modal('show');
    });
    }

    // New function for search functionality
  function searchPokemon(searchTerm) {
    let filteredList = getAll().filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // Clear existing list items
    document.querySelector('.pokemon-list').innerHTML = '';
    // Add list items for filtered Pokemon
    filteredList.forEach(addListItem);
  }

  return{
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
  showModal: showModal,
  searchPokemon: searchPokemon
  };
    
  })();
  
  pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function (pokemon){
  pokemonRepository.addListItem(pokemon);
    });

  });

  // Get the search bar element
let searchBar = document.getElementById('pokemon-search-bar');

// Add event listener for search bar input
searchBar.addEventListener('keyup', function (event) {
  let searchTerm = event.target.value;
  pokemonRepository.searchPokemon(searchTerm);
});
  
  function filterbyName(PokemonName){
    return pokemonRepository
    .getAll()
    .filter((name) => name.name.toLowerCase().includes(pokemonName.toLowerCase()));
  }