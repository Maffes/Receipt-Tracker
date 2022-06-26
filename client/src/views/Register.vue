<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../store/users';
const user = useUserStore()

  const userDetails = ref({
      firstName: '',
      lastName: '',
      email: '',
      password: ''
  })

  const registerUser = (firstName:String, lastName:String, email:String, password:String) => {
      return user.registerUser(firstName, lastName, email, password)
        .catch();
  }

</script>

<template>
<div class="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="max-w-md w-full space-y-8">
    <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Register</h2>
    <form @submit.prevent="registerUser(userDetails.firstName, userDetails.lastName, userDetails.email, userDetails.password )" class="mt-8 space-y-6">
      <div class="rounded-md shadow-sm">
        <label for="firstname" >First Name</label>
        <input  v-model="userDetails.firstName" id="firstname" name="firstname" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4 mt-2">

        <label for="lastname" >Last Name</label>
        <input v-model="userDetails.lastName" id="lastname" name="lastname" type="text" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4 mt-2" >

        <label  for="email-address" >Email address</label>
        <input v-model="userDetails.email" id="email-address" name="email" type="email" autocomplete="email" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4 mt-2" >

        <label for="password" >Password</label>
        <input v-model="userDetails.password" id="password" name="password" type="password" autocomplete="current-password" required class="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm mb-4 mt-2" >

        <div class="flex items-center justify-between">
          <div class="flex items-center text-sm">
            <p class="font-medium">Already have an account? <router-link class="font-medium text-blue-600 hover:text-blue-500" to="/login">Login Now</router-link></p>
          </div>
        </div>
        <button type="button" class="my-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-slate-100 hover:bg-slate-200 focus:outline-none mb-2">Clear Form</button>

        <button type="submit" class="my-4 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">Register</button>
      </div>
    </form>
  </div>
</div>
</template>