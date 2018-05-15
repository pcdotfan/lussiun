import authRoutes from './route/auth'
import userRoutes from './route/user'
import categoryRoutes from './route/category'

/**
 * All application routes.
 */
const routes = []

export const AppRoutes = routes.concat(authRoutes, categoryRoutes, userRoutes)
