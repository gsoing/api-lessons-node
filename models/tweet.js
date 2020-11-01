const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        username: { 
          type: String,
          required: true  
        },
        source: {
            type: String,
            enum: ['WEB', 'MOBILE']
        }
    
    },
    { 
      timestamps: true,
      id: true,
      toObject: {
        versionKey: false,
        getters: true
      }
    }
  );

const tweet = mongoose.model('Tweet', tweetSchema);
module.exports = tweet;
