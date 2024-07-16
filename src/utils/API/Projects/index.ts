import * as API from '../'
import { client } from '../'
import axios from 'axios'
import GG from '@/assets/photos/Home/GraffitiGrab.png'
import Fest from '@/assets/photos/Home/PJKTFEST.png'
import Lenz from '@/assets/photos/Home/ProjektLenz.png'
import LenzPoster from '@/assets/photos/Events/Lenz.png'
import horrorcon from '@/assets/photos/Home/ProjektHorrorCon.png'

export async function getProjects(): Promise<API.Project[]> {
	// API not build yet. Fake API call
	const res = await client.get('/projects')
	return res.data.projects as API.Project[]
}
