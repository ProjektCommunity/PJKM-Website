import { Box, SxProps, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import GroupPic from '@/assets/photos/Home/group.png'

export default (props: { sx: SxProps }) => {
	return (
		<Box
			p={4}
			sx={{ ...props.sx }}
		>
			<Typography
				variant='h2'
				fontFamily={'Norwester'}
				align='center'
				mb={5}
			>
				Who Are We
			</Typography>
			<Grid
				container
				alignItems='center'
				sx={{
					flexGrow: 1,
					minHeight: '12em',
				}}
			>
				<Grid
					xl={6}
					lg={12}
					p={4}
				>
					<Box
						component='img'
						src={GroupPic}
						maxHeight='100%'
						maxWidth={'100%'}
					/>
				</Grid>
				<Grid
					xl={6}
					lg={12}
					sx={{ p: 4 }}
					display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems={'center'}
				>
					<Typography
						variant={'body2'}
						fontFamily='NerdFont'
						align='center'
						fontWeight='bold'
						fontSize={{
							xs: '.8rem',
							sm: '1.25rem',
							md: '2rem',
							lg: '2.25rem',
							xl: '1.5rem',
						}}
						sx={{ mb: 4 }}
					>
						Projekt: Community (PJKT:COM) is a virtual events
						organization focused on celebrating the power and
						creativity of the VR space. From Roleplay groups to
						Music Festivals, Language Exchanges to Film Festivals,
						Creators and Artists big and small, all are welcome. Our
						mission is to bring together all aspects of the
						community, no matter if you are a lone artist, or a
						massive group, to celebrate the unique culture of VR.
					</Typography>
					<Typography
						variant={'body2'}
						fontFamily='NerdFont'
						align='center'
						fontWeight='bold'
						fontSize={{
							xs: '.8rem',
							sm: '1.25rem',
							md: '2rem',
							lg: '2.25rem',
							xl: '1.5rem',
						}}
						sx={{ mb: 4 }}
					>
						Throughout the year, we hold many events focused on
						different creative endeavors within the VR space, all
						culminating in our yearly community festival!
					</Typography>
					<Typography
						variant={'body2'}
						fontFamily='NerdFont'
						align='center'
						fontWeight='bold'
						fontSize={{
							xs: '.8rem',
							sm: '1.25rem',
							md: '2rem',
							lg: '2.25rem',
							xl: '1.5rem',
						}}
					>
						VR is what it is today because of the community. No
						matter if you are a veteran, or just put on a headset
						for the first time today, together we all make this
						space special.
					</Typography>
				</Grid>
			</Grid>
		</Box>
	)
}
