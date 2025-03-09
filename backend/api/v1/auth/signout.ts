import { type Context, Cookie } from 'elysia';
import db from '#/db';
import { Session } from '#/db/entity';
import { cookieSessionName } from "#/utils";

export default async function(c : Context) {
    const sessionCookie = c.cookie[cookieSessionName];
    if (!sessionCookie) {
        c.set.status = 404;
        return { success: false, error: 'Session cookie not found' };
    }

    const sessionId = sessionCookie.value as string;
    const sessionRepo = db.getRepository(Session);
    const session = await sessionRepo.findOne({
        where: {
            sessionId
        }
    });

    if(session) await sessionRepo.remove(session);

    //@ts-ignore
    c.removeCookie(cookieSessionName);

    return { success: true };
}
