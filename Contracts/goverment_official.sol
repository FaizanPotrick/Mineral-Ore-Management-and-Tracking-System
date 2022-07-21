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
        oreDetails[mine_id][batch_id]=ore_details(amount,ore_type,grade,Fe_amount,file);
        approved[mine_id][batch_id]=state;
        string storage organisation_id=mine[mine_id].organisation_id;
        batchAmount[organisation_id][grade] +=amount;
    }

}
