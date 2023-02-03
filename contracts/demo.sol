// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EVCharge {
   // EV User Struct
   struct EVUser {
       uint batteryStatus;
       string evID;
       string chargeDetails;
       uint timestamp;
       string numberPlate;
       address payable userAddress;
   }
   
   // Mapping to store data of EV Users
   mapping(address => EVUser) public evUsers;
 
   function addEV(address payable _userAddress,uint _batteryStatus, string memory _evID, string memory _numberPlate) public {
       evUsers[_userAddress].userAddress = _userAddress;
       evUsers[_userAddress].batteryStatus = _batteryStatus;
       evUsers[_userAddress].evID = _evID;
       evUsers[_userAddress].numberPlate= _numberPlate;
   }

   function displayEVUser(address _evUser) public view returns (uint, string memory, string memory, uint, string memory) {
       EVUser memory evUser = evUsers[_evUser];
       return (evUser.batteryStatus, evUser.evID, evUser.chargeDetails, evUser.timestamp, evUser.numberPlate);
   }
}
 

