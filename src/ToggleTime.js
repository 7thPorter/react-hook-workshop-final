import { useContext } from "react";
import { TimeContext, timeOfDay } from "./App.js";

const ToggleTime = () => {
  const { toggleTimeOfDay } = useContext(TimeContext);
  return (
    <button onClick={toggleTimeOfDay}>Let's get this party started</button>
  );
};

export default ToggleTime;
