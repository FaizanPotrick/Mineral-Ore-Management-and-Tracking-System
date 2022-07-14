pragma solidity >=0.5.0 <0.6.0;
import "./mines.sol";


contract goverment_official is mines{
       uint id=1;
    
     function approve_batch() public{  }
     
     function mine_detail(string memory _mine_name, string memory _location, string memory _owner_name, string memory _email, string memory _phone_no, string memory _block_no, string memory _gst_no, string memory _lease_periog) public{
        minesdetail[id] = mines_detail(_mine_name,_location,_owner_name,_email,_phone_no,_block_no,_gst_no,_lease_periog,true);
        id=id+1;
    }
    
}
