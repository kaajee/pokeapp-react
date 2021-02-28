import * as actions from '../../store/actions/index';

export const mapDispatchToProps = dispatch => {
  return {
    onCatchPokemon: (pokemon) => dispatch(actions.addMyPokemon(pokemon)),
    onRemove: (name) => dispatch(actions.deleteMyPokemon(name)),
    onFetchPokemon: () => dispatch(actions.fetchMyPokemon()),
  };
};
