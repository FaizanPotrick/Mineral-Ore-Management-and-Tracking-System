const abi=  [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "batch",
    "outputs": [
      {
        "internalType": "string",
        "name": "mine_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "batch_hash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "doc_hash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "transaction",
    "outputs": [
      {
        "internalType": "string",
        "name": "mine_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "org_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "transaction_hash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "doc_hash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "batch_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_mine_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_batch_hash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doc_hash",
        "type": "string"
      }
    ],
    "name": "createMinedBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "transaction_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_mine_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_org_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_transaction_hash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doc_hash",
        "type": "string"
      }
    ],
    "name": "createTransaction",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "batch_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_batch_hash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doc_hash",
        "type": "string"
      }
    ],
    "name": "verifyMineBatch",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "transaction_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_transaction_hash",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_doc_hash",
        "type": "string"
      }
    ],
    "name": "verifyTransaction",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
module.exports=abi;
