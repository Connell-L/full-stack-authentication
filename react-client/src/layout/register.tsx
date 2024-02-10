import React from 'react';
import { labels } from '../labels/labels';
import { SignUpForm } from '../components/signUpForm';
import { Formik } from 'formik';
import { RedirectText } from '../components/redirectText';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FormCard } from '../components/formCard';

const prefix = 'Register';

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
    name: '',
    email: '',
    password: ''
};

const FormikSignUpForm = () => {
    return (
        <>
            <Formik
                initialValues={initialValues}
                onSubmit={values => {
                    console.log(values);
                }}
            >
                {() => <SignUpForm />}
            </Formik>
            <RedirectText
                text={labels.signUp.redirectText}
                buttonText={labels.signUp.buttons.loginHere}
                onClick={() => {
                    console.log('Redirect to sign in');
                }}
            />
        </>
    );
};

const RegisterView = () => {
    return (
        <StyledContainer className={classes.container}>
            <Grid container mt={10} component="div" className={classes.container}>
                <FormCard title={labels.login.title}>
                    <FormikSignUpForm />
                </FormCard>
            </Grid>
        </StyledContainer>
    );
};

export default RegisterView;
