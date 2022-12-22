import { LOCAL_STORAGE } from '../constants/common.constant';
import * as localService from './local.service';
import * as authService from './auth.service';
import axios from 'axios';
import { API_PATHS, HTTP_METHODS, HTTP_STATUS_CODES } from '../constants/service.constant';
import { trackPromise } from 'react-promise-tracker';
import { get, includes } from 'lodash';

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_SERVER_API_PATH}`,
    withCredentials: true,
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json; charset=UTF-8'
    }
});

// Interceptors
axiosInstance.interceptors.request.use(
    async (request) => {
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalConfig = error.config;

        if (
            originalConfig.url !== '/auth/sign_in' &&
            [HTTP_STATUS_CODES.UNAUTHORIZED.code, HTTP_STATUS_CODES.FORBIDDEN.code].includes(error?.response?.status) &&
            !originalConfig._retry
        ) {
            originalConfig._retry = true;

            try {
                const rs = await axios.post(API_PATHS.refreshToken);

                const { accessToken } = rs.data;
                localService.setItem(LOCAL_STORAGE.accessToken, JSON.stringify(accessToken));
                originalConfig.headers['Authorization'] = `Bearer ${accessToken}`;

                return axiosInstance(originalConfig);
            } catch (_error) {
                localService.removeItem(LOCAL_STORAGE.accessToken);
                return Promise.reject(_error);
            }
        }
        console.log(error);
        return Promise.reject(error);
    }
);

const handleError = (error) => {
    const _accessToken = localService.getItem(LOCAL_STORAGE.accessToken);

    if (_accessToken) {
        return Promise.reject({
            status: 500,
            data: {
                type: 'error',
                message: 'http.response.500.message'
            }
        });
    }
    return Promise.reject(error);
};
const handleResponse = (response) => {
    const status = get(response, 'status', 500).toString();
    const _accessToken = localService.getItem(LOCAL_STORAGE.accessToken);

    return new Promise((resolve, reject) => {
        if (+status !== HTTP_STATUS_CODES.OK.code) {
            if (
                includes([HTTP_STATUS_CODES.UNAUTHORIZED.code, HTTP_STATUS_CODES.FORBIDDEN.code], +status) &&
                !_accessToken
            ) {
                // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
                // authenticationService.logout();
                authService.logout();
            }
            reject(handleError(response));
        }
        resolve(response);
    });
};

const axiosRequest = (method, url, body, options) => {
  switch (method) {
    case HTTP_METHODS.post:
      return axiosInstance.post(url, body, {
        headers: options.headers,
        params: options.params,
      });
    case HTTP_METHODS.put:
      return axiosInstance.put(url, body, {
        headers: options.headers,
        params: options.params,
      });
    case HTTP_METHODS.delete:
      return axiosInstance.delete(url, {
        headers: options.headers,
        params: options.params,
      });
    default:
      return axiosInstance.get(url, {
        headers: options.headers,
        params: options.params,
      });
  }
};

export const makeRequest = (method, path, params, headers, body, paramResponseType) => {
  const url = path;

  axiosInstance.defaults.responseType = paramResponseType;
  return trackPromise(
    axiosRequest(method, url, body, { headers: headers, params: params }).then(handleResponse).catch(handleError)
  );
};
