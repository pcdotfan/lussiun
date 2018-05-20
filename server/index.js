"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const jwt = require("koa-jwt");
const service = require("koa-service");
const routes_1 = require("./routes");
const path = require('path');
const cors = require('@koa/cors');
// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
const secret = 'vy1C%iZ8W+`]X9#vQl}:/78ul:,CjXcV5{%b-W|_Nty$tGbDnaRGRpJ]e_MkR+O0';
typeorm_1.createConnection().then((connection) => __awaiter(this, void 0, void 0, function* () {
    // create koa app
    const app = new Koa();
    app.use(service({
        serviceRoot: path.join(__dirname, 'service')
    }));
    const router = new Router({
    // prefix: '/api'
    });
    // register all application routes
    routes_1.AppRoutes.forEach(route => router[route.method](route.path, route.action));
    // run app
    app.use(cors());
    app.use((ctx, next) => {
        return next().catch((err) => {
            if (err.status === 401) {
                ctx.status = 401;
                ctx.body = {
                    error: err.originalError ? err.originalError.message : err.message
                };
            }
            else {
                throw err;
            }
        });
    });
    app.use(jwt({
        secret
    })
        .unless({
        path: [/\/register/, /\/login/, /\/logout/]
    }));
    app.use(bodyParser());
    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(8080);
    console.log('Koa application is up and running on port 8080');
})).catch(error => console.log('TypeORM connection error: ', error));
