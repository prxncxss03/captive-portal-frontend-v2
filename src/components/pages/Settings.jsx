import { useCallback, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { instance } from '../../helper/http';


export const Settings = () => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  let user = JSON.parse(localStorage.getItem('user'));
  console.log(user)
  const [isShowEditPassword, setIsShowEditPassword] = useState(false)
  const [values, setValues] = useState({
    firstName: user.first_name ? user.first_name : '',
    lastName: user.last_name ? user.last_name : '',
    email: user.email ? user.email : '',

  });

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = ((event) => {
      event.preventDefault();
      console.log('values', values)
      if (values.firstName === '' && values.lastName === '' && values.email === '') {
        return
      }
      instance.put('/api/user/setting/update/' + user.id, {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
      }).then((response)=> {
        console.log("data", response.data)

      }).catch((error)=> {
        console.log(error)
      })
    })


  return(
    <form
      autoComplete="off"
      noValidate
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid
              container
              spacing={3}
            >
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  helperText="Please specify the first name"
                  label="First name"
                  name="firstName"
                  onChange={handleChange}
                  required
                  value={values.firstName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Last name"
                  name="lastName"
                  onChange={handleChange}
                  required
                  value={values.lastName}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  fullWidth
                  label="Email Address"
                  name="email"
                  onChange={handleChange}
                  required
                  value={values.email}
                />
              </Grid>
           
              <Grid
                xs={12}
                md={6}
              >
                
              </Grid>
         
            </Grid>
          </Box>
  
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button variant="contained" type="submit" onSubmit={handleSubmit}>
            Save details
          </Button>
        </CardActions>
      </Card>

      <Card>
        <CardHeader
          subheader="You can update your password here."
          title="Password"
        />
        <Divider />
        <CardContent>
          <TextField
            fullWidth
            label="Current password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
          />
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="primary"
            variant="contained"
          >
            Update Password
          </Button>
        </CardActions>
      </Card>
    </form>
  )
  
};
