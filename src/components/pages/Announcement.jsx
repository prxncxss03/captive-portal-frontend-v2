import {  useState,useEffect } from 'react';
import { Box, Container, Stack,  Typography } from '@mui/material';
import { AnnouncementTable } from '../sections/announcement/AnnouncementTable';

import { announcementStaticData } from '../general/data/announmentStaticData';

export const Announcement = () => {
  //instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [listOfStudents, setListOfStudents] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  /*
  useEffect(() => {
    console.log("instance", instance)
    
    instance.get('/api/admin/students').then((response) => {
      console.log(response.data.students);
      setListOfStudents(response.data.students);
    }).catch((error) => {
      console.log(error);
    });
  }, [isUpdated]);
    */
  


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
            marginLeft: '-35px',
            px: 0,

          },
          '@media (max-width: 430px)': {
            py: 5,
            marginLeft:'-10px',
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
                  Announcements
                </Typography>
                
              </Stack>
        
            </Stack>
          
            <AnnouncementTable
              count={announcementStaticData.length}
              items={announcementStaticData}
         
              onDelete={handleStudentDelete}
  
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


