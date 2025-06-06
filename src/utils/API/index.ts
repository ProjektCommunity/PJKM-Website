import axios from 'axios'

export const client = axios.create({
baseURL: 'https://api.projektcommunity.com',
headers: {
'Content-Type': 'application/json',
},
})

export type * from './Types'
export * from './Projects'
// export * from './Blogs' // Blog was removed
