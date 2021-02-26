import React, { Component } from 'react';
import { Link } from "react-router-dom";
import styled from '@emotion/styled'
import spinner from './loading.svg'

const Sprite = styled.img`
  width: 5em;
  height: 5em;
  display: none;
`;

const Card = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000000;
  
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active{
    text-decoration: none;
    color: #000000;
  }
`;

class PokemonCard extends Component {
    state = {
        name: '',
        imageUrl: '',
        pokemonIndex: '',
        imageLoading: true,
        toManyRequest: false
    };

    componentDidMount() {
        const { pokemon } = this.props
        const pokemonIndex = pokemon.url.split('/')[pokemon.url.split('/').length -2]
        const imageUrl = `https://github.com/PokeAPI/sprites/blob/master/sprites/pokemon/${pokemonIndex}.png?raw=true`

        this.setState({
            name: pokemon.name,
            imageUrl,
            pokemonIndex
        })
    }

    render() {
        return (
            <div className="col-6 col-md-3 mb-5">
                <StyledLink to={`pokemon/${this.state.pokemonIndex}`}>
                    <Card className="card">
                        <div className="card-header">
                            <h5>{this.state.pokemonIndex}</h5>
                        </div>
                        {this.state.imageLoading ? (
                            <img src={spinner} style={{width: '5em', height: '5em'}}
                                 className='card-img-top rounded mx-auto d-block mt-2' alt="Loading" />
                        ) : null}
                        <Sprite
                            className="card-img-top rounded mx-auto mt-2"
                            onLoad={() => this.setState({imageLoading: false})}
                            onError={() => this.setState({toManyRequest: true})}
                            src={this.state.imageUrl}
                            style={
                                this.state.toManyRequest ? { display: "none"} :
                                this.state.imageLoading ? null : { display: "block"}
                            }
                            width={80}
                            height={80}
                            alt={this.state.name}
                        />
                        {this.state.toManyRequest ? (
                            <h6 className="mx-auto">
                                <span className="badge badge-danger mt-2">To Many Request</span>
                            </h6>
                        ) : null}
                        <div className="card-body mx-auto">
                            <h6 className="card-title">{this.state.name.charAt(0).toUpperCase() + this.state.name.slice(1)}</h6>
                        </div>
                    </Card>
                </StyledLink>
            </div>
        );
    }
}

export default PokemonCard;
