const restaurentModel = require("../models/restaurentModel");
const restorentModel = require("../models/restaurentModel");
//CREATE RESTORENT

const createRestorentController = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickUP,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    //VALIDATION
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Error in Create restorent API",
      });
    }
    const newRestorent = new restorentModel({
      title,
      imageUrl,
      foods,
      time,
      pickUP,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });

    await newRestorent.save();
    res.status(201).send({
      success: true,
      message: "New restorent created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Create Restorent API",
    });
  }
};

//GET ALL RETSORENT
const getAllRestaurentController = async (req, res) => {
  try {
    const restorents = await restaurentModel.find({});
    if (!restorents) {
      return res.status(404).send({
        success: false,
        message: "NO RESTAURENT AVAILAbLE",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restorents.length,
      restorents,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Get all Restaurent API",
      error,
    });
  }
};

//GET RESTOREND BY ID
const getRestaurentByIdController = async (req, res) => {
  try {
    const restorentId = req.params.id;
    if (!restorentId) {
      return res.status(404)({
        success: false,
        message: "Please Provide Restorent ID",
      });
    }
    //find-restorent
    const restorent = await restorentModel.findById(restorentId);
    if (!restorent) {
      return res.status(404).send({
        success: false,
        message: "No Restaurent found",
      });
    }
    res.status(200).send({
      success: true,
      restorent,
    });
  } catch (error) {
    console.log(erroe);
    res.status(500).send({
      success: false,
      message: "Error in get restorent by id API",
    });
  }
};

//DELETE RESTORENT
const deleteRestaurentController = async(req, res) => {
    try {
        const restorentId = req.params.id
        if (!restorentId){
            return res.status(404).send({
                success:false,
                message:'Please provide restorent ID'
            })
        }
        //resto delete
        await restaurentModel.findByIdAndDelete(restorentId);
        res.status(200).send({
            success: true,
            message:"Restaurent Deleted Successfully"
        })
          if (!restorentId) {
            return res.status(404).send({
              success: false,
              message: "NO RESTORENT FOUND",
            });
          }

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error In Delete Restorent API"
        })
        
    }
}

module.exports = {
  createRestorentController,
  getAllRestaurentController,
  getRestaurentByIdController,
  deleteRestaurentController,
};
