import React, { useState, useRef, useEffect } from "react";

function PomodoroTimer() {
  const [inputMinutes, setInputMinutes] = useState(25);
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(timerRef.current);
  }, []);

  
  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

 
  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };


  const pauseTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  
  const resetTimer = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setSecondsLeft(inputMinutes * 60);
  };

  
  const handleTimeChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setInputMinutes(value);
    setSecondsLeft(value * 60);
    setIsRunning(false);
    clearInterval(timerRef.current);
  };

  
  const shortBreak = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setSecondsLeft(5 * 60);
    setInputMinutes(5);
  };

  
  const longBreak = () => {
    setIsRunning(false);
    clearInterval(timerRef.current);
    setSecondsLeft(15 * 60);
    setInputMinutes(15);
  };

  return (
    <div className="pomodoro-timer">
      <h2>Pomodoro Timer</h2>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Set Minutes:{" "}
          <input
            type="number"
            min="1"
            max="120"
            value={inputMinutes}
            onChange={handleTimeChange}
            disabled={isRunning}
            style={{ width: "60px", fontSize: "1rem", padding: "3px 6px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
        </label>
      </div>
      <div className="timer-display">{formatTime(secondsLeft)}</div>
      <div className="timer-buttons">
        <button onClick={startTimer} disabled={isRunning}>Start</button>
        <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
        <button onClick={resetTimer}>Reset</button>
        <button onClick={shortBreak}>Short Break</button>
        <button onClick={longBreak}>Long Break</button>
      </div>
    </div>
  );
}

export default PomodoroTimer;
