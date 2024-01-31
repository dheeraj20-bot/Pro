const Expertise = require("../models/expertise")




exports.expertise = async (req,res) => {
   try{
    const {
        name
    } = req.body

     if(!name){
        return res.status(403).send({
        success: false,
        message:"All fields are required",
    })
     }

     const existingExpertise = await Expertise.findOne({name})
     

     if (existingExpertise) {
        return res.status(400).json({
            success: false,
            message: "Already Created",
        });
    }

    const ExpertiseCreation = await Expertise.create({name})
    return res.status(200).json({
        success: true,
        message: "Expertise Created successfully",
    });
   }
   catch(error){
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "Not able to create Expertise",
    });
   }
};