export * from '#utils/uid';
export * from '#/utils/session';
export * from '#/utils/cookie';

export const jwtSecretKey = Bun.env.JWT_SECRET_KEY || 'SECRET-KEY';
export const cookieSessionName = 'session_id';
export const defaultValidSessionTime = 3 * 365 * 24 * 60 * 60 * 1000;

export const sessionTimeout = (validSinceNow: number = defaultValidSessionTime) => new Date(Date.now() + validSinceNow);

export function getBaseUrlFromPath(path : string) {
    const pathSegments = path.split('/').filter(Boolean);
    const baseUrl = '/' + pathSegments.slice(0, -1).join('/');
    return baseUrl;
}

export function pathResolve(...paths: string[]) {
    return paths.reduce((prev, cur) => prev + '/' + cur, '');
}
