import React, { useState, useEffect } from "react";
import moment from "moment";

export const Timer = ({ deadline }) => {
  const [remainingTime, setRemainingTime] = useState(0);

  useEffect(() => {
    if (deadline) {
      const intervalId = setInterval(() => {
        const remainingTimeInMs = moment(deadline).diff(moment());
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

  return (
    <div className="tasks__item__dateBox">
      {deadline !== "Not set" ? (
        <div>
          <p className="tasks__item__dateText">Remaining time:</p>
          <p className="tasks__item__date">
            {moment(remainingTime).format("YYYY-MM-DD HH:mm:ss")}
          </p>
        </div>
      ) : (
        <p className="tasks__item__date">No deadline set</p>
      )}
    </div>
  );
};
