import {  useState,useEffect } from 'react';
import { Box, Container, Stack,  Typography } from '@mui/material';

import { PendingAccountTable } from '../../sections/pendingAccounts/PendingAccountTable';
import { StudentSearch } from '../../sections/student/StudentSearch';
import { instance } from '../../../helper/http';

export const PendingAccounts = () => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [listOfPendingAccounts, setListOfPendingAccounts] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  
  useEffect(() => {
    instance.get('/api/admin/pending-accounts').then((response) => {
      console.log(response.data.pending_accounts);
      setListOfPendingAccounts(response.data.pending_accounts);
    }).catch((error) => {
      console.log(error);
    });
  }, [isUpdated]);

  const handleApprovedAccount = async (e,userId) => {
    console.log(userId);
    await instance.put(`/api/admin/pending-accounts/${userId}`).then((response) => {
        console.log(response.data.message);
        setListOfPendingAccounts(listOfPendingAccounts.filter((user) => userId.id !== userId));
        setIsUpdated(!isUpdated);
        }).catch((error) => {
        console.log(error);
        });
    }

  const handleSearchPendingAccounts = () => {
    if (searchValue === '') {
      instance.get('/api/admin/pending-accounts').then((response) => {
        console.log(response.data.pending_accounts);
        setListOfPendingAccounts(response.data.pending_accounts);
      }).catch((error) => {
        console.log(error);
      });
      return;
    }
    instance.get(`/api/admin/pending-accounts/search/${searchValue}`).then((response) => {
      console.log(response.data.pending_accounts);
      setListOfPendingAccounts(response.data.pending_accounts);
    }).catch((error) => {
      console.log(error);
    });

  }


  const handlePendingAccountDelete = async (e,userId) => {

    await instance.delete(`/api/admin/pending-accounts/${userId}`).then((response) => {
      console.log(response.data.message);
      setListOfPendingAccounts(listOfPendingAccounts.filter((user) => userId.id !== userId));
      setIsUpdated(!isUpdated);
    }).catch((error) => {
      console.log(error);
    });

  }

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Stack
              direction="row"
              justifyContent="space-between"
              spacing={4}
            >
              <Stack spacing={1}>
                <Typography variant="h4">
                  Pending Accounts
                </Typography>
                
              </Stack>
        
            </Stack>
            <StudentSearch onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} 
              onSearch={handleSearchPendingAccounts}
            />
            <PendingAccountTable
              count={listOfPendingAccounts.length}
              items={listOfPendingAccounts}
                onApproved={handleApprovedAccount}
              onDelete={handlePendingAccountDelete}
  
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


