const express = require('express')
const router = express.Router()
const { getReceipts, getReceipt, createReceipt, updateReceipt, deleteReceipt, updateReceiptImage, getFilteredReceipts } = require('../controllers/receiptController')
const { protect } = require('../middleware/authMiddleware')
//Image Upload
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }

});
const upload = multer({storage: storage})



/* 
Below takes in the requests and passes them to the corrosponding controller based on URL and type
*/

// Any routes from / will then run controller based on get or post
// Protect check is user token is in header
router.route('/').get(protect, getReceipts).post(protect, upload.single('receiptImage'), createReceipt)

router.route('/:filters').post(protect, getFilteredReceipts)

// Any routes from /:id will then run controller based on get, put or delete
router.route('/:id').get(protect, getReceipt).put(protect, updateReceipt).delete(protect, deleteReceipt).patch(protect, upload.single('receiptImage'), updateReceiptImage)

module.exports = router
