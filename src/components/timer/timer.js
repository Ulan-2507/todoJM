import React, { useState, useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import { Context } from "../context/constext.js";
import play from "./play-button.svg";
import pause from "./pause-button.svg";

const Timer = ({ id, time, trackStatus, className }) => {
  const { status, updateTimeTrack, updateRunTrack } = useContext(Context);
  const [stateTime, setStateTime] = useState(time);

  const timeTrack = useCallback(() => {
    const increment = (unit) => {
      setStateTime((stateTime) => ({
        ...stateTime,
        [unit]: stateTime[unit] + 1,
      }));
    };

    const reset = (unit) => {
      setStateTime((stateTime) => ({
        ...stateTime,
        [unit]: 0,
      }));
    };

    const minute = () => {
      if (stateTime.minutes === 60) {
        reset("minutes");
        increment("hours");
      }
      increment("minutes");
    };

    const second = () => {
      if (stateTime.seconds === 60) {
        reset("seconds");
        minute();
      }
      increment("seconds");
    };

    second();
    updateTimeTrack(id, stateTime);
  }, [updateTimeTrack, stateTime, id]);

  const formatedTime = () => {
    const { seconds, minutes, hours } = stateTime;
    const hh = hours.toString().padStart(2, "0");
    const mm = minutes.toString().padStart(2, "0");
    const ss = seconds.toString().padStart(2, "0");

    return `${hh} : ${mm} : ${ss}`;
  };
  const handleToggle = () => {
    if (className !== status.COMPLETED) {
      const statusTrack = trackStatus === status.RUN ? status.STOP : status.RUN;
      updateRunTrack(id, statusTrack);
      return;
    }
    return;
  };

  useEffect(() => {
    let timeTrackID;
    if (trackStatus === status.RUN) {
      timeTrackID = setInterval(timeTrack, 1000);
    } else {
      clearInterval(timeTrackID);
    }
    return () => clearInterval(timeTrackID);
  }, [trackStatus, timeTrack, status]);

  const timerToggle = trackStatus === status.RUN ? pause : play;

  return (
    <div className="timer">
      <span>task execution time</span>
      <div className="timer__wrap">
        <span>{formatedTime()}</span>
        <button onClick={handleToggle} className="timer__toggle" type="button">
          <img src={timerToggle} alt="timer toggle" />
        </button>
      </div>
    </div>
  );
};

Timer.defaultProps = {
  time: {
    seconds: 0,
    minutes: 0,
    hours: 0,
  },
  trackStatus: "stop",
};

Timer.propTypes = {
  time: PropTypes.object,
  trackStatus: PropTypes.string,
};
export default Timer;
