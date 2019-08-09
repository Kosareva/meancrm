import {RoutesAliases} from "../enums/RoutesAliases";

export const activatedRouteQueryParams = {
  [RoutesAliases.LOGIN]: {
    ACCESS_DENIED: 'accessDenied',
    REGISTERED: 'registered',
    SESSION_FAILED: 'sessionFailed',
  }
};
