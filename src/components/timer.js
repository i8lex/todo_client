import React, { useState, useEffect } from "react";
import moment from "moment";

export const Timer = ({ deadline }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (deadline) {
      const intervalId = setInterval(() => {
        const remainingTimeInMs = moment(deadline, moment.ISO_8601).diff(
          moment()
        );
        if (remainingTimeInMs < 0) {
          clearInterval(intervalId);
          setRemainingTime(0);
        } else {
          setRemainingTime(remainingTimeInMs);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [deadline]);

  const seconds = Math.floor((remainingTime / 1000) % 60);
  const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
  const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
  const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

  return (
    <div>
      {deadline !== "Not set" ? (
        <div>
          <p className="tasks__item__dateText">Remaining time:</p>
          {days === 0 ? (
            <>
              {minutes === 0 ? (
                <>
                  {seconds === 0 ? (
                    <p className="tasks__item__timeUp">TIME IS UP!!!</p>
                  ) : (
                    <p className="tasks__item__date">{` ${minutes}m ${seconds}s`}</p>
                  )}
                </>
              ) : (
                <p className="tasks__item__date">{` ${hours}h ${minutes}m ${seconds}s`}</p>
              )}
            </>
          ) : (
            <p className="tasks__item__date">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</p>
          )}
        </div>
      ) : (
        <>
          <p className="tasks__item__dateText">Remaining time:</p>
          <p className="tasks__item__date">No deadline set</p>
        </>
      )}
    </div>
  );
};
