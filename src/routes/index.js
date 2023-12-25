import { AuthRouter } from './auth.route.js'
import { CategoryProductRouter } from './categoryProduct.route.js'
import { ProductRouter } from './product.route.js'
import { ReviewRouter } from './review.route.js'
import { UserRouter } from './user.route.js'


const _routes = [
    ['/users', UserRouter],
    ['/category-product', CategoryProductRouter],
    ['/products', ProductRouter],
    ['/reviews', ReviewRouter],
    ['/auth', AuthRouter],
]

export const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route
        app.use(url, router)
    })
}