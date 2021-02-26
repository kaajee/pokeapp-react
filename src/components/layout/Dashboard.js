import React, {Component} from 'react';
import PokemonList from "../pokemon/PokemonList";

class Dashboard extends Component {
    render() {
        return (
            <div>
                <PokemonList />
            </div>
        );
    }
}

export default Dashboard;
