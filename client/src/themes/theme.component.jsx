import React, { useMemo } from 'react';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import palette from './palette.theme';
import customShadows from './shadows.theme';
import typography from './typography.theme';
import useStyles, { styles } from './theme.styled';
import GlobalStyles from '@mui/material/GlobalStyles';
import componentsOverride from './overrides';

const ThemeCustomization = ({ children }) => {
    const [classes] = useStyles();

    const themeCustomPalette = palette('light', 'default');

    const themeTypography = typography('Roboto');
    const themeCustomShadows = useMemo(() => customShadows(themeCustomPalette), [themeCustomPalette]);

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
    themes.components = componentsOverride(themes);

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
