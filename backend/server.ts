import { Elysia } from 'elysia'
import { cors } from '@elysiajs/cors'
import { cookie } from '@elysiajs/cookie'; 

import api from '#/api';
import testdb from '#/db';

const app = new Elysia();

app
.use(cors())
.use(cookie());

app.use(api);

try {
    await testdb.initialize();
    console.log("Database initialized");
} catch(e) {
    console.error(e)
}

Bun.serve({
    port: Bun.env.PORT || 6969,
    fetch: app.fetch,
})

console.log("Server running on http://localhost:6969")
