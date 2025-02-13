import { Box, SxProps, Theme, Typography, useTheme } from '@mui/material'
import React from 'react'
import * as Components from '@/Components'
import './HomeStyles.css'
import { BoxOwnProps } from '@mui/system'
import { BoxProps } from '@/Components/Home'

class Hero extends React.Component<
	{},
	{
		height?: number
	}
> {
	HeroElement: React.RefObject<HTMLDivElement>
	constructor(props: {}) {
		super(props)
		this.HeroElement = React.createRef()
		this.state = {
			height: undefined,
		}
	}

	componentDidMount() {
		this.setState({
			height: this.HeroElement.current?.clientHeight,
		})
		// Listen for reseize
		window.addEventListener('resize', () => {
			this.setState({
				height: this.HeroElement.current?.clientHeight,
			})
			return () => window.removeEventListener('resize', () => {})
		})
	}

	render() {
		return (
			<Box height={this.state.height || undefined}>
				<Box
					sx={{
						position: 'absolute',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
					}}
				>
					<Box ref={this.HeroElement}>
						<Components.Home.Hero />
					</Box>
				</Box>
			</Box>
		)
	}
}

class Component extends React.Component<{
	Element: (props?: BoxProps) => JSX.Element
	index: number
}> {
	ElementRef: React.RefObject<HTMLDivElement>
	height?: number
	constructor(props: {
		Element: (props?: BoxProps) => JSX.Element
		index: number
	}) {
		super(props)
		this.ElementRef = React.createRef()
	}

	render() {
		const { Element, index } = this.props
		const padding = 4
		if (index % 2 !== 0)
			return (
				<>
					<Box ref={this.ElementRef}>
						<Element py={padding} />
					</Box>
					<Box
						sx={{
							position: 'absolute',
							top: 0,
							left: '50%',
							transform: 'translate(-50%, 0)',
							height: '100%',
							width: '100vw',
							zIndex: -1,
							backgroundColor: (theme: Theme) =>
								theme.palette.background.paper,
						}}
					/>
				</>
			)
		else return <Element py={padding} />
	}
}

function Home() {
	const components: ((props?: BoxProps) => JSX.Element)[] = [
		Components.Home.AnnouncementBanner,
		Components.Home.Events,
		Components.Home.AboutUs,
		Components.Home.Join,
		Components.Home.Latest,
	]

	return (
		<>
			<Hero />
			{components.map((Element, index) => (
				<Box
					key={index}
					display='flex'
					flexDirection='column'
					justifyContent='space-between'
					position='relative'
				>
					<Component
						Element={Element}
						index={index}
					/>
				</Box>
			))}
		</>
	)
}

export default Home
