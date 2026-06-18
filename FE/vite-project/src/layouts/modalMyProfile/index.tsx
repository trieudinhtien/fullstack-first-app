import {
  Avatar,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import React from "react";
import useUser from "@stores/user";
import { messageError, messageSuccess, removeToken } from "../../utils";
import {
  deleteUser,
  updateAvatar,
  updateUser,
} from "../../services/auth.services";
import PopupConfirm from "@components/popupConfirm";
import { useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 12,
  borderRadius: "5px",
  p: 2,
};

interface IProps {
  open: boolean;
  handleCancel: () => void;
}

const ModalMyProfile = ({ open, handleCancel }: IProps) => {
  const navigate = useNavigate();
  const userInfo = useUser((state) => state.user);
  const setUser = useUser((state) => state.setUser);

  const [openConfirm, setOpenConfirm] = React.useState<boolean>(false);

  const [imageAvatar, setAvatarSrc] = React.useState<string>("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);

      const input = {
        firstName: formData.get("firstName"),
        lastName: formData.get("lastName"),
        age: formData.get("age"),
        country: formData.get("country"),
        image: userInfo.image || null,
        id: userInfo.id,
      };

      const result = await updateUser(userInfo.id, input);

      const { data, message } = result;

      setUser(data);

      messageSuccess(message);
    } catch (error) {
      messageError(error.message);
    }
  };

  const handleDelete = () => {
    const id = userInfo.id;

    deleteUser(id)
      .then((data) => {
        messageSuccess(data?.data?.message);
        removeToken();
        navigate("/sign-in");
      })
      .catch((error) => messageError(error.message));
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Read the file as a data URL
      const reader = new FileReader();
      reader.onload = () => {
        setAvatarSrc(reader.result as string);

        if (reader.result) {
          updateAvatar(userInfo.id, reader.result)
            .then(() => {
              messageSuccess("Change successFully");
              setUser({ ...userInfo, image: reader.result });
            })
            .catch((err) => messageError(err.message));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleCancel}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          My Profile
        </Typography>

        <Grid container spacing={2} sx={{ marginTop: "20px" }}>
          <Grid size={4}>
            <Stack
              direction={"column"}
              spacing={2}
              sx={{ alignItems: "center" }}
            >
              <Avatar
                alt="Remy Sharp"
                src={userInfo?.image ? userInfo?.image : "/no-avatar.jpg"}
                sx={{ width: 100, height: 100 }}
              />
              <Button
                sx={{ p: 0, width: "max-content", textAlign: "center" }}
                variant="outlined"
                size="small"
                startIcon={<ImageOutlinedIcon />}
                component="label"
              >
                Edit
                <input
                  type="file"
                  accept="image/*"
                  style={{
                    border: 0,
                    clip: "rect(0 0 0 0)",
                    height: "1px",
                    margin: "-1px",
                    overflow: "hidden",
                    padding: 0,
                    position: "absolute",
                    whiteSpace: "nowrap",
                    width: "1px",
                  }}
                  onChange={handleAvatarChange}
                />
              </Button>
            </Stack>
          </Grid>
          <Grid size={8}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{
                display: "flex",
                flexDirection: "column",
                width: "100%",
                gap: 2,
              }}
            >
              <FormControl>
                <FormLabel sx={{ fontSize: "10px" }} htmlFor="firstName">
                  First Name
                </FormLabel>
                <TextField
                  // error={emailError}
                  // helperText={emailErrorMessage}
                  id="firstName"
                  type="text"
                  name="firstName"
                  defaultValue={userInfo?.firstName}
                  size="small"
                  required
                  fullWidth
                  variant="standard"
                />
              </FormControl>
              <FormControl>
                <FormLabel sx={{ fontSize: "10px" }} htmlFor="lastName">
                  Last Name
                </FormLabel>
                <TextField
                  // error={emailError}
                  // helperText={emailErrorMessage}
                  id="lastName"
                  type="text"
                  name="lastName"
                  defaultValue={userInfo?.lastName}
                  size="small"
                  required
                  fullWidth
                  variant="standard"
                />
              </FormControl>
              <FormControl>
                <FormLabel sx={{ fontSize: "10px" }} htmlFor="age">
                  Age
                </FormLabel>
                <TextField
                  // error={emailError}
                  // helperText={emailErrorMessage}
                  id="age"
                  type="number"
                  name="age"
                  size="small"
                  defaultValue={userInfo?.age}
                  required
                  fullWidth
                  variant="standard"
                />
              </FormControl>

              <FormControl>
                <FormLabel sx={{ fontSize: "10px" }} htmlFor="country">
                  Country
                </FormLabel>
                <TextField
                  // error={emailError}
                  // helperText={emailErrorMessage}
                  id="country"
                  type="text"
                  name="country"
                  size="small"
                  defaultValue={userInfo?.country}
                  required
                  fullWidth
                  variant="standard"
                />
              </FormControl>

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button
                  sx={{ width: "fit-content", textAlign: "right", p: 0 }}
                  variant="contained"
                  color="error"
                  onClick={() => setOpenConfirm(true)}
                >
                  Delete Account
                </Button>
                <Button
                  type="submit"
                  sx={{ width: "fit-content", textAlign: "right", p: 0 }}
                  variant="outlined"
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <PopupConfirm
          open={openConfirm}
          close={() => setOpenConfirm(false)}
          onOk={handleDelete}
          title="Are you sure want delete this account ?"
        />
      </Box>
    </Modal>
  );
};

export default ModalMyProfile;
