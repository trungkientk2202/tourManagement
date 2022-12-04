import React from 'react';
import { styled } from '../utils/mui.util';

const PREFIX = 'Theme';
const classes = {
    globalStyles: `${PREFIX}-globalStyles`
};

export const styles = {
    [`${classes.globalStyles}`]: (theme) => ({
        body: {
            backgroundColor: theme.palette.grey[0],
            overflow: 'hidden overlay',
            // Using CSS Overscroll-Behavior
            // To Prevent Scrolling Of Parent Containers From Within Overflow Containers
            overscrollBehavior: 'contain'
        },
        '.container': {
            maxWidth: theme.breakpoints.values.xl,
            width: '100%',
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2),
            marginRight: 'auto',
            marginLeft: 'auto'
        }
    })
};

const Root = styled(React.Fragment)(({ theme }) => ({
    [`& .${classes.globalStyles}`]: styles.globalStyles(theme)
}));

export default function useStyles() {
    return [classes, Root];
}
