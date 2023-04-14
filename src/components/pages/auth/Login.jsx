import { Formik } from 'formik';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import lvlogo from './../../../assets/image/logo/lvlogo.png';
import { Logo } from '../../general/Logo';
import {
  Alert,
  Box,
  Button,
  FormHelperText,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import axios from 'axios';
import { API_URL } from '../../general/config';
import {FcGoogle} from 'react-icons/fc';
import {  useNavigate } from 'react-router-dom';


//pages


export const Login = () => {

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      submit: null
    },
    validationSchema: Yup.object({
      email: Yup
        .string()
        .email('Must be a valid email')
        .max(255)
        .required('Email is required'),
      password: Yup
        .string()
        .max(255)
        .required('Password is required')
    }),
    onSubmit: async (values, helpers) => {
     
      console.log('inside submit', values);
      console.log('env', API_URL);

      try{
        await axios.post(`${API_URL}/api/auth/login`, {
          email: values.email,
          password: values.password
        }).then((response) => {
          
          console.log(response.data)
          localStorage.setItem('token', response.data.access_token);
          console.log('token', localStorage.getItem('token'));
          localStorage.setItem('user', JSON.stringify(response.data.user));
          if (response.data.user.user_type === 'admin') {
            navigate('/admin/dashboard');
          } else if (response.data.user.user_type === 'student') {
            navigate('/student/dashboard');
          } else if (response.data.user.user_type === 'faculty') {
            navigate('/faculty/dashboard');
          }

         
        }).catch((error) => {
          console.log(error);
          helpers.setStatus({ success: false });
          helpers.setErrors({ submit: error.response.data.message });
          helpers.setSubmitting(false);
        });
        
      } catch (err) {
        helpers.setStatus({ success: false });
        helpers.setErrors({ submit: err.message });
        helpers.setSubmitting(false);
      }
    }
  });

  return(
    <>
    <Box
      sx={{
        flex: '1 1 auto',
        alignItems: 'center',
        display: 'flex',
        width: '100%',
        marginTop: '90px',
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
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
            }}>

              <img src={lvlogo} alt="" 
                style={{
                  display: 'inline-block',
                  maxWidth: '100%',
                  width: 100
                }}
              />
            </Box>
            <Typography variant="h4" sx={{
              textAlign: 'center',
              marginTop: '12px',
              paddingBottom: '20px',
            }}>
              LV Captive Portal Login
            </Typography>
            <Typography
              color="text.secondary"
              variant="body2"
            >
              Don&apos;t have an account?
              &nbsp;
              <Link

                href="/auth/register"
                underline="hover"
                variant="subtitle2"
                onClick={()=>
                  navigate('/auth/register')
                }
              >
                Register
              </Link>
            </Typography>
          </Stack>
       
           

            <form
              noValidate
              onSubmit={formik.handleSubmit}
            >
              <Stack spacing={3}>
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
              </Stack>
              <FormHelperText sx={{ mt: 1 }}>
                Use your gsuite account.
              </FormHelperText>
              {formik.errors.submit && (
                <Typography
                  color="error"
                  sx={{ mt: 3 }}
                  variant="body2"
                >
                  {formik.errors.submit}
                </Typography>
              )}
              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 , backgroundColor: 'primary.main', color: 'primary.contrastText'}}
                type="submit"
                variant="contained"
                onSubmit={formik.handleSubmit}

              >
                Continue
              </Button>

              <Typography variant="body2" sx={{ mt: 3 , textAlign: 'center'}}>
                or
              </Typography>

              <Button
                fullWidth
                size="large"
                sx={{ mt: 3 }}
              >
                
                Continue with Google
                <FcGoogle size={20} style={{marginLeft: '10px'}}/>
              </Button>
              
          
            </form>
    
        </div>
        
      </Box>
    </Box>
  </>
);
};
