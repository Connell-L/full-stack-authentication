import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRoutes from './routes/app';
import { theme } from './styles/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import client from '../apolloClient';
import { ApolloProvider } from '@apollo/client';
import { AuthProvider } from './context/authContext';

// Apollo Client
// Auth context
// BrowserRouter

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline>
                <AppRoutes />
            </CssBaseline>
        </ThemeProvider>
    );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(
        <AuthProvider>
            <ApolloProvider client={client}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ApolloProvider>
        </AuthProvider>
    );
} else {
    // eslint-disable-next-line no-console
    console.error('Root element not found');
}
