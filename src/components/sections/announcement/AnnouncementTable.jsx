
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

export const AnnouncementTable = (props) => {


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
                  No.
                </TableCell>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Announcement
                </TableCell>
                <TableCell>
                  Posted By
                </TableCell>     
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((announcement,index) => {
                const createdAt = "10/11/2021"

                return (
                  <TableRow
                    hover
                    key={announcement.id}
                  >
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {announcement.announcement}
                    </TableCell>
                
                    <TableCell>
                      {announcement.postedBy}
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