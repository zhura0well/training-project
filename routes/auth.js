import { Router } from 'express'
import bcrypt from 'bcrypt'
import Auth from '../models/Auth.js'
const router = Router()

router.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body
        if (await Auth.findOne({ username })) {
            res.status(400).json({ message: 'This username is already taken' })
        }
        const hashPassword = bcrypt.hashSync(password, 6)
        const user = new Auth({ username, password: hashPassword })
        await user.save()
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Registration error' })
    }
})

router.post('/api/login', async (req, res) => {
    try {

    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Login error' })
    }
})

export default router
