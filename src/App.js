import React, { useState, useEffect } from 'react';
import './styles/fonts.css';
import './styles/style.css';
import PokemonList from './components/PokemonList';
import PokemonView from './components/PokemonView';

const App = () => {

  const [pokemons, setPokemons] = useState([]);
  const [pokemonFound, setPokemonFound] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);


  useEffect(() => {
    async function fetchData(){
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
      const pokemons = await response.json();
      setPokemons(pokemons.results);
    }
    fetchData();
  }, []);


  async function handleSearchPokemon(pokemonName){
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
    const pokemonFound = await response.json();
    setPokemonFound(pokemonFound);

    // this.setState({pokemonFound: [pokemonFound]})
  }

  function activeItem(e, index){
    let pokemonName = e.target.innerText;
    setActiveIndex(index);
    setTimeout(() => {
      handleSearchPokemon(pokemonName)
    }, 100);
  } 

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
          <PokemonList pokemons={pokemons} activeItem={activeItem} activeIndex={activeIndex}/>
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


export default App;
