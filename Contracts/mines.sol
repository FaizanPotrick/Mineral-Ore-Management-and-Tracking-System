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
       string _type;
       string grade;
       string Fe_amount;
       string file;
   }

   struct transaction_details{
       string transaction_id;
       string mine_id;
       string mine_organisation_id;
       string buyer_organisation_id;
       uint amount;
       string grade;
       string ewaybill;
       string price;
   }

    
    mapping (string => mine_detail ) public mine;
    mapping (string => mapping (string => ore_details) ) public batch;
    mapping( string => mapping (string => bool)) public batchState;
    mapping (string =>mapping(string=> uint)) public mineBatchAmount;
    mapping (string=> transaction_details) transaction;

}
