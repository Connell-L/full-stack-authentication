import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes/app';
import { theme } from './styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <ThemeProvider theme={theme}>
                <CssBaseline>
                    <>
                        <AppRoutes />
                    </>
                </CssBaseline>
            </ThemeProvider>
        </BrowserRouter>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
} else {
    // eslint-disable-next-line no-console
    console.error('Root element not found');
}
