import { type Context } from 'elysia';
import bcrypt from 'bcrypt';
import { z } from 'zod';

import db from '#/db';
import { User } from '#/db/entity';
import { uuid, saveSession, cookieSessionName } from '#/utils';

const SignUpDataScheme = z.object({
    email: z.string(),
    name: z.string(),
    password: z.string(),
})

export default async function (c : Context) {
    const { success, data } = SignUpDataScheme.safeParse(await c.request.json());

    if (!success) {
        c.set.status = 400;
        return { success: false, error: 'Invalid payload' };
    }
    
    const { email, name, password } = data;
    
    try {
        const userRepo = db.getRepository(User);
        const userExists = await userRepo.findOne({
            where: { email }
        });
        
        if (userExists) {
            c.set.status = 409;
            return { success: false, error: 'User already exists' };
        }
        
        const userId = uuid();
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);
    
        const user = userRepo.create({
            userId,
            email,
            name,
            password: hashedPassword,
        });
    
        await userRepo.insert(user);
    
        const session = await saveSession(user.userId);

        c.cookie[cookieSessionName].value = session.sessionId;
        c.cookie[cookieSessionName].httpOnly = true;
        c.cookie[cookieSessionName].sameSite = 'strict';
        c.cookie[cookieSessionName].path = '/';
        c.cookie[cookieSessionName].secure = false;
        c.cookie[cookieSessionName].expires = session.expiresAt;

        c.set.status = 201;
        return { success : true, userId: user.userId };
    } catch(error : any) {
        c.set.status = 500;
        return { success: false, error: error.message };
    } 
}
