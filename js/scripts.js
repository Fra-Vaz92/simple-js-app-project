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
];

for (let i=0; i < pokemonlist.length; i++) {
    if (pokemonlist[i].height >1) {
        document.write("<h3>" + pokemonlist[i].name + " " + "(height:" + " " + pokemonlist[i].height + ")" + "</h3>" + "<p>Wow! it\'s big!</p>");
    }else {
        document.write("<h3>" + pokemonlist[i].name + " " + "(height:" + " " + pokemonlist[i].height + ")" + "</h3>");
    }
 }
