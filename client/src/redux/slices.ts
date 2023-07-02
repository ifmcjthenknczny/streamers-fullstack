import { createSlice } from '@reduxjs/toolkit'

interface AppState {
  listNeedsRefresh: boolean
}

const initialState: AppState = {
    listNeedsRefresh: false
}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setNeedsRefresh: (state) => {
            state.listNeedsRefresh = true
        },
        clearNeedsRefresh: (state) => {
            state.listNeedsRefresh = false
        }
    }
})

export interface RootState {
  [appSlice.name]: AppState
}

export const {
    setNeedsRefresh,
    clearNeedsRefresh
} = appSlice.actions

export default appSlice.reducer
