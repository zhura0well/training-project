import { Router } from 'express'
import Users from '../models/Users'
const router = Router()

router.get('/api/users', async (req, res) => {
    const users =  await Users.find({})
    res.json(users)
    
})