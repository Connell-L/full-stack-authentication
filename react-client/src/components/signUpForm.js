import { Field } from 'formik';
import { TextField } from 'formik-mui';
import { Box, Button, FormControl, FormLabel, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { labels } from '../labels/labels';

const StyledBox = styled(Box)({
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
});

export const SignUpForm = () => {
    return (
        <>
            <StyledBox>
                <Grid container>
                    <Grid container spacing={2} sx={{ width: '100%' }}>
                        <Grid container item>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Field component={TextField} name="name" variant="outlined" />
                            </FormControl>
                        </Grid>
                        <Grid container item>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Field component={TextField} name="email" type="email" variant="outlined" />
                            </FormControl>
                        </Grid>

                        <Grid container item>
                            <FormControl fullWidth>
                                <FormLabel htmlFor="password">Password</FormLabel>
                                <Field component={TextField} name="password" type="password" variant="outlined" />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Button type="submit" variant="contained" color="primary" fullWidth size="large" sx={{ marginTop: 8 }}>
                    {labels.signUp.buttons.signUp}
                </Button>
            </StyledBox>
        </>
    );
};
