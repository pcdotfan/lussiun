import 'reflect-metadata'
import { createConnection } from 'typeorm'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as bodyParser from 'koa-bodyparser'
import * as jwt from 'koa-jwt'
import { AppRoutes } from './routes'
import errorHandle from './middleware/errorHandle'

// create connection with database
// note that its not active database connection
// TypeORM creates you connection pull to uses connections from pull on your requests
const secret = 'vy1C%iZ8W+`]X9#vQl}:/78ul:,CjXcV5{%b-W|_Nty$tGbDnaRGRpJ]e_MkR+O0'

createConnection().then(async connection => {

    // create koa app
  const app = new Koa()
  const router = new Router()

  // register all application routes
  AppRoutes.forEach(route => router[route.method](route.path, route.action))

    // run app
  app.use(errorHandle)
  app.use(jwt({
    secret
  })
    .unless({
      path: [/\/register/, /\/login/]
    })
  )
  app.use(bodyParser())
  app.use(router.routes())
  app.use(router.allowedMethods())
  app.listen(3000)

  console.log('Koa application is up and running on port 3000')

}).catch(error => console.log('TypeORM connection error: ', error))
