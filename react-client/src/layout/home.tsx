import { AuthContext } from '../context/authContext';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RedirectText } from '../components/redirectText';
import { labels } from '../labels/labels';

const prefix = 'Home';

const HomeView = () => {
    let navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleRedirectToLogin = () => {
        navigate('/login');
    };

    console.log(user);

    return (
        <>
            <h1>This is the homepage!</h1>
            {user ? (
                <RedirectText
                    text={labels.logout.redirectText}
                    buttonText={labels.logout.buttons.logout}
                    onClick={handleLogout}
                />
            ) : (
                <RedirectText
                    text={labels.signUp.redirectText}
                    buttonText={labels.signUp.buttons.loginHere}
                    onClick={handleRedirectToLogin}
                />
            )}
        </>
    );
};

export default HomeView;
