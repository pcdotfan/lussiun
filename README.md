<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

## Description

A forever working-in-progress blog project based on [Nest](https://github.com/nestjs/nest) & [Nuxt.js](https://github.com/nuxt/nuxt.js).

Demo: [https://oqo.moe](https://oqo.moe) (WIP)

## Deployment

### Frontend Admin (SPA)

Branch: [https://github.com/pcdotfan/lussiun/tree/blog](https://github.com/pcdotfan/lussiun/tree/blog)

Modify `nuxt.config.js` to set your website's info:

```javascript
module.exports = {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: 'Lussiun',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // ...
  axios: {
    baseURL: 'https://admin.oqo.moe/api',
    browserBaseURL: 'https://admin.oqo.moe/api'
  }
  // ...
}
```

And then run:

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start
```

### Frontend Blog (SSR)

Branch: [https://github.com/pcdotfan/lussiun/tree/nuxt](https://github.com/pcdotfan/lussiun/tree/nuxt)

Modify `nuxt.config.js` to set your website's info:

```javascript
// ...
module.exports = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3333'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'PCDotFan',
    description: 'To be an life & code artisan',
    site: {
      title: 'PCDotFan',
      description: 'To be an life & code artisan',
      logo: 'https://cdn.mywpku.com/avatar.jpg'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Axios module configuration
  */
  axios: {
    baseURL: 'http://localhost:8080/api',
    browserBaseURL: 'http://localhost:8080/api'
  },

  // ...
}
```
And then run: 
```bash
# install dependencies
$ npm install # Or yarn install*[see note below]

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```

### Server

Modify `ormconfig.json` to set your connection up. (Visit [TypeORM](http://typeorm.io/#/connection) if you need some help)
```json
{
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "USERNAME",
    "password": "PASSWORD",
    "database": "DATABASE",
    "entities": [
        "src/**/**.entity{.ts,.js}"
    ],
    "extra": {
        "charset": "utf8mb4_unicode_ci"
    },
    "synchronize": true
}
```

Create a file named `development.dev` in the root directory of your project, it should have the following content:

```
JWT_SECRET_KEY=
# Using Qiniu cloud storage to manage media content
QINIU_AK=
QINIU_SK=
QINIU_URL=
QINIU_BUCKET=
QINIU_ZONE=
```

And then run: 
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# incremental rebuild (webpack)
$ npm run webpack
$ npm run start:hmr

# production mode
npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

  [MIT licensed](LICENSE).
