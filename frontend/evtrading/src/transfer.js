import React, { useState } from "react";
import Web3 from "web3";
import abi from "./abi"

const Transfer = () => {
  const [address, setAddress] = useState("");
const [balance, setBalance] = useState("");
const [toAddress, setToAddress] = useState("");
const [amount, setAmount] = useState("");
const [transactionHash, setTransactionHash] = useState("");

  // Connect to Ethereum network
  const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));

  // Address of the deployed BalanceChecker contract
  const contractAddress = "0x66aACDA262540ca1Ff0cc2c711b8ea2aE9D38905";

  // Connect to the BalanceChecker contract
  const contract = new web3.eth.Contract(abi, contractAddress);
  const handleCheckBalance = async e => {
    e.preventDefault();
    const balance = await contract.methods.checkBalance(address).call();
    setBalance(web3.utils.fromWei(balance, "ether") + " ETH");
  };

  const handleTransfer = async e => {
    e.preventDefault();
    const transaction = await contract.methods
      .transferEther(toAddress, web3.utils.toWei(amount, "ether"))
      .send({ toAddress: address });
    setTransactionHash(transaction.transactionHash);
  };
  return (
    <div>
      <h2>Check Balance</h2>
      <form onSubmit={handleCheckBalance}>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        <button type="submit">Check</button>
        <p>Balance: {balance}</p>
      </form>

      <h2>Transfer Ether</h2>
      <form onSubmit={handleTransfer}>
      <input
          type="text"
          placeholder="To Address"
          value={toAddress}
          onChange={e => setToAddress(e.target.value)}
        />
        <input
          type="text"
          placeholder="Amount (in ETH)"
          value={amount}
          onChange={e => setAmount(e.target.value)}
        />
        <button type="submit">Transfer</button>
        <p>Transaction Hash: {transactionHash}</p>
      </form>
    </div>
  );
};

export default Transfer;