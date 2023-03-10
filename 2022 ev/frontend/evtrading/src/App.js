// import React, { useState } from "react";
// import Web3 from 'web3';
// import userABI from "./userABI"
// const App = () => {
//   const [batteryStatus, setBatteryStatus] = useState("");
//   const [evID, setEvID] = useState("");
//   const [numberPlate, setNumberPlate] = useState("");
//   const [evUser, setEvUser] = useState({});

//     const contractAddress="0xD5dD03eF4BdbCf577AEca6F788F7B6F7DBb82834";

//     const handleSubmit = async (event) => {
//     const contract = new web3.eth.Contract(userABI, contractAddress);
//     const accounts = await web3.eth.getAccounts();
//     const tx = await contract.methods.addEV(
//       userAddress,
//       parseInt(batteryStatus),
//       evID,
//       numberPlate,
//       parseInt(duration)
//     ).send({ from: accounts[0] });
//     setTransactionHash(tx.transactionHash);
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={batteryStatus}
//           onChange={(event) => setBatteryStatus(event.target.value)}
//           placeholder="Battery Status"
//         />
//         <input
//           type="text"
//           value={evID}
//           onChange={(event) => setEvID(event.target.value)}
//           placeholder="EV ID"
//         />
//         <input
//           type="text"
//           value={numberPlate}
//           onChange={(event) => setNumberPlate(event.target.value)}
//           placeholder="Number Plate"
//         />
//         <button type="submit">Add EV User</button>
//       </form>
//       <div>
//         {evUser.batteryStatus ? (
//           <p>
//             Battery Status: {evUser.batteryStatus} <br />
//             EV ID: {evUser.evID} <br />
//             Charge Details: {evUser.chargeDetails} <br />
//             Timestamp: {evUser.timestamp} <br />
//             Number Plate: {evUser.numberPlate}
//           </p>
//         ) : (
//           <p>No EV User found</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;



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
  const contractAddress ="0x9bE55A4AB3f2dA95829D3532eF0c94A8da74b78b";

  const handleAddEV = async () => {
    const contract = new web3.eth.Contract(evABI, contractAddress);
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
    const contract = new web3.eth.Contract(evABI, contractAddress);
    const accounts = await web3.eth.getAccounts();
    const tx = await contract.methods.addChargeProvider(
      providerAddress,
      parseInt(chargeAmount),
      parseInt(cost)
    ).send({ from: accounts[0] });
    setTransactionHash(tx.transactionHash);
  };

  const handleDisplayEVUser = async () => {
    const contract = new web3.eth.Contract(evABI, contractAddress);
    const result = await contract.methods.displayEVUser(userAddress).call();
    console.log(result);
  };

  const handleDisplayChargeProvider = async () => {
    const contract = new web3.eth.Contract(evABI, contractAddress);
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
            onChange={(event) => setEvID(event.target.value)}
        />
        <input
            type="text"
            id="numberPlate"
            value={numberPlate}
            onChange={(event) => setNumberPlate(event.target.value)}
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

