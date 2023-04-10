import {TbCircleArrowLeft} from "react-icons/tb";
import { Box, Button, Container, SvgIcon, Typography } from '@mui/material';
import progress from './../../../assets/image/placeholder/progress.png';
import { useNavigate } from 'react-router-dom';

export const AccountPending = () => (
  <>
    <Box
      component="main"
      sx={{
        alignItems: 'center',
        display: 'flex',
        flexGrow: 1,
        minHeight: '100%'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              mb: 3,
              textAlign: 'center'
            }}
          >
            <img
              alt="Account Pending"
              src = {progress}
              style={{
                display: 'inline-block',
                maxWidth: '100%',
                width: 400
              }}
            />
          </Box>
          <Typography
            align="center"
            sx={{ mb: 3 }}
            variant="h3"
          >
            Account Pending 
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            variant="body1"
          >
            Thank you for registering. Please wait for the administrator to approve your account.
          </Typography>
          <Button
            onClick={
                useNavigate('/auth/login')
            }
            href="/auth/login"
            startIcon={(
              <SvgIcon fontSize="small">
                <TbCircleArrowLeft />
              </SvgIcon>
            )}
            sx={{ mt: 3 }}
            variant="contained"
          >
            Go back to login
          </Button>
        </Box>
      </Container>
    </Box>
  </>
);

