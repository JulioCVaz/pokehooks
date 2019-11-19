import React from 'react';

class App extends React.Component{

  state = {
    pokemons: []
  }

  componentDidMount = async () => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=20&offset=0`);
    const pokemons = await response.json();
    this.setState({pokemons: pokemons.results});
  }

  render(){
    const { pokemons } = this.state;
    console.log(pokemons);
    return (
      <div className="App">
        <ul>
          {
            pokemons.map(pokemon => (
              <li>{pokemon.name}</li>
            ))
          }
        </ul>
      </div>
    );
  }
}

export default App;
