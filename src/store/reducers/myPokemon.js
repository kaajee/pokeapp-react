import * as actionTypes from '../actions/actionTypes';

const initialState = {
    myPokemonList: [],
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_MY_POKEMON:
          const insertPokemon = {...state, myPokemonList: [...state.myPokemonList, ...action.myPokemonList]}
          localStorage.setItem('myPokemon', JSON.stringify([...state.myPokemonList, ...action.myPokemonList]));
          return insertPokemon;
        case actionTypes.DELETE_MY_POKEMON:
          const updateMyPokemon = state.myPokemonList.filter(obj => {
              return obj.name !== action.name;
          });
          const deletePokemon = {...state, myPokemonList: updateMyPokemon}
          localStorage.setItem('myPokemon', JSON.stringify(updateMyPokemon));
          return deletePokemon;
        case actionTypes.FETCH_MY_POKEMON:
          const fetchLocalStorage = JSON.parse(localStorage.getItem("myPokemon")) || [];
          return {...state, myPokemonList: fetchLocalStorage};
        default:
          return state;
    }
};

export default reducer;
