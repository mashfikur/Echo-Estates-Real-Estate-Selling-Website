import { createTheme, responsiveFontSizes } from "@mui/material/styles";

let theme = createTheme({
  typography: {
    fontFamily: ['"Manrope", sans-serif'],
  },
});

theme = responsiveFontSizes(theme);

export default theme;
