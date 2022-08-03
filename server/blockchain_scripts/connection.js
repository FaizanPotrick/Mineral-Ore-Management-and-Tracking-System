const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
require('dotenv').config({
  path: '../.env'
});
const abi = require('./abi');
// Environment Variables
const contractID = process.env.CONTRACT_ID;
const infuraId = process.env.INFURA_ADDRESS;
const walletPass = process.env.WALLET_PASSWORD;
console.log("Connecting to the Contract...");

// Connect to Provider
const provider = new HDWalletProvider(walletPass, infuraId);
const web3 = new Web3(provider);


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


  async getOrganisations() {

    try {
      const contract = await this.contract;
      await contract.methods.organisation("abc").call().then((results) => {
        console.log("Organisation fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching organisation to contract: ", e);

    }
  }
  async getMine() {

    try {
      const contract = await this.contract;
      await contract.methods.mine("abc", "123").call().then((results) => {
        console.log("Mine fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching mine to contract: ", e);

    }
  }
  async getMinedBatch() {

    try {
      const contract = await this.contract;
      await contract.methods.batch("123", "abc").call().then((results) => {
        console.log("Mined batch fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching mined batch to contract: ", e);

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

// const connection = new BlockchainConnection();
// connection.connectToContract().then(() => {
//   // connection.createOrganisation(org_id, org_hash);
//   connection.getOrganisations()
// })


module.exports = {
  BlockchainConnection
};