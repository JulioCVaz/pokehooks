import React from 'react';
import './styles/style.css';

class App extends React.Component{

  state = {
    pokemons: [],
    qtdPokemons: 0,
    pokemonFinded: [],
    pokemonChain: [],
    selectedPokemon: ''
  }

  componentDidMount = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
    const pokemons = await response.json();
    this.setState({pokemons: pokemons.results, qtdPokemons: pokemons.count});
  }

  handleSearchPokemon = async (pokemonName) => {
    // promise hell para exemplo no meetup 
    await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).
            then((response) => response.json()).
            then(json => this.setState({pokemonFinded: [json]}, 
              () => fetch(`https://pokeapi.co/api/v2/evolution-chain/${this.state.pokemonFinded[0].id}`).
                     then(response => response.json()).
                     then(json => this.setState({pokemonChain: [json]})).
                     catch((err) => console.log(err)))).
            catch((err) => console.log(err));
  }

  activeItem = (e) => {
    let pokemonName = e.target.innerText;
    this.setState({selectedPokemon: pokemonName}, () => this.handleSearchPokemon(pokemonName));
  } 

  render(){
    const { pokemons, selectedPokemon, pokemonFinded, pokemonChain } = this.state;
    console.log(pokemonFinded);
    console.log(pokemonChain);
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
