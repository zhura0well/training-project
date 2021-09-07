import React from 'react'
import { Route } from 'react-router-dom'
import Login from '../views/login'
function Router() {


  return (
    <>
      <Route path='/login'>
        <Login isRegistered={true}/>
      </Route>

      <Route path='/register'>
        <Login isRegistered={false}/>
      </Route>
    </>
  )
}


export default Router