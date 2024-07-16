import { Box, Button } from '@mui/material'
import PJKTLarge from '../../assets/PJKT-01.png'
import HeroImg from '@/assets/TransparencyGrid.svg'

export default function Hero() {
	return (
		<>
			<Box
				className='hero'
				position='relative'
				sx={{
					backgroundImage: `url(${HeroImg})`,
					backgroundSize: 'fill',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					px: { lg: 55, md: 50, },
					py: 10,
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 'auto',
					height: '100%',
				}}
			>
				<Box
					position='absolute'
					top={0}
					left={0}
					width='100%'
					height='100%'
					sx={{
						opacity: 0.75,
						background:
							'linear-gradient(45deg, rgba(164,0,255,1) 0%, rgba(0,198,255,1) 100%)',
					}}
				/>
				<Box
					zIndex={1}
					width='100%'
					height='260px'
					maxWidth='348px'
					sx={{
						backgroundImage: `url(${PJKTLarge})`,
						backgroundSize: 'contain',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center',
						filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
					}}
				/>
				<Button
					variant='contained'
					onClick={({ currentTarget: { disabled } }) => {
						if (!disabled) {
							window.open('https://discord.gg/PJKT')
						}
					}}
					sx={{
						filter: 'drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))',
					}}
				>
					Join the Crew
				</Button>
			</Box>
		</>
	)
}
