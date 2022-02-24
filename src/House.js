import { useContext } from "react";
import { TimeContext, timeOfDay } from "./App.js";

const House = () => {
  const { time } = useContext(TimeContext);
  return (
    <figure>
      <img
        src={
          time === timeOfDay.day
            ? "/encanto house.jpg"
            : "/encanto-casa-madrigal-at-night-lit-up.jpeg"
        }
        alt={`The casita of the Family Madrigal by ${time}`}
        width="500px"
      />
    </figure>
  );
};

export default House;
