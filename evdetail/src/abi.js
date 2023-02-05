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
				"internalType": "address payable",
				"name": "userAddress",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];