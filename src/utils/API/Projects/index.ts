import * as API from '../'
import { client } from '../'

export interface GetProjectsParams {
  tagId?: number
  publicOnly?: boolean
  acceptingBooths?: boolean
  acceptingEvents?: boolean
  limit?: number
  offset?: number
}

export async function getProjects(params?: GetProjectsParams): Promise<API.Project[]> {
  try {
    const res = await client.get('/projects', { params })
    
    // Handle different possible response structures
    if (res.data?.projects && Array.isArray(res.data.projects)) {
      return res.data.projects as API.Project[]
    } else if (res.data?.data && Array.isArray(res.data.data)) {
      return res.data.data as API.Project[]
    } else if (Array.isArray(res.data)) {
      return res.data as API.Project[]
    } else {
      console.warn('Unexpected API response structure:', res.data)
      return []
    }
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export async function getProject(projectId: number): Promise<API.Project | null> {
  try {
    const res = await client.get(`/projects/${projectId}`)
    return res.data.data as API.Project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export async function getUpcomingProjects(): Promise<API.Project[]> {
  try {
    const res = await client.get('/projects', { 
      params: { 
        publicOnly: true,
        limit: 50 
      } 
    })
    
    // Handle different possible response structures
    let projects: API.Project[] = []
    if (res.data?.projects && Array.isArray(res.data.projects)) {
      projects = res.data.projects as API.Project[]
    } else if (res.data?.data && Array.isArray(res.data.data)) {
      projects = res.data.data as API.Project[]
    } else if (Array.isArray(res.data)) {
      projects = res.data as API.Project[]
    } else {
      console.warn('Unexpected API response structure:', res.data)
      return []
    }
    
    // Filter for upcoming projects (start_date in the future)
    return projects.filter(project => new Date(project.start_date) > new Date())
  } catch (error) {
    console.error('Error fetching upcoming projects:', error)
    return []
  }
}

export async function getPastProjects(): Promise<API.Project[]> {
  try {
    const res = await client.get('/projects', { 
      params: { 
        publicOnly: true,
        limit: 50 
      } 
    })
    
    // Handle different possible response structures
    let projects: API.Project[] = []
    if (res.data?.projects && Array.isArray(res.data.projects)) {
      projects = res.data.projects as API.Project[]
    } else if (res.data?.data && Array.isArray(res.data.data)) {
      projects = res.data.data as API.Project[]
    } else if (Array.isArray(res.data)) {
      projects = res.data as API.Project[]
    } else {
      console.warn('Unexpected API response structure:', res.data)
      return []
    }
    
    // Filter for past projects (end_date in the past)
    return projects.filter(project => new Date(project.end_date) < new Date())
  } catch (error) {
    console.error('Error fetching past projects:', error)
    return []
  }
}

export async function GetProjectTags(): Promise<API.Tag[]> {
  try {
    const res = await client.get('/projects/tags')
    return res.data.data as API.Tag[]
  } catch (error) {
    console.error('Error fetching project tags:', error)
    return []
  }
}
