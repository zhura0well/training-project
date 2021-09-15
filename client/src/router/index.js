import React from 'react'
import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

/*can't import from config.js
 relative imports outside of src/ are not supported*/
const ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  MODER: 'MODER'
}

import Admin from '../views/admin'
import Home from '../views/home'
import Login from '../views/login'
import Moder from '../views/moder'

function Router() {
  const userRouts = [
    { path: '/user', component: <Home /> },
  ]

  const moderRouts = [
    { path: '/moder', component: <Moder /> },
  ]

  const adminRouts = [
    { path: '/admin', component: <Admin /> },
  ]

  const roles = useSelector(state => state.user.roles)
  const isAuthorized = useSelector(state => state.user.isAuthorized)

  return (
    <>
      <Route path='/login'>
        <Login isRegistered={true} />
      </Route>

      <Route path='/register'>
        <Login isRegistered={false} />
      </Route>
      <Route exact path='/'>
        {!isAuthorized ?
          <Redirect push to='/login' />
          : <Home />}
      </Route>
      {
        roles.includes(ROLE.USER) &&
        userRouts.map((route, index) => (
          <Route path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.MODER) &&
        moderRouts.map((route, index) => (
          <Route path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.ADMIN) &&
        adminRouts.map((route, index) => (
          <Route path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

    </>
  )
}


export default Router