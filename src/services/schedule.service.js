import * as apiService from './api.service';
import authHeader from './auth-header';
import { API_PATHS, HTTP_METHODS } from '../constants/service.constant';

export const getScheduleList = () => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getScheduleList, {}, authHeader(), {});
};

export const getScheduleByTour = (tourId) => {
    return apiService.makeRequest(HTTP_METHODS.get, API_PATHS.getScheduleByTour + '/' + tourId, {}, authHeader(), {});
};

export const deleteSchedule = (id) => {
    return apiService.makeRequest(HTTP_METHODS.delete, API_PATHS.deleteSchedule + '/' + id, {}, authHeader(), {});
};

export const addSchedule = (body) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.addSchedule, {}, authHeader(), body);
};

export const editSchedule = ({ id, ...body }) => {
    return apiService.makeRequest(HTTP_METHODS.post, API_PATHS.editSchedule + '/' + id, {}, authHeader(), body);
};
