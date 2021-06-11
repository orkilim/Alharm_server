const Events = require('../models/events')

function getMostFrequent(arr) {
    const hashmap = arr.reduce((acc, val) => {
     acc[val] = (acc[val] || 0 ) + 1
     return acc
  },{})
 return Object.keys(hashmap).reduce((a, b) => hashmap[a] > hashmap[b] ? a : b)
}

module.exports = {
    async getStatistics(req, res, next) {
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const result = await Events.find({});
        const commonArea = getMostFrequent(result.map(({ address }) => (address)))
        let avgTime = getMostFrequent(result.map(({ eventDate }) => (parseFloat(eventDate.slice(eventDate.length - 8)))))

        let commonDay = getMostFrequent(result.map(({ eventDate }) => (new Date(eventDate.slice(0, 10)).getDay())))
        const day = days[commonDay]

        

        if (avgTime > 0 && avgTime < 12) {
            avgTime = '00:00 - 12:00'
        } else if (avgTime > 12 && avgTime < 20) {
            avgTime = '12:00 - 20:00'
        } else {
            avgTime = '20:00 - 24:00'
        }

        console.log('commonArea: ', commonArea)
        console.log('avgTime: ', avgTime)
        console.log('commonDay: ', days[commonDay])

        if (result){
            res.json({
                commonArea,
                avgTime,
                day,
            });
        } else {
            res.status(404).send('not found');
        }
    },
}