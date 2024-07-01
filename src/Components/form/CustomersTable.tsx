import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

function createData(
  Since: string,
  LastTxnDate: string,
  CustomerName: string,
  Email: string,
  Phone: number,
  TxnCount: string,
  TotalTxnAmount: string
) {
  return {
    Since,
    LastTxnDate,
    CustomerName,
    Email,
    Phone,
    TxnCount,
    TotalTxnAmount,
  };
}

const rows = [
  createData(
    "2023/1/3",
    "2023/1/3",
    "John Doe",
    "3qoE5@example.com",
    1234567890,
    "10",
    "2000"
  ),
  createData(
    "2023/1/3",
    "2023/1/3",
    "John Doe",
    "3qoE5@example.com",
    1234567890,
    "10",
    "2000"
  ),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper} sx={{ width: "100%", overflowX: "auto" }}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow
            sx={{
              height: 64, // Adjust the height here
              backgroundColor: "gray.200", // Adjust the background color here
            }}
          >
            <TableCell>Since</TableCell>
            <TableCell align="left">Last Txn Date</TableCell>
            <TableCell align="left">Customer Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Txn Count</TableCell>
            <TableCell align="left">Total Txn Amount</TableCell>
            <TableCell align="left">View button</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (
            <TableRow key={key} sx={{ height: "50px" }}>
              <TableCell component="th" scope="row">
                {row.Since}
              </TableCell>
              <TableCell align="left">{row.LastTxnDate}</TableCell>
              <TableCell align="left">{row.CustomerName}</TableCell>
              <TableCell align="left">{row.Email}</TableCell>
              <TableCell align="left">{row.Phone}</TableCell>
              <TableCell align="left">{row.TxnCount}</TableCell>
              <TableCell align="left">{row.TotalTxnAmount}</TableCell>
              <TableCell align="left">
                <Button>View</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
