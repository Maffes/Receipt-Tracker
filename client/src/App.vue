<script setup lang="ts">
import { ref, computed } from 'vue';
import { useUserStore } from './store/users'
import { useReceiptsStore } from './store/receipts'
const user = useUserStore()
user.returningUser()
const receipts = useReceiptsStore()



</script>

<template>
<!--Header-->
<nav class="bg-zinc-50 flex items-center justify-between flex-wrap py-8">
  <div class="container flex flex-wrap justify-between items-center mx-auto">

    <!--Logo-->
    <router-link class=" items-center" to="/">
      <h1 class="leading-normal font-medium text-5xl tracking-tight">Receipt Manager</h1>
        <span v-if="user.getUser.loginStatus == true" class="font-normal text-zinc-500 text-base tracking-tight">Hello {{user.getUser.firstName}}, you have {{receipts.getReceiptsLength}} receipts</span> 
        <span v-if="!user.getUser.loginStatus" class="font-normal text-zinc-500 text-base tracking-tight">For all your receipt management needs</span> 
    </router-link>

    <!-- Profile -->
    <div v-if="user.getUser.loginStatus == true">
      <!-- <p >{{user.getUser.firstName}}<i class="pl-4 fa-solid fa-caret-down"></i></p> -->
      <a @click="user.logOut()" class="cursor-pointer ml-4 content-center my-12 text-base my-12 py-3 px-6 rounded-full border-2 border-black bg-transparent text-zinc-800 hover:border-blue-500 hover:bg-blue-500 hover:text-zinc-100">Log out</a>
    </div>
    
  </div>
</nav>


<!--View-->
<router-view />
</template>


<style>
h1 {
  font-family: 'Palanquin Dark', sans-serif;
}
</style>
