import { toast } from 'react-toastify';
import * as types from './types';
import { postRequest } from '../../utils/request';
import { LOGIN } from '../../utils/urls';

export const loader = () => (dispatch) => {
  dispatch({
    type: types.LOADING,
  });
};

export const loginAction = (data) => () => {
  postRequest(LOGIN, data)
    .then((res) => {
      console.log(res);
      toast.success(res.data.message);
    })
    .catch((error) => toast.error(error.response.data.message));

  loader();
};
