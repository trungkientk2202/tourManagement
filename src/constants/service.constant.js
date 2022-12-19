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
    logIn: '/user/login',
    register: '/user/register',
    logInByGoogle: '/user/auth/google',
    logInByGoogleSuccess: '/user/auth/google/login/success',
    logout: '/user/auth/logout',
    refreshToken: '/auth/refresh_token',
    changePassword: '/auth/change_password',
    forgotPassword: '/user/forgot-password',
    resetPassword: '/user/reset-password',
    editPassword: '/user/edit',
    resend: '/user/resend',
    verify: '/user/confirmation',
    loadProfile: '/user/get-current',

    getUserById: '/user/:id',

    detect: '/recognize/detect',
    uploadMedia: '/image-video/upload',
    getMedia: '/image-video'
};

export { HTTP_METHODS, HTTP_STATUS_CODES, API_PATHS };
