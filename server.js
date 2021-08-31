import express from 'express'
import mongoose from 'mongoose'

const credentials = {
    user: "user",
    password: "userpassword"
}
const app = express()
const port = process.env.PORT || 5000
const dbUrl = `mongodb+srv://${credentials.user}:${credentials.password}@cluster0.xhhci.mongodb.net/testDatabase`

app.get('/', (req, res) => {
    res.send('<h1>First app using express</h1>')
})
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'Billy' },
        { id: 2, name: 'Van' },
        { id: 3, name: 'sth else' }
    ];
    res.json(users);
    
})
async function start(){
    try{
        await mongoose.connect(dbUrl,{
            useNewUrlParser: true,
        })
        app.listen(port, () => console.log(`Server started on port ${port}`))
    } catch(e){
        console.log(e)
    }
}
start()

