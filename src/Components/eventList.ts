import * as API from '@/utils/API'

// Use previously commented out code
export class EventList {
	list: API.Project[]
	constructor(list: API.Project[]) {
		this.list = list.map((project) => {
			return {
				...project,
				start_date: new Date(project.start_date),
				end_date: new Date(project.end_date),
				createdAt: new Date(project.createdAt),
				updatedAt: new Date(project.updatedAt),
				deletedAt: project.deletedAt ? new Date(project.deletedAt) : null,
			}
		})
	}

	//#region Getters
	/**
	 * Combines all Projects from all years, and returns a sorted array of the projects
	 * @param list List of all years
	 * @returns Sorted array of all projects
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * const projects = eventList.getSchedule(eventList.list)
	 * console.log(projects)
	 */
	
	get() {
		return this.list
	}

	public getUpcoming() {
		return this.list.filter((project) => project.end_date > new Date())
	}
	
	public getPast() {
		const projects: {
			year: number
			projects: API.Project[]
		}[] = []
		const years = new Set<number>()
		this.list.forEach((project) => {
			// Check if the project is in the past
			if (new Date(project.end_date) > new Date()) return
			const year = project.start_date.getFullYear()
			if (!years.has(year)) {
				years.add(year)
				projects.push({
					year,
					projects: [],
				})
			}
			projects.find((p) => p.year === year)?.projects.push(project)
		})
		projects.sort((a, b) => b.year - a.year)
		projects.forEach((project) => {
			project.projects.sort((a, b) => b.start_date.getTime() - a.start_date.getTime())
		})
		return projects
	}

	//#endregion
}
