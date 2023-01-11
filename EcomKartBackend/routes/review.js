const express= require("express")
const router =express.Router();
const Review = require("../models/Review");
const {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin,
  } = require("./verifyToken");
  
 
router.post("/", async (req, res) => {
    const reviewinfo={
        userId:req.body.userId,
        productId:req.body.productId,
        text:req.body.text,
        rating:req.body.rating
    }
  const newReview = new Review(reviewinfo);
  try {
    const savedReview = await newReview.save();
    res.status(200).json(savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

 
 
router.get('/avgrating/:id', async (req,res)=>{
  const productId = req.params.id;
  try{
    const avgrating = await rating.aggregate([
      {
        $match: {
          ratingGiven: { $gte: 0 },
          "rating.productId": { "$in": productId }
        },
      },
      {
       $project: {
          rating: "$ratingGiven",
        },
      },
      {
        $group: {
          rating: "$rating",
          // avgRating: { $sum: "$rating" },
        },
      },
    ]);
    res.status(200).json(avgrating);
  }catch (err) {
      res.status(500).json(err);
    }
})

router.get('/product/:id', async (req,res)=>{

    try{
    const review =await Review.find({ productId: req.params.id });
    res.status(200).json(review);
    }catch (err) {
        res.status(500).json(err);
      }
})
 
 
router.get('/user/:id', async (req,res)=>{

    try{
    const review =await Review.find({ userId: req.params.id });
    res.status(200).json(review);
    }catch (err) {
        res.status(500).json(err);
      }
})

module.exports = router;