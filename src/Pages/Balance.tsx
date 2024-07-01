import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import PayOutTable from "../Components/form/PayOutTable";
import { TextField } from "@mui/material";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

interface CurrencyBalance {
  amount: number;
  currency: string;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

interface CurrencyTabProps {
  currencyBalance: CurrencyBalance;
}

function CurrencyTab(props: CurrencyTabProps) {
  const { currencyBalance } = props;

  const handleWithdraw = () => {
    console.log(`Withdraw from ${currencyBalance.currency}`);
  };

  return (
    <Box
      sx={{ display: "flex", justifyContent: "space-between", width: "30rem" }}
    >
      <Typography variant="h6" sx={{ pt: "5px" }}>
        {currencyBalance.currency}: {currencyBalance.amount}
      </Typography>
      <TextField
        id="standard-basic"
        placeholder="Amount Field to Withdraw"
        sx={{ fontSize: "1px" }}
        variant="standard"
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#F58634",
          ":hover": { backgroundColor: "#F58633" },
        }}
        onClick={handleWithdraw}
      >
        Withdraw
      </Button>
    </Box>
  );
}

export default function Balance() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  const etbBalance: CurrencyBalance = {
    amount: 5000,
    currency: "ETB",
  };

  const usdBalance: CurrencyBalance = {
    amount: 100,
    currency: "USD",
  };

  return (
    <>
      <Box sx={{ width: "100%", pl: { xs: 2, sm: 5 }, zIndex: -10 }}>
        <Tabs value={value} onChange={handleChange} aria-label="currency tabs">
          <Tab label="ETB" {...a11yProps(0)} />
          <Tab label="USD" {...a11yProps(1)} />
        </Tabs>
        <CustomTabPanel value={value} index={0}>
          <CurrencyTab currencyBalance={etbBalance} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <CurrencyTab currencyBalance={usdBalance} />
        </CustomTabPanel>
      </Box>
      <PayOutTable />
    </>
  );
}
