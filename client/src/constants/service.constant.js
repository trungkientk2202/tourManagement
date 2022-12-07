const HTTP_METHODS = {
    post: 'post',
    get: 'get',
    put: 'put',
    delete: 'delete'
};

const HTTP_STATUS_CODES = {
    OK: { code: 200, message: 'Ok' },
    CREATED: { code: 201, message: 'Created' },
    NO_CONTENT: { code: 204, message: 'No Content' },
    NOT_MODIFIED: { code: 304, message: 'Not Modified' },
    BAD_REQUEST: { code: 400, message: 'Bad Request' },
    UNAUTHORIZED: { code: 401, message: 'Unauthorized' },
    FORBIDDEN: { code: 403, message: 'Forbidden' },
    NOT_FOUND: { code: 404, message: 'Not Found' },
    METHOD_NOT_ALLOWED: { code: 405, message: 'Method Not Allowed' },
    CONFLICT: { code: 409, message: 'Conflict' },
    INTERNAL_SERVER_ERROR: { code: 500, message: 'Internal Server Error' },
    BAD_GATEWAY: { code: 502, message: 'Bad Gateway' }
};

const API_PATHS = {
    logIn: '/user/auth/google/login/success',
    logInByGoogle: '/user/auth/google',
    register: '/auth/sign_up',
    logout: '/user/auth/logout',
    refreshToken: '/auth/refresh_token',
    changePassword: '/auth/change_password',
    loadProfile: '/user/get-current',

    getUserById: '/user/:id',

    plateRecognize: '/recognize/plate',
    uploadMedia: '/image-video/upload',
    getMedia: '/image-video'
};

export { HTTP_METHODS, HTTP_STATUS_CODES, API_PATHS };
