// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Mines{

    struct mine_detail {
      string mine_id;
      string organisation_id;
      string mine_hash;
   }

   struct batch_details{
       string batch_id;
       string mine_id;
       string manager_id;
       uint amount;
       string ore_type;
       string grade;
       string Fe_amount;
       string sample_img;
       string lab_doc;
       string officer_id;
       bool state;
   }
   
    struct transaction_details{
       string transaction_id;
       string mine_id;
       string mine_organisation_id;
       string buyer_organisation_id;
       uint amount;
       string ore_type;
       string grade;
       string price;
   }
function setBatchDetails(string memory _batch_id,string memory  _mine_id,string memory  _manager_id,uint _amount,string memory  _ore_type,string memory  _grade,string memory  _Fe_amount,string memory  _sample_img,string memory  _lab_doc,string memory  _officer_id,bool _state) public{
    batch_details memory batch_detail;
    batch_detail.batch_id = _batch_id;
    batch_detail.mine_id = _mine_id;
    batch_detail.manager_id = _manager_id;
    batch_detail.amount = _amount;
    batch_detail.ore_type = _ore_type;
    batch_detail.grade = _grade;
    batch_detail.Fe_amount = _Fe_amount;
    batch_detail.sample_img = _sample_img;
    batch_detail.lab_doc = _lab_doc;
    batch_detail.officer_id = _officer_id;
    batch_detail.state = _state;
    batch[_mine_id].push(batch_detail);
}

    mapping (string => mine_detail ) public mine;//map mine id to mine details
    mapping (string => batch_details[]) public batch;//map mine id to map batch id to ore detail
    mapping (string => mapping (string => mapping(string=> uint))) public mineOreAmount;//map mine id to map ore type to map grade to ore amount
    mapping (string => transaction_details[]) public transaction;//map transaction id to transaction details 

}