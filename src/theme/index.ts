import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    typography: {
        fontFamily: "Space Grotesk",
    },
    palette: {
        primary: {
            main: '#F6B24F',
            light: '#ffe47f',
            dark:'#bf831e'
        },
        grey: {
            50: '#eeeeee',
            100: '#d9d9d9',
            200: '#c4c4c4',
            300: '#b3b3b3',
            400: '#acacac',
            500: '#999999',
            600: '#808080',
            700: '#666666',
            800: '#272727',
            900: '#0d0d0d',
            A100: '#939393',
            A200: '#1F1F1F',
        },
        background: {
            default: '#08121C',
        },
        success: {
            main: '#C8DD7E',
        },
        info: {
            main: '#1890FF',
        },
        error: {
            main: '#FF6E70',
        }
    },
});

export type CustomizedTheme = typeof theme;

declare module '@emotion/react' {
    export interface Theme extends CustomizedTheme { }
}
