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
       string organisation_id;
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

    mapping (string => mine_detail ) public mine;//map mine id to mine details
    mapping (string => batch_details[]) public batch;//map mine id to map batch id to ore detail
    mapping (string => mapping (string => mapping(string=> uint))) public mineOreAmount;//map mine id to map ore type to map grade to ore amount
    mapping (string => transaction_details[]) public transaction;//map transaction id to transaction details 

}