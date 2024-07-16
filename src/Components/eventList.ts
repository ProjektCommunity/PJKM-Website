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
		return this.list.filter((project) => project.end_date < new Date())
	}

	//#endregion
}
