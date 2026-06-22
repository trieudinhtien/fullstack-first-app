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

import AddIcon from "@mui/icons-material/Add";
import TableBasic from "@components/TableBasic";
import { deleteArea, getAllArea } from "../../services/area.service";
import ModalAddPage from "./ModalAddPage";
import { messageError, messageSuccess } from "../../../src/utils";

export default function KhuTroPage() {
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [data, setData] = React.useState<any[]>([]);
  const [isShowModalAdd, setShowModalAdd] = React.useState<boolean>(false);
  const [dataEdit, setDataEdit] = React.useState<any>(null);

  const [total, setTotal] = React.useState<number>(0);
  const [totalRoom, setTotalRoom] = React.useState<number>(0);

  const fetchAlldata = async () => {
    const res = await getAllArea(page, rowsPerPage);

    const { data, total } = res;

    const totalRoom = (data ?? []).reduce((total, current) => {
      return total + current.totalRooms;
    }, 0);

    setData(data);
    setTotal(total);
    setTotalRoom(totalRoom);
  };

  React.useEffect(() => {
    fetchAlldata();
  }, []);

  const handleEdit = (item: any) => {
    setDataEdit(item);
  };

  const handleDelete = (id: number | string) => {
    deleteArea(id)
      .then(() => {
        messageSuccess("Successfully");
        fetchAlldata();
      })
      .catch((err) => {
        messageError(err.message);
      });
  };

  const columns: any[] = [
    { id: "name", label: "Tên khu", minWidth: 170 },
    { id: "address", label: "Địa chỉ", minWidth: 100 },
    {
      id: "totalRooms",
      label: "Số phòng",
      minWidth: 170,
    },
    {
      id: "totalFloors",
      label: "Số Tầng",
      minWidth: 170,
    },
    {
      id: "description",
      label: "Mô tả",
      minWidth: 170,
    },
    {
      id: "action",
      label: "Hoạt Động",
      minWidth: 170,
      render: (row: any) => (
        <Box>
          <Button
            sx={{ mr: "5px" }}
            variant="outlined"
            size="small"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={() => handleDelete(row.id)}
          >
            Delete
          </Button>
        </Box>
      ),
    },
  ];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage - 1);
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

        <Button
          startIcon={<AddIcon />}
          variant="contained"
          onClick={() => setShowModalAdd(true)}
        >
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
                  {total}
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
                  {totalRoom}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  trên {total} khu
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
                  {`41/${totalRoom} phòng`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      <Paper variant="outlined" sx={{ p: 2 }}>
        <TableBasic
          title="Danh Sách Khu Trọ"
          rows={data}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          columns={columns}
          count={total}
        />
      </Paper>

      {isShowModalAdd && (
        <ModalAddPage
          open={isShowModalAdd}
          cancel={() => setShowModalAdd(false)}
          refetch={() => fetchAlldata()}
        ></ModalAddPage>
      )}

      {dataEdit && (
        <ModalAddPage
          open={!!dataEdit}
          dataEdit={dataEdit}
          isEditModal
          cancel={() => setDataEdit(null)}
          refetch={() => fetchAlldata()}
        ></ModalAddPage>
      )}
    </Box>
  );
}
