import Router from 'koa-router'
import config from '../config'
import db from '../models'
import checkToken from '../middlewares/check-token'

const user = require('../controllers/user')
// const tag = require('../controllers/tag')
const article = require('../controllers/article')

const router = new Router({
  prefix: config.app.routerBaseApi
})

router
  .get('/user', user.getUserInfo)
  .patch('/user', checkToken, user.patchUserInfo)
  .post('/login', user.login)
  .post('/logout', checkToken, user.logout)

/*
router
  .get('/tags/:id?', tag.getTagsOrArticles)
  .post('/tag', checkToken, tag.postTag)
  .patch('/tag', checkToken, tag.patchTag)
  .del('/tag/:id?', checkToken, tag.deleteTag)
*/

router
  .get('/article/:id?', article.getArticle)
  .get('/articles/:page?/:limit?', article.getArticles)
  .get('/archives', article.archives)
  .post('/article', checkToken, article.postArticle)
  .post('/upload', checkToken, article.upload)
  .patch('/article', checkToken, article.patchArticle)
  .del('/article/:id?', checkToken, article.deleteArticle)

export default router
