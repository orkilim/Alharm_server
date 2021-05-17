const Woman = require('../models/woman')
const { TWILIO_SMS_SID, TWILIO_SMS_AUTH_TOKEN } = require('../consts')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {validationResult} = require("express-validator");
const twilio = require('twilio')


module.exports = {
  async sendSMS(req, res, next) {
    try {
      const { phoneNumber = null } = req.query;
      const user = await Woman.findOne({ phoneNumber });
      const { guards } = user
      const client = twilio(TWILIO_SMS_SID, TWILIO_SMS_AUTH_TOKEN)

      await Promise.all(guards.map((contact) => {
        client.messages
        .create({
          body: 'al-harmmmmmmm!!!',
          from: '+972525080684',
          to: contact.phoneNumber
        })
      }))

      res.json('sms sent successfully!');
      console.log('sms sent successfully!');

    } catch(err) {
      res.status(404).send('not found or already exist');
    }
  },



  async SaveWomanAndGuards(req, res, next) {
    const { name = null, address = null, phoneNumber = null, guards } = req.body;
    const woman = new Woman ({ name, address, phoneNumber, guards })
    const result = await woman.save();

    if (result) {
      res.json('saved successfully in DB!');
      console.log('saved successfully in DB!');
    } else {
      res.status(404).send('not found or already exist');
    }
  },


  async UpdateWoman(req, res, next) {
    const { phoneNumber = null, guards = null } = req.body;
    const result = await Woman.findOneAndUpdate({ phoneNumber }, { guards });
    
    if (result) {
      res.json('saved successfully in DB!');
      console.log('saved successfully in DB!');
    } else {
      res.status(404).send('not found or already exist');
    }
  },


  async getGuardsFromDB(req, res, next) {
    const { phoneNumber = null } = req.query;
    const result = await Woman.findOne({ phoneNumber });

    const { guards } = result
    const data = guards.map((curr) => ({
        name: curr.name,
        phone: curr.phoneNumber,
    }))  
    
    if (data) {
      console.log(data);
      res.json(data);
    } else {
      res.status(404).send('not found or already exist');
    }
  },



  async signup (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty())
        return res.status(400).json({ errors: errors.array() });
    
    const { username = null, password = null, address = null, phoneNumber = null, guards = null } = req.body;
    try {
        const tmp = await Woman.findOne({ phoneNumber });
        if (tmp) 
            return res.status(400).json({ msg: "User Already Exists" });
        
        const user = new Woman({ username, password, address, phoneNumber, guards });
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
        
        jwt.sign( {user: { id: user.id }}, "randomString", 
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                    token
                });
            }
        );
    } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
    }
},

async login (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) 
        return res.status(400).json({ errors: errors.array() });

    const { username = null, phoneNumber = null, password = null } = req.body;
    try {
        let user = await Woman.findOne({ phoneNumber });
        if (!user)
            return res.status(400).json({ message: "User Not Exist" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
            return res.status(400).json({ message: "Incorrect Password !" });

        jwt.sign({ user: { id: user.id }}, "randomString",
            (err, token) => {
                if (err) throw err;
                res.status(200).json({token});
            }
        );
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Server Error"});
    }
},

}