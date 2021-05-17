const guard = require('../models/guard')

module.exports = {
    async test(req, res, next) {
        const result = 'blalala'
        if (result){
            res.json(result);
            console.log(result);
        } else {
            res.status(404).send('not found');
        }
    },
}