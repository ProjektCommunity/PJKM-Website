import * as API from '../'
import { client } from '../'

export async function getBlogs(): Promise<API.BlogsResponse>
export async function getBlogs(config: { limit?: number; page?: number; categories?: string[]; projects?: string[] }): Promise<API.BlogsResponse>
export async function getBlogs(config?: { limit?: number; page?: number; categories?: string[]; projects?: string[] }): Promise<API.BlogsResponse> {
	const urlSearchParams = new URLSearchParams()
	if (!config) return (await client.get('/blogs')).data as API.BlogsResponse
	if (config?.limit) urlSearchParams.append('limit', config.limit.toString())
	if (config?.page) urlSearchParams.append('page', config.page.toString())
	if (config?.categories && config.categories.length > 0) urlSearchParams.append('categories', config.categories.join(','))
	if (config?.projects && config.projects.length > 0) urlSearchParams.append('projects', config.projects.join(','))
	const res = await client.get(`/blogs?${urlSearchParams.toString()}`)
	return res.data as API.BlogsResponse
}

export async function getBlog(id: number): Promise<API.BlogResponse>
export async function getBlog(latest: true): Promise<API.BlogResponse>
export async function getBlog(idOrLatest: number | true): Promise<API.BlogResponse> {
	if (idOrLatest === true) {
		const res = await client.get('/blogs/latest')
		return res.data as API.BlogResponse
	}

	const res = await client.get(`/blogs/${idOrLatest}`)
	return res.data as API.BlogResponse
}

export async function GetCategories(): Promise<API.Category[]> {
	const res = await client.get('/blogs/categories')
	return res.data as API.Category[]
}

export async function getBlogRelative(config: { id: number; next: boolean }): Promise<API.BlogResponse> {
	const res = await client.get(`/blogs/relative/${config.id}?next=${config.next}`)
	return res.data as API.BlogResponse
}
