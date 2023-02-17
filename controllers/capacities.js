import capacityMessage from '../models/capacityMessage.js'

export const getCapacities = async (req, res)  => {
    try {
        var query = {rownum: 1};
        capacityMessage.findOne(query, (error, result) =>  {
            if(error){
                res.send(error);
            }else{
                res.send(result);
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

export const updateCapacities = async (req, res)  => {
    try {
        const  capacitiesCollection = await capacityMessage.find();
        const updateResult  = await capacityMessage.findOneAndUpdate(
            { _id: capacitiesCollection._id },
            { capacities: [] },
            { new: true, overwrite: true }
        );

        console.log(updateResult);
        res.status(200).json(updateResult);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
};

export const uploadCapacities = async (req, res)  => {
    try {
        var query = {rownum: 1},
            update = { capacities: req.body },
            options = { upsert: true, new: true, setDefaultsOnInsert: true };

        capacityMessage.findOneAndUpdate(query, update, options, (error, result) =>  {
            if(error){
                res.send(error);
            }else{
                res.send({message:"sucessfull"});
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};