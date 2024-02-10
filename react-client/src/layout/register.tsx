import React, { useContext, useState } from 'react';
import { labels } from '../labels/labels';
import { SignUpForm } from '../components/signUpForm';
import { Formik } from 'formik';
import { RedirectText } from '../components/redirectText';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { FormCard } from '../components/formCard';
import { AuthContext } from '../context/authContext';
import { useMutation } from '@apollo/react-hooks';
import { useNavigate } from 'react-router';
import { REGISTER_USER } from '../gql/users';
import { useFormikContext } from 'formik';

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

interface ErrorState {
    message: string;
}

const RegisterView = () => {
    const context = useContext(AuthContext);
    let navigate = useNavigate();
    const [errors, setErrors] = useState<ErrorState[]>([]);
    const { values, resetForm } = useFormikContext();

    const [registerUser, { loading, error }] = useMutation(REGISTER_USER, {
        update(cache, { data: { registerUser: userData } }) {
            context.login(userData);
            console.log(registerUser);
            navigate('/');
            resetForm();
        },
        onError({ graphQLErrors }) {
            setErrors(graphQLErrors.map(({ message }) => ({ message })));
        },
        variables: {
            firstName: (values as { firstName: string }).firstName,
            lastName: (values as { lastName: string }).lastName,
            email: (values as { email: string }).email,
            password: (values as { password: string }).password
        }
    });

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
