// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract mines{

    
    struct mine_detail {
      string mine_id;
      string organisation_id;
      string mine_hash;
   }


   struct ore_details{
       string batch_id;
       uint amount;
       string ore_type;
       string grade;
       string Fe_amount;
       string file;   
   }

   struct mine_ore_details{
       string batch_id;
       string mine_id;
       string manager_id;
       string sample_img;
       string lab_doc;
    
   }
   struct gov_ore_detail{
       string batch_id;
       string officer_id;
       string gov_doc;
   }   
    
    struct transaction_partner_details{
       string transaction_id;
       string mine_id;
       string mine_organisation_id;
       string buyer_organisation_id;
   }
    
    struct transaction_ore_details{
       string transaction_id;
       uint amount;
       string ore_type;
       string grade;
       string price;
   }

    mapping (string => mine_detail ) public mine;
    mapping (string => mine_ore_details ) public mineBatch;
    mapping (string => gov_ore_detail ) public govBatch;
    mapping (string => mapping (string => ore_details) ) public batch;
    mapping( string => mapping (string => bool)) public batchState;
    mapping (string => mapping (string => mapping(string=> uint))) public mineOreAmount;
    mapping (string=> transaction_partner_details) transactionPartner;
    mapping (string=> transaction_ore_details) transactionOre;

}
