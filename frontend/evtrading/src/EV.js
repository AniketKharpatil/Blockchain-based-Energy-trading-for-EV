import React, { useState } from 'react';
import Web3 from 'web3';
import evABI from "./evABI";

const EVCharge = () => {
  const [userAddress, setUserAddress] = useState('');
  const [batteryStatus, setBatteryStatus] = useState('');
  const [evID, setEvID] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [duration, setDuration] = useState('');
  const [providerAddress, setProviderAddress] = useState('');
  const [chargeAmount, setChargeAmount] = useState('');
  const [cost, setCost] = useState('');
  const [transactionHash, setTransactionHash] = useState('');
  
  const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");

  const handleAddEV = async () => {
    const contract = new web3.eth.Contract(evABI, "0x8850685F4d539272935B0B54ca0f36A72Be50b2f");
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

  const handleAddChargeProvider = async () => {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const tx = await contract.methods.addChargeProvider(
      providerAddress,
      parseInt(chargeAmount),
      parseInt(cost)
    ).send({ from: accounts[0] });
    setTransactionHash(tx.transactionHash);
  };

  const handleDisplayEVUser = async () => {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const result = await contract.methods.displayEVUser(userAddress).call();
    console.log(result);
  };

  const handleDisplayChargeProvider = async () => {
    const contract = new web3.eth.Contract(abi, contractAddress);
    const result = await contract.methods.displayChargeProvider(providerAddress).call();
    console.log(result);
  };

  return (
    <div>
      <h2>Add EV User</h2>
      <form onSubmit={handleAddEV}>
        <input
          type="text"
          placeholder="User Address"
          value={userAddress}
          onChange={e => setUserAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Battery Status"
          value={batteryStatus}
          onChange={e => setBatteryStatus(e.target.value)}
        />
        <input
            type="text"
            id="evID"
            value={evID}
            onChange={(event) => setEvID(e.target.value)}
        />
        <input
            type="text"
            id="numberPlate"
            value={numberPlate}
            onChange={(event) => setNumberPlate(e.target.value)}
        />
        <input
            type="text"
            id="duration"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
        />
        <button type="submit">Add EV User</button>
        </form>
        </div>


  );

};

export default EVCharge;
