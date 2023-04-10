import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'
import {createTheme as createATheme, ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import {createPalette } from './theme/pallete';
import { createShadows } from './theme/shadows';
import {createComponents} from './theme/components';
import {createTypography} from './theme/typography';


//pages
import {Login} from './components/pages/auth/Login';
import {Register} from './components/pages/auth/Register';
import { NotFound } from './components/pages/placeholder/NotFound';
import { AccountPending } from './components/pages/placeholder/AccountPending';
import {Home} from './components/pages/admin/home';
import { Students } from './components/pages/admin/Students';
import { Dashboard } from './components/pages/admin/Dashboard';
import {PrivateRoutes} from './components/utils/PrivateRoutes';
import { PendingAccounts } from './components/pages/admin/PendingAccounts';

 
export function createTheme() {
  const palette = createPalette();
  const components = createComponents({ palette });
  const shadows = createShadows();
  const typography = createTypography();

  return createATheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440
      }
    },
    components,
    palette,
    shadows,
    shape: {
      borderRadius: 8
    },
    typography
  });
}
 

  const router = createBrowserRouter([

    {
      path: "/",
      element: 
        <App />,
    },
    {
      path: "/auth/login",
      element: <Login />,
    },
    {
      path: "/auth/register",
      element: <Register />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
    {
      path: '/account-pending',
      element: <AccountPending />,
    },
    
    {
      path: '/admin' ,
      element: 
      <PrivateRoutes>
        <Home />
        </PrivateRoutes>,
      children: [
    
        {
          path: '/admin/students',
          element:
          <PrivateRoutes>
            <Students />
          </PrivateRoutes>
        
        },
        {
          path: '/admin/dashboard',
          element: 
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>

        },
        {
          path: '/admin/pending-accounts',
          element:
          <PrivateRoutes>
            <PendingAccounts />
          </PrivateRoutes>
        }
      ]
    }
  ]);

  

const theme = createTheme();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
