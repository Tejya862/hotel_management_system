const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/Menu");

router.get('/', async(req, res) => {
    try{
        const data = await MenuItem.find();
        console.log('data fetched');
        res.status(200).json(data);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
})

router.get('/:tasteType', async(req, res) => {
    try{
        const tasteType = req.params.tasteType;
        if(tasteType == 'sweet' || tasteType == 'spicy' || tasteType == 'sour'){
            const response = await MenuItem.find({taste : tasteType});
            console.log('response fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error : 'Invalid taste type'});
        }
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
})

router.post('/', async(req, res) => {
    try{
        const data = req.body;
        const newItem = new MenuItem(data);
        const response = await newItem.save();
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
})

router.put('/:id', async(req, res) => {
    try{
        const Itemid = req.params.id;
        const updateItem = req.body;
        const response = await MenuItem.findByIdAndUpdate(Itemid, updateItem, {
            new : true,
            runValidators : true,
        })

        if(!response){
            return res.status(404).json({error : 'Item not found'})
        }
        console.log('data saved');
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
})

router.delete('/:id', async(req, res) => {
    try{
        const Itemid = req.params.id;
        const response = await MenuItem.findByIdAndRemove(Itemid)

        if(!response){
            return res.status(404).json({error : 'Item not found'})
        }
        console.log('data deleted');
        res.status(200).json({message: 'Item Deleted Successfully'});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message : 'Internal Server Error'});
    }
})

module.exports = router;