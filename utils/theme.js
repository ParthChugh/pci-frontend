const { createTheme } = require("@mui/material");

const theme = createTheme({
	palette: {
		primary: {
			// main_900: '#620F0F',
			// main_800: "#8D1717",
			// main_700: "#B91E1E",
			// main_600: "#E52525",
			main: "#E52525",
			// main_400: "#EF7C7C",
			// main_300: "#F5A8A8",
			// main_200: "#F7BEBE",
			// main_100: "#FAD3D3",
		},
		secondary: {
			// main_900: '#665300',
			// main_800: "#997C00",
			// main_700: "#CCA600",
			main_600: "#FFCF00",
			main: "#FFD933",
			// main_400: "#FFE266",
			// main_300: "#FFEC99",
			// main_200: "#FFF1B2",
			// main_100: "#EBFCD0",
		},
		neutralLight: {
			// main_900: '#CED1D9',
			// main_800: "#FCFDFE",
			main_700: "#F9FBFD",
			main_600: "#F6F8FC",
			main: "#F3F6FB",
			// main_400: "#ECF2F8",
			// main_300: "#E6EDF6",
			// main_200: "#BCCBDD",
			// main_100: "#98ADC5",
		},
		neutralDark: {
			// main_900: '#1C295D',
			// main_800: "#1C295D",
			// main_700: "#0F1632",
			main_600: "#010206",
			main: "#010205",
			// main_400: "#010104",
			// main_300: "#000102",
			// main_200: "#000001",
			// main_100: "#000000",
		},
		placeholder: "#F6F8FC",
		darkPlaceholder: "#cacbcc",
		text: {
			primary: '#010206',
		}
	},
	shape: {
		borderRadius: 15,
	},
	components: {
		// Name of the component ⚛️
		typography: {
			fontFamily: 'Montserrat',
		},

		MuiButtonBase: {
			defaultProps: {
				// The props to apply
				disableRipple: true, // No more ripple, on the whole application 💣!
			},
			styleOverrides: {
				root: {
					minHeight: 50,
				}
			}
		},
		MuiButton: { 
      styleOverrides: { 
        root: { minWidth: 100 } 
      } 
    },
		// MuiInputBase: {
		// 	styleOverrides: {
		// 		focused: {
		// 			backgroundColor: "#cacbcc"
		// 		}
		// 	}
		// },
		MuiAppBar: {
			styleOverrides: {
				colorPrimary: {
					backgroundColor: "transparent",
					color: "black"
				},
			}
		}
		// MuiContainer: {
		//   styleOverrides: {
		//     maxWidthXs: {
		//       maxWidth: '15%'
		//     }
		//   }
		// }
	},
});

export {
	theme
};