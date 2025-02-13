import React, { useEffect, useReducer, useState } from 'react'
import { Box, Button, Typography, useTheme } from '@mui/material'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowBack, ArrowForward } from '@mui/icons-material'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as API from '@/utils/API'

import { PjktIcons } from './BlogPosts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Flag } from '@mui/icons-material'

export default function BlogPost() {
	const { id } = useParams<{ id: string }>()

	if (!id || id === undefined) throw Error('No blog ID provided')
	if (isNaN(parseInt(id))) throw Error('Invalid blog ID provided')
	const [blogID, setBlogID] = useState(parseInt(id))

	const [blog, setBlog] = React.useState<API.Blog | null>(null)
	const [_, forceUpdate] = useReducer((x) => x + 1, 0)
	const [isPrevious, setIsPrevious] = React.useState<boolean>(false)
	const [isNext, setIsNext] = React.useState<boolean>(false)
	const theme = useTheme()
	const navigate = useNavigate()

	async function handleNext() {
		navigate(`/blog/${blogID + 1}`)
		setBlogID(blogID + 1)
		await GetBlog({ next: true })
		// forceUpdate()
	}

	async function handlePrevious() {
		await GetBlog({ next: false })
		// forceUpdate()
	}

	async function GetBlog(config?: { next?: boolean }) {
		let blogres: API.BlogResponse | null = null
		if (config) {
			blogres = await API.getBlogRelative({ id: blogID, next: config?.next || false })
		} else {
			blogres = await API.getBlog(blogID)
		}
		if (!blogres) return

		const blog = blogres.blog
		const { hasPrevious, hasNext } = blogres.meta

		/*
			some content includes timestamps in the format of
				<t:1739396520:d> (mm/dd/yyyy)
				<t:1739396520:D> (Month dd, yyyy)
				<t:1739396520:t> (hh:mm AM/PM)
				<t:1739396520:T> (hh:mm:ss AM/PM)
				<t:1739396520:f> (Month dd, yyyy hh:mm AM/PM)
				<t:1739396520:F> (Day of the week, Month dd, yyyy hh:mm:ss AM/PM)
				<t:1739396520:R> (time since or until the timestamp) (i.e. 4 days ago, in 5 hours, etc)
				<t:1739396520> (Just the timestamp)
			which are not supported by the markdown parser. Convert these to a human-readable format.
		*/
		const timestampRegex = /<t:(\d+):([dDtfFR])>/g
		blog.content = blog.content.replace(timestampRegex, (match, timestamp, format) => {
			const date = new Date(parseInt(timestamp) * 1000)
			switch (format) {
				case 'd':
					return date.toLocaleDateString()
				case 'D':
					return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })
				case 't':
					return date.toLocaleTimeString()
				case 'T':
					return date.toLocaleTimeString(undefined, { hour: 'numeric', minute: 'numeric', second: 'numeric' })
				case 'f':
					return date.toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric' })
				case 'F':
					return date.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' })
				case 'R':
					const past: boolean = date.getTime() < Date.now()
					const diff = date.getTime() - Date.now()
					const seconds = Math.abs(Math.floor(diff / 1000))
					const minutes = Math.abs(Math.floor(seconds / 60))
					const hours = Math.abs(Math.floor(minutes / 60))
					const days = Math.abs(Math.floor(hours / 24))
					const weeks = Math.abs(Math.floor(days / 7))
					const months = Math.abs(Math.floor(weeks / 4))
					const years = Math.abs(Math.floor(months / 12))
					if (years > 0 && past) return `${years} year${years > 1 ? 's' : ''} ago`
					if (years > 0) return `in ${years} year${years > 1 ? 's' : ''}`
					if (months > 0 && past) return `${months} month${months > 1 ? 's' : ''} ago`
					if (months > 0) return `in ${months} month${months > 1 ? 's' : ''}`
					if (weeks > 0 && past) return `${weeks} week${weeks > 1 ? 's' : ''} ago`
					if (weeks > 0) return `in ${weeks} week${weeks > 1 ? 's' : ''}`
					if (days > 0 && past) return `${days} day${days > 1 ? 's' : ''} ago`
					if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`
					if (hours > 0 && past) return `${hours} hour${hours > 1 ? 's' : ''} ago`
					if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`
					if (minutes > 0 && past) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
					if (minutes > 0) return `in ${minutes} minute${minutes > 1 ? 's' : ''}`
					if (seconds > 0 && past) return `${seconds} second${seconds > 1 ? 's' : ''} ago`
					if (seconds > 0) return `in ${seconds} second${seconds > 1 ? 's' : ''}`
					return 'now'
				default:
					return date.toString()
			}
		})

		setBlog(blog)
		setBlogID(blog.id)
		navigate(`/blog/${blog.id}`)
		setIsPrevious(hasPrevious)
		setIsNext(hasNext)
		forceUpdate()
	}

	useEffect(() => {
		GetBlog()
	}, [])

	if (!blog) return <Box>Loading...</Box>

	return (
		<Box pb={2}>
			<Box pb={2}>
				<Link to={'/blog'}>
					<Box
						display='flex'
						alignItems='center'
					>
						<ArrowBack
							sx={{
								color: 'white',
							}}
						/>
						<Typography
							variant='body1'
							sx={{
								textDecoration: 'underline',
							}}
						>
							Back to Announcements
						</Typography>
					</Box>
				</Link>
			</Box>
			{/* Content */}
			<Box
				sx={{
					backgroundColor: (theme) => theme.palette.background.paper,
					borderRadius: 8,
					p: 10,
				}}
			>
				{/* Tags */}
				<Box
					display='flex'
					justifyContent='space-between'
					mb={2}
				>
					<Box
						display={'flex'}
						flexDirection={'row'}
						gap={1}
					>
						<Typography
							sx={{
								textDecoration: 'italic',
							}}
						>
							{new Date(blog?.createdAt).toLocaleDateString()}
						</Typography>
						<Typography>- {blog?.Categories?.map((category) => category.name).join(', ')}</Typography>
						{blog?.ProjectTag && (
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
					</Box>
					<Typography>Author: {blog?.Author.User.username}</Typography>
				</Box>

				{/* Picture */}
				{blog?.Image && (
					<Box py={4}>
						<Box
							component='img'
							src={blog.Image.path}
							alt={blog.title}
							sx={{
								width: '100%',
								aspectRatio: '3 / 1',
								objectFit: 'cover',
								borderRadius: 8,
							}}
						/>
					</Box>
				)}

				{/* Title */}
				<Typography
					variant='h1'
					sx={{
						textDecoration: 'underline',
					}}
				>
					{blog?.title}
				</Typography>
				{/* Content */}
				<Box
					color='white'
					fontFamily='Atkinson Hyperlegible'
				>
					<Markdown
						remarkPlugins={[remarkGfm]}
						children={blog?.content}
						components={{
							h1: ({ children }) => (
								<Typography
									variant='h1'
									py={4}
								>
									{children}
								</Typography>
							),
							h2: ({ children }) => (
								<Typography
									variant='h2'
									py={2}
								>
									{children}
								</Typography>
							),
							h3: ({ children }) => (
								<Typography
									variant='h3'
									py={1}
								>
									{children}
								</Typography>
							),
							h4: ({ children }) => (
								<Typography
									variant='h4'
									py={1}
								>
									{children}
								</Typography>
							),
							h5: ({ children }) => (
								<Typography
									variant='h5'
									py={1}
								>
									{children}
								</Typography>
							),
							h6: ({ children }) => (
								<Typography
									variant='h6'
									py={1}
								>
									{children}
								</Typography>
							),
							p: ({ children }) => (
								<Typography
									variant='body1'
									py={1}
									// allow new lines
									whiteSpace='pre-wrap'
								>
									{children}
								</Typography>
							),
							ul: ({ children }) => <Box component='ul'>{children}</Box>,
							li: ({ children }) => <Box component='li'>{children}</Box>,
							img: ({ src, alt }) => (
								<Box
									component='img'
									src={src}
									alt={alt}
								/>
							),
							a: ({ children, href }) => (
								<Box
									component='a'
									sx={{
										color: 'white',
										textDecoration: 'underline',
									}}
									href={href}
									target='_blank'
								>
									{children}
								</Box>
							),
						}}
					/>
				</Box>
			</Box>
			<Box
				display='flex'
				justifyContent='space-between'
				mt={2}
			>
				<Button
					variant='contained'
					disabled={!isPrevious}
					onClick={handlePrevious}
					sx={{
						display: 'flex',
						gap: 1,
					}}
				>
					<ArrowBack />
					Previous Article
				</Button>
				<Button
					variant='contained'
					disabled={!isNext}
					onClick={handleNext}
					sx={{
						display: 'flex',
						gap: 1,
					}}
				>
					Next Article
					<ArrowForward />
				</Button>
			</Box>
		</Box>
	)
}
