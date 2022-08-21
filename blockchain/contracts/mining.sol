// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract mining{

    struct batch_details{
        string mine_id;
        string batch_hash;
        string doc_hash;
    }

    struct transaction_details{
        string mine_id;
        string org_id;
        string transaction_hash;
        string doc_hash;
    }

    mapping (string => batch_details) public batch;
    mapping (string => transaction_details) public transaction;

    function createMinedBatch (string calldata batch_id,string calldata _mine_id,string calldata _batch_hash,string calldata _doc_hash) external{
        batch[batch_id]=batch_details(_mine_id,_batch_hash,_doc_hash);
    }

    function createTransaction (string calldata transaction_id,string calldata _mine_id,string calldata _org_id,string calldata _transaction_hash,string calldata _doc_hash) external{
        transaction[transaction_id]=transaction_details(_mine_id,_org_id,_transaction_hash,_doc_hash);
    }

    function verifyMineBatch (string calldata batch_id, string calldata _batch_hash, string calldata _doc_hash) external view returns(bool) {
        if (keccak256(abi.encodePacked(batch[batch_id].batch_hash)) == keccak256(abi.encodePacked(_batch_hash)) && keccak256(abi.encodePacked(batch[batch_id].doc_hash)) == keccak256(abi.encodePacked(_doc_hash))){
            return(true);
        }
        else{
            return(false);
        }
    }

    function verifyTransaction (string calldata transaction_id, string calldata _transaction_hash, string calldata _doc_hash) external view returns(bool) {
        if (keccak256(abi.encodePacked(transaction[transaction_id].transaction_hash)) == keccak256(abi.encodePacked(_transaction_hash)) && keccak256(abi.encodePacked(transaction[transaction_id].doc_hash)) == keccak256(abi.encodePacked(_doc_hash))){
            return(true);
        }
        else{
            return(false);
        }
    }    
}
