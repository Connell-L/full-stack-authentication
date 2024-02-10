import React from 'react';
import { labels } from '../labels/labels';
import { LoginForm } from '../components/loginForm';
import { Formik } from 'formik';
import { RedirectText } from '../components/redirectText';
import { FormCard } from '../components/formCard';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

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

const FormikLoginForm = () => {
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {() => <LoginForm />}
            </Formik>
            <RedirectText
                text={labels.login.redirectText}
                buttonText={labels.login.buttons.signUpHere}
                onClick={() => {
                    console.log('Redirect to sign up');
                }}
            />
        </>
    );
};

const LoginView = () => {
    return (
        <StyledContainer className={classes.container}>
            <Grid container mt={10} component="div" className={classes.container}>
                <FormCard title={labels.login.title}>
                    <FormikLoginForm />
                </FormCard>
            </Grid>
        </StyledContainer>
    );
};

export default LoginView;
