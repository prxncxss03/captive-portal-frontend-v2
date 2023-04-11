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
    new_password: '',
    confirm_password: '',
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

  const changePassword = useFormik({
    initialValues: {
      current_password : '',
      new_password : '',
      confirm_password : '',
    },
    validationSchema: Yup.object({

      new_password: Yup
        .string()
        .max(255)
        .required('New password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),

      confirm_password: Yup
        .string()
        .max(255)
        .required('Password Confirmation is required')
        .oneOf([Yup.ref('new_password'), null], 'Passwords must match'),

    }),
    onSubmit: async (values, helpers) => {
      console.log('values', values)
      try {
        console.log('inside submit password')
        await instance.put('/api/user/setting/update-password/' + user.id, {
          new_password: values.new_password,
          confirm_password: values.confirm_password,
        }).then((response) => {
          console.log(response.data);
          helpers.setStatus({ success: true });
          helpers.setSubmitting(false);
        }).catch((error) => {
          console.log(error);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: error.response.data.message});
          helpers.setSubmitting(false);
        })
      }catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });




  return(
    <form
      autoComplete="off"
      noValidate
    >
      <Card sx={{m: 4,mt: 5}}>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5, }}>
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
            <Button variant="contained" type="submit" onClick={formik.handleSubmit} >
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

      <Card sx={{m: 4,mt: 2}}>
        <CardHeader
          subheader="You can update your password here."
          title="Password"
        />
        <Divider />
        <CardContent>
          <Box sx={{ m: 1, display: 'flex',flexDirection: "column"}}>
            <Grid
              container
              spacing={3}

            >
       
                <TextField
                      sx={{ mb: 1 }}
                      error={!!(changePassword.touched.new_password && changePassword.errors.new_password)}
                      fullWidth
                      helperText={changePassword.touched.new_password && changePassword.errors.new_password}
                      label="New Password"
                      name="new_password"
                      onBlur={changePassword.handleBlur}
                      onChange={changePassword.handleChange}
                      type="password"
                      value={changePassword.values.new_password}
                    />

          
              
            <TextField
                      error={!!(changePassword.touched.confirm_password && changePassword.errors.confirm_password)}
                      fullWidth
                      helperText={changePassword.touched.confirm_password && changePassword.errors.confirm_password}
                      label="Confirm Password"
                      name="confirm_password"
                      onBlur={changePassword.handleBlur}
                      onChange={changePassword.handleChange}
                      type="password"
                      value={changePassword.values.confirm_password}
                    />
        
            </Grid>
          </Box>

        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
        {
          changePassword.values.new_password === '' || changePassword.values.confirm_password === '' ? (
            <Button variant="contained" type="submit" disabled>
              Update Password
            </Button>
          ) :
          (
            <Button variant="contained" type="submit" onClick={changePassword.handleSubmit}>
              Update Password
            </Button>
          )


        }
          
        </CardActions>
      </Card>
    </form>
  )
  
};
