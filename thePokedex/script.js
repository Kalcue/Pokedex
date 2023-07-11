document.querySelector('#search').addEventListener('click', getPokemon);

function capitilizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function lowerCaseName(string) {
    return string.toLowerCase();
}

function getPokemon(e) {
    const name = document.querySelector('#pokemonName').value;
    const pokemonName = lowerCaseName(name);

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => {
            const abilities = data.abilities.map((ability) => ability.ability.name);
            const types = data.types.map((type) => type.type.name);

            document.querySelector(".pokemonBox").innerHTML = `
        <div>
        <img src="${data.sprites.other["official-artwork"].front_default}" 
        alt="${capitilizeFirstLetter(data.name)}">
    </div>
    <div class="pokemonInfo">
        <h1>${capitilizeFirstLetter(data.name)}</h1>
        <p>Weight: ${data.weight}</p>
        <p>Type: ${types.join(', ')}</p>
        <p>Abilities: ${abilities.join(', ')}</p>
    </div>
        `
        })
        .catch((err) => {
            console.log('Pokemon Not Found', err);
        });

    e.preventDefault();
}

