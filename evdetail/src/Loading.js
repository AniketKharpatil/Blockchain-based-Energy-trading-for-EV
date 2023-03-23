import React, { useEffect, useState,useRef } from "react";
import "./battery.css";

function Load (props) {
    const [count, setCount] = useState(props.initialCount);

    useEffect(() => {
      const interval = setInterval(() => {
       if(count<95) setCount(count => count + 1);
      }, 1000);
      return () => clearInterval(interval);},
      );
   
    return(
        <div class="g-container">
           
            <div class="g-number"> {count}%</div>
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
