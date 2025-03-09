import { Cookie, type Context } from 'elysia';
import jwt from 'jsonwebtoken';

import db from '#/db';
import { Session } from '#db/entity';
import { cookieSessionName, jwtSecretKey, sessionTimeout } from '#/utils';

export async function authSign(c: Context, userId: string) {
    const expiresAt = sessionTimeout();
    const sessionId = jwt.sign({ userId, exp: expiresAt.getTime() / 1000 }, jwtSecretKey, { algorithm: 'HS512' });

    const sessionRepo = db.getRepository(Session);
    const session = sessionRepo.create({
        sessionId,
        userId,
    });
    await sessionRepo.insert(session);

    //@ts-ignore
    c.setCookie(cookieSessionName, sessionId, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
        secure: false,
        expires: expiresAt,
    });
}

export default authSign;
