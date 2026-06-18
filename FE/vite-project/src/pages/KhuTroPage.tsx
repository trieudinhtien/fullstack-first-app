import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import AddIcon from "@mui/icons-material/Add";

interface Column {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Tên khu", minWidth: 170 },
  { id: "address", label: "Địa chỉ", minWidth: 100 },
  {
    id: "no_room",
    label: "Số phòng",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "fill",
    label: "Đã thuê",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Trạng thái",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

const rows = [];

export default function KhuTroPage() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: "calc(100vw - 256px)", pr: "10px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="h6"
          sx={{ paddingTop: "20px", paddingBottom: "10px" }}
        >
          Khu Trọ
        </Typography>

        <Button startIcon={<AddIcon />} variant="contained">
          Thêm Khu
        </Button>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Grid container spacing={2}>
          <Grid size={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Tổng khu trọ
                </Typography>
                <Typography variant="h5" component="div">
                  8
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  đang hoạt động
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Tổng phòng
                </Typography>
                <Typography variant="h5" component="div">
                  43
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  trên 3 khu
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={4}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  Tỉ lệ lấp đầy (%)
                </Typography>
                <Typography variant="h5" component="div">
                  87%
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  41/43 phòng
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Typography
            sx={{ flex: "1 1 100%", mb: 2 }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Danh sách khu trọ
          </Typography>
          <Table
            sx={{
              border: "1px solid #ddd",
            }}
            stickyHeader
            aria-label="sticky table"
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}
