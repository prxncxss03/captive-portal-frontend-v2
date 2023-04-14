import { Box } from "@mui/material";
export const YtVid = (props) => {
    const {id} = props;
    return(
        <Box  sx={{

            margin: '10px 5px 10px 5px',

        }}>
            <iframe width="250" height="150" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </Box>
    )
}