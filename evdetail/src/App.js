// import React, { useState, useEffect } from 'react';
// import Web3 from 'web3';
// import abi from './abi';

// const App = () => {
//   const [batteryStatus, setBatteryStatus] = useState(0);
//   const [evID, setEvID] = useState('');
//   const [numberPlate, setNumberPlate] = useState('');
//   const [evUserAddress, setEvUserAddress] = useState(null);
//   const [displayData, setDisplayData] = useState(null);

//   // const { library, account } = context;
//   const contractAddress="0x4C4e2e1523d07bbA51834797dF7c3C297EB755FE";
//   const web3 = new Web3(Web3.givenProvider || "http://localhost:7545");
//   const contract = new web3.eth.Contract(abi, contractAddress);

//   const handleAddEV = async () => {
//     await contract.methods
//       .addEV(evUserAddress, batteryStatus, evID, numberPlate)
//       .send({ from: (await web3.eth.getAccounts())[0] });
//   };

//   const handleDisplayEVUser = async () => {
//     const displayData = await contract.methods
//       .displayEVUser(evUserAddress)
//       .call();
//     setDisplayData(displayData);
//   };

//   return (
//     <div>

//       <input
//         type='number'
//         value={batteryStatus}
//         onChange={(e) => setBatteryStatus(e.target.value)}
//         placeholder='Enter Battery Status'
//       />
//       <input
//         type='text'
//         value={evID}
//         onChange={(e) => setEvID(e.target.value)}
//         placeholder='Enter EV ID'
//       />
//       <input
//         type='text'
//         value={numberPlate}
//         onChange={(e) => setNumberPlate(e.target.value)}
//         placeholder='Enter Number Plate'
//       />
//       <input
//         type='text'
//         value={evUserAddress}
//         onChange={(e) => setEvUserAddress(e.target.value)}
//         placeholder='Enter EV User Address'
//       />
//       <button onClick={handleAddEV}>Add EV</button>

//       <button onClick={handleDisplayEVUser}>Display EV User</button>
//       {displayData && (
//         <div>
//           <p>Battery Status: {displayData[0]}</p>
//           <p>EV ID: {displayData[1]}</p>
//           <p>Timestamp: {displayData[2]}</p>
//           <p>Number Plate: {displayData[3]}</p>
//         </div>)
//       }

//     </div>
    

//     //for charge provider
   

//   );
// };

// export default App;








import React, { useState } from 'react';
import Web3 from 'web3';
import abi from './abi'

const EVCharge = () => {
  const [batteryStatus, setBatteryStatus] = useState(0);
  const [evUserAddress, setEvUserAddress] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const [evUserBatteryStatus, setEvUserBatteryStatus] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cadd="0x7bcFbD775Af2D4Ffcca78d61734fCce8cA8B6DDB";

    const contract = new web3.eth.Contract(abi,cadd);
    // const deployedContract = await contract
    //   .deploy({data: cadd})
    //   .send({ from: web3.eth.defaultAccount, gas: 1000000 });

    setContractInstance(contract);

    contract.methods
      .addEV(evUserAddress, batteryStatus)
      .send({ from: web3.eth.defaultAccount, gas: 1000000 });
  };

  const handleDisplay = async (event) => {
    event.preventDefault();

    const batteryStatus = await contractInstance.methods
      .displayEVUser(evUserAddress)
      .call();

    setEvUserBatteryStatus(batteryStatus);
  };

  // if (!web3) {
  //   const web3Instance = new Web3(Web3.givenProvider || 'http://localhost:8545');
  //   setWeb3(web3Instance);

  //   web3Instance.eth.getAccounts().then((accounts) => {
  //     web3Instance.eth.defaultAccount = accounts[0];
  //   });
  // }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={evUserAddress}
          onChange={(event) => setEvUserAddress(event.target.value)}
          placeholder="Enter EV User Address"
        />
        <input
          type="number"
          value={batteryStatus}
          onChange={(event) => setBatteryStatus(event.target.value)}
          placeholder="Enter Battery Status"
        />
        <button type="submit">Add EV User</button>
      </form>
      <form onSubmit={handleDisplay}>
        <input
          type="text"
          value={evUserAddress}
          onChange={(event) => setEvUserAddress(event.target.value)}
          placeholder="Enter EV User Address"
        />
        <button type="submit">Display EV User</button>
      </form>
      {evUserBatteryStatus && (
        <p>Battery Status: {evUserBatteryStatus}</p>
      )}
    </div>
  );
};

export default EVCharge;

