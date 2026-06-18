import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import useMode from "@stores/theme";
import RenderRouter from "./routes";
import { themeConfig } from "./utils/theme.config";
import type { ThemeOptions } from "@mui/material/styles";

function App() {
  const mode = useMode((state) => state.mode);

  const theme = useMemo(
    () => createTheme(themeConfig(mode) as ThemeOptions),
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
