<script setup lang="ts">
import { useReceiptsStore } from '../store/receipts'
import { useUserStore } from '../store/users'
const user = useUserStore()
const receipts = useReceiptsStore()
</script>

<template>
  <div class="container">
    <div class="flex px-10 list-title">
      <span class="w-1/6 select-none cursor-pointer text-gray-500">Date</span>
      <span class="w-3/6 text-gray-500">Description</span>
      <span class="w-1/6 text-right select-none cursor-pointer text-gray-500">Price</span>
      <span class="w-1/6 text-right text-gray-500">Action</span>
    </div>
    <span v-for="receipt in receipts.getReceipts" :key="receipt._id"  class=" shadow rounded-lg bg-zinc-100 my-6 mt-2 py-6 px-10 flex">
      <span class="w-1/6 text-gray-500">{{receipt.date}}</span>
      <span class="w-3/6"><a :href="'/view/' + receipt._id" class="text-lg hover:text-blue-500 font-semibold" >{{receipt.description}}</a></span>
      <span class="w-1/6 text-right text-lg font-semibold">${{receipt.price}}</span>
      <span class="w-1/6 text-right">
        <a :href="'/edit/' + receipt._id">
          <i class="fa-solid fa-pen-to-square text-slate-700 hover:text-slate-900 px-1"></i>
        </a>
        <a @click="receipts.deleteReceipt(user.getUser.token, receipt._id)">
          <i class="fa-solid fa-ban text-red-600 hover:text-red-800 px-1"></i>
        </a>    
      </span>
    </span>
  </div>
</template>

<style>

</style>