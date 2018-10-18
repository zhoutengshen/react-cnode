import { pink, red, indigo } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        error: red,
    },
    typography: {
        useNextVariants: true,
    },
});
