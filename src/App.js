import React, { useState, useEffect } from 'react';
import './App.css';

const App = (props: any) => {
  const { initialMinute = 25, initialSeconds = 0, initialBreak = 5, initialSession = 25 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [breakMinutes, setBreakMinutes] = useState(initialBreak);
  const [sessionMinutes, setSessionMinutes] = useState(initialSession);
  const [breakOrSession, setBreakOrSession] = useState('Session');
  const [isOn, toggleIsOn] = useState(false);

  const setType = (minutes, seconds) => {
    if (minutes === 0 && seconds === 0 && breakOrSession === 'Session') {
      setBreakOrSession('Break');
      setMinutes(breakMinutes);
      document.getElementById('beep').play();
    } else if (minutes === 0 && seconds === 0 && breakOrSession === 'Break') {
      setBreakOrSession('Session');
      setMinutes(sessionMinutes);
      document.getElementById('beep').play();
    }
  };

  useEffect(() => {
    if (isOn) {
      let countDown = setInterval(() => {
        setType(minutes, seconds);
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(countDown);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(countDown);
      };
    }
  });

  const reset = () => {
    toggleIsOn(false);
    setBreakOrSession('Session');
    setMinutes(25);
    setSeconds(0);
    setSessionMinutes(25);
    setBreakMinutes(5);
  };

  const incrementBreak = () => {
    toggleIsOn(false);
    if (sessionMinutes !== 60) {
      setBreakMinutes(breakMinutes + 1);
      setMinutes(breakMinutes + 1);
      setSeconds(0);
    }
    setBreakOrSession('Break');
  };

  const decrementBreak = () => {
    toggleIsOn(false);
    if (breakMinutes !== 0) {
      setBreakMinutes(breakMinutes - 1);
      setMinutes(breakMinutes - 1);
      setSeconds(0);
    }
    setBreakOrSession('Break');
  };

  const incrementSession = () => {
    toggleIsOn(false);
    if (sessionMinutes !== 60) {
      setSessionMinutes(sessionMinutes + 1);
      setMinutes(sessionMinutes + 1);
      setSeconds(0);
    }
    setBreakOrSession('Session');
  };

  const decrementSession = () => {
    toggleIsOn(false);
    if (sessionMinutes !== 0) {
      setSessionMinutes(sessionMinutes - 1);
      setMinutes(sessionMinutes - 1);
      setSeconds(0);
    }
    setBreakOrSession('Session');
  };

  return (
    <div className='container'>
      <div className='row justify-content-center'>
        <div id='time-left' className='large-text'>
          {
            <p>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds} left in the
            </p>
          }
        </div>
        <p id='timer-label' className='large-text'>
          {breakOrSession}
        </p>
      </div>
      <div className='row'>
        <button id='start_stop' onClick={() => toggleIsOn(!isOn)} className='btn btn-success col-sm'>
          Start Stop
        </button>
        <button id='reset' onClick={() => reset()} className='btn btn-danger col-sm'>
          Reset
        </button>
      </div>
      <div id='change-break' className='row justify-content-center'>
        <button id='break-decrement' onClick={() => decrementBreak()} className='btn btn-info'>
          Decrease Break
        </button>
        <p id='break-label' className='large-text'>
          Break Length:{' '}
        </p>
        <p id='break-length' className='large-text'>
          {breakMinutes}:00
        </p>

        <button id='break-increment' onClick={() => incrementBreak()} className='btn btn-info'>
          Increase Break
        </button>
      </div>
      <div id='change-session' className='row justify-content-center large-text'>
        <button id='session-decrement' onClick={() => decrementSession()} className='btn btn-info'>
          Decrease Session
        </button>
        <p id='session-label' className='large-text'>
          Session Length:{' '}
        </p>
        <p id='session-length' className='large-text'>
          {sessionMinutes}:00
        </p>

        <button id='session-increment' onClick={() => incrementSession()} className='btn btn-info'>
          Increase Session
        </button>
      </div>
      <audio id='beep'>
        <source src='https://www.soundjay.com/button/beep-01a.mp3'></source>
      </audio>
    </div>
  );
};
export default App;
