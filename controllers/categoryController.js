const categoryModel = require("../models/categoryModel")

//create Category
const createCategoryController = async(req, res) => {
    try {
        const {title, imageUrl} =  req.body
        //validation
        if(!title){
            return res.status(500).send({
                success:false,
                message:"Please provide category title or image"
            })
        }
        const newCategory = new categoryModel({title, imageUrl})
        await newCategory.save()
        res.status(200).send({
            success: true,
            message :"Category Created",
            newCategory
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message:"Error in Create category API",
            error
        })
        
    }
}


// GET ALL CATEGORY
const getAllController =async (req, res) => {
    try {
       const categories = await categoryModel.find({})
        if(!categories){
            return res.status(404).send({
                success: false,
                message:'No Categorie found'
            })
        }
        res.status(200).send({
            success:true,
            totalcat: categories.length,
            categories
        })
       
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in Get ALL CATEGFORY',
            error
        })
        
    }
};

//UDATE CATEGORY
const updateCategoryController = async (req, res) => {
    try {
        const {id} = req.params
        const {title, imageUrl} = req.body
        const updatedCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new:true})
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message: 'No Category Found'
            })
        }
        res.status(200).send({
            success: true,
            message: "Category Update SuccessFully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Update Category',
            error
        })
        
    }
}


//DELETE CATEGORY
const deleteCategoryController = async(req, res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success: false,
                message: "Please Provide Category ID"
            })
        }
        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(500).send({
                success: false,
                message:'No Category Found with This Id'
            })
        }
        await categoryModel.findByIdAndDelete(id)
        res.status(200).send({
            success:true,
            message:'Category Deleted SuccessFully',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Delete Category API',
            error
        })
        
    }

}

module.exports = {createCategoryController,getAllController,updateCategoryController, deleteCategoryController}