import * as apiService from './api.service';
import authHeader from './auth-header';
import { API_PATHS, HTTP_METHODS } from '../constants/service.constant';

const logIn = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.logIn, {}, {}, body);
};

const register = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.register, {}, {}, body);
};

const logInGoogle = (body) => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.logInByGoogleSuccess, {}, {}, body);
};

const logout = () => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.logout, {}, {}, {});
};

const forgotPassword = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.forgotPassword, {}, {}, body);
};

const resetPassword = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.resetPassword, {}, {}, body);
};

const editPassword = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.editPassword, {}, {}, body);
};

const resend = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.resend, {}, {}, body);
};

const verify = ({ email, token }) => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.verify + `/${email}/${token}`, {}, {}, {});
};

const loadUser = () => apiService.makeRequest(HTTP_METHODS.get, API_PATHS.loadProfile, {}, authHeader(), {});

export { logIn, logout, loadUser, logInGoogle, register, forgotPassword, resend, verify, resetPassword, editPassword };
