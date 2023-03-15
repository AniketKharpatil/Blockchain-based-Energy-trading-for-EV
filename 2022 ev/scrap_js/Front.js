import React, { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "./EVabi";
import "./style.css"

const EVCharge = () => {
// useful links and address of deployed contract
  const contractAddress="0xd5b3fc436BA6273dB446b0B008DD70b8cB3aD33b";
  const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));

//   for provider
  const [providerAddress, setProviderAddress] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");
  const [cost, setCost] = useState("");
  const [displayChargeAmount, setDisplayChargeAmount] = useState("");
  const [displayTimestamp, setDisplayTimestamp] = useState("");
  const [displayCost, setDisplayCost] = useState("");
// for ev user
  const [evUserAddress, setEvUserAddress] = useState('');
  const [batteryStatus, setBatteryStatus] = useState('');
  const [evID, setEvID] = useState('');
  const [numberPlate, setNumberPlate] = useState('');

  const [displayevID, setEvUserID] = useState("");
  const [displaynumberPlate, setEvUsernumberPlate] = useState("");
  const [displayTime, setEvUserTime] = useState("");
  const [displayBatteryStatus, setEvUserBatteryStatus] = useState("");
//   contract instance
const [contractInstance, setContractInstance] = useState(null);

// function to ADD new EV
  const handleAddEV = async () => {

    const contract = new web3.eth.Contract(abi, contractAddress);
    // 
    setContractInstance(contract);
    // 
    const accountss = await web3.eth.getAccounts();
    await contract.methods.addEV(evUserAddress,batteryStatus,evID,numberPlate)
    .send({ from: accountss[0] });
  };
  
//  Function to Add New Charge provider 
  const handleAddChargeProvider = async () => {
    const contract = new web3.eth.Contract(abi,contractAddress);
    setContractInstance(contract);
    const accounts = await web3.eth.getAccounts();
    // Call the addChargeProvider function of the smart contract
    await contract.methods
      .addChargeProvider(providerAddress, chargeAmount, cost)
      .send({ from: accounts[0]});      
  };

//   Funtion to display charge provider details
  const handleDisplayChargeProvider = async (event) => {    
    event.preventDefault();
    
    const result = await contractInstance.methods
      .displayChargeProvider(providerAddress)
      .call();

    setDisplayChargeAmount(result[0]);
    setDisplayTimestamp(result[1]);
    setDisplayCost(result[2]);
  };

//   Function to display EV details
  const handleDisplayEV = async (event) => {    
    event.preventDefault();
    
    const evresult = await contractInstance.methods
      .displayEVUser(evUserAddress)
      .call();

    setEvUserBatteryStatus(evresult[0]);
    setEvUserID(evresult[1]);
    setEvUserTime(evresult[2]);
    setEvUsernumberPlate(evresult[3]);
  };

  return ( 
    <div >
      {/* <marquee class="inputfield"> Latest update For EVs  &nbsp; Hello  &nbsp; This project is made only by Aniket and Megh &nbsp; One member harsh is admitted </marquee> */}
    <div class="frame">
      
    <p class="heading">Enter Provider Details</p>
      <input
        class="inputfield"
        type="text"
        value={providerAddress}
        onChange={(e) => setProviderAddress(e.target.value)}
        placeholder="Charge Provider Address"
      />
      <input
      class="inputfield"
        type="text"
        value={chargeAmount}
        onChange={(e) => setChargeAmount(e.target.value)}
        placeholder="Charge Amount"
      />
      <input
      class="inputfield"
      type="text"
      value={cost}
      onChange={(e) => setCost(e.target.value)}
      placeholder="Cost"
      />
      <button class="medium" onClick={handleAddChargeProvider}>Add Charge Provider</button>

      <form onSubmit={handleDisplayChargeProvider}>
        <input
        class="inputfield"
        type="text"
        value={providerAddress}
        onChange={(e) => setProviderAddress(e.target.value)}
        placeholder="Enter Address"
        />
        <button class="medium" type="submit">Display charge provider</button>
      </form>
      
      <p class="detailshead">Provider Details</p>
      <div class="details">
        Charge Amount: {displayChargeAmount}
        <br />
        Timestamp: {displayTimestamp}
        <br />
        Cost: {displayCost}
      </div>
        </div>

{/* for EV */}
      
        <div class="frame">
        <p class="heading">Enter EV details</p>
        <input
        class="inputfield"
            type='text'
            value={evUserAddress}
            onChange={(e) => setEvUserAddress(e.target.value)}
            placeholder='Enter EV User Address'
        />
        <input
        class="inputfield"
            type='number'
            value={batteryStatus}
            onChange={(e) => setBatteryStatus(e.target.value)}
            placeholder='Enter Battery Status'
        />
        <input
        class="inputfield"
            type='text'
            value={evID}
            onChange={(e) => setEvID(e.target.value)}
            placeholder='Enter EV ID'
        />
        <input
        class="inputfield"
            type='text'
            value={numberPlate}
            onChange={(e) => setNumberPlate(e.target.value)}
            placeholder='Enter Number Plate'
        />
        <button class="medium" onClick={handleAddEV}>Add EV</button>
        <br />
        <form onSubmit={handleDisplayEV}>
            <input
            class="inputfield"
            type="text"
            value={evUserAddress}
            onChange={(e) => setEvUserAddress(e.target.value)}
            placeholder="Enter Address"
            />
            <button class="medium" type="submit">Display EV User details</button>
        </form>
            <p class="detailshead">EV User Details</p>
        <div class="details">
                EV ID: {displayevID}
                <br />
                Timestamp: {displayTime}
                <br />
                EV Battery status: {displayBatteryStatus}
                <br />
                Number Plate: {displaynumberPlate}
        </div>
        </div>
        </div>    

  );
};

export default EVCharge;
