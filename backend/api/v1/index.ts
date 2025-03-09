import Elysia from 'elysia';
import auth from '#api/v1/auth';

const v1 = new Elysia( { prefix: '/v1' } );

v1.use(auth);

export default v1;
