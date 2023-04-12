import {  useState,useEffect } from 'react';
import { Box, Container, Stack,  Typography } from '@mui/material';
import { StudentTable } from '../../sections/student/studentTable';
import { StudentSearch } from '../../sections/student/StudentSearch';
import { instance } from '../../../helper/http';

export const Faculty = () => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [listofFaculty, setlistofFaculty] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  
  useEffect(() => {
    console.log("instance", instance)
    
    instance.get('/api/admin/faculty').then((response) => {
      console.log(response.data.faculty);
      setlistofFaculty(response.data.faculty);
    }).catch((error) => {
      console.log(error);
    });
  }, [isUpdated]);


  const handleSearchFaculty = () => {
    if (searchValue === '') {
      instance.get('/api/admin/faculty').then((response) => {
        console.log(response.data.faculty);
        setlistofFaculty(response.data.faculty);
      }).catch((error) => {
        console.log(error);
      });
      return;
    }
    instance.get(`/api/admin/faculty/search/${searchValue}`).then((response) => {
      console.log(response.data.faculty);
      setlistofFaculty(response.data.faculty);
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        setlistofFaculty([]);
      }
    });

  }


  const handleFacultyDelete = async (e,facultyId) => {

    console.log(facultyId);
    await instance.delete(`/api/admin/faculty/${facultyId}`).then((response) => {
      console.log(response.data.message);
      setlistofFaculty(listofFaculty.filter((faculty) => faculty.id !== facultyId));
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
                  Faculty
                </Typography>
                
              </Stack>
        
            </Stack>
            <StudentSearch onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} 
              onSearch={handleSearchFaculty}
              placeholder={"Search by name"}
            />
            <StudentTable
              count={listofFaculty.length}
              items={listofFaculty}
         
              onDelete={handleFacultyDelete}
  
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


