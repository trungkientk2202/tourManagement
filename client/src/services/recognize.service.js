import * as apiService from './api.service';
import { API_PATHS, HTTP_METHODS } from '../constants/service.constant';

const plateRecognize = (body) => {
    return apiService.makeRequest(
        HTTP_METHODS.post,
        API_PATHS.plateRecognize,
        {},
        {
            'Content-Type': 'multipart/form-data'
        },
        body
    );
};


export { plateRecognize };
