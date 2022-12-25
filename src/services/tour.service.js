import * as apiService from './api.service';
import authHeader from './auth-header';
import { API_PATHS, HTTP_METHODS } from '../constants/service.constant';

export const getTourList = () => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getTourList, {}, authHeader(), {});
};

export const getTourTypeList = () => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getTourTypeList, {}, authHeader(), {});
};

export const deleteTour = (id) => {
    return apiService.makeRequest(HTTP_METHODS.delete, API_PATHS.deleteTour + '/' + id, {}, authHeader(), {});
};

export const addTour = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.addTour, {}, authHeader(), body);
};

export const editTour = ({ id, ...body }) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.editTour + '/' + id, {}, authHeader(), body);
};

export const participateTour = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.participateTour, {}, authHeader(), body);
};
