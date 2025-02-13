import axios from 'axios'

export const client = axios.create({
	baseURL: 'https://beta.projektcommunity.com',
	headers: {
		'Content-Type': 'application/json',
	},
})

export type * from './Types'
export * from './Projects'
export * from './Blogs'
