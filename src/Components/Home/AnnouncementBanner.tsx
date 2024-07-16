import { ArrowForward } from '@mui/icons-material'
import { Box, Typography, SxProps, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AnnouncementBanner(props: { sx: SxProps }) {
	const [announcement, setAnnouncement] = useState<{
		title: string
		id: number
	} | null>(null)

	const theme = useTheme()
	const navigate = useNavigate()

	// Fetch latest announcement
	async function FetchLatest() {
		// Fake Fetch
		return new Promise((resolve) => {
			// wait 1 second
			setTimeout(() => {
				resolve({
					title: 'Latest Announcement Title Would Go Right Up Here',
					id: 1,
				})
			}, 1000)
		}) as Promise<{
			title: string
			id: number
		}>
	}

	useEffect(() => {
		FetchLatest().then((data) => {
			setAnnouncement(data)
		})
	}, [announcement])

	return (
		<Box
			sx={{
				backgroundColor: theme.palette.tertiary.main,
			}}
		>
			{announcement && (
				<Box
					sx={{
						...props.sx,
						display: 'flex',
						justifyContent: 'space-between',
					}}
				>
					<Typography
						// Ellipsis
						sx={{
							overflow: 'hidden',
							textOverflow: 'ellipsis',
							whiteSpace: 'nowrap',
							maxWidth: '50%',
						}}
					>
						{announcement.title}
					</Typography>
					<Box
						display='flex'
						alignItems='center'
						onClick={() => {
							navigate('/blog/post/' + announcement.id)
						}}
						sx={{
							cursor: 'pointer',
							color: theme.palette.accentDark.contrastText,
							'&:hover': {
								color: theme.palette.primary.light,
							},
						}}
					>
						<Typography
							sx={{
								color: theme.palette.accentDark.contrastText,
								'&:hover': {
									color: theme.palette.primary.light,
								},
							}}
						>
							Learn More
						</Typography>
						<ArrowForward />
					</Box>
				</Box>
			)}
		</Box>
	)
}
