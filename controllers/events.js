const Events = require('../models/events')

module.exports = {
    async getStatistics(req, res, next) {
        const result = await Events.find({});
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },
}