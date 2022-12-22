import * as apiService from './api.service';
import authHeader from './auth-header';
import { API_PATHS, HTTP_METHODS } from '../constants/service.constant';

export const getDestinationList = () => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getDestinationList, {}, authHeader(), {});
};

export const deleteDestination = (id) => {
    return apiService.makeRequest(HTTP_METHODS.delete, API_PATHS.deleteDestination + '/' + id, {}, authHeader(), {});
};

export const addDestination = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.addDestination, {}, authHeader(), body);
};

export const editDestination = ({ id, ...body }) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.editDestination + '/' + id, {}, authHeader(), body);
};
