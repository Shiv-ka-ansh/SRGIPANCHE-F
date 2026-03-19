/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './lib/auth';
import { AnimatedRoutes } from './components/AnimatedRoutes';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <CustomCursor />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}
