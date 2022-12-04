const HTTP_METHODS = {
  post: 'post',
  get: 'get',
  put: 'put',
  delete: 'delete',
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
  BAD_GATEWAY: { code: 502, message: 'Bad Gateway' },
};

const API_PATHS = {
  login: '/auth/sign_in',
  register: '/auth/sign_up',
  logout: '/user/logout',
  refreshToken: '/auth/refresh_token',
  changePassword: '/auth/change_password',
  loadProfile: '/auth/load_profile',

  getUserById: '/user/:id',
};

export { HTTP_METHODS, HTTP_STATUS_CODES, API_PATHS };
