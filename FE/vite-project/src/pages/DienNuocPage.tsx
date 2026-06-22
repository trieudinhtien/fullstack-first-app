import { Card, CardContent, Grid, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

import TableBasic from "@components/TableBasic";

const columns: any[] = [
  { id: "name", label: "Mã HĐ", minWidth: 170 },
  { id: "address", label: "Người thuê", minWidth: 100 },
  {
    id: "no_room",
    label: "Từ Ngày",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "fill",
    label: "Đến Ngày",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
  {
    id: "status",
    label: "Giá Thuê",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toFixed(2),
  },
];

const rows = [];

export default function DienNuocPage() {
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
          Hợp Đồng
        </Typography>
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
                  Đang Hiệu Lực
                </Typography>
                <Typography variant="h5" component="div">
                  8
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", mb: 1.5 }}
                ></Typography>
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
                  Sắp Hết Hạn
                </Typography>
                <Typography variant="h5" component="div">
                  43
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", mb: 1.5 }}
                ></Typography>
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
                  Đã Kết Thúc
                </Typography>
                <Typography variant="h5" component="div">
                  3
                </Typography>
                <Typography
                  sx={{ color: "text.secondary", mb: 1.5 }}
                ></Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <TableBasic
          title="Danh Sách Hợp Đồng"
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          columns={columns}
        />
      </Paper>
    </Box>
  );
}
