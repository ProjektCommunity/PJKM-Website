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
	id: number
	name: string
	start_date: Date
	end_date: Date
	accepting_booth: boolean
	accepting_events: boolean
	booth_requirements: Object
	booth_deadline_date: Date
	events_deadline_date: Date
	preview_link: string | null
	public: boolean
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null

	logo_id: number | null
	Logo?: File
	group_photo_id: number | null
	GroupPhoto?: File
	poster_id: number | null
	Poster?: File
	tag_id: number | null
	ProjectTag?: Tag
	venue_id: number | null
	Venue?: Venue
}

export interface File {
	id: number
	name?: string
	path?: string
}

export interface Tag {
	id: number
	name: string
	color: string
}

export interface Venue {
	id: number
	name: string
	url: string
	world_id: string
	orgOwned: boolean
	createdAt: Date
	updatedAt: Date
	deletedAt: Date | null
	community_id: number
}
