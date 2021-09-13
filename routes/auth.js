import { Router } from 'express'
import bcrypt from 'bcrypt'
import Auth from '../models/Auth.js'
import jwt from 'jsonwebtoken'
import { jwtKey, ROLE } from '../config.js'

const router = Router()

router.post('/api/register', async (req, res) => {
    try {
        const { username, password } = req.body

        if (await Auth.findOne({ username })) {
            res.status(400).json({ message: 'This username is already taken' })
        }

        const hashPassword = bcrypt.hashSync(password, 6)
        const user = new Auth({ username, password: hashPassword, roles: [ROLE.MODER] })
        await user.save()

        res.status(201).json({ message: 'Successfully registered' })

    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Registration error' })
    }
})


router.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body
        const user = await Auth.findOne({ username })

        if (!user) {
            res.status(401).json({ message: 'Non-existent username' })
        }

        if (!bcrypt.compareSync(password, user.password)) {
            res.status(401).json({ message: 'Wrong password' })
        }

        const token = jwt.sign({ id: user._id, roles: user.roles }, jwtKey, { expiresIn: '10h' })
        res.cookie('jwt', token, { httpOnly: true })
        res.status(200).json({ jwt: token, roles: user.roles })
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Login error' })
    }
})

router.get('/api/roles/', async (req, res) => {
    try {
        const users = await Auth.find({})
        res.status(200).json(users)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

router.patch('/api/roles/:id', async (req, res) => {
    try {
        const possibleRoles = Object.keys(ROLE)
        const isEnteredCorrectly = req.body.roles.every(role => possibleRoles.includes(role))

        if (!isEnteredCorrectly) {
            return res.status(400).json({ message: 'Non-existent role' })
        }

        const user = await Auth.findByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(user)
    } catch (e) {
        console.log(e)
        res.status(400).json({ message: 'Error occured' })
    }
})

export default router
