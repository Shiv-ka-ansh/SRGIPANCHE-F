/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { AnimatedRoutes } from './components/AnimatedRoutes';
import { Analytics } from '@vercel/analytics/react';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AnimatedRoutes />
        <Analytics />
      </Router>
    </AuthProvider>
  );
}
