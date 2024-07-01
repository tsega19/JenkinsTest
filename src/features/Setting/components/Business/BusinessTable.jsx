import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { MdOutlineDeleteSweep } from "react-icons/md";
const handleViewClick = (id) => () => {
    console.log("CLicked" + id);
};
const columns = [
    {
        field: "name",
        headerName: "Name",
        width: 250,
        editable: true,
    },
    {
        field: "date",
        headerName: "Date",
        width: 150,
        editable: true,
    },
    {
        field: "status",
        headerName: "Status",
        type: "number",
        width: 150,
        editable: true,
    },
    {
        field: "actions",
        type: "actions",
        headerName: "Actions",
        width: 250,
        cellClassName: "actions",
        getActions: ({ id }) => {
            return [
                <Button onClick={handleViewClick(id)}>
          <MdOutlineDeleteSweep className="text-red-500" size={"1.5rem"}/>
        </Button>,
            ];
        },
    },
];
const rows = [
    { id: 1, date: "", name: "", status: "" },
    { id: 2, date: "", name: "", status: "" },
];
export default function BusinessTable() {
    return (<Box sx={{ height: 400, width: "100%" }}>
      <DataGrid rows={rows} columns={columns} initialState={{
            pagination: {
            // pageSizeOptions: [5],
            },
        }} 
    // pstatusSizeOptions={[5]}
    checkboxSelection disableRowSelectionOnClick/>
    </Box>);
}
//# sourceMappingURL=BusinessTable.jsx.map