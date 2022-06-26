<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useReceiptsStore } from '../store/receipts'
import { useUserStore } from '../store/users'
const user = useUserStore()
const receipts = useReceiptsStore()

const filters = ref({
  search: '',
  tags: {
      Transport: {name: 'Transport', assigned: false},
      Groceries: {name: 'Groceries', assigned: false},
      Housing: {name: 'Housing', assigned: false},
      Utilities: {name: 'Utilities', assigned: false},
      Medical: {name: 'Medical', assigned: false},
      Insurance: {name: 'Insurance', assigned: false},
      Business: {name: 'Business', assigned: false},
      Misc: {name: 'Misc', assigned: false},
      }, 
    dateRange: {
      start: '',
      end: ''
    },
    priceRange: {
      start: '',
      end: ''
    }
})

</script>

<template>

  <form @submit.prevent="receipts.fetchFilteredReceipt(user.getUser.token, filters.search, filters.tags, filters.dateRange, filters.priceRange )" method="post" class="border-zinc-800 pb-8 w-full ">
    <input v-model="filters.search" id="search" name="search" type="text" placeholder="Search" class="w-full mb-4 mt-10 block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900" >
    <h2 class="pt-6 pb-4  font-semibold text-xl tracking-tight">Catagories</h2>
      <div class="columns-2">
        <div v-for="catagory in filters.tags" :key="catagory.name" class="">
          <label class="mb-4 block items-center">
            <input v-model="catagory.assigned" type="checkbox" :name="catagory.name" class="form-checkbox text-indigo-600">
            <span  class="ml-2">{{catagory.name}}</span>
          </label>
        </div>
      </div>

    <h2 class="pt-6 pb-4 font-semibold text-xl tracking-tight">Date range</h2>
      <div class="flex flex-row">
          <div class="container basis-1/2 pr-1" >
            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">Start</label>
            <input v-model="filters.dateRange.start" id="ReceiptDate" name="startDate" type="date" class="w-full block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900 " />
          </div>
          <div class="container basis-1/2 pl-1" >
            <label  class="form-check-label inline-block text-gray-800" for="flexCheckDefault">End</label>
            <input v-model="filters.dateRange.end" id="ReceiptDate" name="endDate" type="date" class="w-full block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900 " />
          </div>
      </div>



    <h2 class="pt-6 pb-4  font-semibold text-xl tracking-tight">Price range</h2>
      <div class="flex flex-row">
          <div class="container basis-1/2 pr-1" >
            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">Start</label>
            <input v-model="filters.priceRange.start" id="ReceiptDate" name="startPrice" type="number" class="w-full  block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900 " />
          </div>
          <div class="container basis-1/2 pl-1" >
            <label class="form-check-label inline-block text-gray-800" for="flexCheckDefault">End</label>
            <input v-model="filters.priceRange.end" id="ReceiptDate" name="endPrice" type="number" class="w-full  block focus:outline-none search-form-input bg-transparent px-3 py-2 border border-2 border-black placeholder-zinc-800  rounded text-base font-medium text-gray-900 " />
          </div>
      </div>


      <button type="submit" class="inline-block content-center my-8 text-base py-3 px-6 rounded-full border-2 border-black bg-gray-800 text-zinc-100 hover:border-blue-500 hover:bg-blue-500">Update</button>

  </form>
</template>

<style>
.search-form{
  width: 17rem;
}
.search-form-input{
  width: 14rem;
}

</style>