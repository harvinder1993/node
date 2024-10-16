const MenuModel = require('../../model/menu')
// Create and Save a new user
exports.create = async (req, res) => {
    if (!req.body.user_id && !req.body.name && !req.body.details && !req.body.price && !req.body.ingredients_id && !req.body.food_type_id && !req.body.cuisine_id && !req.body.status && !req.body.type) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    
    const menu = new MenuModel({
        user_id: req.body.user_id,
        name: req.body.name,
        details: req.body.details,
        price: req.body.price,
        ingredients_id: req.body.ingredients_id,
        food_type_id: req.body.food_type_id,
        cuisine_id: req.body.cuisine_id,
        status: req.body.status,
        type: req.body.type,
    });
    
    await menu.save().then(data => {
        res.send({
            message:"Menu created successfully!!",
            menu:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating Menu"
        });
    });
};