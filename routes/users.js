import { Router } from 'express'
import Users from '../models/Users.js'
const router = Router()

router.get('/', (req, res) => {
    res.send('<h1>First app using express</h1>')
})

//GET all
router.get('/api/users', async (req, res) => {
    const users = await Users.find({})
    res.status(200).json(users)
})

//GET 1
router.get('/api/users/:id', async (req, res) => {
    const user = await Users.findById(req.params.id)
    res.status(200).json(user)
})

//POST
router.post('/api/users', async (req, res) => {
    const users = new Users({
        name: req.body.name
    })
    await users.save()
    await res.status(200).json(users)
})

// PUT
router.put('/api/users/:id', async (req, res) => {
    await Users.findByIdAndUpdate(req.params.id, req.body)
    await res.status(200).json({ message: 'Successfully updated' })
})

//DELETE
router.delete('/api/users/:id', async (req, res) => {
    await Users.findByIdAndDelete(req.params.id)
    await res.status(200).json({ message: 'Successfully deleted' })
})


export default router
