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
import { Formik,useFormik} from 'formik';
import * as Yup from 'yup';
import { sentenceCase } from '../../helper/sentenceCase';


export const Settings = () => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  let user = JSON.parse(localStorage.getItem('user') ? localStorage.getItem('user') : '');
  
  console.log(user)
  const [values, setValues] = useState({
    firstName: user.first_name ? user.first_name : '',
    lastName: user.last_name ? user.last_name : '',
    email: user.email ? user.email : '',

  });
  const [defaultValues, setDefaultValues] = useState({
    firstName: user.first_name ? user.first_name : '',
    lastName: user.last_name ? user.last_name : '',
    email: user.email ? user.email : '',
  });

  const [passwordValues, setPasswordValues] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const formik = useFormik({
    initialValues: {
      email: defaultValues.email,
      first_name: defaultValues.firstName, 
      last_name: defaultValues.lastName,
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      first_name: Yup
        .string()
        .max(100)
        .required('First Name is required'),
      last_name: Yup
        .string()
        .max(100)
        .required('Last Name is required'),

    }),
    onSubmit: async (values, helpers) => {
      
     
      try {
        
        await instance.put('/api/user/setting/update/' + user.id, {
          first_name: sentenceCase(values.first_name),
          last_name: sentenceCase(values.last_name),
          email: values.email,

        }).then((response) => {
          console.log(response.data);
          setDefaultValues({
            firstName: sentenceCase(values.first_name),
            lastName: sentenceCase(values.last_name),
            email: values.email,
          })
          helpers.setStatus({ success: true });
          localStorage.setItem('user', JSON.stringify(response.data));
          
          
        }).catch((error) => {
          console.log(error);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: error.response.data.message});
          helpers.setSubmitting(false);
        });

      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });


  const handleChangePassword = (event) => {
    setPasswordValues({
      ...passwordValues,
      [event.target.name]: event.target.value
    });
  };


  const handleResetPassword = () => {

    console.log('reset password')
    console.log(passwordValues)
    instance.put('/api/user/setting/update-password/' + user.id, {
      current_password: passwordValues.currentPassword,
      new_password: passwordValues.newPassword,
      confirm_password: passwordValues.confirmPassword
    })
    .then((response)=> {
      console.log("data", response.data)
    }).catch((error)=> {
      console.log(error)
    })

  }




  return(
    <form
      autoComplete="off"
      noValidate
      onSubmit={formik.handleSubmit}
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
                  error={!!(formik.touched.first_name && formik.errors.first_name)}
                  fullWidth
                  helperText={formik.touched.first_name && formik.errors.first_name}
                  label="First Name"
                  name="first_name"
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.last_name && formik.errors.last_name)}
                  fullWidth
                  helperText={formik.touched.last_name && formik.errors.last_name}
                  label="Last Name"
                  name="last_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.last_name}
                />
              </Grid>
              <Grid
                xs={12}
                md={6}
              >
                <TextField
                  error={!!(formik.touched.email && formik.errors.email)}
                  fullWidth
                  helperText={formik.touched.email && formik.errors.email}
                  label="Email Address"
                  name="email"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="email"
                  value={formik.values.email}
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
        {
          formik.values.first_name !== defaultValues.firstName || formik.values.last_name !== defaultValues.lastName || formik.values.email !== defaultValues.email || formik.errors.first_name || formik.errors.last_name || formik.errors.email || formik.values.first_name === '' || formik.values.last_name === '' || formik.values.email === '' ? (
            <Button variant="contained" type="submit" >
              Save details
            </Button>
          ) : 
          (
            <Button variant="contained" type="submit" disabled>
              Save details
            </Button>
          )
        }
          
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
            name="currentPassword"
            type="password"
            variant="outlined"
            onChange={handleChangePassword}
            
          />
          <TextField
            fullWidth
            label="New password"
            margin="normal"
            name="newPassword"
            type="password"
            variant="outlined"
            onChange={handleChangePassword}
          />
          <TextField
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirmPassword"
            type="password"
            variant="outlined"
            onChange={handleChangePassword}
          />
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            color="primary"
            variant="contained"
            onClick={handleResetPassword}
          >
            Update Password
          </Button>
        </CardActions>
      </Card>
    </form>
  )
  
};
