import React, { useEffect, useState } from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from 'store/index'
// import { routes } from './services/all_routes'
import './index.css'

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App />
		</Provider>
	</React.StrictMode>
)
