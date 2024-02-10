import React from 'react';
import { createRoot } from 'react-dom/client';
import { Welcome } from './layout/Welcome';

const App = () => {
    return <Welcome />;
};

const rootElement = document.getElementById('root');
if (rootElement) {
    createRoot(rootElement).render(<App />);
} else {
    // eslint-disable-next-line no-console
    console.error('Root element not found');
}
