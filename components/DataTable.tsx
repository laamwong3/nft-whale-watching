import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import Link from "next/link";

const columns: GridColDef[] = [
  {
    flex: 0,
    field: "id",
    headerName: "ID",
    width: 90,
    align: "center",
    headerAlign: "center",
    renderHeader: (param) => <i>ID</i>,
  },
  {
    flex: 1,
    field: "firstName",
    headerName: "First name",
    width: 150,
    // editable: true,
    align: "center",
    headerAlign: "center",
    // renderCell: () => <div>HELLO</div>,
  },
  {
    flex: 1,
    field: "lastName",
    headerName: "Last name",
    width: 150,
    // editable: true,
    align: "center",
    headerAlign: "center",
    // renderCell: (params: GridValueGetterParams) => (
    //   <Link href="/test">
    //     <a>${params.row.age * 10} OLD</a>
    //   </Link>
    // ),
  },
  {
    flex: 0,
    field: "age",
    headerName: "Age",
    type: "number",
    width: 110,
    // editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    flex: 1,
    field: "fullName",
    headerName: "Full name",
    description: "This column has a value getter and is not sortable.",
    sortable: false,
    width: 160,
    align: "center",
    headerAlign: "center",
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.firstName || ""} ${params.row.lastName || ""}`,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
  { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  { id: 4, lastName: "Stark", firstName: "Arya", age: 16 },
  { id: 5, lastName: "Targaryen", firstName: "Daenerys", age: null },
  { id: 6, lastName: "Melisandre", firstName: null, age: 150 },
  { id: 7, lastName: "Clifford", firstName: "Ferrara", age: 44 },
  { id: 8, lastName: "Frances", firstName: "Rossini", age: 36 },
  { id: 9, lastName: "Roxie", firstName: "Harvey", age: 65 },
];

export default function DataTable() {
  const [pageSize, setPageSize] = React.useState(2);
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        autoHeight
        density="comfortable"
        rowsPerPageOptions={[2, 4, 9]}
        onPageSizeChange={(val) => setPageSize(val)}
        // onRowClick={() => alert("CLICKED")}
        isRowSelectable={() => false}
        isCellEditable={() => false}
        // showCellRightBorder
        // showColumnRightBorder
        // keepNonExistentRowsSelected={true}
        // editMode="row"
        // isCellEditable={() => false}
        // isRowSelectable={() => false}
        // disableColumnSelector
      />
    </Box>
  );
}
