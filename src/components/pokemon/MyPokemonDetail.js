import React, {Component} from 'react';
import axios from "axios";
import {connect} from "react-redux";
import {mapStateToProps} from "./selectors";
import {mapDispatchToProps} from "./actionCreators";

const TYPE_COLORS = {
    bug: 'B1C12E',
    dark: '4F3A2D',
    dragon: '755EDF',
    electric: 'FCBC17',
    fairy: 'F4B1F4',
    fighting: '823551D',
    fire: 'E73B0C',
    flying: 'A3B3F7',
    ghost: '6060B2',
    grass: '74C236',
    ground: 'D3B357',
    ice: 'A3E7FD',
    normal: 'C8C4BC',
    poison: '934594',
    psychic: 'ED4882',
    rock: 'B9A156',
    steel: 'B5B5C3',
    water: '3295F6'
};

class MyPokemonDetail extends Component {

    state = {
        pokemonSlug: '',
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        toManyRequest: false,
        types: [],
        description: '',
        stats: {
            hp: '',
            attack: '',
            defense: '',
            speed: '',
            specialAttack: '',
            specialDefense: ''
        },
        height: '',
        weight: '',
        eggGroups: '',
        abilities: '',
        genderRatioMale: '',
        genderRatioFemale: '',
        evs: '',
        hatchSteps: '',
        pokemon: {}
    };

    async componentDidMount() {
        const {pokemonSlug} = this.props.match.params;
        const pokemonData = this.props.myPokemon.filter(p => pokemonSlug === p.slug)
        const pokemonIndex = pokemonData[0].pokedexId

        const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
        const pokemonSpeciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}/`;

        const pokemonRes = await axios.get(pokemonUrl);

        this.setState({
            pokemon: pokemonData[0]
        })
        const name = pokemonRes.data.name;
        const imageUrl = pokemonRes.data.sprites.front_default;

        let {hp, attack, defense, speed, specialAttack, specialDefense} = '';

        pokemonRes.data.stats.map(stat => {
            switch (stat.stat.name) {
                case 'hp':
                    hp = stat['base_stat'];
                    break
                case 'attack':
                    attack = stat['base_stat'];
                    break
                case 'defense':
                    defense = stat['base_stat'];
                    break
                case 'speed':
                    speed = stat['base_stat'];
                    break
                case 'special-attack':
                    specialAttack = stat['base_stat'];
                    break
                case 'special-defense':
                    specialDefense = stat['base_stat'];
                    break
                default:
                    break
            }

            return true;
        })

        // Convert Decimeters to meters
        const height = Math.round((pokemonRes.data.height * 0.1 + 0.0001) * 100) / 100;

        // Convert hectograms to kg
        const weight = Math.round((pokemonRes.data.weight * 0.1 + 0.0001) * 100) / 100;

        const types = pokemonRes.data.types.map(type => type.type.name);

        const themeColor = `${TYPE_COLORS[types[types.length - 1]]}`;

        const abilities = pokemonRes.data.abilities.map(ability => {
            return ability.ability.name
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }).join(', ');

        const evs = pokemonRes.data.stats.filter(stat => {
            return stat.effort > 0;
        }).map(stat => {
            return `${stat.effort} ${stat.stat.name}`
                .toLowerCase()
                .split('-')
                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                .join(' ');
        }).join(', ');

        await axios.get(pokemonSpeciesUrl).then(res => {
            let description = '';
            res.data.flavor_text_entries.some(flavor => {
                if (flavor.language.name === 'en') {
                    description = flavor.flavor_text;
                }
                return true;
            });

            const femaleRate = res.data.gender_rate;
            const genderRatioFemale = 12.5 * femaleRate;
            const genderRatioMale = 12.5 * (8 - femaleRate);

            const catchRate = Math.round((100 / 255) * res.data.capture_rate);

            const eggGroups = res.data.egg_groups.map(group => {
                return group.name
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ');
            }).join(", ");

            const hatchSteps = 55 * (res.data.hatch_counter + 1);

            this.setState({
                description,
                genderRatioFemale,
                genderRatioMale,
                catchRate,
                eggGroups,
                hatchSteps
            })

            return true;
        });


        this.setState({
            name,
            imageUrl,
            pokemonIndex,
            types,
            stats: {
                hp,
                attack,
                defense,
                speed,
                specialAttack,
                specialDefense
            },
            themeColor,
            height,
            weight,
            abilities,
            evs
        })

        this.releasePokemon = this.releasePokemon.bind(this);
    }

    goto = (pathname) => {
        this.props.history.push(pathname);
    }

    releasePokemon = () => {
        this.props.onRemove(this.state.pokemon.name)
        this.goto('/my-pokemon');
    }

    render() {
        return (
            <React.Fragment>
                <div className="col">
                    <div className="card">
                        <div className="card-header" style={{backgroundColor: "#E19720"}}>
                            <div className="row">
                                <div className="col-5">
                                    <h5>{this.state.pokemonIndex}</h5>
                                </div>
                                <div className="col-7 text-right">
                                    {this.state.types.map(type => (
                                        <span
                                            key={type}
                                            className="badge badge-pill badge-primary mr-1"
                                            style={{backgroundColor: `#${TYPE_COLORS[type]}`, color: "#000"}}
                                        >
                                            {type.toLowerCase()
                                                .split(' ')
                                                .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                                .join(' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="row align-items-center">
                                <div className="col-md-3">
                                    <img src={this.state.imageUrl} className="card-img-top rounded mx-auto d-block mt-2"
                                         alt={this.state.name}/>
                                </div>
                                <div className="col-md-9">
                                    <h4 className="mx-auto">
                                        {this.state.name.toLowerCase()
                                            .split(' ')
                                            .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                            .join(' ')}
                                    </h4>
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-3">HP</div>
                                        <div className="col-12 col-md-9">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{
                                                    width: `${this.state.stats.hp}%`,
                                                    backgroundColor: `#${this.state.themeColor}`, color: "#000"
                                                }}
                                                     aria-valuenow={this.state.stats.hp} aria-valuemin="0"
                                                     aria-valuemax="100">
                                                    {this.state.stats.hp}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-3">Attack</div>
                                        <div className="col-12 col-md-9">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{
                                                    width: `${this.state.stats.attack}%`,
                                                    backgroundColor: `#${this.state.themeColor}`, color: "#000"
                                                }}
                                                     aria-valuenow={this.state.stats.attack} aria-valuemin="0"
                                                     aria-valuemax="100">
                                                    {this.state.stats.attack}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-3">Defense</div>
                                        <div className="col-12 col-md-9">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{
                                                    width: `${this.state.stats.defense}%`,
                                                    backgroundColor: `#${this.state.themeColor}`, color: "#000"
                                                }}
                                                     aria-valuenow={this.state.stats.defense} aria-valuemin="0"
                                                     aria-valuemax="100">
                                                    {this.state.stats.defense}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-3">Speed</div>
                                        <div className="col-12 col-md-9">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{
                                                    width: `${this.state.stats.speed}%`,
                                                    backgroundColor: `#${this.state.themeColor}`, color: "#000"
                                                }}
                                                     aria-valuenow={this.state.stats.speed} aria-valuemin="0"
                                                     aria-valuemax="100">
                                                    {this.state.stats.speed}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-3">Sp. Attack</div>
                                        <div className="col-12 col-md-9">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{
                                                    width: `${this.state.stats.specialAttack}%`,
                                                    backgroundColor: `#${this.state.themeColor}`, color: "#000"
                                                }}
                                                     aria-valuenow={this.state.stats.specialAttack} aria-valuemin="0"
                                                     aria-valuemax="100">
                                                    {this.state.stats.specialAttack}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-12 col-md-3">Sp. Defense</div>
                                        <div className="col-12 col-md-9">
                                            <div className="progress">
                                                <div className="progress-bar" role="progressbar" style={{
                                                    width: `${this.state.stats.specialDefense}%`,
                                                    backgroundColor: `#${this.state.themeColor}`, color: "#000"
                                                }}
                                                     aria-valuenow={this.state.stats.specialDefense} aria-valuemin="0"
                                                     aria-valuemax="100">
                                                    {this.state.stats.specialDefense}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row align-items-center mt-1">
                                <div className="col">
                                    <p className="p-2">{this.state.description}</p>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="card-body">
                            <h5 className="card-title text-center">Profile</h5>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-6"><h6 className="text-right">Height: </h6></div>
                                        <div className="col-6"><h6 className="text-left">{this.state.height} m</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6"><h6 className="text-right">Weight: </h6></div>
                                        <div className="col-6"><h6 className="text-left">{this.state.weight} kg</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6"><h6 className="text-right">Catch Rate: </h6></div>
                                        <div className="col-6"><h6 className="text-left">{this.state.catchRate}%</h6>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-md-6"><h6
                                            className="text-center text-md-right">Gender Ratio: </h6></div>
                                        <div className="col-12 col-md-6">
                                            <div className="progress mb-3 mb-md-0">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${this.state.genderRatioFemale}%`,
                                                        backgroundColor: '#c2185b'
                                                    }}
                                                    aria-valuenow={this.state.genderRatioFemale}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    <small>{this.state.genderRatioFemale}</small>
                                                </div>
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    style={{
                                                        width: `${this.state.genderRatioMale}%`,
                                                        backgroundColor: '#1976d2'
                                                    }}
                                                    aria-valuenow={this.state.genderRatioMale}
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                >
                                                    <small>{this.state.genderRatioMale}</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <div className="col-6">
                                            <h6 className="float-right">Egg Groups:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.eggGroups} </h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">Hatch Steps:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.hatchSteps}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">Abilities:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.abilities}</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-right">EVs:</h6>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="float-left">{this.state.evs}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <button
                                type="button"
                                className="btn btn-block"
                                style={{
                                    color: "#FFFFFF",
                                    backgroundColor: "#811E09"
                                }}
                                onClick={() => this.releasePokemon()}
                            >
                                Release!
                            </button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyPokemonDetail);
