import { Box, Button, Divider, Paper, Theme, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import photos from '../../assets/photos/slider.json'
import PJKTLarge from '../../assets/PJKT-01.png'
import { useTheme } from '@mui/material'
import HeroImage from '@/assets/photos/Home/Hero 2.png'
import { Link } from 'react-router-dom'

export default function Hero(props: { children?: () => JSX.Element }) {
	const { children: Children } = props

	const isElementXPercentInViewport = function (
		el: HTMLElement,
		percentVisible: number
	) {
		let rect = el.getBoundingClientRect(),
			windowHeight =
				window.innerHeight || document.documentElement.clientHeight

		return !(
			Math.floor(
				100 - ((rect.top >= 0 ? 0 : rect.top) / +-rect.height) * 100
			) < percentVisible ||
			Math.floor(
				100 - ((rect.bottom - windowHeight) / rect.height) * 100
			) < percentVisible
		)
	}

	const parallax = () => {
		const hero = document.querySelector('.hero') as HTMLElement
		window.addEventListener('scroll', () => {
			if (isElementXPercentInViewport(hero, 1)) {
				const scrollPercentage =
					(window.scrollY / window.innerHeight) * 100
				const newHeight = 100 - scrollPercentage
				const clampedHeight = Math.max(0, Math.min(100, newHeight))
				// console.log(clampedHeight)
				hero.style.height = `${clampedHeight}vh`
			} else {
				hero.style.height = `50vh`
			}
		})
	}
	useEffect(() => {
		setTimeout(() => {
			parallax()
		}, 1000)
	})

	return (
		<>
			<Box className='hero'>
				<Box // Hero Text
					sx={{
						height: '100%',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Box
						component='img'
						src={PJKTLarge}
						width='80%'
						maxWidth={'40em'}
					/>
					<Box
						component='a'
						href='https://discord.gg/PJKT'
						target='_blank'
					>
						<Button variant='contained' color='warning'>
							<Typography variant='h3' fontFamily='Nerdfont'>Join the Crew</Typography>
						</Button>
					</Box>
				</Box>
			</Box>
			<Box className='section 1'>{Children && <Children />}</Box>
		</>
	)
}
