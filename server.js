import express from 'express'
import mongoose from 'mongoose'
import usersRoutes from './routes/users.js'

const credentials = {
    user: 'user',
    password: 'userpassword'
}
const app = express()
const port = process.env.PORT || 5000
const dbUrl = `mongodb+srv://${credentials.user}:${credentials.password}@cluster0.xhhci.mongodb.net/testDatabase`

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(usersRoutes)

async function start() {
    try {
        await mongoose.connect(dbUrl, {
            useNewUrlParser: true,
        })
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch (e) {
        console.log(e)
    }
}


start()

