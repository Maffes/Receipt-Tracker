<script setup lang="ts">
import Filters from "/src/components/Filters.vue"
import ReceiptList from "/src/components/ReceiptList.vue"
import { useUserStore } from '../store/users'
import { useReceiptsStore } from '../store/receipts'
import { ref, watch } from 'vue'
import router from '../router/index'
const receipts = useReceiptsStore()
const user = useUserStore()

// Makes page private
if(!user.getUser.loginStatus) {
  router.push('/login');
}

// Fetches all receipts
receipts.fetchReceipts(user.getUser.token)
</script>

<template>
<div class="">
  <div class=" container flex flex-row mx-auto"> 
    <div class="basis-1/4">
      <Filters/>
    </div>
    <div class="pl-6 basis-3/4">
      <div class="flex justify-end">
        <router-link class=" inline-block content-center my-8 text-base py-3 px-6 rounded-full border-2 border-black bg-gray-800 text-zinc-100 hover:border-blue-500 hover:bg-blue-500" to="/create">
          <span class="">Create New Receipt </span>
        </router-link>
      </div>
        <ReceiptList />
      </div>
    </div>
  </div>

</template>

<style>

</style>