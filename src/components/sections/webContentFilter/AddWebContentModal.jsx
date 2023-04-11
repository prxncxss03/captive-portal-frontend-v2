import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Card from '@mui/material/Card';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardHeader, TextField } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';

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

export function AddWebContentModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
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
                    />
             
  
                    <TextField
                        sx={{ mb: 1 }}
                        required
                        fullWidth
                        id="url"
                        label="URL"
                        name="url"
                        autoComplete="url"
                    />
             
        
                <FormControl fullWidth sx={{ mb: 1 }} >
                  <InputLabel
                  id="demo-simple-select-label"
                  >Category</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    label="User Type"
                    name="user_type"
                  >
                    <MenuItem value={"faculty"}>Faculty</MenuItem>
                    <MenuItem value={"student"}>Student</MenuItem>
                  </Select>
                </FormControl>
           
                </Grid2>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
}