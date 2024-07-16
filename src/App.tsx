import { ThemeProvider } from '@mui/material'
import {
	Navigate,
	RouteObject,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom'
import theme from 'services/theme/theme'
import './App.css'
import { useEffect, useState } from 'react'

function App(props: { publicRoutes: RouteObject[] }) {
	const { publicRoutes } = props
	const [init, setInit] = useState(false)

	useEffect(() => {
		if (!init) {
			document.title = 'Project Community'
			setInit(true)
		}
	})
	const redirect: JSX.Element = <Navigate to={'/'} />

	// 	if ()
	// }

	const routers = createBrowserRouter([
		{
			children: publicRoutes,
		},
		{
			path: '*',
			element: redirect,
		},
	])

	return (
		<ThemeProvider theme={theme}>
			<RouterProvider router={routers} />
		</ThemeProvider>
	)
}

export default App
