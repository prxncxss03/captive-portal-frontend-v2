import { Box, Container,  Typography } from '@mui/material'
import { Routes,Route, Outlet, BrowserRouter } from 'react-router-dom'
import { Login } from './components/pages/auth/Login';
import { Register } from './components/pages/auth/Register';
import { NotFound } from './components/pages/placeholder/NotFound';
import { AccountPending } from './components/pages/placeholder/AccountPending';
import { Home } from './components/pages/admin/Home';
import { Students } from './components/pages/admin/Students';
import { Faculty } from './components/pages/admin/Faculty';
import { Settings } from './components/pages/Settings';
import { Dashboard } from './components/pages/admin/Dashboard';
import { PrivateRoutes } from './components/utils/PrivateRoutes';
import { PendingAccounts } from './components/pages/admin/PendingAccounts';
import { WebContentFilter } from './components/pages/admin/WebContentFilter';
import { StudentHome } from './components/pages/student/StudentHome';
import { StudentDashboard } from './components/pages/student/StudentDashboard';


function App() {
 
  return (


    <Container sx={{
      height: '100vh',
      display: 'flex',
      overflow: 'hidden',


    }}>
   

      <Routes>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />

          <Route path="/"  element={<PrivateRoutes></PrivateRoutes>}>
       
              <Route path='/admin' element={<Home />} />
              <Route path="/admin/dashboard" index element={<Dashboard />}  />
              <Route path="/auth/register" element={<Register />} />
              <Route path="/account-pending" element={<AccountPending />} />
              <Route path="/admin/faculty" element={<Faculty />} />
              <Route path="/settings" element={<Settings />} />
             
              
              <Route path="/admin/students" element={<Students />} />
              <Route path="/admin/pending-accounts" element={<PendingAccounts />} />
              <Route path="/admin/web-content-filter" element={<WebContentFilter />} />

              <Route path="/student" element={<StudentHome />} />
              <Route path="/student/dashboard" element={<StudentDashboard />} />

            </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
       
      

    </Container>

    
  )
}

export default App
