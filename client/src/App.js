import React, { useState, useEffect } from 'react'
import './App.scss'
import { Button, Container, FormControl, Input, InputLabel } from '@material-ui/core'

function App() {

  const baseUrl = 'api/users'
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState('')

  const fetchData = (url, setter) => {
    fetch(url)
      .then(response => response.json())
      .then(response => setter(response))
  }
  useEffect(() => {
    fetchData(baseUrl, setUsers)
  }, [])


  const postNewUser = () => {
    //the problem is here(body is empty, but in console all looks good)
    console.log(JSON.stringify({ name: newUser }))
    fetch(baseUrl, {
      method: 'POST',
      body: JSON.stringify({ name: newUser })
    }).then(() => fetchData(baseUrl, setUsers))
  }


  return (
    <Container>
      <div>
        Users
        {users && users.map(item => {
          return (
            <div key={item.id}>
              <span>{item.id}</span> <span>{item.name}</span>
            </div>
          )
        })}
      </div>

      <div>
        <FormControl>
          <InputLabel htmlFor='my-input'>Enter your name</InputLabel>
          <Input value={newUser} onChange={(e) => setNewUser(e.target.value)} id='my-input' />
        </FormControl>
        <Button variant='contained' onClick={postNewUser}>Create new user</Button>
      </div>
    </Container>
  )
}

export default App
