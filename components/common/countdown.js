import { Button, CircularProgress as Loader } from '@mui/material';
import clsx from 'clsx';
import React, { useEffect, useState } from 'react';

const CountDown = ({ seconds, startText, endText, buttonLabel, buttonCB = () => { }, timeClass, buttonClass }) => {
  // initialize timeLeft with the seconds prop
  const [timeLeft, setTimeLeft] = useState(seconds || 10);
  
  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const se = timeLeft % 60;
  const mi = parseInt(timeLeft / 60);

  const resetTimer = (isSuccess) => {
    if (isSuccess) setTimeLeft(seconds);
  };

  const otpSendHandler = () => {
    buttonCB(resetTimer);
  };

  return (timeLeft ?
    <Button
      color="neutralDark"
      variant="text"
      style={{ opacity: 0.4 }}
      className={'button-button'}
      disableRipple
    >
      <span className={timeClass}>{startText} </span>
      <span className={clsx(["zpx-10", timeClass])}>{`(${mi}:${se < 10 ? '0' + se : se})`} </span>
      <span className={timeClass}>{endText}</span>
    </Button> 
    : 
    buttonLabel ?
      <Button
        color="neutralDark"
        variant="text"
        className={'button-button'}
        style={{ opacity: 0.4 }}
        onClick={otpSendHandler}
      >
        {buttonLabel}
      </Button>
      : null
  );
};


export default CountDown;