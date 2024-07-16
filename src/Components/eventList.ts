import * as API from '@/utils/API'

// Use previously commented out code
export class EventList {
	list: API.Schedule[]
	loaded?: {
		year: number
		project: API.Project
	}
	constructor(
		list: API.Schedule[],
		loaded?: { year: number; project: API.Project }
	) {
		this.list = this.createURLS(list)
		this.loaded = loaded
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
	public getSchedule(list: API.Schedule[]): API.Project[] {
		const projects: API.Project[] = []
		this.list.forEach((year) => {
			year.projects.forEach((project) => {
				if (
					projects.find(
						(addedProject) => project.name === addedProject.name
					) !== undefined
				) {
					// switch out old project with new project if the new project is more recent
					const index = projects.findIndex(
						(addedProject) => project.name === addedProject.name
					)
					if (
						projects[index].startDate.getTime() <
						project.startDate.getTime()
					) {
						projects[index] = {
							...project,
							route: `/events/${
								year.year
							}/${project.name.replaceAll(' ', '-')}`,
						}
					}
					return
				}

				projects.push({
					...project,
					route: `/events/${year.year}/${project.name}`,
				})
			})
			return projects
		})

		// Return a sorted array so that it is sorted by most recent year to least recent year, but all years are sorted from oldest to newest
		return projects.sort((a, b) => {
			if (a.startDate.getFullYear() > b.startDate.getFullYear()) return -1
			if (a.startDate.getFullYear() < b.startDate.getFullYear()) return 1
			if (a.startDate.getTime() > b.startDate.getTime()) return 1
			if (a.startDate.getTime() < b.startDate.getTime()) return -1
			return 0
		})
	}

	public getEventPageList(): {
		name: string
		route: string
		image: string
		buttonImg: string
		start: Date
		end: Date
		secret?: true
	}[] {
		let projectList = this.list
			.map((year) => {
				return year.projects.map((project) => {
					return {
						name: project.name,
						route: project.route.toLowerCase(),
						image: project.image,
						buttonImg: project.buttonImg,
						start: project.startDate,
						end: project.endDate,
						secret: project.secret
					}
				})
			})
			.flat()
			.sort((a, b) => {
				if (a.start.getFullYear() > b.start.getFullYear()) return -1
				if (a.start.getFullYear() < b.start.getFullYear()) return 1
				if (a.start.getTime() > b.start.getTime()) return 1
				if (a.start.getTime() < b.start.getTime()) return -1
				return 0
			})
		projectList = projectList.filter((project) => {
			// find any duplicates and remove the older ones
			const dup = projectList.find((a) => a.name === project.name)
			if (dup === undefined) return false
			if (dup.start.getTime() > project.start.getTime()) return false
			return true
		})
		return projectList
	}
	/**
	 * Returns the type of Project based on the loaded project
	 * @returns Type of Project
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * eventList.setLoaded(2021, await API.getProject(2021, 'Easter Hunt'))
	 * console.log(eventList.ProjectType())
	 * // Output: Easter Hunt
	 *
	 * eventList.setLoaded(2021, await API.getProject(2021, 'Summer Festival'))
	 * console.log(eventList.ProjectType())
	 * // Output: Festival
	 */
	public ProjectType(): string {
		if (!this.loaded)
			throw new Error(
				'Event List must be initialized first. Ensure you run setLoaded() before calling ProjectType()'
			)
		let type = 'N/A'
		const project = this.loaded.project

		if (project.EasterHunt != undefined) type = 'Easter Hunt'
		if (project.events != undefined) type = 'Festival'
		return type
	}

	/**
	 * Returns the list of years
	 * @returns List of years
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * console.log(eventList.getListOfYears())
	 * // Output: [2021, 2020, 2019, 2018, 2017, 2016, 2015]
	 */
	public getListOfYears(): number[] {
		return this.list.map((year) => year.year)
	}

	/**
	 * Returns the list of projects for a given year
	 * @param year Year to get projects for
	 * @returns List of projects for a given year
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * console.log(eventList.getListOfProjects(2021))
	 * // Output: [{...}, {...}, {...}]
	 */
	public getProjectByRoute(route: string): API.Project {
		const year = parseInt(route.toLowerCase().split('/')[2])
		const name = route.toLowerCase().split('/')[3].replaceAll('-', ' ')
		const schedule = this.list.find((schedule) => schedule.year === year)
		if (schedule === undefined) throw new Error('Year not found')

		const project = schedule.projects.find(
			(project) => project.name.toLowerCase() === name
		)
		if (project === undefined) throw new Error('Project not found')

		return project
	}

	/**
	 * Returns the list of projects for a given year
	 * Assumes that the year is already loaded
	 * @returns List of projects for a given year
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * console.log(eventList.getProjects())
	 * // Output: [{...}, {...}, {...}]
	 */
	public getProjects(): API.Project[] {
		const loaded = this.loaded
		if (loaded === undefined) throw new Error('No year loaded')
		return (
			this.list.find(
				(schedule) => schedule.year == loaded.year
			) as API.Schedule
		).projects
	}

	// Get Project by Year and Name
	/**
	 * Returns the project for a given year and name
	 * @param year Year to get project for
	 * @param name Name of project to get
	 * @returns Project for a given year and name
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * console.log(eventList.getProjectByYearAndName(2021, 'Easter Hunt'))
	 * // Output: {...}
	 */
	public getProjectByYearAndName(year: number, name: string) {
		const schedule = this.list.find((schedule) => schedule.year === year)
		if (schedule === undefined) throw new Error('Year not found')

		const project = schedule.projects.find(
			(project) => project.name === name
		)
		if (project === undefined) throw new Error('Project not found')

		return project
	}
	//#endregion

	//#region Setters
	/**
	 * Sets the list of years and projects, and returns the list with the routes added
	 * @param list List of all years
	 * @returns List of all years with routes added
	 * @example
	 * constructor(list: API.Schedule[]){
	 * 	this.list = this.createURLS(list)
	 * }
	 */
	private createURLS(list: API.Schedule[]): API.Schedule[] {
		return list.map((year) => {
			return {
				...year,
				projects: year.projects.map((project) => {
					return {
						...project,
						route: `/events/${year.year}/${project.name
							.toLowerCase()
							.replaceAll(' ', '-')}`,
					}
				}),
			}
		})
	}

	/**
	 * Sets the loaded year and project
	 * @param year Year to set
	 * @param project Project to set
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * eventList.setLoaded(2021, await API.getProject(2021, 'Easter Hunt'))
	 */
	public setLoaded(year: number, project: API.Project): void {
		this.loaded = { year: year, project: project }
	}

	/**
	 * Sets the loaded year
	 * @param year Year to set
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * eventList.setLoaded(2021, await API.getProject(2021, 'Easter Hunt'))
	 * eventList.setYear(2020)
	 */
	public setProject(project: API.Project): void {
		if (this.loaded === undefined)
			throw new Error(
				'Event List must be initialized first. Ensure you run setLoaded() before calling setProject()'
			)
		this.loaded.project = project
	}

	/**
	 * Sets the loaded year
	 * @param year Year to set
	 * @example
	 * const eventList = new EventList(await API.getSchedules())
	 * eventList.setLoaded(2021, await API.getProject(2021, 'Easter Hunt'))
	 * eventList.setYear(2020)
	 */
	public setYear(year: number): void {
		const loaded = this.loaded
		if (loaded) {
			const schedule = this.list.find(
				(schedule) => schedule.year === year
			)
			if (schedule === undefined) throw new Error('Year not found')

			loaded.year = year
			let project = schedule.projects.find(
				(project) => project.name === loaded.project.name
			)
			if (project === undefined) {
				project = schedule.projects[0]
			}
			loaded.project = project
		} else {
			throw new Error(
				'Event List must be initialized first. Ensure you run setLoaded() before calling setYear()'
			)
		}
	}

	//#endregion
}
