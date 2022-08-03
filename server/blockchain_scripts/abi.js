const abi = 
[
  {
    "inputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "batch",
    "outputs": [{
        "internalType": "string",
        "name": "batch_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mine_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "organisation_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "manager_id",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "ore_type",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "grade",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "Fe_amount",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "sample_img",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "lab_doc",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "officer_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "gov_doc",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "batchState",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "name": "mine",
    "outputs": [{
        "internalType": "string",
        "name": "mine_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "organisation_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mine_hash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "mineOreAmount",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "name": "organisation",
    "outputs": [{
        "internalType": "string",
        "name": "organisation_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "organisation_hash",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "name": "organisationOreAmount",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{
      "components": [{
          "internalType": "string",
          "name": "transaction_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "mine_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "mine_organisation_id",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "buyer_organisation_id",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        },
        {
          "internalType": "string",
          "name": "ore_type",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "grade",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "price",
          "type": "string"
        }
      ],
      "internalType": "struct mines.transaction_details",
      "name": "transactionDetails",
      "type": "tuple"
    }],
    "name": "selling",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "string",
        "name": "organisation_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "organisation_hash",
        "type": "string"
      }
    ],
    "name": "createOrganisation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
        "internalType": "string",
        "name": "mine_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "organisation_id",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "mine_hash",
        "type": "string"
      }
    ],
    "name": "createMine",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{
        "components": [{
            "internalType": "string",
            "name": "batch_id",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "mine_id",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "organisation_id",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "manager_id",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "ore_type",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "grade",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "Fe_amount",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "sample_img",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "lab_doc",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "officer_id",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "gov_doc",
            "type": "string"
          }
        ],
        "internalType": "struct mines.ore_details",
        "name": "oredetails",
        "type": "tuple"
      },
      {
        "internalType": "bool",
        "name": "state",
        "type": "bool"
      }
    ],
    "name": "createMinedBatch",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

module.exports={
    abi
}