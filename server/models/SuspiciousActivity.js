const mongoose = require("mongoose");
const SuspiciousActivity = new mongoose.Schema({
type_of_activity:{
    type:String
},
reason:{
    type:String
},
price_difference:{
    type:Number
},
region_id:{
    type:String
},
});

module.exports= SuspiciousActivity;