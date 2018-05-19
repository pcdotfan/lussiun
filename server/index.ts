import 'reflect-metadata'
import { Nuxt, Builder } from 'nuxt'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as jwt from 'koa-jwt'
import { AppRoutes } from './routes'

const cors = require('@koa/cors')

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
const secret = 'vy1C%iZ8W+`]X9#vQl}:/78ul:,CjXcV5{%b-W|_Nty$tGbDnaRGRpJ]e_MkR+O0'

createConnection().then(async connection => {

    // create koa app
  const app = new Koa()
  const router = new Router({
    // prefix: '/api'
  })

  // register all application routes
  AppRoutes.forEach(route => router[route.method](route.path, route.action))

    // run app
  app.use(cors())
  app.use((ctx, next) => {
    return next().catch((err) => {
      if (err.status === 401) {
        ctx.status = 401
        ctx.body = {
          error: err.originalError ? err.originalError.message : err.message
        }
      } else {
        throw err
      }
    })
  }
  )
  app.use(jwt({
    secret
  })
    .unless({
      path: [/\/register/, /\/login/, /\/logout/]
    })
  )
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(8080)

  console.log('Koa application is up and running on port 8080')

}).catch(error => console.log('TypeORM connection error: ', error))
