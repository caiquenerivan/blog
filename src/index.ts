// import fastify from "fastify";
// import cors from "@fastify/cors";
// import autoload from "@fastify/autoload";
// import path from "path";
import log from "consola";
import ck from "chalk";
// import postRoutes from './routes/postRoutes.js';
// import dotenv from 'dotenv';

// import "#settings/env.js";

// dotenv.config();

// const app = fastify();
// app.register(cors, {origin: "*"});
// app.register(autoload, {
//     dir: path.join(import.meta.dirname, "routes"),
//     routeParams: true
// });
// app.register(postRoutes);

// app.addHook("onRoute", ({method, path})=> {
//     if(method === "HEAD" || method === "OPTIONS") return;
//     log.success(`${ck.yellow(method)} ${ck.blue(path)}`)
// });

// const port = process.env.PORT || 3000;

// await app.listen({port, host:"0.0.0.0"})
// .catch(err => {
//     log.error(err);
//     process.exit(1);
// })
// log.success(ck.green(`Server listening on port ${port}`))

// src/server.ts
import fastify from 'fastify';
import postRoutes from './routes/postRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const server = fastify({ logger: true });

// Registrar rotas
server.register(postRoutes);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await server.listen({ host: '0.0.0.0', port: process.env.PORT || 3000 });
    log.success(ck.green(`Server listening on port ${port}`));
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();