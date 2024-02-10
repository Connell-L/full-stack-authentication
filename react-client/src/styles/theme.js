import { createTheme } from '@mui/material';

export const theme = createTheme({
    palette: {
        primary: {
            main: '#114B5F',
            dark: '#333333',
            light: '#456990'
        },
        secondary: {
            main: '#F45B69',
            light: '#E4FDE1',
            dark: '#6B2737'
        },
        text: {
            primary: '#333333',
            secondary: '#456990',
            light: '#E4FDE1'
        },
        error: {
            main: '#FF0000'
        },
        warning: {
            main: '#FFC107'
        },
        info: {
            main: '#2196F3'
        },
        success: {
            main: '#4CAF50'
        }
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 376,
            md: 577,
            lg: 769,
            xl: 1281
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    height: 32,
                    fontWeight: 600
                },
                contained: {
                    color: '#E4FDE1',
                    backgroundColor: '#F45B69',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: '#6B2737'
                    },
                    padding: '8px 16px'
                },
                text: {
                    color: '#456990',
                    boxShadow: 'none',
                    '&:hover': {
                        color: '#114B5F'
                    }
                }
            }
        }
    }
});
