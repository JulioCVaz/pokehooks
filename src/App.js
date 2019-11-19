import React from 'react';
import './styles/style.css';

class App extends React.Component{

  state = {
    pokemons: [],
    pokemonFinded: [],
    selectedPokemon: ''
  }

  componentDidMount = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=20&offset=0`);
    const pokemons = await response.json();
    this.setState({pokemons: pokemons.results});
  }

  handleSearchPokemon = async (pokemonName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonFinded = await response.json();
    this.setState({pokemonFinded: [ pokemonFinded ]});
  }

  activeItem = (e) => {
    let pokemonName = e.target.innerText;
    this.setState({selectedPokemon: pokemonName}, () => this.handleSearchPokemon(pokemonName));
  } 

  render(){
    const { pokemons, selectedPokemon, pokemonFinded } = this.state;
    console.log(pokemonFinded.length);
    return (
      <div>
        <div>
          <h1>{selectedPokemon}</h1>
          <nav>
            <ul style={{overflow:"hidden", overflowY :"scroll", height:"200px", width: "150px"}}>
              {
                pokemons.map((pokemon, index) => (
                  <li onClick={(e) => this.activeItem(e)} key={index}>
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
