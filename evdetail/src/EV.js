import React, { useState } from "react";
import Web3 from "web3";
import abi from "./v5abi";

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [userAddress, setUserAddress] = useState("");
  const [toAddress, setToAddress] = useState("");
  const [status, setStatus] = useState("");

  const [displayevID, setEvUserID] = useState("");
  const [displaynumberPlate, setEvUsernumberPlate] = useState("");
  const [displayTime, setEvUserTime] = useState("");
  const [displayBatteryStatus, setEvUserBatteryStatus] = useState("");
  const [disCapacity, setEvUserCapacity] = useState(null);

  const addr="0x37542eF20dfcD170786d8b4Dd1290CCFF474C484";
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
        setStatus("Connected to Web3.");
      } catch (error) {
        console.error(error);
        setStatus("Failed to connect to Web3.");
      }
    } else {
      setStatus("Please install MetaMask to use this dApp.");
    }
  };

  // Add an EV user to the contract
  const addEVUser = async () => {
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
      setStatus("Failed to add EV user.");
    }
  };

  // Transfer funds to charge an EV
  const chargeEV = async () => {
    try {
      const evUser = await contract.methods.displayEVUser(userAddress).call();
      const toCharge = evUser.capacity - evUser.batteryStatus;
      const amt = toCharge * 1; // cost per unit
      const flag = web3.utils.toBN(web3.eth.getBalance(userAddress)).gte(web3.utils.toBN(amt));
      if (flag) {
        await contract.methods.transfer(userAddress, toAddress).send({ from: userAddress, value: amt });
        setStatus("Charged EV successfully.");
      } else {
        setStatus("Insufficient balance.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Failed to charge EV.");
    }
  };

  const disEv=async()=>{
    const evresult = await contract.methods.displayEVUser(userAddress).call();
    setEvUserBatteryStatus(evresult[0]);
    setEvUserCapacity(evresult[1])
    setEvUserID(evresult[2]);
    setEvUserTime(evresult[3]);
    setEvUsernumberPlate(evresult[4]);
  };

  return (
    <div>
    <div>
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
          <p>
            <button onClick={addEVUser}>Add EV user</button>
          </p>
          <p>
            <label>To:</label>
            <input type="text" value={toAddress} onChange={(e) => setToAddress(e.target.value)} />
          </p>
          <p>
            <button onClick={chargeEV}>Charge EV</button>
          </p>
          <br></br>
{/* for displaying EV details */}
          <p>
            <label>Enter the address</label>
            <input type="text" value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
          </p>
          <p>
            <button onClick={disEv}>Display EV details</button>
            <div >
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
    </div>
  );
}

export default App;
