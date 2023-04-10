import { useCallback, useMemo, useState,useEffect } from 'react';
import { Box, Button, Container, Stack, SvgIcon, Typography } from '@mui/material';
import { StudentTable } from '../../../sections/student/studentTable';
import { StudentSearch } from '../../../sections/student/StudentSearch';
import { instance } from '../../../../helper/http';

const now = new Date();


export const Students = () => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [listOfStudents, setListOfStudents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
 

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  
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
                  Students
                </Typography>
                
              </Stack>
        
            </Stack>
            <StudentSearch onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} 
              onSearch={handleSearchStudent}
            />
            <StudentTable
              count={listOfStudents.length}
              items={listOfStudents}
              page={page}
              onDelete={handleStudentDelete}
  
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


