'use client'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './route/Web';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Routes>
    </Router>
  );
};

export default AppRouter;