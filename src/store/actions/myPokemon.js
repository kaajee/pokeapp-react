import * as actionTypes from './actionTypes';

export const deleteMyPokemon = (name) => {
  return {
    type: actionTypes.DELETE_MY_POKEMON,
    name: name
  };
};

export const addMyPokemon = (pokemon) => {
  return {
    type: actionTypes.ADD_MY_POKEMON,
    myPokemonList: [pokemon]
  };
};

export const fetchMyPokemon = () => {
  return {
    type: actionTypes.FETCH_MY_POKEMON,
  };
};
