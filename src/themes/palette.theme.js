// material-ui
import { createTheme } from '@mui/material/styles';

// third-party
import { blue, red, yellow as gold, cyan, green } from '@mui/material/colors';

// project import
const ThemeOption = (colors) => {
    const { blue, red, gold, cyan, green, grey } = colors;

    const greyColors = {
        0: grey[0],
        50: grey[1],
        100: grey[2],
        200: grey[3],
        300: grey[4],
        400: grey[5],
        500: grey[6],
        600: grey[7],
        700: grey[8],
        800: grey[9],
        900: grey[10],
        A50: grey[15],
        A100: grey[11],
        A200: grey[12],
        A400: grey[13],
        A700: grey[14],
        A800: grey[16]
    };
    const contrastText = '#fff';

    return {
        primary: {
            lighter: blue[50],
            100: blue[100],
            200: blue[200],
            light: blue[300],
            400: blue[400],
            main: blue[500],
            dark: blue[600],
            700: blue[700],
            darker: blue[800],
            900: blue[900],
            contrastText
        },
        secondary: {
            lighter: greyColors[100],
            100: greyColors[100],
            200: greyColors[200],
            light: greyColors[300],
            400: greyColors[400],
            main: greyColors[500],
            600: greyColors[600],
            dark: greyColors[700],
            800: greyColors[800],
            darker: greyColors[900],
            A100: greyColors[0],
            A200: greyColors.A400,
            A300: greyColors.A700,
            contrastText: greyColors[0]
        },
        error: {
            lighter: red[50],
            light: red[200],
            main: red[400],
            dark: red[700],
            darker: red[900],
            contrastText
        },
        warning: {
            lighter: gold[50],
            light: gold[300],
            main: gold[500],
            dark: gold[700],
            darker: gold[900],
            contrastText: greyColors[100]
        },
        info: {
            lighter: cyan[50],
            light: cyan[300],
            main: cyan[500],
            dark: cyan[700],
            darker: cyan[900],
            contrastText
        },
        success: {
            lighter: green[50],
            light: green[300],
            main: green[500],
            dark: green[700],
            darker: green[900],
            contrastText
        },
        grey: greyColors
    };
};

const Palette = (mode) => {
    const greyPrimary = [
        '#ffffff',
        '#fafafa',
        '#f5f5f5',
        '#f0f0f0',
        '#d9d9d9',
        '#bfbfbf',
        '#8c8c8c',
        '#595959',
        '#262626',
        '#141414',
        '#000000'
    ];
    const greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
    const greyConstant = ['#fafafb', '#e6ebf1'];

    const grey = { grey: [...greyPrimary, ...greyAscent, ...greyConstant] };

    const paletteColor = ThemeOption({ blue, red, gold, cyan, green, ...grey });

    return createTheme({
        palette: {
            mode,
            common: {
                black: '#000',
                white: '#fff'
            },
            ...paletteColor,
            text: {
                primary: paletteColor.grey[700],
                secondary: paletteColor.grey[500],
                disabled: paletteColor.grey[400]
            },
            action: {
                disabled: paletteColor.grey[300]
            },
            divider: paletteColor.grey[200],
            background: {
                paper: paletteColor.grey[0],
                default: paletteColor.grey.A50
            }
        }
    });
};

export default Palette;
