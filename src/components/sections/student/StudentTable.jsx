
import {
  Box,
  Button,
  Card,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@mui/material';
import { error } from '../../../theme/colors';
import { LetterAvatar } from '../../general/LetterAvatar';

export const StudentTable = (props) => {


 const date = new Date();
  const {
    count = 0,
    items = [],
    page = 0,
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
                  Joined
                </TableCell>
                <TableCell>
                  Operating System
                </TableCell>
                <TableCell>
                  Last Session
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
                <TableCell>
                  
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((student,index) => {
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
                        <LetterAvatar name={student.first_name + " " + student.last_name}>
                        </LetterAvatar>
                        <Typography variant="subtitle2">
                          {student.first_name} {student.last_name}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>
                      {student.email}
                    </TableCell>
                    <TableCell>
                        {createdAt}
                    </TableCell>
                    <TableCell>
                      {student.first_name}
                    </TableCell>
                    <TableCell>
                      {student.first_name}
                    </TableCell>
                    <TableCell>
                      {student.first_name}
                    </TableCell>
                    <TableCell>
                      <Button variant="secondary" onClick={(e)=>onDelete(e,student.id)}>
                        <Typography variant="subtitle2" color={error.main}>
                          Delete
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