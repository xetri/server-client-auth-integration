import type { Context } from 'elysia';
import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';
import { cookieSessionName, jwtSecretKey } from '#/utils';
import db from '#/db';
import { Session, User } from '#/db/entity';

export default async function(c : Context) {
    const sessionCookie = c.cookie[cookieSessionName];

    if (!sessionCookie.value) {
        c.set.status = 404;
        return { success: false, error: 'No session cookie provided' };
    }
    
    const sessionId = sessionCookie.value as string;

    const sessionRepo = db.getRepository(Session);
    let session : Session | null = null;
    try {
        session = await sessionRepo.findOne({
            where: {
                sessionId
            }
        });

        if (!session) {
            c.set.status = 404;
            sessionCookie.remove();
            return { success: false, error: 'Session not found' };
        };

        const userRepo = db.getRepository(User);

        jwt.verify(sessionId, jwtSecretKey);
        
        const decoded = JSON.parse(JSON.stringify(jwt.decode(sessionId)));
        const user = await userRepo.findOne({
            where: {
                userId: decoded.userId
            }
        }) as User;

        return { success: true, user: { userId: user.userId, username: user.username, name: user.name } };
    } catch(e: any) {
        if (e instanceof TokenExpiredError) {
            if (session) await sessionRepo.remove(session);
            c.set.status = 401;
            sessionCookie.remove();
        } else if (e instanceof JsonWebTokenError) {
            c.set.status = 401
            sessionCookie.remove();
        } else {
            c.set.status = 500;
        }

        return { success: false, error: e.message };
    }
}
