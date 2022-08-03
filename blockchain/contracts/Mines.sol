// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Mines{

    
    struct mine_detail {
      string mine_id;
      string organisation_id;
      string mine_hash;
   }


   struct ore_details{
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
       string gov_doc;
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
    struct Batch_id {
        string batch_id;
    }
    
    struct Transaction_id {
        string transaction_id;
    }

    mapping (string => mine_detail ) public mine;
    mapping (string => mapping (string => ore_details) ) public batch;
    mapping (string => mapping (string => bool)) public batchState;
    mapping (string => Batch_id[]) public minesBatch;
    mapping (string => mapping (string => mapping(string=> uint))) public mineOreAmount;
    mapping (string => mapping(string=> transaction_details)) transaction;
    mapping (string => Transaction_id[]) public minesTransaction;

}
