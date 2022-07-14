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
    
   

    function batch(uint mine_id,string memory _amount, string memory ore_type, string memory _grade, string memory _file) public{
        oredetails[mine_id][batch_id]=ore_details(_amount,ore_type,_grade,_file);
        batch_id=batch_id+1;
    }

}
