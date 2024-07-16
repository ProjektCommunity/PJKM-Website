import { CssBaseline, ThemeProvider } from '@mui/material'
import {
	Navigate,
	RouteObject,
	RouterProvider,
	createBrowserRouter,
} from 'react-router-dom'
import { useSelector } from 'react-redux'
import theme from 'services/theme/theme'
import { RootState } from 'store/index'
import './App.css'
// import { Header } from './Components'
import { useEffect, useState } from 'react'

function App(props: { publicRoutes: RouteObject[] }) {
	const { publicRoutes } = props
	// const themeSlice = useSelector((state: RootState) => state.themeSlice)
	const [init, setInit] = useState(false)

	useEffect(() => {
		if (!init) {
			document.title = 'Project Community'
			setInit(true)
		}
	})

	// function buildRoutes(pubRoutes: RouteObject[]) {
	// 	let routes: RouteObject[] = [...pubRoutes]
	let redirect: JSX.Element = <Navigate to={'/'} />

	// 	if ()
	// }

	let routers = createBrowserRouter([
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
			{/* <CssBaseline /> */}
			<RouterProvider router={routers} />
		</ThemeProvider>
	)
}

export default App

