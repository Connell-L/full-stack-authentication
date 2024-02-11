import React, { useContext, useState } from 'react';
import { labels } from '../labels/labels';
import { LoginForm } from '../components/loginForm';
import { Formik } from 'formik';
import { RedirectText } from '../components/redirectText';
import { FormCard } from '../components/formCard';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { LOGIN_USER } from '../gql/users';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router';
import { AuthContext } from '../context/authContext';
import { Loading } from '../components/loading';

const prefix = 'Login';

const classes = {
    container: `${prefix}-container`
};

const StyledContainer = styled('div')(({ theme }) => ({
    [`.${classes.container}`]: {
        padding: theme.spacing(2, 2),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

const initialValues = {
    email: '',
    password: ''
};

interface ErrorState {
    message: string;
}

const LoginView = () => {
    let navigate = useNavigate();
    const context = useContext(AuthContext);
    const [errors, setErrors] = useState<ErrorState[]>([]);

    const handleRedirectToSignUp = () => {
        navigate('/register');
    };

    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        update(_, { data: { loginUser: userData } }) {
            context.login(userData);
            console.log(loginUser);
            navigate('/');
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors.map(({ message }) => ({ message })));
        }
    });

    const handleSubmit = async (values: typeof initialValues) => {
        await loginUser({ variables: values });
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <StyledContainer className={classes.container}>
                    <Grid container mt={10} component="div" className={classes.container}>
                        <FormCard title={labels.login.title}>
                            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                                {() => <LoginForm />}
                            </Formik>
                            <RedirectText
                                text={labels.login.redirectText}
                                buttonText={labels.login.buttons.signUpHere}
                                onClick={handleRedirectToSignUp}
                            />
                        </FormCard>
                    </Grid>
                </StyledContainer>
            )}
        </>
    );
};

export default LoginView;
