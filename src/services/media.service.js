import * as apiService from './api.service';
import { API_PATHS, HTTP_METHODS } from '../constants/service.constant';

const uploadMedia = (body) => {
    return apiService.makeRequest(
        HTTP_METHODS.post,
        API_PATHS.uploadMedia,
        {},
        {
            'Content-Type': 'multipart/form-data'
        },
        body
    );
};

const detect = (body) => apiService.makeRequest(HTTP_METHODS.post, API_PATHS.detect, {}, {}, body);

const getViolations = () => apiService.makeRequest(HTTP_METHODS.get, '/statistic/violations', {}, {}, {});

export { uploadMedia, detect, getViolations };
