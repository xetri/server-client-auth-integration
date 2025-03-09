import jwt from 'jsonwebtoken';

import db from '#/db';
import { Session } from '#db/entity';
import { jwtSecretKey, sessionTimeout } from '#/utils';

export async function saveSession(userId: string) {
    const expiresAt = sessionTimeout();
    const sessionId = jwt.sign({ userId, exp: expiresAt.getTime() / 1000 }, jwtSecretKey, { algorithm: 'HS512' });

    const sessionRepo = db.getRepository(Session);
    const session = sessionRepo.create({
        sessionId,
        userId,
    });
    await sessionRepo.insert(session);

    return { sessionId, expiresAt };
}

export default saveSession;
