import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(
  date: string,
  customer: string,
  transactionAmount: string,
  transactionThrough: string,
  commission: string
) {
  return { date, customer, transactionAmount, transactionThrough, commission };
}

const rows = [
  createData("June,4 2024", "Example@gmail.com", "12,500", "telebirr", "7.78"),
  createData("June,4 2024", "Example@gmail.com", "50,000", "Amole", "5.78"),
  createData("June,4 2024", "Example@gmail.com", "22,000", "Cbe", "8.78"),
];

export default function OverViewTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Customer</TableCell>
            <TableCell align="right">Transaction Amount</TableCell>
            <TableCell align="right">Transaction Through</TableCell>
            <TableCell align="right">Comission</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.date}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.date}
              </TableCell>
              <TableCell align="right">{row.customer}</TableCell>
              <TableCell align="right">{row.transactionAmount}</TableCell>
              <TableCell align="right">{row.transactionThrough}</TableCell>
              <TableCell align="right">{row.commission}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
