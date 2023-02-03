import React, { useState } from "react";
import Web3 from "web3";

const BalanceChecker = () => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  // Connect to Ethereum network
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  // ABI of the BalanceChecker contract
  const abi =[
    
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_address",
                    "type": "address"
                }
            ],
            "name": "checkBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "rec",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "_to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_value",
                    "type": "uint256"
                }
            ],
            "name": "transferEther",
            "outputs": [],
            "stateMutability": "payable",
            "type": "function"
        }
    
  ];

  // Address of the deployed BalanceChecker contract
  const contractAddress = "0x8850685F4d539272935B0B54ca0f36A72Be50b2f";

  // Connect to the BalanceChecker contract
  const contract = new web3.eth.Contract(abi, contractAddress);

  const handleSubmit = async e => {
    e.preventDefault();
    const balance = await contract.methods.checkBalance(address).call();
    setBalance(web3.utils.fromWei(balance, "ether") + " ETH");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="address">Ethereum Address:</label>
      <input
        type="text"
        id="address"
        name="address"
        value={address}
        onChange={e => setAddress(e.target.value)}
      />
      <button type="submit">Submit</button>
      {balance && <p>The balance of {address} is {balance}</p>}
    </form>
  );
};

export default BalanceChecker;
