import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useMode from "@stores/theme";
import RenderRouter from "./routes";

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
      <Router>
        <RenderRouter />
      </Router>
    </ThemeProvider>
  );
}

export default App;
