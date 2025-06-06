import { Search } from '@mui/icons-material'
import { Box, Typography, useTheme, TextField, Button, styled, TextFieldProps, IconButton, Grid2 } from '@mui/material'
import GerzyJames from '@/assets/photos/Home/Gerzy_and_Jamez.png'
import { BoxProps } from '.'

export default function Latest(props?: BoxProps) {
const theme = useTheme()

	return (
		<Box {...props}>
			<Grid2
				container
				columnSpacing={{ xs: 0, md: 4 }}
				rowSpacing={{ xs: 4, md: 0 }}
			>
				<Grid2
					size={{ xs: 12, md: 6 }}
					sx={{
						display: 'flex',
						flexDirection: 'column',
					}}
				>
<Typography
variant='h2'
textAlign='center'
sx={{
textDecoration: 'underline',
}}
>
COMING SOON
</Typography>
<Box
sx={{
display: 'flex',
flexDirection: 'column',
gap: 2,
justifyContent: 'center',
alignItems: 'center',
height: '200px',
backgroundColor: theme.palette.accentDark.main,
borderRadius: 2,
}}
>
<Typography
variant='h4'
color={theme.palette.accentDark.contrastText}
textAlign='center'
>
Blog Feature
</Typography>
<Typography
variant='body1'
color={theme.palette.accentDark.contrastText}
textAlign='center'
>
This section is currently under development
</Typography>
</Box>
				</Grid2>
				<Grid2
					size={{ xs: 12, md: 6 }}
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					sx={{
						gap: 4,
					}}
				>
					<Box
						sx={{
							position: 'relative',
							height: '120px',
							flexGrow: 1,
							borderRadius: 5,
							overflow: 'hidden',
							cursor: 'pointer',
						}}
						onClick={() => {
							window.open('https://shop.projektcommunity.com/')
						}}
					>
						<Box
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								background: 'linear-gradient(90deg, rgba(0,176,254,1) 0%, rgba(255,228,0,1) 100%)',
							}}
						/>

						<Box
							sx={{
								position: 'absolute',
								top: 0,
								left: 0,
								width: '100%',
								height: '100%',
								backgroundImage: `url(${GerzyJames})`,
								backgroundSize: '80%',
								backgroundPosition: '-160px -20px',
								backgroundRepeat: 'no-repeat',
							}}
						/>
						<Typography
							textAlign='right'
							variant='h2'
							color={theme.palette.accentLight.contrastText}
							sx={{
								position: 'relative',
								zIndex: 1,
								height: '100%',
								pr: 4,
								fontWeight: 'bold',
								// center vertically
								display: 'flex',
								justifyContent: 'flex-end',
								alignItems: 'center',
							}}
						>
							SHOP OUR <br />
							MERCH
						</Typography>
					</Box>
{/* Group search removed */}
				</Grid2>
			</Grid2>
		</Box>
	)
}

const CustomTextField = styled((props: TextFieldProps) => (
	<TextField
		slotProps={{
			input: {
				disableUnderline: true,
			},
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiOutlinedInput-root': {
		backgroundColor: theme.palette.accentLight.main,
		color: theme.palette.accentLight.contrastText,
		WebkitTextFillColor: theme.palette.accentLight.contrastText,
		borderRadius: 25,
	},
	// Label
	'& .MuiInputLabel-root': {
		color: theme.palette.accentLight.contrastText,
	},
	// .MuiSvgIcon-root
	'& .MuiSvgIcon-root': {
		color: theme.palette.accentLight.contrastText,
	},
}))
