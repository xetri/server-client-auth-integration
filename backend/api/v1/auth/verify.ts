import { type Context } from 'elysia';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { cookieSessionName, jwtSecretKey } from '#/utils';
import db from '#/db';
import { Session } from '#/db/entity';

export default async function(c : Context) {
    const sessionCookie = c.cookie[cookieSessionName];

    if (!sessionCookie) {
        c.set.status = 404;
        return { success: false, error: 'No session cookie' };
    }
    
    const sessionId = sessionCookie.value as string;

    const sessionRepo = db.getRepository(Session);
    try {
        jwt.verify(sessionId, jwtSecretKey);
        
        const decoded = JSON.parse(JSON.stringify(jwt.decode(sessionId)));
        return { success: true, userId : decoded.userId };
    } catch(e: any) {
        if (e instanceof TokenExpiredError) {
            const session = await sessionRepo.findOne({
                where: {
                    sessionId
                }
            });
            if (session) await sessionRepo.remove(session);
    
            c.set.status = 401;
            return { success: false, error: e.message };
        } else {
            c.set.status = 500;
            return { success: false, error: e.message };
        }
    }
}
