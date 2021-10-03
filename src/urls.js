const BASE_URL = 'https://seedingfund-api.herokuapp.com/';

// Auth endpoints
export const SIGN_IN_URL = BASE_URL + 'auth/signin';
export const SIGNUP_URL = BASE_URL + 'auth/signup';
export const SIGNOUT_URL = BASE_URL + 'auth/signout';
export const REFRESH_URL = BASE_URL + 'auth/refresh';
export const GET_ALL_USERS_URL = BASE_URL + 'auth/users';
export const UPDATE_PASSWORD_URL = BASE_URL + 'auth/user/password';


// Projects endpoints
export const CREAT_GET_PROJECT_URL = BASE_URL + 'api/v1/projects/';
export const USER_PROJECTS_URL = BASE_URL + 'api/v1/projects/user';
export const GET_UPDATE_DELETE_PROJECTS_URL = BASE_URL + 'api/v1/projects/project_id';

// router.post('/projects',createProjectHandler);
// router.get('/projects',adminCheck,getAllProjecstHandler);
// router.get('/projects/user', getUserProjectsHandler);
// router.get('/projects/:project_id', getProjectDetailsHandler);
// router.put('/projects/:project_id', updateProjectHandler);
// router.delete('/projects/:project_id',deleteProjectHandler);
