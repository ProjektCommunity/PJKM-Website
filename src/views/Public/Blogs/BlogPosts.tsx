import { useEffect, useReducer, useState } from 'react'
import * as API from '@/utils/API'
import { Box, Button, Checkbox, Divider, FormControlLabel, FormGroup, Grid2, SxProps, Typography, useTheme } from '@mui/material'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSprayCan as FestIcon, faGhost as HorrorConIcon, faPenNib as InkIcon, faEgg as GraffitiGrabIcon, faCamera as LenzIcon, faPeopleGroup as CommunityIcon, faChampagneGlasses as NYEIcon, faStore as VketIcon, faFlag as Flag, IconDefinition, faArrowDown, faAngleDown } from '@fortawesome/free-solid-svg-icons'
import PJKTIcon from '@/assets/PJKT-01.png'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowDownward, KeyboardArrowDown } from '@mui/icons-material'

class Blogs {
	blogs: { timeframe: string; blogs: API.Blog[] }[]
	page: number
	limit: number
	availCategories: API.Category[]
	categories: string[]
	tags: API.Tag[]
	projects: string[]
	totalPages: number
	totalBlogs: number
	forceUpdate: () => void

	constructor(forceUpdate: () => void) {
		this.blogs = []
		this.page = 1
		this.limit = 5
		this.availCategories = []
		this.categories = []
		this.tags = []
		this.projects = []
		this.totalPages = 1
		this.totalBlogs = 0
		this.forceUpdate = forceUpdate
	}

	async getBlogs() {
		const res = await API.getBlogs({ page: this.page, limit: this.limit, categories: this.categories, projects: this.projects })
		let newBlogs: typeof this.blogs = []

		for (let i = 0; i < res.blogs.length; i++) {
			const blog = res.blogs[i]
			const blogDate = new Date(blog.createdAt)
			const blogMonth = blogDate.toLocaleString('default', { month: 'long' })
			const blogYear = blogDate.getFullYear()
			const blogTimeframe = `${blogMonth} ${blogYear}`
			if (newBlogs.length === 0) {
				newBlogs.push({ timeframe: blogTimeframe, blogs: [blog] })
				continue
			}

			if (newBlogs[newBlogs.length - 1].timeframe === blogTimeframe) {
				newBlogs[newBlogs.length - 1].blogs.push(blog)
			} else {
				newBlogs.push({ timeframe: blogTimeframe, blogs: [blog] })
			}
		}
		this.blogs = newBlogs
		this.totalPages = res.meta.pages
		this.totalBlogs = res.meta.total
		this.page = res.meta.current
	}

	async getTags() {
		const res = await API.GetProjectTags()
		this.tags = res
		this.forceUpdate()
		return res
	}

	async getCategories() {
		const res = await API.GetCategories()
		this.availCategories = res
		this.forceUpdate()
		return res
	}

	async initialize() {
		const newCategories = await this.getCategories()
		const newTags = await this.getTags()
		if (newCategories.length > 0) this.categories = newCategories.map((category) => category.name)
		if (newTags.length > 0) this.projects = newTags.map((tag) => tag.name)

		await this.getBlogs()
		this.forceUpdate()
	}

	async setCategories(categories: string[]) {
		this.categories = categories
		await this.getBlogs()
		this.forceUpdate()
	}

	async setProjects(projects: string[]) {
		this.projects = projects
		await this.getBlogs()
		this.forceUpdate()
	}

	async setLimit(limit: number) {
		this.limit = limit
		await this.getBlogs()
		this.forceUpdate()
	}
}

export const PjktIcons: {
	[key: string]: IconDefinition
} = {
	Fest: FestIcon,
	HorrorCon: HorrorConIcon,
	Ink: InkIcon,
	GraffitiGrab: GraffitiGrabIcon,
	Lenz: LenzIcon,
	Community: CommunityIcon,
	'VRC NYE': NYEIcon,
	'Virtual Market': VketIcon,
	Other: Flag,
}

export default function BlogPosts(props?: {} & { sx: SxProps }) {
	const [, forceUpdate] = useReducer((x) => x + 1, 0)
	function classForceUpdate() {
		forceUpdate()
	}
	const [blogs, setBlogs] = useState<Blogs>(new Blogs(classForceUpdate))
	const [initialized, setInitialized] = useState<boolean>(false)

	const theme = useTheme()

	useEffect(() => {
		async function initialize() {
			await blogs.initialize()
			setBlogs(blogs)
			setInitialized(true)
			forceUpdate()
		}

		if (!initialized) initialize()
	}, [initialized])

	return (
		<Box sx={{ ...props?.sx }}>
			<Typography
				variant='h1'
				textAlign='center'
				pb={6}
				sx={{
					textDecoration: 'underline',
				}}
			>
				Announcement Blog
			</Typography>
			<Grid2
				container
				spacing={4}
			>
				<Grid2 size={{ xs: 12, md: 4 }}>
					<Box
						borderRadius={4}
						p={4}
						sx={{
							backgroundColor: (theme) => theme.palette.background.paper,
						}}
					>
						<Box
							display='flex'
							flexDirection='row'
							justifyContent='space-between'
							gap={2}
						>
							<Typography variant='h4'>Filter</Typography>
							<Typography
								sx={{
									textDecoration: 'underline',
									cursor: 'pointer',
								}}
								onClick={async () => {
									await blogs.setCategories(['NULL'])
									await blogs.setProjects(['NULL'])
								}}
							>
								Clear Filters
							</Typography>
						</Box>
						<Box
							display='flex'
							flexDirection='column'
							gap={2}
						>
							<FormGroup>
								<Typography variant='h6'>Event</Typography>

								{blogs.tags.map((tag, i) => (
									<Box key={i}>
										<FormControlLabel
											control={
												<Checkbox
													checked={blogs.projects.includes(tag.name)}
													onChange={(e) => {
														let newProjects = blogs.projects
														if (e.target.checked) {
															if (newProjects.length === 1 && newProjects[0] === 'NULL') {
																newProjects = []
															}
															newProjects.push(tag.name)
															blogs.setProjects(newProjects)
														} else {
															newProjects = newProjects.filter((project) => project !== tag.name)
															if (newProjects.length === 0) {
																newProjects = ['NULL']
															}
															blogs.setProjects(newProjects)
														}
													}}
												/>
											}
											label={
												<Box
													display='flex'
													alignItems='center'
													gap={2}
												>
													<FontAwesomeIcon
														icon={PjktIcons[tag.name] || Flag}
														color={tag.color}
													/>
													<Typography
														variant='body1'
														fontWeight='bold'
														fontSize={16}
														letterSpacing={0.1}
														lineHeight={'20px'}
														fontFamily='Atkinson Hyperlegible'
														color={tag.color}
													>
														{(tag.name !== 'Virtual Market' && tag.name !== 'VRC NYE' && 'PJKT:') || 'PJKT +'} {tag.name}
													</Typography>
												</Box>
											}
											// Start icon
											slotProps={{}}
										/>
									</Box>
								))}

								<Typography variant='h6'>Category</Typography>
								{blogs.availCategories.map((category, i) => (
									<Box key={i}>
										<FormControlLabel
											control={
												<Checkbox
													checked={blogs.categories.includes(category.name)}
													onChange={(e) => {
														let newCategories = blogs.categories
														if (e.target.checked) {
															if (newCategories.length === 1 && newCategories[0] === 'NULL') {
																newCategories = []
															}
															newCategories.push(category.name)
															blogs.setCategories(newCategories)
														} else {
															newCategories = newCategories.filter((project) => project !== category.name)
															if (newCategories.length === 0) {
																newCategories = ['NULL']
															}
															blogs.setCategories(newCategories)
														}
													}}
												/>
											}
											label={category.name}
										/>
									</Box>
								))}
							</FormGroup>
						</Box>
					</Box>
				</Grid2>
				<Grid2 size={{ xs: 12, md: 8 }}>
					<Box borderRadius={4}>
						{blogs.blogs.map(({ timeframe, blogs: timeframeBlogs }, i) => (
							<Box key={i}>
								<Typography
									variant='h3'
									pb={2}
									sx={{ textDecoration: 'underline' }}
								>
									{timeframe}
								</Typography>
								<Box pb={4}>
									{timeframeBlogs.map((blog, i) => (
										<Link
											to={`/blog/${blog.id}`}
											key={i}
										>
											<Button
												fullWidth
												sx={{
													p: 0,
													mb: 2,
												}}
											>
												<Grid2
													container
													borderRadius={4}
													overflow='hidden'
													display='flex'
													flexDirection='row'
												>
													<Grid2 size={{ xs: 12, md: (blog.Image && 9) || 12 }}>
														<Box
															key={i}
															p={4}
															sx={{
																backgroundColor: (theme) => theme.palette.background.paper,
															}}
														>
															{blog.ProjectTag && (
																<Box
																	display='flex'
																	alignItems='center'
																	justifyContent='center'
																	width='fit-content'
																	gap={2}
																	borderRadius={8}
																	py={1}
																	px={4}
																	mb={2}
																	sx={{
																		backgroundColor: blog.ProjectTag.color,
																	}}
																>
																	<FontAwesomeIcon
																		icon={PjktIcons[blog.ProjectTag.name] || Flag}
																		color={theme.palette.background.paper}
																	/>
																	<Typography
																		variant='body1'
																		fontWeight='bold'
																		fontSize={16}
																		letterSpacing={0.1}
																		lineHeight={'20px'}
																		fontFamily='Atkinson Hyperlegible'
																		color={theme.palette.background.paper}
																	>
																		PJKT: {blog.ProjectTag.name}
																	</Typography>
																</Box>
															)}
															<Typography
																variant='h4'
																textAlign='left'
																overflow={'hidden'}
																whiteSpace={'nowrap'}
																textOverflow={'ellipsis'}
																maxWidth={'80%'}
															>
																{blog.title}
															</Typography>
															<Typography
																variant='body1'
																textAlign='left'
																sx={{
																	// Only show 1 line of content
																	textOverflow: 'ellipsis',
																	maxWidth: '100%',
																	WebkitBoxOrient: 'vertical',
																	// only allow 2 lines of text
																	display: '-webkit-box',
																	WebkitLineClamp: 2,
																	// Hide text that overflows
																	overflow: 'hidden',
																}}
															>
																{blog.content.replaceAll('#', '')}
																{/* <Markdown remarkPlugins={[remarkGfm]}>
																	{blog.content.split('\n')[0]}
																</Markdown> */}
															</Typography>
															<Box
																display='flex'
																justifyContent='space-between'
																mt={2}
															>
																<Typography variant='caption'>
																	{new Date(blog.createdAt).toLocaleDateString()} - {blog.Categories?.map((category) => category.name).join(', ')}
																</Typography>
																<Typography
																	variant='caption'
																	sx={{
																		cursor: 'pointer',
																	}}
																	onClick={() => {
																		// Navigate to blog
																	}}
																>
																	Read More
																</Typography>
															</Box>
														</Box>
													</Grid2>
													{blog.Image && (
														<Grid2 size={{ xs: 12, md: 3 }}>
															<Box
																component='img'
																src={blog.Image.path}
																width='100%'
																height='100%'
																sx={{
																	objectFit: 'cover',
																}}
															/>
														</Grid2>
													)}
												</Grid2>
											</Button>
										</Link>
									))}
								</Box>
							</Box>
						))}
					</Box>

					{/* Pagination */}
					{blogs.totalPages > 1 && blogs.page !== blogs.totalPages && (
						<>
							<Divider
								sx={{
									borderColor: 'white',
									borderWidth: 1,
									mb: 4,
								}}
							/>
							<Box
								display='flex'
								justifyContent='flex-start'
								alignItems='center'
								gap={2}
								sx={{
									cursor: 'pointer',
								}}
								onClick={async () => {
									await blogs.setLimit(blogs.limit + 5)
								}}
							>
								<Box
									height={20}
									width={20}
									borderRadius={'50%'}
									display='flex'
									alignItems='center'
									justifyContent='center'
									position='relative'
									sx={{
										backgroundColor: 'white',
										mask: 'url(#icon-mask)',
										WebkitMask: 'url(#icon-mask)',
									}}
								>
									<svg viewBox='0 0 20 20'>
										<defs>
											<mask
												id='icon-mask'
												x='0'
												y='0'
											>
												<rect
													x='0'
													y='0'
													width='20'
													height='20'
													fill='white'
												/>
												<KeyboardArrowDown />
											</mask>
										</defs>
									</svg>
								</Box>
								<Typography
									variant='h5'
									sx={{
										textDecoration: 'underline',
									}}
								>
									See More Announcements
								</Typography>
							</Box>
						</>
					)}
				</Grid2>
			</Grid2>

			{/* <Typography whiteSpace={'pre-wrap'}>
				{JSON.stringify(
					{
						blogs,
						page,
						limit,
						availCategories,
						categories,
						tags,
						projects,
						totalPages,
						totalBlogs,
						initialized,
					},
					null,
					4
				)}
			</Typography> */}
		</Box>
	)
}
