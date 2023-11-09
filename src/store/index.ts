import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'

import storage from 'redux-persist/lib/storage'
import themeSlice from './theme/themeSlice'
const persistConfig = {
	key: 'root',
	storage,
}

const globalReducers = combineReducers({ themeSlice })

const persistantStore = persistReducer(persistConfig, globalReducers)

const store = configureStore({
	reducer: persistantStore,
	devTools: process.env.NODE_ENV !== 'production',
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

export default store
