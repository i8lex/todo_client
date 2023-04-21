import React, { useState, useEffect } from "react";
import { formatDistanceToNowStrict, parseISO } from "date-fns";
import moment from "moment";

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
      const deadlineMoment = moment(deadline); // Создаем момент-объект из даты
      const deadlineMs = deadlineMoment.valueOf(); // Получаем дату в миллисекундах
      const intervalId = setInterval(() => {
        const nowMs = moment().valueOf(); // Получаем текущий момент времени в миллисекундах
        const remainingTimeInMs = deadlineMs - nowMs; // Рассчитываем оставшееся время в миллисекундах
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

  // useEffect(() => {
  //   if (deadline !== "Not set") {
  //     const deadlineMoment = moment(deadline); // Создаем момент-объект из даты
  //     const intervalId = setInterval(() => {
  //       const nowMoment = moment(); // Получаем текущий момент времени
  //       const remainingTimeInMs = deadlineMoment.diff(nowMoment); // Рассчитываем оставшееся время в миллисекундах
  //       if (remainingTimeInMs < 0) {
  //         clearInterval(intervalId);
  //         setRemainingTime(0);
  //       } else {
  //         setRemainingTime(remainingTimeInMs);
  //       }
  //     }, 1000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [deadline]);
  // useEffect(() => {
  //   if (deadline) {
  //
  //     const deadlineDate = new Date(deadline);
  //     const intervalId = setInterval(() => {
  //       const now = new Date();
  //       const remainingTimeInMs = deadlineDate - now;
  //       if (remainingTimeInMs < 0) {
  //         clearInterval(intervalId);
  //         setRemainingTime(0);
  //       } else {
  //         setRemainingTime(remainingTimeInMs);
  //       }
  //     }, 1000);
  //     return () => clearInterval(intervalId);
  //   }
  // }, [deadline]);

  useEffect(() => {
    if (deadline !== "Not set") {
      const deadlineDate = parseISO(deadline); // Преобразуем строку даты в объект даты
      const intervalId = setInterval(() => {
        const now = new Date(); // Создаем объект текущей даты
        const remainingTimeInMs = deadlineDate - now; // Рассчитываем оставшееся время в миллисекундах
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
      <div>
        {deadline !== "Not set" ? (
          <div>
            {days === 0 ? (
              <>
                {minutes === 0 ? (
                  <>
                    {seconds === 0 ? (
                      <></>
                    ) : (
                      <p className="tasks__item__clock">{` 00${animation}${seconds
                        .toString()
                        .padStart(2, "0")}`}</p>
                    )}
                  </>
                ) : (
                  <p className="tasks__item__clock">{` ${hours}${animation}${minutes
                    .toString()
                    .padStart(2, "0")}${animation}${seconds
                    .toString()
                    .padStart(2, "0")}`}</p>
                )}
              </>
            ) : (
              <p className="tasks__item__clock">{`${days}d ${hours}${animation}${minutes
                .toString()
                .padStart(2, "0")}${animation}${seconds
                .toString()
                .padStart(2, "0")}`}</p>
            )}
          </div>
        ) : (
          <></>
        )}
      </div>
      {deadline !== "Not set" ? (
        <>
          {remainingTime <= 0 ? (
            <p className="tasks__item__timeUp">TIME IS UP!!!</p>
          ) : (
            <p className="tasks__item__date">{remainingTime}</p>
          )}
        </>
      ) : (
        <p className="tasks__item__date">No deadline set</p>
      )}
    </div>
  );
};

// return (
//     <div>
//       {deadline !== "Not set" ? (
//           <div>
//             <p className="tasks__item__dateText">Remaining time:</p>
//             {days === 0 ? (
//                 <>
//                   {minutes === 0 ? (
//                       <>
//                         {seconds === 0 ? (
//                             <p className="tasks__item__timeUp">TIME IS UP!!!</p>
//                         ) : (
//                             <p className="tasks__item__date">{` ${minutes}m ${seconds}s`}</p>
//                         )}
//                       </>
//                   ) : (
//                       <p className="tasks__item__date">{` ${hours}h ${minutes}m ${seconds}s`}</p>
//                   )}
//                 </>
//             ) : (
//                 <p className="tasks__item__date">{`${days}d ${hours}h ${minutes}m ${seconds}s`}</p>
//             )}
//           </div>
//       ) : (
//           <>
//             <p className="tasks__item__dateText">Remaining time:</p>
//             <p className="tasks__item__date">No deadline set</p>
//           </>
//       )}
//     </div>
// );
// };
