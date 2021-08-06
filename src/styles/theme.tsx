import {createTheme} from "@material-ui/core";
// import { purple, green, orange, deepOrange } from "@material-ui/core/colors";

// Global styles can be moved to a separate file for ease of maintenance.
export const globalOverrides = {
    overrides: {
        MuiCssBaseline: {
            '@global': {
                body: {
                    overflow: 'hidden',
                },
            },
        },
    },
};

export const defaultTheme = {
    palette: {
        primary: {
            main: "#164C5D",
            contrastText: "#fff"
        },
        secondary: {
            main: "#2795B7",
            contrastText: "#fff"
        },
        default: {
            main: "#fff",
            contrastText: "#9999"
        }
    }
}
