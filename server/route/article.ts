import { index, show, mockData, update, store } from '../controller/admin/ArticlesController'

/**
 * All application routes.
 */
export default [
  {
    path: '/articles/',
    method: 'get',
    action: index
  },
  {
    path: '/articles/',
    method: 'patch',
    action: update
  },
  {
    path: '/articles/',
    method: 'post',
    action: store
  },
  {
    path: '/articles/mock',
    method: 'get',
    action: mockData
  },
  {
    path: '/articles/:id',
    method: 'get',
    action: show
  }
]
