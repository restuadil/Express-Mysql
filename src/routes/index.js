import { CategoryProductRouter } from './categoryProduct.route.js'
import { ProductRouter } from './product.route.js'
import { UserRouter } from './user.route.js'


const _routes = [
    ['/users', UserRouter],
    ['/category-product', CategoryProductRouter],
    ['/product', ProductRouter],
]

export const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route
        app.use(url, router)
    })
}