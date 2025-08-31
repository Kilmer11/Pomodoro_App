import React, { JSX } from 'react';
import PomodoroTimer from './components/pomodoro-timer';

function App(): JSX.Element {
  return (
    <div className="App">
      <PomodoroTimer
        defaultPomodoroTime={5}
        shortRestTime={1}
        longRestTime={5}
        cycles={4}
      />
    </div>
  );
}

export default App;
