import type { Context } from 'elysia';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import db from '#/db';
import { User } from '#/db/entity';
import { cookieSessionName, authSign } from '#/utils';

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
            select: ['userId', 'password']
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
    
        // authSign(c, user.userId);

        const cookieSessionName = "mySession";
        const sessionId = "12345";
        const expiresAt = new Date(Date.now() + 3600000); // 1 hour
    
        c.set.headers["Set-Cookie"] = `${cookieSessionName}=${sessionId}; HttpOnly; SameSite=Strict; Path=/; Expires=${expiresAt.toUTCString()}`;

        //@ts-ignore
        // c.cookie[cookieSessionName] = {};
        // console.log(c.cookie)
        // c.setCookie(cookieSessionName, "cook", {
        //     httpOnly: true,
        //     sameSite: 'strict',
        //     path: '/',
        //     secure: false,
        //     // expires: expiresAt,
        // });

        return { success: true }
    } catch(error: any) {
        console.error(error);

        c.set.status = 500;
        return { success: false, error: error.message };
    }
}
