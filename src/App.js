import React from 'react';
import './styles/fonts.css';
import './styles/style.css';
import PokemonList from './components/PokemonList';
import PokemonView from './components/PokemonView';

class App extends React.Component{

  state = {
    pokemons: [],
    qtdPokemons: 0,
    pokemonFound: [],
    selectedPokemon: ''
  }

  componentDidMount = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const pokemons = await response.json();
    this.setState({pokemons: pokemons.results, qtdPokemons: pokemons.count});
  }

  handleSearchPokemon = async (pokemonName) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonFound = await response.json();

    this.setState({pokemonFound: [pokemonFound]})
  }

  activeItem = (e, index) => {
    let pokemonName = e.target.innerText;
    this.setState({activeIndex: index}, () => this.handleSearchPokemon(pokemonName));
  } 

  render(){
    const { pokemons, pokemonFound, activeIndex } = this.state;
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
            <PokemonList pokemons={pokemons} activeItem={this.activeItem} activeIndex={activeIndex}/>
            <PokemonView pokemonFound={pokemonFound} />
          </div>
          <div className="pokedex-controls">
            <div className="plus-direction">+</div>
            <div className="wrapper-commands">
              <div className="command-one"></div>
              <div className="command-two"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
