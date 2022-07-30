const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
require('dotenv').config({
  path: '../.env'
});

// Environment Variables
const contractID = process.env.CONTRACT_ID;
const infuraId = process.env.INFURA_ADDRESS;
const walletPass = process.env.WALLET_PASSWORD;
console.log("Connecting to the Contract...");

// Connect to Provider
const provider = new HDWalletProvider(walletPass, infuraId);
const web3 = new Web3(provider);

//
const abi = [{
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
class BlockchainConnection {

  async connectToContract() {
    try {

      this.accounts = await web3.eth.getAccounts();
      console.log('Attempting to connect from account', this.accounts[0]);
      this.contract = await new web3.eth.Contract(abi, contractID);
      console.log('Connected to contract');
    } catch (e) {
      console.log("Error occurred while connecting to the Contract: ", e);
    }
  }
  async createOrganisation(org_id, org_hash) {

    try {
      await this.contract.methods.createOrganisation(org_id, org_hash).send({
        from: this.accounts[0]
      }).then(() => {
        console.log("Organisation created successfully");
      });
    } catch (e) {
      console.log("Error in creating organisation to contract: ", e);

    }
  }
 
  async getOrganisations() {

    try {
       await this.contract.methods.organisation("abc").call().then((results) => {
        console.log("Organisation fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching organisation to contract: ", e);

    }
  }
}




// Test Data

const mine_id = 123;
const amount = "100";
const ore_type = "fine";
const grade = "60";
const file = "This is file address";
// createMinedBatch(mine_id, amount, ore_type, grade, file);	
const org_id = "abc";
const org_hash = "afdilhnwef8o8Y8N3YR";

const connection = new BlockchainConnection();
connection.connectToContract().then(() => {
  // connection.createOrganisation(org_id, org_hash);
  connection.getOrganisations()
})


// module.exports = {
//   BlockchainConnection
// };