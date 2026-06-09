import { FacebookIcon, GoogleIcon } from "@components/CustomIcon";
import {
  Card,
  Box,
  styled,
  Typography,
  Divider,
  FormControl,
  Button,
  FormLabel,
  TextField,
  Grid,
} from "@mui/material";
import React from "react";
import { createUser } from "../../../src/services/auth.services";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

const CardUI = styled(Card)(() => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "400px",
  margin: "auto",
  padding: 25,
}));

const SignUp = () => {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [firstNameError, setFirstNameError] = React.useState(false);
  const [firstNameErMessage, setFirstNameErMessage] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState(false);
  const [lastNamErMessage, setLastNamErMessage] = React.useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const firstName = document.getElementById("firstName") as HTMLInputElement;
    const lastName = document.getElementById("lastName") as HTMLInputElement;

    console.log("email:", email.value);
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!firstName.value) {
      setFirstNameError(true);
      setFirstNameErMessage("Please enter first name.");
    } else {
      setFirstNameError(false);
      setFirstNameErMessage("");
    }

    if (!lastName.value) {
      setLastNameError(true);
      setLastNamErMessage("Please enter last name.");
    } else {
      setLastNameError(false);
      setLastNamErMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    return isValid;
  };
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    validateInputs();

    if (emailError || passwordError) {
      return;
    }
    const data = new FormData(event.currentTarget);

    const user = {
      password: data.get("password"),
      email: data.get("email"),
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
    };

    createUser(user)
      .then(() => {
        enqueueSnackbar("Register Successfully !", {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "success",
        });

        navigate("/sign-in");
      })
      .catch((error) =>
        enqueueSnackbar(`${error.message}`, {
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          variant: "error",
        })
      );
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(7deg,rgba(48, 144, 179, 1) 27%, rgba(37, 221, 245, 1) 75%, rgba(51, 214, 211, 1) 97%);",
      }}
    >
      <CardUI variant="outlined">
        <Typography
          component={"h1"}
          variant="h4"
          sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
        >
          Sign up
        </Typography>
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
          <Grid container spacing={2}>
            <Grid size={6}>
              <FormControl>
                <FormLabel required htmlFor="email">
                  Fist Name
                </FormLabel>
                <TextField
                  error={firstNameError}
                  helperText={firstNameErMessage}
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  autoComplete="email"
                  size="small"
                  required
                  fullWidth
                  color={firstNameError ? "error" : "primary"}
                />
              </FormControl>
            </Grid>
            <Grid size={6}>
              <FormControl>
                <FormLabel required htmlFor="email">
                  Last Name
                </FormLabel>
                <TextField
                  error={lastNameError}
                  helperText={lastNamErMessage}
                  id="lastName"
                  placeholder="Last Name"
                  type="text"
                  name="lastName"
                  required
                  size="small"
                  fullWidth
                  variant="outlined"
                  color={lastNameError ? "error" : "primary"}
                />
              </FormControl>
            </Grid>
          </Grid>

          <FormControl>
            <FormLabel required htmlFor="email">
              Email
            </FormLabel>
            <TextField
              error={emailError}
              helperText={emailErrorMessage}
              id="email"
              type="email"
              name="email"
              size="small"
              placeholder="your@email.com"
              autoComplete="email"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={emailError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel required htmlFor="password">
              Password
            </FormLabel>
            <TextField
              error={passwordError}
              helperText={passwordErrorMessage}
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              size="small"
              autoComplete="current-password"
              autoFocus
              required
              fullWidth
              variant="outlined"
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <Button type="submit" fullWidth variant="contained">
            Sign up
          </Button>
        </Box>
        <Divider>or</Divider>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Google")}
            startIcon={<GoogleIcon />}
          >
            Sign in with Google
          </Button>
          <Button
            fullWidth
            variant="outlined"
            onClick={() => alert("Sign in with Facebook")}
            startIcon={<FacebookIcon />}
          >
            Sign in with Facebook
          </Button>
        </Box>
      </CardUI>
    </Box>
  );
};

export default SignUp;
