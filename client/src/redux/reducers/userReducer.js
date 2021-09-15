import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    roles: [],
    isAuthorized: false
    /*username: '' ?
    some other info*/
  },
  reducers: {
    setRoles(state, action) {
      state.roles = action.payload.roles
    },
    setIsAuthorized(state, action) {
      state.isAuthorized = action.payload.isAuthorized
    }
  }
})

export const { setRoles, setIsAuthorized } = userSlice.actions

export default userSlice.reducer