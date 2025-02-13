import { ArrowForward } from '@mui/icons-material'
import { Box, Typography, SxProps, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BoxProps } from '.'
import * as API from '@/utils/API'

export default function AnnouncementBanner(props?: BoxProps) {
	const [announcement, setAnnouncement] = useState<{
		title: string
		id: number
	} | null>(null)

	const theme = useTheme()
	const navigate = useNavigate()

	// Fetch latest announcement
	async function FetchLatest() {
		// Fake Fetch
		return await API.getBlog(true).catch(() => {
			return null
		})
		// return new Promise((resolve) => {
		// 	// wait 1 second
		// 	setTimeout(() => {
		// 		resolve({
		// 			title: 'Latest Announcement Title Would Go Right Up Here',
		// 			id: 1,
		// 		})
		// 	}, 1000)
		// }) as Promise<{
		// 	title: string
		// 	id: number
		// }>
	}

	useEffect(() => {
		FetchLatest().then((data) => {
			if (data) setAnnouncement(data.blog)
		})
	}, [])

	if (announcement)
		return (
			<Box
				sx={{ position: 'relative' }}
				{...props}
			>
				{announcement !== null && (
					<>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
							}}
						>
							<Typography
								variant='h5'
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
									navigate(`/blog/${announcement.id}`)
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
						<Box
							position='absolute'
							sx={{
								backgroundColor: theme.palette.tertiary.main,
								width: '100vw',
								height: '100%',
								position: 'absolute',
								left: '50%',
								top: 0,
								transform: 'translate(-50%, 0)',
								zIndex: -1,
							}}
						/>
					</>
				)}
			</Box>
		)

	return <></>
}
