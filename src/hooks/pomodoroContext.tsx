import React, { createContext, useState, ReactNode } from 'react';

interface PomodoroSettings {
  name: string;
  defaultPomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

interface PomodoroContextProps {
  settings: PomodoroSettings;
  updateSettings: (newSettings: PomodoroSettings) => void;
}

const defaultSettings: PomodoroSettings = {
  defaultPomodoroTime: 1500,
  shortRestTime: 300,
  longRestTime: 900,
  cycles: 4,
  name: '',
};

export const PomodoroContext = createContext<PomodoroContextProps>({
  settings: defaultSettings,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateSettings: () => {},
});

function PomodoroProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState(defaultSettings);

  const updateSettings = (newSettings: PomodoroSettings) => {
    setSettings(newSettings);
  };

  return (
    <PomodoroContext.Provider value={{ settings, updateSettings }}>
      {children}
    </PomodoroContext.Provider>
  );
}

export default PomodoroProvider;
