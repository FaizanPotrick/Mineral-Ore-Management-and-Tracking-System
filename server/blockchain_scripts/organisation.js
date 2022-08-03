import './connection.js';


class Organisation extends BlockchainConnection {

    constructor() {
        connectToContract();
    }
    async createTransaction(mine_id,transaction={transaction_id,mine_id,buyer_organisation_id,amount,ore_type,grade,Fe_amount,price}) {

        try {
          const contract = await this.contract;s
          await contract.methods.createMinedBatch(mine_id,transaction={transaction_id,mine_id,buyer_organisation_id,amount,ore_type,grade,Fe_amount,price}).send({
            from: this.accounts[0]
          }).then(() => {
            console.log("Transaction created successfully");
          });
        } catch (e) {
          console.log("Error in creating Transaction to contract: ", e);
    
        }
      }

}


module.exports = {
    Organisation
  };