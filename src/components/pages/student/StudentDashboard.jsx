import { Box,Container,Typography } from "@mui/material"
import { Announcement } from "../Announcement"
import ReactPlayer from "react-player"
import { YtVid } from "../../sections/YtVid"
export const StudentDashboard = () => {
    return(
        <Container>
            <Announcement/>
            <Box >
                <Typography variant="h6">Related Videos: </Typography>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '100%',
                    

                }}>
                
    
                    <YtVid id="_EjOK8lFvag"/>
                    <YtVid id="dKNHjVasSUg"/>
                    <YtVid id="oZr9L7ou0Kw"/>
              
           
                </Box>
            </Box>
        </Container>
    )
}