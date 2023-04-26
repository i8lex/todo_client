import React, { useState, useEffect } from "react";
import {
  formatDistanceToNowStrict,
  parseISO,
  differenceInMilliseconds,
} from "date-fns";
// import moment from "moment";

export const Timer = ({ deadline }) => {
  const [remainingTime, setRemainingTime] = useState(null);
  const [remainingTimeClock, setRemainingTimeClock] = useState(null);
  const [animation, setAnimation] = useState(" ");
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimation(animation === " " ? ":" : " ");
    }, 1000);
    return () => clearInterval(intervalId);
  }, [animation]);

  useEffect(() => {
    if (deadline !== "Not set") {
      const deadlineDate = new Date(deadline);
      const intervalId = setInterval(() => {
        const now = new Date();
        const remainingTimeInMs = differenceInMilliseconds(deadlineDate, now);
        if (remainingTimeInMs < 0) {
          clearInterval(intervalId);
          setRemainingTimeClock(0);
        } else {
          setRemainingTimeClock(remainingTimeInMs);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [deadline]);

  useEffect(() => {
    if (deadline !== "Not set") {
      const deadlineDate = parseISO(deadline);
      const intervalId = setInterval(() => {
        const now = new Date();
        const remainingTimeInMs = deadlineDate - now;
        if (remainingTimeInMs < 0) {
          clearInterval(intervalId);
          setRemainingTime(0);
        } else {
          const remainingTime = formatDistanceToNowStrict(deadlineDate, {
            addSuffix: true,
            includeSeconds: true,
          });
          setRemainingTime(remainingTime);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [deadline]);

  const seconds = Math.floor((remainingTimeClock / 1000) % 60);
  const minutes = Math.floor((remainingTimeClock / (1000 * 60)) % 60);
  const hours = Math.floor((remainingTimeClock / (1000 * 60 * 60)) % 24);
  const days = Math.floor(remainingTimeClock / (1000 * 60 * 60 * 24));

  return (
    <div>
      <p className="tasks__item__dateText">Remaining time:</p>
      {deadline !== "Not set" ? (
        <>
          {days >= 1 ? (
            <p className="tasks__item__date">{remainingTime}</p>
          ) : (
            <>
              {remainingTime <= 0 ? (
                <p className="tasks__item__timeUp">TIME IS UP!!!</p>
              ) : (
                <div className="tasks__item__clockBox">
                  <p className="tasks__item__clock">{` ${hours
                    .toString()
                    .padStart(2, "\u2007\u2007")}${animation}${minutes
                    .toString()
                    .padStart(2, "0")}${animation}${seconds
                    .toString()
                    .padStart(2, "0")}`}</p>
                  <p className="tasks__item__clockBcg">88:88:88</p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <p className="tasks__item__date">No deadline set</p>
      )}
    </div>
  );
};
