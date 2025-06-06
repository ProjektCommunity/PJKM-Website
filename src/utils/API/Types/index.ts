
export interface Project {
	id: number
	name: string
	start_date: Date
	end_date: Date
	accepting_booth: boolean
	accepting_events: boolean
	booth_requirements: object
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
url?: string
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

// Event related types
export interface Event {
  id: number
  name: string
  start_date: string
  end_date: string
  marketing?: string
  stream_link?: string
  quest: boolean
  instance_url?: string
  event_public: boolean
  event_ready: boolean
  createdAt: string
  updatedAt: string
  deletedAt?: string
  
  project_id?: number
  Project?: Project
  community_id?: number
  Community?: Community
  venue_id?: number
  Venue?: Venue
  event_type_id?: number
  EventType?: EventType
  poster_id?: number
  Poster?: File
  EventCredits?: EventCredit[]
}

export interface EventType {
  id: number
  name: string
  createdAt: string
  updatedAt: string
}

export interface EventCredit {
  id: number
  role_in_event: string
  community_member_id: number
  CommunityMember?: CommunityMember
}

export interface Community {
  id: number
  name: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface CommunityMember {
  id: number
  username: string
  display_name?: string
}

// Events API response types
export interface EventsResponse {
  events?: Event[]
  data?: Event[]
}

export interface EventResponse {
  event?: Event
  data?: Event
}

// Event query parameters
export interface EventsQueryParams {
  projectId?: number
  communityId?: number
  venueId?: number
  eventTypeId?: number
  startDateBefore?: string
  startDateAfter?: string
  publicOnly?: boolean
  readyOnly?: boolean
  limit?: number
  offset?: number
}
