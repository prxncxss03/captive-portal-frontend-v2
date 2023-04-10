import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button,Checkbox, Link, Stack, TextField, Typography, FormControl, InputLabel,Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../general/config';
import { useNavigate } from 'react-router-dom';

export const Register = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      user_type: '',
      terms: false,
      confirm_password: '',
      submit: null
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
        .required('Name is required'),
      last_name: Yup
        .string()
        .max(100)
        .required('Name is required'),
      user_type: Yup
        .string()
        .max(100)
        .required('User Type is required'),
      
      password: Yup
        .string()
        .max(255)
        .required('Password is required'),

      confirm_password: Yup
        .string()
        .max(255)
        .required('Password Confirmation is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      terms: Yup
        .boolean()
        .oneOf([true], 'Please accept terms and conditions')

    }),
    onSubmit: async (values, helpers) => {

      try {
        
        await axios.post(`${API_URL}/api/auth/register`, {
          email: values.email,
          first_name: values.first_name.charAt(0).toUpperCase() + values.first_name.slice(1),
          last_name: values.last_name.charAt(0).toUpperCase() + values.last_name.slice(1),
          user_type: values.user_type,
          password: values.password,
          password_confirmation: values.confirm_password,

        }).then((response) => {
          console.log(response.data);
          useNavigate('/account-pending')
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



  return (
    <>
      <Box
        sx={{
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%'
          }}
        >
    
          <div>
            <Stack
              spacing={1}
              sx={{ mb: 3 }}
            >
              <Typography variant="h4">
                Register
              </Typography>
              <Typography
                color="text.secondary"
                variant="body2"
              >
                Already have an account?
                &nbsp;
                <Link
                onClick={
                  useNavigate('/auth/login')
                }
                  href="/auth/login"
                  underline="hover"
                  variant="subtitle2"
                >
                  Log in
                </Link>
              </Typography>
            </Stack>
            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
                <TextField
                  error={!!(formik.touched.first_name && formik.errors.first_name)}
                  fullWidth
                  helperText={formik.touched.first_name && formik.errors.first_name}
                  label="First Name"
                  name="first_name"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  value={formik.values.first_name}
                />
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
                <FormControl fullWidth >
                  <InputLabel
                  id="demo-simple-select-label"
                  >User Type</InputLabel>
                  <Select
                    error={!!(formik.touched.user_type && formik.errors.user_type)}
                    labelId="demo-simple-select-label"
                    value={formik.values.user_type}
                    label="User Type"
                    name="user_type"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={"faculty"}>Faculty</MenuItem>
                    <MenuItem value={"student"}>Student</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  error={!!(formik.touched.password && formik.errors.password)}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  label="Password"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.password}
                />
                <TextField
                  error={!!(formik.touched.confirm_password && formik.errors.confirm_password)}
                  fullWidth
                  helperText={formik.touched.confirm_password && formik.errors.confirm_password}
                  label="Confirm Password"
                  name="confirm_password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type="password"
                  value={formik.values.confirm_password}
                />
              </Stack>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Box sx={{ mt: 3 , display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
              <Checkbox
                value={formik.values.terms}
                name="terms"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                sx={{
                  color: 'primary.dark',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
                <Typography
                  color="text.secondary"
                  variant="body1"
                >
                  By registering, you agree to the
                  &nbsp;
                  <Link
                    color="primary.main"
                    underline="always"
                    variant="subtitle1"
                    target="_blank"
                    href="https://www.behance.net/gallery/57360779/McDonalds-Captive-Portal?tracking_source=search_projects%7CCaptive+Portal"
                  >
                    Terms and Conditions
                  </Link>
                  .
                </Typography>
              </Box>
              
              {
                //disable buttons if the there are errors in the form

                formik.errors.first_name || formik.errors.last_name || formik.errors.email || formik.errors.password || formik.errors.confirm_password || formik.errors.terms || formik.errors.user_type ? (
                  <Button disabled  fullWidth size="large" sx={{ mt: 3 }} type="submit" variant="contained">
                    Continue
                  </Button>
                ) : (
                  <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained">
                Continue
              </Button>
                )}

            </form>
          </div>
        </Box>
      </Box>
    </>
  );
};


