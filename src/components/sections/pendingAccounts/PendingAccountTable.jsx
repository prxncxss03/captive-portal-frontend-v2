
import {
    Box,
    Button,
    Card,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
  } from '@mui/material';
  import { error, success } from '../../../theme/colors';
  import { LetterAvatar } from '../../general/LetterAvatar';
  
  export const PendingAccountTable = (props) => {
  
  
   const date = new Date();
    const {
      count = 0,
      items = [],
      onApproved = () => {},
      onDelete = () => {},
    } = props;
  
    return (
      <Card>
          <Box sx={{ minWidth: 800 }}>
            <Table>
              <TableHead>
                <TableRow>
                <TableCell>
                    
                  </TableCell>
                  <TableCell>
                    Name
                  </TableCell>
                  <TableCell>
                    Email
                  </TableCell>
               
                  <TableCell>
                    Operating System
                  </TableCell>
                  <TableCell>
            
                  </TableCell>
                  <TableCell>
                    
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((user,index) => {
                  const createdAt = "10/11/2021"
  
                  return (
                    <TableRow
                      hover
                      key={user.id}
                    >
                      <TableCell>
                        {index + 1}
                      </TableCell>
                      <TableCell>
                        <Stack
                          alignItems="center"
                          direction="row"
                          spacing={2}
                        >
                          <LetterAvatar name={user.first_name + " " + user.last_name}>
                          </LetterAvatar>
                          <Typography variant="subtitle2">
                            {user.first_name} {user.last_name}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {user.email}
                      </TableCell>
                  
                      <TableCell>
                        {user.first_name}
                      </TableCell>
                
                      <TableCell>
                      <Button variant="secondary" onClick={(e)=>onApproved(e,user.id)}>
                          <Typography variant="subtitle2" color={success.main}>
                            Approve
                          </Typography>
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Button variant="secondary" onClick={(e)=>onDelete(e,user.id)}>
                          <Typography variant="subtitle2" color={error.main}>
                            Reject
                          </Typography>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Box>
  
        <Table
          component="div"
          count={count}
        
        />
      </Card>
    );
  };