<script setup lang="ts">
import { ref } from 'vue';
import { useReceiptsStore } from '../store/receipts'
import { useUserStore } from '../store/users'
const user = useUserStore()
const receipt = useReceiptsStore()

//Get path and fetch receippt
var pathName = window.location.pathname;
var hostName = window.location.hostname;
var id = pathName.substring(pathName.lastIndexOf('/') + 1);

const props = defineProps({
  createPage:Boolean,
})


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


receipt.fetchReceipt(user.getUser.token, id).then(() => {
formData.value.description = receipt.getReceipt.description
formData.value.price = receipt.getReceipt.price
formData.value.date = receipt.getReceipt.date
formData.value.image = receipt.getReceipt.image
console.log(receipt.getReceipt)
formData.value.tags = receipt.getReceipt.tags
})





</script>


<template>



<div class="container mx-auto mt-5 min-h-full flex-row">

        <div class="flex flex-row">
            <div class="container basis-1/2" >

                <h2 class="pt-12 pb-12 font-semibold text-4xl tracking-tight">{{formData.description}}</h2>


                    <div class="flex flex-row">
                        <div class="container basis-1/2" >
                            <h3 class="pt-6 pb-4 font-semibold text-lg tracking-tight">Price</h3>
                            ${{formData.price}}
                        </div>

                        <div class="container basis-1/2" >
                            <h3 class="pt-6 pb-4 font-semibold text-lg tracking-tight">Purchase Date</h3>
                            {{formData.date}}
                        </div>
                    </div>



            <h3 class="pt-6 pb-4 font-semibold text-lg tracking-tight">Catagories</h3>
                <ul>
                    <li v-for="catagory in formData.tags" :key="catagory.name" class="">
                        <span v-if="catagory.assigned == true" class="ml-2">{{catagory.name}}</span>
                    </li>
                </ul>
            </div>
            




            
        <div v-if="!createPage && formData.image" class="w-1/2 px-12 grid justify-items-center">
      <img v-bind:src="'/' + formData.image" /> </div>
      </div>
  </div>



</template>

