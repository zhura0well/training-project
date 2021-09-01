import React, { useState, useEffect } from 'react'
import './App.scss'
import { Button, Container, FormControl, Input, InputLabel } from '@material-ui/core'

function App() {

  const baseUrl = 'api/users'
  const [users, setUsers] = useState([])
  const [newUser, setNewUser] = useState('')

  //mb this function should be in separate file
  const fetchData = (url, setter) => {
    fetch(url)
      .then(response => response.json())
      .then(response => setter(response))
  }
  //mb this function should be in separate file
  const postData = async (url, data) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    return response.json()
  }

  useEffect(() => {
    fetchData(baseUrl, setUsers)
  }, [])

  const postNewUser = () => {
    postData(baseUrl, { name: newUser })
      .then(() => setNewUser(''))
      .then(() => fetchData(baseUrl, setUsers))
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
