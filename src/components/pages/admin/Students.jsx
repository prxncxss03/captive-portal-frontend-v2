import {  useState,useEffect } from 'react';
import { Box, Container, Stack,  Typography } from '@mui/material';
import { StudentTable } from '../../sections/student/studentTable';
import { StudentSearch } from '../../sections/student/StudentSearch';
import { instance } from '../../../helper/http';

export const Students = () => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [listOfStudents, setListOfStudents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  
  useEffect(() => {
    console.log("instance", instance)
    
    instance.get('/api/admin/students').then((response) => {
      console.log(response.data.students);
      setListOfStudents(response.data.students);
    }).catch((error) => {
      console.log(error);
    });
  }, [isUpdated]);


  const handleSearchStudent = () => {
    if (searchValue === '') {
      instance.get('/api/admin/students').then((response) => {
        console.log(response.data.students);
        setListOfStudents(response.data.students);
      }).catch((error) => {
        console.log(error);
      });
      return;
    }
    instance.get(`/api/admin/students/search/${searchValue}`).then((response) => {
      console.log(response.data.students);
      setListOfStudents(response.data.students);
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        setListOfStudents([]);
      }
    });

  }


  const handleStudentDelete = async (e,studentId) => {

    console.log(studentId);
    await instance.delete(`/api/admin/students/${studentId}`).then((response) => {
      console.log(response.data.message);
      setListOfStudents(listOfStudents.filter((student) => student.id !== studentId));
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
          py: 8,
          height: '100vh',

          //media query
          '@media (max-width: 600px)': {
            py: 5,
            marginLeft: -5,
            px: 0,

          },
          '@media (max-width: 500px)': {
            py: 5,
            marginLeft: 45,
            px: 0,

          },
          '@media (max-width: 422px)': {
            py: 5,
            marginLeft: 60,
            px: 0,

          },

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
                <Typography variant="h4" sx={{
                  fontSize: '1.5rem',
                }}>
                  Students
                </Typography>
                
              </Stack>
        
            </Stack>
            <StudentSearch onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} 
              onSearch={handleSearchStudent}
              placeholder={"Search by name"}
            />
            <StudentTable
              count={listOfStudents.length}
              items={listOfStudents}
         
              onDelete={handleStudentDelete}
  
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


