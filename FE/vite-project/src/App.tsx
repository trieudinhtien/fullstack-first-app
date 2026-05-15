import { createTheme, ThemeProvider } from "@mui/material/styles";
import ResponsiveAppBar from "./components/Navbar";
import { useMemo } from "react";
import useMode from "./stores/theme";

function App() {
  const mode = useMode((state) => state.mode);

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "Inter, sans-serif",
        },
        palette: {
          mode: mode ? "dark" : "light",
        },
      }),
    [mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <ResponsiveAppBar></ResponsiveAppBar>
        <span>home page</span>
        <div>home page</div>
      </div>
    </ThemeProvider>
  );
}

export default App;
