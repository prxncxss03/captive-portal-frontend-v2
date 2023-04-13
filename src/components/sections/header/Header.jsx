import { Box, Typography } from "@mui/material"

export const Header = () => {
    return(
        <Box sx={{backgroundColor: 'orange', position: 'absolute', top: '0px' ,right: 0, }}>
            <Typography variant="h1">Header</Typography>
        </Box>
    )

    }