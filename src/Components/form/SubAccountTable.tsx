import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const rows: any[] = [];

export function SubAccountTable() {
  return (
    <TableContainer
      component={Paper}
      className="p-10"
      style={{ boxShadow: "none" }}
    >
      <Table aria-label="simple table">
        <TableHead className="hover:bg-gray-100 rounded-md">
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">Bank Account</TableCell>
            <TableCell align="center">SubAccount ID</TableCell>
            <TableCell align="center">Pre Payment</TableCell>
            <TableCell align="center">Create</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ borderBottom: "none", boxShadow: "none" }}
            >
              <TableCell
                component="th"
                scope="row"
                sx={{ borderBottom: "none" }}
              >
                {row.name}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                {row.calories}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                {row.fat}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                {row.carbs}
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                {row.protein}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
