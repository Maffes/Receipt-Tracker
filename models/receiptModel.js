const mongoose = require('mongoose')

const receiptSchema = mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
     description: {
      type: String,
      required: [true, 'Add a description']
    },
    price: {
      type: Number,
      required: [true, 'Add a price']
    },
    date: {
      type: String,
      required: [true, 'Add a date']
    },
    tags: {
      type: Object,
      required: false
    },
    image: {
      type: String || null,
       required: false
    },
  },
  {
  timestamps: true,
  }
)

module.exports = mongoose.model('Receipt', receiptSchema)