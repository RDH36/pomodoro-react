import React, { useEffect, useReducer, useState } from "react";
import "./Chrono.css";
import PauseImg from "../Images/pause.svg";
import PlayImg from "../Images/play.svg";
import ResetImg from "../Images/reset.svg";

export default function Chrono() {
  const [sessionTime, setSessionTime] = useState(1500);
  const [sessionTimeFixed, setSessionTimeFixed] = useState(1500);

  const [breackTime, setBreackTime] = useState(300);
  const [breackTimeFixed, setBreackTimeFixed] = useState(300);

  const [workingChrono, setWorkingChrono] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = useReducer(reducer);

  function reducer(state, action) {
    // eslint-disable-next-line default-case
    switch (action.type) {
      case "TICK":
        if (sessionTime >= 0) {
          setSessionTime(sessionTime - 1);
        } else if (breackTime >= 1) {
          setBreackTime(breackTime - 1);
        } else if (breackTime <= 0) {
          setSessionTime(sessionTimeFixed);
          setBreackTime(breackTimeFixed);
        }
    }
  }

  const playPause = () => {
    setWorkingChrono(!workingChrono);
  };

  const session = (e) => {
    let el = e.target;
    if (el.classList.contains("minus")) {
      if (sessionTime / 60 > 1) {
        setSessionTime(sessionTime - 60);
        setSessionTimeFixed(sessionTimeFixed - 60);
      }
    } else if (el.classList.contains("plus")) {
      setSessionTime(sessionTime + 60);
      setSessionTimeFixed(sessionTimeFixed + 60);
    }
  };

  const breakSession = (e) => {
    let el = e.target;
    if (el.classList.contains("minus")) {
      if (breackTime / 60 > 1) {
        setBreackTime(breackTime - 60);
        setBreackTimeFixed(breackTimeFixed - 60);
      }
    } else if (el.classList.contains("plus")) {
      setBreackTime(breackTime + 60);
      setBreackTimeFixed(breackTimeFixed + 60);
    }
  };

  const resetTime = () => {
    setSessionTime(sessionTimeFixed);
  };

  useEffect(() => {
    let id;
    if (workingChrono) {
      id = window.setInterval(() => {
        dispatch({ type: "TICK" });
        console.log("TICK");
      }, 1000);
    }
    return () => {
      window.clearInterval(id);
    };
  }, [workingChrono]);

  return (
    <div
      className={
        workingChrono ? "container-chrono anim-glow" : "container-chrono"
      }
    >
      <div className="container-config">
        <div className="box-btns session">
          <button className="minus" onClick={session}>
            -
          </button>
          <span>{sessionTimeFixed / 60}</span>
          <button className="plus" onClick={session}>
            +
          </button>
        </div>

        <div className="box-btns breack">
          <button className="minus" onClick={breakSession}>
            -
          </button>
          <span>{breackTimeFixed / 60}</span>
          <button className="plus" onClick={breakSession}>
            +
          </button>
        </div>
      </div>
      <h1>
        {sessionTime >= 0 ? (
          <span>{`${Math.trunc(sessionTime / 60)} : ${
            sessionTime % 60 < 10
              ? `0${sessionTime % 60}`
              : `${sessionTime % 60}`
          }`}</span>
        ) : (
          <span>{`${Math.trunc(breackTime / 60)} : ${
            breackTime % 60 < 10 ? `0${breackTime % 60}` : `${breackTime % 60}`
          }`}</span>
        )}
      </h1>
      <div className="container-controllers">
        <button onClick={playPause}>
          <img src={workingChrono ? PlayImg : PauseImg} alt="" />
        </button>
        <button onClick={resetTime}>
          <img src={ResetImg} alt="" />
        </button>
      </div>
    </div>
  );
}
