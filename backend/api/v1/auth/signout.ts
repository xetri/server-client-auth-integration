import type { Context } from 'elysia';
import db from '#/db';
import { Session } from '#/db/entity';
import { cookieSessionName } from "#/utils";

export default async function(c : Context) {
    const sessionCookie = c.cookie[cookieSessionName];
    if (!sessionCookie.value) {
        c.set.status = 404;
        return { success: false, error: 'No session cookie provided' };
    }

    const sessionId = sessionCookie.value as string;
    const sessionRepo = db.getRepository(Session);
    const session = await sessionRepo.findOne({
        where: {
            sessionId
        }
    });

    if(session) await sessionRepo.remove(session);

    sessionCookie.remove();

    return { success: true };
}
