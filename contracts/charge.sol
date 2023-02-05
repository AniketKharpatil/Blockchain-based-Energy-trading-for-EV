// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EVCharge {
   // EV User Struct
   struct EVUser {
       uint batteryStatus;
       string evID;
       uint timestamp;
       string numberPlate;
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
   mapping(address => EVUser) evUsers;
   // Mapping to store data of Charge Providers
   mapping(address => ChargeProvider) chargeProviders;
 
   function addEV(address payable _userAddress,uint _batteryStatus, string memory _evID, string memory _numberPlate) public {
       evUsers[_userAddress].userAddress = _userAddress;
       evUsers[_userAddress].batteryStatus = _batteryStatus;
       evUsers[_userAddress].evID = _evID;
       evUsers[_userAddress].numberPlate= _numberPlate;
   }

   function displayEVUser(address _evUser) public view returns (uint, string memory, uint, string memory) {
       EVUser memory evUser = evUsers[_evUser];
       return (evUser.batteryStatus, evUser.evID, evUser.timestamp, evUser.numberPlate);
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
   function rec() public payable{
   }
    function transfer(address payable to, uint256 value) public payable {
        require(address(this).balance >= value);
        to.transfer(value);
        evUsers[address(this)].batteryStatus+=chargeProviders[to].chargeAmount;
    }
}
 

