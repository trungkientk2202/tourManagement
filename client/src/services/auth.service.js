import * as apiService from './api.service';
import authHeader from './auth-header';
import { API_PATHS, HTTP_METHODS } from '../constants/service.constant';

const logIn = (body) => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.logIn, {}, {}, body);
};

const logout = () => {
    return apiService.makeRequest(HTTP_METHODS.put, API_PATHS.logout, {}, authHeader(), {});
};

const loadUser = () => apiService.makeRequest(HTTP_METHODS.get, API_PATHS.loadProfile, {}, authHeader(), {});

export { logIn, logout, loadUser };
