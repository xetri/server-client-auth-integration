import { Elysia } from 'elysia';

import signup from '#api/v1/auth/signup';
import signin from '#api/v1/auth/signin';
import signout from '#api/v1/auth/signout';
import verify from '#api/v1/auth/verify';

const app = new Elysia( { prefix : '/auth' } );

app.post('/signup', signup);
app.post('/signin', signin);
app.delete('/signout', signout);
app.get('/verify', verify);

export default app;
