import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import abi from './abi'

const web3 = new Web3('http://localhost:7545');

function App() {
  const [evUserAddress, setEvUserAddress] = useState('');
  const [batteryStatus, setBatteryStatus] = useState('');
  
  const [contractInstance, setContractInstance] = useState(null);
  const [evUserBatteryStatus, setEvUserBatteryStatus] = useState(null);
  

  const handleAddEV = async () => {
    const contractAddress ="0xA55d89EF2a0e547Fb01C7dB0F60Bb9751b9E42e8";
    const contract = new web3.eth.Contract(abi, contractAddress);
    // 
    setContractInstance(contract);
    // 
    const accounts = await web3.eth.getAccounts();


    await contract.methods.addEV(evUserAddress, batteryStatus)
    .send({ from: accounts[0] });
    
  };

  const handleDisplay=async(event)=>{
    event.preventDefault();
    const batteryStatus = await contractInstance.methods
      .displayEVUser(evUserAddress)
      .call();
    
    setEvUserBatteryStatus(batteryStatus);
  }

  return (
    <div>
      <div><p>Input EV User data :</p>
        <input
          type="text"
          placeholder="Enter EV User Address"
          value={evUserAddress}
          onChange={(e) => setEvUserAddress(e.target.value)}
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter Battery Status"
          value={batteryStatus}
          onChange={(e) => setBatteryStatus(e.target.value)}
        />
      </div>
      <button onClick={handleAddEV}>Add EV</button>
      
      <form onSubmit={handleDisplay}>
        <input
          type="text"
          value={evUserAddress}
          onChange={(e) => setEvUserAddress(e.target.value)}
          placeholder="Enter EV User Address"
        />
        <button type="submit">Display EV User</button>
      </form>
      {evUserBatteryStatus && (
        <p>Battery Status: {evUserBatteryStatus}</p>
      )}
    </div>
  );
}

export default App;
