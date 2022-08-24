const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const crypto = require("crypto");
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
      console.log("abi: ",abi.length);
      this.accounts = await web3.eth.getAccounts();
      console.log('Attempting to connect from account', this.accounts[0]);
      this.contract = await new web3.eth.Contract(abi, contractID);
      console.log('Connected to contract');
    } catch (e) {
      console.log("Error occurred while connecting to the Contract: ", e);
    }
  }

async createMinedBatch(batch_id,mine_id,manager_id,amount,ore_type,grade,Fe_amount,sample_img,lab_doc,officer_id,state) {
  try{
    const contract = await this.contract;
    const ore_details = {
      batch_id:batch_id,
                                                     mine_id:mine_id,
                        manager_id:                             manager_id,
                        amount:amount,
                        ore_type:ore_type,
                        grade: grade,
                        Fe_amount:Fe_amount,  
                        sample_img: sample_img,
                        lab_doc:lab_doc,
                        officer_id:officer_id,
                        state:state
    }
    const batch_hash = crypto.createHash('sha256').update(JSON.stringify(ore_details)).digest('hex');
    const doc_hash = crypto.createHash('sha256').update(lab_doc).digest('hex');
    
    console.log("ore Details",ore_details);
    await contract.methods.createMinedBatch(batch_id,mine_id,batch_hash,doc_hash).send({
      from: this.accounts[0]
    }).then((results) => {
      console.log("Mined batch added successfully");
      console.log(results);
    });
  }catch (e) {
    console.log("Error in adding mined batch to contract: ", e);

  }
}
  async getOrganisations(organisation_id) {

    try {
      const contract = await this.contract;
      await contract.methods.organisation(organisation_id).call().then((results) => {
        console.log("Organisation fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching organisation to contract: ", e);

    }
  }

  async getMine(mine_id) {

    try {
      const contract = await this.contract;
      await contract.methods.mine(mine_id).call().then((results) => {
        console.log("Mine fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching mine to contract: ", e);

    }
  }

  async getMinedBatches(mine_id) {

    try {
      const contract = await this.contract;
      await contract.methods.getAllBatches(mine_id).call().then((results) => {
        console.log("Mined batch fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching mined batch to contract: ", e);

    }
  }

  async getTransactions(mine_id) {

    try {
      const contract = await this.contract;
      await contract.methods.getAllTransaction(mine_id).call().then((results) => {
        console.log("Transaction fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching transaction to contract: ", e);

    }
  }
  
  async getUser(user_id) {

    try {
      const contract = await this.contract;
      await contract.methods.user(user_id).call().then((results) => {
        console.log("User detail fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching User detail to contract: ", e);

    }
  }

  async getRegion(region_id) {

    try {
      const contract = await this.contract;
      await contract.methods.region(region_id).call().then((results) => {
        console.log("Region detail fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching region detail to contract: ", e);

    }
  }

  async getMineOreAmt(mine_id,type_of_ore,grade_of_ore) {

    try {
      const contract = await this.contract;
      await contract.methods.mineOreAmount(mine_id,type_of_ore,grade_of_ore).call().then((results) => {
        console.log("Current amount of ore in the mine fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching current amount of ore in the mine to contract: ", e);

    }
  }

  async getOrganisationOreAmt(organisation_id,type_of_ore,grade_of_ore) {

    try {
      const contract = await this.contract;
      await contract.methods.organisationOreAmount(organisation_id,type_of_ore,grade_of_ore).call().then((results) => {
        console.log("Current amount of ore in the organisation fetched successfully");
        console.log(results);
      });
    } catch (e) {
      console.log("Error in fetching current amount of ore in the organisation to contract: ", e);

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


module.exports = BlockchainConnection;