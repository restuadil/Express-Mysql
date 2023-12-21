import { UserRouter } from './user.route.js'


const _routes = [
    ['/users', UserRouter],
]

export const routes = (app) => {
    _routes.forEach((route) => {
        const [url, router] = route
        app.use(url, router)
    })
}