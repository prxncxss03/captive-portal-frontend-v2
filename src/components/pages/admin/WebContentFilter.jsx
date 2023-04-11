import {  useState,useEffect } from 'react';
import { Box, Container, Stack,Button,  Typography } from '@mui/material';
import { WebContentFilterTable } from '../../sections/webContentFilter/webContentFilterTable';
import { StudentSearch } from '../../sections/student/StudentSearch';
import { instance } from '../../../helper/http';
import {IoMdAdd} from 'react-icons/io';
import { AddWebContentModal } from '../../sections/webContentFilter/addWebContentModal';

export const WebContentFilter = () => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [listOfWebContent, setlistOfWebContent] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);

  
  useEffect(() => {
    console.log("instance", instance)
    
    instance.get('/api/admin/students').then((response) => {
      console.log(response.data.students);
      setlistOfWebContent(response.data.students);
    }).catch((error) => {
      console.log(error);
    });
  }, [isUpdated]);


  const handleSearchStudent = () => {
    if (searchValue === '') {
      instance.get('/api/admin/students').then((response) => {
        console.log(response.data.students);
        setlistOfWebContent(response.data.students);
      }).catch((error) => {
        console.log(error);
      });
      return;
    }
    instance.get(`/api/admin/students/search/${searchValue}`).then((response) => {
      console.log(response.data.students);
      setlistOfWebContent(response.data.students);
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        setlistOfWebContent([]);
      }
    });

  }


  const handleStudentDelete = async (e,studentId) => {

    console.log(studentId);
    await instance.delete(`/api/admin/students/${studentId}`).then((response) => {
      console.log(response.data.message);
      setlistOfWebContent(listOfWebContent.filter((student) => student.id !== studentId));
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
                  Web Content Filter
                </Typography>
                
              </Stack>

              <Button variant="contained" color="success" 
                 >
                      Add
                      <IoMdAdd size={20} style={{marginLeft: '5px'}} />
                  </Button>

              <AddWebContentModal />
        
            </Stack>
            <StudentSearch onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} 
              onSearch={handleSearchStudent}
            />
            <WebContentFilterTable
              count={listOfWebContent.length}
              items={listOfWebContent}
         
              onDelete={handleStudentDelete}
  
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


