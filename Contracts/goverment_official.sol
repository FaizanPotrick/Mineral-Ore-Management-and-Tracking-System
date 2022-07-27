// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./mines.sol";
import "./organisations.sol";


contract goverment_official is mines,organisations{

    //Register Organization
    //Input:- 1)Organization ID , 2)Organization Detail(Hash)
    function organisationDetail(string calldata organisation_id,string calldata organisation_hash) external{
        
        organisation[organisation_id]=organisation_detail(organisation_id,organisation_hash);
    }
    
    //Register Mine
    //Input:- 1)Mine ID , 2)Mine Detail(Hash)
    function mineDetail(string calldata mine_id,string calldata organisation_id,string calldata mine_hash) external{
        
        mine[mine_id]=mine_detail(mine_id,organisation_id,mine_hash);
    }

    //Creating Batch 
    //Input:-1)Batch Detail[Batch ID,Mine Id,Organization Id,Manager Id,Amount,Ore Type,Grade,Fe%,Sample Image(Hash),Lab Document(Hash),Government Officers Id,Government Lab Document(Hash)],
    //       2)Approve(True) or Disapprove (False)
    function minedBatch(ore_details calldata oredetails,bool state) external{
        require(keccak256(abi.encodePacked((mine[oredetails.mine_id].mine_id))) == keccak256(abi.encodePacked((oredetails.mine_id))),"Provided Mine ID Doesn't Exist");
        require(keccak256(abi.encodePacked((batch[oredetails.mine_id][oredetails.batch_id].batch_id))) != keccak256(abi.encodePacked((oredetails.batch_id))),"Provided Batch ID Exist");        
        batch[oredetails.mine_id][oredetails.batch_id]=ore_details(oredetails.batch_id,
                                                                   oredetails.mine_id,
                                                                   oredetails.organisation_id,
                                                                   oredetails.manager_id,
                                                                   oredetails.amount,
                                                                   oredetails.ore_type,
                                                                   oredetails.grade,
                                                                   oredetails.Fe_amount,
                                                                   oredetails.sample_img,
                                                                   oredetails.lab_doc,
                                                                   oredetails.officer_id,
                                                                   oredetails.gov_doc);
        batchState[oredetails.mine_id][oredetails.batch_id]=state;

        //If Batch Is Approved then only it can be Sell
        //That Batch is Added to Mine Total Batch  
        if(state == true){
            mineOreAmount[oredetails.mine_id][oredetails.ore_type][oredetails.grade] += oredetails.amount;            
        }
    }

}
