import React, { JSX, useContext, useState } from 'react';
import { PomodoroContext } from '../hooks/pomodoroContext';
import { useNavigate } from 'react-router-dom';

function Config(): JSX.Element {
  const { settings, updateSettings } = useContext(PomodoroContext);
  const [form, setForm] = useState(settings);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: Number(e.target.value) });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  const inputs = [
    {
      id: 'work',
      name: 'defaultPomodoroTime',
      placeholder: 'Configure your working time',
    },
    {
      id: 'short-time',
      name: 'shortRestTime',
      placeholder: 'Configure your short rest',
    },
    {
      id: 'long-time',
      name: 'longRestTime',
      placeholder: 'Configure your long rest',
    },
    {
      id: 'long-time',
      name: 'cycles',
      placeholder: 'Configure your long rest',
    },
  ];

  return (
    <div className="config-template">
      <h1>Configure your pomodoro</h1>

      <form onSubmit={handleSubmit}>
        {inputs.map(({ id, name, placeholder }) => (
          <input
            key={id}
            id={id}
            name={name}
            placeholder={placeholder}
            value={form[(name as keyof typeof form) || '']}
            onChange={handleChange}
            type="text"
          />
        ))}

        {/* <Button text="Define" /> */}
        <button onClick={() => navigate('/')}>Save</button>
      </form>
    </div>
  );
}

export default Config;
