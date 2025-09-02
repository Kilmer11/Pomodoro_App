import React, { JSX, useContext, useState } from 'react';
import { PomodoroContext } from '../hooks/pomodoroContext';
import { useNavigate } from 'react-router-dom';
import secondsToTime from '../utils/seconds-to-time';

function Config(): JSX.Element {
  const { settings, updateSettings } = useContext(PomodoroContext);
  const [form, setForm] = useState(settings);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueToNumber = Number(e.target.value);
    setForm({
      ...form,
      [e.target.name]: valueToNumber > 0 ? [e.target.value] : 1,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
  };

  const inputs = [
    {
      id: 'work',
      name: 'defaultPomodoroTime',
      label: 'Pomodoro time',
      placeholder: 'Configure your working time',
    },
    {
      id: 'short-time',
      name: 'shortRestTime',
      label: 'Short rest',
      placeholder: 'Configure your short rest',
    },
    {
      id: 'long-time',
      name: 'longRestTime',
      label: 'Long rest',
      placeholder: 'Configure your long rest',
    },
    {
      id: 'cycles',
      name: 'cycles',
      label: 'Number of cycles',
      placeholder: 'Configure your long rest',
    },
  ];

  return (
    <div className="config-template">
      <h1>Configure your pomodoro</h1>

      <form onSubmit={handleSubmit}>
        {inputs.map(({ id, name, label }) => (
          <div className="div-input" key={id}>
            <label htmlFor={id}>
              {label} current:
              {name !== 'cycles'
                ? secondsToTime(Number(form[(name as keyof typeof form) || '']))
                : form[(name as keyof typeof form) || '']}
            </label>

            <input
              id={id}
              name={name}
              placeholder={
                String(form[(name as keyof typeof form) || '']) + ' ms'
              }
              value={form[(name as keyof typeof form) || '']}
              onChange={handleChange}
              type="text"
            />
          </div>
        ))}

        {/* <Button text="Define" /> */}
        <button onClick={() => navigate('/')}>Save</button>
      </form>
    </div>
  );
}

export default Config;
