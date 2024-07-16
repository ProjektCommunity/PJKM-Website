import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from 'store/index'
import './index.css'
import { RouteObject } from 'react-router-dom'
import { Header } from './Components'
import { Home } from './views'

function Page(PageToShow: () => JSX.Element) {
	return (
		<Header>
			<PageToShow />
		</Header>
	)
}

const routes: RouteObject[] = [
	{
		path: '/',
		element: Page(Home),
	},
]

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App publicRoutes={routes} />
		</Provider>
	</React.StrictMode>
)

