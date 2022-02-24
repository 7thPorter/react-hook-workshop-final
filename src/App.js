import React, { useState, useEffect, useRef } from "react";

import "./App.css";
import {
  familyMadrigal,
  mirabelMadrigal,
  camiloMadrigal,
} from "./familyMadrigal.js";
import House from "./House.js";
import ToggleTime from "./ToggleTime.js";

export const timeOfDay = {
  day: "day",
  night: "night",
};

export const TimeContext = React.createContext();

function App() {
  const [madrigal, setMadrigal] = useState(mirabelMadrigal);
  const [weDontTalkAboutBruno, setWeDontTalkAboutBruno] = useState(false);
  const [camiloImage, setCamiloImage] = useState(camiloMadrigal[6]);
  const [time, setTime] = useState(timeOfDay.day);

  useEffect(() => {
    if (madrigal.name === "Camilo") {
      setCamiloImage(camiloMadrigal[6]);
    } else {
      setCamiloImage(camiloMadrigal[Math.ceil(Math.random() * 16)]);
    }
  }, [madrigal]);

  const mirabelSadnessRef = useRef(0);
  const counterRef = useRef(null);

  useEffect(() => {
    if (time === timeOfDay.night) {
      counterRef.current = setInterval(() => {
        mirabelSadnessRef.current += 1;
        console.log(mirabelSadnessRef.current);
      }, 1000);
    } else {
      clearInterval(counterRef.current);
      console.log("Mirabel's Sadness Level: ", mirabelSadnessRef.current);
      mirabelSadnessRef.current = 0;
    }
  }, [time]);

  const handleClick = (familyMember) => {
    if (familyMember.name === "Bruno") {
      setWeDontTalkAboutBruno(true);
    }

    setMadrigal(familyMember);
  };

  return (
    <TimeContext.Provider
      value={{
        time,
        toggleTimeOfDay: () => {
          setTime(time === timeOfDay.day ? timeOfDay.night : timeOfDay.day);
        },
      }}
    >
      <header>
        <img
          src={mirabelMadrigal.image}
          height="300px;"
          alt={mirabelMadrigal.alt}
        />
        <h1>{madrigal.description}</h1>
      </header>
      <main>
        <section>
          {familyMadrigal.map((member) => {
            return (
              <div
                key={member.name}
                onClick={() => handleClick(member)}
                className={
                  member.name === "Bruno" && weDontTalkAboutBruno
                    ? "bruno"
                    : null
                }
              >
                <img
                  src={member.name === "Camilo" ? camiloImage : member.image}
                  alt={member.alt}
                  width="200px"
                  height="200px"
                />
                <br />
                <h2>{member.name}</h2>
              </div>
            );
          })}
        </section>
        <House />
        <ToggleTime />
        <p>{mirabelSadnessRef.current}</p>
      </main>
    </TimeContext.Provider>
  );
}

export default App;
