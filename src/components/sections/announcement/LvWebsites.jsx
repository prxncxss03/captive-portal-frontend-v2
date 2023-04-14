import { Container, Typography } from "@mui/material"

export const LvWebsite = () => {
    return (
        <Container 
        sx={{
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            padding: '1rem',
            margin: '1rem',
            borderRadius: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            '@media (max-width: 600px)': {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                margin: '0 0 0 0',
                padding: 0,
            }
        }}>
            <Typography variant="h4">La Verdad Links</Typography>
            
        </Container>
    )
}