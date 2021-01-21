import { toast } from 'react-toastify';
import Router from 'next/router';
import * as types from './types';
import { postRequest } from '../../utils/request';
import * as urls from '../../utils/urls';

export const loader = (data) => (dispatch) => {
  console.log('loading called');
  dispatch({
    type: types.LOADING,
    data,
  });
};

export const verifyEmailAction = (data) => (dispatch) => {
  dispatch({
    type: types.LOADING,
    data: 'email_verify',
  });
  postRequest(urls.EMAIL_VERIFY, data)
    .then((res) => {
      console.log(res);
      toast.success(res.data.message);
      loader(null);
      Router.push('/profile');
    })
    .catch((error) => {
      loader('email_verify');
      toast.error(error.response.data.message);
    });
};

export const registerAction = (data) => () => {
  postRequest(urls.REGISTER, data)
    .then((res) => {
      console.log(res);
      toast.success(res.data.message);
      loader(null);
      Router.push('/email-verify');
    })
    .catch((error) => {
      loader('resigtration_loading');
      toast.error(error.response.data.message);
    });
};
