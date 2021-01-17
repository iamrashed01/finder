import * as types from "./types";

export const loader = () => (dispatch) => {
  dispatch({
    type: types.LOADING,
  });
};

export const loginAction = (data) => () => {
  console.log(data, "form data");
  loader();
};
