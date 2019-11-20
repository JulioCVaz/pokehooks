import React from 'react';
import './styles/style.css';

class App extends React.Component{

  state = {
    pokemons: [],
    qtdPokemons: 0,
    pokemonFinded: [],
    selectedPokemon: ''
  }

  componentDidMount = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const pokemons = await response.json();
    this.setState({pokemons: pokemons.results, qtdPokemons: pokemons.count});
  }

  handleSearchPokemon = async (pokemonName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonFinded = await response.json();

    this.setState({pokemonFinded: [pokemonFinded]})
  }

  activeItem = (e, index) => {
    let pokemonName = e.target.innerText;
    this.setState({selectedPokemon: pokemonName, activeIndex: index}, () => this.handleSearchPokemon(pokemonName));
  } 

  render(){
    const { pokemons, selectedPokemon, pokemonFinded, activeIndex } = this.state;
    console.log(pokemonFinded);
    return (
      <div className="container">
        <div>
          <h1>{selectedPokemon}</h1>
          <nav>
            <ul className="list-pokemon">
              {
                pokemons.map((pokemon, index) => (
                  <li className={ (index === activeIndex) ? "list-pokemon_item active" : "list-pokemon_item"} onClick={(e) => this.activeItem(e, index)} key={index}>
                    <span style={{display: "none"}}>{pokemon.url}</span>
                    {pokemon.name}
                  </li>
                ))
              }
              </ul>
            </nav>
          </div>
          <div>
            {
              (pokemonFinded.length > 0) && pokemonFinded.map(pokemon => (
                <div key={pokemon.id}>
                  <h3>{pokemon.name}</h3>
                  <img src={pokemon.sprites.front_default} />
                </div>
              ))
            }
          </div>
      </div>
    );
  }
}

export default App;
