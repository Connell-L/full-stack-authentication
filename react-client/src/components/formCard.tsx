import React from 'react';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';

const StyledCard = styled(Card)(({ theme }) => ({
    marginBottom: theme.spacing(3),
    boxShadow: theme.shadows[5],
    [theme.breakpoints.up('sm')]: {
        minWidth: 300
    },
    [theme.breakpoints.up('md')]: {
        minWidth: 400
    },
    [theme.breakpoints.up('lg')]: {
        minWidth: 500
    },
    '& .MuiCardHeader-root': {
        textAlign: 'center'
    },
    '& .MuiCardContent-root': {
        display: 'flex',
        flexDirection: 'column'
    },
    '& .MuiCardActions-root': {
        justifyContent: 'center'
    }
}));

export const FormCard = ({ children, title }: { children: React.ReactNode; title: string }) => {
    return (
        <StyledCard>
            <CardHeader title={title} />
            <CardContent>{children}</CardContent>
        </StyledCard>
    );
};
