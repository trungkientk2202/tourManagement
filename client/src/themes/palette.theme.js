import createPalette from '@mui/material/styles/createPalette';

const Palette = (mode, type) => {
    const greyColors = {
        '0': '#ffffff',
        '50': '#fafafa',
        '100': '#f5f5f5',
        '200': '#f0f0f0',
        '300': '#d9d9d9',
        '400': '#bfbfbf',
        '500': '#8c8c8c',
        '600': '#595959',
        '700': '#262626',
        '800': '#141414',
        '900': '#000000',
        A50: '#fafafa',
        A100: '#bfbfbf',
        A200: '#434343',
        A400: '#1f1f1f',
        A700: '#fafafb',
        A800: '#e6ebf1'
    };
    const contrastText = '#fff';

    const paletteColor = {
        secondary: {
            lighter: greyColors[100],
            100: greyColors[100],
            200: greyColors[200],
            light: greyColors[300],
            400: greyColors[400],
            // main: greyColors[500],
            main: greyColors[700],
            600: greyColors[600],
            dark: greyColors[700],
            700: greyColors[700],
            800: greyColors[800],
            darker: greyColors[900],
            900: greyColors[900],
            A100: greyColors[0],
            A200: greyColors.A400,
            A300: greyColors.A700,
            contrastText: greyColors[0]
        },
        primary: {
            lighter: '#e6f7ff',
            '100': '#bae7ff',
            '200': '#91d5ff',
            light: '#69c0ff',
            '400': '#40a9ff',
            // main: '#1890ff',
            main: '#0050b3',
            // dark: '#096dd9',
            dark: '#003a8c',
            '700': '#0050b3',
            darker: '#003a8c',
            '900': '#002766',
            contrastText
        },
        error: {
            lighter: '#fff1f0',
            light: '#ffa39e',
            main: '#ff4d4f',
            dark: '#a8071a',
            darker: '#5c0011',
            contrastText
        },
        warning: {
            lighter: '#fffbe6',
            light: '#ffd666',
            main: '#faad14',
            dark: '#ad6800',
            darker: '#613400',
            contrastText: greyColors[100]
        },
        info: {
            lighter: '#e6fffb',
            light: '#5cdbd3',
            main: '#13c2c2',
            dark: '#006d75',
            darker: '#002329',
            contrastText
        },
        success: {
            lighter: '#f6ffed',
            light: '#95de64',
            main: '#52c41a',
            dark: '#237804',
            darker: '#092b00',
            contrastText
        },
        grey: greyColors
    };

    return createPalette({
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
    });
};

export default Palette;
