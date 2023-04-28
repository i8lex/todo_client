import React from "react";
import { useGetThumbsQuery } from "../providers/redux/images/imageApi";

export const ThumbList = ({ _id, images }) => {
  console.log(_id);
  const { data = [], isLoading } = useGetThumbsQuery(_id);
  if (isLoading) {
    return <h3>...LOADING...</h3>;
  }

  return (
    <>
      {!images.length ? (
        <>
          <h3>You can upload images</h3>
        </>
      ) : (
        <ul className="tasks__item__imageBox">
          {data.map(({ thumb, mimetype, _id }) => {
            return (
              <li className="tasks__item__thumbBox" key={_id}>
                <img
                  alt="Task"
                  className="tasks__thumb"
                  src={`data:${mimetype};base64,${thumb.toString("base64")}`}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};
