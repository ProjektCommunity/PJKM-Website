import { ThemeProvider } from '@mui/material'
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom'
import theme from 'services/theme/theme'
import './App.css'
import { useEffect, useState } from 'react'
import { Page } from './Components'
import { Home, UpcomingEvents, PastEvents, StaffPage, GroupsList, GroupDetail, FAQPage } from './views' // Updated import for StaffPage
import Contact from './views/Public/Contact'

function App() {
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
			children: [
				{
					path: '/',
					element: Page(Home),
				},
				{
					path: '/events',
					element: Page(UpcomingEvents),
				},
				{
					path: '/events/past',
					element: Page(PastEvents),
				},
{
path: '/events/:id',
element: Page(UpcomingEvents),
},
{
path: '/staff', // Add route for StaffPage
element: Page(StaffPage),
},
{
path: '/groups',
element: Page(GroupsList)
},
{
path: '/groups/:id',
element: Page(GroupDetail)
},
{
path: '/contact',
element: Page(Contact)
},
{
path: '/faq',
element: <FAQPage />
}
],
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
