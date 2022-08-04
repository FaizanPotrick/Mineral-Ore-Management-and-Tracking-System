// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./Organisations.sol";
import "./Users.sol"; 

contract GovernmentOfficials is Organisations,Users{

    //Register organisation
    //Input:- 1)organisation ID , 2)organisation Detail(Hash)
    function createOrganisation(string calldata organisation_id,string calldata organisation_hash) external{
        
        organisation[organisation_id]=organisation_detail(organisation_id,organisation_hash);
    }
    
    //Register Mine
    //Input:- 1)Mine ID , 2)Mine Detail(Hash)
    function createMine(string calldata mine_id,string calldata organisation_id,string calldata mine_hash) external{
        
        mine[mine_id]=mine_detail(mine_id,organisation_id,mine_hash);
    }

    //Creating Batch 
    //Input:-1)Batch Detail[Batch ID,Mine Id,Manager Id,Quantity Of Ore,Ore Of Type,Grade,Fe%,OreSample Image(Hash),Lab Document of Miner(Hash),Government Officers Id,Government Lab Document(Hash)],
    function createMinedBatch(batch_details calldata oredetails) external{
        require(keccak256(abi.encodePacked((mine[oredetails.mine_id].mine_id))) == keccak256(abi.encodePacked((oredetails.mine_id))),"Provided Mine ID Doesn't Exist");
        //Storing the Batch Information
        batch[oredetails.mine_id].push(batch_details(oredetails.batch_id,
                                                     oredetails.mine_id,
                                                     oredetails.manager_id,
                                                     oredetails.amount,
                                                     oredetails.ore_type,
                                                     oredetails.grade,
                                                     oredetails.Fe_amount,
                                                     oredetails.sample_img,
                                                     oredetails.lab_doc,
                                                     oredetails.officer_id,
                                                     oredetails.state
                                                    ));
                                                     
                                                                   

        //If Batch Is Approved then only it can be Sell
        //That Batch is Added to Mine Total Batch  
        if(oredetails.state == true){
            mineOreAmount[oredetails.mine_id][oredetails.ore_type][oredetails.grade] += oredetails.amount;            
        }
    }
  
    //Get all Batches of A mine
    function getAllBatches(string calldata mine_id) external view returns(batch_details[] memory){
        batch_details[]    memory mine_batches = new batch_details[](batch[mine_id].length);
        for(uint i = 0; i < batch[mine_id].length; i++){
            mine_batches[i]=batch[mine_id][i];
        }
        return mine_batches;
    }

}