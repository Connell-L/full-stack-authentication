import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginView from '../layout/login';
import RegisterView from '../layout/register';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
            <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
    );
};

export default AppRoutes;
