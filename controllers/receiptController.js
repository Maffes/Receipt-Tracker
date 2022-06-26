const asyncHandler = require('express-async-handler')
const { globalAgent } = require('http')
const Receipt = require('../models/receiptModel')
const User = require('../models/userModel')

// Desc: returns all receipts | Type: GET /api/receipts | Access: Private
const getReceipts = asyncHandler(async (req, res) => {
  const receipts = await Receipt.find({user: req.user.id})
  res.status(200).json(receipts)
})
//  Desc: returns receipt by Id | Type: GET /api/receipts | Access: Private
const getReceipt = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id)
  const user = await User.findById(req.user.id)
  if(!receipt) {
    res.status(400)
    throw new Error('Receipt not found')
  }
  // Checks for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Checks if logged in user matches receipt owner
  if(receipt.user.toString() !== user.id) {
    res.status(401) 
      throw new Error('User not authorized')
  }
  res.status(200).json(receipt)
})













//  Desc: Updates receipt by id | Type: POST /api/receipts | Access: Private
const updateReceiptImage = asyncHandler(async (req, res) => {
  const receipt = await Receipt.findById(req.params.id)
  const user = await User.findById(req.user.id)
  if(!receipt) {
    res.status(400)
    throw new Error('This is the error location')
  }
  // Checks for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Checks if logged in user matches receipt owner
  if(receipt.user.toString() !== user.id) {
    res.status(401) 
      throw new Error('User not authorized')
  }

  
  await Receipt.findOneAndUpdate({_id: req.params.id}, {image: req.file.filename})

   res.status(201).json(updateReceiptImage)
  })


//  Desc: returns receipt by Id | Type: GET /api/receipts | Access: Private
const getFilteredReceipts = asyncHandler(async (req, res) => {
  //Get all receipts by user for filtering
  const receipts = await Receipt.find({user: req.user.id})
  //filtered list matches will append too
  var filteredReceipts = []

  // If there is a search match add to filtered receipts
  if(req.body.search !== '') {
    filteredReceipts = receipts.filter((item) => {
      return item.description.includes(req.body.search)
    })
  } else {
    filteredReceipts = receipts
  }

  //Date filter
  if(req.body.dateRange.start !== '' && req.body.dateRange.end !== '') {
    filteredReceipts = filteredReceipts.filter((item) => {
      return item.date >= req.body.dateRange.start && item.date <= req.body.dateRange.end
    })
  }

  //Price filter
  if(req.body.priceRange.start !== '' && req.body.priceRange.end !== '') {
    filteredReceipts = filteredReceipts.filter((item) => {
      return item.price >= req.body.priceRange.start && item.price <= req.body.priceRange.end
    })
  }


    //Catagory filter
    if (req.body.tags.Transport.assigned || req.body.tags.Groceries.assigned || req.body.tags.Housing.assigned || req.body.tags.Utilities.assigned || req.body.tags.Medical.assigned || req.body.tags.Insurance.assigned || req.body.tags.Business.assigned || req.body.tags.Misc.assigned) {
      filteredReceipts = filteredReceipts.filter((item) => {
        return item.tags.Transport.assigned == true && req.body.tags.Transport.assigned == true ||
        item.tags.Groceries.assigned == true && req.body.tags.Groceries.assigned == true ||
        item.tags.Housing.assigned == true && req.body.tags.Housing.assigned == true ||
        item.tags.Utilities.assigned == true && req.body.tags.Utilities.assigned == true ||
        item.tags.Medical.assigned == true && req.body.tags.Medical.assigned == true ||
        item.tags.Insurance.assigned == true && req.body.tags.Insurance.assigned == true ||
        item.tags.Business.assigned == true && req.body.tags.Business.assigned == true ||
        item.tags.Misc.assigned == true && req.body.tags.Misc.assigned == true
      })
    }
  res.status(200).json(filteredReceipts)
})





//  Desc: Creates a new receipt | Type: POST /api/receipts | Access: Private
const createReceipt = asyncHandler(async (req, res) => {
  if(!req.body) {
    res.status(400)
    throw new Error('No receipt field received')
  }
  //If no file upload set image to nothing
  let image = ''
  if (req.file !== undefined) {
    image = req.file.filename
  }


  //creates new receipt
  const receipt = await Receipt.create({
    description: req.body.description,
    price: req.body.price,
    date: req.body.date,
    tags: JSON.parse(req.body.tags),
    image: image,
    user: req.user.id
  })
  res.status(200).json(receipt)
})

//  Desc: Updates receipt by id | Type: PUT /api/receipts | Access: Private
const updateReceipt = asyncHandler(async (req, res) => {
  console.log()
  const receipt = await Receipt.findById(req.params.id)
  const user = await User.findById(req.user.id)
  if(!receipt) {
    res.status(400)
    throw new Error('This is the error location')
  }
  // Checks for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }
  // Checks if logged in user matches receipt owner
  if(receipt.user.toString() !== user.id) {
    res.status(401) 
      throw new Error('User not authorized')
  }
  //Updates all but image
  const updatedReceipt = await Receipt.findByIdAndUpdate(req.params.id, req.body, {new: true})
  await Receipt.findOneAndUpdate({_id: req.params.id}, {tags: JSON.parse(req.body.tags)})

  res.status(200).json(updatedReceipt)
})


//  Desc: Delete receipt by id | Type: DELETE /api/receipts | Access: Private
const deleteReceipt = asyncHandler(async (req, res) => {

  const receipt = await Receipt.findById(req.params.id)
  const user = await User.findById(req.user.id)

  if(!receipt) {
    res.status(400)
    throw new Error('Receipt not found')
  }

  if(!receipt) {
    res.status(400)
    throw new Error('Receipt not found')
  }

  // Checks for user
  if(!user) {
    res.status(401)
    throw new Error('User not found')
  }

  // Checks if logged in user matches receipt owner
  if(receipt.user.toString() !== user.id) {
    res.status(401) 
      throw new Error('User not authorized')
  }

  await receipt.remove()

  res.status(200).json({ id: req.params.id})
})

module.exports = {
  getReceipts,
  getReceipt,
  createReceipt,
  updateReceipt,
  deleteReceipt,
  updateReceiptImage,
  getFilteredReceipts
}