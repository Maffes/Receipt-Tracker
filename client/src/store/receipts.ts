import { defineStore } from 'pinia';
import axios from 'axios'
const url = window.location.host
// const URI = `${url}/api`
const URI = `http://localhost:3001`



export const useReceiptsStore = defineStore("useReceiptsStore", {
state: () => {
    return {
      receipts: [{
        _id: '',
        description: '',
        price: '',
        date: '',
        image: '',
        tags: {
            Transport: {name: 'Transport', assigned: false},  
            Groceries: {name: 'Groceries', assigned: false},
            Housing: {name: 'Housing', assigned: false},
            Utilities: {name: 'Utilities', assigned: false},
            Medical: {name: 'Medical', assigned: false},
            Insurance: {name: 'Insurance', assigned: false},
            Business: {name: 'Business', assigned: false},
            Misc: {name: 'Misc', assigned: false},
      }}],
      receipt: {
        _id: '',
        description: '',
        price: '',
        date: '',
        image: '',
        tags: {
          Transport: {name: 'Transport', assigned: false},  
          Groceries: {name: 'Groceries', assigned: false},
          Housing: {name: 'Housing', assigned: false},
          Utilities: {name: 'Utilities', assigned: false},
          Medical: {name: 'Medical', assigned: false},
          Insurance: {name: 'Insurance', assigned: false},
          Business: {name: 'Business', assigned: false},
          Misc: {name: 'Misc', assigned: false},
    }},
      receiptsLength: 0
    }
},


getters: {
    getReceipts(state){
        return state.receipts
    },
    getReceiptsLength(state){
        return state.receiptsLength
    },
    getReceipt(state){
        return state.receipt
    }
},
    

actions: {

    //Get all receipts
    async fetchReceipts(token:string) {
        //reset receipts to stop receipt duplication bug on login

        this.receipts = []
        const receipts = await axios.get(`/api/receipts/`, {
            headers: {'Authorization': `Bearer ${token}`}})
            receipts.data.forEach((value:any) => {
            this.receipts.push(value);})
            this.receiptsLength = this.receipts.length  

    },







    // Get receipt by ID
    async fetchReceipt(token:string, id:String) {
        try {
        const receipt = await axios.get(`/api/receipts/${id}`, {
            headers: {'Authorization': `Bearer ${token}`}})
            this.receipt = receipt.data
        } catch (err) {
            console.log(err)
        }
     },

    // Create new receipt
    async fetchFilteredReceipt(token:string, search:String, tags:any, dateRange:any, priceRange:any){
        try {
            const filteredReceipts = await axios.post(`/api/receipts/filtered`, {search, tags, dateRange, priceRange }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        this.receipts = []
        filteredReceipts.data.forEach((value:any) => {
            this.receipts.push(value);})
            this.receiptsLength = this.receipts.length
        } catch (err) {
            console.log(err)
        }
     },




    // Create new receipt
    async createReceipt(token:string, description:String, price:String, date:String, receiptImage:File, tagInput:any) {
        var tags = `${JSON.stringify(tagInput)}`
        try {
        await axios.post(`/api/receipts/`, {description, price, date, tags, receiptImage }, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            }
        })
        } catch (err) {
            console.log(err)
        }
     },


    // Update receipt by ID
    async updateReceipt(token:string, id:String, description:String, price:String, date:String, receiptImage:File, tagInput:any) {

        var tags = `${JSON.stringify(tagInput)}`
        try {
        await axios.put(`/api/receipts/${id}`, { description, price, date, tags }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        } catch (err) {
            console.log(err)
        }

         if (receiptImage !== null) {
             try {
            await axios.patch(`/api/receipts/${id}`, {receiptImage}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`
                }
                
            })
        } catch (err){
            console.log(err)
        }
        }
     },







    // Delete receipt by ID
    async deleteReceipt(token:string, id:string) {
        try {
        await axios.delete(`/api/receipts/${id}`, {
            headers: {'Authorization': `Bearer ${token}`}}).then(() => {
                const i = this.receipts.map(item => item._id).indexOf(id)
                    this.receipts.splice(i, 1);
            })
        } catch (err) {
            console.log(err)
        }
     },
    }
})

