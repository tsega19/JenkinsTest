import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Profile } from "./components/Profile/Profile";
import { Api } from "./components/Api/Api";
import { useState } from "react";
import { AccountSetting } from "../Setting/components/Accounts/AccountSetting";
import { Business } from "./components/Business/Business";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
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

export function Index() {
  const [value, setValue] = useState(0);
  const [changeStatus, setChangeStatus] = useState("test");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    console.log(event);
    setValue(newValue);
  };

  return (
    <div>
      <div
        className={`flex justify-center items-center gap-10 relative -z-10 ${
          changeStatus === "test"
            ? "bg-yellow-500"
            : "bg-green-500" && changeStatus === "block"
            ? "bg-red-500"
            : "bg-green-500"
        }   text-white font-bold `}
      >
        <h1>
          Status:
          <span className="text-xl pl-2">
            {changeStatus === "test"
              ? "Test"
              : "Production" && changeStatus === "block"
              ? "Block"
              : "Production"}
          </span>
        </h1>
        <button
          className={`${
            changeStatus === "test" ? "p-1 bg-primary rounded-md border  " : ""
          } `}
          onClick={() => setChangeStatus("Production")}
        >
          {changeStatus === "test" ? "Request for Production" : ""}
        </button>
      </div>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ marginBottom: "1rem" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ textTransform: "none", color: "black" }}
              label="Profile"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ textTransform: "none", color: "black" }}
              label="Business "
              {...a11yProps(1)}
            />
            <Tab
              sx={{ textTransform: "none", color: "black" }}
              label=" API "
              {...a11yProps(2)}
            />

            <Tab
              sx={{ textTransform: "none", color: "black" }}
              label=" Account Setting "
              {...a11yProps(3)}
            />
          </Tabs>
          <hr />
        </Box>
        <CustomTabPanel value={value} index={0}>
          <div>
            <Profile />
          </div>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <div>
            <Business />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <div>
            <Api />
          </div>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <div>
            <AccountSetting />
          </div>
        </CustomTabPanel>
      </Box>
    </div>
  );
}
