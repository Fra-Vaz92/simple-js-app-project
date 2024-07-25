let pokemonRepository = (function () {
  let modalContainer = document.querySelector('#modal-container');
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

  function showModal(title, text, img){
    //clear the modal container
    modalContainer.innerHTML = "";

    let modal = document.createElement("div");
    modal.classList.add("modal");


    //add button, h1, p elements in the modal
  let closeButtonElement = document.createElement("button");
  closeButtonElement.classList.add("modal-close");
  closeButtonElement.innerText = "Close";
  closeButtonElement.addEventListener("click", hideModal);


  let titleElement = document.createElement('h1');
  titleElement.classList.add("modal-title");
  titleElement.innerText = title;

  let contentElement = document.createElement('p');
  contentElement.setAttribute("id", "pokemon-height");
  contentElement.innerText = text;

  let imageElement = document.createElement('img');
  imageElement.setAttribute("id", "pokemon-image");
  imageElement.src = img;

  
  modal.appendChild(closeButtonElement);
  modal.appendChild(titleElement);
  modal.appendChild(contentElement);
  modal.appendChild(imageElement);
  modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");
  }

  let dialogPromiseReject;
  function hideModal() {
  let modalContainer = document.querySelector('#modal-container');
  modalContainer.classList.remove('is-visible');

  if (dialogPromiseReject) {
    dialogPromiseReject();
    dialogPromiseReject = null;
  }
}

  function showDialog(title, text) {
    showModal(title, text);
  
    let modalContainer = document.querySelector('#modal-container');
  
    // We want to add a confirm and cancel button to the modal
    let modal = modalContainer.querySelector('.modal');
  
    let confirmButton = document.createElement('button');
    confirmButton.classList.add('modal-confirm');
    confirmButton.innerText = 'Confirm';
  
    let cancelButton = document.createElement('button');
    cancelButton.classList.add('modal-cancel');
    cancelButton.innerText = 'Cancel';
  
    modal.appendChild(confirmButton);
    modal.appendChild(cancelButton);
  
    confirmButton.focus();
    return new Promise((resolve, reject) => {
      cancelButton.addEventListener('click', hideModal);
      confirmButton.addEventListener('click', () => {
      dialogPromiseReject = null;
      hideModal();
      resolve();
    });
    dialogPromiseReject = reject;
  });
  }

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?');
  });

  document.querySelector('#show-dialog').addEventListener('click', () => {
    showDialog('Confirm action', 'Are you sure you want to do this?').then(function() {
      alert('confirmed!');
    }, () => {
      alert('not confirmed');
    });
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();  
    }
  });

  modalContainer = document.querySelector("#modal-container");
    modalContainer.addEventListener('click', (e) => {
    let target = e.target;
    if (target === modalContainer) {
      hideModal();
    }
  });

  document.querySelector("#show-modal").addEventListener("click",()=>{
    showModal("Modal Title", "This is the modal content!");
  });
  
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
    let url = item.detailsUrl;
    return fetch(url).then(function(response) {
      return response.json();
    }).then(function (details) {
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
    }


    function showDetails(pokemon) {
      pokemonRepository.loadDetails(pokemon).then(function() {  
        showModal(
          pokemon.name,
          "Height: " + pokemon.height + " " + "cm",
          pokemon.imageUrl,
        );
    });
    }


  return{
  add: add,
  getAll: getAll,
  addListItem: addListItem,
  loadList: loadList,
  loadDetails: loadDetails,
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