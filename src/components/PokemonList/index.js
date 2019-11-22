import React from 'react';

class PokemonList extends React.Component{
    
    state = {
        pokemons: []
    };

    componentDidMount = () => {
        console.log("componentDidMount...");
        this.setState({pokemons: this.props.pokemons});
    }

    componentDidUpdate = (prevProps) => {
        console.log("componentDidUpdate...");
        if(this.props.pokemons !== prevProps.pokemons){
            this.setState({pokemons: this.props.pokemons});
        }
    }

    render(){
        const { pokemons } = this.state;
        const {activeItem, activeIndex } = this.props;
        return(
            <div className="wrapper-list">
              <nav>
                <ul className="list-pokemon">
                  {
                    pokemons.map((pokemon, index) => (
                      <li className={ (index === activeIndex) ? "list-pokemon_item active" : "list-pokemon_item"} onClick={(e) => activeItem(e, index)} key={index}>
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
}

export default PokemonList;
