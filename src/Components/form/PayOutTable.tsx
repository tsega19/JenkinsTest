import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows: any[] = [];

export default function PayOutTable() {
  return (
    <TableContainer
      component={Paper}
      className="p-2 md:p-4 lg:p-6" // Adjust padding for different screen sizes
      style={{ boxShadow: "none" }}
    >
      <Table sx={{ minWidth: 300 }} aria-label="simple table">
        <TableHead className="hover:bg-gray-100">
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="center">Balance</TableCell>
            <TableCell align="center">Requested Amount</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
