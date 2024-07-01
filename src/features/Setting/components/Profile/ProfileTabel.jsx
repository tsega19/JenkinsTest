import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
function createData(name, location, device, Ip, Time) {
    return { name, location, device, Ip, Time };
}
const rows = [
    createData("Active", "Addis Ababa", "samsung galaxy a53", "192.168.255.255", "4:00 PM"),
    createData("Active", "Hawassa", "DeskTop", "192.168.255.255", "11:30 PM"),
];
export default function ProfileTable() {
    return (<TableContainer component={Paper} sx={{ p: 2, boxShadow: "none" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Status</TableCell>
            <TableCell align="center">Location</TableCell>
            <TableCell align="center">Device</TableCell>
            <TableCell align="center">Ip Address</TableCell>
            <TableCell align="center">Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, key) => (<TableRow key={key} sx={{ borderBottom: "none", boxShadow: "none" }}>
              <TableCell component="th" scope="row" sx={{ borderBottom: "none" }}>
                {row.name}
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                {row.location}
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                {row.device}
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                {row.Ip}
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                {row.Time}
              </TableCell>
            </TableRow>))}
        </TableBody>
      </Table>
    </TableContainer>);
}
//# sourceMappingURL=ProfileTabel.jsx.map