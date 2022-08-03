import './connection.js';


class GovernmentOfficial extends BlockchainConnection{

    constructor(){
        connectToContract();
    }


    async createOrganisation(org_id, org_hash) {

        try {
          const contract = await this.contract;
          await contract.methods.createOrganisation(org_id, org_hash).send({
            from: this.accounts[0]
          }).then(() => {
            console.log("Organisation created successfully");
          });
        } catch (e) {
          console.log("Error in creating organisation to contract: ", e);
    
        }
      }
      async createUserDetails(user_id, user_hash) {

        try {
          const contract = await this.contract;
          await contract.methods.createUser(user_id, user_hash).send({
            from: this.accounts[0]
          }).then(() => {
            console.log("User created successfully");
          });
        } catch (e) {
          console.log("Error in creating User to contract: ", e);
    
        }
      }
      async createRegionDetails(region_id, region_hash) {

        try {
          const contract = await this.contract;
          await contract.methods.createRegion(region_id, region_hash).send({
            from: this.accounts[0]
          }).then(() => {
            console.log("Region created successfully");
          });
        } catch (e) {
          console.log("Error in creating Region to contract: ", e);
    
        }
      }

  async createMine(mine_id,org_id,mine_hash) {

    try {
      const contract = await this.contract;
      await contract.methods.createOrganisation(mine_id,org_id, mine_hash).send({
        from: this.accounts[0]
      }).then(() => {
        console.log("Mine created successfully");
      });
    } catch (e) {
      console.log("Error in creating mine to contract: ", e);

    }
  }
  async createMinedBatch(mine_id,batch={batch_id,mine_id,organisation_id,manager_id,amount,ore_type,grade,Fe_amount,sample_img,lab_doc,officer_id,state}) {

    try {
      const contract = await this.contract;s
      await contract.methods.createMinedBatch(mine_id,batch={batch_id,mine_id,organisation_id,manager_id,amount,ore_type,grade,Fe_amount,sample_img,lab_doc,officer_id,state}).send({
        from: this.accounts[0]
      }).then(() => {
        console.log("Mined batch created successfully");
      });
    } catch (e) {
      console.log("Error in creating mined batch to contract: ", e);

    }
  }
}


module.exports = {
  GovernmentOfficial
};