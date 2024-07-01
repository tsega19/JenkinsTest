import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import useAuth from "../../../../Hooks/useAuth";
import { getBankAccountApi } from "../../../../Service/Merchant/bankAccount";
import { useEffect, useState } from "react";

export default function AccountTable() {
  const { getToken } = useAuth();
  const [bankAccounts, setBankAccounts] = useState([]);
  const userToken = getToken();

  const fetchBankAccounts = async () => {
    try {
      if (userToken) {
        const response = await getBankAccountApi(userToken);
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBankAccounts(data.body.bankAccounts);
          return;
        } else {
          const data = await response.json();
          console.log("error", data);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchBankAccounts();
  }, []);
  return (
    <TableContainer component={Paper} sx={{ p: 2, boxShadow: "none" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ borderBottom: "none", boxShadow: "none" }}>
            <TableCell>Holder Name</TableCell>
            <TableCell>Account Name</TableCell>
            <TableCell align="left">Account Number</TableCell>
            <TableCell align="left">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankAccounts.map(
            (
              row: {
                holderName: string;
                bank: string;
                accountNumber: string;
                isVerified: boolean;
              },
              index
            ) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  sx={{ borderBottom: "none" }}
                >
                  {row.holderName}
                </TableCell>
                <TableCell align="left" sx={{ borderBottom: "none" }}>
                  {row.bank}
                </TableCell>
                <TableCell align="left" sx={{ borderBottom: "none" }}>
                  {row.accountNumber}
                </TableCell>
                <TableCell align="left" sx={{ borderBottom: "none" }}>
                  {row.isVerified ? "Verified" : "Not Verified"}
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
