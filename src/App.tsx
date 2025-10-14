import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import WeightliftingComparison from "./components/WeightliftingComparison";
import "./App.css";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#161616ff",
    },
    primary: {
      main: "#bababaff",
    },
    text: {
      primary: "#eeeeeeff",
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WeightliftingComparison />
    </ThemeProvider>
  );
}

export default App;
