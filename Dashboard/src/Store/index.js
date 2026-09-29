import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import auth from './Slice/auth'


const persistConfig = {
    key : 'root',
    storage
}

const persistedReducer  = persistReducer(
    persistConfig,
    auth
) 

export const store = configureStore({
    reducer: {
        auth : persistedReducer
    }
})


export const persist = persistStore(store)