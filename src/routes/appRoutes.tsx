import React, { JSX } from 'react';
import { Route, Routes } from 'react-router-dom';

import PomodoroTimer from '../components/pomodoro-timer';
import Config from '../pages/config';

function AppRoutes(): JSX.Element {
  const routes = [
    {
      path: '/',
      element: <PomodoroTimer />,
    },
    { path: '/config', element: <Config /> },
  ];

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route key={path} path={path} element={element} />
      ))}
    </Routes>
  );
}

export default AppRoutes;
