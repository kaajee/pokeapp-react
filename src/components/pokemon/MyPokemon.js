import React, {Component} from 'react';
import { connect } from 'react-redux';

import { mapDispatchToProps } from './actionCreators';
import { mapStateToProps } from './selectors';
import PokemonCard from "./PokemonCard";
import Loading from "../layout/Loading";

class MyPokemon extends Component {

    componentDidMount() {
        if (this.props.myPokemon.length === 0) {
            this.props.onFetchPokemon();
        }
    }

    render() {
        return (
            <div>
                <h1 className="mb-3">My Pokemon</h1>
                {this.props.myPokemon ? (<div className="row">
                    {this.props.myPokemon.map(pokemon_data => (
                        <PokemonCard
                            key={pokemon_data.name}
                            pokemon={pokemon_data}/>
                    ))}
                </div>) : (<Loading />)}

                {this.props.myPokemon.length === 0 && (<h5>No data...</h5>)}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemon);
