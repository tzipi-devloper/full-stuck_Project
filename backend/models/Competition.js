const mongoose = require('mongoose');

const competitionSchema = new mongoose.Schema({
  ownerId: {
     type: String,
      required: true 
    },
  category: {
     type: String,
      required: true 
    },
  rating: { 
    type: Number,
     required: true
   },
  ownerEmail: {
     type: String,
      required: true 
    },
  file: {
     type: String,
      required: true
     },
}, { timestamps: true });

module.exports = mongoose.model('Competition', competitionSchema);
