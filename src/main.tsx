import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from 'store/index'
// import { routes } from './services/all_routes'
import './index.css'
import { RouteObject } from 'react-router-dom'
import { Header } from './Components'
import { Home, FAQ } from './views'
import {
	Events,
	GraffitiGrab,
	Fest,
	Lenz,
	HorrorCon,
} from './views/Public/Events'

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
	{
		path: '/events',
		element: Page(Events),
	},
	// Events
	{
		path: '/events/graffiti_grab',
		element: Page(GraffitiGrab),
	},
	{
		path: '/events/fest',
		element: Page(Fest),
	},
	{
		path: '/events/lenz',
		element: Page(Lenz),
	},
	{
		path: '/events/horrorcon',
		element: Page(HorrorCon),
	},
	{
		path: '/FAQ',
		element: Page(FAQ),
	},
]

ReactDom.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<App publicRoutes={routes} />
		</Provider>
	</React.StrictMode>
)

