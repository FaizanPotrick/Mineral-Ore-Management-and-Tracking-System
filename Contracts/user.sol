// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract user{
      
    mapping (string => string) public user_detail;
    mapping (string => string) public region_detail;

      function userDetails(string calldata user_id ,string calldata userDetail_hash) external {
          user_detail[user_id]=userDetail_hash;
      }
       function regionDetails(string calldata region_id ,string calldata regionDetail_hash) external {
          region_detail[region_id]=regionDetail_hash;
      }

}
