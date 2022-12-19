// ==============================|| OVERRIDES - LINER PROGRESS ||============================== //

export default function LinearProgress() {
    return {
        MuiLinearProgress: {
            styleOverrides: {
                root: {
                    height: 6,
                    borderRadius: 2
                },
                bar: {
                    borderRadius: 2
                }
            }
        }
    };
}
