import React, { useState } from 'react'
import { Avatar, Button, TextField, Link, Container, makeStyles, Typography, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PropTypes from 'prop-types'
import { getData } from '../../requests'

const Login = (props) => {

  //Styles
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

  const classes = useStyles()

  //Logic
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])

  const login = async () => {
    const url = props.isRegistered ? '/api/login' : '/api/register'
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password })
    })

    return response.json()
  }

  const getUsers = () => {
    getData('/api/users', setUsers)
    console.log(users)
  }

  return (
    <Container component='main' maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          {props.isRegistered ? 'Sign in' : 'Sign up'}
        </Typography>
        <form className={classes.form}>
          <TextField
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Username'
            autoFocus
          />
          <TextField
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant='outlined'
            margin='normal'
            required
            fullWidth
            label='Password'
            type='password'
            autoComplete='current-password'
          />
          <Button
            fullWidth
            variant='contained'
            color='primary'
            onClick={login}
            className={classes.submit}
          >
            {props.isRegistered ? 'Sign in' : 'Sign up'}
          </Button>
          <Box align='center'>
            <Link href='/register' variant='body2'>
              {'Don`t have an account? Sign Up'}
            </Link>
          </Box>
        </form>
        <Button
          fullWidth
          variant='contained'
          color='primary'
          onClick={getUsers}
          className={classes.submit}
        >
          {getUsers}
        </Button>
      </div>
    </Container>
  )
}

Login.propTypes = { isRegistered: PropTypes.bool }

export default Login

