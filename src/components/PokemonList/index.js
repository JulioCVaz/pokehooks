import React, { useState, useEffect } from 'react';

const PokemonList = props => {
    const [pokemons, setPokemons] = useState([]);

    useEffect(() => {
      setPokemons(props.pokemons);
      return () => { console.log("ComponentWillUnMount...")};
    }, [props.pokemons]);

    return(
      <div className="wrapper-list">
        <nav>
          <ul className="list-pokemon">
            {
              pokemons.map((pokemon, index) => (
                <li className={ (index === props.activeIndex) ? "list-pokemon_item active" : "list-pokemon_item"} onClick={(e) => props.activeItem(e, index)} key={index}>
                  <span className="disabled">{pokemon.url}</span>
                  {pokemon.name}
                </li>
              ))
            }
            </ul>
          </nav>
      </div>
    )
    
}

export default PokemonList;
