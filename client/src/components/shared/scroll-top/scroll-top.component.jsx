import React, { useEffect } from 'react';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Slide } from '@mui/material';

const ScrollTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    target: window,
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = () => {
    scrollToTop();
  };

  return (
    <Slide direction="up" in={trigger} mountOnEnter unmountOnExit>
      <Box onClick={handleClick} role="presentation" sx={{ position: 'fixed', bottom: 16, right: 16 }}>
        <Fab size="small" aria-label={'scroll back to top'}>
          <KeyboardArrowUpIcon />
        </Fab>
      </Box>
    </Slide>
  );
};

export default ScrollTop;
