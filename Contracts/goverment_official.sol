// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./mines.sol";
import "./organisations.sol";


contract goverment_official is mines,organisations{

    
    function organisationDetail(string calldata organisation_id,string calldata organisation_hash) external{
        
        organisation[organisation_id]=organisation_detail(organisation_id,organisation_hash);
    }
    
    function mineDetail(string calldata mine_id,string calldata organisation_id,string calldata mine_hash) external{
        
        mine[mine_id]=mine_detail(mine_id,organisation_id,mine_hash);
    }

    function minedBatch(string calldata mine_id,string calldata batch_id,uint amount, string calldata ore_type,string calldata grade, string calldata Fe_amount, string calldata file,bool state) external{
        require(keccak256(abi.encodePacked((mine[mine_id].mine_id))) == keccak256(abi.encodePacked((mine_id))),"Provided Mine ID Doesn't Exist");
        require(keccak256(abi.encodePacked((batch[mine_id][batch_id].batch_id))) != keccak256(abi.encodePacked((batch_id))),"Provided Batch ID Exist");        
        batch[mine_id][batch_id]=ore_details(batch_id,amount,ore_type,grade,Fe_amount,file);
        batchState[mine_id][batch_id]=state;
        if(state == true){
            mineBatchAmount[mine_id][grade] +=amount;            
        }
    }
}
