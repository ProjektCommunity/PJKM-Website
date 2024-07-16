import * as API from '../'
import { client } from '../'

export async function getProjects(): Promise<API.Project[]> {
	// API not build yet. Fake API call
	const res = await client.get('/projects')
	return res.data.projects as API.Project[]
}
