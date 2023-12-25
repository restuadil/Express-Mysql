import { verifyJWT } from "../utils/jwt.js"

const deserializedToken = async (req, res, next) => {
    const accesToken = req.headers.authorization?.replace(/^Bearer\s/, '')
    if (!accesToken) {
        return next()
    }


    const token = verifyJWT(accesToken)
    if (token.decoded) {
        res.locals.user = token.decoded
        return next()
    }
    if (token.expired) {
        return next()
    }
    return next()
}

export default deserializedToken