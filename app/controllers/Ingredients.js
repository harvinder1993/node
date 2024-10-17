const multer = require('multer');
const path = require('path');
const IngredientsModel = require('../../model/ingredients')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');  
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));  
    }
});
// File filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);  // Accept the file
    } else {
        cb(new Error('Only JPEG and PNG images are allowed!'), false);  // Reject the file
    }
};

// Configure multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },  // Limit file size to 5MB
    fileFilter: fileFilter
}).single('logo');  

// Create and Save a new user
exports.create = async (req, res) => {
    upload(req, res, async function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred when uploading
            return res.status(500).json({ message: err.message });
        } else if (err) {
            // An unknown error occurred when uploading
            return res.status(500).json({ message: err.message });
        }

        // Check if required fields are provided
        if (!req.body.name || !req.body.description || !req.body.status) {
            return res.status(400).send({ message: "Content can not be empty!" });
        }

    
        // Create new ingredient with or without a logo
        const ingredient = new IngredientsModel({
            name: req.body.name,
            description: req.body.description,
            logo: req.file ? req.file.path : '',  // Save the logo path if it was uploaded
            status: req.body.status
        });

        // Save ingredient to database
        try {
            const savedIngredient = await ingredient.save();
            res.status(201).send({
                message: "Ingredient created successfully!!",
                ingredient: savedIngredient
            });
        } catch (error) {
            res.status(500).send({
                message: error.message || "Some error occurred while creating Ingredient"
            });
        }
    });
};


// Retrieve all users from the database.
exports.findAll = async (req, res) => {
    try {
        const ingredients = await IngredientsModel.find();
        res.status(200).json(ingredients);
    } catch(error) {
        res.status(404).json({message: error.message});
    }
};