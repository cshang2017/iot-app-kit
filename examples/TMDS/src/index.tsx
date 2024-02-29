import './global';

import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';


import { Density, Mode, applyDensity, applyMode } from '@cloudscape-design/global-styles';
import '@cloudscape-design/global-styles/index.css';
import '@iot-app-kit/components/styles.css';
import PageLoader from './pages/PageLoader';
import ScenePage from './pages/Home'

applyDensity(Density.Comfortable);
applyMode(Mode.Light);

const root = createRoot(document.getElementById('root')!);

//const Home = lazy(async () => await import('./pages/Home'));

root.render(
  <StrictMode>
    <PageLoader><ScenePage /></PageLoader>
  </StrictMode>
);


