import type { Context } from 'elysia';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import db from '#/db';
import { User } from '#/db/entity';
import { saveSession, saveCookie } from '#/utils';

const SignInDataScheme = z.object({
    email: z.string(),
    password: z.string(),
});

export default async function(c: Context) {
    const { success, data } = SignInDataScheme.safeParse(await c.request.json());

    if (!success) {
        c.set.status = 400;
        return { success: false, error: 'Invalid payload' };
    }

    const { email, password } = data;

    try {
        const userRepo = db.getRepository(User);
        const user = await userRepo.findOne({
            where: {
                email,
            },
            select: ['userId', 'username', 'name', 'password']
        });
    
        if (!user) {
            c.set.status = 404;
            return {
                succcess: false,
                error: 'User does not exist',
            };
        }
    
        const passwordMatch = bcrypt.compareSync(password, user.password);
        if (!passwordMatch) {
            c.set.status = 403;
            return {
                success: false,
                error: 'Invalid credentials', 
            };
        }
    
        const session = await saveSession(user.userId);

        saveCookie(c.cookie, session.sessionId, session.expiresAt);

        return { success: true, user: { userId: user.userId, username: user.username, name: user.name } };
    } catch(error: any) {
        console.error(error);

        c.set.status = 500;
        return { success: false, error: error.message };
    }
}
