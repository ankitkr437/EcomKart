const mongoose=require("mongoose")
 
const  ReviewSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      unique: true
    },
    productId:{
      type: String,
      unique: true
    },
    text:{
        type:String,
    },
    rating:{
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review",ReviewSchema);
 
