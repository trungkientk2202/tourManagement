import * as apiService from './api.service';
import authHeader from './auth-header';
import { API_PATHS, HTTP_METHODS } from '../constants/service.constant';

export const getUserList = () => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getUserList, {}, authHeader(), {});
};

export const getUserManagerList = () => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getUserManagerList, {}, authHeader(), {});
};

export const getUserByTour = (tourId) => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getUserByTour + '/' + tourId, {}, authHeader(), {});
};

export const getUserManagerByTour = (tourId) => {
    return apiService.makeRequest(
        HTTP_METHODS.get,
        API_PATHS.getUserManagerByTour + '/' + tourId,
        {},
        authHeader(),
        {}
    );
};

export const getRoleList = () => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getRoleList, {}, authHeader(), {});
};

export const deleteUser = (id) => {
    return apiService.makeRequest(HTTP_METHODS.delete, API_PATHS.deleteUser + '/' + id, {}, authHeader(), {});
};

export const addUser = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.addUser, {}, authHeader(), body);
};

export const editUser = ({ id, ...body }) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.editUser + '/' + id, {}, authHeader(), body);
};

export const deleteUserManager = (id) => {
    return apiService.makeRequest(HTTP_METHODS.delete, API_PATHS.deleteUserManager + '/' + id, {}, authHeader(), {});
};

export const addUserManager = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.addUserManager, {}, authHeader(), body);
};

export const editUserManager = ({ id, ...body }) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.editUserManager + '/' + id, {}, authHeader(), body);
};

export const getUserByPhone = (phoneNumber) => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getUserByPhone + '/' + phoneNumber, {}, authHeader(), {});
};
