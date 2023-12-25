import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export const signJWT = (payload, options) => {
    return jwt.sign(payload, process.env.PRIVATE_KEY, {
        ...(options && options),
        algorithm: 'RS256'
    })
}

export const verifyJWT = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.PUBLIC_KEY)
        return {
            valid: true,
            expired: true,
            decoded
        }
    } catch (error) {
        return {
            valid: false,
            expired: error.message === 'jwt expired',
            decoded: null
        }
    }
}