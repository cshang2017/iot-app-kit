import './global';

import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { StrictMode, lazy } from 'react';

import { Density, Mode, applyDensity, applyMode } from '@cloudscape-design/global-styles';
import '@cloudscape-design/global-styles/index.css';
import '@iot-app-kit/components/styles.css';

applyDensity(Density.Comfortable);
applyMode(Mode.Light);

import { PageLoader } from './pages';

const root = createRoot(document.getElementById('root'))

const Home = lazy(async () => await import('./pages/Home'));

root.render(
    <StrictMode>
        <PageLoader><Home /></PageLoader>
    </StrictMode>
)