import React, { useState, useEffect } from 'react';

const PokemonView = props => {
    const [pokemonFound, setPokemonFound] = useState([]);

    useEffect(() => {
      setPokemonFound(props.pokemonFound);
    }, [props.pokemonFound]);

    return (
        <div className="wrapper-avatar">
          {
            pokemonFound.map(pokemon => (
                <div key={pokemon.id}>
                <div className="pokemon-avatar">
                  <img src={pokemon.sprites.front_default} alt="pokemon"/>
                </div>
                <div className="pokemon-description">
                  <h3 className="pokemon-name">{pokemon.name}</h3>
                  <div className="abilities-list">
                    {
                      pokemon.abilities.map((ability, index) => (
                        <div key={index} className="ability-list_item">{ability.ability.name}</div>
                      ))
                    }
                  </div>
                </div>
              </div>
            ))}
        </div>
    );

}

export default PokemonView;