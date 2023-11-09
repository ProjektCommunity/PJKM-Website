import { createTheme } from '@mui/material'
import Norwester from '@/assets/Fonts/norwester/norwester.otf'
import NerdFontCondensed from '@/assets/Fonts/3270/3270NerdFont-Condensed.ttf'
import NerdFontRegular from '@/assets/Fonts/3270/3270NerdFont-Regular.ttf'
import NerdFontSemiCondensed from '@/assets/Fonts/3270/3270NerdFont-SemiCondensed.ttf'

export const lightTheme = createTheme({
	palette: {
		mode: 'light',
		primary: {
			light: '#E3F2FD',
			'200': '#90CAF9',
			'300': '#2196F3',
			'400': '#1E88E5',
			'500': '#1565C0',
		},
		secondary: {
			light: '#EDE7F6',
			'200': '#B39DDB',
			main: '#673AB7',
			dark: '#5E35B1',
			'800': '#4527A0',
		},
		success: {
			light: '#B9F6CA',
			'200': '#69F0AE',
			main: '#69F0AE',
			dark: '#00C853',
		},
		error: {
			light: '#EF9A9A',
			main: '#F44336',
			dark: '#C62828',
		},
		warning: {
			light: '#B9F6CA',
			main: '#FFE57F',
			dark: '#FFC107',
		},
		grey: {
			'50': '#FAFAFA',
			'100': '#F5F5F5',
			'200': '#EEEEEE',
			'300': '#E0E0E0',
			'500': '#9E9E9E',
			'600': '#757575',
			'700': '#616161',
			'900': '#212121',
		},

		background: {
			default: 'rgb(255, 255, 255)',
			paper: 'rgb(238, 242, 246)',
		},
	},
})

export const darkTheme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			light: '#EDE7F6',
			'200': '#B39DDB',
			main: '#673AB7',
			dark: '#5E35B1',
			'800': '#4527A0',
		},
		secondary: {
			light: '#E3F2FD',
			'200': '#90CAF9',
			main: '#2196F3',
			dark: '#1E88E5',
			'800': '#1565C0',
		},
		success: {
			light: '#B9F6CA',
			'200': '#69F0AE',
			main: '#69F0AE',
			dark: '#00C853',
		},
		error: {
			light: '#EF9A9A',
			main: '#F44336',
			dark: '#C62828',
		},
		warning: {
			light: '#B9F6CA',
			main: '#FFE57F',
			dark: '#FFC107',
		},
		grey: {
			'50': '#FAFAFA',
			'100': '#F5F5F5',
			'200': '#EEEEEE',
			'300': '#E0E0E0',
			'500': '#9E9E9E',
			'600': '#757575',
			'700': '#616161',
			'900': '#212121',
		},
		background: {
			default: 'rgb(17, 25, 54)',
			paper: 'rgb(26, 34, 63)',
		},
	},
})
