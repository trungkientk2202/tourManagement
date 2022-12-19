import { LOCAL_STORAGE } from '../constants/common.constant';
import { getItem } from './local.service';

export default function authHeader() {
    const _accessToken = getItem(LOCAL_STORAGE.accessToken);

    if (_accessToken) {
        return { 'x-access-token': 'Bearer ' + _accessToken }; // for NodeJs back-end
    } else {
        return { 'x-access-token': '' };
    }
}
