import React from 'react';
import { Loader as LoaderWrapper } from './loader.styled';
import { LinearProgress } from '@mui/material';

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color="primary" />
  </LoaderWrapper>
);

export default Loader;
