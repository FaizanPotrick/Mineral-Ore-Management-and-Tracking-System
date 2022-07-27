// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;
import "./mines.sol";

contract organisations is mines{

    struct organisation_detail {
      string organisation_id;
      string organisation_hash;
   }
    
    mapping(string => organisation_detail)public organisation;
    mapping (string => mapping (string => mapping(string=> uint))) public organisationOreAmount;
    
    //Selling Of Ore 
    //Input:- 1)Transtion Detail[Transaction Id,Mine Id,Buyer Organisation ID,Quantity Of Ore to sell,Ore Type,Grade,Price]
    function selling(transaction_details calldata transactionDetails ) external{
        require(keccak256(abi.encodePacked((mine[transactionDetails.mine_id].mine_id))) == keccak256(abi.encodePacked((transactionDetails.mine_id))),"Provided Seller Mine ID Doesn't Exist");
        require(keccak256(abi.encodePacked((organisation[transactionDetails.buyer_organisation_id].organisation_id))) == keccak256(abi.encodePacked((transactionDetails.buyer_organisation_id))),"Provided Seller Organisation ID Doesn't Exist");        
        require(mineOreAmount[transactionDetails.mine_id][transactionDetails.ore_type][transactionDetails.grade]>= transactionDetails.amount,"Amount of Ore is Not Present in the Mine");
        
        //From Mine Id we get Mine Organisation Id 
        string storage mine_organisation_id=mine[transactionDetails.mine_id].organisation_id;
        
        //Storing All the Transaction Information
        transaction[transactionDetails.transaction_id]=transaction_details(transactionDetails.transaction_id,
                                                                                  transactionDetails.mine_id,
                                                                                  mine_organisation_id,
                                                                                  transactionDetails.buyer_organisation_id,
                                                                                  transactionDetails.amount,
                                                                                  transactionDetails.ore_type,
                                                                                  transactionDetails.grade,
                                                                                  transactionDetails.price
                                                                                  );
        
        //Quantity Of Ore Sell is Deduction from Mine
        mineOreAmount[transactionDetails.mine_id][transactionDetails.ore_type][transactionDetails.grade] -= transactionDetails.amount;
        
        //Quantity Of Ore Sell is Added from Organisation
        organisationOreAmount[transactionDetails.buyer_organisation_id][transactionDetails.ore_type][transactionDetails.grade] += transactionDetails.amount;
    }

}
