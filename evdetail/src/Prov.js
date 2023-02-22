import React, { useState, useEffect } from "react";
import Web3 from "web3";
import abi from "./abi";
// import './style.css';

// const EVCharge = () => {
  const [providerAddress, setProviderAddress] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");
  const [cost, setCost] = useState("");
  const [displayChargeAmount, setDisplayChargeAmount] = useState("");
  const [displayTimestamp, setDisplayTimestamp] = useState("");
  const [displayCost, setDisplayCost] = useState("");
  


  const [contractInstance, setContractInstance] = useState(null);

  const contractAddress="0x0Ed94a8aFCbb9C37Cb645BDE0E17d24a8782cf36";

  // Connect to the Ethereum network
//   useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:7545")
    );

  const handleAddChargeProvider = async () => {
    const contract = new web3.eth.Contract(
        abi,
        contractAddress
      );
      
    setContractInstance(contract);
    const accounts = await web3.eth.getAccounts();

    // Call the addChargeProvider function of the smart contract
    await contract.methods
      .addChargeProvider(providerAddress, chargeAmount, cost)
      .send({ from: accounts[0]});      
  };

  const handleDisplayChargeProvider = async (event) => {    
    event.preventDefault();
    
    const result = await contractInstance.methods
      .displayChargeProvider(providerAddress)
      .call();

    setDisplayChargeAmount(result[0]);
    setDisplayTimestamp(result[1]);
    setDisplayCost(result[2]);
  };

  return (
    <div>
    <p>Enter Charge provider details</p>
      <input
        type="text"
        value={providerAddress}
        onChange={(e) => setProviderAddress(e.target.value)}
        placeholder="Charge Provider Address"
      />
      <input
        type="text"
        value={chargeAmount}
        onChange={(e) => setChargeAmount(e.target.value)}
        placeholder="Charge Amount"
      />
      <input
        type="text"
        value={cost}
        onChange={(e) => setCost(e.target.value)}
        placeholder="Cost"
      />
      <button onClick={handleAddChargeProvider}>Add Charge Provider</button>

    <p>Display details</p>

      <form onSubmit={handleDisplayChargeProvider}>
        <input
          type="text"
          value={providerAddress}
          onChange={(e) => setProviderAddress(e.target.value)}
          placeholder="Enter Address"
        />
        <button type="submit">Display charge provider</button>
      </form>


      <div>
        Charge Amount: {displayChargeAmount}
        <br />
        Timestamp: {displayTimestamp}
        <br />
        Cost: {displayCost}
      </div>
    </div>
  );
};

export default EVCharge;
