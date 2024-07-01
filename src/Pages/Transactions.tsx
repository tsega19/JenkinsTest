import TransactionTable from "../Components/form/TransactionTable";
import { FaFilter, FaSearch } from "react-icons/fa";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState } from "react";

export const Transactions = () => {
  const [from, setFrom] = useState<Dayjs | null>(dayjs(""));
  const [to, setTo] = useState<Dayjs | null>(dayjs(""));
  const [optionValue, setOptionValue] = useState("");

  return (
    <>
      <section className="p-4 md:p-10 -z-10">
        <div className="flex flex-wrap gap-4">
          <div className="flex gap-2">
            <select
              value={optionValue}
              onChange={(e) => setOptionValue(e.target.value)}
              className="md:px-6 py-1 border border-gray-300 rounded-md text-neutral-800 focus:outline-none text-sm"
            >
              <option>Select</option>
              <option value="Account/Mobile">Account/Mobile</option>
              <option value="Email">Email</option>
              <option value="Customer Name">Customer Name</option>
              <option value="Bank Reference">Transaction Reference</option>
              <option value="Amount">Amount</option>
            </select>
            <div className="flex items-center gap-2 relative w-full md:w-auto">
              <FaSearch className="absolute left-3 text-primary" size="19px" />
              <input
                type="text"
                placeholder={`please enter ${optionValue}`}
                className="pl-10 pr-4 py-2 w-full md:w-auto border border-gray-300 rounded-md focus:outline-none text-sm"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-primary border rounded-md text-white font-semibold md:text-md text-xs">
              <FaFilter />
              <span className="md:block hidden">Filter</span>
            </button>
          </div>
        </div>
        <div className="mt-5 mx-5">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label="From"
                sx={{
                  mx: 1,
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                    height: 40,
                    width: 150,
                    "& input": {
                      height: 40,
                      py: 0,
                      px: 1,
                    },
                  },
                  "& .MuiInputBase-root": {
                    fontSize: "small",
                  },
                }}
                value={from}
                onChange={(newValue) => setFrom(newValue)}
              />
              <DatePicker
                label="To"
                sx={{
                  mx: 1,
                  "& .MuiOutlinedInput-root": {
                    border: "none",
                    height: 40,
                    width: 150,
                    "& input": {
                      height: 40,
                      py: 0,
                      px: 1,
                    },
                  },
                  "& .MuiInputBase-root": {
                    fontSize: "small",
                  },
                }}
                value={to}
                onChange={(newValue) => setTo(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
      </section>

      <section className="relative">
        {/* <div className="flex justify-between items-center lg:px:10 px-20 mb-10">
          <h3 className="text-2xl font-semibold">Transactions</h3>
          <select className="lg:px-4 rounded-md text-neutral-800 font-semibold">
            <option value="This week">This week</option>
            <option value="Last week">Last week</option>
            <option value="Last Month">Last Month</option>
          </select>
        </div> */}

        <div className="w-full">
          <TransactionTable />
        </div>

        <div className="flex justify-end md:justify-end items-center gap-4 p-8">
          <TbPlayerTrackPrev
            size="1.8rem"
            className="text-gray-400 cursor-pointer"
          />
          <TbPlayerTrackNext
            size="1.8rem"
            className="text-gray-400 cursor-pointer"
          />
        </div>
      </section>
    </>
  );
};
