// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;


contract mines {

  
    struct mine_detail {
      string mine_id;
      string organisation_id;
      string mine_hash;
   }


   struct ore_details{
       uint amount;
       string _type;
       string grade;
       string Fe_amount;
       string file;
   }

    
    mapping (string => mine_detail ) public mine;
    mapping (string => mapping (string => ore_details) ) public oreDetails;
    mapping( string => mapping (string => bool)) public approved;
    

}
