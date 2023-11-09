import { createSlice } from "@reduxjs/toolkit";

const darkThemeMq = !window.matchMedia('prefers-color-scheme: dark').matches
export const themeSlice = createSlice({
	name: 'theme',
	initialState: {
		darkTheme: darkThemeMq
	},
	reducers: {
		toggleTheme: (state) => {
			state.darkTheme = !state.darkTheme
		}
	}

})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer