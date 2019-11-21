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
    this.setState({activeIndex: index}, () => this.handleSearchPokemon(pokemonName));
  } 

  render(){
    const { pokemons, pokemonFinded, activeIndex } = this.state;
    console.log(pokemonFinded);
    return (
      <div className="container">
        <div className="pokedex-moldure">
          <div className="pokedex-header">
            <div className="circle-main"></div>
            <div className="circle-one"></div>
            <div className="circle-two"></div>
            <div className="circle-tree"></div>
          </div>
          <div className="pokedex-content">
            <div className="wrapper-list">
              <nav>
                <ul className="list-pokemon">
                  {
                    pokemons.map((pokemon, index) => (
                      <li className={ (index === activeIndex) ? "list-pokemon_item active" : "list-pokemon_item"} onClick={(e) => this.activeItem(e, index)} key={index}>
                        <span className="disabled">{pokemon.url}</span>
                        {pokemon.name}
                      </li>
                    ))
                  }
                  </ul>
                </nav>
            </div>
            <div className="wrapper-avatar">
              {
                (pokemonFinded.length > 0) && pokemonFinded.map(pokemon => (
                  <div key={pokemon.id}>
                    <div className="pokemon-avatar">
                      <img src={pokemon.sprites.front_default} />
                    </div>
                    <h3 className="pokemon-name">{pokemon.name}</h3>
                    <div className="abilities-list">
                      {
                        pokemon.abilities.map((ability, index) => (
                          <div key={index} className="ability-list_item">{ability.ability.name}</div>
                        ))
                      }
                      <div></div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
