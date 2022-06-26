<script setup lang="ts">
import { ref } from 'vue';
import { useReceiptsStore } from '../store/receipts'
import { useUserStore } from '../store/users'
import router from '../router/index'
const user = useUserStore()
const receipt = useReceiptsStore()

//Get path and fetch receippt
var pathName = window.location.pathname;
var hostName = window.location.hostname;
var id = pathName.substring(pathName.lastIndexOf('/') + 1);

//define form type
const props = defineProps({
  editPage:Boolean,
  buttonText:String
})

//form reactive data
const formData = ref({
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
    }
})

//Submit form handler
const formSubmission = () => {
  if (!props.editPage) {
    receipt.createReceipt(user.getUser.token, formData.value.description, formData.value.price, formData.value.date, fileStore.value.fileStore, formData.value.tags)
    .then(() => {router.replace(`/`)})
  } else if (props.editPage == true) {
    receipt.updateReceipt(user.getUser.token, id, formData.value.description, formData.value.price, formData.value.date, fileStore.value.fileStore, formData.value.tags)
    .then(() => {router.replace(`/view/${id}`)})
    
  }
  
}

const fileStore = ref({
  fileStore: {} as File
})


const onFileChange = (e: any) => {
  const file = e.target.files[0]
  fileStore.value.fileStore = file
}


// Update reactive data from store
if (props.editPage == true) {
  receipt.fetchReceipt(user.getUser.token, id).then(() => {
    console.log(receipt.getReceipt)
    formData.value.description = receipt.getReceipt.description
    formData.value.price = receipt.getReceipt.price
    formData.value.date = receipt.getReceipt.date
    formData.value.image = receipt.getReceipt.image
    formData.value.tags = receipt.getReceipt.tags

  })
}

</script>

<template>
<div class="container mx-auto mt-5 min-h-full flex-row">
  <div class="flex flex-row">
  <div class="container basis-1/2" >
    <div class="w-full">
      <form @submit.prevent="formSubmission()" class="" action="#" method="POST">
        <div class="rounded-md shadow-sm -space-y-px">
          <div>

            <label class="rounded text-base font-medium text-gray-900" for="firstname" >Description</label>
            <input v-model="formData.description" id="description" name="description" type="text" class="w-full mb-6 mt-4 block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900" required>

            <label class="rounded text-base font-medium text-gray-900" for="firstname" >Amount</label>
            <input v-model="formData.price" id="price" name="price" type="number" class="w-full mb-6 mt-4 block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900" required>

            <label class="rounded text-base font-medium text-gray-900" for="firstname" >Date</label>
            <input v-model="formData.date" id="ReceiptDate" name="date" type="date" class="w-full mb-6 mt-4 block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900" required>



            <label  class="rounded text-base font-medium text-gray-900" for="firstname" >Image</label>

            <input id="receiptImage" name="Image Upload" type="file" accept=".jpg, .jpeg, .png" ref="fileInput" @change="onFileChange" class="w-full mb-6 mt-4 block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900 ">





            <label class="rounded text-base font-medium text-gray-900 mb-4" for="firstname" >Catagory</label>
            <div class="columns-3 mt-4">
              <div v-for="catagory in formData.tags" :key="catagory.name" class="">
                <label class="mb-4 block items-center">
                  <input v-model="catagory.assigned" type="checkbox" class="form-checkbox text-indigo-600">
                  <span  class="ml-2">{{catagory.name}}</span>
                </label>
              </div>
            </div>
            <button type="submit" class="cursor-pointer inline-block content-center my-12 text-base my-6 py-3 px-6 rounded-full border-2 border-black  bg-gray-800 text-zinc-100 hover:border-blue-500 hover:bg-blue-500">{{props.buttonText}}</button>
        </div>
        </div>
      </form>
    </div>
    </div>
      <div v-if="editPage && formData.image" class="w-1/2 px-12 grid justify-items-center">
      <img v-bind:src="'/' + formData.image" /> </div>
  </div>



</div>

</template>
<style>
img {
  max-height: 650px
}</style>
