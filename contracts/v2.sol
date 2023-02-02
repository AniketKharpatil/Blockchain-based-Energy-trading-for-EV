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
       uint duration;
       address payable userAddress;
   }
   // Charge Provider Struct
   struct ChargeProvider {
       uint chargeAmount;
       uint timestamp;
       uint cost;
       address payable providerAddress;
   }
   // Mapping to store data of EV Users
   mapping(address => EVUser) public evUsers;
   // Mapping to store data of Charge Providers
   mapping(address => ChargeProvider) public chargeProviders;
 
   function addEV(address payable _userAddress,uint _batteryStatus, string memory _evID, string memory _numberPlate, uint _duration) public {
       evUsers[_userAddress].userAddress = _userAddress;
       evUsers[_userAddress].batteryStatus = _batteryStatus;
       evUsers[_userAddress].evID = _evID;
       evUsers[_userAddress].numberPlate= _numberPlate;
       evUsers[_userAddress].duration = _duration;
      
   }
   function displayEVUser(address _evUser) public view returns (uint, string memory, string memory, uint, string memory, uint) {
       EVUser memory evUser = evUsers[_evUser];
       return (evUser.batteryStatus, evUser.evID, evUser.chargeDetails, evUser.timestamp, evUser.numberPlate, evUser.duration);
   }
 
   function addChargeProvider(address payable _providerAddress,uint _chargeAmount, uint _cost) public {
       chargeProviders[_providerAddress].providerAddress=_providerAddress;
       chargeProviders[_providerAddress].chargeAmount=_chargeAmount;
       chargeProviders[_providerAddress].cost=_cost;
   }
  
   function displayChargeProvider(address _provider) public view returns (uint, uint, uint) {
       ChargeProvider memory chargeProvider = chargeProviders[_provider];
       return (chargeProvider.chargeAmount, chargeProvider.timestamp, chargeProvider.cost);
   }

     function transfer(address payable to, uint256 value) public payable {
        require(value > 0);
        require(address(this).balance >= value);
        to.transfer(value);
    }
 
 
}
 

