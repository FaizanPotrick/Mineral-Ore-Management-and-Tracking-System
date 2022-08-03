import './connection.js';


class Mine extends BlockchainConnection {

    constructor() {
        connectToContract();
    }

async createTransaction(){
// Gets transaction info from the client 
transact();
}
    async transact(mine_id, batch_id, batch = {
        batch_id,
        mine_id,
        organisation_id,
        manager_id,
        amount,
        ore_type,
        grade,
        Fe_amount,
        sample_img,
        lab_doc,
        officer_id,
        gov_doc
    }, state) {

        try {
            const contract = await this.contract;
            await contract.methods.transact(mine_id, batch_id, batch = {
                batch_id,
                mine_id,
                organisation_id,
                manager_id,
                amount,
                ore_type,
                grade,
                Fe_amount,
                sample_img,
                lab_doc,
                officer_id,
                gov_doc
            }, state).send({
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
    Mine
  };