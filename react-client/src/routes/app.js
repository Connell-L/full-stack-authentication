import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import LoginView from '../layout/login';
import RegisterView from '../layout/register';
import HomeView from '../layout/home';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/login" element={<LoginView />} />
            <Route path="/register" element={<RegisterView />} />
        </Routes>
    );
};

export default AppRoutes;
