export interface event {
	event: string
	startDate: Date
	endDate: Date
	Description?: string
	image?: string
	community?: string
	venue?: {
		name: string
		link: string
	}
	eventType?: string
	streamed?: boolean
	streamLink?: string
	quest?: boolean
}

export interface Project {
	name: string
	route: string
	image: string
	buttonImg: string
	startDate: Date
	endDate: Date
	videoUrl?: string | string[]
	EasterHunt?: {
		description: string
		worlds: { name: string; link: string, image?: string }[]
		collaborations?: { name: string; link: string }[]
		raffle?: {
			description: string
			raffleLink: string
			winners?: string[]
		}
	}
	FilmFestival?: {
		description: string
		submissions?: {
			name: string
			link: string
			thumbnail: string
		}[]
	}
	events?: event[]
	secret?: true
}

export interface Schedule {
	year: number
	projects: Project[]
}
