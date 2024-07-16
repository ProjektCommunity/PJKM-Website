import axios from 'axios'

export const client = axios.create({
	baseURL: 'https://beta.projektcommunity.com',
	headers: {
		'Content-Type': 'application/json',
	},
})

export type { event, Project } from './Types'
export { getProjects } from './Projects'
