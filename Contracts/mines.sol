pragma solidity >=0.4.0;

contract mines {
        uint id=1;
        uint batch_id=1;   
    
    struct mines_detail {
      string mine_name;
      string location;
      string owner_name;
      string email;
      string phone_no;
      string block_no;
      string gst_no;
      string lease_periog;
      bool authorized ;
 
   }

   struct ore_details{
       string amount;
       string _type;
       string grade;
       string file;
   }

    mapping ( uint => mines_detail ) public minesdetail;
    mapping (uint => mapping (uint => ore_details) ) public oredetails; 
    
    function mine_detail(string memory _mine_name, string memory _location, string memory _owner_name, string memory _email, string memory _phone_no, string memory _block_no, string memory _gst_no, string memory _lease_periog) public{
        minesdetail[id] = mines_detail(_mine_name,_location,_owner_name,_email,_phone_no,_block_no,_gst_no,_lease_periog,true);
        id=id+1;
    }

    function batch(uint mine_id,string memory _amount, string memory ore_type, string memory _grade, string memory _file) public{
        oredetails[mine_id][batch_id]=ore_details(_amount,ore_type,_grade,_file);
    }

}
