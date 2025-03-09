import * as config from '#utils/config';

export const apiv1 = (service : string) => config.hostname + "/api/v1/".concat(service);
export const api = apiv1;