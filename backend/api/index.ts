import Elysia from 'elysia';
import v1 from '#api/v1';

const api = new Elysia( { prefix: '/api' } );

api.use(v1);

export default api;
