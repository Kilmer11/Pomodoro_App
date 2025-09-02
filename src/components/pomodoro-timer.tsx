import React, {
  JSX,
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { useInterval } from '../hooks/use-interval';
import Button from './button';
import Timer from './timer';
import secondsToTime from '../utils/seconds-to-time';
import { PomodoroContext } from '../hooks/pomodoroContext';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellStart = require('../sounds/bell-start.mp3');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bellFinish = require('../sounds/bell-finish.mp3');

function PomodoroTimer(): JSX.Element {
  const { settings } = useContext(PomodoroContext);

  const [mainTime, setMainTime] = useState(settings.defaultPomodoroTime);
  const [timeCounting, setTimeCounting] = useState(false);
  const [working, setWorking] = useState(false);
  const [resting, setResting] = useState(false);
  const [cycles, setCycles] = useState(
    new Array(settings.cycles - 1).fill(true),
  );
  const [completedCycles, setCompletedCycles] = useState(0);
  const [totalWorkSeconds, setTotalWorkSeconds] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const audioStartWorking = useMemo(() => new Audio(bellStart), []);
  const audioStopWorking = useMemo(() => new Audio(bellFinish), []);
  const initialState: boolean = useMemo(
    () => !working && !resting,
    [working, resting],
  );

  useInterval(
    () => {
      setMainTime((prev) => prev - 1);
      if (working) setTotalWorkSeconds((prev) => prev + 1);
    },
    timeCounting ? 1000 : null,
  );

  const configureWork = useCallback(() => {
    setTimeCounting(true);
    setWorking(true);
    setResting(false);
    setMainTime(settings.defaultPomodoroTime);
    audioStartWorking.play();
  }, [settings.defaultPomodoroTime]);

  const configureRest = useCallback(
    (long: boolean) => {
      setTimeCounting(true);
      setWorking(false);
      setResting(true);
      audioStopWorking.play();

      setMainTime(long ? settings.longRestTime : settings.shortRestTime);
    },
    [settings.shortRestTime, settings.longRestTime],
  );

  const reset = () => {
    setMainTime(settings.defaultPomodoroTime);
    setTimeCounting(false);
    setWorking(false);
    setResting(false);
    setCycles(new Array(settings.cycles - 1).fill(true));
    setCompletedCycles(0);
    setTotalWorkSeconds(0);
    setPomodoroCount(0);

    document.body.classList.remove('working');
  };

  useEffect(() => {
    if (working) document.body.classList.add('working');
    if (resting) document.body.classList.remove('working');
    if (mainTime > 0) return;

    if (working) {
      if (working && cycles.length > 0) {
        configureRest(false);
        setCycles((prev) => prev.slice(0, -1));
      } else if (working && cycles.length <= 0) {
        configureRest(true);
        setCycles(new Array(settings.cycles - 1).fill(true));
        setCompletedCycles((prev) => prev + 1);
      }
      setPomodoroCount((prev) => prev + 1);
    } else if (resting) {
      configureWork();
    }
  }, [
    working,
    resting,
    mainTime,
    timeCounting,
    cycles,
    settings.cycles,
    configureRest,
    configureWork,
    setCycles,
    setCompletedCycles,
    setPomodoroCount,
  ]);

  return (
    <div className="pomodoro">
      <h1>You are {working ? 'working' : 'resting'}!</h1>
      <Timer mainTime={mainTime} />
      <div className="controls">
        <Button text="Work" onClick={() => configureWork()} />
        <Button
          text={timeCounting ? 'Pause' : 'Play'}
          onClick={() =>
            initialState ? configureWork() : setTimeCounting((prev) => !prev)
          }
        />
        <Button
          text="Rest"
          className={initialState ? 'hidden' : ''}
          onClick={() => configureRest(false)}
        />
        <Button
          text="Reset"
          className={initialState ? 'hidden' : ''}
          onClick={() => reset()}
        />
      </div>

      <div className="details">
        <p>Ciclos concuídos: {completedCycles}</p>
        <p>Horas trabalhadas: {secondsToTime(totalWorkSeconds)}</p>
        <p>Número de pomodoros: {pomodoroCount}</p>
      </div>
    </div>
  );
}

export default PomodoroTimer;
