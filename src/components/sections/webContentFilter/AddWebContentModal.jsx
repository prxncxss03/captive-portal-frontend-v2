import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import { CardHeader, IconButton, Menu, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import {IoMdAdd} from 'react-icons/io';
import {MdClose} from 'react-icons/md';

const style = {
  position: 'absolute',
  top: '35%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50vw',
  bgcolor: '#fff',
  border: '2px solid transparent',
  boxShadow: 24,
  p: 4,
  pt: 0, 
};

export function AddWebContentModal({
  nameOnChange,
  urlOnChange,
  categoryOnChange,
  onSubmit,
  valueName,
  valueUrl,
  valueCategory,
  isOpen,
  handleModalOpen,



}) {



  return (
    <div>
      <Button variant="contained" color="success" onClick={handleModalOpen}>
        Add
        <IoMdAdd size={20} style={{marginLeft: '5px'}} />
      </Button>
      <Modal
        sx={{position:'relative'}}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isOpen}
        onClose={handleModalOpen}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
          
        <Fade in={isOpen}>

          <Card sx={style}>
            <CardHeader title="Add to Blocked Websites" sx={{textAlign: 'center', mt: 0, mb: 3}}/>
            <Grid2 container spacing={3} direction={'column'}>
         
                    <TextField
                        sx={{ mb: 1 }}
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        label="Name"
                        autoFocus
                        onChange={(e)=>nameOnChange(e)}
                        value={valueName}
                    />
             
  
                    <TextField
                        sx={{ mb: 1 }}
                        required
                        fullWidth
                        id="url"
                        label="URL"
                        name="url"
                        autoComplete="url"
                        onChange={(e)=>urlOnChange(e)}
                        value={valueUrl}
                    />
             
        
                <FormControl fullWidth sx={{ mb: 1 }} >
                  <InputLabel
                  id="demo-simple-select-label"
                  >Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="category"
                    name="category"
                    onChange={(e)=>categoryOnChange(e)}
                    value={valueCategory}
                  >
                    <MenuItem value={"pornography"}>Pornography</MenuItem>
                    <MenuItem value={"alcohol"}>Alcohol</MenuItem>
                    <MenuItem value={"gambling"}>Gambling</MenuItem>
                    <MenuItem value={"drugs"}>Drugs</MenuItem>
                    <MenuItem value={"hate"}>Hate</MenuItem>
                    <MenuItem value={"violence"}>Violence</MenuItem>
                    <MenuItem value={"weapons"}>Weapons</MenuItem>
                    <MenuItem value={"illegal"}>Illegal</MenuItem>
                    <MenuItem value={"social_media"}>Social Media</MenuItem>
                    <MenuItem value={"dating"}>Dating</MenuItem>
                    <MenuItem value={"games"}>Games</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                  </Select>
                </FormControl>
                <Grid2 container spacing={3} direction={'row'} justifyContent={'flex-end'}>
                    <Button variant="contained" color="success" onClick={(e) => onSubmit(e)}>
                      Add
                      <IoMdAdd size={20} style={{marginLeft: '5px'}} />
                    </Button>

               
                    <Button variant="contained" color="error" onClick={handleModalOpen}>    
                      Cancel
                      <MdClose size={20} style={{marginLeft: '5px'}} />
                    </Button>
                 
                  
                  </Grid2>
                </Grid2>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}