import React, { JSX, useEffect, useState } from 'react';
import { useInterval } from '../hooks/use-interval';
import Button from './button';
import Timer from './timer';
import secondsToTime from '../utils/seconds-to-time';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface Props {
  defaultPomodoroTime: number;
  shortRestTime: number;
  longRestTime: number;
  cycles: number;
}

function PomodoroTimer(props: Props): JSX.Element {
  const [mainTime, setMainTime] = useState(props.defaultPomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cycles, setCycles] = useState(new Array(props.cycles - 1).fill(true));
  const [completedCycles, setCompletedCycles] = useState(0);
  const [fullWorkingTime, setFullWorkingTime] = useState(0);
  const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

  useInterval(
    () => {
      setMainTime((prev) => prev - 1);
      if (working) setFullWorkingTime((prev) => prev + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = () => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(props.defaultPomodoroTime);
    audioStartWorking.play();
  };

  const configureRest = (long: boolean) => {
    setTimeCounting(true);
    setWorking(false);
    setResting(true);
    audioStopWorking.play();

    if (long) {
      setMainTime(props.longRestTime);
    } else {
      setMainTime(props.shortRestTime);
    }
  };

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
    if (mainTime > 0) return;

    if (working && cycles.length > 0) {
      configureRest(false);
      cycles.pop();
    } else if (working && cycles.length <= 0) {
      configureRest(true);
      setCycles(new Array(props.cycles - 1).fill(true));
      setCompletedCycles((prev) => prev + 1);
    }

    if (working) setNumberOfPomodoros((prev) => prev + 1);
    if (resting) configureWork();
  }, [
    working,
    resting,
    mainTime,
    cycles,
    configureRest,
    configureWork,
    setCycles,
    setCompletedCycles,
    setNumberOfPomodoros,
    props.cycles,
  ]);

  return (
    <div className="pomodoro">
      <h1>You are {working ? 'working' : 'resting'}!</h1>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />
        <Button
          text="Rest"
          clasName={!working && !resting ? 'hidden' : ''}
          onClick={() => configureRest(false)}
        />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() => setTimeCounting((prev) => !prev)}
        />
      </div>

      <div className="details">
        <p>Ciclos concuídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
        <p>Número de pomodoros: {numberOfPomodoros}</p>
      </div>
    </div>
  );
}

export default PomodoroTimer;
