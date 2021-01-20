import axios from 'axios';
import Cookies from 'js-cookie';

export const getToken = () => {
  const token = Cookies.get('auth_token');
  if (token) {
    return token;
  }
  return 'no token';
};

export const postRequest = (url, params, query = null) => {
  let rootUrl;
  if (query) {
    rootUrl = process.env.BASE_URL + url.relativeUrl + query;
  } else {
    rootUrl = process.env.BASE_URL + url.relativeUrl;
  }

  const headers = {
    auth_token: getToken(),
    Accept: 'application/json',
  };

  return axios({
    method: url.method,
    url: rootUrl,
    data: params,
    headers,
  });
};
