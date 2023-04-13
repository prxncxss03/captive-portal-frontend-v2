
import {
  Box,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { error } from './../../../theme/colors';

export const WebContentFilterTable = (props) => {

  const {
    count = 0,
    items = [],
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
                  URL
                </TableCell>
                <TableCell>
                  Category
                </TableCell>
                <TableCell>

                </TableCell>
               
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((web,index) => {

                return (
                  <TableRow
                    hover
                    key={web.id}
                  >
                    <TableCell>
                      {index + 1}
                    </TableCell>
                    <TableCell>
                      {web.name}
                    </TableCell>
                    <TableCell>
                      {web.url}
                    </TableCell>
                    <TableCell>
                      {web.category}
                    </TableCell>
                    <TableCell>
                      <Button variant="secondary" onClick={(e)=>onDelete(e,web.id)}>
                        <Typography variant="subtitle2" color={error.main}>
                          Remove
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