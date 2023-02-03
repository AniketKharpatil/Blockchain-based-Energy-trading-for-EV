import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import abi from './abi';

const App = () => {
  const [batteryStatus, setBatteryStatus] = useState(0);
  const [evID, setEvID] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [evUserAddress, setEvUserAddress] = useState(null);
  const [displayData, setDisplayData] = useState(null);

  // const { library, account } = context;
  const contractAddress="0x6bf18F3a9cC8d4471655c105335cc4a532DEd238";

  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
  const contract = new web3.eth.Contract(abi, contractAddress);

  const handleAddEV = async () => {
    await contract.methods
      .addEV(evUserAddress, batteryStatus, evID, numberPlate)
      .send({ from: (await web3.eth.getAccounts())[0] });
  };

  const handleDisplayEVUser = async () => {
    const displayData = await contract.methods
      .displayEVUser(evUserAddress)
      .call();
    setDisplayData(displayData);
  };

  return (
    <div>
      <input
        type='number'
        value={batteryStatus}
        onChange={(e) => setBatteryStatus(e.target.value)}
        placeholder='Enter Battery Status'
      />
      <input
        type='text'
        value={evID}
        onChange={(e) => setEvID(e.target.value)}
        placeholder='Enter EV ID'
      />
      <input
        type='text'
        value={numberPlate}
        onChange={(e) => setNumberPlate(e.target.value)}
        placeholder='Enter Number Plate'
      />
      <input
        type='text'
        value={evUserAddress}
        onChange={(e) => setEvUserAddress(e.target.value)}
        placeholder='Enter EV User Address'
      />
      <button onClick={handleAddEV}>Add EV</button>
      <button onClick={handleDisplayEVUser}>Display EV User</button>
      {displayData && (
        <div>
          <p>Battery Status: {displayData[0]}</p>
          <p>EV ID: {displayData[1]}</p>
          <p>Timestamp: {displayData[2]}</p>
          <p>Number Plate: {displayData[3]}</p>
        </div>
      )}
    </div>
  );
};

export default App;
