import {  useState,useEffect } from 'react';
import { Box, Button, Container, Stack,  Typography } from '@mui/material';
import {BsCheck2Circle} from 'react-icons/bs';
import {TiDeleteOutline} from 'react-icons/ti';

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

  const handleApproveAll = async () => {
    await instance.put('/api/admin/pending-accounts').then((response) => {
        console.log(response.data.message);
        setListOfPendingAccounts([]);
        setIsUpdated(!isUpdated);
        }).catch((error) => {
        console.log(error);
        });
    }

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

  const handleRejectAll = async () => {
    await instance.delete('/api/admin/pending-accounts').then((response) => {
        console.log(response.data.message);
        setListOfPendingAccounts([]);
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
      if (error.response.status === 404) {
        setListOfPendingAccounts([]);
      }
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

                <Typography variant="h4">
                  Pending Accounts
                </Typography>

                <Stack direction="row" spacing={1}>


                  <Button variant="contained" color="success" 
                  onClick={handleApproveAll}>
                      Approve All
                      <BsCheck2Circle size={20} style={{marginLeft: '5px'}} />
                  </Button>
                  <Button variant="contained" color="error" 
                  onClick={handleRejectAll}>
                      Reject All
                      <TiDeleteOutline size={20} style={{marginLeft: '5px'}} />
                  </Button>
                </Stack>
            </Stack>
            <StudentSearch onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} 
              onSearch={handleSearchPendingAccounts}
              placeholder="Search by name"
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


