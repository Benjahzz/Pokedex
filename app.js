const searchBtn = document.querySelector('#btn-search');
const inputSearch = document.querySelector('#input-text');
const body = document.querySelector('body');
const containerMain = document.querySelector('.container-main');
const aside = document.querySelector('.aside');
var wrapper = document.querySelector('.wrapper');
const colorsType = {
    electric: '#FFEA70',
    normal: '#B09398',
    fire: '#FF675C',
    water: '#0596C7',
    ice: '#AFEAFD',
    rock: '#999799',
    flying: '#7AE7C7',
    grass: '#4A9681',
    psychic: '#FFC6D9',
    ghost: '#561D25',
    bug: '#A2FAA3',
    poison: '#795663',
    ground: '#D2B074',
    dragon: '#DA627D',
    steel: '#1D8A99',
    fighting: '#2F2F2F',
    dark: '#705848',
    default: '#2A1A1F'

};


window.onload = () =>{
    $('.wrapper').fadeOut();
    
}
// Inicial
function fetchPokemon(id){
    

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json()).then(data => createCards(data));
}
function fetchPokemonType(id,tipo){
    

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(res => res.json()).then(data =>  filtrarPokemons(data,tipo));
}


function fetchPokemons(){
    for(var i = 1; i <= 100 ; i++){
        fetchPokemon(i);
    }
}


function buscarPokemonPorTipo(tipo){
    
    containerMain.innerHTML = "";
    containerMain.style.display = "grid";
    for(var i = 1; i <= 890 ; i++){
        fetchPokemonType(i,tipo);
        
    }
}

function filtrarPokemons(data,tipo){
    const {types} = data;
    types.forEach(tipos =>{
        if(tipos.type.name == tipo){
            createCardsTipo(data);
        }
    });
}



function createCards(data){
    
    const {stats, types} = data;

    const card = document.createElement('div');
    card.classList.add('card');

    containerMain.appendChild(card);

    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    
    imgContainer.classList.add('img-container')
    img.classList.add('img');
    img.src = data.sprites.front_default;
    imgContainer.appendChild(img);

    card.appendChild(imgContainer);

    card.appendChild(createTypes(types));

    

}
function createCardsTipo(data){
    
    const {stats, types} = data;

    const card = document.createElement('div');
    card.classList.add('card');

    containerMain.appendChild(card);

    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    
    imgContainer.classList.add('img-container')
    img.classList.add('img');
    img.src = data.sprites.front_default;
    imgContainer.appendChild(img);

    card.appendChild(imgContainer);

    card.appendChild(createTypes(types));

    

}

function createTypes(types){
    const typesContainer = document.createElement('div');
    typesContainer.classList.add('container-types');
    types.forEach(type => {
        const divType = document.createElement('div');
        divType.textContent = type.type.name;
        divType.style.backgroundColor = colorsType[type.type.name];
        divType.classList.add("type")
        typesContainer.appendChild(divType);
    });
    return typesContainer;

}



fetchPokemons();






// Funciones de crear una unica card ------------

function buscarPokemonUnico(event){
    event.preventDefault();
    var pokemon = event.target.inputPokemon.value;
    containerMain.innerHTML = '';

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}/`)
    .then(res => res.json()).then(data => crearCartaUnica(data));
}



function crearCartaUnica(data){

    const {stats, types} = data;

    const card = document.createElement('div');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const pokemonId = document.createElement('p');
    containerMain.style.display = "flex";
    

    

    

    const statsContainer = crearContainerStats(stats);
    pokemonId.textContent = `${data.name} - #${data.id}`
    
    imgContainer.classList.add('img-container')

    img.classList.add('img-unica');
   
    card.classList.add('card-unica');

    statsContainer.classList.add('stats-container');
    
    img.src = data.sprites.front_default;


    containerMain.appendChild(card);
    containerMain.appendChild(statsContainer);
    
card.appendChild(pokemonId);
    card.appendChild(imgContainer);

    card.appendChild(createTypes(types));
    

    imgContainer.appendChild(img);
}



function crearContainerStats(data){
    
    const statsContainer = document.createElement('div');

    data.forEach(type =>{
        
        const divNombre = document.createElement('div');
        const divStat = document.createElement('div');
        divNombre.textContent = type.stat.name;
        divStat.textContent = type.base_stat;
        statsContainer.appendChild(divNombre);
        statsContainer.appendChild(divStat);
    })
    return statsContainer;
}