import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    token: null,
    user: null
}

const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = action.payload.token
            state.user = action.payload.user
        },
        removeToken: state => {
            state.token = null
            state.user = null
        }
    }
})

export const { addToken, removeToken } = authSlice.actions
export default authSlice.reducer