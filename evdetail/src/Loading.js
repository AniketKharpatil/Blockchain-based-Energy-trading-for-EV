import React, { useEffect, useState,useRef } from "react";
import "./battery.css";
import { useSearchParams } from "react-router-dom";

function Load () {
  const [searchParams] = useSearchParams();
  const value1 = searchParams.get("value1");
  const value2 = searchParams.get("value2");
  const [count,setCount]=useState(parseInt(value1));

    useEffect(() => {
      const interval = setInterval(() => {
       if(count<parseInt(value2)) 
       setCount(count => count + 1);
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
