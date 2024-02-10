import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

export const RedirectText = ({
    text,
    buttonText,
    onClick
}: {
    text: string;
    buttonText: string;
    onClick: () => void;
}) => {
    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ marginTop: 8, marginBottom: 8 }}
        >
            <Grid item>
                <Typography variant="body1">{text}</Typography>
            </Grid>
            <Grid item>
                <Button onClick={onClick} variant="text">
                    {buttonText}
                </Button>
            </Grid>
        </Grid>
    );
};
