import React, { JSX } from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/appRoutes';
import PomodoroProvider from './hooks/pomodoroContext';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <PomodoroProvider>
        <div className="App">
          <AppRoutes />
        </div>
      </PomodoroProvider>
    </BrowserRouter>
  );
}

export default App;
