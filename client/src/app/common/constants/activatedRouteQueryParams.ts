import {routesAliases} from "../enums/routesAliases";

export const activatedRouteQueryParams = {
  [routesAliases.LOGIN]: {
    ACCESS_DENIED: 'accessDenied',
    REGISTERED: 'registered',
    SESSION_FAILED: 'sessionFailed',
  }
};
