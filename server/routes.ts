import authRoutes from './route/auth'
import userRoutes from './route/user'
import categoryRoutes from './route/category'
import articleRoutes from './route/article'
import topicRoutes from './route/topic'

/**
 * All application routes.
 */
const routes = []

export const AppRoutes = routes.concat(authRoutes, categoryRoutes, userRoutes, articleRoutes, topicRoutes)
