const express = require("express");
const router = express.Router();
const Region = require("../../models/RegionSchema");
const Mine = require("../../models/MineSchema");
const Transaction = require("../../models/TransactionSchema");

router.get("/api/verify_qr", async (req, res) => {
    const {
        transaction,
        checkpoint_id
    } = req.query;
    const {
        transaction_id,
        transaction_hash
    } = transaction;
    const transaction_response = await Transaction.findById(transaction_id);
    if (mined_batch_response.transaction_hash === transaction_hash) {
        if (!transaction_response.checkpoints.includes(checkpoint_id)) {
            const transaction_checkpoints = transaction_response.checkpoints.push(checkpoint_id);
            await Transaction.findByIdAndUpdate(transaction_id, {
                $set: {
                    checkpoints: transaction_checkpoints,
                },
            });
            res.status(200).json(transaction_response);
        } else {
            res.status(400).json({
                message: "Checkpoint already exists",
            });
        }
    } else {
        res.status(400).json({
            message: "Transaction hash does not match",
        });
    }
});
module.exports = router;