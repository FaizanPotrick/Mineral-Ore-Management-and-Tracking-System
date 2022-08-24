/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        
    }

    async createMinedBatch(ctx, batch_id,amount,type_of_ore,grade,doc){
        console.info('============= START : Create Mined Batch ===========');

        const minedBatch = {
            amount,
            type_of_ore,
            grade,
            doc,
        };

        await ctx.stub.putState(batch_id, Buffer.from(JSON.stringify(minedBatch)));

        console.info('============= END : Create Mined Batch ===========');
    }
    
    // /*
    async createTransaction(ctx, transaction_id, mine_id, buyer_org_id, amount, type_of_ore, grade, doc){
        console.info('============= START : Create Mined Batch ===========');

        const minedBatch = {
            mine_id,
            buyer_org_id,
            amount,
            type_of_ore,
            grade,
            doc,
        };

        await ctx.stub.putState(transaction_id, Buffer.from(JSON.stringify(minedBatch)));

        console.info('============= END : Create Mined Batch ===========');
    }
    // */
    
    async queryMinedBatch(ctx, batch_id) {
        const batchAsBytes = await ctx.stub.getState(batch_id); // get the Mined Batch from chaincod state
        if (!batchAsBytes || batchAsBytes.length === 0) {
            throw new Error(`${batch_id} does not exist`);
        }
        console.log(batchAsBytes.toString());
        return batchAsBytes.toString();
    }
    
    // /*
    async queryTransaction(ctx, transaction_id) {
        const transactionAsBytes = await ctx.stub.getState(transaction_id); // get the Transaction from chaincode state
        if (!transactionAsBytes || transactionAsBytes.length === 0) {
            throw new Error(`${transaction_id} does not exist`);
        }
        console.log(transactionAsBytes.toString());
        return transactionAsBytes.toString();
    }
    // */

}

module.exports = FabCar;
