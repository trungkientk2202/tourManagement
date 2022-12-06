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

export { uploadMedia };
