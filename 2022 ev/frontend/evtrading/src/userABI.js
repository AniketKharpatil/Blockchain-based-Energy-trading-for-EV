export default [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_batteryStatus",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_evID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_numberPlate",
				"type": "string"
			}
		],
		"name": "addEV",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_evUser",
				"type": "address"
			}
		],
		"name": "displayEVUser",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "evUsers",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "batteryStatus",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "evID",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "numberPlate",
				"type": "string"
			},
			{
				"internalType": "address payable",
				"name": "userAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];