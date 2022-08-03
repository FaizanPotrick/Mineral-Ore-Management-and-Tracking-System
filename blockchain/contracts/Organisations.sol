// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
import "./Mines.sol";

contract Organisations is Mines{

    struct organisation_detail {
      string organisation_id;
      string organisation_hash;
   }
    
    mapping(string => organisation_detail)public organisation; //map organisation id to organisation details
    mapping (string => mapping (string => mapping(string=> uint))) public organisationOreAmount; //map organisation id to map ore type to map grade to ore amount
    
    //Selling Of Ore 
    //Input:- 1)Transtion Detail[Transaction Id,Mine Id,Buyer Organisation ID,Quantity Of Ore to sell,Ore Type,Grade,Price]
    function selling(transaction_details calldata transactionDetails) external{
        require(keccak256(abi.encodePacked((mine[transactionDetails.mine_id].mine_id))) == keccak256(abi.encodePacked((transactionDetails.mine_id))),"Provided Seller Mine ID Doesn't Exist");
        require(keccak256(abi.encodePacked((organisation[transactionDetails.buyer_organisation_id].organisation_id))) == keccak256(abi.encodePacked((transactionDetails.buyer_organisation_id))),"Provided Seller Organisation ID Doesn't Exist");        
        require(mineOreAmount[transactionDetails.mine_id][transactionDetails.ore_type][transactionDetails.grade]>= transactionDetails.amount,"Amount of Ore is Not Present in the Mine");
        
        //From Mine Id we get Mine Organisation Id 
        string storage mine_organisation_id=mine[transactionDetails.mine_id].organisation_id;
        
        //Storing the Transaction Information
        transaction[transactionDetails.mine_id][transactionDetails.transaction_id]=transaction_details(transactionDetails.transaction_id,
                                                                                                         transactionDetails.mine_id,
                                                                                                         mine_organisation_id,
                                                                                                         transactionDetails.buyer_organisation_id,
                                                                                                         transactionDetails.amount,
                                                                                                         transactionDetails.ore_type,
                                                                                                         transactionDetails.grade,
                                                                                                         transactionDetails.price
                                                                                                        );
        
        //Storing All Transaction_id in Mine_id 
        minesTransaction[transactionDetails.mine_id].push(Transaction_id(transactionDetails.transaction_id));
        
        //Quantity Of Ore Sell is Deduction from Mine
        mineOreAmount[transactionDetails.mine_id][transactionDetails.ore_type][transactionDetails.grade] -= transactionDetails.amount;
        
        //Quantity Of Ore Sell is Added from Organisation
        organisationOreAmount[transactionDetails.buyer_organisation_id][transactionDetails.ore_type][transactionDetails.grade] += transactionDetails.amount;
    }
    
    //Get Number of Transaction Done By Mine
    function getTransaction_no(string calldata mine_id) external view returns(uint transaction_no) {
        return minesTransaction[mine_id].length;
    }

    //Get Transaction Id from Array of Batch Ids of mine
    function getTransactionId(string calldata mine_id, uint index) external view returns(string memory){
        return minesTransaction[mine_id][index].transaction_id;
    }
}