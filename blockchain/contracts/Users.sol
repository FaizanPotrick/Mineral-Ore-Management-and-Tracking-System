// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Users{
      
    mapping (string => string) public user;//map user id to  user details(Hash)
    mapping (string => string) public region;//map region id to  region details(Hash)

    //Register User
    //Input:- 1)User ID , 2)User Detail(Hash)
    function createUser(string calldata user_id ,string calldata user_hash) external {
        user[user_id]=user_hash;
      }
      
    //Register Region
    //Input:- 1)Region ID , 2)Region Detail(Hash)    
    function createRegion(string calldata region_id ,string calldata region_hash) external {
        region[region_id]=region_hash;
      }

}