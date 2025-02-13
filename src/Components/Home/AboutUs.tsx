import { Box, Typography, Grid2, Grid2Props } from '@mui/material'
import GroupPic from '@/assets/photos/Home/Group.png'
import { BoxProps } from '.'

export default (props?: BoxProps | Grid2Props) => {
	return (
		<Grid2
			{...props as Grid2Props}
			container
			flexDirection='row-reverse'
			justifyContent='center'
			alignItems='center'
			sx={{ display: 'flex', flexDirection: 'row' }}
		>
			<Grid2 size={{ xs: 12, md: 6 }}>
				<Typography
					variant='h2'
					textTransform='uppercase'
					sx={{ fontWeight: 'bold', textDecoration: 'underline' }}
				>
					What is
					<br />
					Projekt: Community?
				</Typography>
				{/* A Body text with the first few words as H4 text and the other as Body1 text */}
				<Typography variant='body1'>
					<Box
						component='span'
						sx={{
							fontSize: (theme) => theme.typography.h3.fontSize,
							fontWeight: 'bold',
							fontFamily: (theme) =>
								theme.typography.h3.fontFamily,
						}}
					>
						Projekt: Community (PJKT:COM)
					</Box>{' '}
					is a virtual events organization focused on celebrating the
					power and creativity of the VR space. From Roleplay groups
					to Music Festivals, Language Exchanges to Film Festivals,
					Creators and Artists big and small, all are welcome. Our
					mission is to bring together all aspects of the community,
					no matter if you are a lone artist, or a massive group, to
					celebrate the unique culture of VR.
				</Typography>
			</Grid2>

			<Grid2 size={{ xs: 12, md: 6 }}>
				<Box
					sx={{
						backgroundImage: `url(${GroupPic})`,
						backgroundSize: 'contain',
						backgroundPosition: 'center',
						backgroundRepeat: 'no-repeat',
						height: '100%',
						width: '100%',
						minHeight: '471px',
					}}
				/>
			</Grid2>
		</Grid2>
	)
}
