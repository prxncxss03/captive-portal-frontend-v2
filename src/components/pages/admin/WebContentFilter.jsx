import {  useState,useEffect } from 'react';
import { Box, Container, Stack,Button,  Typography } from '@mui/material';
import { WebContentFilterTable } from '../../sections/webContentFilter/webContentFilterTable';
import { StudentSearch } from '../../sections/student/StudentSearch';
import { instance } from '../../../helper/http';
import { sentenceCase } from '../../../helper/sentenceCase';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddWebContentModal } from '../../sections/webContentFilter/addWebContentModal';

export const WebContentFilter = () => {
  instance.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  const [listOfWebContent, setlistOfWebContent] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [values, setValues] = useState({
    name: '',
    url: '',
    category: ''
  });
  const [isUpdated, setIsUpdated] = useState(false  );
  const [isOpen, setIsOpen] = useState(false);

  
  useEffect(() => {
    
    instance.get('/api/admin/web-content-filter').then((response) => {
      setlistOfWebContent(response.data.webpages);
    }).catch((error) => {
      console.log(error);
    });
  }, [isUpdated]);


  const handleSearchWebsite = () => {
    if (searchValue === '') {
      instance.get('/api/admin/web-content-filter').then((response) => {
        setlistOfWebContent(response.data.webpages);
      }).catch((error) => {
        console.log(error);
      });
      return;
    }
    instance.get(`/api/admin/web-content-filter/search/${searchValue}`).then((response) => {
      setlistOfWebContent(response.data.blocked_websites);
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 404) {
        setlistOfWebContent([]);
      }
    });

  }


  const handleWebsiteDelete = async (e,webpage) => {
    await instance.delete(`/api/admin/web-content-filter/${webpage}`).then((response) => {
      console.log(response.data.message);
      setlistOfWebContent(listOfWebContent.filter((webpage) => webpage.id !== webpage));
      setIsUpdated(!isUpdated);
    }).catch((error) => {
      console.log(error);
    });}
  

    const handleChange = (e) =>{
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value
      });
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      await instance.post('/api/admin/web-content-filter', values).then((response) => {
        console.log(response.data.message);
        setIsUpdated(!isUpdated);
        setValues({
          name: '',
          url: '',
          category: ''
        });
        setIsOpen(!isOpen);
      }).catch((error) => {
        console.log(error);
      });

      console.log(values);
    }

    const handleModalOpen = () => {
      setIsOpen(!isOpen);
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
          '@media (max-width: 418px)': {
            py: 5,
            marginLeft: 55,
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
                  Web Content Filter
                </Typography>
                
              </Stack>
           <AddWebContentModal
                handleModalOpen={handleModalOpen} 
                isOpen={isOpen}
                valueName={values.name}
                valueUrl={values.url}
                valueCategory={values.category}
                nameOnChange={(e)=>handleChange(e)}
                urlOnChange={(e) => handleChange(e)}
                categoryOnChange={(e) => handleChange(e)}
                onSubmit={(e) => handleSubmit(e)}>

                </AddWebContentModal>
        
            </Stack>
            <StudentSearch onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} 
              onSearch={handleSearchWebsite}
              placeholder={"Search by name, url, category"}
            />
            <WebContentFilterTable
        
              items={listOfWebContent}

              onDelete={handleWebsiteDelete}
  
            />
          </Stack>
        </Container>
      </Box>
    </>
  );
};


