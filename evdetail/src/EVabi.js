export default [
	{
		"inputs": [
			{
				"internalType": "address payable",
				"name": "_providerAddress",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_chargeAmount",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_cost",
				"type": "uint256"
			}
		],
		"name": "addChargeProvider",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
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
				"internalType": "uint256",
				"name": "_capacity",
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
				"name": "_userAddress",
				"type": "address"
			},
			{
				"internalType": "address payable",
				"name": "to",
				"type": "address"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "payable",
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
	}
];
