import * as types from '../actions/types';

const init = {
  loading: null,
};
const metaReducer = (state = init, action) => {
  switch (action.type) {
    case types.LOADING: {
      return {
        ...state,
        loading: action.data,
      };
    }
    default:
      return state;
  }
};

export default metaReducer;
