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
    mapping (string => uint) public organisatinAmount;
    mapping (string => mapping (string => mapping(string=> uint))) public organisationOreAmount;
    

    function selling(string calldata transaction_id,string calldata mine_id,string calldata buyer_organisation_id,uint amount,string calldata ore_type,string calldata grade,string calldata price) external{
        require(keccak256(abi.encodePacked((mine[mine_id].mine_id))) == keccak256(abi.encodePacked((mine_id))),"Provided Seller Mine ID Doesn't Exist");
        require(keccak256(abi.encodePacked((organisation[buyer_organisation_id].organisation_id))) == keccak256(abi.encodePacked((buyer_organisation_id))),"Provided Seller Organisation ID Doesn't Exist");        
        require(mineOreAmount[mine_id][ore_type][grade]>= amount,"Amount of Ore is Not Present in the Mine");
        string storage mine_organisation_id=mine[mine_id].organisation_id;
        transactionPartner[transaction_id]=transaction_partner_details(transaction_id,mine_id,mine_organisation_id,buyer_organisation_id);
        transactionOre[transaction_id]=transaction_ore_details(transaction_id,amount,ore_type,grade,price);        
        mineOreAmount[mine_id][ore_type][grade] -= amount;
        organisationOreAmount[buyer_organisation_id][ore_type][grade] += amount;
    }
}
