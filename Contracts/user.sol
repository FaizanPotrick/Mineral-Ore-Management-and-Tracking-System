// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract user{
      
    mapping (string => string) public user_detail;

      function userdetails (string calldata user_id ,string calldata userDetail_hash) external {
          user_detail[user_id]=userDetail_hash;
      }

}
