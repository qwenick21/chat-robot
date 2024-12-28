import { createSlice } from '@reduxjs/toolkit'

export const permissionsSlice = createSlice({
  name: 'permissions',
  initialState: {
    value: false
  },
  reducers: {
    setPermissions: (state, action) => {
      state.value = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPermissions } = permissionsSlice.actions

export default permissionsSlice.reducer