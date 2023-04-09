import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'
import {createTheme as createATheme, ThemeProvider } from '@mui/material/styles';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { createTypography } from './theme/typography';
import {createPalette } from './theme/pallete';
import { createShadows } from './theme/shadows';
import {createComponents} from './theme/components';


 
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
      element: <App />,
    },
  ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={createTheme}>
      <RouterProvider router={router}>
      <App />
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
