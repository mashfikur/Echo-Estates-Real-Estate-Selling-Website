import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: ['"Libre Franklin", sans-serif'],
  },
});

theme = responsiveFontSizes(theme);

export default theme;
