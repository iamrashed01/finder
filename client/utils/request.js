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
  let mainUrl;
  if (query) {
    mainUrl = url.relativeUrl + query;
  } else {
    mainUrl = url.relativeUrl;
  }

  const headers = {
    auth_token: getToken(),
  };

  return axios({
    method: url.method,
    url: process.env.BASE_URL + mainUrl,
    data: params,
    headers,
  });
};
