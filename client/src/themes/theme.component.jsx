import React, { useMemo } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Palette from './palette.theme';
import CustomShadows from './shadows.theme';
import Typography from './typography.theme';
import useStyles, { styles } from './theme.styled';
import GlobalStyles from '@mui/material/GlobalStyles';

const ThemeCustomization = ({ children }) => {
    const [classes] = useStyles();

    const themeCustomPalette = Palette('light', 'default');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const themeTypography = Typography(`Roboto`);
    const themeCustomShadows = useMemo(() => CustomShadows(themeCustomPalette), [themeCustomPalette]);

    const themeOptions = useMemo(() => {
        return {
            breakpoints: {
                values: {
                    xs: 0,
                    sm: 768,
                    md: 1024,
                    lg: 1266,
                    xl: 1536
                    // xl: 1680
                }
            },
            spacing: (factor) => `${0.25 * factor}rem`,
            shape: {
                borderRadius: 2
            },
            direction: 'ltr',
            mixins: {
                toolbar: {
                    minHeight: 60,
                    paddingTop: 8,
                    paddingBottom: 8
                }
            },
            palette: themeCustomPalette,
            shadows: themeCustomShadows,
            typography: themeTypography
        };
    }, [themeCustomPalette, themeTypography, themeCustomShadows]);

    const themes = createTheme(themeOptions);

    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                <GlobalStyles styles={styles[classes.globalStyles]?.(themes)} />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default ThemeCustomization;
