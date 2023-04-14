
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
import { error } from '../../../theme/colors';
import { LetterAvatar } from '../../general/LetterAvatar';
import { osdata } from '../../general/data/osdata';
export const Ostable = (props) => {


 const date = new Date();
  const {
    count = 0,
    items = [],
    page = 0,
    onDelete = () => {},
  } = props;

  return (
    <Card sx={{
      marginLeft: 2,
    }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
              <TableCell>
                   
                </TableCell>
              
                <TableCell>
                  Operating System
                </TableCell>
                <TableCell>
                  No. of Users
                </TableCell>
                
                
              </TableRow>
            </TableHead>
            <TableBody>
              {osdata.map((student,index) => {
                const createdAt = "10/11/2021"

                return (
                  <TableRow
                    hover
                    key={student.id}
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
                        {student.icon}
                        <Typography variant="subtitle2">
                          {student.name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {student.count}
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