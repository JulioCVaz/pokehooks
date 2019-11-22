import React from 'react';

class PokemonView extends React.Component{

    state = {
        pokemonFound: []
    };

    componentDidMount = () => {
        console.log("componentDidMount...");
        this.setState({pokemonFound: this.props.pokemonFound});
    }

    componentDidUpdate = (prevProps) => {
        console.log("componentDidUpdate...");
        if(this.props.pokemonFound !== prevProps.pokemonFound){
            this.setState({pokemonFound: this.props.pokemonFound});
        }
    }

    render(){
        const { pokemonFound } = this.state;
        return (
            <div className="wrapper-avatar">
              {
                (pokemonFound.length > 0) && pokemonFound.map(pokemon => (
                  <div key={pokemon.id}>
                    <div className="pokemon-avatar">
                      <img src={pokemon.sprites.front_default} />
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
                ))
              }
            </div>
        );
    }
}

export default PokemonView;