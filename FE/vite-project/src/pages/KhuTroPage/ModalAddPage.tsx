import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Grid } from "@mui/material";
import { createArea, updateArea } from "../../../src/services/area.service";
import { messageSuccess } from "../../../src/utils";
interface Iprops {
  open: boolean;
  cancel: () => void;
  refetch: () => void;
  isEditModal?: boolean;
  dataEdit?: any;
}

const ModalAddPage = ({
  open,
  cancel,
  refetch,
  isEditModal,
  dataEdit,
}: Iprops) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries((formData as any).entries());

    const { name, description, address, totalRooms, totalFloors } = formJson;

    if (isEditModal) {
      await updateArea(dataEdit?.id, {
        name,
        description,
        address,
        totalRooms,
        totalFloors,
      });

      messageSuccess("edit successfully");
      refetch();
      return;
    }
    await createArea({
      name,
      description,
      address,
      totalRooms,
      totalFloors,
    });

    messageSuccess("New Area Created");
    cancel();
    refetch();
  };
  return (
    <React.Fragment>
      <Dialog open={open} onClose={cancel}>
        <DialogTitle>
          {isEditModal ? "Sửa Khu Trọ" : "Thêm Khu Trọ"}{" "}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} id="subscription-form">
            <Grid container spacing={2}>
              <Grid size={6}>
                <TextField
                  required
                  defaultValue={dataEdit ? dataEdit.name : null}
                  margin="dense"
                  id="name"
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  required
                  defaultValue={dataEdit ? dataEdit.address : null}
                  margin="dense"
                  id="address"
                  name="address"
                  label="Address"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={12}>
                <TextField
                  required
                  margin="dense"
                  defaultValue={dataEdit ? dataEdit.description : null}
                  id="description"
                  name="description"
                  label="Description"
                  type="text"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  required
                  margin="dense"
                  defaultValue={dataEdit ? dataEdit.totalRooms : null}
                  id="toatlRooms"
                  name="totalRooms"
                  label="Total Rooms"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
              <Grid size={6}>
                <TextField
                  required
                  margin="dense"
                  id="totalFloors"
                  defaultValue={dataEdit ? dataEdit.totalFloors : null}
                  name="totalFloors"
                  label="Total Floors"
                  type="number"
                  fullWidth
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancel}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default ModalAddPage;
