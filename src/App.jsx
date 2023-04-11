import { Box, Container,  Typography } from '@mui/material'
import { Routes,Route } from 'react-router-dom'
import { Login } from './components/pages/auth/Login';
import { Register } from './components/pages/auth/Register';
import { NotFound } from './components/pages/placeholder/NotFound';
import { AccountPending } from './components/pages/placeholder/AccountPending';
import { Home } from './components/pages/admin/home';
import { Students } from './components/pages/admin/Students';
import { Dashboard } from './components/pages/admin/Dashboard';
import { PrivateRoutes } from './components/utils/PrivateRoutes';
import { PendingAccounts } from './components/pages/admin/PendingAccounts';


function App() {
  
  return (
    <Container maxWidth="sm">
      <Routes >
          <Route path="/auth/login" element={<Login />} />
          
          <Route element={<PrivateRoutes></PrivateRoutes>}>
            <Route path="/" element={<Home />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/account-pending" element={<AccountPending />} />
            <Route path='/admin' element={<Home />} />
            <Route path="/admin/students" element={<Students />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/pending-accounts" element={<PendingAccounts />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>

    </Container>
    
  )
}

export default App
