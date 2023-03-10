import React, { useState } from "react";

import Web3 from 'web3';
import userABI from "./userABI"
const App = () => {
  const [batteryStatus, setBatteryStatus] = useState("");
  const [evID, setEvID] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [evUser, setEvUser] = useState({});

    const contractAddress="0x9B4e0a182e44ed9eC0FF8808a487559aceE91807";

    const handleSubmit = async (event) => {
    const contract = new web3.eth.Contract(userABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const tx = await contract.methods.addEV(
      userAddress,
      parseInt(batteryStatus),
      evID,
      numberPlate,
      parseInt(duration)
    ).send({ from: accounts[0] });
    setTransactionHash(tx.transactionHash);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={batteryStatus}
          onChange={(event) => setBatteryStatus(event.target.value)}
          placeholder="Battery Status"
        />
        <input
          type="text"
          value={evID}
          onChange={(event) => setEvID(event.target.value)}
          placeholder="EV ID"
        />
        <input
          type="text"
          value={numberPlate}
          onChange={(event) => setNumberPlate(event.target.value)}
          placeholder="Number Plate"
        />
        <button type="submit">Add EV User</button>
      </form>
      <div>
        {evUser.batteryStatus ? (
          <p>
            Battery Status: {evUser.batteryStatus} <br />
            EV ID: {evUser.evID} <br />
            Charge Details: {evUser.chargeDetails} <br />
            Timestamp: {evUser.timestamp} <br />
            Number Plate: {evUser.numberPlate}
          </p>
        ) : (
          <p>No EV User found</p>
        )}
      </div>
    </div>
  );
};

export default App;
