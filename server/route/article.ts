import { index, show, mockData, update } from '../controller/admin/ArticlesController'

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
    method: 'post',
    action: update
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
