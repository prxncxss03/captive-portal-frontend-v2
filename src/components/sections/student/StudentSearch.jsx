import {HiMagnifyingGlass as MagnifyingGlassIcon} from 'react-icons/hi2';
import { Button, Card, InputAdornment, OutlinedInput, SvgIcon } from '@mui/material';

export const StudentSearch = ({onChange, value, onSearch,placeholder}) => (
  <Card sx={{ p: 2 ,
    //media query
  }}>
    <OutlinedInput
      onChange={(e)=> onChange(e)}
      value={value}
      placeholder={placeholder}
      startAdornment={(
        <InputAdornment position="start">
          <SvgIcon
            color="action"
            fontSize="small"
          >
            <MagnifyingGlassIcon />
          </SvgIcon>
        </InputAdornment>
      )}
      sx={{ width: '40%' , borderTopRightRadius: 0, borderBottomRightRadius: 0,
      }}
    />
    <Button 
    onClick={onSearch}
    variant='contained' sx={{ p:1.90, mb: 0.30, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}>
      Search
    </Button>
  </Card>
);
