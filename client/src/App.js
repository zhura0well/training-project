import { useState, useEffect } from 'react'
import './App.scss'

function App() {

  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('api/users')
    .then(response =>  response.json())
    .then(response => setUsers(response))
  }, [])
  return (
    <div className="App">
      Users
      {users && users.map(item => {
        return(
          <div>
            <span key={item.id}>{item.id}</span> <span>{item.name}</span>
          </div>
        )
      })}
      <div>

      </div>
    </div>
  )
}

export default App
