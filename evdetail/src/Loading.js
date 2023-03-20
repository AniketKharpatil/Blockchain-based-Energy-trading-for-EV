import React, { useEffect, useState,useRef } from "react";
import "./battery.css";

function Load () {
    const [realTime, setRealTime] = useState(false);
    const [counter, setCounter] = useState(10);
    const countRef = useRef(counter);
    const manageRealTime = () => {
        setRealTime(!realTime);
      }
countRef.current = counter;
    useEffect(() => {
        let interval;
        if (realTime) {
          interval = setInterval(() => {
            let currCount = countRef.current;
            setCounter(currCount => currCount + 1);
          }, 1000);
        } else {
            clearInterval(interval);
        }
       return () => clearInterval(interval);
      }, [realTime]);
      
    //   manageRealTime();
    return(
        <div class="g-container">
           
            <div class="g-number">{counter}%</div>
            <div class="g-contrast">
                <div class="g-circle"></div>
        <ul class="g-bubbles">
        <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
        </ul>
        </div>
        </div>
        

    );
}

export default Load;
