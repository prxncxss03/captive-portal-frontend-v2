
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';


export const OverviewUser = ({
  title,
  value,
  icon,
}) => {

  
    return(
        <Card >
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
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
              backgroundColor: 'primary.main',
              height: 56,
              width: 56
            }}
          >
            <SvgIcon>
                {icon}
            </SvgIcon>
          </Avatar>
        </Stack>
      </CardContent>
    </Card>
    )

        }