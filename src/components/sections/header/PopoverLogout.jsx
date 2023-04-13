import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LetterAvatar } from '../../general/LetterAvatar';


export  function PopoverLogout({

  handlePopoverClick,
  firstName,
  lastName,
  handlePopoverClose,
  anchorEl,
  onLogOut,


}) {
  

  

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button aria-describedby={id} onClick={(event)=>handlePopoverClick(event)}>
        <LetterAvatar name={firstName + " " + lastName} />
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Button onClick={onLogOut}>Logout</Button>
      </Popover>
    </div>
  );
}