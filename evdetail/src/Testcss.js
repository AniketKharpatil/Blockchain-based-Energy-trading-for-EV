import React, { useState } from "react";
import Web3 from "web3";
// import CircularProgress from '@mui/material/CircularProgress';
import abi from "./EVabi";
import "./style.css";


function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [chargeAmt, setcharge] = useState("");
  const [status, setStatus] = useState("");

  const[rate,setRATE]=useState("");

  const [displayevID, setEvUserID] = useState("");
  const [displaynumberPlate, setEvUsernumberPlate] = useState("");
  const [displayTime, setEvUserTime] = useState("");
  const [displayBatteryStatus, setEvUserBatteryStatus] = useState("");
  const [disCapacity, setEvUserCapacity] = useState(null);

  const addr="0x69f9EA32159c8fC5294Ad7F27e58692bE25Bd98b";
  // Connect to Web3 and instantiate the contract
  const connectWeb3 = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.enable();
        const web3 = new Web3(window.ethereum);
        const contract = new web3.eth.Contract(
          abi,addr
        );
        setWeb3(web3);
        setContract(contract);
        
        alert("Connected to Web3");
        setStatus("Connected to Web3");
      } catch (error) {
        console.error(error);
        alert("Failed to Connect to Web3");
        setStatus("Failed to connect to Web3.");
        
      }
    } else {
       alert("Please install MetaMask to use this dApp");
      setStatus("Please install MetaMask to use this dApp.");
    }
  };

  const getRate=async()=>{
    const pvresult=await contract.methods.getRate().call();
    setRATE(pvresult[0]);
  };

  // Add an EV user to the contract
  const addEVUser = async () => {
    const timestamp = Date.now();
    try {
      await contract.methods
        .addEV(
          userAddress,
          50, // default battery status
          100, // default capacity
          "EV001", // default EV ID
          "ABC-123" // default number plate
        )
        .send({ from: userAddress });
      setStatus("Added EV user successfully.");
    } catch (error) {
      console.error(error);
      setStatus("Failed to Register EV user.");
      
      alert("Error! Failed to Register EV user");
    }
  };

  const chargeEV = async () => {
    try {
        getRate();
        const accounts = await web3.eth.getAccounts();
        if(chargeAmt<displayBatteryStatus)
            {alert("Enter greater charge value !!");}
        else{
            const result = await contract.methods.transfer(chargeAmt,userAddress).send({
            from: accounts[0],
            value: web3.utils.toWei((rate*(chargeAmt-displayBatteryStatus)).toString(),"gwei"), // Replace with the amount you want to transfer
            });
        console.log(result);
        alert("Transaction successful!!! Your EV is charging");
        
        }
    } catch (error) {
      alert("Error! Transaction failed !!");
    }

  };
  

  const disEv=async()=>{
   try { 
    const evresult=await contract.methods.displayEVUser(userAddress).call();
    setEvUserBatteryStatus(evresult[0]);
    setEvUserCapacity(evresult[1])
    setEvUserID(evresult[2]);
    setEvUserTime(evresult[3]);
    setEvUsernumberPlate(evresult[4]);}
    catch (error) {
      console.error(error);
      setStatus("Failed to display");
      alert("Error!  Enter correct address !!");
    }
  };

  return (
    <div class="frame">
      <h1>EV Charging Station</h1>
      <p>{status}</p>
      {web3 === null ? (
        <button onClick={connectWeb3}>Connect to Web3</button>
      ) : (
        <>
          <p>Connected account: {userAddress}</p>
          <p>
            <label>Account:</label>
            <input type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
          </p>
          
          <p><h1>
          <button onClick={addEVUser}>Register EV user</button>
          </h1></p>

          <p>
            <label>Enter how much to charge:</label>
            <input type="text" value={chargeAmt} onChange={(e) => setcharge(e.target.value)} />
          </p>

          <p>
            <button onClick={chargeEV}>Charge EV</button>
          </p>
          <br></br>


          <p>
            <label>Enter the address</label>
            <input type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
          </p>
          <p>
            <button onClick={disEv}>Display EV details</button>
            <div class="inputfield" >
                EV ID: {displayevID}
                <br />
                Timestamp: {displayTime}
                <br />
                EV Battery status: {displayBatteryStatus}
                <br />
                Number Plate: {displaynumberPlate}
                <br />
                Capacity: {disCapacity}
        </div>
          </p>
        </>
      )}
    </div>
  );
}

export default App;
