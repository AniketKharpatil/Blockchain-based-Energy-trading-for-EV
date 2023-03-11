// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

contract EVCharge {
   // EV User Struct
   struct EVUser {
       uint batteryStatus;
       uint capacity;
       string evID;
       uint timestamp;
       string numberPlate;
       address payable userAddress;
   }
   // Charge Provider Struct
   struct ChargeProvider {
       uint rate;
       address payable providerAddress;
   }
   
   ChargeProvider cp;

   // Mapping to store data of EV Users
   mapping(address => EVUser) evUsers;
   
 
   function addEV(address payable _userAddress,uint _batteryStatus, uint _capacity, string memory _evID, string memory _numberPlate) public {
       evUsers[_userAddress].userAddress = _userAddress;
       evUsers[_userAddress].capacity=_capacity;
       evUsers[_userAddress].batteryStatus = _batteryStatus;
       evUsers[_userAddress].evID = _evID;
       evUsers[_userAddress].numberPlate= _numberPlate;
   }

   function displayEVUser(address _evUser) public view returns (uint, uint, string memory, uint, string memory) {
       EVUser memory evUser = evUsers[_evUser];
       return (evUser.batteryStatus, evUser.capacity, evUser.evID, evUser.timestamp, evUser.numberPlate);
   }

   function addChargeProvider(address payable _providerAddress,uint _rate) public {
       cp.providerAddress=_providerAddress;
       cp.rate=_rate;
   }

   function rec() public payable{
   }
   
    function transfer(address payable _userAddress) public payable {
        uint to_charge = evUsers[_userAddress].capacity-evUsers[_userAddress].batteryStatus;
        uint amt=to_charge*cp.rate;
        bool flag=false;
        if(_userAddress.balance>=amt){
            flag=true;
        }
        address payable to=cp.providerAddress;
        to.transfer(amt);
        if(flag){
            evUsers[_userAddress].batteryStatus+=to_charge;
        }

    }
}