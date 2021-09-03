import jwt from 'jsonwebtoken'
import {jwtKey} from '../config.js'

export default function checkAcces(req, res, next) {
    if(req.method === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if(!token) {
            res.status(403).json({ message: 'Not authorized'})
        }
        const decodedToken = jwt.verify(token, jwtKey)
        req.user = decodedToken
        next()
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Not authorized' })
    }
}
