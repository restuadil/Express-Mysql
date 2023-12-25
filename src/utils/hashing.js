import bcrypt from 'bcrypt'

export const hashing = (password) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    return hash
}

export const compare = (password, hash) => {
    return bcrypt.compareSync(password, hash)
}