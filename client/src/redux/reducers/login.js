import { createSlice } from '@reduxjs/toolkit'

const loginSlice = createSlice({
  name: 'login',
  initialState: {
    username: '',
    password: '',
    users: []
  },
  reducers: {
    onUsernameChange(state, action) {
      state.username = action.payload.username
    },
    onPasswordChange(state, action) {
      state.password = action.payload.password
    },
    setUsers(state, action) {
      state.users = action.payload.users
    }
  }
})

export const { onUsernameChange, onPasswordChange, setUsers } = loginSlice.actions

export default loginSlice.reducer