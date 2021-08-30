import express from 'express'

const app = express()

const port = process.env.PORT || 5000

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
    console.log(users);
    
})

app.listen(port, () => console.log(`Server started on port ${port}`))

