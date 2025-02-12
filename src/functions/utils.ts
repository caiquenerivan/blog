import { DefineRoutesHandler } from "#settings/types.js";
import { FastifyInstance } from "fastify";

export function defineRoutes(handler: DefineRoutesHandler){
    return function(app: FastifyInstance, _:{}, done: Function){
        handler(app);
        done();
    }
}