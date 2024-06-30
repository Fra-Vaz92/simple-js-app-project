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
    types:"fire", 

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
]

let expectedKeys = ["name", "height", "type"];

    return{
        add: function(pokemon) {
            pokemonlist.push(pokemon);
        },

    getAll: function() {
        return pokemonlist;
    },

    add: function (pokemon) {
        // Check if the parameter is an object
        if (typeof pokemon === 'object') {
          // Check if all expected keys are present using Object.keys
          const pokemonKeys = Object.keys(pokemon);
          if (pokemonKeys.length === expectedKeys.length && pokemonKeys.every(key => expectedKeys.includes(key))) {
            // All expected keys are present, add the Pokemon
            pokemonlist.push(pokemon);
          } else {
            console.error("Error: Invalid Pokemon object. Missing required properties.");
          }
        } else {
          console.error("Error: Invalid data type. Only Pokemon objects can be added.");
        }
      }

    }
})();

console.log(pokemonRepository.getAll());
pokemonRepository.add({name:'Pikachu', height:0.4, type: ['Electric']});
console.log(pokemonRepository.getAll());



pokemonRepository.getAll().forEach(function(pokemon){
    if (pokemon.height >1) {
        document.write("<h3>" + pokemon.name + " " + "(height:" + " " + pokemon.height + ")" + "</h3>" + "<p>Wow! it\'s big!</p>");
    }else {
        document.write("<h3>" + pokemon.name + " " + "(height:" + " " + pokemon.height + ")" + "</h3>");
    }
    console.log(pokemon);
 });

 function filterbyName(PokemonName){
    return pokemonRepository
    .getAll()
    .filter((name) => name.name.toLowerCase().includes(pokemoName.toLoweCase())
);
}