const mongoose = require("mongoose");


const employeeSchema=new mongoose.Schema({
    
    name: {
        type:String,
        required:true
        
    },
    email:{
            type:String,
            required:true

        },
        number:{
            type:String,
            required:true,
            unique: true,
          
        },
        country:{
            type:String,
            required:true,
          
          
        },
        message:{
            type:String,
            required:true,
         
          
        },
        
      
})

// now we need to craete collection  //which is there cources but Course here
const Resgister=new mongoose.model("Order", employeeSchema);

module.exports=Resgister;