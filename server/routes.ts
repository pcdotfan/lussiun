import authRoutes from './route/auth'
import userRoutes from './route/user'
import categoryRoutes from './route/category'
import articleRoutes from './route/article'

/**
 * All application routes.
 */
const routes = []

export const AppRoutes = routes.concat(authRoutes, categoryRoutes, userRoutes, articleRoutes)
