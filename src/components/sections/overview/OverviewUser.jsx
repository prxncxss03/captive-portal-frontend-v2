
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';


export const OverviewUser = ({
  title,
  value,
  icon,
}) => {

    
    return(
      <Card sx={{
        maxWidth: 350,
        margin: 2,
        userSelect: 'none',

        '@media (max-width: 400px)': {
              margin: '0 -15px 15px -10px',
              padding: 0,
            }
        
      }}>
      <CardContent >
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
          sx={{
            '@media (max-width: 600px)': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              margin: '0 0 0 0',
              padding: 0,
            }

          }}
        >
          <Stack spacing={1}
          sx={{
            '@media (max-width: 600px)': {
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
              margin: '0 -5 0 0',
              padding: 0,
            }

          }}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: 
                title === 'Total Students' ? 'primary.main' : title === 'Total Faculty' ? 'info.main' : title === 'Total Pending Accounts' ? 'warning.main' : 'error.main'
              ,
              height: 56,
              width: 56,
              '@media (max-width: 600px)': {
                display: 'none',
              },
            }}
          >
            <SvgIcon sx={{
              //media query
              '@media (max-width: 400px)': {
                display: 'none',
              },
      
            }}>
                {icon}
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
    )

        }